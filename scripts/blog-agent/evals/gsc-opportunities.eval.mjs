/**
 * Braintrust offline experiment for the GSC opportunity suggester.
 *
 * Reproducible, scored run over the "gsc-opportunities" dataset — use it to
 * compare prompt / threshold / model changes. Each dataset row is one GSC
 * opportunity (logged by gsc-opportunities.mjs); the task re-generates a topic
 * suggestion for it, then scorers grade quality (LLM judge) and, where the
 * human accept/reject ground truth exists (from a `--feedback` pass),
 * acceptance.
 *
 * Run:
 *   BRAINTRUST_API_KEY=... ANTHROPIC_API_KEY=... \
 *     npx braintrust eval scripts/blog-agent/evals/gsc-opportunities.eval.mjs
 *
 * Prereqs: the dataset must have rows — run the orchestrator at least once with
 * BRAINTRUST_API_KEY set (and `--feedback` after curating the queue to populate
 * the `expected.accepted` ground truth).
 */

import { Eval, initDataset } from "braintrust";
import { generateSuggestions, judgeSuggestions } from "../lib/gsc-suggester.mjs";
import { loadCoverage } from "../lib/gsc-opportunities.mjs";

const PROJECT = "pesohub-blog-agent";
const pagePaths = loadCoverage().allSlugs;

/** Rebuild the opportunity object the suggester expects from a dataset input. */
function toOpportunity(input) {
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

// Materialize the dataset into plain {input, expected} rows. Feeding the raw
// Dataset to `data` trips a Braintrust CLI bug: each row's `origin` is null and
// the CLI only guards `undefined`, so ObjectReference.parse(null) throws. Mapping
// to plain rows here drops `origin`/`id` and sidesteps it.
async function datasetRows() {
  const ds = initDataset({ project: PROJECT, dataset: "gsc-opportunities" });
  const rows = [];
  for await (const r of ds) {
    rows.push({
      input: r.input,
      expected: r.expected ?? undefined,
      metadata: r.metadata ?? undefined,
    });
  }
  return rows;
}

Eval(PROJECT, {
  experimentName: "gsc-suggester",
  data: datasetRows,

  // Task: regenerate one suggestion for the opportunity.
  task: async (input) => {
    const opp = toOpportunity(input);
    const [suggestion] = await generateSuggestions([opp], pagePaths);
    return suggestion ?? null;
  },

  scores: [
    // LLM judge — is this a real, non-duplicate, on-brand topic for the query?
    async ({ input, output }) => {
      if (!output) return { name: "topic_quality", score: 0 };
      const judged = await judgeSuggestions([output], [toOpportunity(input)]);
      const v = judged.get(output.slug);
      return { name: "topic_quality", score: v ? v.score : 0 };
    },

    // Human ground truth — did this suggestion's slug get accepted into the
    // topic queue? Only scored once a --feedback pass has set expected.accepted;
    // returns null (the scorer is skipped for that row) otherwise.
    ({ expected }) => {
      if (!expected || typeof expected.accepted !== "boolean") return null;
      return { name: "human_accepted", score: expected.accepted ? 1 : 0 };
    },
  ],
});
