/**
 * Blog Content Evaluator — the 10-criterion Boolean judge.
 *
 * Cross-provider on purpose: the writer/keyword agents run on Anthropic, so the
 * judge runs on **OpenAI** (gpt-4.1 by default) to avoid self-grading bias.
 * Uses the canonical blog-content-evaluator prompt (Langfuse production label,
 * committed fallback) and JSON-object response mode — the prompt already pins
 * the exact OUTPUT JSON.
 *
 * Env: OPENAI_API_KEY (required to run the judge), OPENAI_EVAL_MODEL (optional,
 * defaults to gpt-4.1).
 */

import OpenAI from "openai";
import { startObservation } from "@langfuse/tracing";
import { getPrompt, LANGFUSE_ENABLED } from "./observability.mjs";
import {
  BLOG_EVAL_PROMPT,
  BLOG_EVAL_PROMPT_NAME,
  CRITICAL_CRITERIA,
} from "./prompts/blog-eval.mjs";
import {
  PACKAGE_EVAL_PROMPT,
  PACKAGE_EVAL_PROMPT_NAME,
} from "./prompts/package-eval.mjs";

export const EVAL_MODEL = process.env.OPENAI_EVAL_MODEL || "gpt-4.1";

// Lazy client — constructing OpenAI throws without OPENAI_API_KEY, so defer it
// to call time (importing this module must never throw).
let _openai;
function openaiClient() {
  return (_openai ??= new OpenAI());
}

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

/**
 * Count how many of the 10 criteria passed, and whether all 6 CRITICAL criteria
 * passed (the publish gate).
 */
export function summarizeCriteria(criteria = {}, criticalCriteria = CRITICAL_CRITERIA) {
  const entries = Object.entries(criteria);
  const passed = entries.filter(([, v]) => v?.result === "pass").length;
  const total = entries.length || CRITERIA_KEYS.length;
  const criticalPassed = criticalCriteria.every((k) => criteria[k]?.result === "pass");
  const failed = entries.filter(([, v]) => v?.result === "fail").map(([k]) => k);
  return { passed, total, passRate: total ? passed / total : 0, criticalPassed, failed };
}

/**
 * Evaluate a generated post against the 10-criterion Boolean rubric.
 *
 * @param {object} postData
 * @param {string} keyword
 * @param {object} research
 * @returns {Promise<object>} the evaluation object (see the prompt's OUTPUT JSON)
 */
export async function evaluatePost(postData, keyword, research = {}) {
  console.log(`  🔍 Evaluating (OpenAI ${EVAL_MODEL}): "${postData.title}"...`);

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

  // Manual Langfuse generation span (OpenAI usage shape differs from Anthropic).
  const gen = LANGFUSE_ENABLED
    ? startObservation(
        "blog-evaluation",
        { model: EVAL_MODEL, input: postData.title, ...(prompt.handle ? { prompt: prompt.handle } : {}) },
        { asType: "generation" }
      )
    : null;
  try {
    const resp = await openaiClient().chat.completions.create({
      model: EVAL_MODEL,
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content:
            "Evaluate the generated blog post in the system prompt. Return ONLY the JSON object specified under OUTPUT FORMAT — no prose, no code fences.",
        },
      ],
    });
    const content = resp.choices?.[0]?.message?.content ?? "{}";
    const evaluation = JSON.parse(content);
    gen?.update({
      output: evaluation,
      ...(resp.usage
        ? { usageDetails: { input: resp.usage.prompt_tokens, output: resp.usage.completion_tokens } }
        : {}),
    });
    return evaluation;
  } finally {
    gen?.end();
  }
}

/**
 * Evaluate a non-post action package (update/merge/hold/reject) against the
 * package rubric. Grades the *recommendation* — accuracy, target correctness,
 * actionability — since there is no generated article to judge.
 *
 * @param {string} markdown  the action-package Markdown (writer output)
 * @param {object} ctx
 * @param {string} ctx.action        recommended action (e.g. update_existing_page)
 * @param {string} ctx.keyword       primary query
 * @param {string} [ctx.targetPage]  existing page the edits apply to
 * @param {string[]} [ctx.relatedQueries]
 * @param {object} [ctx.research]    { summary }
 * @returns {Promise<object>} the evaluation object (see package-eval OUTPUT JSON)
 */
export async function evaluatePackage(
  markdown,
  { action, keyword, targetPage, relatedQueries = [], research = {} } = {}
) {
  console.log(`  🔍 Evaluating package (OpenAI ${EVAL_MODEL}): "${action}" · "${keyword}"...`);

  const prompt = await getPrompt(PACKAGE_EVAL_PROMPT_NAME, PACKAGE_EVAL_PROMPT);
  const system = prompt.compile({
    action: action || "update_existing_page",
    primary_query: keyword,
    related_queries: relatedQueries.length ? relatedQueries.join(", ") : keyword,
    target_page: targetPage || "None provided",
    source_facts: research.summary || "No external research provided.",
    action_package: markdown,
  });

  const gen = LANGFUSE_ENABLED
    ? startObservation(
        "package-evaluation",
        { model: EVAL_MODEL, input: `${action} · ${keyword}`, ...(prompt.handle ? { prompt: prompt.handle } : {}) },
        { asType: "generation" }
      )
    : null;
  try {
    const resp = await openaiClient().chat.completions.create({
      model: EVAL_MODEL,
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content:
            "Evaluate the content action package in the system prompt. Return ONLY the JSON object specified under OUTPUT FORMAT — no prose, no code fences.",
        },
      ],
    });
    const content = resp.choices?.[0]?.message?.content ?? "{}";
    const evaluation = JSON.parse(content);
    gen?.update({
      output: evaluation,
      ...(resp.usage
        ? { usageDetails: { input: resp.usage.prompt_tokens, output: resp.usage.completion_tokens } }
        : {}),
    });
    return evaluation;
  } finally {
    gen?.end();
  }
}
