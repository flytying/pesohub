import { describe, it, expect } from "vitest";
import { computeSSSContribution } from "./sss-contribution-wisp";

describe("computeSSSContribution", () => {
  it("splits employee/employer shares for an employed member", () => {
    const r = computeSSSContribution(20_000, "employed");
    expect(r.msc).toBe(20_000);
    expect(r.ee).toBe(1_000); // 5%
    expect(r.er).toBe(2_000); // 10%
    expect(r.ec).toBe(30); // MSC >= 15,000
    expect(r.youPay).toBe(1_000);
    expect(r.employerPay).toBe(2_030);
    expect(r.total).toBe(3_030);
  });

  it("charges the full 15% to the member when self-paying (OFW, no EC)", () => {
    const r = computeSSSContribution(8_000, "ofw");
    expect(r.msc).toBe(8_000); // OFW floor
    expect(r.ec).toBe(0);
    expect(r.youPay).toBe(1_200);
    expect(r.employerPay).toBe(0);
  });

  it("clamps MSC to the ₱5,000 floor and ₱35,000 ceiling", () => {
    expect(computeSSSContribution(3_000, "employed").msc).toBe(5_000);
    expect(computeSSSContribution(50_000, "employed").msc).toBe(35_000);
  });

  it("routes MSC above ₱20,000 into the WISP portion", () => {
    const r = computeSSSContribution(35_000, "employed");
    expect(r.regMSC).toBe(20_000);
    expect(r.wispMSC).toBe(15_000);
  });
});
