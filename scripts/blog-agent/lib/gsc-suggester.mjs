/**
 * Keyword Opportunity Agent layer for the GSC opportunity finder.
 *
 * Replaces the former "propose a topic + LLM judge" pair with a single scored
 * decision per opportunity, following the canonical keyword-opportunity-agent
 * prompt (Langfuse production label, committed fallback). For each classified
 * GSC opportunity the agent returns a recommended content action, an
 * opportunity score with breakdown, cannibalization analysis, an internal-link
 * plan, and (for actionable items) a `topic_seed` ready to paste into
 * topic-queue.json.
 */

import Anthropic from "@anthropic-ai/sdk";
import {
  observeGeneration,
  getPrompt,
  tracedGeneration,
  logObservationScore,
} from "./observability.mjs";
import { MODEL } from "./claude-writer.mjs";
import {
  KEYWORD_OPPORTUNITY_PROMPT,
  KEYWORD_OPPORTUNITY_PROMPT_NAME,
} from "./prompts/keyword-opportunity.mjs";

const anthropic = new Anthropic();

const BLOG_CATEGORIES = [
  "savings", "investing", "tax", "government", "banking", "budgeting",
  "insurance", "general",
];

const ACTIONS = [
  "update_existing_page",
  "publish_as_new_post",
  "create_supporting_page_with_internal_links",
  "merge_with_existing_page",
  "reject",
  "hold",
];

/** Actions that should auto-generate a paste-ready topic-queue snippet. */
export const ACTIONABLE_NEW = new Set([
  "publish_as_new_post",
  "create_supporting_page_with_internal_links",
]);

const LINK = {
  type: "object",
  properties: {
    anchor_text: { type: "string" },
    target_page_or_tool: { type: "string" },
    reason: { type: "string" },
  },
};

const ANALYSIS_TOOL = {
  name: "save_analysis",
  description: "Save the scored keyword-opportunity decision in the exact output schema.",
  input_schema: {
    type: "object",
    properties: {
      search_intent_cluster: { type: "string" },
      primary_query: { type: "string" },
      related_queries: { type: "array", items: { type: "string" } },
      top_page_path: { type: "string" },
      recommended_action: { type: "string", enum: ACTIONS },
      priority: { type: "string", enum: ["A", "B", "C", "Hold"] },
      opportunity_score: { type: "number" },
      estimated_click_gain: { type: "number" },
      score_breakdown: {
        type: "object",
        properties: {
          demand_score: { type: "number" },
          position_opportunity_score: { type: "number" },
          ctr_gap_score: { type: "number" },
          tool_business_fit_score: { type: "number" },
          source_confidence_score: { type: "number" },
          content_action_score: { type: "number" },
          cannibalization_penalty: { type: "number" },
        },
        required: [
          "demand_score",
          "position_opportunity_score",
          "ctr_gap_score",
          "tool_business_fit_score",
          "source_confidence_score",
          "content_action_score",
          "cannibalization_penalty",
        ],
      },
      reason: { type: "string" },
      why_this_cluster_matters: { type: "string" },
      cannibalization_risk: { type: "string", enum: ["low", "medium", "high"] },
      cannibalization_notes: { type: "string" },
      target_page_to_update: { type: "string" },
      content_gap: { type: "string" },
      recommended_content_angle: { type: "string" },
      recommended_internal_links: { type: "array", items: LINK },
      source_fact_status: { type: "string", enum: ["complete", "partial", "missing"] },
      related_queries_to_include: { type: "array", items: { type: "string" } },
      related_queries_to_exclude: {
        type: "array",
        items: {
          type: "object",
          properties: { query: { type: "string" }, reason: { type: "string" } },
        },
      },
      next_step: { type: "string" },
      // Extra (not in the canonical OUTPUT JSON): a paste-ready queue seed for
      // actionable new-post / supporting-page items.
      topic_seed: {
        type: "object",
        description: "Only for publish_as_new_post / create_supporting_page_with_internal_links.",
        properties: {
          title: { type: "string", description: "Proposed Philippine-specific article title." },
          slug: { type: "string", description: "kebab-case URL slug, ends with -philippines where natural." },
          category: { type: "string", enum: BLOG_CATEGORIES },
          keywords: { type: "array", items: { type: "string" } },
          brief: { type: "string", description: "2-4 sentence editorial angle for the writer." },
        },
      },
    },
    required: [
      "recommended_action",
      "priority",
      "opportunity_score",
      "score_breakdown",
      "cannibalization_risk",
      "source_fact_status",
    ],
  },
};

