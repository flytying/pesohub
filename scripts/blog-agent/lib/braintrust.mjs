/**
 * Braintrust online logging — guard layer.
 *
 * Centralizes the enable/disable decision so no other module needs to know
 * whether Braintrust is configured. When BRAINTRUST_API_KEY is unset (local
 * runs, contributors without a key), every export here is a transparent no-op
 * and zero Braintrust code paths are exercised.
 *
 * The SDK does NOT silently no-op on a missing key — initLogger/login throws
 * lazily — so the guard is: never touch the SDK unless the key is present.
 *
 * Project: pesohub-blog-agent (Braintrust dashboard).
 */

import {
  initLogger,
  initDataset,
  wrapAnthropic,
  traced as btTraced,
  flush as btFlush,
} from "braintrust";

const ENABLED = Boolean(process.env.BRAINTRUST_API_KEY);
const PROJECT_NAME = "pesohub-blog-agent";
const DATASET_NAME = "blog-posts";

if (ENABLED) {
  initLogger({
    projectName: PROJECT_NAME,
    apiKey: process.env.BRAINTRUST_API_KEY,
  });
}

// Lazy dataset handle — only created when first used and Braintrust is enabled.
let _dataset = null;
function dataset() {
  if (!ENABLED) return null;
  if (!_dataset) {
    _dataset = initDataset({
      project: PROJECT_NAME,
      dataset: DATASET_NAME,
      apiKey: process.env.BRAINTRUST_API_KEY,
    });
  }
  return _dataset;
}

/**
 * Upsert one record into the "blog-posts" dataset (keyed by `record.id`, so a
 * regenerate/refresh overwrites rather than duplicating). No-op when disabled.
 *
 * @param {{id: string, input: object, expected: object, metadata: object}} record
 */
export function upsertDatasetRecord(record) {
  const ds = dataset();
  if (ds) ds.insert(record);
}

/**
 * Wrap an Anthropic client for auto-tracing when enabled; otherwise return it
 * untouched so call sites are identical with or without Braintrust.
 */
export function maybeWrapAnthropic(client) {
  return ENABLED ? wrapAnthropic(client) : client;
}

/**
 * Run `fn` inside a top-level span when enabled, else call `fn(null)`.
 * Callers must null-check the span (use logSpan()).
 *
 * @param {string} name
 * @param {(span: object|null) => Promise<any>} fn
 */
export async function tracedGeneration(name, fn) {
  if (!ENABLED) return fn(null);
  return btTraced((span) => fn(span), { name });
}

/**
 * Attach input/output/scores/metadata to a span. No-op when disabled or when
 * the span is null. Braintrust scores must be in the range 0..1.
 */
export function logSpan(span, payload) {
  if (span) span.log(payload);
}

/**
 * Flush buffered traces. REQUIRED for short-lived CLI processes: the
 * beforeExit handler installed by initLogger does NOT fire on process.exit(),
 * which run.mjs calls — so without an explicit flush, traces are lost.
 */
export async function flushBraintrust() {
  if (ENABLED) await btFlush();
  if (_dataset) await _dataset.flush();
}

export const BRAINTRUST_ENABLED = ENABLED;
