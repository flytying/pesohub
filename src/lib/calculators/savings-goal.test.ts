import { describe, it, expect } from "vitest";
import { calculateMonthlySavings } from "./savings-goal";

describe("calculateMonthlySavings", () => {
  it("spreads the remaining amount evenly at 0% interest", () => {
    const r = calculateMonthlySavings(100_000, 0, 10, 0);
    expect(r.monthly).toBe(10_000);
    expect(r.totalContributions).toBe(100_000);
    expect(r.interestEarned).toBe(0);
  });

  it("needs nothing when the starting balance already meets the goal", () => {
    const r = calculateMonthlySavings(100_000, 120_000, 12, 5);
    expect(r).toEqual({ monthly: 0, totalContributions: 0, interestEarned: 0 });
  });

  it("requires the full remaining amount up front when months is 0", () => {
    const r = calculateMonthlySavings(100_000, 20_000, 0, 5);
    expect(r.monthly).toBe(80_000);
    expect(r.totalContributions).toBe(80_000);
  });

  it("lowers the monthly need when interest compounds", () => {
    const withInterest = calculateMonthlySavings(100_000, 0, 12, 3);
    const noInterest = calculateMonthlySavings(100_000, 0, 12, 0);
    expect(withInterest.monthly).toBeLessThan(noInterest.monthly);
    expect(withInterest.monthly).toBeCloseTo(8_219.4, 0); // FV-of-annuity at 0.25%/mo
    expect(withInterest.interestEarned).toBeGreaterThan(0);
  });

  it("never returns negative figures", () => {
    const r = calculateMonthlySavings(100_000, 0, 12, 3);
    expect(r.monthly).toBeGreaterThanOrEqual(0);
    expect(r.totalContributions).toBeGreaterThanOrEqual(0);
    expect(r.interestEarned).toBeGreaterThanOrEqual(0);
  });
});
