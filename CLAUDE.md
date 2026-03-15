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
└── update-exchange-rates.mjs  # Cron script to fetch rates
.github/workflows/
└── update-rates.yml           # Daily rate update workflow
```

## Key Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Build static site to out/
npm run lint     # ESLint
```

## Deployment & Automation

See [docs/deployment-and-automation.md](docs/deployment-and-automation.md) for full details on Cloudflare Pages deployment, DNS setup, and the GitHub Actions cron job for auto-updating exchange rates.

## Data Architecture

All financial data lives in `/src/data/` as TypeScript files. No database, no API routes.

- **Exchange rates** (`rates/exchange-rates.ts`): Auto-updated daily via cron
- **Savings rates** (`rates/savings-rates.ts`): Updated manually (rates change infrequently)
- **Government data** (`government/`): SSS contributions, withholding tax tables, Pag-IBIG rates — updated manually when government publishes changes
- **Calculator logic** lives in `/src/lib/calculators/` as pure functions (no side effects)

## Brand

- **Primary color:** #2180FF
- **Logo:** `/public/pesohub-logo.svg` (horizontal with text)
- **Symbol:** `/public/pesohub-symbol.svg` (standalone P icon)
- **Dark background:** Used for hero sections and cards

## Important Notes

- Static export mode: No SSR, no API routes, no `getServerSideProps`
- All pages must be deterministic at build time
- Images must use `unoptimized: true` (no Next.js image optimization in static mode)
- Philippine Peso symbol: ₱ (not P or PHP prefix)
- BSP = Bangko Sentral ng Pilipinas (central bank, primary data source)
- Rate source attribution must always reference BSP
