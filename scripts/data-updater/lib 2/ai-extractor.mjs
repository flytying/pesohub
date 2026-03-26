#!/usr/bin/env node

/**
 * Claude API wrapper for structured data extraction from web page text.
 * Uses tool_use to guarantee valid JSON output matching the target schema.
 */

import Anthropic from "@anthropic-ai/sdk";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

let client = null;

function getClient() {
  if (!ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY environment variable is required. Get one at https://console.anthropic.com"
    );
  }
  if (!client) {
    client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
  }
  return client;
}

/**
 * Extract structured data from page text using Claude.
 *
 * @param {object} params
 * @param {string} params.pageText - Raw text content from Tavily Extract
 * @param {string} params.sourceUrl - URL the text was extracted from (for context)
 * @param {string} params.extractionPrompt - Source-specific prompt describing what to extract
 * @param {object} params.schema - JSON Schema for the tool_use result (properties, required fields)
 * @param {string} params.schemaName - Name for the tool (e.g., "extract_savings_rates")
 * @returns {Promise<object>} Extracted structured data matching the schema
 */
export async function extractStructuredData({
  pageText,
  sourceUrl,
  extractionPrompt,
  schema,
  schemaName,
}) {
  const anthropic = getClient();

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: `You are a precise data extraction assistant for a Philippine personal finance website.
Extract ONLY data that is clearly stated on the page. Never guess, infer, or fabricate values.
If a value is unclear or not found, omit that entry entirely.
All monetary values should be in Philippine Pesos (₱).
All interest rates should be annual percentages (p.a.) as numbers (e.g., 6 not 0.06).`,
    tools: [
      {
        name: schemaName,
        description: extractionPrompt,
        input_schema: schema,
      },
    ],
    tool_choice: { type: "tool", name: schemaName },
    messages: [
      {
        role: "user",
        content: `Extract structured data from this webpage content.

Source URL: ${sourceUrl}

Page content:
${pageText.slice(0, 50_000)}`,
      },
    ],
  });

  // Extract the tool_use result
  const toolUse = response.content.find((block) => block.type === "tool_use");
  if (!toolUse) {
    throw new Error("Claude did not return structured data via tool_use");
  }

  return toolUse.input;
}
