#!/usr/bin/env node
/**
 * Langfuse experiment for the Keyword Opportunity Agent.
 *
 * Reproducible, scored run over the "gsc-opportunities" dataset — compare
 * prompt / threshold / model changes. Each dataset item is one GSC opportunity
 * (logged by gsc-opportunities.mjs); the task re-runs analyzeOpportunity, then
 * evaluators check score self-consistency, action validity, and — where the
 * human accept/reject ground truth exists (from a `--feedback` pass) —
 * acceptance.
 *
 * Run:
 *   LANGFUSE_PUBLIC_KEY=... LANGFUSE_SECRET_KEY=... ANTHROPIC_API_KEY=... \
 *     node scripts/blog-agent/evals/keyword-opportunity.experiment.mjs
 *
 * Prereqs: the dataset must have items — run gsc-opportunities.mjs at least once
 * with LANGFUSE keys set (and `--feedback` after curating the queue to populate
 * expectedOutput.accepted).
 */

import "../lib/instrumentation.mjs";
import { LangfuseClient } from "@langfuse/client";
import { LANGFUSE_ENABLED, flush } from "../lib/observability.mjs";
import { analyzeOpportunity, weightedScore } from "../lib/gsc-suggester.mjs";
import { loadCoverage } from "../lib/gsc-opportunities.mjs";

const DATASET = "gsc-opportunities";
const VALID_ACTIONS = new Set([
  "update_existing_page",
  "publish_as_new_post",
  "create_supporting_page_with_internal_links",
  "merge_with_existing_page",
  "reject",
  "hold",
]);

function toOpportunity(input = {}) {
  return {
    query: input.query,
    opportunity: input.opportunity ?? "unknown",
    impressions: input.impressions ?? 0,
    clicks: input.clicks ?? 0,
    position: input.position ?? 0,
    ctr: input.ctr ?? 0,
    topPagePath: input.topPagePath ?? "/",
    reason: input.reason ?? "",
  };
}

// Score self-consistency: how close is the model's opportunity_score to the
// weighted formula recomputed from its own breakdown? (1.0 = exact.)
async function scoreSanity({ output }) {
  if (!output?.score_breakdown) return { name: "score_sanity", value: 0, comment: "no breakdown" };
  const recomputed = weightedScore(output.score_breakdown);
  const diff = Math.abs(recomputed - (output.opportunity_score ?? 0));
  return { name: "score_sanity", value: Math.max(0, 1 - diff), comment: `Δ ${diff.toFixed(3)}` };
}

// Action validity: valid enum + no publish_as_new_post when cannibalization is high.
async function actionValid({ output }) {
  const action = output?.recommended_action;
  const ok =
    VALID_ACTIONS.has(action) &&
    !(output?.cannibalization_risk === "high" && action === "publish_as_new_post");
  return { name: "action_valid", value: ok ? 1 : 0, comment: `${action} / ${output?.cannibalization_risk}` };
}

// Human ground truth (only once a --feedback pass set expectedOutput.accepted).
async function humanAccepted({ expectedOutput }) {
  if (!expectedOutput || typeof expectedOutput.accepted !== "boolean") return [];
  return { name: "human_accepted", value: expectedOutput.accepted ? 1 : 0 };
}

async function main() {
  if (!LANGFUSE_ENABLED) {
    console.error("LANGFUSE keys required to run an experiment.");
    process.exit(1);
  }
  const pagePaths = loadCoverage().allSlugs;
  const langfuse = new LangfuseClient();
  const dataset = await langfuse.dataset.get(DATASET);
  console.log(`Loaded "${DATASET}" — ${dataset.items.length} items.`);

  const result = await dataset.runExperiment({
    name: "keyword-opportunity",
    description: "Re-score each GSC opportunity and grade the decision.",
    task: async ({ input }) => analyzeOpportunity(toOpportunity(input), { pagePaths }),
    evaluators: [scoreSanity, actionValid, humanAccepted],
  });

  console.log(await result.format());
  await flush();
}

main().catch(async (err) => {
  console.error("experiment failed:", err);
  await flush().catch(() => {});
  process.exit(1);
});
