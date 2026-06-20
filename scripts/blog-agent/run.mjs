#!/usr/bin/env node

/**
 * Blog Agent Orchestrator
 *
 * Usage:
 *   node scripts/blog-agent/run.mjs --keyword "best savings account philippines 2026"
 *   node scripts/blog-agent/run.mjs --from-queue
 *   node scripts/blog-agent/run.mjs --from-queue --id 3
 *
 * Environment variables required:
 *   TAVILY_API_KEY    — Tavily API key for web research
 *   ANTHROPIC_API_KEY — Anthropic API key for Claude
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { run as runWriter } from "./writer.mjs";
import { run as runReviewer } from "./reviewer.mjs";
import { writePrBody } from "./lib/reporter.mjs";
import { SYSTEM_PROMPT_VERSION, MODEL } from "./lib/claude-writer.mjs";
import {
  tracedGeneration,
  logSpan,
  flushBraintrust,
} from "./lib/braintrust.mjs";

const QUEUE_PATH = resolve(import.meta.dirname, "topic-queue.json");

// Fallback staleness threshold for evergreen topics that omit refreshIntervalDays.
const DEFAULT_REFRESH_INTERVAL_DAYS = 180;

function parseArgs() {
  const args = process.argv.slice(2);

  // --keyword "..."
  const keywordIdx = args.indexOf("--keyword");
  if (keywordIdx !== -1 && args[keywordIdx + 1]) {
    return { mode: "keyword", keyword: args[keywordIdx + 1] };
  }

  // --from-queue [--id N]
  if (args.includes("--from-queue")) {
    const idIdx = args.indexOf("--id");
    const id = idIdx !== -1 ? parseInt(args[idIdx + 1], 10) : null;
    return { mode: "queue", id };
  }

  console.error(`Usage:
  node scripts/blog-agent/run.mjs --keyword "best savings account philippines"
  node scripts/blog-agent/run.mjs --from-queue
  node scripts/blog-agent/run.mjs --from-queue --id 3`);
  process.exit(1);
}

/**
 * An evergreen topic becomes eligible for refresh once its completedAt is
 * older than refreshIntervalDays (or the default).
 */
function isStaleEvergreen(topic, now = new Date()) {
  if (!topic.evergreen || topic.status !== "completed" || !topic.completedAt) {
    return false;
  }
  const intervalDays = topic.refreshIntervalDays ?? DEFAULT_REFRESH_INTERVAL_DAYS;
  const completed = new Date(topic.completedAt + "T00:00:00Z");
  const ageDays = (now - completed) / 86_400_000;
  return ageDays >= intervalDays;
}

/**
 * Selection priority: (1) first pending topic, then (2) the most overdue
 * stale evergreen topic. `--id` forces (re)generation of a specific topic
 * regardless of status — a completed topic is treated as a refresh.
 *
 * @returns {{topic: object, queue: object, isRefresh: boolean}}
 */
function getNextFromQueue(specificId = null) {
  const queue = JSON.parse(readFileSync(QUEUE_PATH, "utf-8"));

  if (specificId !== null) {
    const topic = queue.topics.find((t) => t.id === specificId);
    if (!topic) {
      console.error(`❌ Topic #${specificId} not found.`);
      process.exit(1);
    }
    return { topic, queue, isRefresh: topic.status === "completed" };
  }

  // Tier 1: pending topics (first generation)
  const pending = queue.topics.find((t) => t.status === "pending");
  if (pending) return { topic: pending, queue, isRefresh: false };

  // Tier 2: oldest stale evergreen topic (deterministic — most overdue first)
  const stale = queue.topics
    .filter((t) => isStaleEvergreen(t))
    .sort((a, b) => a.completedAt.localeCompare(b.completedAt));
  if (stale.length > 0) {
    return { topic: stale[0], queue, isRefresh: true };
  }

  console.log(
    "✅ No pending topics and no evergreen topics are due for refresh."
  );
  process.exit(0);
}

function markTopicCompleted(queue, topicId) {
  const topic = queue.topics.find((t) => t.id === topicId);
  if (topic) {
    topic.status = "completed";
    topic.completedAt = new Date().toISOString().split("T")[0];
  }
  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2) + "\n", "utf-8");
  console.log(`  📋 Topic #${topicId} marked as completed in queue.`);
}

