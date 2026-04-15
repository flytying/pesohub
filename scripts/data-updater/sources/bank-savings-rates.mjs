#!/usr/bin/env node

/**
 * Source script: Bank Savings Interest Rates
 * Scrapes individual bank websites and extracts savings rates.
 */

import { extractUrls, extractWithFallback } from "../lib/fetcher.mjs";
import { extractStructuredData } from "../lib/ai-extractor.mjs";
import {
  readDataFile,
  writeDataFile,
  extractFaqSection,
  extractUpdatedAt,
  getTodayPHT,
} from "../lib/file-writer.mjs";
import { validateRateChanges, validateDataIntegrity } from "../lib/validator.mjs";
import { bankSavingsRatesConfig as config } from "../lib/config.mjs";

/**
 * Parse the current bankSavingsRates array from the data file.
 */
function parseCurrentRates(content) {
  const rates = [];
  const regex =
    /\{\s*bankName:\s*"([^"]+)",\s*accountType:\s*"([^"]+)",\s*interestRate:\s*([\d.]+),\s*rateType:\s*"([^"]+)",\s*minimumBalance:\s*([\d_]+),/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    rates.push({
      bankName: match[1],
      accountType: match[2],
      interestRate: parseFloat(match[3]),
      rateType: match[4],
      minimumBalance: parseInt(match[5].replace(/_/g, ""), 10),
    });
  }
  return rates;
}

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
  const currentRates = parseCurrentRates(content);
  const sourceUrls = config.urls.map((u) => u.url);

  // Extract content from all bank URLs
  const allExtracted = [];
  const failedUrls = [];
  let rawContentLog = "";

  for (const { bankName, url } of config.urls) {
    console.log(`  Fetching ${bankName} (${url})...`);
    const result = await extractWithFallback(url);
    if (result) {
      allExtracted.push({ bankName, ...result });
      rawContentLog += `\n--- ${bankName} (${url}) ---\n${result.rawContent.slice(0, 1000)}\n`;
    } else {
      failedUrls.push(url);
      console.warn(`  ⚠ Failed to extract ${bankName}`);
    }
  }

  if (allExtracted.length === 0) {
    return {
      sourceName: config.name,
      dataFile: config.dataFile,
      sourceUrls,
      status: "failed",
      changes: [],
      warnings: [],
      error: "All bank URL extractions failed",
    };
  }

  // Extract structured data from each bank's page content
  const extractedRates = [];
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
        // Ensure bankName is set
        for (const rate of data.rates) {
          rate.bankName = rate.bankName || bankName;
        }
        extractedRates.push(...data.rates);
      }
    } catch (err) {
      console.warn(`  ⚠ AI extraction failed for ${bankName}: ${err.message}`);
    }
  }

  if (extractedRates.length === 0) {
    return {
      sourceName: config.name,
      dataFile: config.dataFile,
      sourceUrls,
      status: "failed",
      changes: [],
      warnings: [],
      error: "AI extraction returned no rates from any bank",
    };
  }

  // Circuit breaker: catch partial extractions and corrupted rows BEFORE writing
  const integrity = validateDataIntegrity(currentRates, extractedRates, {
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
    extractedRates,
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
  extractedRates.sort((a, b) => (b.interestRate || 0) - (a.interestRate || 0));

  // Build updated file content
  const faqs = extractFaqSection(content, config.faqExport);
  const today = getTodayPHT();

  const rateEntries = extractedRates.map(formatRateEntry).join(",\n");

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
