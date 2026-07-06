/**
 * Renders the weekly GSC opportunity review into GitHub-issue markdown.
 *
 * Each opportunity carries the Keyword Opportunity Agent's scored decision:
 * recommended action, opportunity score + breakdown, cannibalization risk, the
 * target page (for updates/merges), an internal-link plan, and — for new-post /
 * supporting-page actions — a ready-to-paste topic-queue.json snippet (tick the
 * box, paste, done). Held/rejected clusters are listed separately with the
 * blocking reason. The blog agent does the actual writing once a snippet lands.
 */

const ACTION_LABEL = {
  publish_as_new_post: "🆕 New post",
  create_supporting_page_with_internal_links: "🔗 Supporting page",
  update_existing_page: "✏️ Update existing",
  merge_with_existing_page: "🔀 Merge",
  hold: "⏸️ Hold",
  reject: "🚫 Reject",
};

function metricsLine(o) {
  const parts = [
    `**${(o.impressions ?? 0).toLocaleString()}** impressions`,
    `${o.clicks ?? 0} clicks`,
    `pos **${o.position ?? 0}**`,
    `CTR ${((o.ctr ?? 0) * 100).toFixed(1)}%`,
  ];
  if (o.deltaPct != null) parts.push(`${o.deltaPct >= 0 ? "+" : ""}${o.deltaPct}% WoW`);
  return parts.join(" · ");
}

function scoreLine(d) {
  const b = d.score_breakdown ?? {};
  return (
    `score **${(d.opportunity_score ?? 0).toFixed(2)}** ` +
    `(demand ${fmt(b.demand_score)}, pos ${fmt(b.position_opportunity_score)}, ` +
    `ctr-gap ${fmt(b.ctr_gap_score)}, fit ${fmt(b.tool_business_fit_score)}, ` +
    `source ${fmt(b.source_confidence_score)}, action ${fmt(b.content_action_score)}, ` +
    `cannib −${fmt(b.cannibalization_penalty)})`
  );
}
const fmt = (n) => (typeof n === "number" ? n.toFixed(2) : "—");

function internalLinks(d) {
  const links = d.recommended_internal_links ?? [];
  if (!links.length) return [];
  return [
    "  - Internal links:",
    ...links.map((l) => `    - [${l.anchor_text}](${l.target_page_or_tool}) — ${l.reason ?? ""}`),
  ];
}

const UPDATE_ACTIONS = new Set([
  "update_existing_page",
  "merge_with_existing_page",
]);

/**
 * Stable slug for an update/merge task, keyed on the whole page path (or the
 * primary query when no page is given) so the same page can't be re-queued
 * while an entry for it already exists. Slugifying the full path keeps it unique
 * across pages that happen to share a last segment.
 */
