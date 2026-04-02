#!/usr/bin/env node

/**
 * Orchestrator for PesoHub automated data updates.
 *
 * Usage:
 *   node scripts/data-updater/run-update.mjs --sources savings-rates,digital-rates,time-deposit-rates
 *   node scripts/data-updater/run-update.mjs --sources sss-contribution,sss-pension,pagibig-housing
 *   node scripts/data-updater/run-update.mjs --sources all
 *
 * Environment variables required:
 *   TAVILY_API_KEY — Tavily API key (used for both web extraction and AI-powered data parsing)
 */

import { writePrBody } from "./lib/reporter.mjs";
import { allSources } from "./lib/config.mjs";

// Source script imports (dynamic)
const sourceModules = {
  "savings-rates": () => import("./sources/bank-savings-rates.mjs"),
  "digital-rates": () => import("./sources/bank-digital-rates.mjs"),
  "time-deposit-rates": () => import("./sources/bank-time-deposit-rates.mjs"),
  "sss-contribution": () => import("./sources/sss-contribution.mjs"),
  "sss-pension": () => import("./sources/sss-pension.mjs"),
  "pagibig-housing": () => import("./sources/pagibig-housing.mjs"),
  "pagibig-contribution": () => import("./sources/pagibig-contribution.mjs"),
  "pagibig-mp2": () => import("./sources/pagibig-mp2.mjs"),
  "philhealth": () => import("./sources/philhealth.mjs"),
  "withholding-tax": () => import("./sources/withholding-tax.mjs"),
};

function parseArgs() {
  const args = process.argv.slice(2);
  const sourcesIdx = args.indexOf("--sources");

  if (sourcesIdx === -1 || !args[sourcesIdx + 1]) {
    console.error("Usage: run-update.mjs --sources <source1,source2,...|all>");
    console.error(
      `Available sources: ${Object.keys(sourceModules).join(", ")}`
    );
    process.exit(1);
  }

  const sourcesArg = args[sourcesIdx + 1];
  if (sourcesArg === "all") {
    return Object.keys(sourceModules);
  }

  const requested = sourcesArg.split(",").map((s) => s.trim());
  for (const source of requested) {
    if (!sourceModules[source]) {
      console.error(`Unknown source: ${source}`);
      console.error(
        `Available sources: ${Object.keys(sourceModules).join(", ")}`
      );
      process.exit(1);
    }
  }

  return requested;
}

async function main() {
  const sources = parseArgs();

  console.log(`PesoHub Data Updater`);
  console.log(`Sources: ${sources.join(", ")}`);
  console.log(`Time: ${new Date().toISOString()}\n`);

  // Check required environment variables
  if (!process.env.TAVILY_API_KEY) {
    console.error("Error: TAVILY_API_KEY environment variable is required.");
    process.exit(1);
  }

  const reports = [];

  // Run each source sequentially to avoid overwhelming APIs
  for (const source of sources) {
    try {
      const mod = await sourceModules[source]();
      const report = await mod.run();
      reports.push(report);
    } catch (err) {
      console.error(`\nFatal error in ${source}: ${err.message}`);
      reports.push({
        sourceName: allSources[source]?.name || source,
        dataFile: allSources[source]?.dataFile || "unknown",
        sourceUrls: allSources[source]?.urls?.map((u) => u.url || u) || [],
        status: "failed",
        changes: [],
        warnings: [],
        error: err.message,
      });
    }
  }

  // Summary
  const updated = reports.filter((r) => r.status === "updated");
  const unchanged = reports.filter((r) => r.status === "unchanged");
  const failed = reports.filter((r) => r.status === "failed");

  console.log(`\n═══ Summary ═══`);
  console.log(`  Updated:   ${updated.length}`);
  console.log(`  Unchanged: ${unchanged.length}`);
  console.log(`  Failed:    ${failed.length}`);

  if (failed.length > 0) {
    console.log(`\nFailed sources:`);
    for (const r of failed) {
      console.log(`  - ${r.sourceName}: ${r.error}`);
    }
  }

  // Write PR body if there are any updates
  if (updated.length > 0) {
    writePrBody(reports);
    console.log(`\nData files were updated. A PR should be created.`);
  } else {
    console.log(`\nNo data changes. No PR needed.`);
  }

  // Exit with error only if ALL sources failed
  if (failed.length === sources.length) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`Unhandled error: ${err.message}`);
  process.exit(1);
});
