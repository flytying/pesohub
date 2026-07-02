import { describe, it, expect } from "vitest";
import { calculateWithholdingTax } from "./tax";

// TRAIN Law annual brackets (RR 11-2018, effective 2023+). Golden anchors are the
// cumulative tax at each bracket floor — these change only if the law changes.
describe("calculateWithholdingTax — TRAIN brackets", () => {
  it.each([
    [250_000, 0], //          top of 0% bracket
    [400_000, 22_500], //     0 + 15% of 150k
    [800_000, 102_500], //    22,500 + 20% of 400k
    [2_000_000, 402_500], //  102,500 + 25% of 1.2M
    [8_000_000, 2_202_500], //402,500 + 30% of 6M
    [10_000_000, 2_902_500], //2,202,500 + 35% of 2M
  ])("annual %d → annual tax %d", (income, expected) => {
    expect(calculateWithholdingTax({ annualTaxableIncome: income }).annualTax).toBe(expected);
  });

  // One peso either side of every bracket floor: the marginal rate must apply
  // only to the excess over the floor.
  it.each([
    [249_999, 0],
    [250_001, 0.15], //       15% of ₱1
    [400_001, 22_500.2], //   20% of ₱1
    [800_001, 102_500.25], // 25% of ₱1
    [2_000_001, 402_500.3], //30% of ₱1
    [8_000_001, 2_202_500.35], // 35% of ₱1
  ])("annual %d → annual tax %d (±₱1 bracket edge)", (income, expected) => {
    expect(
      calculateWithholdingTax({ annualTaxableIncome: income }).annualTax,
    ).toBeCloseTo(expected, 2);
  });

  it("is tax-free up to and including ₱250,000 (bracket uses > floor)", () => {
    expect(calculateWithholdingTax({ annualTaxableIncome: 250_000 }).annualTax).toBe(0);
    // Just over the threshold → 15% of the excess.
    expect(calculateWithholdingTax({ annualTaxableIncome: 250_100 }).annualTax).toBe(15);
  });

  it("derives annual income from monthlySalary × 12", () => {
    const fromMonthly = calculateWithholdingTax({ monthlySalary: 50_000 });
    const fromAnnual = calculateWithholdingTax({ annualTaxableIncome: 600_000 });
    expect(fromMonthly.annualTax).toBe(fromAnnual.annualTax);
    expect(fromMonthly.monthlyTax).toBe(fromAnnual.monthlyTax);
  });

  it("reports effective rate and take-home consistently", () => {
    const r = calculateWithholdingTax({ annualTaxableIncome: 600_000 });
    expect(r.annualTax).toBe(62_500); // 22,500 + 20% of 200k
    expect(r.monthlyTax).toBeCloseTo(5_208.33, 2);
    expect(r.effectiveRate).toBeCloseTo(10.42, 2);
    expect(r.takeHomePay).toBe(537_500);
  });

  it("treats zero/negative income as the 0% bracket", () => {
    expect(calculateWithholdingTax({ annualTaxableIncome: 0 }).annualTax).toBe(0);
    expect(calculateWithholdingTax({ annualTaxableIncome: -5_000 }).annualTax).toBe(0);
  });

  it("throws when neither input is provided", () => {
    expect(() => calculateWithholdingTax({})).toThrow(/annualTaxableIncome or monthlySalary/);
  });
});
