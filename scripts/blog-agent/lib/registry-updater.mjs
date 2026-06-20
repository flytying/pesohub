/**
 * Updates blog registries after a new post is generated.
 *
 * Modifies:
 * - src/data/blog/index.ts (blog post registry)
 * - src/app/blog/[slug]/page.tsx (post module mapping)
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const ROOT = resolve(import.meta.dirname, "../../../");

/**
 * Add a blog post entry to the blog registry (src/data/blog/index.ts).
 */
export function addToBlogRegistry(postData) {
  const filePath = resolve(ROOT, "src/data/blog/index.ts");
  let content = readFileSync(filePath, "utf-8");

  const entry = `  {
    slug: ${JSON.stringify(postData.slug)},
    title: ${JSON.stringify(postData.title)},
    excerpt: ${JSON.stringify(postData.excerpt)},
    category: ${JSON.stringify(postData.category)},
    publishedAt: ${JSON.stringify(postData.publishedAt)},
    updatedAt: ${JSON.stringify(postData.updatedAt)},
    readTime: ${postData.readTime},
  },`;

  // Idempotent: if an entry for this slug already exists (e.g. evergreen
  // refresh or accidental re-run), replace it in place instead of appending
  // a duplicate. Object blocks are `  { ... \n  },` with only string/number
  // values (no nested braces), so a non-greedy block match is safe.
  const slugLine = `slug: ${JSON.stringify(postData.slug)},`;
  const blockRe = /  \{\n[\s\S]*?\n  \},/g;
  let replaced = false;
  content = content.replace(blockRe, (block) =>
    block.includes(slugLine) ? ((replaced = true), entry) : block
  );

  if (replaced) {
    console.log(`  📝 Updated existing registry entry: ${postData.slug}`);
  } else {
    // Insert before the closing ];
    content = content.replace(/^(\s*)\];/m, `${entry}\n$1];`);
    console.log(`  📝 Added registry entry: ${postData.slug}`);
  }

  writeFileSync(filePath, content, "utf-8");
}

/**
 * Add a post module import to the [slug] page.tsx.
 */
export function addToPostModules(slug) {
  const filePath = resolve(ROOT, "src/app/blog/[slug]/page.tsx");
  let content = readFileSync(filePath, "utf-8");

  // Idempotent: the import target never changes for a slug, so on refresh /
  // re-run this is a pure no-op. Avoids a duplicate key in postModules.
  if (content.includes(`"${slug}": () =>`)) {
    console.log(`  📝 postModules already has ${slug}, skipping.`);
    return;
  }

  const importLine = `  "${slug}": () =>\n    import("@/data/blog/${slug}"),`;

  // Find the postModules object and insert before the closing };
  content = content.replace(
    /(const postModules:.*?{[\s\S]*?)(};)/m,
    `$1${importLine}\n$2`
  );

  writeFileSync(filePath, content, "utf-8");
  console.log(`  📝 Updated: src/app/blog/[slug]/page.tsx`);
}

/**
 * Update all registries for a new blog post.
 */
export function updateRegistries(postData) {
  addToBlogRegistry(postData);
  addToPostModules(postData.slug);
}
