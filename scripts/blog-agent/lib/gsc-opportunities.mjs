/**
 * Opportunity detection over Search Console rows.
 *
 * Pure, unit-testable classification (no I/O) + one impure `loadCoverage()`
 * helper that reads the repo's existing topics/pages so we never suggest
 * something already covered or queued.
 *
 * Three opportunity types:
 *  - striking-distance: we rank pos 5-15 with real impressions but a weak CTR —
 *    a small push wins clicks. Covered query → "optimize-existing"; uncovered
 *    (ranking via a generic page) → "new-post".
 *  - content-gap: real impressions but no dedicated page targets the query.
 *  - rising: impressions up sharply vs the prior 28-day window.
 *
 * Thresholds are named consts so they're easy to tune from one place.
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Resolve the repo root from this file's location. Guarded because the
// Braintrust eval CLI bundles to CommonJS, where import.meta.url is empty —
// fall back to cwd (evals run from the repo root).
let REPO_ROOT;
try {
  REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
} catch {
  REPO_ROOT = process.cwd();
}

// ── Tunable thresholds ──────────────────────────────────────────────────────
export const STRIKING_MIN_IMPRESSIONS = 200; // per 28d window
export const STRIKING_POSITION_MIN = 5;
export const STRIKING_POSITION_MAX = 15;
export const STRIKING_CTR_FACTOR = 0.6; // flag when actual CTR < 60% of expected
export const GAP_MIN_IMPRESSIONS = 150;
export const GAP_POSITION_MIN = 5; // gaps surface as middling/weak rankings
export const RISING_MIN_IMPRESSIONS = 100;
export const RISING_MIN_DELTA_PCT = 50; // +50% WoW
export const RISING_MIN_POSITION = 4; // pos <4 = already winning, not an opportunity

// Brand / navigational terms to drop — searchers looking for a specific site,
// not a topic. Seed with our own brand + observed copycats; extend as needed.
export const BRAND_TERMS = ["pesohub", "pesopalhub", "pesopal"];
export const COVERAGE_TOKEN_RATIO = 0.6; // query covered if ≥60% tokens match a keyword
export const MAX_OPPORTUNITIES = 30;

// Rough organic CTR-by-position curve (positions 1..15). Used only to decide
// whether a striking-distance row is under-performing its rank.
const CTR_CURVE = [
  0.28, 0.15, 0.1, 0.07, 0.05, 0.04, 0.03, 0.025, 0.02, 0.018, 0.016, 0.014,
  0.012, 0.011, 0.01,
];
export function expectedCtr(position) {
  const i = Math.max(1, Math.min(15, Math.round(position))) - 1;
  return CTR_CURVE[i];
}

const STOPWORDS = new Set([
  "the", "a", "an", "in", "to", "for", "of", "and", "or", "is", "are", "what",
  "how", "do", "does", "you", "your", "my", "i", "vs", "philippines", "ph",
  "philippine", "filipino", "best",
]);

/** Lowercase content tokens, dropping stopwords + bare years. */
export function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t && !STOPWORDS.has(t) && !/^(19|20)\d{2}$/.test(t));
}

// A query is navigational when the searcher wants a specific site, not a topic:
// it names a brand we track, or looks like a domain (contains a TLD, with or
// without a stray space — GSC surfaces "pesopalhub. top" etc.).
const TLD_RE = /\.\s*(top|com|net|org|ph|xyz|io|co|info|site|online|app|live)\b/i;
export function isNavigational(query) {
  const q = (query || "").toLowerCase();
  if (TLD_RE.test(q)) return true;
  const tokens = new Set(q.split(/[^a-z0-9]+/).filter(Boolean));
  return BRAND_TERMS.some((b) => tokens.has(b));
}

/** Fraction of `query` tokens that appear in `targetTokens`. */
function tokenCoverageRatio(queryTokens, targetTokens) {
  if (queryTokens.length === 0) return 0;
  const set = new Set(targetTokens);
  const hit = queryTokens.filter((t) => set.has(t)).length;
  return hit / queryTokens.length;
}

// ── Coverage (impure: reads repo files) ─────────────────────────────────────

