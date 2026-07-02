// ---------------------------------------------------------------------------
// SSS contribution under the 15% schedule (RA 11199, in effect 2025+).
// Total rate 15% of the Monthly Salary Credit (MSC ₱5,000–₱35,000); employed
// split 10% employer / 5% employee. The MSC portion above ₱20,000 funds the
// mandatory provident fund (WISP). Employed and self-employed members also pay
// the small Employees' Compensation (EC) premium. Pure TypeScript, no side
// effects.
// ---------------------------------------------------------------------------

import { MPF_THRESHOLD } from "@/lib/calculators/sss";

export type SSSMember = "employed" | "self" | "voluntary" | "ofw";

export const SSS_MEMBER_LABELS: Record<SSSMember, string> = {
  employed: "Employed",
  self: "Self-employed",
  voluntary: "Voluntary",
  ofw: "OFW",
};

export interface SSSContributionResult {
  /** Monthly salary credit (bracketed, ₱500 steps). */
  msc: number;
  /** Portion of the MSC funding the regular SS fund (≤ ₱20,000). */
  regMSC: number;
  /** Portion of the MSC funding the provident fund / WISP (> ₱20,000). */
  wispMSC: number;
  /** Employee share (5% of MSC). */
  ee: number;
  /** Employer share (10% of MSC). */
  er: number;
  /** Employees' Compensation premium. */
  ec: number;
  /** Regular SS contribution (15% of regMSC). */
  regular: number;
  /** Provident fund / WISP contribution (15% of wispMSC). */
  wisp: number;
  /** Total monthly contribution. */
  total: number;
  /** Amount the member pays. */
  youPay: number;
  /** Amount the employer pays (0 for non-employed). */
  employerPay: number;
}

export function sssMscMin(member: SSSMember): number {
  return member === "ofw" ? 8_000 : 5_000;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi);
}

export function computeSSSContribution(
  salary: number,
  member: SSSMember,
): SSSContributionResult {
  const msc = clamp(Math.round(salary / 500) * 500, sssMscMin(member), 35_000);
  const regMSC = Math.min(msc, MPF_THRESHOLD);
  const wispMSC = Math.max(msc - MPF_THRESHOLD, 0);
  const ee = msc * 0.05;
  const er = msc * 0.1;
  const hasEC = member === "employed" || member === "self";
  const ec = hasEC ? (msc < 15_000 ? 10 : 30) : 0;
  const regular = regMSC * 0.15;
  const wisp = wispMSC * 0.15;

  let total: number;
  let youPay: number;
  let employerPay: number;
  if (member === "employed") {
    total = ee + er + ec;
    youPay = ee;
    employerPay = er + ec;
  } else {
    total = msc * 0.15 + ec;
    youPay = total;
    employerPay = 0;
  }

  return { msc, regMSC, wispMSC, ee, er, ec, regular, wisp, total, youPay, employerPay };
}
