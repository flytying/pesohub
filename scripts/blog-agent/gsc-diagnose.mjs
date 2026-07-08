#!/usr/bin/env node
/**
 * GSC drop diagnostic — is an impressions drop site-wide or isolated?
 *
 * Pulls two Search Console windows (default: two trailing 7-day weeks) and reports
 *   1. site-wide impressions/clicks week-over-week,
 *   2. top pages by impression delta,
 *   3. every query for a target page (default: the digital-bank rates page),
 *   4. every page serving a target query (default: "high yield savings account 2026 philippines"),
 * then classifies the drop as BROAD (spam/core-update quality demotion) vs ISOLATED
 * (cannibalization / technical) so we know which remediation to weight.
 *
 * Reuses queryWindow() from lib/gsc-client.mjs. Requires GSC_SERVICE_ACCOUNT_JSON
 * + GSC_SITE_URL (same creds as the opportunity finder).
 *
 * Usage:
 *   node scripts/blog-agent/gsc-diagnose.mjs
 *   node scripts/blog-agent/gsc-diagnose.mjs --end 2026-07-01 --window 7
 *   node scripts/blog-agent/gsc-diagnose.mjs --page best-digital-bank-rates --query "high yield savings account 2026 philippines"
 *   node scripts/blog-agent/gsc-diagnose.mjs --json
 *
 * Reproduce the reported collapse (6/18–24 vs 6/25–7/1): --end 2026-07-01 --window 7
 */

import { queryWindow } from "./lib/gsc-client.mjs";

const DEFAULT_PAGE = "best-digital-bank-rates-philippines";
const DEFAULT_QUERY = "high yield savings account 2026 philippines";
const TOP_N = 20;

function parseArgs(argv) {
  const a = {
    end: null,
    window: 7,
    page: DEFAULT_PAGE,
    query: DEFAULT_QUERY,
    json: false,
    rowLimit: 25000,
  };
  for (let i = 2; i < argv.length; i++) {
    const v = argv[i];
    if (v === "--end") a.end = argv[++i];
    else if (v === "--window") a.window = parseInt(argv[++i], 10);
    else if (v === "--page") a.page = argv[++i];
    else if (v === "--query") a.query = argv[++i];
    else if (v === "--json") a.json = true;
    else if (v === "--row-limit") a.rowLimit = parseInt(argv[++i], 10);
  }
  return a;
}

const DAY = 86400000;
const ymd = (d) => d.toISOString().slice(0, 10);

/** Two adjacent `window`-day windows ending at `end` (default: 3 days ago). */
function windows(endStr, windowDays) {
  const end = endStr ? new Date(endStr + "T00:00:00Z") : new Date(Date.now() - 3 * DAY);
  const curStart = new Date(end.getTime() - (windowDays - 1) * DAY);
  const priEnd = new Date(curStart.getTime() - DAY);
  const priStart = new Date(priEnd.getTime() - (windowDays - 1) * DAY);
  return {
    current: { start: ymd(curStart), end: ymd(end) },
    prior: { start: ymd(priStart), end: ymd(priEnd) },
  };
}

const sum = (rows, k) => rows.reduce((t, r) => t + (r[k] ?? 0), 0);
const pct = (cur, pri) => (pri === 0 ? (cur > 0 ? Infinity : 0) : ((cur - pri) / pri) * 100);
const fmtPct = (p) => (p === Infinity ? "+∞%" : `${p >= 0 ? "+" : ""}${p.toFixed(0)}%`);

/** Aggregate rows to a Map keyed by `dim`, summing impressions/clicks (avg position). */
function aggBy(rows, dim) {
  const m = new Map();
  for (const r of rows) {
    const key = r[dim];
    const e = m.get(key) ?? { impressions: 0, clicks: 0, posSum: 0, n: 0 };
    e.impressions += r.impressions;
    e.clicks += r.clicks;
    e.posSum += r.position * r.impressions; // impression-weighted avg position
    e.n += r.impressions;
    m.set(key, e);
  }
  for (const e of m.values()) e.position = e.n ? e.posSum / e.n : 0;
  return m;
}

/** Join current+prior aggregates → array with deltas, sorted by impression delta asc (biggest drop first). */
function joinDeltas(curMap, priMap) {
  const keys = new Set([...curMap.keys(), ...priMap.keys()]);
  const out = [];
  for (const k of keys) {
    const c = curMap.get(k) ?? { impressions: 0, clicks: 0, position: 0 };
    const p = priMap.get(k) ?? { impressions: 0, clicks: 0, position: 0 };
    out.push({
      key: k,
      curImpr: c.impressions,
      priImpr: p.impressions,
      deltaImpr: c.impressions - p.impressions,
      pct: pct(c.impressions, p.impressions),
      curPos: c.position,
      priPos: p.position,
    });
  }
  return out.sort((a, b) => a.deltaImpr - b.deltaImpr);
}

