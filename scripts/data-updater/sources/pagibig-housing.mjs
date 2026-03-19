#!/usr/bin/env node

/**
 * Source script: Pag-IBIG Housing Loan
 * Checks for changes to housing loan rates, limits, or eligibility.
 */

import { extractWithFallback } from "../lib/fetcher.mjs";
import { extractStructuredData } from "../lib/ai-extractor.mjs";
import {
  readDataFile,
  writeDataFile,
  updateTimestamp,
  getTodayPHT,
} from "../lib/file-writer.mjs";
import { validateGovernmentData } from "../lib/validator.mjs";
import { pagibigHousingConfig as config } from "../lib/config.mjs";

export async function run() {
  console.log(`\n── ${config.name} ──`);

  const content = readDataFile(config.dataFile);
  const sourceUrls = config.urls;

  console.log(`  Fetching ${sourceUrls[0]}...`);
  const result = await extractWithFallback(sourceUrls[0]);

  if (!result) {
    return {
      sourceName: config.name,
      dataFile: config.dataFile,
      sourceUrls,
      status: "failed",
      changes: [],
      warnings: [],
      error: "Failed to extract Pag-IBIG housing loan page",
    };
  }

  console.log("  Extracting housing loan data...");
  let extracted;
  try {
    extracted = await extractStructuredData({
      pageText: result.rawContent,
      sourceUrl: sourceUrls[0],
      extractionPrompt: config.extractionPrompt,
      schema: config.schema,
      schemaName: "extract_pagibig_housing",
    });
  } catch (err) {
    return {
      sourceName: config.name,
      dataFile: config.dataFile,
      sourceUrls,
      status: "failed",
      changes: [],
      warnings: [],
      error: `AI extraction failed: ${err.message}`,
    };
  }

  // Compare housing loan rates
  const currentRates = [
    { loanAmount: "₱450,000 and below", interestRate: 5.375 },
    { loanAmount: "₱450,001 – ₱750,000", interestRate: 6.375 },
    { loanAmount: "₱750,001 – ₱1,500,000", interestRate: 6.625 },
    { loanAmount: "₱1,500,001 – ₱2,500,000", interestRate: 7.375 },
    { loanAmount: "₱2,500,001 – ₱6,000,000", interestRate: 8.375 },
  ];

  const validation = validateGovernmentData(
    currentRates,
    extracted.housingLoanRates || [],
    config.name
  );

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

  const today = getTodayPHT();
  const updatedContent = updateTimestamp(content, config.updatedAtExport, today);
  writeDataFile(config.dataFile, updatedContent);
  console.log(`  ✓ Updated timestamp in ${config.dataFile}`);

  return {
    sourceName: config.name,
    dataFile: config.dataFile,
    sourceUrls,
    status: "updated",
    changes: validation.changes,
    warnings: validation.warnings,
    rawContent: result.rawContent.slice(0, 3000),
  };
}
