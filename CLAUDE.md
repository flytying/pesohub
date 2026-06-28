# PesoHub

Philippine personal finance tools and information site.

## Tech Stack

- **Framework:** Next.js 16.1.6 with static export (`output: 'export'`)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui + Radix (via @base-ui/react)
- **Charts:** Recharts 3
- **Icons:** Lucide React
- **Node:** 20+

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── calculators/       # Loan, tax, SSS pension calculators
│   ├── rates/             # Exchange rates, savings rates
│   ├── guides/            # Financial guides
│   ├── government/        # BSP, SSS, Pag-IBIG, BIR tables
│   └── (about|contact|privacy|terms|disclaimer)/
├── components/
│   ├── calculators/       # Calculator UI components
│   ├── layout/            # Header, Footer, Breadcrumbs
│   ├── shared/            # FAQs, Disclaimers, Cards
│   ├── ui/                # shadcn/ui primitives
│   ├── seo/               # JSON-LD schema components
│   └── rates/             # Rate display components
├── data/                  # All content data (TypeScript, no DB)
│   ├── rates/             # exchange-rates.ts, savings-rates.ts
│   ├── government/        # SSS, tax, Pag-IBIG, BSP data
│   ├── calculators/       # Calculator metadata
│   └── navigation.ts      # Site navigation config
├── lib/
│   ├── calculators/       # Pure TS calc logic (loan, tax, sss)
│   ├── formatters.ts      # Number/date formatting (₱, commas)
│   ├── seo.ts             # Metadata generation
│   └── schema-markup.ts   # JSON-LD schema generation
├── hooks/                 # useDebounce, useCalculator
├── types/                 # TypeScript type definitions
└── config/                # Site configuration
scripts/
├── update-exchange-rates.mjs  # Cron script to fetch rates
├── check-content-freshness.mjs # Content staleness checker
└── data-updater/              # Automated data update agent
    ├── run-update.mjs         # Orchestrator CLI
    ├── lib/                   # Shared: fetcher, AI extractor, validator, etc.
    └── sources/               # Per-source scripts (bank rates, gov data)
.github/workflows/
├── update-rates.yml           # Daily exchange rate update
├── update-bank-rates.yml      # Biweekly bank rate scraping (Tavily AI)
├── update-government-data.yml # Monthly gov data check (Tavily AI)
└── content-freshness.yml      # Weekly YMYL content check
```

## Key Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Build static site to out/
npm run lint     # ESLint
```

## Hosting & Deployment

