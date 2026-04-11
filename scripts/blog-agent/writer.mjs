/**
 * Blog Writer Agent
 *
 * Takes a keyword (and optional topic metadata), researches the topic,
 * generates an outline, writes the full article, and saves the data file.
 */

import { researchTopic } from "./lib/tavily-search.mjs";
import { generateOutline, writeArticle } from "./lib/claude-writer.mjs";
import { writePostDataFile, keywordToSlug } from "./lib/file-generator.mjs";
import { updateRegistries } from "./lib/registry-updater.mjs";

/**
 * Run the writer agent.
 *
 * @param {string} keyword - Target keyword
 * @param {object} [topicMeta] - Optional metadata from topic queue (title, slug, linksTo, category)
 * @returns {Promise<{slug: string, postData: object, research: object}>}
 */
export async function run(keyword, topicMeta = {}) {
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

  const postData = {
    slug,
    title: topicMeta.title || outline.title,
    metaTitle: outline.metaTitle,
    metaDescription: outline.metaDescription,
    author: "PesoHub Team",
    publishedAt: today,
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
  };

  // 5. Write data file
  writePostDataFile(slug, postData);

  // 6. Update registries
  updateRegistries(postData);

  console.log(`  ✅ Writer complete: ${slug}`);
  return { slug, postData, research };
}
