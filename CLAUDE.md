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
│   ├── rates/             # Rate display components
│   └── ads/               # Ad placeholders
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
├── deploy.yml                 # Build & deploy to DigitalOcean
├── update-rates.yml           # Daily rate update + deploy
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

## Deployment & Automation

See [docs/deployment-and-automation.md](docs/deployment-and-automation.md) for:
- DigitalOcean droplet deployment (nginx + Let's Encrypt SSL)
- GitHub Actions auto-deploy on push to `main` (build → rsync to droplet)
- GitHub Actions cron job for auto-updating exchange rates
- Content freshness system (YMYL page review cadences and automated staleness checks)
- DNS setup (Cloudflare DNS → DigitalOcean IP)

## Email API

See [docs/email-api.md](docs/email-api.md) for the Express + Resend email API running on the DigitalOcean droplet (contact form and calculator result emails).

## Data Architecture

All financial data lives in `/src/data/` as TypeScript files. No database, no API routes.

- **Exchange rates** (`rates/exchange-rates.ts`): Auto-updated daily via cron (open.er-api.com)
- **Bank rates** (`rates/savings-rates.ts`, `digital-bank-rates.ts`, `time-deposit-rates.ts`): Auto-scraped biweekly via data-updater agent (Tavily AI), creates PRs for review
- **Government data** (`government/`): SSS, Pag-IBIG, PhilHealth, BIR — auto-checked monthly via data-updater agent, creates PRs when changes detected
- **Calculator logic** lives in `/src/lib/calculators/` as pure functions (no side effects)

## Brand

- **Primary color:** #093CB5
- **Logo:** `/public/pesohub-logo.svg` (horizontal with text)
- **Symbol:** `/public/pesohub-symbol.svg` (standalone P icon)
- **Dark background:** Used for hero sections and cards

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
TAVILY_API_KEY=... node scripts/data-updater/run-update.mjs --sources sss-contribution,sss-pension,pagibig-housing,pagibig-contribution,philhealth,withholding-tax

# All sources
TAVILY_API_KEY=... node scripts/data-updater/run-update.mjs --sources all
```

### Adding a New Source

1. Add source config to `scripts/data-updater/lib/config.mjs`
2. Create a source script in `scripts/data-updater/sources/`
3. Register the source module in `run-update.mjs` sourceModules map
4. Add the page to `src/data/content-registry.ts`

### Required Secrets (GitHub)

- `TAVILY_API_KEY` — Tavily API for web extraction and AI-powered data parsing (free tier: 1,000 credits/month)

## Important Notes

- Static export mode: No SSR, no API routes, no `getServerSideProps`
- All pages must be deterministic at build time
- Images must use `unoptimized: true` (no Next.js image optimization in static mode)
- Philippine Peso symbol: ₱ (not P or PHP prefix)
- BSP = Bangko Sentral ng Pilipinas (central bank, primary data source)
- Rate source attribution must always reference BSP
