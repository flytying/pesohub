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
});
