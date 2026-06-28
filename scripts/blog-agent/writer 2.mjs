/**
 * Blog Writer Agent
 *
 * Takes a keyword (and optional topic metadata), researches the topic,
 * generates an outline, writes the full article, and saves the data file.
 */

import { getUnsplashImage } from "./lib/unsplash-image.mjs";
import { researchTopic } from "./lib/tavily-search.mjs";
import { generateOutline, writeArticle } from "./lib/claude-writer.mjs";
import {
  writePostDataFile,
  keywordToSlug,
  readExistingPublishedAt,
} from "./lib/file-generator.mjs";
import { updateRegistries } from "./lib/registry-updater.mjs";

/**
 * Run the writer agent.
 *
 * @param {string} keyword - Target keyword
 * @param {object} [topicMeta] - Optional metadata from topic queue (title, slug, linksTo, category)
 * @param {object} [options]
 * @param {boolean} [options.isRefresh] - Evergreen refresh of an existing post
 * @returns {Promise<{slug: string, postData: object, research: object}>}
 */
export async function run(keyword, topicMeta = {}, { isRefresh = false } = {}) {
  console.log(`\n🖊️  Blog Writer Agent`);
  console.log(`  Keyword: "${keyword}"`);

  // 1. Research
  const research = await researchTopic(keyword);

  // 2. Generate outline
  const outline = await generateOutline(keyword, research, topicMeta);

  // 3. Write full article
  const article = await writeArticle(outline, research, topicMeta);

  // 4. Assemble BlogPostData
  const slug = topicMeta.slug || keywordToSlug(keyword);
  const today = new Date().toISOString().split("T")[0];

  // Evergreen refresh: preserve the original publish date, bump updatedAt.
  // Derive `refreshing` from file existence too, so accidental keyword
  // re-runs of an existing slug also preserve publishedAt.
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
  return { slug, postData, research };
}
