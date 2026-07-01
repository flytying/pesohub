#!/usr/bin/env node

/**
 * Source script: Time Deposit Rates
 * Scrapes bank websites and extracts time deposit rate data.
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
import { bankTimeDepositRatesConfig as config } from "../lib/config.mjs";

const REQUIRED_STRING_FIELDS = ["bankName", "termLength"];
const REQUIRED_NUMBER_FIELDS = ["grossRate"];

function formatRateEntry(rate) {
  const minDeposit = rate.minimumDeposit ?? 0;
  const formattedMin =
    minDeposit >= 1000
      ? minDeposit.toLocaleString("en-US").replace(/,/g, "_")
      : minDeposit;

  return `  {
    bankName: "${rate.bankName}",
    product: "${rate.product || "Time Deposit"}",
    termLength: "${rate.termLength || ""}",
    grossRate: ${rate.grossRate},
    minimumDeposit: ${formattedMin},
    taxNote: "${rate.taxNote || "Gross before 20% WHT"}",
    bestFor: "${rate.bestFor || ""}",
    notes: "${(rate.notes || "").replace(/"/g, '\\"')}",
  }`;
}

export async function run() {
  console.log(`\n── ${config.name} ──`);

  const content = readDataFile(config.dataFile);
  const currentRates = parseDataArray(content, config.dataArrayExport);
  const sourceUrls = config.urls.map((u) => u.url);

  const { allExtracted, rawContentLog } = await fetchBankSources(config);

  const newRatesByBank = await extractGuardedRates({
    allExtracted,
    config,
    schemaName: "extract_time_deposit_rates",
    requiredStringFields: REQUIRED_STRING_FIELDS,
    requiredNumberFields: REQUIRED_NUMBER_FIELDS,
  });

  // Merge strategy: use new rates per-bank, preserve existing when no new data
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

  // Dedupe by bankName + product + termLength — drops duplicates kept under
  // more-specific bank variants when new and existing keys diverge.
  const beforeDedupe = mergedRates.length;
  const deduped = dedupeRates(mergedRates, ["bankName", "product", "termLength"]);
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

  // Circuit breaker: catch corruption in the MERGED data
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

  // Flag grounded values that diverge sharply from the curated baseline —
  // written (guarded auto-write) but surfaced for human confirmation.
  const { flags: baselineFlags } = checkAgainstBaselines(mergedRates, config.baselines, {
    nameField: config.validationOptions.nameField,
    rateFields: config.validationOptions.rateFields,
    verifiedAt: config.baselinesVerifiedAt,
  });

  mergedRates.sort((a, b) => (b.grossRate || 0) - (a.grossRate || 0));

  const faqs = extractFaqSection(content, config.faqExport);
  const today = getTodayPHT();
  const rateEntries = mergedRates.map(formatRateEntry).join(",\n");

  const newContent = `import type { FAQ } from "@/types/content";

export const ${config.updatedAtExport} = "${today}";

export interface BankTimeDepositRate {
  bankName: string;
  product: string;
  termLength: string;
  grossRate: number;
  minimumDeposit: number;
  taxNote: string;
  bestFor: string;
  notes: string;
}

/**
 * Time deposit rates from Philippine banks, sorted by gross rate descending.
 * Rates are gross annual rates (before 20% final withholding tax on interest income).
 */
export const ${config.dataArrayExport}: BankTimeDepositRate[] = [
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
