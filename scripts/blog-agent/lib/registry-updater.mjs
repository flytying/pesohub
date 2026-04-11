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

  // Insert before the closing ];
  content = content.replace(
    /^(\s*)\];/m,
    `${entry}\n$1];`
  );

  writeFileSync(filePath, content, "utf-8");
  console.log(`  📝 Updated: src/data/blog/index.ts`);
}

/**
 * Add a post module import to the [slug] page.tsx.
 */
export function addToPostModules(slug) {
  const filePath = resolve(ROOT, "src/app/blog/[slug]/page.tsx");
  let content = readFileSync(filePath, "utf-8");

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
