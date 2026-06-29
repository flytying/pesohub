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

## 3. GSC Content Opportunity Finder

Turns Google Search Console data into reviewed blog-topic suggestions. Runs weekly via
`.github/workflows/gsc-opportunities.yml` (Mon 01:30 UTC, before the blog-post cron). Never
auto-publishes — it opens a GitHub issue to review.

Flow: pull GSC Search Analytics (`lib/gsc-client.mjs`, service-account JWT) → detect
striking-distance / content-gap / rising queries (`lib/gsc-opportunities.mjs`) → Claude drafts
`topic-queue.json`-shaped suggestions + LLM-judge score (`lib/gsc-suggester.mjs`) → ranked issue
markdown (`lib/gsc-reporter.mjs`). Orchestrator: `scripts/blog-agent/gsc-opportunities.mjs`. A human
pastes the chosen snippet into `topic-queue.json` for the blog agent to pick up. Suggestions + scores
log to Braintrust; `evals/gsc-opportunities.eval.mjs` is the offline eval.

Required secrets: `GSC_SERVICE_ACCOUNT_JSON`, `GSC_SITE_URL` (e.g. `sc-domain:pesohub.ph`);
`ANTHROPIC_API_KEY` / `BRAINTRUST_API_KEY` already exist.

```bash
# Full run (writes /tmp/gsc-issue.md; workflow opens the issue)
GSC_SERVICE_ACCOUNT_JSON="$(cat sa-key.json)" GSC_SITE_URL="sc-domain:pesohub.ph" \
  ANTHROPIC_API_KEY=... BRAINTRUST_API_KEY=... \
  node scripts/blog-agent/gsc-opportunities.mjs --dry-run
```

## GitHub Workflows (committed)

| Workflow | Schedule (UTC) | Purpose |
|----------|----------------|---------|
| `update-rates.yml` | Mon–Fri 01:00 | Exchange rates from BSP |
| `update-bank-rates.yml` | 1st + 15th 02:00 | Bank rate scrape (Tavily) → PR |
| `update-government-data.yml` | 1st 03:00 | Gov data check (Tavily) → PR |
| `content-freshness.yml` | Mon 01:00 | Staleness check → GitHub issue |
| `blog-post.yml` | Mon 03:00 | Generate post from queue → auto-merge |
| `gsc-opportunities.yml` | Mon 01:30 | GSC opportunities → GitHub issue |
