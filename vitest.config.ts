import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Minimal Vitest setup for the pure calculator libraries. Kept separate from the
// Next.js build (does not affect `output: 'export'`). The `@` alias mirrors the
// tsconfig path so calculators that import `@/lib/...` resolve under test.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
