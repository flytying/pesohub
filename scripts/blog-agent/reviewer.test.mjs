import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock only the OpenAI-hitting judge; keep summarizeCriteria real so the gate
// logic (critical-criteria math) is exercised for real.
const evaluatePackage = vi.fn();
vi.mock("./lib/blog-evaluator.mjs", async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, evaluatePackage };
});

const { runPackage } = await import("./reviewer.mjs");

// All-pass criteria (the 4 critical + 2 non-critical).
const allPass = () => ({
  factual_accuracy_and_source_discipline: { result: "pass" },
  philippine_relevance: { result: "pass" },
  trust_and_safety: { result: "pass" },
  action_and_target_correctness: { result: "pass" },
  actionability: { result: "pass" },
  completeness: { result: "pass" },
});

const GOOD_MD =
  "Update /government/pag-ibig/pag-ibig-mp2-savings-guide: add a new 2026 dividend " +
  "paragraph right after the intro, then insert a comparison table versus current " +
  "digital-bank savings rates so readers can weigh MP2 against a high-yield account. " +
  "Below that, add three FAQs covering early withdrawal, the 5-year maturity, and how " +
  "dividends are credited. Finally, link back to the emergency-fund calculator and the " +
  "digital-bank rates page. Exact replacement copy for each section is provided below, " +
  "so a human editor can paste it in without rewriting anything by hand at all today.";

const TARGET = "/government/pag-ibig/pag-ibig-mp2-savings-guide";

const pkg = (over = {}) => ({
  markdown: GOOD_MD,
  action: "update_existing_page",
  targetPage: TARGET,
  relatedQueries: ["mp2 dividend 2026"],
  research: { summary: "MP2 2025 dividend was 6.10%." },
  ...over,
});

beforeEach(() => {
  evaluatePackage.mockReset();
});

describe("runPackage", () => {
  it("approves when structural checks clean, verdict apply, all critical pass", async () => {
    evaluatePackage.mockResolvedValue({
      publish_recommendation: "apply",
      criteria: allPass(),
      recommended_fixes: [],
    });

    const r = await runPackage("mp2", "mp2 dividend", pkg());

    expect(r.approved).toBe(true);
    expect(r.publishRecommendation).toBe("apply");
    expect(r.criticalPassed).toBe(true);
    expect(r.passed).toBe(6);
    expect(r.total).toBe(6);
    expect(r.issues).toEqual([]);
  });

  it("rejects when a critical criterion fails, even if verdict says apply", async () => {
    const criteria = allPass();
    criteria.factual_accuracy_and_source_discipline.result = "fail";
    evaluatePackage.mockResolvedValue({
      publish_recommendation: "apply", // judge disagrees with itself; gate must still block
      criteria,
      critical_issues: ["Unsupported 2026 dividend figure"],
      recommended_fixes: ["Cite the HDMF source"],
    });

    const r = await runPackage("mp2", "mp2 dividend", pkg());

    expect(r.approved).toBe(false);
    expect(r.criticalPassed).toBe(false);
    expect(r.failedCriteria).toContain("factual_accuracy_and_source_discipline");
    expect(r.issues).toContain("Unsupported 2026 dividend figure");
    expect(r.suggestions).toContain("Cite the HDMF source");
  });

  it("blocks on a revise verdict despite all criteria passing", async () => {
    evaluatePackage.mockResolvedValue({
      publish_recommendation: "revise",
      criteria: allPass(),
      recommended_fixes: [],
    });

    const r = await runPackage("mp2", "mp2 dividend", pkg());

    expect(r.approved).toBe(false);
    expect(r.criticalPassed).toBe(true);
    expect(r.publishRecommendation).toBe("revise");
  });

  it("flags a structural issue when the package is too thin", async () => {
    evaluatePackage.mockResolvedValue({
      publish_recommendation: "apply",
      criteria: allPass(),
      recommended_fixes: [],
    });

    const r = await runPackage("mp2", "mp2 dividend", pkg({ markdown: "Update the page." }));

    expect(r.approved).toBe(false);
    expect(r.issues.some((i) => /too thin/i.test(i))).toBe(true);
  });

  it("leaves target-page correctness to the judge, not a structural substring", async () => {
    // Body never pastes the target URL path (only names the page in prose) —
    // must NOT trip a structural issue; the judge's critical criterion owns this.
    const criteria = allPass();
    criteria.action_and_target_correctness.result = "fail";
    evaluatePackage.mockResolvedValue({
      publish_recommendation: "apply",
      criteria,
      critical_issues: ["Wrong target page"],
      recommended_fixes: [],
    });

    const body =
      "Add a lengthy new dividend section with a comparison table and exact " +
      "replacement copy, plus an internal link to the emergency-fund calculator " +
      "so readers can act on the numbers right away without guessing anything.";

    const r = await runPackage("mp2", "mp2 dividend", pkg({ markdown: body }));

    // Gated by the judge (critical fail), not by a structural target check.
    expect(r.approved).toBe(false);
    expect(r.criticalPassed).toBe(false);
    expect(r.failedCriteria).toContain("action_and_target_correctness");
    expect(r.issues.every((i) => !/target page/i.test(i) || i === "Wrong target page")).toBe(true);
  });
});
