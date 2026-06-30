/**
 * Blog Content Evaluator — the 10-criterion Boolean judge.
 *
 * Replaces the former 0–100 reviewer. Uses the canonical blog-content-evaluator
 * prompt (Langfuse production label, committed fallback) and forces structured
 * output via a tool mirroring the prompt's OUTPUT JSON.
 */

import Anthropic from "@anthropic-ai/sdk";
import { observeGeneration, getPrompt } from "./observability.mjs";
import { MODEL } from "./claude-writer.mjs";
import {
  BLOG_EVAL_PROMPT,
  BLOG_EVAL_PROMPT_NAME,
  CRITICAL_CRITERIA,
} from "./prompts/blog-eval.mjs";

const anthropic = new Anthropic();

const CRITERION = {
  type: "object",
  properties: {
    result: { type: "string", enum: ["pass", "fail"] },
    reason: { type: "string" },
  },
  required: ["result", "reason"],
};

const CRITERIA_KEYS = [
  "intent_match",
  "query_cluster_coverage",
  "keyword_cannibalization_check",
  "philippine_relevance",
  "factual_accuracy_and_source_discipline",
  "usefulness",
  "clarity_and_readability",
  "seo_structure",
  "trust_and_safety",
  "pesohub_internal_linking_and_conversion",
];

const EVAL_TOOL = {
  name: "save_evaluation",
  description: "Save the strict Boolean content evaluation for the blog post.",
  input_schema: {
    type: "object",
    properties: {
      publish_recommendation: { type: "string", enum: ["publish", "revise", "reject"] },
      recommended_content_action: {
        type: "string",
        enum: [
          "publish_as_new_post",
          "update_existing_page",
          "merge_with_existing_page",
          "create_supporting_page_with_internal_links",
          "reject",
        ],
      },
      summary: { type: "string" },
      criteria: {
        type: "object",
        properties: Object.fromEntries(CRITERIA_KEYS.map((k) => [k, CRITERION])),
        required: CRITERIA_KEYS,
      },
      cannibalization_analysis: {
        type: "object",
        properties: {
          risk_level: { type: "string", enum: ["low", "medium", "high"] },
          competing_existing_pages: {
            type: "array",
            items: {
              type: "object",
              properties: { url: { type: "string" }, reason: { type: "string" } },
            },
          },
          should_this_be_a_new_page: { type: "string", enum: ["yes", "no"] },
          best_page_to_update_instead: { type: "string" },
          recommended_positioning: { type: "string" },
        },
      },
      critical_issues: { type: "array", items: { type: "string" } },
      unverified_or_risky_claims: { type: "array", items: { type: "string" } },
      missing_query_coverage: {
        type: "array",
        items: {
          type: "object",
          properties: {
            related_query: { type: "string" },
            recommended_fix: { type: "string" },
          },
        },
      },
      missing_sections_or_examples: { type: "array", items: { type: "string" } },
      recommended_internal_links: {
        type: "array",
        items: {
          type: "object",
          properties: {
            anchor_text: { type: "string" },
            target_page_or_tool: { type: "string" },
            reason: { type: "string" },
          },
        },
      },
      recommended_fixes: { type: "array", items: { type: "string" } },
      final_verdict: { type: "string" },
    },
    required: ["publish_recommendation", "recommended_content_action", "summary", "criteria", "final_verdict"],
  },
};

/** Render the structured BlogPostData body to Markdown for the judge. */
function renderPost(postData) {
  const body = postData.sections
    .map((s) => {
      if (s.type === "heading") return `\n${"#".repeat(s.level || 2)} ${s.heading}`;
      if (s.type === "paragraph") return s.content;
      if (s.type === "list" || s.type === "ordered-list") return (s.items ?? []).map((i) => `- ${i}`).join("\n");
      if (s.type === "callout") return `> [${s.variant}] ${s.content}`;
      if (s.type === "quote") return `> ${s.content}`;
      if (s.type === "table")
        return [s.columns?.join(" | "), (s.columns ?? []).map(() => "---").join(" | "), ...(s.rows ?? []).map((r) => r.join(" | "))].join("\n");
      return "";
    })
    .join("\n");
  const faqs = (postData.faqs ?? []).map((f) => `**${f.question}**\n${f.answer}`).join("\n\n");
  return `# ${postData.title}\n\n${postData.directAnswer ?? ""}\n${body}\n\n## FAQs\n${faqs}`;
}

function extractToolInput(message, toolName) {
  if (message.stop_reason === "max_tokens") {
    throw new Error("Evaluation truncated (hit max_tokens).");
  }
  const block = message.content.find((b) => b.type === "tool_use" && b.name === toolName);
  if (!block) {
    const text = message.content.find((b) => b.type === "text")?.text ?? "";
    throw new Error(`Judge did not call "${toolName}". stop_reason: ${message.stop_reason}. ${text.slice(0, 200)}`);
  }
  return block.input;
}

/**
 * Count how many of the 10 criteria passed, and whether all 6 CRITICAL criteria
 * passed (the publish gate).
 */
export function summarizeCriteria(criteria = {}) {
  const entries = Object.entries(criteria);
  const passed = entries.filter(([, v]) => v?.result === "pass").length;
  const total = entries.length || CRITERIA_KEYS.length;
  const criticalPassed = CRITICAL_CRITERIA.every((k) => criteria[k]?.result === "pass");
  const failed = entries.filter(([, v]) => v?.result === "fail").map(([k]) => k);
  return { passed, total, passRate: total ? passed / total : 0, criticalPassed, failed };
}

/**
 * Evaluate a generated post against the 10-criterion Boolean rubric.
 *
 * @param {object} postData
 * @param {string} keyword
 * @param {object} research
 * @returns {Promise<object>} the evaluation object (see EVAL_TOOL)
 */
export async function evaluatePost(postData, keyword, research = {}) {
  console.log(`  🔍 Evaluating: "${postData.title}"...`);

  const prompt = await getPrompt(BLOG_EVAL_PROMPT_NAME, BLOG_EVAL_PROMPT);
  const system = prompt.compile({
    primary_query: keyword,
    related_queries: (postData.keywords ?? [keyword]).join(", "),
    search_console_data: "Curated topic from the PesoHub editorial queue.",
    impressions: "n/a",
    position: "n/a",
    ctr: "n/a",
    top_page_path: (postData.relatedSlugs && postData.relatedSlugs[0]) || "/",
    search_intent_cluster: postData.category || "general",
    topic: postData.title,
    related_pages_or_tools: (postData.relatedSlugs ?? []).join(", ") || "None provided",
    overlapping_existing_pages: "None provided",
    source_facts: research.summary || "No external research provided.",
    generated_blog_post: renderPost(postData),
  });

  const message = await observeGeneration(
    "blog-evaluation",
    { model: MODEL, prompt: prompt.handle, input: postData.title },
    () =>
      anthropic.messages
        .stream({
          model: MODEL,
          max_tokens: 4096,
          system,
          tools: [EVAL_TOOL],
          tool_choice: { type: "tool", name: EVAL_TOOL.name },
          messages: [
            { role: "user", content: "Evaluate the generated blog post above. Call save_evaluation." },
          ],
        })
        .finalMessage()
  );

  return extractToolInput(message, EVAL_TOOL.name);
}
