#!/usr/bin/env node

/**
 * Source script: SSS Pension Table
 * Checks for changes to SSS pension formulas, minimum pensions, or MSC ceiling.
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
import { sssPensionConfig as config } from "../lib/config.mjs";

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
      error: "Failed to extract SSS pension page",
    };
  }

  console.log("  Extracting pension data...");
  let extracted;
  try {
    extracted = await extractStructuredData({
      pageText: result.rawContent,
      sourceUrl: sourceUrls[0],
      extractionPrompt: config.extractionPrompt,
      schema: config.schema,
      schemaName: "extract_sss_pension",
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
    minimumPension10to20Years: 2_000,
    minimumPension20PlusYears: 4_000,
    maxMSC: 30_000,
  };

  const newValues = {
    minimumPension10to20Years: extracted.minimumPension10to20Years,
    minimumPension20PlusYears: extracted.minimumPension20PlusYears,
    maxMSC: extracted.maxMSC,
  };

  // Guard: if no scalar values could be extracted (page layout changed or
  // values render as images), treating undefined fields as a "change" would
  // open a noise PR every run. Skip without changes and flag for manual review.
  if (Object.values(newValues).every((v) => v == null)) {
    console.log("  No readable values extracted. Skipping without changes.");
    return {
      sourceName: config.name,
      dataFile: config.dataFile,
      sourceUrls,
      status: "unchanged",
      changes: [],
      warnings: [
        {
          level: "warn",
          message: `${config.name}: no values extracted from ${sourceUrls[0]}. Verify pension figures manually.`,
        },
      ],
    };
  }

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
