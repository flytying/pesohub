#!/usr/bin/env node

/**
 * Source script: SSS Contribution Table
 * Checks for changes to SSS contribution rates and MSC ranges across all five
 * member-category circulars. The schedule is published only as images, so each
 * category's circular is read via vision and compared to a verified baseline.
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

  const currentValues = [];
  const newValues = [];
  const warnings = [];

  for (const cat of config.categories) {
    console.log(`  Reading ${cat.key} circular via vision...`);
    let extracted;
    try {
      extracted = await extractStructuredData({
        imageUrls: [cat.url],
        sourceUrl: cat.url,
        extractionPrompt: config.extractionPrompt,
        schema: config.schema,
        schemaName: "extract_sss_contribution",
      });
    } catch (err) {
      warnings.push({
        level: "warn",
        message: `${config.name} (${cat.key}): extraction failed — ${err.message}`,
      });
      continue;
    }

    const next = {
      contributionRate: extracted.contributionRate,
      minMSC: extracted.minMSC,
      maxMSC: extracted.maxMSC,
    };

    // Require a complete read per category. A partial read is untrustworthy
    // (the model can guess a lone value), so skip that category rather than
    // risk a false-positive change (see closed #173/#175/#177).
    if (Object.values(next).some((v) => v == null)) {
      warnings.push({
        level: "warn",
        message: `${config.name} (${cat.key}): incomplete read from ${cat.url}. Verify manually.`,
      });
      continue;
    }

    currentValues.push({
      category: cat.key,
      contributionRate: cat.contributionRate,
      minMSC: cat.minMSC,
      maxMSC: cat.maxMSC,
    });
    newValues.push({ category: cat.key, ...next });
  }

  // Nothing could be read confidently — skip without changes (non-blocking).
  if (newValues.length === 0) {
    console.log("  No category read confidently. Skipping without changes.");
    return {
      sourceName: config.name,
      dataFile: config.dataFile,
      sourceUrls,
      status: "unchanged",
      changes: [],
      warnings,
    };
  }

  // Index-aligned compare (currentValues[i] ↔ newValues[i]); null-safe.
  const validation = validateGovernmentData(currentValues, newValues, config.name);
  const allWarnings = [...warnings, ...validation.warnings];

  if (validation.changes.length === 0) {
    console.log("  No changes detected.");
    return {
      sourceName: config.name,
      dataFile: config.dataFile,
      sourceUrls,
      status: "unchanged",
      changes: [],
      warnings: allWarnings,
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
    warnings: allWarnings,
    rawContent: `Read via vision per category. Extracted: ${JSON.stringify(newValues)}`,
  };
}
