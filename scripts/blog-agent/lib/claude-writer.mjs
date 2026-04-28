/**
 * Claude API wrapper for blog article writing.
 *
 * Uses the Anthropic SDK to generate article outlines and full articles.
 */

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

/** Strip markdown code fences from Claude responses before parsing JSON. */
function parseJsonResponse(message) {
  const text = message.content[0].text;
  if (message.stop_reason === "max_tokens") {
    throw new Error(`Response truncated (hit max_tokens). stop_reason: max_tokens. Partial response: ${text.slice(-200)}`);
  }
  const stripped = text.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "");
  return JSON.parse(stripped);
}

/** Retry a Claude API call on transient errors (overloaded, rate-limited). */
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

/**
 * Generate an article outline from a keyword and research.
 */
export async function generateOutline(keyword, research, topicMeta = {}) {
  console.log(`  📝 Generating outline for: "${keyword}"...`);

  const message = await withRetry(() => anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
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

Respond with valid JSON only (no markdown fences):
{
  "title": "Article title",
  "metaTitle": "SEO title (max 60 chars)",
  "metaDescription": "Meta description (120-155 chars)",
  "category": "savings|investing|tax|government|banking|budgeting|insurance|general",
  "directAnswer": "1-2 sentence quick answer",
  "sections": [
    { "heading": "H2 heading", "keyPoints": ["point 1", "point 2"] }
  ],
  "suggestedFaqs": [
    { "question": "...", "answer": "..." }
  ],
  "estimatedReadTime": 7
}`,
      },
    ],
  }));

  return parseJsonResponse(message);
}

/**
 * Write a full article from an outline and research.
 */
export async function writeArticle(outline, research, topicMeta = {}) {
  console.log(`  ✍️  Writing full article...`);

  const message = await withRetry(() => anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 16000,
    system: SYSTEM_PROMPT,
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

IMPORTANT: Respond with valid JSON only (no markdown fences). Use this exact structure:
{
  "sections": [
    { "type": "heading", "heading": "H2 text", "level": 2 },
    { "type": "paragraph", "content": "paragraph text..." },
    { "type": "list", "items": ["item 1", "item 2"] },
    { "type": "ordered-list", "items": ["step 1", "step 2"] },
    { "type": "callout", "variant": "info|warning|tip", "content": "callout text..." },
    { "type": "quote", "content": "quote text..." }
  ],
  "faqs": [
    { "question": "...", "answer": "..." }
  ],
  "excerpt": "1-2 sentence summary for listing page"
}

Requirements:
- Minimum 8 sections with H2 headings
- At least 5 FAQs
- At least 1500 words of content across all paragraphs
- Include at least 1 callout (tip or info)
- Write original content — do not copy from research sources
- Philippine-specific examples, institutions, and peso amounts`,
      },
    ],
  }));

  return parseJsonResponse(message);
}