async function main() {
  const args = parseArgs(process.argv);
  const w = windows(args.end, args.window);

  const [current, prior] = await Promise.all([
    queryWindow(w.current, { rowLimit: args.rowLimit }),
    queryWindow(w.prior, { rowLimit: args.rowLimit }),
  ]);

  // 1. Site-wide
  const siteCur = { impressions: sum(current, "impressions"), clicks: sum(current, "clicks") };
  const sitePri = { impressions: sum(prior, "impressions"), clicks: sum(prior, "clicks") };
  const siteImprPct = pct(siteCur.impressions, sitePri.impressions);

  // 2. Top pages by impression delta
  const pageDeltas = joinDeltas(aggBy(current, "page"), aggBy(prior, "page"));

  // 3. Target page → its queries
  const pageMatch = (p) => p.includes(args.page);
  const pageQueries = joinDeltas(
    aggBy(current.filter((r) => pageMatch(r.page)), "query"),
    aggBy(prior.filter((r) => pageMatch(r.page)), "query")
  );

  // 4. Target query → pages serving it
  const qMatch = (q) => q === args.query || q.includes(args.query);
  const queryPages = joinDeltas(
    aggBy(current.filter((r) => qMatch(r.query)), "page"),
    aggBy(prior.filter((r) => qMatch(r.query)), "page")
  );

  // Classification heuristic
  const droppedPages = pageDeltas.filter((p) => p.deltaImpr < 0 && p.priImpr >= 50);
  const bigDrops = droppedPages.filter((p) => p.pct <= -50);
  const targetPageRow = pageDeltas.find((p) => pageMatch(p.key));
  const targetDropShare =
    targetPageRow && sitePri.impressions - siteCur.impressions > 0
      ? -targetPageRow.deltaImpr / (sitePri.impressions - siteCur.impressions)
      : 0;

  let verdict;
  if (siteImprPct > -20) {
    verdict =
      `ISOLATED — site-wide impressions ${fmtPct(siteImprPct)} (roughly flat) while the target ` +
      `page carries ${(targetDropShare * 100).toFixed(0)}% of the net drop. Weight cannibalization + on-page/technical.`;
  } else if (bigDrops.length >= 5) {
    verdict =
      `BROAD — ${bigDrops.length} pages each down ≥50%; site-wide ${fmtPct(siteImprPct)}. ` +
      `Weight content-quality / E-E-A-T (spam/core-update demotion).`;
  } else {
    verdict =
      `MIXED — site-wide ${fmtPct(siteImprPct)}, ${bigDrops.length} pages down ≥50%, target page = ` +
      `${(targetDropShare * 100).toFixed(0)}% of net drop. Inspect both tracks.`;
  }

  if (args.json) {
    console.log(
      JSON.stringify(
        { windows: w, site: { current: siteCur, prior: sitePri, imprPct: siteImprPct }, pageDeltas, pageQueries, queryPages, verdict },
        null,
        2
      )
    );
    return;
  }

  const line = (r) =>
    `  ${r.deltaImpr >= 0 ? "+" : ""}${r.deltaImpr}  (${fmtPct(r.pct)})  ${r.priImpr}→${r.curImpr}  pos ${r.priPos.toFixed(1)}→${r.curPos.toFixed(1)}  ${r.key}`;

  console.log(`\n📉 GSC Drop Diagnostic`);
  console.log(`   Current: ${w.current.start} → ${w.current.end}   Prior: ${w.prior.start} → ${w.prior.end}\n`);
  console.log(`── Site-wide ─────────────────────────────────────────────`);
  console.log(`  Impressions  ${sitePri.impressions} → ${siteCur.impressions}  (${fmtPct(siteImprPct)})`);
  console.log(`  Clicks       ${sitePri.clicks} → ${siteCur.clicks}  (${fmtPct(pct(siteCur.clicks, sitePri.clicks))})\n`);

  console.log(`── Top ${TOP_N} pages by impression delta (biggest drop first) ──`);
  pageDeltas.slice(0, TOP_N).forEach((r) => console.log(line(r)));

  console.log(`\n── Queries for page containing "${args.page}" ──`);
  (pageQueries.length ? pageQueries.slice(0, TOP_N) : []).forEach((r) => console.log(line(r)));
  if (!pageQueries.length) console.log("  (no rows)");

  console.log(`\n── Pages serving query "${args.query}" ──`);
  (queryPages.length ? queryPages : []).forEach((r) => console.log(line(r)));
  if (!queryPages.length) console.log("  (no rows — query not in top rows for either window)");

  console.log(`\n── Verdict ───────────────────────────────────────────────`);
  console.log(`  ${verdict}\n`);
}

main().catch((err) => {
  console.error("gsc-diagnose failed:", err.message);
  process.exit(1);
});