async function main() {
  const { mode, keyword: rawKeyword, id } = parseArgs();

  // Validate env vars
  if (!process.env.TAVILY_API_KEY) {
    console.error("❌ TAVILY_API_KEY environment variable is required.");
    process.exit(1);
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("❌ ANTHROPIC_API_KEY environment variable is required.");
    process.exit(1);
  }

  let keyword;
  let topicMeta = {};
  let queue = null;
  let topicId = null;
  let isRefresh = false;

  if (mode === "queue") {
    const result = getNextFromQueue(id);
    queue = result.queue;
    topicId = result.topic.id;
    isRefresh = result.isRefresh;
    keyword = result.topic.keywords[0]; // primary keyword
    topicMeta = {
      title: result.topic.title,
      slug: result.topic.slug,
      keywords: result.topic.keywords,
      category: result.topic.category,
      linksTo: result.topic.linksTo || [],
    };
    console.log(
      `\n📋 Topic #${topicId}: ${topicMeta.title}${isRefresh ? " (refresh)" : ""}`
    );
  } else {
    keyword = rawKeyword;
  }

  console.log(`\n🚀 PesoHub Blog Agent`);
  console.log(`════════════════════════════════════════`);

  // Wrap the whole generation in a Braintrust span (no-op without a key).
  // The reviewer runs inside the span so its score attaches to the same trace.
  const { slug, review } = await tracedGeneration(
    "blog-generation",
    async (span) => {
      logSpan(span, {
        input: {
          keyword,
          slug: topicMeta.slug ?? null,
          title: topicMeta.title ?? null,
          category: topicMeta.category ?? null,
          mode,
        },
        metadata: {
          systemPromptVersion: SYSTEM_PROMPT_VERSION,
          model: MODEL,
          isRefresh,
          topicId,
        },
      });

      // Step 1: Writer (Anthropic calls auto-traced as child spans)
      const { slug, postData, research } = await runWriter(keyword, topicMeta, {
        isRefresh,
      });

      // Step 2: Reviewer — runs after writing, score attaches to the span
      const review = await runReviewer(slug, keyword, postData, research);

      // Extract the Unsplash photo id so duplicate hero images across posts
      // are visible in Braintrust (group logs by imageId to spot repeats).
      const imageId =
        (postData.image?.src ?? "").match(/unsplash\.com\/([^?]+)/)?.[1] ?? null;

      logSpan(span, {
        output: {
          slug,
          title: postData.title,
          excerpt: postData.excerpt,
          wordCount: review.wordCount,
          sectionCount: postData.sections.length,
          faqCount: postData.faqs.length,
          imageId,
        },
        // Braintrust scores must be 0..1 — never log raw 0–100.
        scores: {
          quality: review.score / 100,
          approved: review.approved ? 1 : 0,
        },
        metadata: {
          issues: review.issues,
          suggestions: review.suggestions,
          imageId,
        },
      });

      // Step 3: PR body
      writePrBody({
        slug,
        title: postData.title,
        keyword,
        review,
        wordCount: review.wordCount,
      });

      // Step 4: Mark queue topic as completed (resets evergreen staleness clock)
      if (queue && topicId !== null) {
        markTopicCompleted(queue, topicId);
      }

      return { slug, review };
    }
  );

  // Final status
  console.log(`\n════════════════════════════════════════`);
  if (review.approved) {
    console.log(`✅ Article approved! Slug: ${slug}`);
    console.log(`   PR body: /tmp/pr-body.md`);
  } else {
    console.log(`⚠️  Article has issues (score: ${review.score}/100)`);
    console.log(`   Issues: ${review.issues.join("; ")}`);
    console.log(`   PR body still written for review: /tmp/pr-body.md`);
  }

  // REQUIRED: flush before exit — beforeExit does not fire on process.exit().
  await flushBraintrust();
}

main().catch(async (err) => {
  console.error("❌ Blog agent failed:", err);
  await flushBraintrust();
  process.exit(1);
});
