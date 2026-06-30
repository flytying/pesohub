# PesoHub Routes

All pages are statically pre-rendered (`output: 'export'`, `trailingSlash: true`). No SSR,
no API routes. 42 page routes total.

## Calculators (`/calculators/...`) — 12

| Route | Component data |
|-------|----------------|
| `/calculators/loans/personal-loan-calculator-philippines` | personal loan |
| `/calculators/loans/home-loan-calculator-philippines` | home loan |
| `/calculators/loans/car-loan-calculator-philippines` | car loan |
| `/calculators/savings/emergency-fund-calculator-philippines` | emergency fund |
| `/calculators/savings/savings-goal-calculator-philippines` | savings goal |
| `/calculators/savings/time-deposit-calculator-philippines` | time deposit |
| `/calculators/salary/thirteenth-month-pay-calculator-philippines` | 13th month |
| `/calculators/tax/withholding-tax-calculator-philippines` | withholding tax |
| `/calculators/tax/take-home-pay-calculator-philippines` | take-home pay |
| `/calculators/retirement/sss-pension-calculator` | SSS pension |
| `/calculators/sss/sss-loan-calculator-philippines` | SSS loan |
| `/calculators/sss/sss-contribution-calculator-philippines` | SSS contribution |

Hub: `/calculators`. Category accent colors: loans=blue, salary/SSS=green, saving/planning=purple.

## Rates (`/rates/...`) — 4

| Route |
|-------|
| `/rates/exchange-rates/usd-to-php-today` |
| `/rates/savings-rates/best-savings-interest-rates-philippines` |
| `/rates/savings-rates/best-digital-bank-rates-philippines` |
| `/rates/savings-rates/time-deposit-rates-philippines` |

Hubs: `/rates`, `/rates/savings-rates`.

## Government (`/government/...`) — 11 reference pages

| Agency | Route |
|--------|-------|
| BIR | `/government/bir/withholding-tax-table-philippines` |
| PhilHealth | `/government/philhealth/philhealth-contribution-table-philippines` |
| BSP | `/government/bsp/bsp-exchange-rate-guide` |
| SSS | `/government/sss/sss-contribution-guide` |
| SSS | `/government/sss/sss-pension-table` |
| Pag-IBIG | `/government/pag-ibig/pag-ibig-mp2-savings-guide` |
| Pag-IBIG | `/government/pag-ibig/pag-ibig-contribution-table-philippines` |
| Pag-IBIG | `/government/pag-ibig/pag-ibig-housing-loan-guide` |

Hub: `/government`. See CLAUDE.md "Adding a Government Reference Page" checklist.

## Guides (`/guides/...`) — 5

| Route |
|-------|
| `/guides/government/philhealth-contribution-guide` |
| `/guides/government/pag-ibig-deduction-guide` |
| `/guides/tax/how-withholding-tax-works-philippines` |
| `/guides/tax/take-home-pay-guide-philippines` |
| `/guides/sss/how-to-compute-sss-pension` |

Hub: `/guides`.

## Blog (`/blog/...`)

- `/blog` — hub, lists posts from `src/data/blog/index.ts` (`blogPosts` array).
- `/blog/[slug]` — dynamic, statically generated via `generateStaticParams`. Post bodies are
  lazy-loaded through `src/data/blog/post-modules.ts`. A post file is only reachable if registered
  in **both** `index.ts` and `post-modules.ts`. See design: `docs/design-blog.md`.

## Search

- `/search` — client-side results page (`src/app/search/search-results.tsx`).
- Header search box also queries `src/lib/search.ts` (word-match scoring over ~37 indexed pages).

## Static / legal

`/`, `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`, plus `not-found.tsx`.
`/contact` is a server component (exports `metadata`) wrapping a `contact-form.tsx` client child.

## SEO endpoints

`src/app/sitemap.ts` and `src/app/robots.ts` generate `sitemap.xml` / `robots.txt` at build. The
sitemap covers all content routes plus the static/legal pages (`/search` is intentionally excluded).
