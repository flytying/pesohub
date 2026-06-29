# Known Issues

Findings from the 2026-06-30 code review. **All are unaddressed** — this was a documentation-only
pass (no code deleted or refactored). Each item is verified and evidence-based. Treat this as the
backlog for a future code-cleanup pass.

## Duplicate "<space>N" sync artifacts (macOS Finder/iCloud)

Files copied with a ` 2` / ` 3` suffix by file sync. All verified **zero-reference**. Junk.

**Committed (tracked) — should be `git rm`'d:**
- `src/components/layout/app-shell 2.tsx`, `sidebar 2.tsx`
- `src/components/shared/chip 2.tsx`, `icon-tile 2.tsx`
- `scripts/data-updater/lib 2/` (whole dir), `scripts/data-updater/sources 2/` (whole dir)
- `scripts/blog-agent/lib/braintrust 2.mjs`, `unsplash-image 2.mjs`, `run 2.mjs`, `writer 2.mjs`
- `public/pesohub-logo-white 2.png`, `pesohub-mark 2.png`
- `server/package-lock 2.json`, `package-lock 3.json`

**Untracked (working tree only) — `rm`:**
- 19 files incl. `.github/workflows/gsc-opportunities 2.yml`, all `scripts/blog-agent/**/gsc-* 2.*`,
  `public/logo-symbol 2.*`, `public/pesohub-logo-white 3.png`, `public/pesohub-mark 3.png`,
  `server/package-lock 4.json`, `package-lock 5.json`, `scripts/blog-agent/lib/braintrust 3.mjs`,
  `run 3.mjs`, `writer 3.mjs`. See `git status`.

**Suggested fix:** delete all of the above; add a `.gitignore` rule like `* [0-9].*` and
`* [0-9]/` to stop them recurring.

## GSC system never committed

The entire GSC Content Opportunity Finder exists **only as untracked ` 2` files** — no base file is
tracked, the workflow is not committed, so it does not run in CI. The old CLAUDE.md documented it as
a live feature; that was inaccurate. **Fix:** rename the ` 2` files to their base names, review, and
commit — or delete if abandoned. See `docs/content-automation.md` §3.

## Dead code (zero importers, confirmed)

- `src/lib/calculators/sss.ts` → `calculateSSPension()` unused. Live calculator uses
  `computeSSSPension()` from `sss-pension-formula.ts`.
- `src/lib/calculators/sss-contribution.ts` → `calculateSSSContribution()` unused (whole file
  effectively dead). Live calculator uses `computeSSSContribution()` from `sss-contribution-wisp.ts`.
- Unused components: `src/components/shared/chip.tsx`, `category-card.tsx`, `related-pages.tsx`,
  `stat-counter.tsx`, `update-badge.tsx`, `icon-tile.tsx` (only imported by dead `category-card`).
- Unused shadcn primitives: `src/components/ui/{badge,select,separator,skeleton,tabs}.tsx`.

**Suggested fix:** delete after confirming no near-term use. shadcn primitives are cheap to keep.

## Orphan blog post

`src/data/blog/best-digital-banks-philippines-2026.ts` is fully populated but registered in
**neither** `src/data/blog/index.ts` nor `post-modules.ts` → unreachable (no listing, no URL).
The live post is `best-digital-banks-philippines.ts`. **Fix:** delete the orphan or register it.

## SSS calculator logic divergence

Three overlapping SSS modules with **fragmented `SSSMemberType` enums**:
- `sss.ts` → `"employer-employee" | "kasambahay" | "self-employed" | "voluntary" | "ofw"`
- `sss-contribution.ts` → `"employee" | "self_employed" | "voluntary" | "non_working_spouse" | "ofw"`
- `sss-contribution-wisp.ts` → `"employed" | "self" | "voluntary" | "ofw"` (the live one)

Pension minimums also differ: `sss.ts` uses ₱4,000/₱2,000; `sss-pension-formula.ts` (live) uses
₱2,400/₱1,200. Confirm which is current SSS policy and consolidate to one source of truth.

## Calculator input validation gaps

`src/lib/calculators/{time-deposit,loan,thirteenth-month}.ts` do not reject negative/zero inputs →
can produce mathematically invalid output. The Express email API validates its inputs well; the
calculators rely on UI constraints only. **Fix:** add guards returning a typed error or clamped zero.

## Duplicate `round()` helper

Identical private `round(v) = Math.round(v*100)/100` defined in 8 calculator files. **Fix:** extract
to a shared `src/lib/calculators/math-utils.ts`.

## Accessibility

- Header search dropdown (`src/components/layout/header.tsx` ~L79) lacks `aria-live="polite"` — screen
  readers aren't told results appeared. **Fix:** add the live region.
- Blog uses raw `<img>` for dynamic Unsplash/Pexels URLs (`src/app/blog/**`). Alt text present,
  `eslint-disable`d. **Acceptable** under static export (`unoptimized: true`); no action needed.

## Email API — second implementation lacks parity

`workers/email-api/src/index.ts` (Cloudflare Worker, **undeployed**; live API is the Express
`server/index.mjs` on Render) is missing the honeypot check and the 16KB body cap that the Express
version has, and still lists the legacy `pesohub.pages.dev` CORS origin. Kept as a future/alt option
per decision. **Fix before any deploy:** bring it to validation parity with `server/index.mjs`.

## README is boilerplate

`README.md` is unmodified create-next-app output (references `npm start` — N/A for static export —
and the Geist font, which the site doesn't use). Replaced in this pass with a project-specific stub
pointing to `CLAUDE.md`.

## Lint

- **Config doesn't ignore vendored copies.** `npm run lint` reports ~53k problems because ESLint
  scans `.claude/worktrees/` and `.design-handoff/` (full repo copies incl. `node_modules`). `src/`
  alone has only **1 error + 15 warnings**. **Fix:** add `.claude/`, `.design-handoff/`,
  `**/node_modules/`, `workers/*/node_modules/` to the `ignores` in `eslint.config.mjs`.
- **Pre-existing src error:** `src/app/search/search-results.tsx:39` — setState called
  synchronously in an effect (`react-hooks/set-state-in-effect`). `npm run build` still succeeds.
- Pre-existing unused-import warnings: `Info` in `withholding-tax-calculator.tsx`, `Button` in
  `amortization-table.tsx`, etc.

## Stale data timestamps (content cadence, not a bug)

As of 2026-06-30, `UPDATED_AT` > 60 days in `src/data/government/{sss-contribution,philhealth,
sss-pension-table}.ts` and `pag-ibig-mp2.ts`. The freshness workflow + `content-registry.ts` exist to
catch this; verify the values are still correct.