const WEIGHTS = {
  demand_score: 0.25,
  position_opportunity_score: 0.2,
  ctr_gap_score: 0.2,
  tool_business_fit_score: 0.15,
  source_confidence_score: 0.1,
  content_action_score: 0.1,
};

/** Recompute the weighted opportunity score from a breakdown (code guard). */
export function weightedScore(b = {}) {
  const sum = Object.entries(WEIGHTS).reduce(
    (acc, [k, w]) => acc + (Number(b[k]) || 0) * w,
    0
  );
  const penalty = Number(b.cannibalization_penalty) || 0;
  return Math.max(0, Math.min(1, sum - penalty));
}

function extractToolInput(message, toolName) {
  if (message.stop_reason === "max_tokens") {
    throw new Error("Analysis truncated (hit max_tokens).");
  }
  const block = message.content.find((b) => b.type === "tool_use" && b.name === toolName);
  if (!block) {
    const text = message.content.find((b) => b.type === "text")?.text ?? "";
    throw new Error(`Agent did not call "${toolName}". stop_reason: ${message.stop_reason}. ${text.slice(0, 200)}`);
  }
  return block.input;
}

function metricsLine(o) {
  return (
    `${o.impressions} impressions, ${o.clicks} clicks, ` +
    `avg position ${o.position}, CTR ${(o.ctr * 100).toFixed(2)}%` +
    (o.deltaPct != null ? `, ${o.deltaPct >= 0 ? "+" : ""}${o.deltaPct}% WoW` : "") +
    `. ${o.reason ?? ""}`
  );
}

/**
 * Analyze one classified GSC opportunity into a scored content-action decision.
 *
 * @param {object} opp  from classifyOpportunities()
 * @param {{pagePaths?: string[], overlappingPages?: string, sourceFacts?: string}} [ctx]
 * @returns {Promise<object>} the decision object (see ANALYSIS_TOOL)
 */
export async function analyzeOpportunity(opp, ctx = {}) {
  // Per-opportunity observation so the decision's scores attach to its own span
  // (the generation runs as a child). One score row per opportunity in Langfuse.
  return tracedGeneration(`opportunity: ${opp.query}`, () => analyze(opp, ctx));
}

async function analyze(opp, ctx) {
  const pagePaths = (ctx.pagePaths ?? []).filter((s) => s.startsWith("/")).slice(0, 60);

  const prompt = await getPrompt(KEYWORD_OPPORTUNITY_PROMPT_NAME, KEYWORD_OPPORTUNITY_PROMPT);
  const system = prompt.compile({
    primary_query: opp.query,
    related_queries: "None provided",
    search_console_data: metricsLine(opp),
    impressions: String(opp.impressions ?? 0),
    average_position: String(opp.position ?? 0),
    ctr: `${((opp.ctr ?? 0) * 100).toFixed(2)}%`,
    top_page_path: opp.topPagePath ?? "/",
    search_intent_cluster: opp.opportunity ?? "unknown",
    topic: opp.query,
    related_pages_or_tools: pagePaths.join("\n") || "None provided",
    overlapping_existing_pages: ctx.overlappingPages || "None provided",
    source_facts: ctx.sourceFacts || "None provided",
  });

  const message = await observeGeneration(
    "keyword-opportunity",
    { model: MODEL, prompt: prompt.handle, input: opp.query },
    () =>
      anthropic.messages
        .stream({
          model: MODEL,
          max_tokens: 4096,
          system,
          tools: [ANALYSIS_TOOL],
          tool_choice: { type: "tool", name: ANALYSIS_TOOL.name },
          messages: [
            {
              role: "user",
              content:
                "Analyze this opportunity and call save_analysis. For publish_as_new_post or create_supporting_page_with_internal_links, also fill topic_seed (title, slug, category, keywords, brief) so it can be pasted into topic-queue.json.",
            },
          ],
        })
        .finalMessage()
  );

  const decision = extractToolInput(message, ANALYSIS_TOOL.name);

  // Code guard: clamp the model's score and reconcile with the weighted formula.
  decision.primary_query = decision.primary_query || opp.query;
  decision.top_page_path = decision.top_page_path || opp.topPagePath || "/";
  const recomputed = weightedScore(decision.score_breakdown);
  decision.opportunity_score = recomputed;

  // Per-decision scores on this opportunity's observation.
  logObservationScore("opportunity_score", recomputed, {
    dataType: "NUMERIC",
    comment: decision.reason,
  });
  logObservationScore("recommended_action", decision.recommended_action, {
    dataType: "CATEGORICAL",
  });
  logObservationScore("priority", decision.priority, { dataType: "CATEGORICAL" });
  logObservationScore("cannibalization_risk", decision.cannibalization_risk, {
    dataType: "CATEGORICAL",
  });

  return decision;
}
