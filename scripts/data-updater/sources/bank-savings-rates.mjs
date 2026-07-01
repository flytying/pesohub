#!/usr/bin/env node

/**
 * Source script: Bank Savings Interest Rates
 * Scrapes individual bank websites and extracts savings rates.
 */

import {
  readDataFile,
  writeDataFile,
  extractFaqSection,
  parseDataArray,
  getTodayPHT,
  dedupeRates,
} from "../lib/file-writer.mjs";
import {
  validateRateChanges,
  validateDataIntegrity,
} from "../lib/validator.mjs";
import { fetchBankSources, extractGuardedRates } from "../lib/bank-guards.mjs";
import { checkAgainstBaselines } from "../lib/baselines.mjs";
import { bankSavingsRatesConfig as config } from "../lib/config.mjs";

const REQUIRED_STRING_FIELDS = ["bankName"];
const REQUIRED_NUMBER_FIELDS = ["interestRate"];

// Traditional branch banks — everything else is treated as a digital bank.
// bankType is a classification, not a scrapeable value, so it is derived here.
const TRADITIONAL_BANKS = [
  "bdo",
  "bpi",
  "metrobank",
  "pnb",
  "landbank",
  "dbp",
  "security bank",
  "china bank",
  "chinabank",
  "rcbc",
  "unionbank",
  "eastwest",
  "psbank",
  "robinsons bank",
];

/** Classify a bank as "traditional" or "digital" from its name. */
function classifyBankType(bankName, existing) {
  if (existing === "traditional" || existing === "digital") return existing;
  const name = (bankName || "").toLowerCase();
  return TRADITIONAL_BANKS.some((b) => name.includes(b)) ? "traditional" : "digital";
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
    bankType: "${classifyBankType(rate.bankName, rate.bankType)}",
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

  const { allExtracted, rawContentLog } = await fetchBankSources(config);

  const newRatesByBank = await extractGuardedRates({
    allExtracted,
    config,
    schemaName: "extract_savings_rates",
    requiredStringFields: REQUIRED_STRING_FIELDS,
    requiredNumberFields: REQUIRED_NUMBER_FIELDS,
  });

  // Merge strategy: use new rates for banks that succeeded,
  // preserve existing rates for banks that had no new data.
  const mergedRates = [];
  const preservedBanks = [];
  const updatedBanks = [];

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
      }
    }
  }

  if (updatedBanks.length > 0) {
    console.log(`  ✓ Updated: ${updatedBanks.join(", ")}`);
  }
  if (preservedBanks.length > 0) {
    console.log(`  ↻ Preserved existing: ${preservedBanks.join(", ")}`);
  }

  // Dedupe by bankName + accountType — new rows iterate first, so duplicates
  // preserved from the existing file (under more-specific bankName variants)
  // are dropped here.
  const beforeDedupe = mergedRates.length;
  const deduped = dedupeRates(mergedRates, ["bankName", "accountType"]);
  if (deduped.length < beforeDedupe) {
    console.log(`  ⊘ Dropped ${beforeDedupe - deduped.length} duplicate row(s)`);
  }
  mergedRates.length = 0;
  mergedRates.push(...deduped);

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
    requiredStringFields: REQUIRED_STRING_FIELDS,
    requiredNumberFields: REQUIRED_NUMBER_FIELDS,
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

  // Flag grounded values that diverge sharply from the curated baseline —
  // written (guarded auto-write) but surfaced for human confirmation.
  const { flags: baselineFlags } = checkAgainstBaselines(mergedRates, config.baselines, {
    nameField: config.validationOptions.nameField,
    rateFields: config.validationOptions.rateFields,
    verifiedAt: config.baselinesVerifiedAt,
  });

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
  /** Whether the provider is an app-based digital bank or a traditional branch bank. */
  bankType: "digital" | "traditional";
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
    warnings: [...validation.warnings, ...baselineFlags],
    rawContent: rawContentLog,
  };
}
