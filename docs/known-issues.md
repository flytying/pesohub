# Known Issues

Findings from the 2026-06-30 code review. Most were fixed in the follow-up pass (branch
`fix/code-review-followups`); resolved items are marked **✓ RESOLVED**. Remaining items are the
backlog. Each is verified and evidence-based.

## ✓ RESOLVED — Take-home pay taxed gross instead of taxable income (#191)

`calculateTakeHomePay` computed withholding tax on gross salary; BIR taxes income net of mandatory
SSS/PhilHealth/Pag-IBIG. It now deducts contributions first and taxes the reduced base (matching
`calculateWithholdingTaxDetailed` and the page's own copy). E.g. ₱35k gross: take-home 86% → 87%.

## ✓ RESOLVED — Calculator test coverage (#190, #191)

Vitest added (`npm test`). Every calculator's pure function has a co-located `*.test.ts`
(75 tests / 12 files) covering happy path, boundaries, invalid input, and golden-value correctness;
`official-rates.test.ts` guards the encoded PH rates against drift. The savings-goal and emergency-fund
calculators had inline component logic — extracted to `src/lib/calculators/{savings-goal,emergency-fund}.ts`
so they're unit-testable.

## ✓ RESOLVED — a11y / SEO follow-ups (#190)

Table `scope="col"` + sr-only captions, search `aria-live`, decorative-icon `aria-hidden`; contact page
split into a server component (now exports metadata: title/description/canonical) + `contact-form.tsx`
client child; sitemap now includes the Pag-IBIG MP2 page + static/legal pages; `ALL_PAGES` completed.

## ✓ RESOLVED — Duplicate "<space>N" sync artifacts (macOS Finder/iCloud)

All ` 2`/` 3` sync-duplicate files (tracked + untracked) were deleted, and the GSC ones renamed to
their base names. A `.gitignore` rule (`* [0-9].*`, `* [0-9]/`) now blocks them from recurring — do
not commit any path with that suffix.

## ✓ RESOLVED — GSC system committed

The GSC Content Opportunity Finder was previously present only as untracked ` 2` files. It has been
renamed to base names, syntax-checked, and committed (orchestrator, `lib/gsc-*.mjs`, `evals/`, and
`.github/workflows/gsc-opportunities.yml`). End-to-end run still needs `GSC_SERVICE_ACCOUNT_JSON` +
`ANTHROPIC_API_KEY`. See `docs/content-automation.md` §3.

## ✓ RESOLVED — Dead code

Deleted `src/lib/calculators/sss-contribution.ts` (zero imports) and the unused
`calculateSSPension`/`SSSInput`/`SSSResult` + private helpers from `sss.ts` (live pension path is
`computeSSSPension` in `sss-pension-formula.ts`). Deleted unused components: `chip`, `category-card`,
`related-pages`, `stat-counter`, `update-badge`, `icon-tile`. **Kept** the shadcn primitives
(`ui/{badge,select,separator,skeleton,tabs}.tsx`) — cheap scaffolding.

## ✓ RESOLVED — Orphan blog post

Deleted `src/data/blog/best-digital-banks-philippines-2026.ts` (was in neither `index.ts` nor
`post-modules.ts`). The live post `best-digital-banks-philippines.ts` is unaffected.

## ✓ RESOLVED — Calculator input validation

`calculateLoan`, `calculateTimeDeposit`, `calculateForTerm`, and `calculateThirteenthMonthPay` now
return `Result | CalcError` and reject negative/zero/NaN inputs. Consumers narrow the union and show
`CalcErrorState`. UI fields clamp to safe minimums, so this is a defensive guard.

## ✓ RESOLVED — Duplicate `round()` helper

Extracted to `src/lib/calculators/math-utils.ts` (also exports `CalcError`); the 7 calculator files
import it instead of redefining.

## ✓ RESOLVED — Accessibility (search dropdown)

`header.tsx` search now has combobox/listbox roles, `aria-expanded`/`aria-controls`/`aria-autocomplete`,
`aria-live="polite"`, and `role="option"` on results. (Blog raw `<img>` for dynamic Unsplash/Pexels
URLs is acceptable under static export — no change.)

## ✓ RESOLVED — Email API Worker parity (minus rate-limit)

`workers/email-api/src/index.ts` now has honeypot (`website`/`phone`), a 16KB body cap, field-length +
email-regex validation, and security headers, and drops the legacy `pesohub.pages.dev` CORS origin.
Still undeployed. **Remaining:** per-IP rate limiting is not implemented — Workers needs Durable
Objects or a Cloudflare zone-level rule; configure that before any deploy (see `docs/email-api.md`).

## ✓ RESOLVED — README + Lint

README replaced with a project-specific stub. `eslint.config.mjs` now ignores `.claude/`,
`.design-handoff/`, `**/node_modules/**`; `npx eslint src` is clean of errors (the search-results
setState error is fixed). Pre-existing unused-import warnings remain (e.g. `Info` in
`withholding-tax-calculator.tsx`, `Button` in `amortization-table.tsx`) — cosmetic, not addressed.

---

## Remaining backlog

### SSS calculator member-type enum fragmentation

Two live member-type enums serve different UIs and are not unified:
- `sss.ts` `SSSMemberType` → `"employer-employee" | "kasambahay" | "self-employed" | "voluntary" | "ofw"`
  (reference table, `sss-contribution-tabs.tsx`)
- `sss-contribution-wisp.ts` `SSSMember` → `"employed" | "self" | "voluntary" | "ofw"` (the calculator)

Not harmful (no shared call site), but confusing. Left as-is — unifying is cosmetic and risks the
live contribution UI. The live pension minimums (₱1,200/₱2,400 + ₱1,000 in `sss-pension-formula.ts`)
match RA 11199; the conflicting ₱4,000/₱2,000 lived only in the now-deleted dead code.

### Stale data timestamps (content cadence, not a bug)

As of 2026-06-30, `UPDATED_AT` ≥ 60 days in `src/data/government/sss-contribution.ts` and
`philhealth.ts` (both exactly 60d) and `pag-ibig-mp2.ts` (89d). `sss-pension-table.ts`,
`withholding-tax-table.ts`, and `pag-ibig-contribution.ts` are fresh. The freshness workflow +
`content-registry.ts` exist to catch this; verify the encoded values are still correct. All encoded
rates carry a source citation (BIR RR 11-2018, SSS Jan-2025 circulars, PhilHealth Circ 2019-0009,
HDMF Circ 460, RA 11199) and are guarded by `official-rates.test.ts`.

### Blog-agent: non-post content actions are human-apply

The keyword-opportunity agent can recommend `update_existing_page` / `merge_with_existing_page`. The
writer does NOT auto-edit live pages (static TS site, too risky) — it emits a Markdown action package
to `scripts/blog-agent/output/<slug>-<action>.md`, surfaced in the PR body for a human to apply. Only
`publish_as_new_post` / `create_supporting_page_with_internal_links` generate a TS post file.

The weekly GSC run caps LLM analysis to the top `MAX_ANALYZE` (12) opportunities; the rest are dropped
and logged (see `gsc-opportunities.mjs`). Bump the cap if weekly volume grows.
