#!/usr/bin/env node
/**
 * Weekly GSC content-opportunity finder.
 *
 * Pull Search Console → detect opportunities → Claude drafts topic suggestions
 * → log to Braintrust (eval dataset + judge score) → write the review issue
 * markdown to /tmp. The GitHub workflow opens/updates the issue from that file;
 * a human ticks boxes and pastes snippets into topic-queue.json, after which
 * the existing blog agent writes the posts. No auto-publish here.
 *
 * Usage:
 *   node scripts/blog-agent/gsc-opportunities.mjs            # full weekly run
 *   node scripts/blog-agent/gsc-opportunities.mjs --dry-run  # same, but the workflow skips the gh step
 *   node scripts/blog-agent/gsc-opportunities.mjs --fixture rows.json   # use local rows, skip the GSC API
 *   node scripts/blog-agent/gsc-opportunities.mjs --feedback # log accept/reject ground truth to Braintrust
 *
 * Env: GSC_SERVICE_ACCOUNT_JSON, GSC_SITE_URL, ANTHROPIC_API_KEY,
 *      BRAINTRUST_API_KEY (optional — Braintrust layer no-ops without it).
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { fetchSearchAnalytics, dateWindows } from "./lib/gsc-client.mjs";
import {
  aggregateByQuery,
  classifyOpportunities,
  loadCoverage,
} from "./lib/gsc-opportunities.mjs";
import { generateSuggestions, judgeSuggestions } from "./lib/gsc-suggester.mjs";
import { buildIssue } from "./lib/gsc-reporter.mjs";
import {
  tracedGeneration,
  logSpan,
  upsertOpportunityRecord,
  flushBraintrust,
} from "./lib/braintrust.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUEUE_PATH = join(__dirname, "topic-queue.json");
const LEDGER_PATH = join(__dirname, "gsc-suggestions-log.json");
const ISSUE_MD = "/tmp/gsc-issue.md";
const ISSUE_TITLE = "/tmp/gsc-issue-title.txt";
const LEDGER_MAX_WEEKS = 12;

function parseArgs(argv) {
  const args = { dryRun: false, feedback: false, fixture: null };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--feedback") args.feedback = true;
    else if (a === "--fixture") args.fixture = argv[++i];
  }
  return args;
}

function ymd(date) {
  return date.toISOString().slice(0, 10);
}

function readQueue() {
  return JSON.parse(readFileSync(QUEUE_PATH, "utf8"));
}

function readLedger() {
  if (!existsSync(LEDGER_PATH)) return [];
  try {
    return JSON.parse(readFileSync(LEDGER_PATH, "utf8"));
  } catch {
    return [];
  }
}

function writeLedger(entries) {
  // Keep only the most recent N weeks to bound file size.
  const weeks = [...new Set(entries.map((e) => e.week))].sort().slice(-LEDGER_MAX_WEEKS);
  const keep = new Set(weeks);
  const trimmed = entries.filter((e) => keep.has(e.week));
  writeFileSync(LEDGER_PATH, JSON.stringify(trimmed, null, 2) + "\n");
}

// ── Feedback pass: log human accept/reject as Braintrust ground truth ────────

async function runFeedback() {
  const ledger = readLedger();
  if (ledger.length === 0) {
    console.log("No suggestions ledger yet — nothing to score.");
    return;
  }
  const queueSlugs = new Set(readQueue().topics.map((t) => t.slug));

  let accepted = 0;
  for (const e of ledger) {
    const isAccepted = queueSlugs.has(e.slug);
    if (isAccepted) accepted++;
    e.resolved = true;
    e.accepted = isAccepted;
    upsertOpportunityRecord({
      id: `${e.week}::${e.slug}`,
      input: { query: e.sourceQuery, ...(e.opportunity ?? {}) },
      output: { slug: e.slug, type: e.type, title: e.title },
      expected: { accepted: isAccepted },
      metadata: { week: e.week, judgeScore: e.judgeScore ?? null, accepted: isAccepted },
    });
  }
  writeLedger(ledger);
  await flushBraintrust();
  console.log(
    `Feedback logged: ${accepted}/${ledger.length} suggested slugs accepted into the queue.`
  );
}

// ── Main weekly run ──────────────────────────────────────────────────────────

async function runWeekly({ dryRun, fixture }) {
  const now = new Date();
  const weekLabel = ymd(now);

  // 1. Pull data (or load a local fixture for credless local testing).
  let windows, current, prior;
  if (fixture) {
    const fx = JSON.parse(readFileSync(fixture, "utf8"));
    windows = fx.windows ?? dateWindows(now);
    current = fx.current ?? fx.rows ?? [];
    prior = fx.prior ?? [];
    console.log(`Loaded fixture: ${current.length} current rows, ${prior.length} prior rows.`);
  } else {
    const data = await fetchSearchAnalytics(now);
    ({ windows, current, prior } = data);
    console.log(
      `GSC pull: ${current.length} current rows, ${prior.length} prior rows ` +
        `(${windows.current.start} → ${windows.current.end}).`
    );
  }

  // 2. Detect opportunities (pure).
  const coverage = loadCoverage();
  const opportunities = classifyOpportunities(
    aggregateByQuery(current),
    aggregateByQuery(prior),
    coverage
  );
  console.log(`Detected ${opportunities.length} opportunities.`);
  for (const o of opportunities.slice(0, 10)) {
    console.log(`  • [${o.opportunity}] "${o.query}" — ${o.impressions} impr, pos ${o.position}`);
  }

  // 3. Claude suggestions + judge.
  const suggestions = await generateSuggestions(opportunities, coverage.allSlugs);
  const judged = await judgeSuggestions(suggestions, opportunities);
  console.log(`Generated ${suggestions.length} suggestions.`);

  // 4. Enrich each suggestion with its source opportunity metrics + judge score.
  const oppByQuery = new Map(opportunities.map((o) => [o.query, o]));
  const items = suggestions.map((s) => {
    const opp = oppByQuery.get(s.sourceQuery) ?? {};
    return {
      ...s,
      metrics: {
        impressions: opp.impressions ?? 0,
        clicks: opp.clicks ?? 0,
        position: opp.position ?? 0,
        ctr: opp.ctr ?? 0,
        deltaPct: opp.deltaPct ?? null,
        opportunity: opp.opportunity ?? "unknown",
        topPagePath: opp.topPagePath ?? "/",
        reason: opp.reason ?? "",
      },
      judge: judged.get(s.slug) ?? null,
    };
  });

  // 5. Build the review issue markdown.
  const ids = readQueue().topics.map((t) => t.id ?? 0);
  const nextId = (ids.length ? Math.max(...ids) : 0) + 1;
  const issue = buildIssue({
    windows,
    items,
    nextId,
    weekLabel,
    opportunityCount: opportunities.length,
  });
  writeFileSync(ISSUE_MD, issue.body + "\n");
  writeFileSync(ISSUE_TITLE, issue.title + "\n");
  console.log(`Wrote ${ISSUE_MD} (${issue.title}).`);

  // 6. Append to the durable ledger (feeds the --feedback eval pass).
  const ledger = readLedger().filter((e) => e.week !== weekLabel);
  for (const item of items) {
    ledger.push({
      week: weekLabel,
      slug: item.slug,
      title: item.title,
      type: item.type,
      sourceQuery: item.sourceQuery,
      opportunity: item.metrics,
      judgeScore: item.judge?.score ?? null,
      resolved: false,
      accepted: null,
    });
  }
  writeLedger(ledger);

  // 7. Braintrust: dataset records + span scores.
  for (const item of items) {
    upsertOpportunityRecord({
      id: `${weekLabel}::${item.slug}`,
      input: { query: item.sourceQuery, ...item.metrics },
      output: {
        slug: item.slug,
        type: item.type,
        title: item.title,
        category: item.category,
        keywords: item.keywords,
        brief: item.brief,
      },
      metadata: {
        week: weekLabel,
        opportunity: item.metrics.opportunity,
        judgeScore: item.judge?.score ?? null,
        judgeVerdict: item.judge?.verdict ?? null,
      },
    });
  }
  const judgeScores = items.map((i) => i.judge?.score).filter((s) => typeof s === "number");
  const avgJudge = judgeScores.length
    ? judgeScores.reduce((a, b) => a + b, 0) / judgeScores.length
    : null;

  return { issue, opportunities, items, avgJudge, weekLabel, dryRun };
}

async function main() {
  const args = parseArgs(process.argv);

  if (args.feedback) {
    await runFeedback();
    return;
  }

  await tracedGeneration("gsc-opportunities", async (span) => {
    const result = await runWeekly(args);
    logSpan(span, {
      input: { week: result.weekLabel, opportunities: result.opportunities },
      output: { suggestions: result.items.map((i) => ({ slug: i.slug, type: i.type, title: i.title })) },
      scores: result.avgJudge != null ? { judge: result.avgJudge } : undefined,
      metadata: {
        opportunityCount: result.opportunities.length,
        suggestionCount: result.items.length,
        dryRun: result.dryRun,
      },
    });
  });

  await flushBraintrust();
}

main().catch((err) => {
  console.error("gsc-opportunities failed:", err.message);
  process.exit(1);
});
