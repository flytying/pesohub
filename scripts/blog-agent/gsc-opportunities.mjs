#!/usr/bin/env node
/**
 * GSC content-opportunity finder — runs on two cadences via --track.
 *
 * Pull Search Console → detect striking-distance/rising opportunities → Keyword
 * Opportunity Agent scores each + picks a content action → log to Langfuse (eval
 * dataset + scores) → auto-queue the top decisions and write a review issue.
 *
 * Two tracks split the work by content action and cadence (both feed the same
 * topic-queue.json; the blog-post cron drains it regardless):
 *   • --track blog    (weekly)  → publish_as_new_post — fresh blog posts.
 *   • --track content (monthly) → create_supporting_page / update_existing_page /
 *                                 merge_with_existing_page — new pages + updates.
 *   • --track all     (default) → every promotable action (manual/local runs).
 * The 28-day GSC window means weekly re-runs compare ~75%-overlapping data;
 * updates/new pages get cleaner signal on a monthly cadence, while blog posts
 * stay weekly to keep the Mon/Wed/Fri blog cron fed.
 *
 * Sourcing is automatic — no manual paste. promoteToQueue() appends the top
 * PROMOTE_COUNT decisions/run to topic-queue.json as `pending`; the workflow
 * commits queue + ledger to main and the blog-post cron works them:
 *   • publish_as_new_post / create_supporting_page → a new post.
 *   • update_existing_page / merge_with_existing_page → a human-apply package
 *     for the page that already ranks (no duplicate post; see writer.mjs).
 * No auto-publish — every result still lands as a review PR.
 *
 * Usage:
 *   node scripts/blog-agent/gsc-opportunities.mjs --track blog     # weekly blog run
 *   node scripts/blog-agent/gsc-opportunities.mjs --track content  # monthly content run
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
const LEDGER_MAX_WEEKS = 12;
// Bound the number of LLM analysis calls per run (one call per opportunity).
// Opportunities beyond this are dropped and logged — not silently.
const MAX_ANALYZE = 12;

const TRACKS = new Set(["blog", "content", "all"]);

// Per-track state paths. The blog (weekly) and content (monthly) workflows can
// run the same day (a 1st-of-month that lands on a Monday) and each rewrites its
// own ledger for that date — separate files keep them from clobbering each other.
// `blog`/`all` keep the legacy paths so existing runs/issues stay continuous.
function ledgerPath(track) {
  return join(
    __dirname,
    track === "content" ? "gsc-suggestions-content-log.json" : "gsc-suggestions-log.json"
  );
}
function issuePaths(track) {
  return {
    md: `/tmp/gsc-issue-${track}.md`,
    title: `/tmp/gsc-issue-${track}-title.txt`,
    updateCount: `/tmp/gsc-issue-${track}-count.txt`,
  };
}

function parseArgs(argv) {
  const args = { dryRun: false, feedback: false, fixture: null, track: "all" };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--feedback") args.feedback = true;
    else if (a === "--fixture") args.fixture = argv[++i];
    else if (a === "--track") args.track = argv[++i];
  }
  if (!TRACKS.has(args.track)) {
    throw new Error(`--track must be one of ${[...TRACKS].join(", ")} (got "${args.track}").`);
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

// Actions that can be auto-queued. New-post/supporting produce a fresh post;
// update/merge produce a human-apply package for the page that already ranks
// (no duplicate post — see writer.mjs). Update/merge are promoted so the blog
// pipeline always has work even in weeks where every opportunity is on a page
// we already cover.
const NEW_POST_ACTIONS = new Set([
  "publish_as_new_post",
  "create_supporting_page_with_internal_links",
]);
const PROMOTABLE_ACTIONS = new Set([
  ...NEW_POST_ACTIONS,
  "update_existing_page",
  "merge_with_existing_page",
]);

// Which actions each cadence track promotes. `blog` (weekly) ships fresh posts;
// `content` (monthly) handles new supporting pages + updates to pages that
// already rank; `all` is the legacy union for manual/local runs.
const TRACK_ACTIONS = {
  blog: new Set(["publish_as_new_post"]),
  content: new Set([
    "create_supporting_page_with_internal_links",
    "update_existing_page",
    "merge_with_existing_page",
  ]),
  all: PROMOTABLE_ACTIONS,
};

/**
 * Append the top promotable decisions to the queue as `pending` topics.
 * Ordered by priority (A→B→C), then new-post before update/merge, then
 * opportunity_score desc. Skips entries whose slug can't be derived or is
 * already in the queue (any status — so a page's update task isn't re-queued
 * while one still exists). Mutates `queue` in place and returns the appended
 * entries.
 *
 * @param {object} queue  parsed topic-queue.json
 * @param {Array<{opp:object, decision:object}>} decided
 * @param {number} count
 * @param {Set<string>} [allowedActions]  restrict to a cadence track's actions
 */
