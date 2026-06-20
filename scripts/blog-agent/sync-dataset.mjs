#!/usr/bin/env node

/**
 * Backfill the Braintrust "blog-posts" dataset from existing post data files.
 *
 * Going forward, run.mjs upserts each new generation automatically; this is the
 * one-time (re-runnable) backfill for posts that already exist in the repo.
 * Records are keyed by slug, so re-running upserts rather than duplicating.
 *
 * No-op when BRAINTRUST_API_KEY is unset.
 *
 *   node scripts/blog-agent/sync-dataset.mjs
 */

import { readdirSync, readFileSync } from "fs";
import { resolve } from "path";
import {
  upsertDatasetRecord,
  flushBraintrust,
  BRAINTRUST_ENABLED,
} from "./lib/braintrust.mjs";

if (!BRAINTRUST_ENABLED) {
  console.log("ℹ️  BRAINTRUST_API_KEY unset — skipping dataset backfill.");
  process.exit(0);
}

const BLOG_DIR = resolve(import.meta.dirname, "../../src/data/blog");

/**
 * Extract the BlogPostData object literal from a data file. The files are
 * trusted repo source; the literal is valid JS (quoted or unquoted keys), so
 * Function-eval handles both styles where JSON.parse would choke.
 */
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

function wordCount(post) {
  const text = (post.sections || [])
    .map((s) => s.content || (s.items || []).join(" ") || "")
    .join(" ");
  return text.split(/\s+/).filter(Boolean).length;
}

const files = readdirSync(BLOG_DIR).filter(
  (f) => f.endsWith(".ts") && f !== "index.ts"
);

let ok = 0;
for (const file of files) {
  const post = readPost(file);
  if (!post || !post.slug) {
    console.log(`  ⚠️  Skipped (unparseable): ${file}`);
    continue;
  }

  upsertDatasetRecord({
    id: post.slug,
    input: {
      keyword: (post.keywords && post.keywords[0]) || post.slug,
      category: post.category,
      keywords: post.keywords || [],
      links: post.relatedSlugs || [],
      title: post.title,
    },
    expected: {
      title: post.title,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      directAnswer: post.directAnswer,
      excerpt: post.excerpt,
      sections: post.sections,
      faqs: post.faqs,
      readTime: post.readTime,
    },
    metadata: {
      slug: post.slug,
      source: "backfill",
      category: post.category,
      wordCount: wordCount(post),
      readTime: post.readTime,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
    },
  });
  ok++;
  console.log(`  ✅ ${post.slug}`);
}

await flushBraintrust();
console.log(`\n🗂️  Backfilled ${ok}/${files.length} posts into the "blog-posts" dataset.`);
