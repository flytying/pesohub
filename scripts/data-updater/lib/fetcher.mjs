#!/usr/bin/env node

/**
 * Tavily Extract API wrapper for batch URL content extraction.
 * Handles JS-rendered pages server-side and returns clean text/markdown.
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
 * Extract content from one or more URLs using Tavily Extract API.
 *
 * @param {string[]} urls - Array of URLs to extract (max 20 per batch)
 * @param {{ extractDepth?: "basic" | "advanced" }} options
 * @returns {Promise<{ results: Array<{ url: string, rawContent: string, fetchedAt: string }>, failed: Array<{ url: string, error: string }> }>}
 */
export async function extractUrls(urls, options = {}) {
  const { extractDepth = "basic" } = options;
  const tvly = getClient();

  const results = [];
  const failed = [];
  const fetchedAt = new Date().toISOString();

  // Tavily supports up to 20 URLs per call; batch if needed
  const batches = [];
  for (let i = 0; i < urls.length; i += 20) {
    batches.push(urls.slice(i, i + 20));
  }

  for (const batch of batches) {
    try {
      const response = await tvly.extract(batch, { extractDepth });

      for (const result of response.results || []) {
        results.push({
          url: result.url,
          rawContent: result.rawContent,
          fetchedAt,
        });
      }

      for (const fail of response.failedResults || []) {
        failed.push({
          url: fail.url,
          error: fail.error || "Extraction failed",
        });
      }
    } catch (err) {
      // If entire batch fails, mark all URLs as failed
      for (const url of batch) {
        failed.push({ url, error: err.message });
      }
    }
  }

  return { results, failed };
}

/**
 * Extract a single URL with automatic retry using advanced depth on failure.
 *
 * @param {string} url
 * @returns {Promise<{ url: string, rawContent: string, fetchedAt: string } | null>}
 */
export async function extractWithFallback(url) {
  const { results, failed } = await extractUrls([url], {
    extractDepth: "basic",
  });

  if (results.length > 0) return results[0];

  // Retry with advanced extraction depth
  console.warn(
    `Basic extraction failed for ${url}: ${failed[0]?.error}. Retrying with advanced depth...`
  );
  const retry = await extractUrls([url], { extractDepth: "advanced" });

  if (retry.results.length > 0) return retry.results[0];

  console.error(
    `Advanced extraction also failed for ${url}: ${retry.failed[0]?.error}`
  );
  return null;
}
