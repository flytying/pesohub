import { describe, it, expect } from "vitest";
import { calculateWithholdingTax } from "./tax";
import {
  calculatePhilHealthEmployee,
  calculatePagIBIGEmployee,
  lookupSSSEmployeeShare,
} from "./take-home-pay";
import { computeSSSContribution } from "./sss-contribution-wisp";
import { computeSSSPension } from "./sss-pension-formula";

// ---------------------------------------------------------------------------
// Official-rate regression guards. Each assertion pins an encoded PH rule to its
// official value. A failure here means a rate/table changed — confirm against the
// source + bump the corresponding src/data/government/* UPDATED_AT before editing.
// Sources verified 2026-06-30 (see docs/known-issues.md for staleness cadence).
// ---------------------------------------------------------------------------

describe("BIR withholding tax — TRAIN (RR 11-2018, effective 2023+)", () => {
  it("keeps the statutory cumulative tax at each bracket floor", () => {
    expect(calculateWithholdingTax({ annualTaxableIncome: 250_000 }).annualTax).toBe(0);
    expect(calculateWithholdingTax({ annualTaxableIncome: 400_000 }).annualTax).toBe(22_500);
    expect(calculateWithholdingTax({ annualTaxableIncome: 800_000 }).annualTax).toBe(102_500);
    expect(calculateWithholdingTax({ annualTaxableIncome: 2_000_000 }).annualTax).toBe(402_500);
    expect(calculateWithholdingTax({ annualTaxableIncome: 8_000_000 }).annualTax).toBe(2_202_500);
  });
});

describe("PhilHealth — 5% premium, 50/50 split (Circular 2019-0009)", () => {
  it("floors at ₱250 (₱10k base) and ceilings at ₱2,500 (₱100k base)", () => {
    expect(calculatePhilHealthEmployee(10_000)).toBe(250);
    expect(calculatePhilHealthEmployee(100_000)).toBe(2_500);
  });
});

describe("Pag-IBIG — 1%/2% tiers, ₱10k MSC cap (HDMF Circular 460, Feb 2024)", () => {
  it("caps the employee share at ₱200/month", () => {
    expect(calculatePagIBIGEmployee(1_500)).toBe(15); // 1% tier
    expect(calculatePagIBIGEmployee(10_000)).toBe(200); // cap
    expect(calculatePagIBIGEmployee(99_999)).toBe(200);
  });
});

describe("SSS contribution — 15% rate, ₱5k–₱35k MSC (effective Jan 2025)", () => {
  it("employee share is 5% of MSC at the floor and ceiling", () => {
    expect(lookupSSSEmployeeShare(5_000)).toBe(250); // floor MSC
    expect(lookupSSSEmployeeShare(35_000)).toBe(1_750); // ceiling MSC
  });
  it("total is 15% of MSC with a ₱20,000 WISP split", () => {
    const r = computeSSSContribution(35_000, "employed");
    expect(r.regMSC).toBe(20_000);
    expect(r.wispMSC).toBe(15_000);
    expect(r.ee + r.er).toBe(35_000 * 0.15); // 5% + 10%
  });
});

describe("SSS pension — RA 11199 minimums", () => {
  it("guarantees ₱1,200 (10–19 CYS) and ₱2,400 (20+ CYS), each + ₱1,000", () => {
    expect(computeSSSPension(2_000, 10).pension).toBe(2_200); // 1,200 + 1,000
    expect(computeSSSPension(2_000, 20).pension).toBe(3_400); // 2,400 + 1,000
  });
});
