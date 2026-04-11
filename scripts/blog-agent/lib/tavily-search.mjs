/**
 * Tavily web research wrapper for blog article research.
 *
 * Uses Tavily Search API to find relevant sources and facts
 * for a given keyword topic.
 */

import { tavily } from "@tavily/core";

const client = tavily({ apiKey: process.env.TAVILY_API_KEY });

/**
 * Research a keyword topic using Tavily Search.
 *
 * @param {string} keyword - The target keyword/topic to research
 * @returns {Promise<{summary: string, sources: Array<{title: string, url: string, content: string}>}>}
 */
export async function researchTopic(keyword) {
  console.log(`  📚 Researching: "${keyword}"...`);

  const result = await client.search(keyword + " philippines 2026", {
    topic: "finance",
    searchDepth: "advanced",
    maxResults: 8,
    includeAnswer: "advanced",
  });

  const sources = (result.results || []).map((r) => ({
    title: r.title || "",
    url: r.url || "",
    content: (r.content || "").slice(0, 1500), // trim for context window
  }));

  console.log(`  ✅ Found ${sources.length} sources`);

  return {
    summary: result.answer || "",
    sources,
  };
}