export function updateTaskSlug(decision) {
  const base = String(
    decision.target_page_to_update || decision.primary_query || ""
  ).split(/[#?]/)[0]; // drop any query string / fragment
  const clean = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return clean ? `update-${clean}` : "";
}

/**
 * Canonical topic-queue slug for a decision — the single source of truth shared
 * by buildQueueEntry (what gets written), promoteToQueue (dedup) and buildIssue
 * (matching a decision to its queued entry). Empty string when undeducible.
 */
export function decisionQueueSlug(decision) {
  return (
    decision.topic_seed?.slug ||
    (UPDATE_ACTIONS.has(decision.recommended_action)
      ? updateTaskSlug(decision)
      : "")
  );
}

/** Paste-ready topic-queue.json object for an actionable new/supporting item. */
/**
 * Build a topic-queue.json entry from a keyword-opportunity decision. Shared by
 * the paste-ready issue snippet and the auto-promotion in gsc-opportunities.mjs,
 * so both produce identical entries. Handles two shapes:
 *   • new-post / supporting-page — driven by the agent's `topic_seed`.
 *   • update / merge — no topic_seed; slug/title/keywords derive from the page
 *     being updated so the writer emits a human-apply package for that page
 *     (not a duplicate post).
 */
export function buildQueueEntry(decision, id) {
  const seed = decision.topic_seed ?? {};
  const isUpdate = UPDATE_ACTIONS.has(decision.recommended_action);
  const linksTo = (decision.recommended_internal_links ?? [])
    .map((l) => l.target_page_or_tool)
    .filter((p) => typeof p === "string" && p.startsWith("/"))
    .slice(0, 2);
  const primary = decision.primary_query ?? "";
  const slug = decisionQueueSlug(decision);
  const keywords =
    seed.keywords ??
    decision.related_queries_to_include ??
    (primary ? [primary] : []);
  const entry = {
    id,
    title:
      seed.title ||
      (isUpdate && primary ? `Update existing page: ${primary}` : ""),
    slug,
    keywords,
    category: seed.category ?? "general",
    linksTo,
    brief: seed.brief ?? decision.recommended_content_angle ?? "",
    recommendedAction: decision.recommended_action,
    // Trimmed decision so the writer can reuse the agent's angle/links.
    decision: {
      content_gap: decision.content_gap ?? "",
      recommended_content_angle: decision.recommended_content_angle ?? "",
      recommended_internal_links: decision.recommended_internal_links ?? [],
      related_queries_to_include: decision.related_queries_to_include ?? [],
    },
    evergreen: true,
    refreshIntervalDays: 120,
    status: "pending",
  };
  // Carry the page under repair so the writer/PR can point the human at it.
  if (isUpdate && decision.target_page_to_update) {
    entry.targetPage = decision.target_page_to_update;
  }
  return entry;
}

function queueSnippet(decision, id) {
  return JSON.stringify(buildQueueEntry(decision, id), null, 2);
}

function decisionBlock({ opp, decision }, queueId, queued = false) {
  const isNew =
    decision.recommended_action === "publish_as_new_post" ||
    decision.recommended_action === "create_supporting_page_with_internal_links";
  const title = decision.topic_seed?.title || decision.primary_query || opp.query;

  const lines = [
    `- [ ] **${title}** — ${ACTION_LABEL[decision.recommended_action] ?? decision.recommended_action}`,
    `  - Targets: \`${decision.primary_query ?? opp.query}\` · ${metricsLine(opp)}`,
    `  - ${scoreLine(decision)} · cannibalization **${decision.cannibalization_risk}** · source facts **${decision.source_fact_status}**`,
  ];
  if (decision.reason) lines.push(`  - _${decision.reason}_`);
  if (decision.content_gap) lines.push(`  - Content gap: ${decision.content_gap}`);
  if (
    (decision.recommended_action === "update_existing_page" ||
      decision.recommended_action === "merge_with_existing_page") &&
    decision.target_page_to_update
  ) {
    lines.push(`  - **Target page:** \`${decision.target_page_to_update}\``);
  }
  lines.push(...internalLinks(decision));
  if (decision.next_step) lines.push(`  - Next step: ${decision.next_step}`);

  const isUpdate =
    decision.recommended_action === "update_existing_page" ||
    decision.recommended_action === "merge_with_existing_page";

  if (queued) {
    lines.push(
      isNew
        ? "  - ✅ _Auto-queued — the blog agent generates a post as a review PR._"
        : "  - ✅ _Auto-queued — the blog agent generates a human-apply update package as a review PR._"
    );
  } else if (isNew) {
    lines.push(
      "  <details><summary>Paste into <code>topic-queue.json</code></summary>",
      "",
      "  ```json",
      ...queueSnippet(decision, queueId).split("\n").map((l) => `  ${l}`),
      "  ```",
      "  </details>"
    );
  } else if (isUpdate) {
    lines.push(
      "  - _Not auto-queued this week (over the weekly promote budget) — apply to the live page directly, or it becomes eligible next run._"
    );
  }
  return lines.join("\n");
}

const PRIORITY_ORDER = ["A", "B", "C"];
const PRIORITY_TITLE = {
  A: "## 🅰️ Priority A — do first",
  B: "## 🅱️ Priority B — good, less urgent",
  C: "## 🅲 Priority C — monitor / batch later",
};

/**
 * @param {{
 *   windows: {current:{start,end}, prior:{start,end}},
 *   decided: Array<{opp: object, decision: object}>,
 *   nextId: number,
 *   weekLabel: string,
 *   opportunityCount: number,
 *   notifyHandle?: string,    // GitHub handle to @mention when pages need updates
 *   autoQueuedCount?: number  // new posts auto-promoted to topic-queue.json this run
 * }} input
 * @returns {{title: string, body: string, updateCount: number}}
 */
export function buildIssue({ windows, decided, nextId, weekLabel, opportunityCount, notifyHandle, autoQueuedCount = 0, queuedSlugs = new Set() }) {
  const actionable = decided.filter(
    (d) => !["hold", "reject"].includes(d.decision.recommended_action)
  );
  const held = decided.filter((d) =>
    ["hold", "reject"].includes(d.decision.recommended_action)
  );
  const updates = actionable.filter((d) =>
    ["update_existing_page", "merge_with_existing_page"].includes(d.decision.recommended_action)
  );

  let id = nextId;
  const body = [];

  // Top alert: pages needing updates (@mention drives the GitHub notification).
  // The top ones are auto-queued as human-apply packages; this is the review cue.
  if (updates.length) {
    const mention = notifyHandle ? ` — @${notifyHandle}` : "";
    body.push(
      `> ⚠️ **${updates.length} page(s) flagged for updates** — top ones auto-queued as apply-packages; review the PRs${mention}`,
      ...updates.map(({ opp, decision }) => {
        const page = decision.target_page_to_update || opp.topPagePath || "/";
        return `> - \`${page}\` — ${ACTION_LABEL[decision.recommended_action]} (${decision.primary_query ?? opp.query})`;
      }),
      ""
    );
  }

  body.push(
    `_Search Console window: **${windows.current.start} → ${windows.current.end}** (vs prior ${windows.prior.start} → ${windows.prior.end})._`,
    "",
    `Analyzed **${opportunityCount}** opportunities → **${actionable.length}** actionable ` +
      `(**${updates.length}** updates), **${held.length}** held/rejected. ` +
      "The top items (new posts + update packages) are auto-queued into `scripts/blog-agent/topic-queue.json` and the blog agent works them Mon/Wed/Fri as review PRs — no manual paste. " +
      "Anything not auto-queued (over the weekly budget) shows a snippet or can be applied directly.",
    ""
  );

  if (autoQueuedCount > 0) {
    body.push(
      `✅ **Auto-queued ${autoQueuedCount} item(s)** this week (new posts and/or update packages) — the blog agent generates each as a review PR Mon/Wed/Fri. Items marked below without the ✅ were not queued this run.`,
      ""
    );
  }

  for (const p of PRIORITY_ORDER) {
    const group = actionable.filter((d) => d.decision.priority === p);
    if (!group.length) continue;
    body.push(PRIORITY_TITLE[p], "");
    for (const d of group) {
      const isNew = ["publish_as_new_post", "create_supporting_page_with_internal_links"].includes(
        d.decision.recommended_action
      );
      const queued = queuedSlugs.has(decisionQueueSlug(d.decision));
      body.push(decisionBlock(d, isNew && !queued ? id++ : 0, queued), "");
    }
  }

  if (held.length) {
    body.push("## ⏸️ Held / rejected", "");
    for (const { opp, decision } of held) {
      body.push(
        `- ${ACTION_LABEL[decision.recommended_action]} \`${decision.primary_query ?? opp.query}\` — ${decision.reason ?? decision.next_step ?? "blocked"}`
      );
    }
    body.push("");
  }

  if (!decided.length) {
    body.push("_No opportunities cleared the thresholds this week._", "");
  }

  body.push(
    "---",
    "<sub>Generated by `scripts/blog-agent/gsc-opportunities.mjs`. Decisions + scores logged to the `gsc-opportunities` Langfuse dataset. Closing/checking boxes feeds the `--feedback` eval pass.</sub>"
  );

  return {
    title: `GSC Opportunities — week of ${weekLabel}`,
    body: body.join("\n"),
    updateCount: updates.length,
  };
}
