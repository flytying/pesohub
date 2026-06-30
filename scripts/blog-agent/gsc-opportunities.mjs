#!/usr/bin/env node
/**
 * Weekly GSC content-opportunity finder.
 *
 * Pull Search Console → detect opportunities → Keyword Opportunity Agent scores
 * each + picks a content action → log to Langfuse (eval dataset + scores) →
 * write the review issue markdown to /tmp. The GitHub workflow opens/updates the
 * issue from that file; a human ticks boxes and pastes snippets into
 * topic-queue.json, after which the blog agent writes the posts. No auto-publish.
 *
 * Usage:
 *   node scripts/blog-agent/gsc-opportunities.mjs            # full weekly run
 *   node scripts/blog-agent/gsc-opportunities.mjs --dry-run  # build issue, workflow skips the gh step
 *   node scripts/blog-agent/gsc-opportunities.mjs --fixture rows.json   # local rows, skip the GSC API
 *   node scripts/blog-agent/gsc-opportunities.mjs --feedback # log accept/reject ground truth to Langfuse
 *
 * Env: GSC_SERVICE_ACCOUNT_JSON, GSC_SITE_URL, ANTHROPIC_API_KEY,
 *      LANGFUSE_PUBLIC_KEY / LANGFUSE_SECRET_KEY (optional — Langfuse no-ops without them).
 */

