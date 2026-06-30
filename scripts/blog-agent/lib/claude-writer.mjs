/**
 * Claude API wrapper for blog article writing.
 *
 * Uses Anthropic tool use to force structured JSON output — eliminates
 * fragile string-based JSON parsing from free-form text.
 */

import Anthropic from "@anthropic-ai/sdk";
import { createHash } from "crypto";
import { observeGeneration, getPrompt } from "./observability.mjs";
import {
  WRITING_AGENT_PROMPT,
  WRITING_AGENT_PROMPT_NAME,
} from "./prompts/writing-agent.mjs";

const anthropic = new Anthropic();
export const MODEL = "claude-sonnet-4-6";

function extractToolInput(message, toolName) {
  if (message.stop_reason === "max_tokens") {
    throw new Error(`Response truncated (hit max_tokens). stop_reason: max_tokens.`);
  }
  const block = message.content.find(
    (b) => b.type === "tool_use" && b.name === toolName
  );
  if (!block) {
    const text = message.content.find((b) => b.type === "text")?.text ?? "";
    throw new Error(
      `Claude did not call tool "${toolName}". stop_reason: ${message.stop_reason}. Text: ${text.slice(0, 300)}`
    );
  }
  return block.input;
}

async function withRetry(fn, { retries = 3, delayMs = 5000 } = {}) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const retryable = err.status === 429 || err.status === 529 || err.status >= 500;
      if (!retryable || attempt === retries) throw err;
      const wait = delayMs * attempt;
      console.log(`  ⏳ API error ${err.status}, retrying in ${wait / 1000}s (attempt ${attempt}/${retries})...`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

// Provenance tag for the writing-agent system prompt, logged to Langfuse so a
// generation is attributable to a prompt revision. Hash of the committed
// fallback; the Langfuse-managed version (when enabled) carries its own version.
export const SYSTEM_PROMPT_VERSION =
  "writing-agent-" +
  createHash("sha256").update(WRITING_AGENT_PROMPT).digest("hex").slice(0, 8);

/**
 * Fetch the writing-agent prompt (Langfuse production label, committed
 * fallback) and compile it for one content task. Returns `{ system, handle }`
 * — `system` is the compiled prompt string used as the Anthropic system prompt,
 * `handle` links the generation to its Langfuse prompt version (null when off).
 *
 * @param {object} vars  the writing-agent {{mustache}} inputs
 */
export async function getWritingSystem(vars) {
  const p = await getPrompt(WRITING_AGENT_PROMPT_NAME, WRITING_AGENT_PROMPT);
  return { system: p.compile(vars), handle: p.handle };
}

/**
 * Build the writing-agent variable map from the queue topic + research +
 * (optional) upstream keyword-opportunity decision.
 */
export function buildWritingVars(keyword, topicMeta = {}, research = {}, decision = null) {
  const links = (topicMeta.linksTo || []).join(", ") || "None provided";
  return {
    keyword_opportunity_output: decision
      ? JSON.stringify(decision, null, 2)
      : JSON.stringify(
          {
            recommended_action: topicMeta.recommendedAction || "publish_as_new_post",
            content_gap: topicMeta.brief || "",
            recommended_content_angle: topicMeta.brief || "",
          },
          null,
          2
        ),
    primary_query: keyword,
    related_queries: (topicMeta.keywords || [keyword]).join(", "),
    search_console_data: "Curated topic from the PesoHub editorial queue.",
    top_page_path: (topicMeta.linksTo && topicMeta.linksTo[0]) || "/",
    search_intent_cluster: topicMeta.category || "general",
    topic: topicMeta.title || keyword,
    related_pages_or_tools: links,
    overlapping_existing_pages: "None provided",
    source_facts: research.summary || "No external research provided.",
    writing_goal:
      "Produce a publish-ready, Philippine-focused article that satisfies the search intent without cannibalizing existing PesoHub pages.",
  };
}

const OUTLINE_TOOL = {
  name: "save_outline",
  description: "Save the article outline.",
  input_schema: {
    type: "object",
    properties: {
      title: { type: "string" },
      metaTitle: { type: "string", description: "SEO title (max 60 chars)" },
      metaDescription: { type: "string", description: "Meta description (120-155 chars)" },
      category: {
        type: "string",
        enum: ["savings", "investing", "tax", "government", "banking", "budgeting", "insurance", "general"],
      },
      directAnswer: { type: "string", description: "1-2 sentence quick answer" },
      sections: {
        type: "array",
        items: {
          type: "object",
          properties: {
            heading: { type: "string" },
            keyPoints: { type: "array", items: { type: "string" } },
          },
          required: ["heading", "keyPoints"],
        },
      },
      suggestedFaqs: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: { type: "string" },
            answer: { type: "string" },
          },
          required: ["question", "answer"],
        },
      },
      estimatedReadTime: { type: "integer" },
    },
    required: [
      "title",
      "metaTitle",
      "metaDescription",
      "category",
      "directAnswer",
      "sections",
      "suggestedFaqs",
      "estimatedReadTime",
    ],
  },
};

