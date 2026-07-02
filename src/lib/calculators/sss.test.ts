import { describe, it, expect } from "vitest";
import {
  SSS_EMPLOYEE_TABLE,
  SSS_KASAMBAHAY_TABLE,
  SSS_VOLUNTARY_TABLE,
  SSS_OFW_TABLE,
  MPF_THRESHOLD,
} from "./sss";
import { computeSSSContribution } from "./sss-contribution-wisp";

// Expected values are 15% of MSC per the January 2025 SSS schedule
// (Circulars 2024-006 through 2024-010), split 5% employee / 10% employer
// for employed members, plus the ₱10/₱30 EC premium.

describe("SSS_EMPLOYEE_TABLE (Circular 2024-006)", () => {
  it("covers MSC ₱5,000–₱35,000 in ₱500 steps (61 rows)", () => {
    expect(SSS_EMPLOYEE_TABLE).toHaveLength(61);
    expect(SSS_EMPLOYEE_TABLE[0].msc).toBe(5_000);
    expect(SSS_EMPLOYEE_TABLE[60].msc).toBe(35_000);
  });

  it("first row: MSC ₱5,000 → ₱250 EE / ₱510 ER / ₱760 total", () => {
    const first = SSS_EMPLOYEE_TABLE[0];
    expect(first.memberShare).toBe(250); // 5% of 5,000
    expect(first.employerShare).toBe(510); // 10% of 5,000 + ₱10 EC
    expect(first.total).toBe(760);
  });

  it("last row: MSC ₱35,000 → ₱1,750 EE / ₱3,530 ER / ₱5,280 total", () => {
    const last = SSS_EMPLOYEE_TABLE[60];
    expect(last.memberShare).toBe(1_750); // 5% of 35,000
    expect(last.employerShare).toBe(3_530); // 10% of 35,000 + ₱30 EC
    expect(last.total).toBe(5_280);
  });

  it("brackets are contiguous and non-overlapping", () => {
    for (let i = 1; i < SSS_EMPLOYEE_TABLE.length; i++) {
      expect(SSS_EMPLOYEE_TABLE[i].minSalary).toBeGreaterThan(
        SSS_EMPLOYEE_TABLE[i - 1].maxSalary,
      );
    }
  });
});

describe("SSS_KASAMBAHAY_TABLE (Circular 2024-007)", () => {
  it("below MSC ₱5,000 the household employer pays everything", () => {
    const lowest = SSS_KASAMBAHAY_TABLE[0];
    expect(lowest.msc).toBe(1_000);
    expect(lowest.memberShare).toBe(0);
    expect(lowest.employerShare).toBe(160); // 15% of 1,000 + ₱10 EC
    expect(lowest.total).toBe(160);
  });

  it("from MSC ₱5,000 the split matches a regular employee", () => {
    const row = SSS_KASAMBAHAY_TABLE.find((r) => r.msc === 5_000);
    expect(row).toBeDefined();
    expect(row!.memberShare).toBe(250);
    expect(row!.employerShare).toBe(510);
  });
});

describe("voluntary and OFW tables (Circulars 2024-009/010)", () => {
  it("voluntary members pay the full 15% with no EC", () => {
    const row = SSS_VOLUNTARY_TABLE.find((r) => r.msc === 10_000);
    expect(row!.memberShare).toBe(1_500); // 15% of 10,000, no EC
    expect(row!.employerShare).toBe(0);
  });

  it("OFW table floors at MSC ₱8,000", () => {
    expect(SSS_OFW_TABLE[0].msc).toBe(8_000);
    expect(SSS_OFW_TABLE[0].memberShare).toBe(1_200); // 15% of 8,000
  });
});

describe("computeSSSContribution — WISP split and EC boundaries", () => {
  it("splits the MSC at the ₱20,000 WISP threshold", () => {
    const atThreshold = computeSSSContribution(20_000, "employed");
    expect(atThreshold.regMSC).toBe(MPF_THRESHOLD);
    expect(atThreshold.wispMSC).toBe(0);

    const above = computeSSSContribution(20_500, "employed");
    expect(above.regMSC).toBe(MPF_THRESHOLD);
    expect(above.wispMSC).toBe(500);
    expect(above.wisp).toBe(75); // 15% of 500
  });

  it("EC premium jumps from ₱10 to ₱30 at MSC ₱15,000", () => {
    expect(computeSSSContribution(14_500, "employed").ec).toBe(10);
    expect(computeSSSContribution(15_000, "employed").ec).toBe(30);
  });

  it("clamps OFW salaries to the ₱8,000 MSC floor", () => {
    expect(computeSSSContribution(3_000, "ofw").msc).toBe(8_000);
  });

  it("voluntary members pay no EC and shoulder the full 15%", () => {
    const r = computeSSSContribution(10_000, "voluntary");
    expect(r.ec).toBe(0);
    expect(r.youPay).toBe(1_500);
    expect(r.employerPay).toBe(0);
  });
});
