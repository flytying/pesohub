import { describe, it, expect } from "vitest";
import { calculateThirteenthMonthPay } from "./thirteenth-month";
import type { CalcError } from "./math-utils";

const isError = (r: unknown): r is CalcError =>
  typeof r === "object" && r !== null && "error" in r;

describe("calculateThirteenthMonthPay", () => {
  it("equals one month's salary for a full year worked", () => {
    const r = calculateThirteenthMonthPay({
      monthlyBasicSalary: 20_000,
      monthsWorked: 12,
      computationType: "full_year",
    });
    expect(isError(r)).toBe(false);
    if (isError(r)) return;
    expect(r.totalBasicSalaryEarned).toBe(240_000);
    expect(r.thirteenthMonthPay).toBe(20_000);
  });

  it("prorates for a partial year", () => {
    const r = calculateThirteenthMonthPay({
      monthlyBasicSalary: 20_000,
      monthsWorked: 6,
      computationType: "prorated",
    });
    if (isError(r)) throw new Error("unexpected error");
    expect(r.thirteenthMonthPay).toBe(10_000);
  });

  it("clamps months worked to a maximum of 12", () => {
    const r = calculateThirteenthMonthPay({
      monthlyBasicSalary: 20_000,
      monthsWorked: 18,
      computationType: "full_year",
    });
    if (isError(r)) throw new Error("unexpected error");
    expect(r.monthsWorked).toBe(12);
    expect(r.thirteenthMonthPay).toBe(20_000);
  });

  it.each([
    [{ monthlyBasicSalary: -1, monthsWorked: 12, computationType: "full_year" as const }],
    [{ monthlyBasicSalary: NaN, monthsWorked: 12, computationType: "full_year" as const }],
    [{ monthlyBasicSalary: 20_000, monthsWorked: -1, computationType: "full_year" as const }],
  ])("rejects invalid input %j", (input) => {
    expect(isError(calculateThirteenthMonthPay(input))).toBe(true);
  });
});
