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

import { tokenCoverageRatio } from "./gsc-opportunities.mjs";

/**
 * Guard-local tokenizer. The GSC `tokenize()` strips "best" as a stopword —
 * right for query-coverage matching, fatal here: it collapses the owned phrase
 * "best digital bank" to [digital, bank], so ANY keyword mentioning digital
 * banking hits 100% coverage and gets blocked (the 2026-07-08 cron failure).
 * Intent modifiers (best/highest/high) ARE the transactional signal the guard
 * exists to protect, so this tokenizer keeps them and drops only grammatical
 * stopwords, geo qualifiers, and bare years.
 */
const GUARD_STOPWORDS = new Set([
  "the", "a", "an", "in", "to", "for", "of", "and", "or", "is", "are", "what",
  "how", "do", "does", "you", "your", "my", "i", "philippines", "ph",
  "philippine", "filipino",
]);
function guardTokenize(text) {
  return (text || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t && !GUARD_STOPWORDS.has(t) && !/^(19|20)\d{2}$/.test(t));
}

/**
 * Guard-specific coverage threshold — deliberately stricter than the GSC
 * coverage ratio (0.6). At 0.6 the guard flags any keyword sharing 2 tokens of
 * a 3-token phrase, which blocks legitimate adjacent angles ("should i use a
 * digital bank philippines" vs the owned "best digital bank" — the 2026-07-08
 * cron failure). 0.75 still catches synonym swaps of 4-token phrases ("high
 * INTEREST savings account" covers 3/4 of "high yield savings account") while
 * letting 2-of-3 overlaps through.
 */
export const DUP_GUARD_TOKEN_RATIO = 0.75;

/**
 * Comparison keywords ("x vs y", "x versus y") are a distinct search intent —
 * the searcher wants a comparison, not the transactional "best X" list the
 * rates pages own. They are exactly the "different angle" blogs are supposed
 * to take, so they are exempt from the guard.
 */
const COMPARISON_RE = /(^|\s)(vs\.?|versus)(\s|$)/i;

/**
 * Page → the short, DISTINCTIVE intent phrases it owns. A blog keyword covering
 * ≥ DUP_GUARD_TOKEN_RATIO of a phrase's tokens is treated as a duplicate.
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
 * an owned phrase when ≥ DUP_GUARD_TOKEN_RATIO of the phrase's tokens appear
 * in the keyword (year/stopword tokens are ignored by tokenize). Comparison
 * keywords ("vs"/"versus") are a distinct intent and never flagged.
 *
 * @param {string[]} keywords            the candidate post's target keywords
 * @param {Array<{slug,phrases}>} [map]  ownership map (defaults to PAGE_OWNED_INTENTS)
 * @returns {{slug: string, keyword: string, phrase: string} | null}
 */
export function duplicatesOwnedPage(keywords, map = PAGE_OWNED_INTENTS) {
  const owned = map.map((p) => ({
    slug: p.slug,
    phrases: p.phrases.map((ph) => ({ phrase: ph, tokens: guardTokenize(ph) })),
  }));
  for (const kw of keywords ?? []) {
    if (COMPARISON_RE.test(kw)) continue; // comparison intent — different angle
    const kwTokens = guardTokenize(kw);
    if (kwTokens.length === 0) continue;
    for (const page of owned) {
      for (const { phrase, tokens } of page.phrases) {
        if (
          tokens.length &&
          tokenCoverageRatio(tokens, kwTokens) >= DUP_GUARD_TOKEN_RATIO
        ) {
          return { slug: page.slug, keyword: kw, phrase };
        }
      }
    }
  }
  return null;
}