- **Site:** [Vercel](https://vercel.com) (free tier) — auto-deploys on push to `main`
- **Email API:** [Render](https://render.com) (free tier) — Express server at `pesohub-email-api.onrender.com`
- **DNS:** Vercel DNS (nameservers: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
- **Email provider:** [Resend](https://resend.com) (free tier) — sends from `noreply@pesohub.ph`
- **Email hosting:** dotPH free email (`hello@pesohub.ph`, webmail at `webmail.pesohub.ph`)
- **Domain registrar:** dotPH (`pesohub.ph`)
- **Repo:** github.com/flytying/pesohub (private)

### DNS Records (Vercel DNS)

| Type | Name | Value |
|------|------|-------|
| A | `mail` | `192.250.235.76` |
| A | `webmail` | `192.250.235.76` |
| MX | `@` | `mail.pesohub.ph` (priority 10) |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` |
| MX | `send` | `feedback-smtp.ap-northeast-1.amazonses.com` (priority 10) |
| TXT | `resend._domainkey` | DKIM key |
| ALIAS | `*` | `cname.vercel-dns.com` (auto) |
| ALIAS | `@` | Vercel deployment (auto) |

### Vercel Config

- **Framework:** `null` (static site — serves `out/` directory)
- **Build command:** `npm run build`
- **Output directory:** `out`
- See `vercel.json` for headers and config

## Email API

- **Host:** Render (free tier, Singapore region)
- **URL:** `https://pesohub-email-api.onrender.com`
- **Source:** `server/index.mjs`
- **Endpoints:** `POST /contact`, `POST /calculator`, `GET /health`
- **CORS:** Allows `pesohub.ph`, `www.pesohub.ph`, `*.vercel.app`, `localhost:3000`
- **Environment vars (Render dashboard):** `RESEND_API_KEY`, `FROM_EMAIL`, `TO_EMAIL`, `ALLOWED_ORIGIN`
- See `render.yaml` for deployment blueprint

### Abuse Hardening

The API is the site's only dynamic surface (static frontend has none). Protections in `server/index.mjs`:

- **Rate limit:** 5 req/min per IP on `/contact` + `/calculator` (`express-rate-limit`); `/health` unthrottled. `trust proxy` is set so the limiter sees the real client IP behind Render's proxy.
- **Body cap:** `express.json({ limit: "16kb" })` → 413 on larger payloads.
- **Helmet:** default security headers on API responses.
- **Input validation:** type + length caps (name ≤120, email ≤200, subject ≤60, message ≤5000, calculatorType ≤120, results ≤20000) and email-shape regex → 400 on violation.
- **Honeypot:** hidden field per form (`website` on contact, `phone` on calculator). If filled, API returns 200 without sending — silently drops bots. Frontend hidden inputs live in `src/app/contact/page.tsx` and `src/components/calculators/result-actions.tsx`; the field name must match the server check.

## Data Architecture

All financial data lives in `/src/data/` as TypeScript files. No database, no API routes.

- **Exchange rates** (`rates/exchange-rates.ts`): Auto-updated daily via cron (BSP RERB API + BSP Exchange Rate API)
- **Bank rates** (`rates/savings-rates.ts`, `digital-bank-rates.ts`, `time-deposit-rates.ts`): Auto-scraped biweekly via data-updater agent (Tavily AI), creates PRs for review
- **Government data** (`government/`): SSS, Pag-IBIG (contributions, housing loan, MP2), PhilHealth, BIR — auto-checked monthly via data-updater agent, creates PRs when changes detected
- **Calculator logic** lives in `/src/lib/calculators/` as pure functions (no side effects)

## Brand

- **Primary color:** #093CB5
- **Accent Cyan:** #00D2D8
- **Accent Orange:** #E57300
- **Font:** Public Sans (400, 500, 600)
- **Logo:** `/public/pesohub-logo.png` (horizontal with text, dark bg variant: `logo-pesohub-dark.png`)
- **Favicon:** `/src/app/favicon.ico` + `/src/app/icon.png` (P symbol)
- **Surfaces:** Primary #FFFFFF, Secondary #EDEEFF, Tertiary #F5F6FF, Quaternary #FCFDFF
- **Design docs:** See `docs/design-system.md` for full design token reference

## Automated Data Updater

The data-updater agent (`scripts/data-updater/`) automatically scrapes financial data and creates PRs for review.

### How It Works

1. **Tavily Extract** fetches page content from bank/government websites
2. **Tavily AI Search** extracts structured data from the page text
3. **Validator** checks for anomalies (large rate changes, empty data)
4. **File Writer** updates the TypeScript data files (preserving FAQs, types)
5. A **Pull Request** is created for human review (never auto-merges)

### Manual Run

```bash
# Bank rates
TAVILY_API_KEY=... node scripts/data-updater/run-update.mjs --sources savings-rates,digital-rates,time-deposit-rates

# Government data
TAVILY_API_KEY=... node scripts/data-updater/run-update.mjs --sources sss-contribution,sss-pension,pagibig-housing,pagibig-contribution,pagibig-mp2,philhealth,withholding-tax

# All sources
TAVILY_API_KEY=... node scripts/data-updater/run-update.mjs --sources all
```

### Adding a New Source

1. Add source config to `scripts/data-updater/lib/config.mjs`
2. Create a source script in `scripts/data-updater/sources/`
3. Register the source module in `run-update.mjs` sourceModules map
4. Add the source to the appropriate GitHub workflow (`.github/workflows/`)
5. Add the page to `src/data/content-registry.ts`

### Required Secrets (GitHub)

- `TAVILY_API_KEY` — Tavily API for web extraction and AI-powered data parsing (free tier: 1,000 credits/month)

## GSC Content Opportunity Finder

Weekly job that turns Google Search Console data into reviewed blog-topic suggestions. Automates the manual "read GSC → edit `topic-queue.json`" loop. It never auto-publishes — it opens a GitHub issue you review.

### How It Works

1. **Workflow:** `.github/workflows/gsc-opportunities.yml` — weekly Mon 01:30 UTC (before the 03:00 blog-post cron) + `workflow_dispatch` (with a `dry_run` input).
2. **Orchestrator:** `scripts/blog-agent/gsc-opportunities.mjs` — pull → detect → suggest → log → write issue markdown.
   - `lib/gsc-client.mjs` — Search Analytics API via service-account JWT (`google-auth-library`); pulls current + prior 28-day windows.
   - `lib/gsc-opportunities.mjs` — pure detection: **striking-distance** (pos 5-15, low CTR), **content-gap** (impressions, no dedicated page), **rising** (WoW up). Dedups against `topic-queue.json`, `src/data/blog/index.ts`, `src/lib/internal-links.ts`. Thresholds are named consts at the top.
   - `lib/gsc-suggester.mjs` — Claude (tool_use forced-JSON) drafts `topic-queue.json`-shaped suggestions + an LLM-judge score (0..1).
   - `lib/gsc-reporter.mjs` — ranked issue markdown with paste-ready queue snippets.
3. **Review:** tick a box in the issue, paste its snippet into `scripts/blog-agent/topic-queue.json` (`status: "pending"`). The existing blog agent writes it next run.
4. **Evals (Braintrust):** each suggestion is upserted to the `gsc-opportunities` dataset (project `pesohub-blog-agent`) with the judge score; the run logs a `gsc-opportunities` trace. A durable ledger (`scripts/blog-agent/gsc-suggestions-log.json`) records what was suggested; `--feedback` reads which slugs landed in the queue and logs accept/reject as Braintrust ground truth.

### Manual Run

```bash
# Full run (writes /tmp/gsc-issue.md; no gh — the workflow opens the issue)
GSC_SERVICE_ACCOUNT_JSON="$(cat sa-key.json)" GSC_SITE_URL="sc-domain:pesohub.ph" \
  ANTHROPIC_API_KEY=... BRAINTRUST_API_KEY=... \
  node scripts/blog-agent/gsc-opportunities.mjs --dry-run

# Credless local test against sample rows
node scripts/blog-agent/gsc-opportunities.mjs --fixture sample-rows.json   # still needs ANTHROPIC_API_KEY

# Log accept/reject ground truth after curating the queue
BRAINTRUST_API_KEY=... node scripts/blog-agent/gsc-opportunities.mjs --feedback
```

### Running Evals (Braintrust)

Two layers:

- **Online (automatic):** every orchestrator run with `BRAINTRUST_API_KEY` set logs a `gsc-opportunities` trace + per-suggestion judge scores + dataset rows. View in the Braintrust UI (project `pesohub-blog-agent`). No command needed.
- **Offline experiment (reproducible):** scored run over the `gsc-opportunities` dataset — use it to compare prompt / threshold / model changes.

```bash
# Populate the dataset first (one orchestrator run with the key), then:
BRAINTRUST_API_KEY=... ANTHROPIC_API_KEY=... \
  npx braintrust eval scripts/blog-agent/evals/gsc-opportunities.eval.mjs
```

Scorers: `topic_quality` (LLM judge 0..1) and `human_accepted` (1/0, only after a `--feedback` pass has set the ground truth). The experiment + scores appear under the project in Braintrust.

### One-Time Setup

1. Google Cloud: new project → enable **Search Console API** → create a service account → download its JSON key.
2. Search Console property → Settings → Users and permissions → add the service account email as a **Restricted** user.
3. GitHub secrets: `GSC_SERVICE_ACCOUNT_JSON` (paste the key JSON), `GSC_SITE_URL` (`sc-domain:pesohub.ph`). `ANTHROPIC_API_KEY` / `BRAINTRUST_API_KEY` already exist.

### Required Secrets (GitHub)

- `GSC_SERVICE_ACCOUNT_JSON` — Google service-account key JSON (raw or base64). Read-only `webmasters.readonly` scope.
- `GSC_SITE_URL` — the GSC property, e.g. `sc-domain:pesohub.ph`.

## Adding a New Government Reference Page

Follow this checklist when creating a new page under `/government/`:

1. **Data file** (`src/data/government/[name].ts`): Export `UPDATED_AT`, meta object (`title`, `metaTitle`, `metaDescription`, `slug`, `directAnswer`), typed data arrays, and FAQ array
2. **Page component** (`src/app/government/[agency]/[slug]/page.tsx`): Use `PageHero` (variant="dark"), `FaqSection`, `DisclaimerBox`, `SourceCitation`, `JsonLd` (breadcrumb + article schema), `GOVERNMENT_DISCLAIMER`
3. **Navigation** (`src/data/navigation.ts`): Add to Government children
4. **Content registry** (`src/data/content-registry.ts`): Add `ContentEntry` with review cadence and checklist
5. **Government hub** (`src/app/government/page.tsx`): Add to `governmentPages` array
6. **Internal links** (`src/lib/internal-links.ts`): Add to `ALL_PAGES` and `LINK_MAP`, update sibling entries
7. **Sibling pages**: Add as related page link on relevant existing pages
8. **Data updater** (optional): Add source config, source script, and register in workflow

Card rules: On colored backgrounds (`surface-secondary`, `surface-tertiary`) use no border. On white backgrounds use `border border-gray-200`.

## Important Notes

- Static export mode: No SSR, no API routes, no `getServerSideProps`
- All pages must be deterministic at build time
- Images must use `unoptimized: true` (no Next.js image optimization in static mode)
- Philippine Peso symbol: ₱ (not P or PHP prefix)
- BSP = Bangko Sentral ng Pilipinas (central bank, primary data source)
- Rate source attribution must always reference BSP
