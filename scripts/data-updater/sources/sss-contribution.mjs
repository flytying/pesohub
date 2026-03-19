#!/usr/bin/env node

/**
 * Source script: SSS Contribution Table
 * Checks for changes to SSS contribution rates, MSC ranges, or brackets.
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
import { sssContributionConfig as config } from "../lib/config.mjs";

export async function run() {
  console.log(`\n── ${config.name} ──`);

  const content = readDataFile(config.dataFile);
  const sourceUrls = config.urls;

  // Fetch page content
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
      error: "Failed to extract SSS contribution page",
    };
  }

  // Extract structured data
  console.log("  Extracting contribution data...");
  let extracted;
  try {
    extracted = await extractStructuredData({
      pageText: result.rawContent,
      sourceUrl: sourceUrls[0],
      extractionPrompt: config.extractionPrompt,
      schema: config.schema,
      schemaName: "extract_sss_contribution",
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

  // Compare key values against current data
  const currentValues = {
    contributionRate: 15, // Current 15% rate
    minMSC: 5_000,
    maxMSC: 35_000,
  };

  const newValues = {
    contributionRate: extracted.contributionRate,
    minMSC: extracted.minMSC,
    maxMSC: extracted.maxMSC,
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

  // Update timestamp only (actual data changes require manual review for gov data)
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
