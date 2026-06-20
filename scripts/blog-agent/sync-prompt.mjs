#!/usr/bin/env node

/**
 * Sync the blog-agent SYSTEM_PROMPT to the Braintrust prompt registry (mirror).
 *
 * The repo is the runtime source of truth — this only keeps the Braintrust
 * "Prompts" entry in sync for Playground/Experiment use. It compares the
 * registry's stored system message against the current code and only PUTs when
 * they differ, so it's a cheap no-op on unchanged runs.
 *
 * No-op when BRAINTRUST_API_KEY is unset (local runs, contributors w/o a key).
 *
 *   node scripts/blog-agent/sync-prompt.mjs
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { SYSTEM_PROMPT_VERSION } from "./lib/claude-writer.mjs";

const API = "https://api.braintrust.dev";
const PROJECT_NAME = "pesohub-blog-agent";
const PROMPT_SLUG = "blog-writer-system-prompt";
const MODEL = "claude-sonnet-4-6";

const key = process.env.BRAINTRUST_API_KEY;
if (!key) {
  console.log("ℹ️  BRAINTRUST_API_KEY unset — skipping prompt mirror sync.");
  process.exit(0);
}

const headers = {
  Authorization: `Bearer ${key}`,
  "Content-Type": "application/json",
};

// Read SYSTEM_PROMPT straight from the source of truth.
const src = readFileSync(
  resolve(import.meta.dirname, "lib/claude-writer.mjs"),
  "utf-8"
);
const match = src.match(/const SYSTEM_PROMPT = `([\s\S]*?)`;/);
if (!match) {
  console.error("❌ Could not extract SYSTEM_PROMPT from claude-writer.mjs");
  process.exit(1);
}
const SYSTEM_PROMPT = match[1];

async function api(path, opts = {}) {
  const r = await fetch(`${API}${path}`, { headers, ...opts });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`${r.status} ${path}: ${JSON.stringify(j)}`);
  return j;
}

async function main() {
  // Resolve project id by name (project is auto-created on first log).
  const projects = await api("/v1/project");
  const project = (projects.objects || []).find((p) => p.name === PROJECT_NAME);
  if (!project) {
    console.error(`❌ Project "${PROJECT_NAME}" not found in Braintrust.`);
    process.exit(1);
  }

  // Fetch existing mirror, if any, and compare its system message to code.
  const prompts = await api(`/v1/prompt?project_id=${project.id}`);
  const existing = (prompts.objects || []).find((p) => p.slug === PROMPT_SLUG);
  const existingSystem = existing?.prompt_data?.prompt?.messages?.find(
    (m) => m.role === "system"
  )?.content;

  if (existingSystem === SYSTEM_PROMPT) {
    console.log(`✅ Prompt mirror already up to date (${SYSTEM_PROMPT_VERSION}).`);
    return;
  }

  const body = {
    project_id: project.id,
    name: "Blog Writer System Prompt",
    slug: PROMPT_SLUG,
    description: `MIRROR of the blog-agent SYSTEM_PROMPT (scripts/blog-agent/lib/claude-writer.mjs). Source of truth is the repo; runtime does NOT load from here. Version: ${SYSTEM_PROMPT_VERSION}. Iterate in the Playground/Experiments, then port changes back to code.`,
    prompt_data: {
      prompt: {
        type: "chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content:
              "Write a Philippine personal finance article for the target keyword: {{keyword}}\n\n(In production the writer also injects Tavily research and forces structured output via the OUTLINE_TOOL / ARTICLE_TOOL tools.)",
          },
        ],
      },
      options: { model: MODEL, params: { temperature: 1, max_tokens: 32000 } },
    },
  };

  await api("/v1/prompt", { method: "PUT", body: JSON.stringify(body) });
  console.log(
    `🔄 Prompt mirror ${existing ? "updated" : "created"} → ${SYSTEM_PROMPT_VERSION}.`
  );
}

main().catch((err) => {
  // Non-fatal: a sync failure must never break the generation pipeline.
  console.error("⚠️  Prompt mirror sync failed (non-fatal):", err.message);
  process.exit(0);
});
