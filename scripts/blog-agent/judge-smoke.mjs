#!/usr/bin/env node
/**
 * Judge smoke test — run the OpenAI blog-content-evaluator against one existing
 * committed post. Verifies the judge end to end (real OpenAI call + Langfuse
 * generation span) without generating content, writing files, or opening a PR.
 *
 *   OPENAI_API_KEY=... [LANGFUSE_*=...] node scripts/blog-agent/judge-smoke.mjs [slug]
 *
 * With no slug it picks the first blog post file.
 */

import "./lib/instrumentation.mjs";
import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import { evaluatePost, summarizeCriteria, EVAL_MODEL } from "./lib/blog-evaluator.mjs";
import { flush } from "./lib/observability.mjs";

const BLOG_DIR = resolve(import.meta.dirname, "../../src/data/blog");

function readPost(file) {
  const content = readFileSync(resolve(BLOG_DIR, file), "utf-8");
  const m = content.match(/=\s*(\{[\s\S]*\})\s*;\s*\n\s*export default/);
  if (!m) return null;
  try {
    // eslint-disable-next-line no-new-func
    return Function(`"use strict"; return (${m[1]});`)();
  } catch {
    return null;
  }
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY required.");
    process.exit(1);
  }
  const want = process.argv[2];
  const files = readdirSync(BLOG_DIR).filter((f) => f.endsWith(".ts") && f !== "index.ts" && f !== "post-modules.ts");
  const file = want ? files.find((f) => f.includes(want)) : files[0];
  if (!file) {
    console.error(`No blog post file${want ? ` matching "${want}"` : ""}.`);
    process.exit(1);
  }

  const post = readPost(file);
  if (!post?.slug) {
    console.error(`Could not parse ${file}.`);
    process.exit(1);
  }

  console.log(`Judging "${post.slug}" with OpenAI ${EVAL_MODEL}...\n`);
  const keyword = (post.keywords && post.keywords[0]) || post.slug;
  const evaluation = await evaluatePost(post, keyword, {});
  const s = summarizeCriteria(evaluation.criteria);

  console.log(`publish_recommendation: ${evaluation.publish_recommendation}`);
  console.log(`recommended_content_action: ${evaluation.recommended_content_action}`);
  console.log(`criteria: ${s.passed}/${s.total} pass · critical ${s.criticalPassed ? "OK" : "FAIL (" + s.failed.join(", ") + ")"}`);
  console.log(`final_verdict: ${evaluation.final_verdict}`);
  console.log(`\n✅ OpenAI judge works.`);

  await flush();
}

main().catch(async (err) => {
  console.error("judge-smoke failed:", err);
  await flush().catch(() => {});
  process.exit(1);
});
