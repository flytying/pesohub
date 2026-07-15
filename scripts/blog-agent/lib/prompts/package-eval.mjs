/**
 * Blog Package Evaluator — Boolean judge for non-post action packages.
 *
 * The writer emits a Markdown "action package" (not a full post) when the
 * recommended action is update_existing_page / merge_with_existing_page /
 * hold / reject. Those bypass the 10-criterion post judge because there is no
 * generated article to grade. This prompt grades the *recommendation itself*:
 * is it accurate, specific, correctly targeted, and safe to apply by hand.
 *
 * Source of truth is Langfuse (prompt name below, label "production"); this
 * committed copy is the fallback used when Langfuse is unset or unreachable.
 *
 * Variables (Langfuse {{mustache}}): action, primary_query, related_queries,
 * target_page, source_facts, action_package.
 */

export const PACKAGE_EVAL_PROMPT_NAME = "blog-package-evaluator";

export const PACKAGE_EVAL_VARS = [
  "action",
  "primary_query",
  "related_queries",
  "target_page",
  "source_facts",
  "action_package",
];

/** The criteria that MUST pass for an "apply" verdict. */
export const PACKAGE_CRITICAL_CRITERIA = [
  "factual_accuracy_and_source_discipline",
  "philippine_relevance",
  "trust_and_safety",
  "action_and_target_correctness",
];

export const PACKAGE_EVAL_PROMPT = `You are a strict content quality evaluator for PesoHub, a Philippine-focused financial tools and information website.
You are NOT grading a full blog post. You are grading a CONTENT ACTION PACKAGE: a short set of recommended edits for a human to apply to an EXISTING PesoHub page.
The recommended action is one of: update_existing_page, merge_with_existing_page, hold, reject.
Use binary evaluation only.
For each criterion, return:
"pass" if the package meets the requirement
"fail" if the package does not meet the requirement
Do not use numeric scores.
PesoHub audience:
Filipino readers searching for practical information about taxes, loans, savings, government contributions, rates, calculators, and personal finance in the Philippines.
INPUTS
Recommended action:
{{action}}
Primary Search Console query:
{{primary_query}}
Related Search Console queries:
{{related_queries}}
Target page to update or merge into:
{{target_page}}
Required source facts / verified data:
{{source_facts}}
Content action package (Markdown):
{{action_package}}
EVALUATION CRITERIA
factual_accuracy_and_source_discipline
Pass if:
Every rate, table, deadline, formula, limit, agency name, and rule in the package is supported by the provided source facts.
The package does not invent numbers or claims.
Uncertain or changeable information is framed carefully.
Fail if:
The package includes unsupported tax rates, contribution rates, loan/interest rates, deadlines, or legal claims.
The package makes claims not found in the source facts.
The package presents estimates as guaranteed results.
philippine_relevance
Pass if:
The recommended edits are clearly written for readers in the Philippines and use Philippine agencies, terms, currency, rules, and context where relevant.
Fail if:
The edits are generic global or US-focused, or ignore the Philippine context where it matters.
trust_and_safety
Pass if:
The package avoids risky absolute financial, tax, or legal advice and keeps or adds proper disclaimers where needed.
It does not tell readers to rely only on PesoHub for official rules.
Fail if:
The package gives absolute advice where caution is needed, drops required disclaimers, or could mislead readers into decisions without verification.
action_and_target_correctness
Pass if:
The recommended action ({{action}}) is the right move for this query cluster and target page.
The package names the correct existing target page and explains WHERE the edits go.
For merge: the package identifies both pages and a clear canonical/redirect plan.
For update: the edits strengthen the existing page instead of duplicating it.
Fail if:
The action is wrong (e.g. recommends an update that would actually need a new page, or a merge with no clear canonical).
The target page is missing, wrong, or ambiguous.
The package would split authority or create cannibalization instead of fixing it.
actionability
Pass if:
The edits are concrete and specific — a human can apply them without guessing (what to add, what to change, where).
The package includes the actual replacement text, sections, FAQs, tables, or links where relevant.
Fail if:
The package is vague ("improve the intro", "add more detail") without specifics.
It describes problems but not fixes.
completeness
Pass if:
The package covers the full scope of the recommended change and does not leave obvious gaps.
It addresses the related queries that motivated the action.
Fail if:
The package only partially addresses the opportunity.
Important related questions from the query cluster are ignored.
VERDICT RULES
Return "apply" only if:
All critical criteria pass: factual_accuracy_and_source_discipline, philippine_relevance, trust_and_safety, action_and_target_correctness.
There are no critical factual issues.
The package is specific enough for a human to apply confidently.
Return "revise" if:
The package is mostly usable but has fixable gaps (vague edits, missing specifics, partial coverage).
Some non-critical criteria fail.
Return "reject" if:
The package fails factual accuracy, is not Philippine-focused, targets the wrong page, recommends the wrong action, or is unsafe to apply.
OUTPUT FORMAT
Return your evaluation in this exact JSON format:
{
"publish_recommendation": "apply | revise | reject",
"summary": "Brief explanation of the overall quality of the action package.",
"criteria": {
"factual_accuracy_and_source_discipline": { "result": "pass | fail", "reason": "Short explanation." },
"philippine_relevance": { "result": "pass | fail", "reason": "Short explanation." },
"trust_and_safety": { "result": "pass | fail", "reason": "Short explanation." },
"action_and_target_correctness": { "result": "pass | fail", "reason": "Short explanation." },
"actionability": { "result": "pass | fail", "reason": "Short explanation." },
"completeness": { "result": "pass | fail", "reason": "Short explanation." }
},
"critical_issues": [
"List must-fix issues before applying."
],
"unverified_or_risky_claims": [
"List claims that are unsupported by the provided source facts."
],
"recommended_fixes": [
"Specific, actionable edits to improve the package."
],
"final_verdict": "One clear sentence explaining what should happen next."
}
IMPORTANT RULES
Do not reward length. A long package can still fail.
Do not assume facts that were not provided. If source facts are missing for numbers, rates, tables, or rules, flag them.
Be strict. A human will apply this by hand — vague or inaccurate recommendations must fail.`;
