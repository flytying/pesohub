/**
 * Langfuse observability — guard layer.
 *
 * Centralizes the enable/disable decision so no other module needs to know
 * whether Langfuse is configured. When LANGFUSE_PUBLIC_KEY / LANGFUSE_SECRET_KEY
 * are unset (local runs, contributors without keys), every export here is a
 * transparent no-op and zero Langfuse code paths are exercised.
 *
 * Replaces the former Braintrust guard (lib/braintrust.mjs). Langfuse JS SDK v5
 * is OTel-based — tracing comes from instrumentation.mjs (must be imported first
 * in each entrypoint); this module adds the client-side surface (prompts,
 * datasets, scores) plus thin span/score helpers used at call sites.
 *
 * Project: PesoHub blog-agent (Langfuse Cloud).
 */

import { LangfuseClient } from "@langfuse/client";
import {
  startActiveObservation,
  startObservation,
} from "@langfuse/tracing";
import { LANGFUSE_ENABLED, shutdownTracing } from "./instrumentation.mjs";

export { LANGFUSE_ENABLED };

const PROMPT_LABEL = "production";

// ── Client singleton ─────────────────────────────────────────────────────────
let _client = null;
function client() {
  if (!LANGFUSE_ENABLED) return null;
  if (!_client) _client = new LangfuseClient(); // reads LANGFUSE_* from env
  return _client;
}

// ── Tracing ──────────────────────────────────────────────────────────────────

/**
 * Run `fn` inside a top-level span when enabled, else call `fn(null)`.
 * Callers must null-check the span (use logSpan()/logScore()).
 *
 * @param {string} name
 * @param {(span: object|null) => Promise<any>} fn
 */
export async function tracedGeneration(name, fn) {
  if (!LANGFUSE_ENABLED) return fn(null);
  return startActiveObservation(name, (span) => fn(span));
}

/**
 * Attach input/output/metadata to a span. No-op when disabled or span is null.
 * (Scores are first-class in Langfuse — use logScore(), not this.)
 */
export function logSpan(span, payload) {
  if (!span || !payload) return;
  const { input, output, metadata } = payload;
  span.update({
    ...(input !== undefined ? { input } : {}),
    ...(output !== undefined ? { output } : {}),
    ...(metadata !== undefined ? { metadata } : {}),
  });
}

/**
 * Attach a numeric/categorical score to the span's trace. No-op when disabled.
 *
 * @param {object|null} span  the span from tracedGeneration()
 * @param {string} name
 * @param {number|string} value
 * @param {{comment?: string, dataType?: "NUMERIC"|"CATEGORICAL"|"BOOLEAN"}} [opts]
 */
export function logScore(span, name, value, opts = {}) {
  const c = client();
  if (!c || !span) return;
  c.score.observation(
    { otelSpan: span },
    { name, value, ...(opts.comment ? { comment: opts.comment } : {}), ...(opts.dataType ? { dataType: opts.dataType } : {}) }
  );
}

/**
 * Trace one LLM call as a child `generation` observation. Captures model,
 * input, prompt linkage, output text and token usage. When disabled, just runs
 * `fn` with no tracing overhead.
 *
 * @param {string} name
 * @param {{model?: string, input?: any, prompt?: object}} meta
 * @param {() => Promise<import("@anthropic-ai/sdk").Anthropic.Message>} fn  resolves to an Anthropic message
 * @returns {Promise<import("@anthropic-ai/sdk").Anthropic.Message>}
 */
export async function observeGeneration(name, meta, fn) {
  if (!LANGFUSE_ENABLED) return fn();
  const gen = startObservation(
    name,
    {
      ...(meta.model ? { model: meta.model } : {}),
      ...(meta.input !== undefined ? { input: meta.input } : {}),
      ...(meta.prompt ? { prompt: meta.prompt } : {}),
    },
    { asType: "generation" }
  );
  try {
    const msg = await fn();
    gen.update({
      output: extractText(msg),
      ...(msg?.usage
        ? { usageDetails: { input: msg.usage.input_tokens, output: msg.usage.output_tokens } }
        : {}),
    });
    return msg;
  } finally {
    gen.end();
  }
}

function extractText(msg) {
  if (!msg?.content) return undefined;
  const tool = msg.content.find((b) => b.type === "tool_use");
  if (tool) return tool.input;
  const text = msg.content.find((b) => b.type === "text");
  return text?.text;
}

// ── Prompt management (canonical in Langfuse, committed code fallback) ────────

/**
 * Fetch a managed prompt (production label) with a committed fallback. Returns
 * an object with `.compile(vars)` and an optional `.handle` (the Langfuse
 * TextPromptClient, used to link a generation to its prompt version).
 *
 * When disabled, returns a local shim that interpolates the fallback text — so
 * runs without Langfuse keys behave identically.
 *
 * @param {string} name
 * @param {string} fallbackText
 */
export async function getPrompt(name, fallbackText) {
  const c = client();
  if (c) {
    try {
      const handle = await c.prompt.get(name, {
        type: "text",
        label: PROMPT_LABEL,
        fallback: fallbackText,
      });
      return { compile: (vars) => handle.compile(vars), handle };
    } catch {
      // Fall through to the local shim on any fetch error.
    }
  }
  return { compile: (vars) => interpolate(fallbackText, vars), handle: null };
}

/** Mustache-style {{ var }} interpolation matching Langfuse's compile(). */
function interpolate(text, vars = {}) {
  return text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
    const v = vars[key];
    return v == null ? "" : typeof v === "string" ? v : JSON.stringify(v);
  });
}

/**
 * Push a text prompt to Langfuse under `name`, labelled production. Versions on
 * each call with the same name. No-op (returns false) when disabled.
 */
export async function upsertPrompt(name, promptText) {
  const c = client();
  if (!c) return false;
  await c.prompt.create({
    name,
    type: "text",
    prompt: promptText,
    labels: [PROMPT_LABEL],
  });
  return true;
}

// ── Datasets ─────────────────────────────────────────────────────────────────

const _ensured = new Set();
async function ensureDataset(c, name) {
  if (_ensured.has(name)) return;
  try {
    await c.api.datasets.create({ name });
  } catch {
    // Already exists — fine.
  }
  _ensured.add(name);
}

/**
 * Upsert one record (keyed by `id`) into a dataset. No-op when disabled.
 * @param {string} datasetName
 * @param {{id: string, input: object, expected?: object, metadata?: object}} record
 */
async function upsertRecord(datasetName, record) {
  const c = client();
  if (!c) return;
  await ensureDataset(c, datasetName);
  await c.dataset.createItem({
    datasetName,
    id: record.id,
    input: record.input,
    ...(record.expected !== undefined ? { expectedOutput: record.expected } : {}),
    ...(record.metadata !== undefined ? { metadata: record.metadata } : {}),
  });
}

export const BLOG_POSTS_DATASET = "blog-posts";
export const GSC_OPPORTUNITIES_DATASET = "gsc-opportunities";

/** Upsert into the "blog-posts" dataset. */
export function upsertBlogPostRecord(record) {
  return upsertRecord(BLOG_POSTS_DATASET, record);
}

/** Upsert into the "gsc-opportunities" dataset. */
export function upsertOpportunityRecord(record) {
  return upsertRecord(GSC_OPPORTUNITIES_DATASET, record);
}

// ── Flush ────────────────────────────────────────────────────────────────────

/**
 * Flush client-side events (scores, dataset items) and the OTel span pipeline.
 * REQUIRED before process.exit() in the short-lived CLI entrypoints.
 */
export async function flush() {
  const c = client();
  if (c) await c.flush();
  await shutdownTracing();
}
