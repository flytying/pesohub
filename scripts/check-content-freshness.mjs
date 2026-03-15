#!/usr/bin/env node

/**
 * Content Freshness Checker
 *
 * Reads each data file in the content registry, extracts the UPDATED_AT date,
 * and flags pages that are overdue for review based on their cadence.
 *
 * Usage:
 *   node scripts/check-content-freshness.mjs          # prints report
 *   node scripts/check-content-freshness.mjs --json    # JSON output for CI
 *   node scripts/check-content-freshness.mjs --github  # creates GitHub issue
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── Parse the content registry (TypeScript) manually ────────────
// We read the TS file and extract the data we need via regex
// to avoid requiring tsx/ts-node in CI.

const registryPath = resolve(ROOT, "src/data/content-registry.ts");
const registrySource = readFileSync(registryPath, "utf-8");

// Extract each object in the contentRegistry array
const entryRegex = /\{[^}]*slug:\s*"([^"]+)"[^}]*title:\s*"([^"]+)"[^}]*dataFile:\s*"([^"]+)"[^}]*updatedAtExport:\s*"([^"]+)"[^}]*source:\s*"([^"]+)"[^}]*sourceUrl:\s*"([^"]+)"[^}]*reviewCadenceDays:\s*(\d+)[^}]*staleness:\s*"([^"]+)"[^}]*\}/gs;

const entries = [];
let match;
while ((match = entryRegex.exec(registrySource)) !== null) {
  entries.push({
    slug: match[1],
    title: match[2],
    dataFile: match[3],
    updatedAtExport: match[4],
    source: match[5],
    sourceUrl: match[6],
    reviewCadenceDays: parseInt(match[7]),
    staleness: match[8],
  });
}

if (entries.length === 0) {
  console.error("❌ Could not parse content registry. Check format.");
  process.exit(1);
}

// ── Check each entry ────────────────────────────────────────────
const today = new Date();
const results = [];

for (const entry of entries) {
  const filePath = resolve(ROOT, entry.dataFile);
  let fileContent;
  try {
    fileContent = readFileSync(filePath, "utf-8");
  } catch {
    results.push({
      ...entry,
      status: "error",
      message: `Data file not found: ${entry.dataFile}`,
      updatedAt: null,
      daysSinceUpdate: null,
      daysOverdue: null,
    });
    continue;
  }

  // Extract the UPDATED_AT value
  const dateRegex = new RegExp(
    `${entry.updatedAtExport}\\s*=\\s*"(\\d{4}-\\d{2}-\\d{2})"`
  );
  const dateMatch = fileContent.match(dateRegex);

  if (!dateMatch) {
    results.push({
      ...entry,
      status: "error",
      message: `Could not find ${entry.updatedAtExport} in ${entry.dataFile}`,
      updatedAt: null,
      daysSinceUpdate: null,
      daysOverdue: null,
    });
    continue;
  }

  const updatedAt = new Date(dateMatch[1] + "T00:00:00");
  const daysSinceUpdate = Math.floor(
    (today - updatedAt) / (1000 * 60 * 60 * 24)
  );
  const daysOverdue = daysSinceUpdate - entry.reviewCadenceDays;

  results.push({
    ...entry,
    status: daysOverdue > 0 ? "stale" : "fresh",
    updatedAt: dateMatch[1],
    daysSinceUpdate,
    daysOverdue: Math.max(0, daysOverdue),
    nextReview: new Date(
      updatedAt.getTime() + entry.reviewCadenceDays * 24 * 60 * 60 * 1000
    )
      .toISOString()
      .split("T")[0],
  });
}

// ── Output ──────────────────────────────────────────────────────
const stale = results.filter((r) => r.status === "stale");
const errors = results.filter((r) => r.status === "error");
const fresh = results.filter((r) => r.status === "fresh");

const mode = process.argv[2];

if (mode === "--json") {
  console.log(JSON.stringify({ stale, errors, fresh, checkedAt: today.toISOString() }, null, 2));
  process.exit(stale.length > 0 ? 1 : 0);
}

// ── Pretty print report ─────────────────────────────────────────
console.log("\n📋 PesoHub Content Freshness Report");
console.log(`   Checked: ${today.toISOString().split("T")[0]}`);
console.log(`   Pages tracked: ${results.length}\n`);

if (stale.length > 0) {
  console.log("🔴 STALE — Overdue for review:");
  console.log("─".repeat(70));
  for (const r of stale.sort((a, b) => b.daysOverdue - a.daysOverdue)) {
    console.log(
      `  ⚠️  ${r.title}`
    );
    console.log(
      `     Updated: ${r.updatedAt} (${r.daysSinceUpdate} days ago, ${r.daysOverdue} days overdue)`
    );
    console.log(`     Review cadence: every ${r.reviewCadenceDays} days`);
    console.log(`     Source: ${r.source}`);
    console.log(`     File: ${r.dataFile}\n`);
  }
}

if (errors.length > 0) {
  console.log("❌ ERRORS:");
  console.log("─".repeat(70));
  for (const r of errors) {
    console.log(`  ${r.title}: ${r.message}\n`);
  }
}

if (fresh.length > 0) {
  console.log("✅ FRESH — Up to date:");
  console.log("─".repeat(70));
  for (const r of fresh) {
    console.log(
      `  ✓ ${r.title} — updated ${r.updatedAt} (next review: ${r.nextReview})`
    );
  }
  console.log();
}

// ── GitHub Issue mode ───────────────────────────────────────────
if (mode === "--github" && stale.length > 0) {
  // Output for GitHub Actions to create an issue
  let issueBody = `## 📋 Content Freshness Report\n\n`;
  issueBody += `**${stale.length} page(s) are overdue for review.**\n\n`;
  issueBody += `| Page | Last Updated | Days Overdue | Cadence | Source |\n`;
  issueBody += `|------|-------------|-------------|---------|--------|\n`;

  for (const r of stale.sort((a, b) => b.daysOverdue - a.daysOverdue)) {
    issueBody += `| [${r.title}](https://pesohub.ph/${r.slug}) | ${r.updatedAt} | **${r.daysOverdue}** | ${r.reviewCadenceDays}d | [${r.source}](${r.sourceUrl}) |\n`;
  }

  issueBody += `\n### Review Checklist\n\n`;
  issueBody += `For each stale page, verify the data against the source and update the \`UPDATED_AT\` date in the data file.\n`;
  issueBody += `\n---\n*Generated by \`check-content-freshness.mjs\` on ${today.toISOString().split("T")[0]}*`;

  // Write to file for GitHub Actions to pick up
  const outputPath = resolve(ROOT, ".github/freshness-report.md");
  const { writeFileSync, mkdirSync } = await import("fs");
  mkdirSync(resolve(ROOT, ".github"), { recursive: true });
  writeFileSync(outputPath, issueBody);
  console.log(`\n📄 GitHub issue body written to .github/freshness-report.md`);
}

// Exit with error code if stale content found (useful for CI)
if (stale.length > 0 || errors.length > 0) {
  console.log(
    `\n⚡ Action needed: ${stale.length} stale, ${errors.length} errors\n`
  );
  process.exit(1);
}

console.log("\n🎉 All content is within review cadence.\n");
process.exit(0);
