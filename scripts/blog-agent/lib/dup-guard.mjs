/**
 * Cannibalization guard for the blog agent.
 *
 * The savings cluster has a deliberate keyword-ownership split. Rates/reference
 * pages own the transactional "best / highest / high-yield" intent; blog posts
 * must take a *different* angle (how-to, analysis, ranked editorial) or they
 * cannibalize the page that already ranks — the exact failure that sank
 * "high yield savings account 2026 philippines" (see the SEO recovery plan).
 *
 * This guard rejects a would-be new post whose keywords duplicate a page's
 * owned intent, so the now-automatic GSC auto-queue can't recreate the conflict.
 *
 * OWNERSHIP MAP (keep in sync with the pages):
 *   /rates/savings-rates/best-digital-bank-rates-philippines  → high-yield / best
 *     digital bank / highest-interest savings intent.
 *   /rates/savings-rates/best-savings-interest-rates-philippines → the reference
 *     "full list" of savings-account interest rates.
 *   /rates/savings-rates/time-deposit-rates-philippines → time-deposit rates.
 * Blogs support these as spokes (analysis vs inflation, ranked lists, how-tos),
 * never re-target the owned phrases.
 */

import { tokenize, tokenCoverageRatio, COVERAGE_TOKEN_RATIO } from "./gsc-opportunities.mjs";

/**
 * Page → the short, DISTINCTIVE intent phrases it owns. A blog keyword covering
 * ≥ COVERAGE_TOKEN_RATIO of a phrase's tokens is treated as a duplicate.
 *
 * Phrases are kept short and specific on purpose: padding them with generic
 * tokens ("savings", "account", "philippines") would flag almost any savings
 * post. "high yield" and "high interest" savings accounts are the same intent —
 * that synonymy is exactly why they cannibalize — so "high yield savings account"
 * also catches the high-interest variants (they share high/savings/account).
 *
 * The reference page (best-savings-interest-rates, the "full list") is
 * intentionally NOT gated: its terms are too generic and would over-block
 * legitimate educational posts. Gate only the proven-competitive intents.
 */
export const PAGE_OWNED_INTENTS = [
  {
    slug: "rates/savings-rates/best-digital-bank-rates-philippines",
    phrases: [
      "high yield savings account",
      "best digital bank",
      "highest interest digital bank",
    ],
  },
  {
    slug: "rates/savings-rates/time-deposit-rates-philippines",
    phrases: ["best time deposit rate"],
  },
];

/**
 * Does any of `keywords` duplicate a page's owned intent? A keyword duplicates
 * an owned phrase when ≥ COVERAGE_TOKEN_RATIO of the phrase's tokens appear in
 * the keyword (year/stopword tokens are ignored by tokenize).
 *
 * @param {string[]} keywords            the candidate post's target keywords
 * @param {Array<{slug,phrases}>} [map]  ownership map (defaults to PAGE_OWNED_INTENTS)
 * @returns {{slug: string, keyword: string, phrase: string} | null}
 */
export function duplicatesOwnedPage(keywords, map = PAGE_OWNED_INTENTS) {
  const owned = map.map((p) => ({
    slug: p.slug,
    phrases: p.phrases.map((ph) => ({ phrase: ph, tokens: tokenize(ph) })),
  }));
  for (const kw of keywords ?? []) {
    const kwTokens = tokenize(kw);
    if (kwTokens.length === 0) continue;
    for (const page of owned) {
      for (const { phrase, tokens } of page.phrases) {
        if (
          tokens.length &&
          tokenCoverageRatio(tokens, kwTokens) >= COVERAGE_TOKEN_RATIO
        ) {
          return { slug: page.slug, keyword: kw, phrase };
        }
      }
    }
  }
  return null;
}
