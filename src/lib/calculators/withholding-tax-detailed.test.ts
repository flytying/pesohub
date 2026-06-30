import { describe, it, expect } from "vitest";
import { calculateWithholdingTaxDetailed } from "./withholding-tax-detailed";

const allFinite = (obj: object): boolean =>
  Object.values(obj).every((v) =>
    typeof v === "number" ? Number.isFinite(v) : true,
  );

describe("calculateWithholdingTaxDetailed", () => {
  it("produces finite, non-negative figures for a normal monthly salary", () => {
    const r = calculateWithholdingTaxDetailed({
      periodGross: 50_000,
      frequency: "monthly",
      autoEstimateContributions: true,
    });
    expect(r.periodTax).toBeGreaterThanOrEqual(0);
    expect(r.contributions.total).toBeGreaterThan(0);
    expect(allFinite(r)).toBe(true);
    expect(allFinite(r.contributions)).toBe(true);
    // Net cannot exceed gross when there are deductions.
    expect(r.periodNet).toBeLessThanOrEqual(50_000);
  });

  it("treats NaN/negative input defensively (no garbage output)", () => {
    const r = calculateWithholdingTaxDetailed({
      periodGross: NaN,
      taxableAllowances: -500,
      frequency: "monthly",
      autoEstimateContributions: true,
    });
    expect(allFinite(r)).toBe(true);
    expect(allFinite(r.contributions)).toBe(true);
    expect(r.periodTax).toBe(0);
    expect(r.periodTaxable).toBe(0);
  });

  it("is tax-free below the ₱250k annual exemption", () => {
    const r = calculateWithholdingTaxDetailed({
      periodGross: 15_000,
      frequency: "monthly",
      autoEstimateContributions: true,
    });
    expect(r.annualTax).toBe(0);
    expect(r.periodTax).toBe(0);
  });
});