const ARTICLE_TOOL = {
  name: "save_article",
  description: "Save the full blog article content.",
  input_schema: {
    type: "object",
    properties: {
      sections: {
        type: "array",
        description: "Ordered content blocks composing the article body.",
        items: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: ["heading", "paragraph", "list", "ordered-list", "callout", "quote", "table"],
            },
            heading: { type: "string", description: "Required for type=heading" },
            level: { type: "integer", description: "Heading level (2 or 3); required for type=heading" },
            content: { type: "string", description: "Required for paragraph, callout, quote" },
            items: {
              type: "array",
              items: { type: "string" },
              description: "Required for list, ordered-list",
            },
            variant: {
              type: "string",
              enum: ["info", "warning", "tip"],
              description: "Required for type=callout",
            },
            columns: {
              type: "array",
              items: { type: "string" },
              description:
                "Required for type=table. Column headers. Use exactly 3 columns [Bank, Rate, Conditions] for a bank/rate ranking (the Rate cell renders as a colored pill); use 4+ columns for a side-by-side comparison.",
            },
            rows: {
              type: "array",
              items: { type: "array", items: { type: "string" } },
              description:
                "Required for type=table. Each row is an array of cell strings in column order. First cell is the row label (bank or factor). Keep cells short; separate multiple conditions with ' · '.",
            },
          },
          required: ["type"],
        },
      },
      faqs: {
        type: "array",
        items: {
          type: "object",
          properties: {
            question: { type: "string" },
            answer: { type: "string" },
          },
          required: ["question", "answer"],
        },
      },
      excerpt: { type: "string", description: "1-2 sentence summary for listing page" },
    },
    required: ["sections", "faqs", "excerpt"],
  },
};

export async function generateOutline(keyword, research, topicMeta = {}, ctx = {}) {
  console.log(`  📝 Generating outline for: "${keyword}"...`);
  const system = ctx.system ?? WRITING_AGENT_PROMPT;

  const message = await observeGeneration(
    "outline",
    { model: MODEL, prompt: ctx.promptHandle, input: keyword },
    () =>
      withRetry(() =>
        anthropic.messages
          .stream({
            model: MODEL,
            max_tokens: 8192,
            system,
            tools: [OUTLINE_TOOL],
            tool_choice: { type: "tool", name: OUTLINE_TOOL.name },
            messages: [
              {
                role: "user",
                content: `Generate a detailed article outline for the keyword: "${keyword}"

${topicMeta.title ? `Suggested title: ${topicMeta.title}` : ""}
${topicMeta.brief ? `Editorial angle (follow this): ${topicMeta.brief}` : ""}
${topicMeta.linksTo ? `Internal pages to link to: ${topicMeta.linksTo.join(", ")}` : ""}

Research summary:
${research.summary}

Key sources:
${research.sources.map((s) => `- ${s.title}: ${s.content.slice(0, 300)}`).join("\n")}

Call the save_outline tool with the structured outline.`,
              },
            ],
          })
          .finalMessage()
      )
  );

  return extractToolInput(message, OUTLINE_TOOL.name);
}

