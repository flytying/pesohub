#!/usr/bin/env node

/**
 * Source script: Digital Bank Rates
 * Scrapes digital bank websites and extracts comparison data.
 */

import { extractWithFallback } from "../lib/fetcher.mjs";
import { extractStructuredData } from "../lib/ai-extractor.mjs";
import {
  readDataFile,
  writeDataFile,
  extractFaqSection,
  getTodayPHT,
} from "../lib/file-writer.mjs";
import { validateRateChanges } from "../lib/validator.mjs";
import { bankDigitalRatesConfig as config } from "../lib/config.mjs";

function parseCurrentRates(content) {
  const rates = [];
  const regex =
    /\{\s*bankName:\s*"([^"]+)"[\s\S]*?baseRate:\s*([\d.]+)[\s\S]*?promoRate:\s*([\d.]+|null)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    rates.push({
      bankName: match[1],
      baseRate: parseFloat(match[2]),
      promoRate: match[3] === "null" ? null : parseFloat(match[3]),
    });
  }
  return rates;
}

function formatRateEntry(rate) {
  const promoRate = rate.promoRate != null ? rate.promoRate : "null";
  return `  {
    bankName: "${rate.bankName}",
    bestFor: "${rate.bestFor || ""}",
    baseRate: ${rate.baseRate},
    promoRate: ${promoRate},
    cardAtmAccess: "${(rate.cardAtmAccess || "").replace(/"/g, '\\"')}",
    transfers: "${(rate.transfers || "").replace(/"/g, '\\"')}",
    limitsConditions: "${(rate.limitsConditions || "").replace(/"/g, '\\"')}",
    depositInsurance: "${(rate.depositInsurance || "PDIC-insured up to ₱1,000,000").replace(/"/g, '\\"')}",
    notes: "${(rate.notes || "").replace(/"/g, '\\"')}",
  }`;
}

export async function run() {
  console.log(`\n── ${config.name} ──`);

  const content = readDataFile(config.dataFile);
  const currentRates = parseCurrentRates(content);
  const sourceUrls = config.urls.map((u) => u.url);

  const allExtracted = [];
  let rawContentLog = "";

  for (const { bankName, url } of config.urls) {
    console.log(`  Fetching ${bankName} (${url})...`);
    const result = await extractWithFallback(url);
    if (result) {
      allExtracted.push({ bankName, ...result });
      rawContentLog += `\n--- ${bankName} (${url}) ---\n${result.rawContent.slice(0, 1000)}\n`;
    } else {
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

  const extractedRates = [];
  for (const { bankName, rawContent, url } of allExtracted) {
    try {
      console.log(`  Extracting rates for ${bankName}...`);
      const data = await extractStructuredData({
        pageText: rawContent,
        sourceUrl: url,
        extractionPrompt: config.extractionPrompt,
        schema: config.schema,
        schemaName: "extract_digital_bank_rates",
      });

      if (data.rates && data.rates.length > 0) {
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
      error: "AI extraction returned no rates",
    };
  }

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

  if (validation.changes.length === 0) {
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

  extractedRates.sort((a, b) => (b.baseRate || 0) - (a.baseRate || 0));

  const faqs = extractFaqSection(content, config.faqExport);
  const today = getTodayPHT();
  const rateEntries = extractedRates.map(formatRateEntry).join(",\n");

  const newContent = `import type { FAQ } from "@/types/content";

export const ${config.updatedAtExport} = "${today}";

export interface DigitalBankRate {
  bankName: string;
  bestFor: string;
  baseRate: number;
  promoRate: number | null;
  cardAtmAccess: string;
  transfers: string;
  limitsConditions: string;
  depositInsurance: string;
  notes: string;
}

/**
 * Digital bank comparison data for Philippine digital banks,
 * sorted by base rate descending.
 */
export const ${config.dataArrayExport}: DigitalBankRate[] = [
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
