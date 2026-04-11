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

const QUEUE_PATH = resolve(import.meta.dirname, "topic-queue.json");

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

function getNextFromQueue(specificId = null) {
  const queue = JSON.parse(readFileSync(QUEUE_PATH, "utf-8"));

  let topic;
  if (specificId !== null) {
    topic = queue.topics.find((t) => t.id === specificId && t.status === "pending");
    if (!topic) {
      console.error(`❌ Topic #${specificId} not found or already completed.`);
      process.exit(1);
    }
  } else {
    topic = queue.topics.find((t) => t.status === "pending");
    if (!topic) {
      console.log("✅ All topics in queue have been completed. No pending topics.");
      process.exit(0);
    }
  }

  return { topic, queue };
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

  if (mode === "queue") {
    const result = getNextFromQueue(id);
    queue = result.queue;
    topicId = result.topic.id;
    keyword = result.topic.keywords[0]; // primary keyword
    topicMeta = {
      title: result.topic.title,
      slug: result.topic.slug,
      keywords: result.topic.keywords,
      category: result.topic.category,
      linksTo: result.topic.linksTo || [],
    };
    console.log(`\n📋 Topic #${topicId}: ${topicMeta.title}`);
  } else {
    keyword = rawKeyword;
  }

  console.log(`\n🚀 PesoHub Blog Agent`);
  console.log(`════════════════════════════════════════`);

  // Step 1: Writer
  const { slug, postData, research } = await runWriter(keyword, topicMeta);

  // Step 2: Reviewer
  const review = await runReviewer(slug, keyword, postData, research);

  // Step 3: PR body
  writePrBody({
    slug,
    title: postData.title,
    keyword,
    review,
    wordCount: review.wordCount,
  });

  // Step 4: Mark queue topic as completed
  if (queue && topicId !== null) {
    markTopicCompleted(queue, topicId);
  }

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
}

main().catch((err) => {
  console.error("❌ Blog agent failed:", err);
  process.exit(1);
});