export async function writeArticle(outline, research, topicMeta = {}, ctx = {}) {
  console.log(`  ✍️  Writing full article...`);
  const system = ctx.system ?? WRITING_AGENT_PROMPT;

  const message = await observeGeneration(
    "article",
    { model: MODEL, prompt: ctx.promptHandle, input: outline.title },
    () =>
      withRetry(() =>
        anthropic.messages
          .stream({
            model: MODEL,
            // Long structured articles (1500+ words + JSON tool overhead)
            // overran the prior 16k cap → max_tokens truncation. sonnet-4-6
            // supports up to 64k output; 32k gives ample headroom.
            // Streaming required: SDK rejects non-streamed requests whose
            // max_tokens implies a >10min worst-case duration.
            max_tokens: 32000,
            system,
            tools: [ARTICLE_TOOL],
            tool_choice: { type: "tool", name: ARTICLE_TOOL.name },
            messages: [
              {
                role: "user",
                content: `Write a complete blog article based on this outline and research.

Title: ${outline.title}
Category: ${outline.category}
Direct Answer: ${outline.directAnswer}
${topicMeta.brief ? `\nEditorial angle (follow this): ${topicMeta.brief}\n` : ""}
Outline:
${outline.sections.map((s) => `## ${s.heading}\n${s.keyPoints.map((p) => `- ${p}`).join("\n")}`).join("\n\n")}

Research summary:
${research.summary}

Key sources:
${research.sources.map((s) => `- ${s.title}: ${s.content.slice(0, 500)}`).join("\n")}

${topicMeta.linksTo ? `Internal PesoHub pages to reference: ${topicMeta.linksTo.join(", ")}` : ""}

Requirements:
- Minimum 8 sections with H2 headings
- At least 5 FAQs
- At least 1500 words of content across all paragraphs
- Include at least 1 callout (tip or info)
- When comparing banks, rates, or products across consistent attributes, use a "table" section instead of a long list: a 3-column [Bank, Rate, Conditions] ranking, or a 4+ column side-by-side comparison
- Write original content — do not copy from research sources
- Philippine-specific examples, institutions, and peso amounts
- Link to internal PesoHub pages using inline markdown: [descriptive anchor text](/path) — e.g. "use the [Time Deposit Calculator](/calculators/savings/time-deposit-calculator-philippines)". NEVER write a bare path like "at /calculators/..."; always wrap it in a markdown link with natural anchor text. Link each relevant page at least once where it genuinely helps the reader.

Call the save_article tool with the structured article content.`,
              },
            ],
          })
          .finalMessage()
      )
  );

  return extractToolInput(message, ARTICLE_TOOL.name);
}

/**
 * Free-form (non-structured) writing-agent call for actions that do NOT produce
 * a new TS post file — update_existing_page, merge_with_existing_page, hold,
 * reject. Returns the agent's markdown "content action package" as a string.
 *
 * @param {object} ctx  { system, promptHandle } from getWritingSystem()
 * @param {string} keyword
 */
export async function writeActionPackage(ctx, keyword) {
  console.log(`  📦 Writing content-action package for: "${keyword}"...`);
  const system = ctx.system ?? WRITING_AGENT_PROMPT;

  const message = await observeGeneration(
    "action-package",
    { model: MODEL, prompt: ctx.promptHandle, input: keyword },
    () =>
      withRetry(() =>
        anthropic.messages
          .stream({
            model: MODEL,
            max_tokens: 16000,
            system,
            messages: [
              {
                role: "user",
                content:
                  "Follow the Keyword Opportunity Agent's recommended_action. Produce the full output using the writing-agent OUTPUT FORMAT (CONTENT STRATEGY, SEO DETAILS, CONTENT OUTPUT, INTERNAL LINK SUGGESTIONS, SOURCE DISCIPLINE NOTES, FINAL SELF-CHECK) in clean Markdown.",
              },
            ],
          })
          .finalMessage()
      )
  );

  if (message.stop_reason === "max_tokens") {
    throw new Error("Action package truncated (hit max_tokens).");
  }
  return message.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
}
