# Content Automation

Three automation systems generate or refresh site content. **All open PRs / issues for review —
nothing changes live financial figures without a path through review.**

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
Runs `.github/workflows/blog-post.yml` **Mon/Wed/Fri 03:00 UTC** — one post per run, opened as a
**review PR (no auto-merge)** on this YMYL site. The queue is auto-fed by the GSC analysis (below), so
the week's keyword opportunities turn into ~3 review PRs. The queue status advances on `main` at
generation time (separate from the content PR) so the next run never re-picks the same topic.

- `run.mjs` — orchestrator (keyword or `topic-queue.json`-driven). Branches on each topic's
  `recommendedAction`: new-post / supporting-page write a TS file; update/merge emit a Markdown
  action package to `scripts/blog-agent/output/`; hold/reject are logged only.
- `writer.mjs` / `lib/claude-writer.mjs` — research (Tavily) → outline → draft, driven by the
  canonical **writing-agent** prompt (`lib/prompts/writing-agent.mjs`).
- `reviewer.mjs` / `lib/blog-evaluator.mjs` — the 10-criterion **Boolean** judge
  (`lib/prompts/blog-eval.mjs`); publish gate = `publish` + all 6 critical criteria pass.
  Runs on **OpenAI** (`gpt-4.1`, override via `OPENAI_EVAL_MODEL`) — cross-provider grading,
  since the writer/keyword agents run on Anthropic. Needs `OPENAI_API_KEY`.
- `lib/` — `file-generator`, `registry-updater` (edits `src/data/blog/index.ts` + `post-modules.ts`),
  `tavily-search`, `unsplash-image`, `reporter`, `observability` (Langfuse guard) + `instrumentation`
  (OTel bootstrap), `prompts/` (the 3 canonical prompts).
- `topic-queue.json` — pending topics (`status: "pending"`, optional `recommendedAction`).
- `sync-prompt` / `sync-dataset` — seed the 3 prompts / backfill the `blog-posts` dataset to Langfuse
  (`npm run sync-prompt`, `npm run sync-dataset`).
- `evals/*.experiment.mjs` — Langfuse experiments (`npm run eval:keyword`, `npm run eval:content`).

A new blog post needs an entry in **both** `src/data/blog/index.ts` and
`src/data/blog/post-modules.ts` to be reachable (see `docs/known-issues.md` for an orphan example).

## 3. GSC Content Opportunity Finder

Turns Google Search Console data into reviewed blog-topic suggestions. Runs weekly via
`.github/workflows/gsc-opportunities.yml` (Mon 01:30 UTC, before the blog-post cron). Never
auto-publishes — it opens a GitHub issue to review.

Flow: pull GSC Search Analytics (`lib/gsc-client.mjs`, service-account JWT) → detect
striking-distance / content-gap / rising queries (`lib/gsc-opportunities.mjs`) → the **keyword
opportunity agent** scores each cluster and picks a content action (`lib/gsc-suggester.mjs`,
`analyzeOpportunity`, prompt `lib/prompts/keyword-opportunity.mjs`) → ranked issue markdown grouped by
priority/action (`lib/gsc-reporter.mjs`). Orchestrator: `scripts/blog-agent/gsc-opportunities.mjs`
(caps analysis to the top 12 opportunities/run). It **auto-promotes** the top `PROMOTE_COUNT` (repo var,
default 3) decisions into `topic-queue.json` as `pending` topics (ordered priority A→B→C, new-post before
update, then score; deduped by slug). New-post/supporting decisions become posts; `update`/`merge`
decisions become human-apply update packages for the page that already ranks (no duplicate post). The
issue still opens for visibility; auto-queued items are marked "✅ Auto-queued". Decisions + scores log to
the `gsc-opportunities` Langfuse dataset; `evals/keyword-opportunity.experiment.mjs` is the offline experiment.

**Cannibalization guard + keyword ownership.** New posts pass through `lib/dup-guard.mjs`
(`duplicatesOwnedPage`) in `run.mjs`: a topic whose keywords duplicate a page's owned intent is skipped
(`status: "skipped-duplicate"`) instead of generated, so the auto-queue can't recreate cannibalization.
The `PAGE_OWNED_INTENTS` map there is the source of truth for the savings cluster — the
`best-digital-bank-rates-philippines` page owns the "high-yield / best-digital-bank / highest-interest"
intent; blogs take distinct angles (analysis vs inflation, ranked lists, how-tos). See the SEO recovery
notes for why (the "high yield savings account 2026 philippines" collapse). Diagnose GSC drops with
`node scripts/blog-agent/gsc-diagnose.mjs` (site-wide vs isolated).

Required secrets: `GSC_SERVICE_ACCOUNT_JSON`, `GSC_SITE_URL` (e.g. `sc-domain:pesohub.ph`);
`ANTHROPIC_API_KEY` already exists. Optional: `LANGFUSE_PUBLIC_KEY` / `LANGFUSE_SECRET_KEY` /
`LANGFUSE_BASEURL` (the Langfuse layer no-ops when unset).

```bash
# Full run (writes /tmp/gsc-issue.md; workflow opens the issue)
GSC_SERVICE_ACCOUNT_JSON="$(cat sa-key.json)" GSC_SITE_URL="sc-domain:pesohub.ph" \
  ANTHROPIC_API_KEY=... LANGFUSE_PUBLIC_KEY=... LANGFUSE_SECRET_KEY=... \
  node scripts/blog-agent/gsc-opportunities.mjs --dry-run
```

## GitHub Workflows (committed)

| Workflow | Schedule (UTC) | Purpose |
|----------|----------------|---------|
| `update-rates.yml` | Mon–Fri 01:00 | Exchange rates from BSP |
| `update-bank-rates.yml` | 1st + 15th 02:00 | Bank rate scrape (Tavily) → PR |
| `update-government-data.yml` | 1st 03:00 | Gov data check (Tavily) → PR |
| `content-freshness.yml` | Mon 01:00 | Staleness check → GitHub issue |
| `blog-post.yml` | Mon/Wed/Fri 03:00 | Generate 1 post from queue → review PR (no auto-merge) |
| `gsc-opportunities.yml` | Mon 01:30 | GSC analysis → issue + auto-queue top 3 new posts |