import "./lib/instrumentation.mjs"; // must load first — registers the OTel tracer
import { readFileSync, writeFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { fetchSearchAnalytics, dateWindows } from "./lib/gsc-client.mjs";
import {
  aggregateByQuery,
  classifyOpportunities,
  loadCoverage,
} from "./lib/gsc-opportunities.mjs";
import { analyzeOpportunity } from "./lib/gsc-suggester.mjs";
import { buildIssue, buildQueueEntry } from "./lib/gsc-reporter.mjs";
import {
  tracedGeneration,
  logSpan,
  logScore,
  upsertOpportunityRecord,
  flush,
} from "./lib/observability.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUEUE_PATH = join(__dirname, "topic-queue.json");
const LEDGER_PATH = join(__dirname, "gsc-suggestions-log.json");
const ISSUE_MD = "/tmp/gsc-issue.md";
const ISSUE_TITLE = "/tmp/gsc-issue-title.txt";
const UPDATE_COUNT = "/tmp/gsc-update-count.txt";
const LEDGER_MAX_WEEKS = 12;
// Bound the number of LLM analysis calls per weekly run (one call per
// opportunity). Opportunities beyond this are dropped and logged — not silently.
const MAX_ANALYZE = 12;

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

function writeQueue(queue) {
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n");
}

const PRIORITY_RANK = { A: 0, B: 1, C: 2, Hold: 3 };

/**
 * Append the top new-post / supporting-page decisions to the queue as `pending`
 * topics. Ordered by priority (A→B→C) then opportunity_score desc; skips slugs
 * already in the queue (any status) and decisions without a topic_seed.slug.
 * Mutates `queue` in place and returns the appended entries.
 *
 * @param {object} queue  parsed topic-queue.json
 * @param {Array<{opp:object, decision:object}>} decided
 * @param {number} count
 */
function promoteToQueue(queue, decided, count) {
  const existing = new Set(queue.topics.map((t) => t.slug));
  let nextId = (queue.topics.map((t) => t.id ?? 0).reduce((a, b) => Math.max(a, b), 0)) + 1;

  const candidates = decided
    .map((d) => d.decision)
    .filter(
      (d) =>
        ["publish_as_new_post", "create_supporting_page_with_internal_links"].includes(
          d.recommended_action
        ) && d.topic_seed?.slug
    )
    .sort(
      (a, b) =>
        (PRIORITY_RANK[a.priority] ?? 9) - (PRIORITY_RANK[b.priority] ?? 9) ||
        (b.opportunity_score ?? 0) - (a.opportunity_score ?? 0)
    );

  const appended = [];
  for (const decision of candidates) {
    if (appended.length >= count) break;
    if (existing.has(decision.topic_seed.slug)) continue;
    const entry = buildQueueEntry(decision, nextId++);
    queue.topics.push(entry);
    existing.add(entry.slug);
    appended.push(entry);
  }
  return appended;
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
  const weeks = [...new Set(entries.map((e) => e.week))].sort().slice(-LEDGER_MAX_WEEKS);
  const keep = new Set(weeks);
  const trimmed = entries.filter((e) => keep.has(e.week));
  writeFileSync(LEDGER_PATH, JSON.stringify(trimmed, null, 2) + "\n");
}

/** Stable ledger/dataset key for an opportunity decision. */
function decisionSlug(opp, decision) {
  return (
    decision.topic_seed?.slug ||
    `${decision.recommended_action}:${(decision.primary_query ?? opp.query)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}`
  );
}

// ── Feedback pass: log human accept/reject as Langfuse ground truth ──────────

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
    await upsertOpportunityRecord({
      id: `${e.week}::${e.slug}`,
      input: { query: e.sourceQuery, ...(e.opportunity ?? {}) },
      expected: { accepted: isAccepted },
      metadata: {
        week: e.week,
        recommendedAction: e.recommendedAction ?? null,
        priority: e.priority ?? null,
        opportunityScore: e.opportunityScore ?? null,
        accepted: isAccepted,
      },
    });
  }
  writeLedger(ledger);
  await flush();
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

  const toAnalyze = opportunities.slice(0, MAX_ANALYZE);
  if (opportunities.length > MAX_ANALYZE) {
    console.log(
      `⚠️  Capping analysis to the top ${MAX_ANALYZE} of ${opportunities.length} ` +
        `opportunities (dropped ${opportunities.length - MAX_ANALYZE}).`
    );
  }

  // 3. Keyword Opportunity Agent — one scored decision per opportunity.
  const decided = [];
  for (const opp of toAnalyze) {
    try {
      const decision = await analyzeOpportunity(opp, { pagePaths: coverage.allSlugs });
      decided.push({ opp, decision });
      console.log(
        `  • [${decision.priority}] ${decision.recommended_action} "${opp.query}" ` +
          `(score ${decision.opportunity_score.toFixed(2)})`
      );
    } catch (err) {
      console.log(`  ⚠️  Analysis failed for "${opp.query}": ${err.message}`);
    }
  }

  // 4. Auto-promote the top new-post decisions into the queue (skipped on
  //    dry-run). update/merge are NOT promoted — they stay notify-only.
  const queue = readQueue();
  const promoteCount = parseInt(process.env.PROMOTE_COUNT ?? "3", 10);
  let promoted = [];
  if (!dryRun && promoteCount > 0) {
    promoted = promoteToQueue(queue, decided, promoteCount);
    if (promoted.length) {
      writeQueue(queue);
      console.log(`Auto-queued ${promoted.length} new post(s): ${promoted.map((p) => p.slug).join(", ")}`);
    }
  }
  const queuedSlugs = new Set(promoted.map((p) => p.slug));

  // 5. Build the review issue markdown (ids start after any promoted entries).
  const ids = queue.topics.map((t) => t.id ?? 0);
  const nextId = (ids.length ? Math.max(...ids) : 0) + 1;
  const issue = buildIssue({
    windows,
    decided,
    nextId,
    weekLabel,
    opportunityCount: opportunities.length,
    notifyHandle: process.env.NOTIFY_GH_HANDLE || null,
    autoQueuedCount: promoted.length,
    queuedSlugs,
  });
  writeFileSync(ISSUE_MD, issue.body + "\n");
  writeFileSync(ISSUE_TITLE, issue.title + "\n");
  // Count of pages needing updates — the workflow assigns the issue when > 0.
  writeFileSync(UPDATE_COUNT, String(issue.updateCount ?? 0) + "\n");
  console.log(`Wrote ${ISSUE_MD} (${issue.title}). ${issue.updateCount} page(s) need updates.`);

  // 5. Append to the durable ledger (feeds the --feedback eval pass).
  const ledger = readLedger().filter((e) => e.week !== weekLabel);
  for (const { opp, decision } of decided) {
    ledger.push({
      week: weekLabel,
      slug: decisionSlug(opp, decision),
      title: decision.topic_seed?.title ?? null,
      recommendedAction: decision.recommended_action,
      priority: decision.priority,
      opportunityScore: decision.opportunity_score,
      sourceQuery: decision.primary_query ?? opp.query,
      opportunity: {
        impressions: opp.impressions ?? 0,
        clicks: opp.clicks ?? 0,
        position: opp.position ?? 0,
        ctr: opp.ctr ?? 0,
        deltaPct: opp.deltaPct ?? null,
        opportunity: opp.opportunity ?? "unknown",
        topPagePath: opp.topPagePath ?? "/",
      },
      cannibalizationRisk: decision.cannibalization_risk,
      resolved: false,
      accepted: null,
    });
  }
  writeLedger(ledger);

  // 6. Langfuse dataset records.
  for (const { opp, decision } of decided) {
    await upsertOpportunityRecord({
      id: `${weekLabel}::${decisionSlug(opp, decision)}`,
      input: {
        query: decision.primary_query ?? opp.query,
        impressions: opp.impressions ?? 0,
        clicks: opp.clicks ?? 0,
        position: opp.position ?? 0,
        ctr: opp.ctr ?? 0,
        opportunity: opp.opportunity ?? "unknown",
        topPagePath: opp.topPagePath ?? "/",
        reason: opp.reason ?? "",
      },
      expected: { accepted: null },
      metadata: {
        week: weekLabel,
        recommendedAction: decision.recommended_action,
        priority: decision.priority,
        opportunityScore: decision.opportunity_score,
        cannibalizationRisk: decision.cannibalization_risk,
        sourceFactStatus: decision.source_fact_status,
      },
    });
  }

  const scores = decided.map((d) => d.decision.opportunity_score).filter((s) => typeof s === "number");
  const avgScore = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null;

  return { issue, opportunities, decided, avgScore, weekLabel, dryRun };
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
      input: { week: result.weekLabel, opportunityCount: result.opportunities.length },
      output: {
        decisions: result.decided.map((d) => ({
          query: d.decision.primary_query ?? d.opp.query,
          action: d.decision.recommended_action,
          priority: d.decision.priority,
          score: d.decision.opportunity_score,
        })),
      },
      metadata: {
        opportunityCount: result.opportunities.length,
        analyzedCount: result.decided.length,
        dryRun: result.dryRun,
      },
    });
    if (result.avgScore != null) {
      logScore(span, "avg_opportunity_score", result.avgScore, { dataType: "NUMERIC" });
    }
  });

  await flush();
}

// Only run when executed directly (so the helpers above can be imported in tests).
if (process.argv[1] && process.argv[1].endsWith("gsc-opportunities.mjs")) {
  main().catch(async (err) => {
    console.error("gsc-opportunities failed:", err.message);
    await flush();
    process.exit(1);
  });
}

export { promoteToQueue };
