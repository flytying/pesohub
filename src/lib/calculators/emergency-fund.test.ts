import { describe, it, expect } from "vitest";
import { computeEmergencyFund } from "./emergency-fund";

describe("computeEmergencyFund", () => {
  it("targets monthly expenses × coverage months", () => {
    const r = computeEmergencyFund(25_000, 6, 0);
    expect(r.targetAmount).toBe(150_000);
    expect(r.gap).toBe(150_000);
    expect(r.progress).toBe(0);
  });

  it("reduces the gap by current savings and reports progress", () => {
    const r = computeEmergencyFund(25_000, 6, 75_000);
    expect(r.gap).toBe(75_000);
    expect(r.progress).toBe(50);
  });

  it("never shows a negative gap and caps progress at 100%", () => {
    const r = computeEmergencyFund(25_000, 6, 200_000);
    expect(r.gap).toBe(0);
    expect(r.progress).toBe(100);
  });

  it("reports 0% progress when there are no expenses (avoids divide-by-zero)", () => {
    const r = computeEmergencyFund(0, 6, 10_000);
    expect(r.targetAmount).toBe(0);
    expect(r.progress).toBe(0);
    expect(r.gap).toBe(0);
  });
});
