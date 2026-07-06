import { describe, it, expect } from "vitest";
import {
  buildQueueEntry,
  updateTaskSlug,
  decisionQueueSlug,
} from "./lib/gsc-reporter.mjs";
import { promoteToQueue } from "./gsc-opportunities.mjs";

// ── Decision fixtures ────────────────────────────────────────────────────────
const newPost = (over = {}) => ({
  recommended_action: "publish_as_new_post",
  priority: "B",
  opportunity_score: 0.6,
  topic_seed: {
    title: "New Post",
    slug: "new-post",
    keywords: ["kw one", "kw two"],
    category: "savings",
    brief: "seed brief",
  },
  recommended_internal_links: [
    { target_page_or_tool: "/rates/savings-rates/x" },
    { target_page_or_tool: "not-a-path" },
    { target_page_or_tool: "/calculators/y" },
    { target_page_or_tool: "/z-third" },
  ],
  ...over,
});

const update = (over = {}) => ({
  recommended_action: "update_existing_page",
  priority: "B",
  opportunity_score: 0.7,
  primary_query: "high yield savings account 2026 philippines",
  target_page_to_update: "/rates/savings-rates/best-savings-interest-rates-philippines/",
  related_queries_to_include: ["high yield savings 2026", "best savings 2026"],
  recommended_content_angle: "Refresh the 2026 table + BSP outlook.",
  content_gap: "No 2026 outlook.",
  ...over,
});

describe("updateTaskSlug", () => {
  it("slugifies the full page path, stripping trailing slash", () => {
    expect(updateTaskSlug(update())).toBe(
      "update-rates-savings-rates-best-savings-interest-rates-philippines"
    );
  });

  it("drops query string and fragment", () => {
    expect(updateTaskSlug({ target_page_to_update: "/a/b/?q=1#frag" })).toBe(
      "update-a-b"
    );
  });

  it("falls back to primary_query when no target page", () => {
    expect(
      updateTaskSlug({ primary_query: "Maya vs GoTyme" })
    ).toBe("update-maya-vs-gotyme");
  });

  it("returns empty string when nothing is derivable", () => {
    expect(updateTaskSlug({})).toBe("");
  });
});

describe("decisionQueueSlug", () => {
  it("uses topic_seed.slug for new posts", () => {
    expect(decisionQueueSlug(newPost())).toBe("new-post");
  });

  it("derives an update- slug for update/merge", () => {
    expect(decisionQueueSlug(update())).toBe(
      "update-rates-savings-rates-best-savings-interest-rates-philippines"
    );
    expect(
      decisionQueueSlug({
        recommended_action: "merge_with_existing_page",
        primary_query: "seabank vs tonik",
      })
    ).toBe("update-seabank-vs-tonik");
  });

  it("is empty for non-promotable actions", () => {
    expect(decisionQueueSlug({ recommended_action: "hold", primary_query: "q" })).toBe("");
    expect(decisionQueueSlug({ recommended_action: "reject", primary_query: "q" })).toBe("");
  });
});

describe("buildQueueEntry", () => {
  it("builds a new-post entry from topic_seed and caps internal links at 2", () => {
    const e = buildQueueEntry(newPost(), 42);
    expect(e).toMatchObject({
      id: 42,
      title: "New Post",
      slug: "new-post",
      keywords: ["kw one", "kw two"],
      category: "savings",
      recommendedAction: "publish_as_new_post",
      status: "pending",
    });
    expect(e.linksTo).toEqual(["/rates/savings-rates/x", "/calculators/y"]);
    expect(e.targetPage).toBeUndefined();
  });

  it("builds an update entry with derived slug/title/keywords + targetPage", () => {
    const e = buildQueueEntry(update(), 21);
    expect(e.slug).toBe(
      "update-rates-savings-rates-best-savings-interest-rates-philippines"
    );
    expect(e.recommendedAction).toBe("update_existing_page");
    expect(e.title).toBe(
      "Update existing page: high yield savings account 2026 philippines"
    );
    expect(e.keywords).toEqual(["high yield savings 2026", "best savings 2026"]);
    expect(e.targetPage).toBe(
      "/rates/savings-rates/best-savings-interest-rates-philippines/"
    );
    expect(e.status).toBe("pending");
  });

  it("update keywords fall back to [primary_query] when none listed", () => {
    const e = buildQueueEntry(
      update({ related_queries_to_include: undefined }),
      1
    );
    expect(e.keywords).toEqual(["high yield savings account 2026 philippines"]);
  });
});

