#!/usr/bin/env node

/**
 * Source script: SSS Contribution Table
 * Checks for changes to SSS contribution rates, MSC ranges, or brackets.
 */

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

  // The SSS contribution schedule is published only as circular images, so we
  // read it via vision (config.imageUrls) rather than scraping page text.
  console.log(`  Reading contribution table image: ${config.imageUrls[0]}...`);
  let extracted;
  try {
    extracted = await extractStructuredData({
      imageUrls: config.imageUrls,
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

  // Guard: the contribution schedule renders as images on the SSS page, so
  // text extraction never yields the full scalar set — and a PARTIAL read is
  // untrustworthy (the AI sometimes guesses a single value off surrounding
  // prose, which differs run-to-run and opens a date-only noise PR; see
  // closed #173, #175). Require ALL key fields before comparing: skip unless
  // we have a complete, trustworthy read. If SSS ever publishes a text table
  // this resumes automatically. Manual review is covered by content-freshness.
  if (Object.values(newValues).some((v) => v == null)) {
    console.log(
      "  Incomplete extraction (page is image-based). Skipping without changes."
    );
    return {
      sourceName: config.name,
      dataFile: config.dataFile,
      sourceUrls,
      status: "unchanged",
      changes: [],
      warnings: [
        {
          level: "warn",
          message: `${config.name}: incomplete read from ${sourceUrls[0]} (image-based page). Verify rates manually.`,
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
    rawContent: `Read via vision from ${config.imageUrls.join(", ")}. Extracted: ${JSON.stringify(newValues)}`,
  };
}
