import { describe, it, expect } from "vitest";
import { calculateTimeDeposit, calculateForTerm } from "./time-deposit";
import type { CalcError } from "./math-utils";

const isError = (r: unknown): r is CalcError =>
  typeof r === "object" && r !== null && "error" in r;

describe("calculateTimeDeposit", () => {
  it("applies the default 20% final withholding tax on simple interest", () => {
    const r = calculateTimeDeposit({
      depositAmount: 100_000,
      annualRate: 5,
      term: 1,
      termUnit: "years",
    });
    expect(isError(r)).toBe(false);
    if (isError(r)) return;
    expect(r.grossInterest).toBeCloseTo(5_000, 2);
    expect(r.taxOnInterest).toBeCloseTo(1_000, 2);
    expect(r.afterTaxInterest).toBeCloseTo(4_000, 2);
    expect(r.grossMaturityAmount).toBeCloseTo(105_000, 2);
    expect(r.netMaturityValue).toBeCloseTo(104_000, 2);
    expect(r.taxRate).toBe(0.2);
  });

  it.each([
    [{ depositAmount: 0, annualRate: 5, term: 1, termUnit: "years" as const }],
    [{ depositAmount: 100_000, annualRate: -1, term: 1, termUnit: "years" as const }],
    [{ depositAmount: 100_000, annualRate: 5, term: 0, termUnit: "years" as const }],
    [{ depositAmount: NaN, annualRate: 5, term: 1, termUnit: "years" as const }],
    [{ depositAmount: 100_000, annualRate: 5, term: -3, termUnit: "months" as const }],
  ])("rejects invalid input %j", (input) => {
    expect(isError(calculateTimeDeposit(input))).toBe(true);
  });

  // Compound-interest values are hand-computed from
  // Interest = P × ((1 + r/n)^(n×t) − 1), independent of the implementation.
  it("compounds monthly: ₱100k @ 6% for 1 year → ₱6,167.78 gross", () => {
    const r = calculateTimeDeposit({
      depositAmount: 100_000,
      annualRate: 6,
      term: 1,
      termUnit: "years",
      method: "monthly",
    });
    if (isError(r)) throw new Error(r.error);
    expect(r.grossInterest).toBeCloseTo(6_167.78, 2); // (1.005)^12 − 1
    expect(r.taxOnInterest).toBeCloseTo(1_233.56, 2);
    expect(r.netMaturityValue).toBeCloseTo(104_934.22, 2);
  });

  it("compounds quarterly: ₱100k @ 8% for 2 years → ₱17,165.94 gross", () => {
    const r = calculateTimeDeposit({
      depositAmount: 100_000,
      annualRate: 8,
      term: 2,
      termUnit: "years",
      method: "quarterly",
    });
    if (isError(r)) throw new Error(r.error);
    expect(r.grossInterest).toBeCloseTo(17_165.94, 2); // (1.02)^8 − 1
  });

  it("compounds annually: ₱50k @ 5% for 3 years → ₱7,881.25 gross", () => {
    const r = calculateTimeDeposit({
      depositAmount: 50_000,
      annualRate: 5,
      term: 3,
      termUnit: "years",
      method: "annual",
    });
    if (isError(r)) throw new Error(r.error);
    expect(r.grossInterest).toBeCloseTo(7_881.25, 2); // (1.05)^3 − 1
    expect(r.netMaturityValue).toBeCloseTo(56_305, 2);
  });

  it("converts day and month terms (365-day year)", () => {
    const days = calculateTimeDeposit({
      depositAmount: 100_000,
      annualRate: 5,
      term: 180,
      termUnit: "days",
    });
    if (isError(days)) throw new Error(days.error);
    expect(days.grossInterest).toBeCloseTo(2_465.75, 2); // 5% × 180/365

    const months = calculateTimeDeposit({
      depositAmount: 100_000,
      annualRate: 5,
      term: 6,
      termUnit: "months",
    });
    if (isError(months)) throw new Error(months.error);
    expect(months.grossInterest).toBeCloseTo(2_500, 2); // 5% × 6/12
    expect(months.termInMonths).toBe(6);
  });

  it("honors a custom tax rate (0% and 25%)", () => {
    const taxFree = calculateTimeDeposit({
      depositAmount: 100_000,
      annualRate: 5,
      term: 1,
      termUnit: "years",
      taxRate: 0,
    });
    if (isError(taxFree)) throw new Error(taxFree.error);
    expect(taxFree.taxOnInterest).toBe(0);
    expect(taxFree.afterTaxInterest).toBe(taxFree.grossInterest);

    const heavy = calculateTimeDeposit({
      depositAmount: 100_000,
      annualRate: 5,
      term: 1,
      termUnit: "years",
      taxRate: 0.25,
    });
    if (isError(heavy)) throw new Error(heavy.error);
    expect(heavy.taxOnInterest).toBeCloseTo(1_250, 2);
  });

  it("annualises the effective after-tax return", () => {
    const oneYear = calculateTimeDeposit({
      depositAmount: 100_000,
      annualRate: 5,
      term: 1,
      termUnit: "years",
    });
    if (isError(oneYear)) throw new Error(oneYear.error);
    expect(oneYear.effectiveAfterTaxReturn).toBeCloseTo(4, 2); // 5% × 80%

    const twoYears = calculateTimeDeposit({
      depositAmount: 100_000,
      annualRate: 5,
      term: 2,
      termUnit: "years",
    });
    if (isError(twoYears)) throw new Error(twoYears.error);
    // Net 108,000 over 2 years → √1.08 − 1 ≈ 3.92%/yr
    expect(twoYears.effectiveAfterTaxReturn).toBeCloseTo(3.92, 2);
  });

  it("calculateForTerm matches calculateTimeDeposit for the same months", () => {
    const wrapped = calculateForTerm(100_000, 5, 12);
    const direct = calculateTimeDeposit({
      depositAmount: 100_000,
      annualRate: 5,
      term: 12,
      termUnit: "months",
    });
    expect(wrapped).toEqual(direct);
  });

  it("keeps rounded figures self-consistent (tax on rounded gross)", () => {
    // Odd inputs that force fractional centavos at every step.
    const r = calculateTimeDeposit({
      depositAmount: 123_456.78,
      annualRate: 4.37,
      term: 217,
      termUnit: "days",
      method: "monthly",
    });
    if (isError(r)) throw new Error(r.error);
    expect(r.afterTaxInterest).toBeCloseTo(r.grossInterest - r.taxOnInterest, 10);
    expect(r.netMaturityValue).toBeCloseTo(r.principal + r.afterTaxInterest, 10);
    expect(r.grossMaturityAmount).toBeCloseTo(r.principal + r.grossInterest, 10);
  });

  it("stays finite for a very large deposit", () => {
    const r = calculateTimeDeposit({
      depositAmount: 1e12,
      annualRate: 5,
      term: 5,
      termUnit: "years",
      method: "monthly",
    });
    if (isError(r)) throw new Error(r.error);
    expect(Number.isFinite(r.netMaturityValue)).toBe(true);
    expect(r.netMaturityValue).toBeGreaterThan(1e12);
  });
});
