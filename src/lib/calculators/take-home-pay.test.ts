import { describe, it, expect } from "vitest";
import {
  calculateTakeHomePay,
  lookupSSSEmployeeShare,
  calculatePhilHealthEmployee,
  calculatePagIBIGEmployee,
} from "./take-home-pay";
import { calculateWithholdingTaxDetailed } from "./withholding-tax-detailed";

describe("calculatePhilHealthEmployee (5% premium, 50/50 split)", () => {
  it.each([
    [5_000, 250], //   below floor → clamped to ₱10,000 → 2.5%
    [10_000, 250], //  floor
    [35_000, 875], //  mid
    [100_000, 2_500], //ceiling
    [200_000, 2_500], //above ceiling → clamped
  ])("salary %d → ₱%d", (salary, share) => {
    expect(calculatePhilHealthEmployee(salary)).toBe(share);
  });
});

describe("calculatePagIBIGEmployee (1% ≤₱1,500 else 2%, ₱10k MSC cap)", () => {
  it.each([
    [1_500, 15], //  1% tier boundary
    [1_501, 30.02], //2% tier just above
    [3_000, 60], //  2%
    [10_000, 200], //cap
    [12_000, 200], //above cap → ₱200 max
  ])("salary %d → ₱%d", (salary, share) => {
    expect(calculatePagIBIGEmployee(salary)).toBe(share);
  });
});

describe("lookupSSSEmployeeShare (5% of MSC, ₱5k–₱35k)", () => {
  it("clamps below the floor to the minimum MSC share", () => {
    expect(lookupSSSEmployeeShare(1_000)).toBe(250); // 5% of ₱5,000
  });
  it("matches the bracket for a mid salary", () => {
    expect(lookupSSSEmployeeShare(15_000)).toBe(750); // 5% of ₱15,000
  });
  it("caps above the ceiling at the maximum MSC share", () => {
    expect(lookupSSSEmployeeShare(50_000)).toBe(1_750); // 5% of ₱35,000
    expect(lookupSSSEmployeeShare(200_000)).toBe(1_750);
  });
});

describe("calculateTakeHomePay", () => {
  it("taxes the income net of mandatory contributions (not gross)", () => {
    const r = calculateTakeHomePay({ monthlySalary: 50_000 });
    expect(r.sssContribution).toBe(1_750);
    expect(r.philhealthContribution).toBe(1_250);
    expect(r.pagibigContribution).toBe(200);
    // Taxable = 50,000 − 3,200 = 46,800/mo → annual 561,600 → ₱54,820/yr → ₱4,568.33/mo
    expect(r.withholdingTax).toBeCloseTo(4_568.33, 2);
    expect(r.totalDeductions).toBeCloseTo(7_768.33, 2);
    expect(r.takeHomePay).toBeCloseTo(42_231.67, 2);
  });

  it("agrees with the detailed withholding calculator (auto-estimate, no allowances)", () => {
    const simple = calculateTakeHomePay({ monthlySalary: 50_000 });
    const detailed = calculateWithholdingTaxDetailed({
      periodGross: 50_000,
      frequency: "monthly",
      autoEstimateContributions: true,
    });
    expect(simple.withholdingTax).toBeCloseTo(detailed.monthlyTax, 2);
    expect(simple.sssContribution).toBe(detailed.contributions.sss);
    expect(simple.philhealthContribution).toBe(detailed.contributions.philhealth);
    expect(simple.pagibigContribution).toBe(detailed.contributions.pagibig);
  });

  it("is tax-free for a low salary (taxable below ₱250k annual)", () => {
    const r = calculateTakeHomePay({ monthlySalary: 15_000 });
    expect(r.withholdingTax).toBe(0);
    expect(r.takeHomePay).toBeGreaterThan(0);
  });

  it("clamps NaN/negative salary to the zero-salary result (no crash, all finite)", () => {
    // Note: the SSS/PhilHealth floors still apply at ₱0, so take-home is the
    // (negative) floor-deduction figure — documented here, not a runtime error.
    const zero = calculateTakeHomePay({ monthlySalary: 0 });
    expect(Number.isFinite(zero.takeHomePay)).toBe(true);
    expect(calculateTakeHomePay({ monthlySalary: NaN }).takeHomePay).toBe(zero.takeHomePay);
    expect(calculateTakeHomePay({ monthlySalary: -5_000 }).takeHomePay).toBe(zero.takeHomePay);
  });
});
