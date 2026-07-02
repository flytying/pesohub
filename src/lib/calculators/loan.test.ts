import { describe, it, expect } from "vitest";
import { calculateLoan } from "./loan";
import type { CalcError } from "./math-utils";

const isError = (r: unknown): r is CalcError =>
  typeof r === "object" && r !== null && "error" in r;

describe("calculateLoan", () => {
  it("computes a zero-interest loan as principal / term", () => {
    const r = calculateLoan({ principal: 100_000, annualInterestRate: 0, termMonths: 10 });
    expect(isError(r)).toBe(false);
    if (isError(r)) return;
    expect(r.monthlyPayment).toBe(10_000);
    expect(r.totalPayment).toBe(100_000);
    expect(r.totalInterest).toBe(0);
    expect(r.schedule).toHaveLength(10);
  });

  it("amortizes an interest-bearing loan and fully repays it", () => {
    const r = calculateLoan({ principal: 120_000, annualInterestRate: 12, termMonths: 12 });
    expect(isError(r)).toBe(false);
    if (isError(r)) return;
    expect(r.monthlyPayment).toBeGreaterThan(10_000);
    expect(r.totalInterest).toBeGreaterThan(0);
    expect(r.schedule).toHaveLength(12);
    // Final balance should be paid off (rounded to the cent).
    expect(r.schedule[11].balance).toBeCloseTo(0, 2);
    expect(r.totalPayment).toBeCloseTo(120_000 + r.totalInterest, 0);
  });

  it.each([
    [{ principal: 0, annualInterestRate: 5, termMonths: 12 }],
    [{ principal: -1, annualInterestRate: 5, termMonths: 12 }],
    [{ principal: 100_000, annualInterestRate: -1, termMonths: 12 }],
    [{ principal: 100_000, annualInterestRate: 5, termMonths: 0 }],
    [{ principal: NaN, annualInterestRate: 5, termMonths: 12 }],
  ])("rejects invalid input %j", (input) => {
    expect(isError(calculateLoan(input))).toBe(true);
  });

  it("matches the textbook annuity payment (₱1M @ 12% for 12 months → ₱88,848.79)", () => {
    // Standard reference value for 1% monthly over 12 months.
    const r = calculateLoan({ principal: 1_000_000, annualInterestRate: 12, termMonths: 12 });
    if (isError(r)) throw new Error(r.error);
    expect(r.monthlyPayment).toBeCloseTo(88_848.79, 2);
  });

  it("amortizes a 30-year home loan to zero", () => {
    const r = calculateLoan({ principal: 3_000_000, annualInterestRate: 6.5, termMonths: 360 });
    if (isError(r)) throw new Error(r.error);
    expect(r.schedule).toHaveLength(360);
    expect(r.schedule[359].balance).toBeCloseTo(0, 2);
    expect(r.totalPayment).toBeCloseTo(3_000_000 + r.totalInterest, 0);
    // Every scheduled payment reduces the balance monotonically.
    for (let i = 1; i < r.schedule.length; i++) {
      expect(r.schedule[i].balance).toBeLessThanOrEqual(r.schedule[i - 1].balance);
    }
  });

  it("handles a high rate (36%) without drift", () => {
    const r = calculateLoan({ principal: 100_000, annualInterestRate: 36, termMonths: 24 });
    if (isError(r)) throw new Error(r.error);
    expect(r.schedule[23].balance).toBeCloseTo(0, 2);
    expect(r.totalInterest).toBeGreaterThan(0);
    expect(Number.isFinite(r.monthlyPayment)).toBe(true);
  });

  it("handles a very large principal (₱50M) without floating-point drift", () => {
    const r = calculateLoan({ principal: 50_000_000, annualInterestRate: 7, termMonths: 240 });
    if (isError(r)) throw new Error(r.error);
    expect(r.schedule[239].balance).toBeCloseTo(0, 2);
    const scheduledInterest = r.schedule.reduce((sum, row) => sum + row.interest, 0);
    expect(scheduledInterest).toBeCloseTo(r.totalInterest, 0);
  });
});
