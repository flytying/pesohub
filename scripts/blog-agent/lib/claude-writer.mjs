/**
 * Claude API wrapper for blog article writing.
 *
 * Uses Anthropic tool use to force structured JSON output — eliminates
 * fragile string-based JSON parsing from free-form text.
 */

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();
const MODEL = "claude-sonnet-4-6";

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

const SYSTEM_PROMPT = `You are a Philippine personal finance content writer for PesoHub (pesohub.ph).

Your articles are:
- Written for a Filipino audience (employees, savers, borrowers, OFWs)
- Practical and actionable — not generic filler
- Based on current Philippine financial rules, rates, and institutions
- Properly disclaimed (this is YMYL content)
- Original analysis and explanation, not restating sources

Use Philippine Peso symbol ₱ (not PHP or P).
Refer to the Bangko Sentral ng Pilipinas (BSP), BIR, SSS, PhilHealth, Pag-IBIG by name.
Write in clear, plain English. Avoid jargon unless you explain it.`;

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
              enum: ["heading", "paragraph", "list", "ordered-list", "callout", "quote"],
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

export async function generateOutline(keyword, research, topicMeta = {}) {
  console.log(`  📝 Generating outline for: "${keyword}"...`);

  const message = await withRetry(() =>
    anthropic.messages
      .stream({
        model: MODEL,
        max_tokens: 8192,
        system: SYSTEM_PROMPT,
        tools: [OUTLINE_TOOL],
        tool_choice: { type: "tool", name: OUTLINE_TOOL.name },
        messages: [
          {
            role: "user",
            content: `Generate a detailed article outline for the keyword: "${keyword}"

${topicMeta.title ? `Suggested title: ${topicMeta.title}` : ""}
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
  );

  return extractToolInput(message, OUTLINE_TOOL.name);
}

export async function writeArticle(outline, research, topicMeta = {}) {
  console.log(`  ✍️  Writing full article...`);

  const message = await withRetry(() =>
    anthropic.messages
      .stream({
        model: MODEL,
        // Long structured articles (1500+ words + JSON tool overhead)
        // overran the prior 16k cap → max_tokens truncation. sonnet-4-6
        // supports up to 64k output; 32k gives ample headroom.
        // Streaming required: SDK rejects non-streamed requests whose
        // max_tokens implies a >10min worst-case duration.
        max_tokens: 32000,
        system: SYSTEM_PROMPT,
        tools: [ARTICLE_TOOL],
        tool_choice: { type: "tool", name: ARTICLE_TOOL.name },
        messages: [
          {
            role: "user",
            content: `Write a complete blog article based on this outline and research.

Title: ${outline.title}
Category: ${outline.category}
Direct Answer: ${outline.directAnswer}

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
- Write original content — do not copy from research sources
- Philippine-specific examples, institutions, and peso amounts

Call the save_article tool with the structured article content.`,
          },
        ],
      })
      .finalMessage()
  );

  return extractToolInput(message, ARTICLE_TOOL.name);
}
