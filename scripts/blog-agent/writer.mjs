/**
 * Blog Writer Agent (action-aware).
 *
 * Driven by the upstream Keyword Opportunity Agent's recommended_action,
 * carried on the topic-queue entry as `recommendedAction` (defaults to
 * publish_as_new_post):
 *
 *   publish_as_new_post / create_supporting_page_with_internal_links
 *     → research → outline → article → BlogPostData → src/data/blog/<slug>.ts
 *       + registries. Returns { kind: "post", ... }.
 *   update_existing_page / merge_with_existing_page / hold / reject
 *     → a Markdown "content action package" written to
 *       scripts/blog-agent/output/<slug>-<action>.md for a human to apply.
 *       No live page is auto-edited (static TS site). Returns { kind: "package", ... }.
 */

import { mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";
import { getUnsplashImage } from "./lib/unsplash-image.mjs";
import { researchTopic } from "./lib/tavily-search.mjs";
import {
  generateOutline,
  writeArticle,
  writeActionPackage,
  getWritingSystem,
  buildWritingVars,
} from "./lib/claude-writer.mjs";
import {
  writePostDataFile,
  keywordToSlug,
  readExistingPublishedAt,
} from "./lib/file-generator.mjs";
import { updateRegistries } from "./lib/registry-updater.mjs";

const OUTPUT_DIR = resolve(import.meta.dirname, "output");

/** Actions that produce a new standalone post file. */
const POST_ACTIONS = new Set([
  "publish_as_new_post",
  "create_supporting_page_with_internal_links",
]);

/**
 * Run the writer agent.
 *
 * @param {string} keyword
 * @param {object} [topicMeta]  queue metadata (title, slug, keywords, category,
 *                              linksTo, brief, recommendedAction, decision)
 * @param {object} [options]
 * @param {boolean} [options.isRefresh]
 * @returns {Promise<object>} { kind: "post"|"package", ... }
 */
export async function run(keyword, topicMeta = {}, { isRefresh = false } = {}) {
  const action = topicMeta.recommendedAction || "publish_as_new_post";
  console.log(`\n🖊️  Blog Writer Agent`);
  console.log(`  Keyword: "${keyword}"  ·  Action: ${action}`);

  // 1. Research (source facts for the writing agent).
  const research = await researchTopic(keyword);

  // 2. Compile the writing-agent system prompt for this task.
  const vars = buildWritingVars(keyword, topicMeta, research, topicMeta.decision ?? null);
  const ctx = await getWritingSystem(vars);

  const slug = topicMeta.slug || keywordToSlug(keyword);

  // ── Non-post actions: emit a Markdown action package, no file/registry write.
  if (!POST_ACTIONS.has(action)) {
    const markdown = await writeActionPackage(ctx, keyword);
    mkdirSync(OUTPUT_DIR, { recursive: true });
    const file = resolve(OUTPUT_DIR, `${slug}-${action}.md`);
    writeFileSync(
      file,
      `# Content action: ${action}\n\n` +
        `- Keyword: \`${keyword}\`\n- Target page: \`${topicMeta.linksTo?.[0] ?? "n/a"}\`\n\n---\n\n` +
        markdown +
        "\n",
      "utf-8"
    );
    console.log(`  📦 Wrote action package: scripts/blog-agent/output/${slug}-${action}.md`);
    return { kind: "package", slug, action, file, markdown, research };
  }

  // ── Post actions: structured outline → article → BlogPostData.
  const outline = await generateOutline(keyword, research, topicMeta, ctx);
  const article = await writeArticle(outline, research, topicMeta, ctx);

  const today = new Date().toISOString().split("T")[0];

  // Evergreen refresh: preserve the original publish date, bump updatedAt.
  const existingPublishedAt = readExistingPublishedAt(slug);
  const refreshing = isRefresh || existingPublishedAt !== null;
  if (refreshing && existingPublishedAt) {
    console.log(`  ♻️  Refreshing existing post (published ${existingPublishedAt})`);
  }

  const postData = {
    slug,
    title: topicMeta.title || outline.title,
    metaTitle: outline.metaTitle,
    metaDescription: outline.metaDescription,
    author: "PesoHub Team",
    publishedAt: refreshing && existingPublishedAt ? existingPublishedAt : today,
    updatedAt: today,
    category: topicMeta.category || outline.category || "general",
    excerpt: article.excerpt || outline.directAnswer,
    readTime: outline.estimatedReadTime || 7,
    directAnswer: outline.directAnswer,
    sections: article.sections,
    faqs: article.faqs || outline.suggestedFaqs || [],
    relatedSlugs: (topicMeta.linksTo || []).map((link) =>
      link.startsWith("/") ? link.slice(1) : link
    ),
    keywords: topicMeta.keywords || [keyword],
    disclaimer: true,
    image: getUnsplashImage(
      topicMeta.category || outline.category || "general",
      keyword,
      slug
    ),
  };

  // 5. Write data file
  writePostDataFile(slug, postData);

  // 6. Update registries
  updateRegistries(postData);

  console.log(`  ✅ Writer complete: ${slug}`);
  return { kind: "post", action, slug, postData, research };
}
