#!/usr/bin/env node

/**
 * Seed the canonical blog-agent prompts into Langfuse prompt management.
 *
 * The committed fallbacks in lib/prompts/*.mjs are the source of truth; this
 * pushes each as a Langfuse text prompt (label "production"), versioning on
 * every run with the same name. Runtime fetches the production label and falls
 * back to the committed copy when Langfuse is unset or unreachable.
 *
 * No-op when LANGFUSE_PUBLIC_KEY / LANGFUSE_SECRET_KEY are unset (local runs,
 * contributors without keys). Non-fatal: a sync failure never breaks anything.
 *
 *   node scripts/blog-agent/sync-prompt.mjs
 */

import "./lib/instrumentation.mjs";
import { upsertPrompt, LANGFUSE_ENABLED } from "./lib/observability.mjs";
import {
  KEYWORD_OPPORTUNITY_PROMPT,
  KEYWORD_OPPORTUNITY_PROMPT_NAME,
} from "./lib/prompts/keyword-opportunity.mjs";
import {
  WRITING_AGENT_PROMPT,
  WRITING_AGENT_PROMPT_NAME,
} from "./lib/prompts/writing-agent.mjs";
import {
  BLOG_EVAL_PROMPT,
  BLOG_EVAL_PROMPT_NAME,
} from "./lib/prompts/blog-eval.mjs";
import {
  PACKAGE_EVAL_PROMPT,
  PACKAGE_EVAL_PROMPT_NAME,
} from "./lib/prompts/package-eval.mjs";
import { flush } from "./lib/observability.mjs";

const PROMPTS = [
  [KEYWORD_OPPORTUNITY_PROMPT_NAME, KEYWORD_OPPORTUNITY_PROMPT],
  [WRITING_AGENT_PROMPT_NAME, WRITING_AGENT_PROMPT],
  [BLOG_EVAL_PROMPT_NAME, BLOG_EVAL_PROMPT],
  [PACKAGE_EVAL_PROMPT_NAME, PACKAGE_EVAL_PROMPT],
];

async function main() {
  if (!LANGFUSE_ENABLED) {
    console.log("ℹ️  LANGFUSE keys unset — skipping prompt seed.");
    return;
  }
  for (const [name, text] of PROMPTS) {
    await upsertPrompt(name, text);
    console.log(`🔄 Seeded prompt → ${name} (label: production).`);
  }
  await flush();
  console.log(`✅ Synced ${PROMPTS.length} prompts to Langfuse.`);
}

main().catch(async (err) => {
  // Non-fatal: a sync failure must never break the pipeline.
  console.error("⚠️  Prompt seed failed (non-fatal):", err.message);
  await flush().catch(() => {});
  process.exit(0);
});
