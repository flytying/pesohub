#!/usr/bin/env node

/**
 * Source script: PhilHealth Contribution Table
 * Checks for changes to PhilHealth premium rate, salary floor/ceiling.
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
import { philhealthConfig as config } from "../lib/config.mjs";

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
      error: "Failed to extract PhilHealth page",
    };
  }

  console.log("  Extracting contribution data...");
  let extracted;
  try {
    extracted = await extractStructuredData({
      pageText: result.rawContent,
      sourceUrl: sourceUrls[0],
      extractionPrompt: config.extractionPrompt,
      schema: config.schema,
      schemaName: "extract_philhealth",
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

  const currentValues = {
    premiumRate: 0.05,
    salaryFloor: 10_000,
    salaryCeiling: 100_000,
  };

  const newValues = {
    premiumRate: extracted.premiumRate,
    salaryFloor: extracted.salaryFloor,
    salaryCeiling: extracted.salaryCeiling,
  };

  const validation = validateGovernmentData(
    [currentValues],
    [newValues],
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
