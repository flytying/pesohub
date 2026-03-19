#!/usr/bin/env node

/**
 * Tavily Search-based structured data extraction.
 * Uses Tavily's AI-powered search (includeAnswer) to extract structured data
 * from page content, eliminating the need for a separate LLM API key.
 *
 * The page text (already fetched via Tavily Extract) is embedded in the search
 * query context, and Tavily's AI generates a structured JSON answer.
 */

import { tavily } from "@tavily/core";

const TAVILY_API_KEY = process.env.TAVILY_API_KEY;

let client = null;

function getClient() {
  if (!TAVILY_API_KEY) {
    throw new Error(
      "TAVILY_API_KEY environment variable is required. Get one at https://tavily.com"
    );
  }
  if (!client) {
    client = tavily({ apiKey: TAVILY_API_KEY });
  }
  return client;
}

/**
 * Build a search query that instructs Tavily's AI to extract structured data.
 */
function buildExtractionQuery({ extractionPrompt, schema, pageText }) {
  const schemaFields = Object.keys(schema.properties || {}).join(", ");

  // Truncate page text to fit in search context (keep under 15K chars for reliability)
  const truncatedText = pageText.slice(0, 15_000);

  return `${extractionPrompt}

Return the answer as valid JSON matching this structure: { ${schemaFields} }

Here is the page content to extract data from:

${truncatedText}`;
}

/**
 * Parse JSON from Tavily's AI answer, handling markdown code blocks and prose.
 */
function parseJsonFromAnswer(answer) {
  if (!answer || typeof answer !== "string") {
    throw new Error("Empty or invalid AI answer");
  }

  // Try 1: Extract JSON from markdown code blocks (```json ... ``` or ``` ... ```)
  const codeBlockMatch = answer.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1].trim());
    } catch {
      // Fall through to other strategies
    }
  }

  // Try 2: Find the first { ... } or [ ... ] block in the answer
  const jsonMatch = answer.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[1]);
    } catch {
      // Fall through
    }
  }

  // Try 3: The entire answer might be JSON
  try {
    return JSON.parse(answer.trim());
  } catch {
    throw new Error(
      `Could not parse JSON from AI answer. Answer preview: ${answer.slice(0, 200)}...`
    );
  }
}

/**
 * Extract structured data from page text using Tavily's AI-powered search.
 *
 * @param {object} params
 * @param {string} params.pageText - Raw text content from Tavily Extract
 * @param {string} params.sourceUrl - URL the text was extracted from (for context)
 * @param {string} params.extractionPrompt - Source-specific prompt describing what to extract
 * @param {object} params.schema - JSON Schema for the expected result (properties, required fields)
 * @param {string} params.schemaName - Name identifier for the extraction type
 * @returns {Promise<object>} Extracted structured data matching the schema
 */
export async function extractStructuredData({
  pageText,
  sourceUrl,
  extractionPrompt,
  schema,
  schemaName,
}) {
  const tvly = getClient();

  const query = buildExtractionQuery({ extractionPrompt, schema, pageText });

  // Use Tavily search with AI answer generation, restricted to the source domain
  const domain = new URL(sourceUrl).hostname;
  const response = await tvly.search(query, {
    includeAnswer: "advanced",
    includeDomains: [domain],
    searchDepth: "advanced",
    maxResults: 3,
    topic: "finance",
  });

  if (!response.answer) {
    throw new Error(
      `Tavily did not return an AI answer for ${schemaName} (source: ${sourceUrl})`
    );
  }

  const extracted = parseJsonFromAnswer(response.answer);

  // Basic validation: ensure we got an object
  if (typeof extracted !== "object" || extracted === null) {
    throw new Error(
      `Extracted data is not an object for ${schemaName} (source: ${sourceUrl})`
    );
  }

  return extracted;
}
