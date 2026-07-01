#!/usr/bin/env node

/**
 * Source script: Digital Bank Rates
 * Scrapes digital bank websites and extracts comparison data.
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
import { bankDigitalRatesConfig as config } from "../lib/config.mjs";

const REQUIRED_STRING_FIELDS = ["bankName"];
const REQUIRED_NUMBER_FIELDS = ["baseRate"];

function formatRateEntry(rate) {
  const promoRate = rate.promoRate != null ? rate.promoRate : "null";
  return `  {
    bankName: "${rate.bankName}",
    bestFor: "${rate.bestFor || ""}",
    baseRate: ${rate.baseRate},
    promoRate: ${promoRate},
    balanceCap: "${(rate.balanceCap || "No cap stated").replace(/"/g, '\\"')}",
    requirement: "${(rate.requirement || "None").replace(/"/g, '\\"')}",
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
  const currentRates = parseDataArray(content, config.dataArrayExport);
  const sourceUrls = config.urls.map((u) => u.url);

  const { allExtracted, rawContentLog } = await fetchBankSources(config);

  const newRatesByBank = await extractGuardedRates({
    allExtracted,
    config,
    schemaName: "extract_digital_bank_rates",
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

  // Dedupe by bankName — drops duplicates kept under more-specific bank
  // variants when new and existing keys differ ("Tonik Bank" vs "Tonik Bank – …").
  const beforeDedupe = mergedRates.length;
  const deduped = dedupeRates(mergedRates, ["bankName"]);
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
    minRows: 4,
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

  // Flag any grounded value that diverges sharply from the curated baseline —
  // written (guarded auto-write) but loudly surfaced for human confirmation.
  const { flags: baselineFlags } = checkAgainstBaselines(mergedRates, config.baselines, {
    nameField: config.validationOptions.nameField,
    rateFields: config.validationOptions.rateFields,
    verifiedAt: config.baselinesVerifiedAt,
  });

  mergedRates.sort((a, b) => (b.baseRate || 0) - (a.baseRate || 0));

  const faqs = extractFaqSection(content, config.faqExport);
  const today = getTodayPHT();
  const rateEntries = mergedRates.map(formatRateEntry).join(",\n");

  const newContent = `import type { FAQ } from "@/types/content";

export const ${config.updatedAtExport} = "${today}";

export interface DigitalBankRate {
  bankName: string;
  bestFor: string;
  baseRate: number;
  promoRate: number | null;
  /** Short summary of the balance cap that limits the headline rate, e.g. "₱100,000" or "No cap". */
  balanceCap: string;
  /** Short summary of what you must do to earn the headline rate, e.g. "None" or "Monthly missions". */
  requirement: string;
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
    warnings: [...validation.warnings, ...baselineFlags],
    rawContent: rawContentLog,
  };
}
