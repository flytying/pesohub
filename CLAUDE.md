# PesoHub

Philippine personal finance tools and information site. Static Next.js site — calculators, rates,
government reference tables, guides, and a blog. All content is TypeScript data; no database.

## Tech Stack

- **Framework:** Next.js 16.1.6, static export (`output: 'export'`, `trailingSlash: true`)
- **Language:** TypeScript 5 · **React:** 19.2.3
- **Styling:** Tailwind CSS 4 · **UI:** shadcn/ui + Radix via `@base-ui/react`
- **Charts:** Recharts 3 · **Icons:** Lucide React · **Node:** 20+

## Project Structure

```
src/
├── app/             # App Router pages (static). calculators, rates, government,
│                    #   guides, blog, blog/[slug], search, + about/contact/legal
│   ├── sitemap.ts   # generates sitemap.xml
│   └── robots.ts    # generates robots.txt
├── components/      # calculators/ layout/ shared/ ui/ seo/ rates/ blog/
├── data/            # All content as TS: rates/ government/ calculators/ blog/ navigation.ts
├── lib/             # calculators/ (pure calc fns), formatters, seo, schema-markup,
│                    #   internal-links, search, utils, constants
├── hooks/           # use-debounce, use-calculator
├── types/ config/   # content types; site config (incl. EMAIL_API_URL)
scripts/             # update-exchange-rates.mjs, check-content-freshness.mjs,
│                    #   data-updater/ (Tavily scrape→PR), blog-agent/ (post generation)
server/              # Express email API (deployed on Render) — index.mjs
workers/email-api/   # Cloudflare Worker email API — UNDEPLOYED alternative (see Email API)
docs/                # Supporting docs (see links below)
```

## Key Commands

```bash
npm run dev          # dev server on :3000
npm run build        # static export to out/
npm run lint         # ESLint
npm test             # vitest — calculator unit/regression tests (src/lib/calculators/*.test.ts)
npm run sync-prompt  # seed the 3 canonical blog-agent prompts to Langfuse
npm run sync-dataset # backfill the blog-posts dataset to Langfuse
npm run eval:keyword # Langfuse experiment: keyword-opportunity agent
npm run eval:content # Langfuse experiment: blog-content evaluator
```

## App Areas & Routes

- **Calculators** (12) — loans, savings, salary, tax, retirement, SSS. Logic in `src/lib/calculators/`.
- **Rates** (4) — USD/PHP, savings, digital bank, time deposit.
- **Government** (11) — BIR, PhilHealth, BSP, SSS, Pag-IBIG reference tables.
- **Guides** (5), **Blog** (`/blog`, `/blog/[slug]`), **Search** (`/search` + header box).
- Full map: **[docs/routes.md](docs/routes.md)**.

## Coding Conventions

- **Static export:** no SSR, no API routes, no `getServerSideProps`. All pages deterministic at build.
- **Images:** `unoptimized: true`; dynamic remote images use raw `<img>` with alt (eslint-disabled).
- **Currency:** Philippine Peso `₱` (never `P` or `PHP` prefix).
- **Calculator logic** lives in `src/lib/calculators/` as **pure functions** (no side effects); UI
  components stay presentational. Reuse existing fns — the live SSS path uses
  `sss-pension-formula.ts` + `sss-contribution-wisp.ts` (other SSS files have dead variants; see
  known-issues before touching). Keep math in the lib, not inline in components, so it stays
  unit-testable: every calculator has a co-located `*.test.ts` (run with `npm test`), and
  `official-rates.test.ts` pins each encoded PH rate to its source value so data drift fails loudly.
  Take-home/withholding tax is computed on income **net of** SSS/PhilHealth/Pag-IBIG (BIR rule), not gross.
- **Card borders:** on colored surfaces (`surface-secondary/tertiary`) use no border; on white use
  `border border-gray-200`.
- **FAQ / Related sections:** bare, no outer card wrapper.
- **Content width:** page wrappers + footer share `max-w-[1240px] px-[clamp(20px,3vw,36px)]`.

## Design

- **Colors:** primary `#093CB5`, cyan `#00D2D8`, orange `#E57300`.
- **Surfaces:** primary `#FFFFFF`, secondary `#EDEEFF`, tertiary `#F5F6FF`, quaternary `#FCFDFF`.
- **Font:** Public Sans (400/500/600). **Logo:** `/public/pesohub-logo.png`
  (dark variant `logo-pesohub-dark.png`). **Favicon:** `src/app/favicon.ico` + `icon.png`.
