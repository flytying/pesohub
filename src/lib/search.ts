import { searchIndex, type SearchItem } from "@/data/search-index";

export interface SearchResult extends SearchItem {
  score: number;
}

/**
 * Search all indexed pages using simple word-matching with scoring.
 * Designed for a small index (~37 pages) — no external library needed.
 */
export function search(query: string): SearchResult[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  const words = trimmed.split(/\s+/);
  const fullQuery = trimmed;

  const results: SearchResult[] = [];

  for (const item of searchIndex) {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const descLower = item.description.toLowerCase();
    const keywordsJoined = item.keywords.join(" ").toLowerCase();

    // Full query match in title (most relevant)
    if (titleLower.includes(fullQuery)) {
      score += 10;
    }

    for (const word of words) {
      if (word.length < 2) continue;

      // Title word match
      if (titleLower.includes(word)) {
        score += 5;
      }

      // Keywords match
      if (keywordsJoined.includes(word)) {
        score += 3;
      }

      // Description match
      if (descLower.includes(word)) {
        score += 2;
      }
    }

    if (score > 0) {
      results.push({ ...item, score });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}
