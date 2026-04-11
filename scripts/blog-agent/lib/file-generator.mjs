/**
 * Generates TypeScript data files for blog posts.
 *
 * Takes a BlogPostData-shaped object and writes it as a
 * properly formatted TypeScript file.
 */

import { writeFileSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "../../../");

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