/** Pull every `slug: "…"` string literal out of a TypeScript source file. */
function extractSlugs(absPath) {
  let text;
  try {
    text = readFileSync(absPath, "utf8");
  } catch {
    return [];
  }
  const out = [];
  const re = /slug:\s*["'`]([^"'`]+)["'`]/g;
  let m;
  while ((m = re.exec(text))) out.push(m[1]);
  return out;
}

/**
 * Load existing coverage: queued topic keywords/slugs, published blog slugs,
 * and all site page slugs. Returns token-bags so classification can stay pure.
 *
 * @param {string} [root] repo root (defaults to the PesoHub repo root)
 */
export function loadCoverage(root = REPO_ROOT) {
  const queue = JSON.parse(
    readFileSync(join(root, "scripts/blog-agent/topic-queue.json"), "utf8")
  );
  const queueKeywords = [];
  const slugs = [];
  for (const t of queue.topics ?? []) {
    if (t.slug) slugs.push(t.slug);
    for (const k of t.keywords ?? []) queueKeywords.push(k);
  }
  const blogSlugs = extractSlugs(join(root, "src/data/blog/index.ts"));
  const pageSlugs = extractSlugs(join(root, "src/lib/internal-links.ts"));

  // Token bags for fuzzy matching.
  const keywordTokenSets = queueKeywords.map((k) => tokenize(k));
  const slugTokenSet = new Set(
    [...slugs, ...blogSlugs, ...pageSlugs].flatMap((s) => tokenize(s))
  );

  return {
    queueKeywords,
    keywordTokenSets,
    slugTokenSet,
    allSlugs: [...new Set([...slugs, ...blogSlugs, ...pageSlugs])],
  };
}

/**
 * Is this query already covered by an existing queued keyword or page?
 * Covered = its tokens substantially match a keyword, OR all its distinctive
 * tokens already live in some existing slug.
 */
export function isCovered(query, coverage) {
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return true; // nothing to target
  for (const kw of coverage.keywordTokenSets) {
    if (tokenCoverageRatio(qTokens, kw) >= COVERAGE_TOKEN_RATIO) return true;
  }
  // Every meaningful token already present across known slugs.
  if (qTokens.every((t) => coverage.slugTokenSet.has(t))) return true;
  return false;
}

// ── Aggregation + classification (pure) ─────────────────────────────────────

/**
 * Collapse query+page rows into one entry per query: summed impressions/clicks,
 * impression-weighted average position, and the top landing page.
 */
export function aggregateByQuery(rows) {
  const byQuery = new Map();
  for (const r of rows) {
    let agg = byQuery.get(r.query);
    if (!agg) {
      agg = {
        query: r.query,
        impressions: 0,
        clicks: 0,
        posWeighted: 0,
        pages: new Map(),
      };
      byQuery.set(r.query, agg);
    }
    agg.impressions += r.impressions;
    agg.clicks += r.clicks;
    agg.posWeighted += r.position * r.impressions;
    agg.pages.set(r.page, (agg.pages.get(r.page) || 0) + r.impressions);
  }
  return [...byQuery.values()].map((a) => {
    const position = a.impressions ? a.posWeighted / a.impressions : 0;
    const ctr = a.impressions ? a.clicks / a.impressions : 0;
    let topPage = null;
    let topImpr = -1;
    for (const [page, impr] of a.pages) {
      if (impr > topImpr) {
        topImpr = impr;
        topPage = page;
      }
    }
    return {
      query: a.query,
      impressions: a.impressions,
      clicks: a.clicks,
      ctr,
      position,
      topPage,
      pageCount: a.pages.size,
    };
  });
}

/** Path portion of a landing page URL, for "does the page target this query?". */
function pagePath(url) {
  try {
    return new URL(url).pathname;
  } catch {
    return url || "/";
  }
}

/** A generic ranking page = the homepage, or a page whose path shares no
 *  distinctive token with the query (i.e. it ranks only incidentally). */
function isGenericPage(query, topPage) {
  const path = pagePath(topPage);
  if (path === "/" || path === "") return true;
  const qTokens = new Set(tokenize(query));
  const pTokens = tokenize(path);
  return !pTokens.some((t) => qTokens.has(t));
}

/**
 * Classify aggregated queries into ranked opportunities.
 *
 * @param {Array} current  aggregated current-window queries (from aggregateByQuery)
 * @param {Array} prior    aggregated prior-window queries
 * @param {object} coverage from loadCoverage()
 * @returns {Array} ranked opportunities (highest score first), capped
 */
export function classifyOpportunities(current, prior, coverage) {
  const priorByQuery = new Map(prior.map((q) => [q.query, q]));
  const opps = [];

  for (const q of current) {
    if (isNavigational(q.query)) continue; // brand/domain lookups aren't topics
    const covered = isCovered(q.query, coverage);
    const priorImpr = priorByQuery.get(q.query)?.impressions ?? 0;
    const deltaPct =
      priorImpr > 0
        ? ((q.impressions - priorImpr) / priorImpr) * 100
        : q.impressions >= RISING_MIN_IMPRESSIONS
          ? Infinity // brand-new query with real volume
          : 0;

    const base = {
      query: q.query,
      impressions: q.impressions,
      clicks: q.clicks,
      ctr: Number(q.ctr.toFixed(4)),
      position: Number(q.position.toFixed(1)),
      topPage: q.topPage,
      topPagePath: pagePath(q.topPage),
      pageCount: q.pageCount,
      priorImpressions: priorImpr,
      deltaPct: deltaPct === Infinity ? null : Number(deltaPct.toFixed(0)),
      covered,
    };

    const generic = isGenericPage(q.query, q.topPage);

    // Content gap (checked first) — real volume but NO dedicated page targets
    // the query (it ranks only via a generic/incidental page), not covered.
    if (
      !covered &&
      generic &&
      q.impressions >= GAP_MIN_IMPRESSIONS &&
      q.position >= GAP_POSITION_MIN
    ) {
      opps.push({
        ...base,
        opportunity: "content-gap",
        suggestionType: "new-post",
        reason: `${q.impressions} impressions at pos ${base.position} but the ranking page (${base.topPagePath}) isn't dedicated to this query — no page targets it.`,
        score: q.impressions * 0.9,
      });
      continue;
    }

    // Striking distance — pos 5-15, real volume, under-performing CTR, ranking
    // via a RELEVANT page (else it's a content gap, handled above). Covered →
    // nudge the page we have; uncovered-but-relevant → dedicated post.
    if (
      !generic &&
      q.position >= STRIKING_POSITION_MIN &&
      q.position <= STRIKING_POSITION_MAX &&
      q.impressions >= STRIKING_MIN_IMPRESSIONS &&
      q.ctr < expectedCtr(q.position) * STRIKING_CTR_FACTOR
    ) {
      const posOpportunity = (STRIKING_POSITION_MAX + 1 - q.position) / STRIKING_POSITION_MAX;
      opps.push({
        ...base,
        opportunity: "striking-distance",
        suggestionType: covered ? "optimize-existing" : "new-post",
        reason: `Ranks pos ${base.position} with ${q.impressions} impressions but CTR ${(q.ctr * 100).toFixed(1)}% is below the ~${(expectedCtr(q.position) * 100).toFixed(1)}% expected for that rank.`,
        score: q.impressions * posOpportunity,
      });
      continue;
    }

    // Rising — impressions up sharply WoW, not already covered.
    if (
      !covered &&
      q.position >= RISING_MIN_POSITION &&
      q.impressions >= RISING_MIN_IMPRESSIONS &&
      (deltaPct === Infinity || deltaPct >= RISING_MIN_DELTA_PCT)
    ) {
      opps.push({
        ...base,
        opportunity: "rising",
        suggestionType: "new-post",
        reason:
          deltaPct === Infinity
            ? `New query with ${q.impressions} impressions this window (no prior-window data).`
            : `Impressions up ${base.deltaPct}% vs the prior 28 days (${priorImpr} → ${q.impressions}).`,
        score: q.impressions * (deltaPct === Infinity ? 1.1 : 1 + Math.min(deltaPct, 300) / 300),
      });
    }
  }

  opps.sort((a, b) => b.score - a.score);
  return opps.slice(0, MAX_OPPORTUNITIES).map((o) => ({
    ...o,
    score: Number(o.score.toFixed(0)),
  }));
}
