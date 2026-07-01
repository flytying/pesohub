#!/usr/bin/env node

/**
 * Curated baselines for bank rate sources.
 *
 * The scrape can only be trusted so far — bank pages change layout, go
 * JS-only, or serve ad copy the extractor mis-reads. Each bank config carries
 * a `baselines` array of known-good values with a `baselinesVerifiedAt` date.
 * On every run we compare the (already grounding-guarded) scraped values to
 * their baseline and, when they diverge beyond a threshold, raise a **flag** in
 * the PR body so a human confirms the change before it publishes.
 *
 * This mirrors the government change-detector model (`validateGovernmentData`):
 * flag, don't silently trust. Per the #202 decision, banks still auto-write the
 * guarded scraped value — the baseline just makes a large swing loud instead of
 * silent, and doubles as the "last verified" record + preserve-fallback.
 */

/**
 * Compare grounded scraped rows to their curated baselines.
 *
 * @param {Array<object>} rows - grounded scraped rows
 * @param {Array<object>} baselines - curated known-good rows
 * @param {object} options
 * @param {string} options.nameField - identity field (e.g. "bankName")
 * @param {string[]} options.rateFields - numeric fields to compare
 * @param {number} [options.maxDivergencePercent=50] - flag beyond this % change
 * @param {string} [options.verifiedAt] - baseline "last verified" date, for messaging
 * @returns {{ flags: Array<{ level: "warn", message: string }> }}
 */
export function checkAgainstBaselines(rows, baselines, options) {
  const {
    nameField,
    rateFields,
    maxDivergencePercent = 50,
    verifiedAt,
  } = options;

  const flags = [];
  if (!Array.isArray(baselines) || baselines.length === 0) return { flags };

  // Index baselines by name; a name may map to several rows (e.g. multiple
  // account types under one bank), so keep a list and match the closest rate.
  const baseByName = new Map();
  for (const b of baselines) {
    const key = b[nameField];
    if (!baseByName.has(key)) baseByName.set(key, []);
    baseByName.get(key).push(b);
  }

  const since = verifiedAt ? ` (baseline verified ${verifiedAt})` : "";

  for (const row of rows) {
    const candidates = baseByName.get(row[nameField]);
    if (!candidates || candidates.length === 0) continue; // new bank — validateRateChanges already flags "added"

    for (const field of rateFields) {
      const newRate = row[field];
      if (typeof newRate !== "number" || !Number.isFinite(newRate) || newRate === 0) continue;

      // Nearest baseline value for this field (handles multi-row banks).
      const baseVals = candidates
        .map((c) => c[field])
        .filter((v) => typeof v === "number" && Number.isFinite(v) && v !== 0);
      if (baseVals.length === 0) continue;

      const nearest = baseVals.reduce((a, b) =>
        Math.abs(b - newRate) < Math.abs(a - newRate) ? b : a
      );

      const pct = Math.abs(((newRate - nearest) / nearest) * 100);
      if (pct > maxDivergencePercent) {
        flags.push({
          level: "warn",
          message: `Baseline divergence for ${row[nameField]}.${field}: ${nearest} → ${newRate} (${pct.toFixed(1)}% vs baseline)${since}. Verify against source before merging.`,
        });
      }
    }
  }

  return { flags };
}
