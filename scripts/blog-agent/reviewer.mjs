/**
 * Blog Reviewer Agent
 *
 * Reviews a generated blog post for quality, SEO, and consistency.
 * Returns a structured review report.
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { reviewArticle } from "./lib/claude-reviewer.mjs";

const ROOT = resolve(import.meta.dirname, "../../");

/**
 * Run structural validation checks (no AI needed).
 */
function structuralChecks(postData, keyword) {
  const issues = [];

  // Meta title length
  if (postData.metaTitle.length > 65) {
    issues.push(
      `Meta title too long (${postData.metaTitle.length} chars, max 65)`
    );
  }

  // Meta description length
  if (postData.metaDescription.length < 100) {
    issues.push(
      `Meta description too short (${postData.metaDescription.length} chars, min 100)`
    );
  }
  if (postData.metaDescription.length > 165) {
    issues.push(
      `Meta description too long (${postData.metaDescription.length} chars, max 165)`
    );
  }

  // Keyword in title
  const keywordLower = keyword.toLowerCase();
  if (!postData.title.toLowerCase().includes(keywordLower.split(" ")[0])) {
    issues.push("Primary keyword term not found in article title");
  }

  // Section count
  const headingCount = postData.sections.filter(
    (s) => s.type === "heading" && s.level === 2
  ).length;
  if (headingCount < 4) {
    issues.push(`Only ${headingCount} H2 sections (minimum 4 recommended)`);
  }

  // FAQ count
  if (postData.faqs.length < 3) {
    issues.push(`Only ${postData.faqs.length} FAQs (minimum 3 recommended)`);
  }

  // Word count
  const wordCount = postData.sections
    .map((s) => {
      if (s.content) return s.content.split(/\s+/).length;
      if (s.items) return s.items.join(" ").split(/\s+/).length;
      return 0;
    })
    .reduce((a, b) => a + b, 0);

  if (wordCount < 1000) {
    issues.push(`Word count too low (~${wordCount} words, minimum 1000)`);
  }

  // Excerpt present
  if (!postData.excerpt || postData.excerpt.length < 20) {
    issues.push("Excerpt missing or too short");
  }

  // Read time
  if (!postData.readTime || postData.readTime <= 0) {
    issues.push("Read time missing or zero");
  }

  return { issues, wordCount };
}

/**
 * Run the reviewer agent.
 *
 * @param {string} slug - The post slug
 * @param {string} keyword - The target keyword
 * @param {object} postData - The BlogPostData object
 * @param {object} research - The research data used by the writer
 * @returns {Promise<{approved: boolean, score: number, issues: string[], suggestions: string[], wordCount: number}>}
 */
export async function run(slug, keyword, postData, research) {
  console.log(`\n🔍 Blog Reviewer Agent`);
  console.log(`  Slug: "${slug}"`);

  // 1. Structural checks
  const structural = structuralChecks(postData, keyword);
  console.log(
    `  📏 Structural: ${structural.issues.length} issues, ~${structural.wordCount} words`
  );

  // 2. AI quality review
  const aiReview = await reviewArticle(postData, keyword, research);
  console.log(
    `  🤖 AI Review: score ${aiReview.score}/100, ${aiReview.approved ? "approved" : "rejected"}`
  );

  // 3. Combine results
  const allIssues = [...structural.issues, ...aiReview.issues];
  const approved = structural.issues.length === 0 && aiReview.approved;

  const result = {
    approved,
    score: aiReview.score,
    issues: allIssues,
    suggestions: aiReview.suggestions || [],
    wordCount: structural.wordCount,
  };

  console.log(
    `  ${result.approved ? "✅" : "⚠️"} Review complete: ${result.approved ? "APPROVED" : "NEEDS REVISION"}`
  );

  return result;
}
