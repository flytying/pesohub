/**
 * Claude suggestion layer for the GSC opportunity finder.
 *
 * Turns ranked Search Console opportunities into topic-queue-shaped suggestions
 * a human can paste straight into scripts/blog-agent/topic-queue.json. Reuses
 * the blog writer's tool_use → forced-JSON pattern and the same wrapped client
 * (so calls are auto-traced when Braintrust is enabled).
 *
 * Also exposes an LLM-judge that scores each suggestion 0..1 — logged to the
 * "gsc-opportunities" Braintrust dataset as the eval signal until the human
 * accept/reject ground truth arrives via the `--feedback` pass.
 */

import Anthropic from "@anthropic-ai/sdk";
import { maybeWrapAnthropic } from "./braintrust.mjs";
import { MODEL } from "./claude-writer.mjs";

const anthropic = maybeWrapAnthropic(new Anthropic());

const BLOG_CATEGORIES = [
  "savings", "investing", "tax", "government", "banking", "budgeting",
  "insurance", "general",
];

const SYSTEM_PROMPT = `You are an SEO content strategist for PesoHub (pesohub.ph), a Philippine personal finance site.

You are given Google Search Console opportunities — search queries where PesoHub already gets impressions but is leaving clicks on the table (ranking just outside the top, no dedicated page, or fast-rising demand).

For each opportunity, propose a concrete blog topic that targets it. Be specific and Philippine-focused: name real banks/agencies (BSP, BIR, SSS, PhilHealth, Pag-IBIG, Maya, GoTyme, SeaBank, Tonik, CIMB), use ₱ figures, and write a tight editorial brief that steers the angle — not a generic summary.

Match the existing topic-queue voice: a "brief" is 2-4 sentences telling the writer exactly what angle to lead with and what to cover.`;

const SUGGEST_TOOL = {
  name: "save_suggestions",
  description: "Save the ranked blog topic suggestions derived from GSC opportunities.",
  input_schema: {
    type: "object",
    properties: {
      suggestions: {
        type: "array",
        items: {
          type: "object",
          properties: {
            sourceQuery: { type: "string", description: "The GSC query this targets (verbatim)." },
            type: {
              type: "string",
              enum: ["new-post", "optimize-existing"],
              description: "new-post = write a dedicated article; optimize-existing = improve a page we already rank with.",
            },
            title: { type: "string", description: "Proposed article title (Philippine-specific)." },
            slug: { type: "string", description: "URL slug, kebab-case, ends with -philippines where natural." },
            category: { type: "string", enum: BLOG_CATEGORIES },
            keywords: {
              type: "array",
              items: { type: "string" },
              description: "3-7 target keywords incl. the source query + close variants.",
            },
            linksTo: {
              type: "array",
              items: { type: "string" },
              description: "1-2 existing PesoHub page paths to link to (choose from the provided list).",
            },
            brief: { type: "string", description: "2-4 sentence editorial angle steering the writer." },
            rationale: { type: "string", description: "1 sentence: why this is worth writing, citing the GSC metrics." },
          },
          required: ["sourceQuery", "type", "title", "slug", "category", "keywords", "linksTo", "brief", "rationale"],
        },
      },
    },
    required: ["suggestions"],
  },
};

const JUDGE_TOOL = {
  name: "save_scores",
  description: "Score each suggestion for how well it exploits the GSC opportunity.",
  input_schema: {
    type: "object",
    properties: {
      scores: {
        type: "array",
        items: {
          type: "object",
          properties: {
            slug: { type: "string" },
            score: { type: "number", description: "0..1 — real, non-duplicate, on-brand opportunity well-matched by this topic?" },
            verdict: { type: "string", description: "1 short sentence justifying the score." },
          },
          required: ["slug", "score", "verdict"],
        },
      },
    },
    required: ["scores"],
  },
};

function extractToolInput(message, toolName) {
  if (message.stop_reason === "max_tokens") {
    throw new Error("Response truncated (hit max_tokens).");
  }
  const block = message.content.find((b) => b.type === "tool_use" && b.name === toolName);
  if (!block) {
    const text = message.content.find((b) => b.type === "text")?.text ?? "";
    throw new Error(`Claude did not call tool "${toolName}". stop_reason: ${message.stop_reason}. Text: ${text.slice(0, 300)}`);
  }
  return block.input;
}

function opportunityLines(opportunities) {
  return opportunities
    .map(
      (o, i) =>
        `${i + 1}. [${o.opportunity}] "${o.query}" — ${o.impressions} impressions, ${o.clicks} clicks, pos ${o.position}, CTR ${(o.ctr * 100).toFixed(1)}%, top page ${o.topPagePath}. ${o.reason}`
    )
    .join("\n");
}

/**
 * Generate topic suggestions for the given ranked opportunities.
 *
 * @param {Array} opportunities  from classifyOpportunities()
 * @param {string[]} pagePaths   existing PesoHub page paths for linksTo (coverage.allSlugs)
 * @returns {Promise<Array>} suggestion objects (see SUGGEST_TOOL)
 */
export async function generateSuggestions(opportunities, pagePaths = []) {
  if (opportunities.length === 0) return [];

  const linkOptions = pagePaths.filter((s) => s.startsWith("/")).slice(0, 80);

  const message = await anthropic.messages
    .stream({
      model: MODEL,
      max_tokens: 8192,
      system: SYSTEM_PROMPT,
      tools: [SUGGEST_TOOL],
      tool_choice: { type: "tool", name: SUGGEST_TOOL.name },
      messages: [
        {
          role: "user",
          content: `Here are this week's Google Search Console opportunities for PesoHub, ranked:

${opportunityLines(opportunities)}

Existing PesoHub pages you may reference in "linksTo" (use exact paths):
${linkOptions.join("\n")}

Propose one blog topic per opportunity (skip any that are genuinely too thin to be worth a dedicated article). Call save_suggestions.`,
        },
      ],
    })
    .finalMessage();

  return extractToolInput(message, SUGGEST_TOOL.name).suggestions ?? [];
}

/**
 * LLM-judge: score each suggestion 0..1 against its source opportunity. Used as
 * the Braintrust eval signal. Returns a Map slug → {score, verdict}.
 */
export async function judgeSuggestions(suggestions, opportunities) {
  if (suggestions.length === 0) return new Map();

  const message = await anthropic.messages
    .stream({
      model: MODEL,
      max_tokens: 4096,
      system:
        "You are a strict SEO editor grading topic suggestions against the Search Console data that motivated them. Reward suggestions that target a real, high-impression, under-served query with a specific, non-duplicate, Philippine-focused angle. Penalize vague, off-brand, or redundant topics.",
      tools: [JUDGE_TOOL],
      tool_choice: { type: "tool", name: JUDGE_TOOL.name },
      messages: [
        {
          role: "user",
          content: `GSC opportunities:
${opportunityLines(opportunities)}

Suggestions to score:
${suggestions.map((s) => `- slug: ${s.slug}\n  targets: "${s.sourceQuery}" (${s.type})\n  title: ${s.title}\n  brief: ${s.brief}`).join("\n")}

Score each suggestion 0..1. Call save_scores.`,
        },
      ],
    })
    .finalMessage();

  const { scores } = extractToolInput(message, JUDGE_TOOL.name);
  return new Map((scores ?? []).map((s) => [s.slug, { score: Math.max(0, Math.min(1, s.score)), verdict: s.verdict }]));
}
