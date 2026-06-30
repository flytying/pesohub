import { describe, it, expect } from "vitest";
import { computeSSSPension, PENSION_INCREASE } from "./sss-pension-formula";

describe("computeSSSPension (RA 11199)", () => {
  it("adds the ₱1,000 across-the-board increase on top of the governing formula", () => {
    const r = computeSSSPension(20_000, 10);
    // f1 = 4,300 · f2 = 8,000 · f3 = 1,200 → f2 governs
    expect(r.base).toBe(8_000);
    expect(r.governs).toBe(1);
    expect(r.pension).toBe(8_000 + PENSION_INCREASE);
  });

  it("lets formula 1 govern at high credited years of service", () => {
    const r = computeSSSPension(20_000, 30);
    expect(r.base).toBe(12_300);
    expect(r.governs).toBe(0);
    expect(r.pension).toBe(13_300);
  });

  it("enforces the ₱1,200 statutory minimum for 10–19 CYS", () => {
    const r = computeSSSPension(2_000, 10);
    expect(r.f3).toBe(1_200);
    expect(r.base).toBe(1_200);
    expect(r.governs).toBe(2);
    expect(r.pension).toBe(2_200);
  });

  it("enforces the ₱2,400 statutory minimum for 20+ CYS", () => {
    const r = computeSSSPension(2_000, 20);
    expect(r.f3).toBe(2_400);
  });
});