function promoteToQueue(queue, decided, count, allowedActions = PROMOTABLE_ACTIONS) {
  const existing = new Set(queue.topics.map((t) => t.slug));
  let nextId =
    queue.topics.map((t) => t.id ?? 0).reduce((a, b) => Math.max(a, b), 0) + 1;

  const candidates = decided
    .map((d) => d.decision)
    .filter(
      (d) =>
        PROMOTABLE_ACTIONS.has(d.recommended_action) &&
        allowedActions.has(d.recommended_action)
    )
    .sort(
      (a, b) =>
        (PRIORITY_RANK[a.priority] ?? 9) - (PRIORITY_RANK[b.priority] ?? 9) ||
        (NEW_POST_ACTIONS.has(b.recommended_action) ? 1 : 0) -
          (NEW_POST_ACTIONS.has(a.recommended_action) ? 1 : 0) ||
        (b.opportunity_score ?? 0) - (a.opportunity_score ?? 0)
    );

  const appended = [];
  for (const decision of candidates) {
    if (appended.length >= count) break;
    const entry = buildQueueEntry(decision, nextId);
    if (!entry.slug || existing.has(entry.slug)) continue; // undeducible or dup
    nextId++;
    queue.topics.push(entry);
    existing.add(entry.slug);
    appended.push(entry);
  }
  return appended;
}

function readLedger(path) {
  if (!existsSync(path)) return [];
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return [];
  }
}

function writeLedger(path, entries) {
  const weeks = [...new Set(entries.map((e) => e.week))].sort().slice(-LEDGER_MAX_WEEKS);
  const keep = new Set(weeks);
  const trimmed = entries.filter((e) => keep.has(e.week));
  writeFileSync(path, JSON.stringify(trimmed, null, 2) + "\n");
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

async function runFeedback(track) {
  const path = ledgerPath(track);
  const ledger = readLedger(path);
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
  writeLedger(path, ledger);
  await flush();
  console.log(
    `Feedback logged: ${accepted}/${ledger.length} suggested slugs accepted into the queue.`
  );
}

// ── Main run (one cadence track) ─────────────────────────────────────────────

async function runTrack({ dryRun, fixture, track }) {
  const now = new Date();
  const weekLabel = ymd(now);
  const trackActions = TRACK_ACTIONS[track];
  const issueFiles = issuePaths(track);

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

  // 3b. Keep only this track's actions — `blog` (weekly) promotes new posts,
  //     `content` (monthly) promotes new supporting pages + page updates. The
  //     issue, promotion, ledger and Langfuse records are all scoped to the
  //     track so the two cadences don't cross-report. `all` keeps everything.
  const trackDecided =
    track === "all"
      ? decided
      : decided.filter((d) => trackActions.has(d.decision.recommended_action));

  // 4. Auto-promote this track's top decisions into the queue (skipped on
  //    dry-run). promoteToQueue re-filters by the track's action set.
  const queue = readQueue();
  const promoteCount = parseInt(process.env.PROMOTE_COUNT ?? "3", 10);
  let promoted = [];
  if (!dryRun && promoteCount > 0) {
    promoted = promoteToQueue(queue, trackDecided, promoteCount, trackActions);
    if (promoted.length) {
      writeQueue(queue);
      console.log(`Auto-queued ${promoted.length} item(s): ${promoted.map((p) => p.slug).join(", ")}`);
    }
  }
  const queuedSlugs = new Set(promoted.map((p) => p.slug));

  // 5. Build the review issue markdown (ids start after any promoted entries).
  const ids = queue.topics.map((t) => t.id ?? 0);
  const nextId = (ids.length ? Math.max(...ids) : 0) + 1;
  const issue = buildIssue({
    windows,
    decided: trackDecided,
    nextId,
    weekLabel,
    track,
    opportunityCount: opportunities.length,
    notifyHandle: process.env.NOTIFY_GH_HANDLE || null,
    autoQueuedCount: promoted.length,
    queuedSlugs,
  });
  writeFileSync(issueFiles.md, issue.body + "\n");
  writeFileSync(issueFiles.title, issue.title + "\n");
  // Count of pages needing updates — the workflow assigns the issue when > 0.
  writeFileSync(issueFiles.updateCount, String(issue.updateCount ?? 0) + "\n");
  console.log(`Wrote ${issueFiles.md} (${issue.title}). ${issue.updateCount} page(s) need updates.`);

  // 5. Append to this track's durable ledger (feeds the --feedback eval pass).
  const ledgerFile = ledgerPath(track);
  const ledger = readLedger(ledgerFile).filter((e) => e.week !== weekLabel);
  for (const { opp, decision } of trackDecided) {
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
  writeLedger(ledgerFile, ledger);

  // 6. Langfuse dataset records.
  for (const { opp, decision } of trackDecided) {
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

  const scores = trackDecided.map((d) => d.decision.opportunity_score).filter((s) => typeof s === "number");
  const avgScore = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : null;

  return { issue, opportunities, decided: trackDecided, avgScore, weekLabel, dryRun };
}

async function main() {
  const args = parseArgs(process.argv);

  if (args.feedback) {
    await runFeedback(args.track);
    return;
  }

  await tracedGeneration(`gsc-opportunities:${args.track}`, async (span) => {
    const result = await runTrack(args);
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