describe("promoteToQueue", () => {
  const wrap = (decisions) => decisions.map((decision) => ({ opp: {}, decision }));

  it("promotes new-post and update, new-post first at equal priority", () => {
    const queue = { topics: [] };
    const decided = wrap([
      update({ priority: "A", target_page_to_update: "/a/" }),
      newPost({ priority: "A", topic_seed: { slug: "np-a", title: "T", keywords: ["k"], category: "c" } }),
    ]);
    const appended = promoteToQueue(queue, decided, 5);
    expect(appended.map((e) => e.recommendedAction)).toEqual([
      "publish_as_new_post",
      "update_existing_page",
    ]);
    expect(queue.topics).toHaveLength(2);
  });

  it("orders priority A before B", () => {
    const queue = { topics: [] };
    const decided = wrap([
      update({ priority: "B", target_page_to_update: "/b/" }),
      update({ priority: "A", target_page_to_update: "/a/" }),
    ]);
    const appended = promoteToQueue(queue, decided, 5);
    expect(appended.map((e) => e.slug)).toEqual(["update-a", "update-b"]);
  });

  it("respects the count budget", () => {
    const queue = { topics: [] };
    const decided = wrap([
      update({ target_page_to_update: "/a/" }),
      update({ target_page_to_update: "/b/" }),
      update({ target_page_to_update: "/c/" }),
    ]);
    const appended = promoteToQueue(queue, decided, 2);
    expect(appended).toHaveLength(2);
    expect(queue.topics).toHaveLength(2);
  });

  it("skips decisions already in the queue (any status) and in-batch duplicates", () => {
    const queue = { topics: [{ id: 9, slug: "update-a", status: "completed" }] };
    const decided = wrap([
      update({ target_page_to_update: "/a/" }), // dup of existing completed
      update({ target_page_to_update: "/a/" }), // in-batch dup
      update({ target_page_to_update: "/b/" }), // fresh
    ]);
    const appended = promoteToQueue(queue, decided, 5);
    expect(appended.map((e) => e.slug)).toEqual(["update-b"]);
  });

  it("ignores non-promotable actions", () => {
    const queue = { topics: [] };
    const decided = wrap([
      { recommended_action: "hold", priority: "A", primary_query: "h" },
      { recommended_action: "reject", priority: "A", primary_query: "r" },
    ]);
    expect(promoteToQueue(queue, decided, 5)).toEqual([]);
    expect(queue.topics).toHaveLength(0);
  });

  it("assigns gap-free ids after the current max, only for kept entries", () => {
    const queue = { topics: [{ id: 20, slug: "seed", status: "completed" }] };
    const decided = wrap([
      update({ target_page_to_update: "/a/" }),
      update({ target_page_to_update: "/a/" }), // dup — must not consume an id
      newPost({ topic_seed: { slug: "np", title: "T", keywords: ["k"], category: "c" } }),
    ]);
    const appended = promoteToQueue(queue, decided, 5);
    expect(appended.map((e) => e.id)).toEqual([21, 22]);
    expect(appended.map((e) => e.slug)).toEqual(["np", "update-a"]);
  });

  it("returns [] and does not mutate for empty input", () => {
    const queue = { topics: [{ id: 1, slug: "x" }] };
    expect(promoteToQueue(queue, [], 3)).toEqual([]);
    expect(queue.topics).toHaveLength(1);
  });
});
