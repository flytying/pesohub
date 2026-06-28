/**
 * Unsplash image helper for blog posts.
 *
 * Uses curated Unsplash photo IDs mapped to blog categories
 * to provide relevant, license-free hero images.
 *
 * Unsplash images with ?w=800&q=80 are free to use with attribution
 * via the Unsplash License (no API key needed for hotlinking).
 *
 * Image selection is DETERMINISTIC by slug: the previous implementation
 * tracked used IDs in a module-level Set, but each post is generated in its
 * own process, so the Set always reset and every post in a category got
 * images[0] (e.g. all banking posts shared one photo). Hashing the slug into
 * the category pool spreads images across posts AND is stable across evergreen
 * refreshes (same slug -> same image, no churn). All IDs below are HTTP-verified
 * to resolve (200) on images.unsplash.com.
 */

// Curated Unsplash photo IDs per category. Multiple options per category so
// different posts in the same category get visibly different hero images.
const CATEGORY_IMAGES = {
  savings: [
    { id: "photo-1579621970563-ebec7560ff3e", alt: "Money savings and financial planning" },
    { id: "photo-1554224155-6726b3ff858f", alt: "Piggy bank and savings concept" },
    { id: "photo-1633158829585-23ba8f7c8caf", alt: "Coins stacked in growing piles" },
    { id: "photo-1607863680198-23d4b2565df0", alt: "Pink piggy bank with coins" },
    { id: "photo-1604594849809-dfedbc827105", alt: "Small figure planning on a stack of coins" },
    { id: "photo-1526304640581-d334cdbbf45e", alt: "Spread of paper currency bills" },
  ],
  investing: [
    { id: "photo-1611974789855-9c2a0a7236a3", alt: "Stock market charts and investing" },
    { id: "photo-1590283603385-17ffb3a7f29f", alt: "Investment and financial growth" },
    { id: "photo-1559526324-4b87b5e36e44", alt: "Laptop showing a revenue dashboard" },
    { id: "photo-1604594849809-dfedbc827105", alt: "Small figure planning on a stack of coins" },
  ],
  tax: [
    { id: "photo-1554224154-26032ffc0d07", alt: "Tax documents and calculations" },
    { id: "photo-1450101499163-c8848c66ca85", alt: "Financial documents and tax filing" },
    { id: "photo-1526304640581-d334cdbbf45e", alt: "Spread of paper currency bills" },
  ],
  government: [
    { id: "photo-1589829545856-d10d557cf95f", alt: "Government building and public service" },
    { id: "photo-1541872703-74c5e44368f9", alt: "Official documents and government services" },
  ],
  banking: [
    { id: "photo-1556742049-0cfed4f6a45d", alt: "Bank building and banking services" },
    { id: "photo-1601597111158-2fceff292cdc", alt: "Digital banking and mobile app" },
    { id: "photo-1563013544-824ae1b704d3", alt: "Paying with a card on a laptop" },
    { id: "photo-1638913662252-70efce1e60a7", alt: "Person managing finances on a laptop" },
    { id: "photo-1559526324-4b87b5e36e44", alt: "Laptop showing a banking dashboard" },
  ],
  budgeting: [
    { id: "photo-1554224155-6726b3ff858f", alt: "Budget planning and money management" },
    { id: "photo-1450101499163-c8848c66ca85", alt: "Financial planning and budgeting" },
    { id: "photo-1604594849809-dfedbc827105", alt: "Small figure planning on a stack of coins" },
  ],
  insurance: [
    { id: "photo-1450101499163-c8848c66ca85", alt: "Insurance and financial protection" },
    { id: "photo-1607863680198-23d4b2565df0", alt: "Piggy bank protecting savings" },
  ],
  general: [
    { id: "photo-1579621970563-ebec7560ff3e", alt: "Personal finance and money management" },
    { id: "photo-1554224155-6726b3ff858f", alt: "Financial planning concepts" },
    { id: "photo-1526304640581-d334cdbbf45e", alt: "Spread of paper currency bills" },
  ],
};

/**
 * Stable non-negative string hash (djb2). Same input -> same index, so an
 * evergreen refresh keeps the same image instead of churning.
 */
function hashString(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = (h * 33) ^ str.charCodeAt(i);
  }
  return h >>> 0;
}

/**
 * Get an Unsplash image for a blog post, chosen deterministically from the
 * category pool by hashing a stable key (slug preferred, keyword fallback).
 *
 * @param {string} category - Blog post category
 * @param {string} keyword - Target keyword (fallback hash key)
 * @param {string} [slug] - Post slug (preferred hash key for stability)
 * @returns {{ src: string, alt: string }}
 */
export function getUnsplashImage(category, keyword, slug) {
  const images = CATEGORY_IMAGES[category] || CATEGORY_IMAGES.general;
  const key = slug || keyword || "";
  const picked = images[hashString(key) % images.length];

  return {
    src: `https://images.unsplash.com/${picked.id}?w=800&q=80`,
    alt: picked.alt,
  };
}
