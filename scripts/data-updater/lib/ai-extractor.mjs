#!/usr/bin/env node

/**
 * Claude-based structured data extraction.
 *
 * Takes raw page text (already fetched via Tavily Extract) and uses
 * Claude's tool-use mode to return schema-compliant JSON. This replaced
 * the earlier Tavily Search-based extractor, which re-searched the domain
 * and ignored the page text we'd already fetched — resulting in frequent
 * "no AI answer" failures on JS-heavy bank sites.
 *
 * Requires ANTHROPIC_API_KEY.
 */

import Anthropic from "@anthropic-ai/sdk";

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 4096;
// Bank/government pages rarely need more than ~50k chars of context.
// Rate tables and key data are typically near the top of the page.
const MAX_PAGE_TEXT_CHARS = 50000;

let client = null;

function getClient() {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY environment variable is required for structured data extraction."
    );
  }
  if (!client) {
    client = new Anthropic();
  }
  return client;
}

/** Retry a Claude API call on transient errors (overloaded, rate-limited). */
async function withRetry(fn, { retries = 3, delayMs = 5000 } = {}) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const retryable =
        err.status === 429 || err.status === 529 || err.status >= 500;
      if (!retryable || attempt === retries) throw err;
      const wait = delayMs * attempt;
      console.log(
        `  ⏳ Claude API error ${err.status}, retrying in ${wait / 1000}s (attempt ${attempt}/${retries})...`
      );
      await new Promise((r) => setTimeout(r, wait));
    }
  }
}

/**
 * Extract structured data from page text using Claude with tool use.
 *
 * @param {object} params
 * @param {string} params.pageText - Raw text content from Tavily Extract
 * @param {string} params.sourceUrl - URL the text was extracted from (for context)
 * @param {string} params.extractionPrompt - Source-specific prompt describing what to extract
 * @param {object} params.schema - JSON Schema for the expected result
 * @param {string} params.schemaName - Name identifier (used as the tool name)
 * @returns {Promise<object>} Extracted data matching the schema
 */
export async function extractStructuredData({
  pageText,
  sourceUrl,
  extractionPrompt,
  schema,
  schemaName,
  imageUrls = [],
}) {
  const anthropic = getClient();

  const hasImages = Array.isArray(imageUrls) && imageUrls.length > 0;

  if (!hasImages && (!pageText || pageText.trim().length === 0)) {
    throw new Error(
      `Empty page text for ${schemaName} (source: ${sourceUrl}) — nothing to extract`
    );
  }

  // Vision path: some government tables (e.g. the SSS contribution schedule)
  // render only as images, so text extraction sees no numbers. When imageUrls
  // are supplied we read the image(s) directly instead of relying on pageText.
  const truncatedText = pageText
    ? pageText.length > MAX_PAGE_TEXT_CHARS
      ? pageText.slice(0, MAX_PAGE_TEXT_CHARS)
      : pageText
    : "";

  const instructions = `Instructions:
- Extract only what is explicitly stated ${hasImages ? "in the image(s)" : "on the page"}. Do NOT invent or guess values.
- If a field is not present, omit it (the tool schema marks required fields).
- If no relevant data is visible, return an empty array for list fields and omit scalar fields.
- Philippine peso amounts: return as plain numbers (e.g., 1000000 not "₱1,000,000").
- Rates: return as percentages (e.g., 4.5 for 4.5%), not decimals (not 0.045).`;

  const content = [];
  for (const url of hasImages ? imageUrls : []) {
    content.push({ type: "image", source: { type: "url", url } });
  }
  content.push({
    type: "text",
    text: `${extractionPrompt}

Source URL: ${sourceUrl}
${truncatedText ? `\nPage content:\n${truncatedText}\n` : ""}
${instructions}`,
  });

  const message = await withRetry(() =>
    anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      tools: [
        {
          name: schemaName,
          description: extractionPrompt,
          input_schema: schema,
        },
      ],
      tool_choice: { type: "tool", name: schemaName },
      messages: [{ role: "user", content }],
    })
  );

  const toolUseBlock = message.content.find((b) => b.type === "tool_use");
  if (!toolUseBlock) {
    const textPreview = message.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join(" ")
      .slice(0, 200);
    throw new Error(
      `Claude did not return tool use for ${schemaName} (source: ${sourceUrl}). Preview: ${textPreview}`
    );
  }

  const extracted = toolUseBlock.input;

  if (typeof extracted !== "object" || extracted === null) {
    throw new Error(
      `Extracted data is not an object for ${schemaName} (source: ${sourceUrl})`
    );
  }

  return extracted;
}
