/**
 * OpenTelemetry bootstrap for Langfuse tracing.
 *
 * Langfuse JS SDK v5 is OTel-based: spans created with @langfuse/tracing are
 * exported by a LangfuseSpanProcessor wired into a NodeSDK. This module must be
 * imported FIRST in every entrypoint (run.mjs, gsc-opportunities.mjs) so the
 * tracer provider is registered before any observation is created.
 *
 * No-op when Langfuse is not configured: when LANGFUSE_PUBLIC_KEY /
 * LANGFUSE_SECRET_KEY are unset (local runs, contributors without a key) the
 * NodeSDK is never started and no OTel code path is exercised.
 */

import { NodeSDK } from "@opentelemetry/sdk-node";
import { LangfuseSpanProcessor } from "@langfuse/otel";

export const LANGFUSE_ENABLED = Boolean(
  process.env.LANGFUSE_PUBLIC_KEY && process.env.LANGFUSE_SECRET_KEY
);

// The processor reads LANGFUSE_* from the environment. Created unconditionally
// (cheap), but only attached to a started SDK when Langfuse is enabled.
export const spanProcessor = LANGFUSE_ENABLED ? new LangfuseSpanProcessor() : null;

const otelSDK =
  LANGFUSE_ENABLED && spanProcessor
    ? new NodeSDK({ spanProcessors: [spanProcessor] })
    : null;

if (otelSDK) otelSDK.start();

/**
 * Flush + shut down the OTel pipeline. REQUIRED for short-lived CLI processes:
 * run.mjs / gsc-opportunities.mjs call process.exit(), which skips the normal
 * beforeExit drain — without this, buffered spans are lost.
 */
export async function shutdownTracing() {
  if (spanProcessor) await spanProcessor.forceFlush();
  if (otelSDK) await otelSDK.shutdown();
}
