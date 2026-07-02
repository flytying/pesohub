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

  // The same monthly-equivalent salary must produce the same annual tax
  // regardless of pay frequency, and the period tax must be annual ÷ periods.
  describe("pay-frequency annualization", () => {
    const monthly = calculateWithholdingTaxDetailed({
      periodGross: 50_000,
      frequency: "monthly",
      autoEstimateContributions: true,
    });

    it.each([
      ["semi-monthly" as const, 25_000, 24],
      ["weekly" as const, (50_000 * 12) / 52, 52],
      ["daily" as const, (50_000 * 12) / 260, 260],
    ])("%s pay matches the monthly annual tax", (frequency, periodGross, periods) => {
      const r = calculateWithholdingTaxDetailed({
        periodGross,
        frequency,
        autoEstimateContributions: true,
      });
      expect(r.annualTax).toBeCloseTo(monthly.annualTax, 2);
      expect(r.periodTax).toBeCloseTo(monthly.annualTax / periods, 2);
      expect(r.monthlyTax).toBeCloseTo(monthly.monthlyTax, 2);
    });
  });

  describe("allowances", () => {
    const base = calculateWithholdingTaxDetailed({
      periodGross: 50_000,
      frequency: "monthly",
      autoEstimateContributions: true,
    });

    it("adds taxable allowances to the tax base", () => {
      const r = calculateWithholdingTaxDetailed({
        periodGross: 50_000,
        taxableAllowances: 5_000,
        frequency: "monthly",
        autoEstimateContributions: true,
      });
      // Taxable = 55,000 − 3,200 contribs = 51,800/mo → annual 621,600
      // Tax = 22,500 + 20% × 221,600 = ₱66,820 (TRAIN, RR 11-2018)
      expect(r.annualTaxable).toBe(621_600);
      expect(r.annualTax).toBe(66_820);
      expect(r.annualTax).toBeGreaterThan(base.annualTax);
    });

    it("excludes tax-exempt allowances from tax but includes them in net pay", () => {
      const r = calculateWithholdingTaxDetailed({
        periodGross: 50_000,
        taxExemptAllowances: 5_000,
        frequency: "monthly",
        autoEstimateContributions: true,
      });
      expect(r.annualTax).toBe(base.annualTax);
      expect(r.periodNet).toBeCloseTo(base.periodNet + 5_000, 2);
    });
  });

  it("manual contributions equal to the auto estimate give the same tax", () => {
    const auto = calculateWithholdingTaxDetailed({
      periodGross: 50_000,
      frequency: "monthly",
      autoEstimateContributions: true,
    });
    const manual = calculateWithholdingTaxDetailed({
      periodGross: 50_000,
      frequency: "monthly",
      autoEstimateContributions: false,
      sss: 1_750,
      philhealth: 1_250,
      pagibig: 200,
    });
    expect(manual.contributions).toEqual(auto.contributions);
    expect(manual.annualTax).toBe(auto.annualTax);
    expect(manual.periodNet).toBeCloseTo(auto.periodNet, 2);
  });

  it("floors the taxable amount at zero when contributions exceed gross", () => {
    // At a tiny gross the SSS/PhilHealth minimums exceed the salary itself.
    const r = calculateWithholdingTaxDetailed({
      periodGross: 100,
      frequency: "monthly",
      autoEstimateContributions: true,
    });
    expect(r.periodTaxable).toBe(0);
    expect(r.annualTax).toBe(0);
  });
});
