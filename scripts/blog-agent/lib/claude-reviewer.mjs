/**
 * Claude API wrapper for blog article review.
 *
 * Uses the Anthropic SDK to review articles for quality,
 * SEO, and factual consistency.
 */

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

/**
 * Review a blog article for quality and SEO.
 *
 * @param {object} postData - The BlogPostData object to review
 * @param {string} keyword - The target keyword
 * @param {object} research - The original research used to write the article
 * @returns {Promise<{approved: boolean, score: number, issues: string[], suggestions: string[]}>}
 */
export async function reviewArticle(postData, keyword, research) {
  console.log(`  🔍 Reviewing article: "${postData.title}"...`);

  // Count total word count from sections
  const wordCount = postData.sections
    .map((s) => {
      if (s.content) return s.content.split(/\s+/).length;
      if (s.items) return s.items.join(" ").split(/\s+/).length;
      if (s.heading) return s.heading.split(/\s+/).length;
      return 0;
    })
    .reduce((a, b) => a + b, 0);

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    system:
      "You are an SEO content reviewer for Philippine personal finance content. Be strict but fair. Focus on factual accuracy, keyword relevance, and content depth.",
    messages: [
      {
        role: "user",
        content: `Review this blog article for PesoHub (pesohub.ph).

Target keyword: "${keyword}"
Word count: ${wordCount}

Article metadata:
- Title: ${postData.title}
- Meta title: ${postData.metaTitle} (${postData.metaTitle.length} chars)
- Meta description: ${postData.metaDescription} (${postData.metaDescription.length} chars)
- Category: ${postData.category}
- Read time: ${postData.readTime} min
- FAQs: ${postData.faqs.length}
- Sections: ${postData.sections.filter((s) => s.type === "heading").length} headings

Article content (sections):
${postData.sections.map((s) => {
  if (s.type === "heading") return `\n## ${s.heading}`;
  if (s.type === "paragraph") return s.content;
  if (s.type === "list" || s.type === "ordered-list") return s.items?.join("\n- ");
  if (s.type === "callout") return `[${s.variant}] ${s.content}`;
  return "";
}).join("\n")}

Research summary used:
${research.summary.slice(0, 1000)}

Review criteria:
1. SEO: Is the keyword in the title, meta title, first paragraph? Meta title ≤ 60 chars? Meta description 120-160 chars?
2. Content depth: At least 1500 words? At least 4 H2 sections? At least 3 FAQs?
3. Accuracy: Any factual claims that contradict the research or are clearly wrong?
4. Relevance: Is the content actually about the target keyword and useful for Filipinos?
5. Quality: No placeholder text, no generic filler, original analysis?
6. YMYL compliance: Proper disclaimers? No specific financial advice?

Respond with valid JSON only (no markdown fences):
{
  "approved": true/false,
  "score": 0-100,
  "issues": ["issue 1", "issue 2"],
  "suggestions": ["suggestion 1", "suggestion 2"]
}`,
      },
    ],
  });

  const text = message.content[0].text;
  return JSON.parse(text);
}
