/**
 * Generates TypeScript data files for blog posts.
 *
 * Takes a BlogPostData-shaped object and writes it as a
 * properly formatted TypeScript file.
 */

import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "../../../");

/**
 * Read the publishedAt date from an existing post data file, if any.
 * Used by evergreen refresh to preserve the original publish date while
 * bumping updatedAt. Returns null when no file exists yet (first generation).
 *
 * @param {string} slug
 * @returns {string|null} "YYYY-MM-DD" or null
 */
export function readExistingPublishedAt(slug) {
  const filePath = resolve(ROOT, `src/data/blog/${slug}.ts`);
  if (!existsSync(filePath)) return null;
  const content = readFileSync(filePath, "utf-8");
  const m = content.match(/"publishedAt":\s*"(\d{4}-\d{2}-\d{2})"/);
  return m ? m[1] : null;
}

/**
 * Generate and write a blog post data file.
 *
 * @param {string} slug - The post slug
 * @param {object} postData - The complete BlogPostData object
 */
export function writePostDataFile(slug, postData) {
  const filePath = resolve(ROOT, `src/data/blog/${slug}.ts`);
  const constName = slug
    .toUpperCase()
    .replace(/-/g, "_")
    .replace(/[^A-Z0-9_]/g, "");

  const content = `import type { BlogPostData } from "@/types/content";

export const ${constName}_UPDATED_AT = "${postData.updatedAt}";

const post: BlogPostData = ${JSON.stringify(postData, null, 2)};

export default post;
`;

  writeFileSync(filePath, content, "utf-8");
  console.log(`  📄 Wrote: src/data/blog/${slug}.ts`);
  return filePath;
}

/**
 * Convert a keyword string to a URL slug.
 *
 * @param {string} keyword
 * @returns {string}
 */
export function keywordToSlug(keyword) {
  return keyword
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
