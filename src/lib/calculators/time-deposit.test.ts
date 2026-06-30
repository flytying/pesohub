import { describe, it, expect } from "vitest";
import { calculateTimeDeposit } from "./time-deposit";
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
  ])("rejects invalid input %j", (input) => {
    expect(isError(calculateTimeDeposit(input))).toBe(true);
  });
});
