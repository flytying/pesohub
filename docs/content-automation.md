# Content Automation

Three automation systems generate or refresh site content. **All open PRs / issues or auto-merge
generated posts — none change live financial figures without a path through review.**

For hosting, DNS, secrets, and the rate-update crons see `docs/deployment-and-automation.md`.

## 1. Data Updater — `scripts/data-updater/`

Scrapes bank + government data with Tavily, validates, rewrites the `src/data/**` TypeScript files,
and opens a PR. Never auto-merges.

Pipeline: Tavily Extract → Tavily AI Search (structured parse) → Validator (anomaly checks) →
File Writer (preserves FAQs + types) → Pull Request.

```bash
# Bank rates
TAVILY_API_KEY=... node scripts/data-updater/run-update.mjs --sources savings-rates,digital-rates,time-deposit-rates
# Government data
TAVILY_API_KEY=... node scripts/data-updater/run-update.mjs --sources sss-contribution,sss-pension,pagibig-housing,pagibig-contribution,pagibig-mp2,philhealth,withholding-tax
# Everything
TAVILY_API_KEY=... node scripts/data-updater/run-update.mjs --sources all
```

Layout: `run-update.mjs` (orchestrator) · `lib/` (fetcher, ai-extractor, validator, file-writer,
reporter, config) · `sources/` (one script per source).

**Adding a source:** config in `lib/config.mjs` → source script in `sources/` → register in
`run-update.mjs` sourceModules map → add to a workflow → add page to `src/data/content-registry.ts`.

> Note: `scripts/data-updater/lib 2/` and `sources 2/` are committed macOS sync-duplicate
> directories — junk, not a second implementation. See `docs/known-issues.md`.

## 2. Blog Agent — `scripts/blog-agent/`

Generates blog posts from a topic queue, reviews them, and writes the post files + registry entries.
Runs weekly via `.github/workflows/blog-post.yml` (Mon 03:00 UTC) which can auto-merge the post PR.

- `run.mjs` — orchestrator (keyword or `topic-queue.json`-driven).
- `writer.mjs` / `lib/claude-writer.mjs` — research (Tavily) → outline → draft.
- `reviewer.mjs` / `lib/claude-reviewer.mjs` — quality review pass.
- `lib/` — `file-generator`, `registry-updater` (edits `src/data/blog/index.ts` + `post-modules.ts`),
  `tavily-search`, `unsplash-image`, `reporter`, `braintrust`.
- `topic-queue.json` — pending topics (`status: "pending"`).
- `sync-prompt` / `sync-dataset` — push the agent prompt / dataset to Braintrust
  (`npm run sync-prompt`, `npm run sync-dataset`).

A new blog post needs an entry in **both** `src/data/blog/index.ts` and
`src/data/blog/post-modules.ts` to be reachable (see `docs/known-issues.md` for an orphan example).

## 3. GSC Content Opportunity Finder — EXPERIMENTAL, NOT COMMITTED

> **Status: not in the repo.** The GSC opportunity finder (orchestrator, `lib/gsc-*.mjs`,
> `evals/`, and its `gsc-opportunities.yml` workflow) exists **only as untracked working-tree
> files**, all carrying the macOS `" 2"` duplicate suffix. No GSC file is git-tracked and the
> workflow is not committed, so **it does not run in CI**. Treat it as a work-in-progress that
> still needs to be cleaned up and committed before it is real.

Intended design (for when it lands): pull GSC Search Analytics → detect striking-distance /
content-gap / rising queries → Claude drafts `topic-queue.json`-shaped suggestions with an
LLM-judge score → open a GitHub issue for review → log to Braintrust. It would never auto-publish;
a human pastes the chosen snippet into `topic-queue.json` for the blog agent to pick up.

Required secrets (when committed): `GSC_SERVICE_ACCOUNT_JSON`, `GSC_SITE_URL` (e.g.
`sc-domain:pesohub.ph`); `ANTHROPIC_API_KEY` / `BRAINTRUST_API_KEY` already exist.

## GitHub Workflows (committed)

| Workflow | Schedule (UTC) | Purpose |
|----------|----------------|---------|
| `update-rates.yml` | Mon–Fri 01:00 | Exchange rates from BSP |
| `update-bank-rates.yml` | 1st + 15th 02:00 | Bank rate scrape (Tavily) → PR |
| `update-government-data.yml` | 1st 03:00 | Gov data check (Tavily) → PR |
| `content-freshness.yml` | Mon 01:00 | Staleness check → GitHub issue |
| `blog-post.yml` | Mon 03:00 | Generate post from queue → auto-merge |

`gsc-opportunities.yml` is **not committed** (only an untracked `gsc-opportunities 2.yml` dup exists).
