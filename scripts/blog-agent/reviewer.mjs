/**
 * Blog Reviewer Agent
 *
 * Gates a generated post with cheap structural pre-checks (fail-fast) then the
 * 10-criterion Boolean judge (blog-content-evaluator). Returns a structured
 * review report including the publish gate.
 */

import { evaluatePost, summarizeCriteria } from "./lib/blog-evaluator.mjs";

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
 * Publish gate: structural checks clean AND publish_recommendation === "publish"
 * AND all 6 critical criteria pass.
 *
 * @param {string} slug
 * @param {string} keyword
 * @param {object} postData
 * @param {object} research
 * @returns {Promise<object>} review report (approved, publishRecommendation,
 *   criteria, passRate, issues, suggestions, wordCount, evaluation)
 */
export async function run(slug, keyword, postData, research) {
  console.log(`\n🔍 Blog Reviewer Agent`);
  console.log(`  Slug: "${slug}"`);

  // 1. Structural checks (fail-fast, no LLM)
  const structural = structuralChecks(postData, keyword);
  console.log(
    `  📏 Structural: ${structural.issues.length} issues, ~${structural.wordCount} words`
  );

  // 2. Boolean judge
  const evaluation = await evaluatePost(postData, keyword, research);
  const summary = summarizeCriteria(evaluation.criteria);
  console.log(
    `  🤖 Judge: ${evaluation.publish_recommendation} · ${summary.passed}/${summary.total} criteria · ` +
      `${summary.criticalPassed ? "critical OK" : "CRITICAL FAIL: " + summary.failed.filter((f) => f).join(", ")}`
  );

  // 3. Publish gate
  const approved =
    structural.issues.length === 0 &&
    evaluation.publish_recommendation === "publish" &&
    summary.criticalPassed;

  const result = {
    approved,
    publishRecommendation: evaluation.publish_recommendation,
    recommendedContentAction: evaluation.recommended_content_action,
    passRate: summary.passRate,
    passed: summary.passed,
    total: summary.total,
    criticalPassed: summary.criticalPassed,
    failedCriteria: summary.failed,
    issues: [...structural.issues, ...(evaluation.critical_issues ?? [])],
    suggestions: evaluation.recommended_fixes ?? [],
    wordCount: structural.wordCount,
    evaluation,
  };

  console.log(
    `  ${approved ? "✅" : "⚠️"} Review complete: ${approved ? "PUBLISH" : evaluation.publish_recommendation.toUpperCase()}`
  );

  return result;
}
