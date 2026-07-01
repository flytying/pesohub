#!/usr/bin/env node

/**
 * Shared fetch + guard pipeline for the three bank rate sources
 * (savings / digital / time-deposit), which were previously copy-pasted.
 *
 * Centralizes the anti-hallucination guards from #202 so there is ONE place to
 * test and tune them:
 *   - per-URL fetch with browser-render + vision support,
 *   - a rate-signal gate (skip banks whose text has no rate at all),
 *   - grounding (drop rows whose values aren't literally in the source text).
 *
 * The per-source specifics (formatRateEntry, interface, sort field, integrity
 * thresholds, dedupe keys, baseline compare) stay in each source script.
 */

import { extractWithFallback } from "./fetcher.mjs";
import { extractStructuredData } from "./ai-extractor.mjs";
import {
  filterValidRows,
  filterGroundedRows,
  hasRateSignal,
} from "./validator.mjs";

/**
 * Fetch every configured source URL.
 *
 * Each `config.urls[]` entry may carry:
 *   - `imageUrls: string[]` → vision source; skip text fetch, read images later.
 *   - `renderStrategy: "browser"` → render with Playwright before Tavily.
 *
 * @param {object} config - a bank rate config from lib/config.mjs
 * @returns {Promise<{ allExtracted: Array<{bankName,url,rawContent,imageUrls?}>, rawContentLog: string }>}
 */
export async function fetchBankSources(config) {
  const allExtracted = [];
  let rawContentLog = "";

  for (const entry of config.urls) {
    const { bankName, url, imageUrls, renderStrategy } = entry;

    if (Array.isArray(imageUrls) && imageUrls.length > 0) {
      console.log(`  Reading ${bankName} via vision (${imageUrls.length} image(s))...`);
      allExtracted.push({ bankName, url, rawContent: "", imageUrls });
      continue;
    }

    console.log(`  Fetching ${bankName} (${url})...`);
    const result = await extractWithFallback(url, { renderStrategy });
    if (result) {
      allExtracted.push({ bankName, url, rawContent: result.rawContent });
      rawContentLog += `\n--- ${bankName} (${url}) ---\n${result.rawContent.slice(0, 1000)}\n`;
    } else {
      console.warn(`  ⚠ Failed to extract ${bankName}`);
    }
  }

  return { allExtracted, rawContentLog };
}

/**
 * Extract structured rate rows per bank, applying the guards.
 *
 * Text sources: skipped entirely when the fetched text has no rate signal
 * (nav/ad shell — the #199 failure mode), and each extracted row must be
 * grounded (its rate values literally present in the text) or it is dropped.
 * Vision sources: trusted like the SSS pattern (no text to ground against);
 * baseline divergence still catches bad reads downstream.
 *
 * @param {object} params
 * @param {Array<object>} params.allExtracted - from fetchBankSources
 * @param {object} params.config
 * @param {string} params.schemaName
 * @param {string[]} params.requiredStringFields
 * @param {string[]} params.requiredNumberFields
 * @returns {Promise<Map<string, Array<object>>>} newRatesByBank
 */
export async function extractGuardedRates({
  allExtracted,
  config,
  schemaName,
  requiredStringFields,
  requiredNumberFields,
}) {
  const rateFields = config.validationOptions?.rateFields ?? [];
  const newRatesByBank = new Map();

  for (const { bankName, rawContent, url, imageUrls } of allExtracted) {
    const usingVision = Array.isArray(imageUrls) && imageUrls.length > 0;

    // Rate-signal gate: text with no % / p.a. token can only yield hallucinated
    // rates. Skip → the source's merge step preserves the existing values.
    if (!usingVision && !hasRateSignal(rawContent)) {
      console.log(
        `    (no rate signal in ${bankName} text — skipping; existing rates preserved)`
      );
      continue;
    }

    try {
      console.log(`  Extracting rates for ${bankName}...`);
      const data = await extractStructuredData({
        pageText: rawContent,
        imageUrls: usingVision ? imageUrls : [],
        sourceUrl: url,
        extractionPrompt: config.extractionPrompt,
        schema: config.schema,
        schemaName,
      });

      if (!data.rates || data.rates.length === 0) {
        console.log(`    (no rates visible on ${bankName} page)`);
        continue;
      }

      for (const rate of data.rates) {
        rate.bankName = rate.bankName || bankName;
      }

      const { valid, dropped } = filterValidRows(data.rates, {
        requiredStringFields,
        requiredNumberFields,
      });
      if (dropped > 0) {
        console.log(
          `    (dropped ${dropped} invalid row${dropped === 1 ? "" : "s"} from ${bankName})`
        );
      }

      // Anti-hallucination grounding — text sources only. Vision reads have no
      // text to ground against and are trusted like the SSS circulars.
      let grounded = valid;
      if (!usingVision) {
        const g = filterGroundedRows(valid, rawContent, { rateFields });
        grounded = g.valid;
        if (g.dropped > 0) {
          console.log(
            `    (dropped ${g.dropped} ungrounded row${g.dropped === 1 ? "" : "s"} from ${bankName} — value not found as a rate in source text)`
          );
        }
      }

      if (grounded.length > 0) {
        newRatesByBank.set(bankName, grounded);
      } else {
        console.log(`    (no grounded rates from ${bankName} page)`);
      }
    } catch (err) {
      console.warn(`  ⚠ AI extraction failed for ${bankName}: ${err.message}`);
    }
  }

  return newRatesByBank;
}
