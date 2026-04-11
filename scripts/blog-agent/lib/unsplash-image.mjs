/**
 * Unsplash image helper for blog posts.
 *
 * Uses curated Unsplash photo IDs mapped to blog categories
 * to provide relevant, license-free hero images.
 *
 * Unsplash images with ?w=800&q=80 are free to use with attribution
 * via the Unsplash License (no API key needed for hotlinking).
 */

// Curated Unsplash photo IDs per category
// Each array has multiple options to avoid repeating images across posts
const CATEGORY_IMAGES = {
  savings: [
    { id: "photo-1579621970563-ebec7560ff3e", alt: "Money savings and financial planning" },
    { id: "photo-1554224155-6726b3ff858f", alt: "Piggy bank and savings concept" },
    { id: "photo-1633158829585-23ba8f7c8caf", alt: "Coins and savings growth" },
  ],
  investing: [
    { id: "photo-1611974789855-9c2a0a7236a3", alt: "Stock market charts and investing" },
    { id: "photo-1590283603385-17ffb3a7f29f", alt: "Investment and financial growth" },
  ],
  tax: [
    { id: "photo-1554224154-26032ffc0d07", alt: "Tax documents and calculations" },
    { id: "photo-1450101499163-c8848c66ca85", alt: "Financial documents and tax filing" },
  ],
  government: [
    { id: "photo-1589829545856-d10d557cf95f", alt: "Government building and public service" },
    { id: "photo-1541872703-74c5e44368f9", alt: "Official documents and government services" },
  ],
  banking: [
    { id: "photo-1556742049-0cfed4f6a45d", alt: "Bank building and banking services" },
    { id: "photo-1601597111158-2fceff292cdc", alt: "Digital banking and mobile app" },
  ],
  budgeting: [
    { id: "photo-1554224155-6726b3ff858f", alt: "Budget planning and money management" },
    { id: "photo-1450101499163-c8848c66ca85", alt: "Financial planning and budgeting" },
  ],
  insurance: [
    { id: "photo-1450101499163-c8848c66ca85", alt: "Insurance and financial protection" },
  ],
  general: [
    { id: "photo-1579621970563-ebec7560ff3e", alt: "Personal finance and money management" },
    { id: "photo-1554224155-6726b3ff858f", alt: "Financial planning concepts" },
  ],
};

// Track used images to avoid duplicates within a session
let usedIds = new Set();

/**
 * Get an Unsplash image for a blog post based on category.
 *
 * @param {string} category - Blog post category
 * @param {string} keyword - Target keyword (used for alt text)
 * @returns {{ src: string, alt: string }}
 */
export function getUnsplashImage(category, keyword) {
  const images = CATEGORY_IMAGES[category] || CATEGORY_IMAGES.general;

  // Pick one that hasn't been used yet
  let picked = images.find((img) => !usedIds.has(img.id));
  if (!picked) {
    // All used, reset and pick first
    usedIds = new Set();
    picked = images[0];
  }

  usedIds.add(picked.id);

  return {
    src: `https://images.unsplash.com/${picked.id}?w=800&q=80`,
    alt: picked.alt,
  };
}