- Calculator result-hero accent by category: loans=blue, salary/SSS=green, saving/planning=purple.
- Full tokens & component patterns: **[docs/design-system.md](docs/design-system.md)** and the other
  `docs/design-*.md` files.

## Data Architecture

All financial data is TypeScript in `src/data/` (no DB, no API routes).

- **Exchange rates** (`rates/exchange-rates.ts`) — auto-updated weekdays via BSP APIs.
- **Bank rates** (`rates/{savings,digital-bank,time-deposit}-rates.ts`) — biweekly Tavily scrape → PR.
- **Government data** (`government/`) — monthly Tavily check → PR.
- **Blog posts** (`data/blog/`) — a post is reachable only if registered in **both**
  `index.ts` and `post-modules.ts`.
- Government data files export `UPDATED_AT`, a meta object, typed data arrays, and a FAQ array.
- Rate source attribution must always reference **BSP** (Bangko Sentral ng Pilipinas).

## Email API

Two implementations; only the Express one is live.

- **Live:** `server/index.mjs` — Express on Render (`pesohub-email-api.onrender.com`), Resend for
  delivery. Endpoints `POST /contact`, `POST /calculator`, `GET /health`. Hardened: rate limit,
  16KB body cap, Helmet, input validation, honeypot. Frontend wires it via `src/config/site.ts`.
- **Undeployed alt:** `workers/email-api/` (Cloudflare Worker) — kept for a possible future move.
  At parity with Express on validation/honeypot/body-cap/headers, **except per-IP rate limiting**
  (needs Durable Objects or a Cloudflare zone rule — configure before deploying). See known-issues.
- Honeypot field names must match server checks: `website` (contact, `src/app/contact/page.tsx`),
  `phone` (calculator, `src/components/calculators/result-actions.tsx`).
- Details & DNS: **[docs/email-api.md](docs/email-api.md)**.

## Automation

GitHub Actions crons; all produce PRs / issues or auto-merge generated blog posts — none mutate live
figures without a review path.

| Workflow | Schedule (UTC) | Purpose |
|----------|----------------|---------|
| `update-rates.yml` | Mon–Fri 01:00 | Exchange rates (BSP) |
| `update-bank-rates.yml` | 1st + 15th 02:00 | Bank rate scrape → PR |
| `update-government-data.yml` | 1st 03:00 | Gov data check → PR |
| `content-freshness.yml` | Mon 01:00 | Staleness → issue |
| `blog-post.yml` | Mon 03:00 | Generate post → auto-merge |
| `gsc-opportunities.yml` | Mon 01:30 | GSC opportunities → issue |

Data updater, blog agent, and the GSC opportunity finder:
**[docs/content-automation.md](docs/content-automation.md)**.
Hosting, DNS, secrets, troubleshooting: **[docs/deployment-and-automation.md](docs/deployment-and-automation.md)**.

## Adding a Government Reference Page

1. **Data file** (`src/data/government/[name].ts`): `UPDATED_AT`, meta (`title`, `metaTitle`,
   `metaDescription`, `slug`, `directAnswer`), typed data arrays, FAQ array.
2. **Page** (`src/app/government/[agency]/[slug]/page.tsx`): `PageHero` (variant="dark"),
   `FaqSection`, `DisclaimerBox`, `SourceCitation`, `JsonLd` (breadcrumb + article), `GOVERNMENT_DISCLAIMER`.
3. **Navigation** (`src/data/navigation.ts`) → Government children.
4. **Content registry** (`src/data/content-registry.ts`) → `ContentEntry` with review cadence.
5. **Government hub** (`src/app/government/page.tsx`) → `governmentPages` array.
6. **Internal links** (`src/lib/internal-links.ts`) → `ALL_PAGES` + `LINK_MAP`; update siblings.
7. Add as related link on relevant sibling pages.
8. (Optional) data-updater source — see content-automation doc.

## Do Not Change Casually

- `next.config.ts` static-export settings (`output: 'export'`, `trailingSlash`, `unoptimized`).
- Honeypot field names (must match between frontend forms and `server/index.mjs`).
- The live SSS calculator path (`sss-pension-formula.ts`, `sss-contribution-wisp.ts`).
- `src/data/blog/{index,post-modules}.ts` registration coupling.
- `src/lib/{seo,schema-markup,internal-links}.ts` — affect SEO across all pages.

## Known Issues

Remaining tech debt (SSS member-type enum fragmentation, Worker rate-limiting, stale content dates)
is catalogued in **[docs/known-issues.md](docs/known-issues.md)**. A `.gitignore` rule blocks the
recurring ` 2`/` 3` macOS sync-duplicate files — do not commit any path with that suffix.
