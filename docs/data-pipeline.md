# Data Pipeline & Freshness

How PesoHub's financial data stays current. All data lives in `src/data/` as TypeScript (no DB). Updates flow through GitHub Actions crons; a scheduled Claude agent gates the resulting PRs.

## Single source of truth: the GitHub crons

| Workflow | Cron (UTC) | Data | Output |
|---|---|---|---|
| `update-rates.yml` | `0 1 * * 1-5` | USD/PHP exchange rate (BSP) | **auto-commits** to `main` (no PR) |
| `update-bank-rates.yml` | `0 2 1,15 * *` | savings / digital / time-deposit | opens PR (`auto/update-bank-rates-*`, label `auto-update`) |
| `update-government-data.yml` | `0 3 1 * *` | SSS, PhilHealth, Pag-IBIG, BIR | opens PR (`auto/update-gov-data-*`, label `auto-update`) |
| `content-freshness.yml` | `0 1 * * 1` | staleness audit | opens/updates a GitHub **issue** (never a PR) |

Exchange rates auto-commit (deterministic BSP data). Bank + gov data open PRs because they're YMYL and need a gate.

### Gov data is a change-DETECTOR, not a scraper
The gov updater never writes the actual values — on a detected change it only bumps `*_UPDATED_AT` and describes the change in the PR body for a human. A date-only diff is by design; read the PR body.

### SSS contribution is read via vision
The SSS contribution schedule is published only as circular images (one per member category). Text extraction sees no numbers, so `scripts/data-updater/sources/sss-contribution.mjs` reads each circular image with Claude vision and compares to a verified baseline (`sssContributionConfig.categories` in `lib/config.mjs`). Pag-IBIG + BIR are `BEST_EFFORT_SOURCES` (bot-blocked; non-failing).

## The gate: `review-merge-data-prs` (scheduled Claude agent)

A local scheduled task (`~/.claude/scheduled-tasks/review-merge-data-prs/`) runs at noon local on the 1st–3rd and 15th–17th. It:

- Reviews open `auto-update` PRs (CI status + diff).
- **Bank-rate PRs:** merges if checks pass, no hedge markers, rates sane; else comments and leaves for human.
- **Gov-data PRs (YMYL):** never auto-merges — posts a verify-against-source comment for a human; closes only pure date-only no-ops.
- Never creates data PRs or edits files.

## Alerts

`.github/actions/slack-notify` (no-ops without the `SLACK_WEBHOOK_URL` secret) posts to Slack on PR-opened (bank, gov) and run-failure (all data workflows).

## Do NOT re-add a global "refresh all data" routine

A Claude Code **cloud** routine ("Content freshness report") was previously fetching every `UPDATED_AT` file and opening its own PRs. It **raced the crons** and produced low-quality, date-only / hedged PRs (it lacked the crons' hedge-filter, null-safe gov detection, and vision extraction). It was disabled 2026-06-29.

If data looks stale, fix or trigger the **specific cron** (`gh workflow run "<name>"`) — do not add a blanket routine that re-fetches everything. The crons are the only writers; the review agent is the only auto-merger.
