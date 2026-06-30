#!/usr/bin/env node
/**
 * Langfuse experiment for content creation (blog-content-evaluator).
 *
 * Runs the 10-criterion Boolean judge over the "blog-posts" dataset (each item's
 * expectedOutput is a generated post). The task evaluates the stored post; item
 * evaluators surface the criteria pass-rate and the publish verdict; run
 * evaluators report the dataset-wide mean pass-rate and % publishable. Use it to
 * iterate on the evaluator prompt and to track content quality over time.
 *
 * Run (the judge runs on OpenAI):
 *   LANGFUSE_PUBLIC_KEY=... LANGFUSE_SECRET_KEY=... OPENAI_API_KEY=... \
 *     node scripts/blog-agent/evals/blog-content.experiment.mjs
 *
 * Prereqs: the dataset must have items — run.mjs upserts them, or backfill with
 * `npm run sync-dataset`.
 */

import "../lib/instrumentation.mjs";
import { LangfuseClient } from "@langfuse/client";
import { LANGFUSE_ENABLED, flush } from "../lib/observability.mjs";
import { evaluatePost, summarizeCriteria } from "../lib/blog-evaluator.mjs";
import { CRITICAL_CRITERIA } from "../lib/prompts/blog-eval.mjs";

const DATASET = "blog-posts";

/** Reconstruct a postData shape the judge understands from a dataset item. */
function toPostData(item) {
  const e = item.expectedOutput ?? {};
  const i = item.input ?? {};
  return {
    title: e.title,
    metaTitle: e.metaTitle,
    metaDescription: e.metaDescription,
    directAnswer: e.directAnswer,
    excerpt: e.excerpt,
    sections: e.sections ?? [],
    faqs: e.faqs ?? [],
    readTime: e.readTime,
    category: i.category,
    keywords: i.keywords ?? [],
    relatedSlugs: i.links ?? [],
  };
}

// Item evaluators read the judge output the task returned.
async function passRate({ output }) {
  const s = summarizeCriteria(output?.criteria ?? {});
  return { name: "criteria_pass_rate", value: s.passRate, comment: `${s.passed}/${s.total}` };
}
async function publishable({ output }) {
  const s = summarizeCriteria(output?.criteria ?? {});
  const ok = output?.publish_recommendation === "publish" && s.criticalPassed;
  return { name: "publishable", value: ok ? 1 : 0, comment: output?.publish_recommendation };
}
async function criticalPass({ output }) {
  const ok = CRITICAL_CRITERIA.every((k) => output?.criteria?.[k]?.result === "pass");
  return { name: "critical_pass", value: ok ? 1 : 0 };
}

function mean(values) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

// Run-level rollups.
async function meanPassRate({ itemResults }) {
  const v = itemResults
    .flatMap((r) => r.evaluations)
    .filter((e) => e.name === "criteria_pass_rate")
    .map((e) => e.value);
  return { name: "mean_pass_rate", value: mean(v), comment: `${(mean(v) * 100).toFixed(1)}%` };
}
async function pctPublishable({ itemResults }) {
  const v = itemResults
    .flatMap((r) => r.evaluations)
    .filter((e) => e.name === "publishable")
    .map((e) => e.value);
  return { name: "pct_publishable", value: mean(v), comment: `${(mean(v) * 100).toFixed(1)}%` };
}

async function main() {
  if (!LANGFUSE_ENABLED) {
    console.error("LANGFUSE keys required to run an experiment.");
    process.exit(1);
  }
  const langfuse = new LangfuseClient();
  const dataset = await langfuse.dataset.get(DATASET);
  console.log(`Loaded "${DATASET}" — ${dataset.items.length} items.`);

  const result = await dataset.runExperiment({
    name: "blog-content",
    description: "Judge each stored post against the 10-criterion Boolean rubric.",
    task: async ({ input, expectedOutput }) => {
      const item = { input, expectedOutput };
      const postData = toPostData(item);
      return evaluatePost(postData, (input?.keyword) || postData.title, {});
    },
    evaluators: [passRate, publishable, criticalPass],
    runEvaluators: [meanPassRate, pctPublishable],
  });

  console.log(await result.format());
  await flush();
}

main().catch(async (err) => {
  console.error("experiment failed:", err);
  await flush().catch(() => {});
  process.exit(1);
});
