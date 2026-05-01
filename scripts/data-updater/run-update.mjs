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
 *   TAVILY_API_KEY    — Tavily API key (used for web page extraction via Tavily Extract)
 *   ANTHROPIC_API_KEY — Anthropic API key (used for structured data extraction via Claude tool use)
 */

import { writeFileSync } from "fs";
import { writePrBody } from "./lib/reporter.mjs";
import { allSources } from "./lib/config.mjs";

const FAILURE_FLAG_PATH = "/tmp/data-updater-failed.txt";

// Sources whose origin sites actively bot-block our scraper (Pag-IBIG uses
// reCAPTCHA-Express; BIR is a Cloudflare-fronted Next.js SPA that returns an
// empty SSR shell). Tavily can't fetch them and direct HTTP gets challenge
// pages — verified 2026-05-01. Failures from these sources don't fail the
// workflow; they're surfaced in the summary and PR body for manual review.
// Revisit if reliable extraction becomes available (headless browser, gov
// data portal, etc.).
const BEST_EFFORT_SOURCES = new Set([
  "pagibig-housing",
  "pagibig-contribution",
  "pagibig-mp2",
  "withholding-tax",
]);

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
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY environment variable is required.");
    process.exit(1);
  }

  const reports = [];

  // Run each source sequentially to avoid overwhelming APIs
  for (const source of sources) {
    const bestEffort = BEST_EFFORT_SOURCES.has(source);
    try {
      const mod = await sourceModules[source]();
      const report = await mod.run();
      report.bestEffort = bestEffort;
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
        bestEffort,
      });
    }
  }

  // Summary
  const updated = reports.filter((r) => r.status === "updated");
  const unchanged = reports.filter((r) => r.status === "unchanged");
  const allFailed = reports.filter((r) => r.status === "failed");
  const blockingFailed = allFailed.filter((r) => !r.bestEffort);
  const skippedFailed = allFailed.filter((r) => r.bestEffort);

  console.log(`\n═══ Summary ═══`);
  console.log(`  Updated:   ${updated.length}`);
  console.log(`  Unchanged: ${unchanged.length}`);
  console.log(`  Failed:    ${blockingFailed.length}`);
  console.log(`  Skipped:   ${skippedFailed.length} (best-effort, bot-blocked)`);

  if (blockingFailed.length > 0) {
    console.log(`\nFailed sources:`);
    for (const r of blockingFailed) {
      console.log(`  - ${r.sourceName}: ${r.error}`);
      if (r.warnings && r.warnings.length > 0) {
        for (const w of r.warnings) {
          const icon = w.level === "error" ? "🔴" : "🟡";
          console.log(`      ${icon} ${w.message}`);
        }
      }
    }
  }

  if (skippedFailed.length > 0) {
    console.log(`\nSkipped sources (best-effort, won't fail workflow):`);
    for (const r of skippedFailed) {
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

  // Write a failure flag for the workflow to surface as a job failure
  // AFTER the PR is created. We exit 0 here so the workflow can still
  // check for changes and open a PR for any sources that DID succeed
  // (partial updates aren't lost). A later workflow step reads the flag
  // and fails the job, so the user still gets an email + red ❌.
  // Best-effort sources (BEST_EFFORT_SOURCES) are excluded — their failures
  // are expected and surfaced in the PR body for manual review only.
  if (blockingFailed.length > 0) {
    const summary = blockingFailed
      .map((r) => `- ${r.sourceName}: ${r.error || "Unknown error"}`)
      .join("\n");
    writeFileSync(
      FAILURE_FLAG_PATH,
      `${blockingFailed.length} source(s) failed:\n${summary}\n`,
      "utf-8"
    );
    console.log(
      `\n⚠️  Failure flag written to ${FAILURE_FLAG_PATH} — workflow will fail at the end.`
    );
  }
}

main().catch((err) => {
  console.error(`Unhandled error: ${err.message}`);
  process.exit(1);
});
