#!/usr/bin/env node

/**
 * Source script: Withholding Tax Table
 * Checks for changes to BIR withholding tax brackets (TRAIN Law).
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
import { withholdingTaxConfig as config } from "../lib/config.mjs";

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
      error: "Failed to extract BIR tax rates page",
    };
  }

  console.log("  Extracting tax bracket data...");
  let extracted;
  try {
    extracted = await extractStructuredData({
      pageText: result.rawContent,
      sourceUrl: sourceUrls[0],
      extractionPrompt: config.extractionPrompt,
      schema: config.schema,
      schemaName: "extract_withholding_tax",
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

  // Compare current brackets against extracted
  const currentBrackets = [
    { overBut: "₱0", notOver: "₱20,833", baseTax: 0, rate: 0, ofExcessOver: 0 },
    { overBut: "₱20,833", notOver: "₱33,332", baseTax: 0, rate: 15, ofExcessOver: 20_833 },
    { overBut: "₱33,333", notOver: "₱66,666", baseTax: 1_875, rate: 20, ofExcessOver: 33_333 },
    { overBut: "₱66,667", notOver: "₱166,666", baseTax: 8_541.8, rate: 25, ofExcessOver: 66_667 },
    { overBut: "₱166,667", notOver: "₱666,666", baseTax: 33_541.8, rate: 30, ofExcessOver: 166_667 },
    { overBut: "₱666,667", notOver: "—", baseTax: 183_541.8, rate: 35, ofExcessOver: 666_667 },
  ];

  const validation = validateGovernmentData(
    currentBrackets,
    extracted.monthlyTaxBrackets || [],
    config.name
  );

  // Also flag if TRAIN Law is no longer effective
  if (extracted.isTrainLawEffective === false) {
    validation.warnings.push({
      level: "warn",
      message: "TRAIN Law may no longer be effective. New tax reform detected. Review urgently.",
    });
    validation.changes.push({
      field: "isTrainLawEffective",
      message: "TRAIN Law status changed to: no longer effective",
    });
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
