#!/usr/bin/env node

/**
 * Source script: Bank Savings Interest Rates
 * Scrapes individual bank websites and extracts savings rates.
 */

import { extractWithFallback } from "../lib/fetcher.mjs";
import { extractStructuredData } from "../lib/ai-extractor.mjs";
import {
  readDataFile,
  writeDataFile,
  extractFaqSection,
  parseDataArray,
  getTodayPHT,
} from "../lib/file-writer.mjs";
import { validateRateChanges, validateDataIntegrity } from "../lib/validator.mjs";
import { bankSavingsRatesConfig as config } from "../lib/config.mjs";

/**
 * Format a rate entry as TypeScript source.
 */
function formatRateEntry(rate) {
  const minBal = rate.minimumBalance ?? 0;
  return `  {
    bankName: "${rate.bankName}",
    accountType: "${rate.accountType}",
    interestRate: ${rate.interestRate},
    rateType: "${rate.rateType}",
    minimumBalance: ${minBal >= 1000 ? minBal.toLocaleString("en-US").replace(/,/g, "_") : minBal},
    liquidity: "${rate.liquidity || "App-based transfers"}",
    bestFor: "${rate.bestFor || ""}",
    notes: "${(rate.notes || "").replace(/"/g, '\\"')}",
  }`;
}

/**
 * Run the savings rates update.
 * @returns {import("../lib/reporter.mjs").SourceReport}
 */
export async function run() {
  console.log(`\n── ${config.name} ──`);

  const content = readDataFile(config.dataFile);
  const currentRates = parseDataArray(content, config.dataArrayExport);
  const sourceUrls = config.urls.map((u) => u.url);

  // Extract content from all bank URLs
  const allExtracted = [];
  const fetchFailedBanks = new Set();
  let rawContentLog = "";

  for (const { bankName, url } of config.urls) {
    console.log(`  Fetching ${bankName} (${url})...`);
    const result = await extractWithFallback(url);
    if (result) {
      allExtracted.push({ bankName, ...result });
      rawContentLog += `\n--- ${bankName} (${url}) ---\n${result.rawContent.slice(0, 1000)}\n`;
    } else {
      fetchFailedBanks.add(bankName);
      console.warn(`  ⚠ Failed to extract ${bankName}`);
    }
  }

  // Extract structured data from each bank's page content.
  // Track which banks produced valid new rate data so we can merge
  // with existing data for banks whose pages returned nothing.
  const newRatesByBank = new Map();
  const aiFailedBanks = new Set();

  for (const { bankName, rawContent, url } of allExtracted) {
    try {
      console.log(`  Extracting rates for ${bankName}...`);
      const data = await extractStructuredData({
        pageText: rawContent,
        sourceUrl: url,
        extractionPrompt: config.extractionPrompt,
        schema: config.schema,
        schemaName: "extract_savings_rates",
      });

      if (data.rates && data.rates.length > 0) {
        for (const rate of data.rates) {
          rate.bankName = rate.bankName || bankName;
        }
        newRatesByBank.set(bankName, data.rates);
      } else {
        console.log(`    (no rates visible on ${bankName} page)`);
      }
    } catch (err) {
      aiFailedBanks.add(bankName);
      console.warn(`  ⚠ AI extraction failed for ${bankName}: ${err.message}`);
    }
  }

  // Merge strategy: use new rates for banks that succeeded,
  // preserve existing rates for banks that had no new data.
  const mergedRates = [];
  const preservedBanks = [];
  const updatedBanks = [];
  const missingFromBoth = [];

  const knownBanks = new Set([
    ...config.urls.map((u) => u.bankName),
    ...currentRates.map((r) => r.bankName),
  ]);

  for (const bankName of knownBanks) {
    if (newRatesByBank.has(bankName)) {
      mergedRates.push(...newRatesByBank.get(bankName));
      updatedBanks.push(bankName);
    } else {
      const existing = currentRates.filter((r) => r.bankName === bankName);
      if (existing.length > 0) {
        mergedRates.push(...existing);
        preservedBanks.push(bankName);
      } else {
        missingFromBoth.push(bankName);
      }
    }
  }

  if (updatedBanks.length > 0) {
    console.log(`  ✓ Updated: ${updatedBanks.join(", ")}`);
  }
  if (preservedBanks.length > 0) {
    console.log(`  ↻ Preserved existing: ${preservedBanks.join(", ")}`);
  }

  if (mergedRates.length === 0) {
    return {
      sourceName: config.name,
      dataFile: config.dataFile,
      sourceUrls,
      status: "failed",
      changes: [],
      warnings: [],
      error: "No rates available after merge (both current and new empty)",
    };
  }

  // Circuit breaker: catch corruption (empty/undefined fields) in the MERGED data.
  // With merge strategy, row count can only stay the same or grow, so the
  // drop-percent check will never trip unless extraction actually corrupts a row.
  const integrity = validateDataIntegrity(currentRates, mergedRates, {
    requiredStringFields: ["bankName"],
    requiredNumberFields: ["interestRate"],
    maxRowDropPercent: 30,
    minRows: 5,
  });

  if (!integrity.isValid) {
    return {
      sourceName: config.name,
      dataFile: config.dataFile,
      sourceUrls,
      status: "failed",
      changes: [],
      warnings: integrity.warnings,
      error: "Circuit breaker tripped — data integrity check failed",
    };
  }

  // Validate against current data
  const validation = validateRateChanges(
    currentRates,
    mergedRates,
    config.validationOptions
  );

  if (!validation.isValid) {
    return {
      sourceName: config.name,
      dataFile: config.dataFile,
      sourceUrls,
      status: "failed",
      changes: validation.changes,
      warnings: validation.warnings,
      error: "Validation failed — data rejected",
    };
  }

  // Check if data actually changed
  const hasChanges = validation.changes.length > 0;
  if (!hasChanges) {
    console.log("  No changes detected.");
    return {
      sourceName: config.name,
      dataFile: config.dataFile,
      sourceUrls,
      status: "unchanged",
      changes: [],
      warnings: [],
    };
  }

  // Sort by interestRate descending (match existing file convention)
  mergedRates.sort((a, b) => (b.interestRate || 0) - (a.interestRate || 0));

  // Build updated file content
  const faqs = extractFaqSection(content, config.faqExport);
  const today = getTodayPHT();

  const rateEntries = mergedRates.map(formatRateEntry).join(",\n");

  const newContent = `import type { FAQ } from "@/types/content";

export const ${config.updatedAtExport} = "${today}";

export interface BankSavingsRate {
  bankName: string;
  accountType: string;
  interestRate: number;
  rateType: "Promo" | "Standard";
  minimumBalance: number;
  liquidity: string;
  bestFor: string;
  notes: string;
}

/**
 * Savings interest rates from Philippine banks, sorted by interest rate descending.
 * Rates are annual percentage yield (p.a.) for regular savings accounts.
 */
export const ${config.dataArrayExport}: BankSavingsRate[] = [
${rateEntries},
];

${faqs}
`;

  writeDataFile(config.dataFile, newContent);
  console.log(`  ✓ Updated ${config.dataFile}`);

  return {
    sourceName: config.name,
    dataFile: config.dataFile,
    sourceUrls,
    status: "updated",
    changes: validation.changes,
    warnings: validation.warnings,
    rawContent: rawContentLog,
  };
}
