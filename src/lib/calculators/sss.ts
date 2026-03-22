// ---------------------------------------------------------------------------
// SSS Contribution & Pension Calculator – Pure TypeScript computation library
// Based on the January 2025 SSS contribution schedule (Circulars 2024-006
// through 2024-010) and pension formulas.
// ---------------------------------------------------------------------------

/**
 * Input parameters for the SSS pension calculation.
 */
export interface SSSInput {
  /** Monthly Salary Credit (MSC) used as the basis for contributions. */
  monthlySalaryCredit: number;
  /** Total number of years the member has contributed to SSS. */
  yearsOfContribution: number;
}

/**
 * Result of an SSS pension computation.
 */
export interface SSSResult {
  /** Estimated monthly pension amount. */
  monthlyPension: number;
  /** Which formula produced the highest (winning) pension amount. */
  method: "formula_a" | "formula_b" | "minimum_pension";
  /** Monthly SSS contribution based on the salary credit. */
  monthlyContribution: number;
  /** Estimated total contributions over the membership period. */
  totalContributions: number;
}

// ---------------------------------------------------------------------------
// 2025 SSS Contribution Table (Effective January 2025)
//
// Contribution rate: 15%
// Minimum MSC: ₱5,000 (₱1,000 for kasambahay, ₱8,000 for OFW)
// Maximum MSC: ₱35,000
// MPF (Mandatory Provident Fund) applies for MSC > ₱20,000
// EC (Employees' Compensation) applies to Employee, Kasambahay, Self-Employed
//
// Sources: SSS Circulars 2024-006 through 2024-010
// ---------------------------------------------------------------------------

export interface SSSContributionBracket {
  minSalary: number;
  maxSalary: number;
  monthlySalaryCredit: number;
  totalContribution: number;
  employeeShare: number;
  employerShare: number;
}

/** Row for per-member-type contribution tables displayed on the reference page. */
export interface SSSContributionRow {
  minSalary: number;
  maxSalary: number;
  msc: number;
  memberShare: number;
  employerShare: number;
  total: number;
}

// ── Bracket generation ────────────────────────────────────────────

const CONTRIBUTION_RATE = 0.15;
const EMPLOYEE_RATE = 0.05; // 1/3 of 15%
const EMPLOYER_RATE = 0.10; // 2/3 of 15%
const MPF_THRESHOLD = 20_000;
const EC_LOW = 10; // EC for MSC ≤ 14,500
const EC_HIGH = 30; // EC for MSC ≥ 15,000

function getEC(msc: number): number {
  return msc <= 14_500 ? EC_LOW : EC_HIGH;
}

function buildBrackets(
  minMSC: number,
  maxMSC: number,
  step: number,
): { minSalary: number; maxSalary: number; msc: number }[] {
  const brackets: { minSalary: number; maxSalary: number; msc: number }[] = [];
  for (let msc = minMSC; msc <= maxMSC; msc += step) {
    const isFirst = msc === minMSC;
    const isLast = msc === maxMSC;
    brackets.push({
      minSalary: isFirst ? 0 : msc - step / 2,
      maxSalary: isLast ? Infinity : msc + step / 2 - 0.01,
      msc,
    });
  }
  return brackets;
}

// Standard brackets: MSC 5,000 to 35,000 in ₱500 steps
const STANDARD_BRACKETS = buildBrackets(5_000, 35_000, 500);

// Kasambahay low brackets: MSC 1,000 to 4,500 in ₱500 steps
const KASAMBAHAY_LOW_BRACKETS = buildBrackets(1_000, 4_500, 500);

// OFW brackets: MSC 8,000 to 35,000 in ₱500 steps
const OFW_BRACKETS = buildBrackets(8_000, 35_000, 500);

// ── Per-member-type contribution computation ──────────────────────

function computeEmployeeRow(b: { minSalary: number; maxSalary: number; msc: number }): SSSContributionRow {
  const { msc } = b;
  const ec = getEC(msc);
  const regularSS_EE = Math.min(msc, MPF_THRESHOLD) * EMPLOYEE_RATE;
  const mpf_EE = msc > MPF_THRESHOLD ? (msc - MPF_THRESHOLD) * EMPLOYEE_RATE : 0;
  const regularSS_ER = Math.min(msc, MPF_THRESHOLD) * EMPLOYER_RATE;
  const mpf_ER = msc > MPF_THRESHOLD ? (msc - MPF_THRESHOLD) * EMPLOYER_RATE : 0;
  const memberShare = regularSS_EE + mpf_EE;
  const employerShare = regularSS_ER + mpf_ER + ec;
  return { ...b, memberShare, employerShare, total: memberShare + employerShare };
}

function computeKasambahayRow(b: { minSalary: number; maxSalary: number; msc: number }, isLow: boolean): SSSContributionRow {
  const { msc } = b;
  const ec = getEC(msc);
  if (isLow) {
    // Below MSC 5,000: kasambahay pays nothing, household employer pays all
    const employerShare = msc * CONTRIBUTION_RATE + ec;
    return { ...b, memberShare: 0, employerShare, total: employerShare };
  }
  // From MSC 5,000+: same split as regular employee
  return computeEmployeeRow(b);
}

function computeSelfEmployedRow(b: { minSalary: number; maxSalary: number; msc: number }): SSSContributionRow {
  const { msc } = b;
  const ec = getEC(msc);
  const total = msc * CONTRIBUTION_RATE + ec;
  return { ...b, memberShare: total, employerShare: 0, total };
}

function computeVoluntaryRow(b: { minSalary: number; maxSalary: number; msc: number }): SSSContributionRow {
  const { msc } = b;
  // No EC for voluntary/NWS
  const total = msc * CONTRIBUTION_RATE;
  return { ...b, memberShare: total, employerShare: 0, total };
}

function computeOFWRow(b: { minSalary: number; maxSalary: number; msc: number }): SSSContributionRow {
  // Same as voluntary (no EC)
  return computeVoluntaryRow(b);
}

// ── Exported contribution tables ──────────────────────────────────

export const SSS_EMPLOYEE_TABLE: SSSContributionRow[] =
  STANDARD_BRACKETS.map(computeEmployeeRow);

export const SSS_KASAMBAHAY_TABLE: SSSContributionRow[] = [
  ...KASAMBAHAY_LOW_BRACKETS.map((b) => computeKasambahayRow(b, true)),
  ...STANDARD_BRACKETS.map((b) => computeKasambahayRow(b, false)),
];

export const SSS_SELF_EMPLOYED_TABLE: SSSContributionRow[] =
  STANDARD_BRACKETS.map(computeSelfEmployedRow);

export const SSS_VOLUNTARY_TABLE: SSSContributionRow[] =
  STANDARD_BRACKETS.map(computeVoluntaryRow);

export const SSS_OFW_TABLE: SSSContributionRow[] =
  OFW_BRACKETS.map(computeOFWRow);

// ── Legacy compatibility: SSS_CONTRIBUTION_TABLE_2025 ─────────────
// Used by the SSS contribution calculator and pension calculator.

export const SSS_CONTRIBUTION_TABLE_2025: SSSContributionBracket[] =
  SSS_EMPLOYEE_TABLE.map((r) => ({
    minSalary: r.minSalary,
    maxSalary: r.maxSalary === Infinity ? 99_999 : r.maxSalary,
    monthlySalaryCredit: r.msc,
    totalContribution: r.total,
    employeeShare: r.memberShare,
    employerShare: r.employerShare,
  }));

// ── Member type definitions ───────────────────────────────────────

export type SSSMemberType =
  | "employer-employee"
  | "kasambahay"
  | "self-employed"
  | "voluntary"
  | "ofw";

export const SSS_MEMBER_TYPES: {
  id: SSSMemberType;
  label: string;
  shortLabel: string;
  description: string;
  circular: string;
  table: SSSContributionRow[];
  hasSplit: boolean;
  memberLabel: string;
  employerLabel: string;
}[] = [
  {
    id: "employer-employee",
    label: "Employee",
    shortLabel: "EE",
    description:
      "For business employers and their employees (Circular 2024-006). The contribution is split between the employee and employer.",
    circular: "2024-006",
    table: SSS_EMPLOYEE_TABLE,
    hasSplit: true,
    memberLabel: "Employee Share",
    employerLabel: "Employer Share",
  },
  {
    id: "kasambahay",
    label: "Kasambahay",
    shortLabel: "HE",
    description:
      "For household employers and kasambahay (Circular 2024-007). Below MSC ₱5,000, the household employer pays the full contribution. From MSC ₱5,000 onwards, both share.",
    circular: "2024-007",
    table: SSS_KASAMBAHAY_TABLE,
    hasSplit: true,
    memberLabel: "Kasambahay Share",
    employerLabel: "HH Employer Share",
  },
  {
    id: "self-employed",
    label: "Self-Employed",
    shortLabel: "SE",
    description:
      "For self-employed members (Circular 2024-008). The member pays the full contribution including EC based on declared monthly earnings.",
    circular: "2024-008",
    table: SSS_SELF_EMPLOYED_TABLE,
    hasSplit: false,
    memberLabel: "Total Contribution",
    employerLabel: "",
  },
  {
    id: "voluntary",
    label: "Voluntary / NWS",
    shortLabel: "VM",
    description:
      "For voluntary members and non-working spouses (Circular 2024-009). The member pays the full contribution. EC does not apply.",
    circular: "2024-009",
    table: SSS_VOLUNTARY_TABLE,
    hasSplit: false,
    memberLabel: "Total Contribution",
    employerLabel: "",
  },
  {
    id: "ofw",
    label: "OFW",
    shortLabel: "OFW",
    description:
      "For land-based OFW members (Circular 2024-010). Minimum MSC is ₱8,000. The member pays the full contribution. EC does not apply.",
    circular: "2024-010",
    table: SSS_OFW_TABLE,
    hasSplit: false,
    memberLabel: "Total Contribution",
    employerLabel: "",
  },
];

// ---------------------------------------------------------------------------
// Main computation
// ---------------------------------------------------------------------------

/**
 * Calculate the estimated SSS monthly pension.
 *
 * The pension is the **highest** of three formulas:
 *   (a) 300 + 20% of average MSC + 2% of average MSC * credited years over 10
 *   (b) 40% of average MSC
 *   (c) Minimum pension: PHP 2,000 (10-20 CYS) or PHP 4,000 (20+ CYS)
 *
 * This function is pure -- it has no side effects.
 */
export function calculateSSPension(input: SSSInput): SSSResult {
  const { monthlySalaryCredit, yearsOfContribution } = input;

  // Look up the contribution bracket for the given MSC
  const bracket = findContributionBracket(monthlySalaryCredit);
  const monthlyContribution = bracket.totalContribution;
  const totalContributions = round(monthlyContribution * yearsOfContribution * 12);

  // -- Formula (a) --
  const yearsOver10 = Math.max(yearsOfContribution - 10, 0);
  const formulaA = round(
    300 + 0.2 * monthlySalaryCredit + 0.02 * monthlySalaryCredit * yearsOver10,
  );

  // -- Formula (b) --
  const formulaB = round(0.4 * monthlySalaryCredit);

  // -- Formula (c): Minimum pension --
  let minimumPension = 0;
  if (yearsOfContribution >= 20) {
    minimumPension = 4_000;
  } else if (yearsOfContribution >= 10) {
    minimumPension = 2_000;
  }

  // Determine the winning method
  const candidates: { value: number; method: SSSResult["method"] }[] = [
    { value: formulaA, method: "formula_a" },
    { value: formulaB, method: "formula_b" },
    { value: minimumPension, method: "minimum_pension" },
  ];

  const winner = candidates.reduce((best, current) =>
    current.value > best.value ? current : best,
  );

  return {
    monthlyPension: winner.value,
    method: winner.method,
    monthlyContribution: round(monthlyContribution),
    totalContributions,
  };
}

// ---------------------------------------------------------------------------
// Lookup helper
// ---------------------------------------------------------------------------

function findContributionBracket(msc: number): SSSContributionBracket {
  const exact = SSS_CONTRIBUTION_TABLE_2025.find(
    (b) => b.monthlySalaryCredit === msc,
  );
  if (exact) return exact;

  for (const bracket of SSS_CONTRIBUTION_TABLE_2025) {
    if (msc >= bracket.minSalary && msc <= bracket.maxSalary) {
      return bracket;
    }
  }

  const last = SSS_CONTRIBUTION_TABLE_2025[SSS_CONTRIBUTION_TABLE_2025.length - 1];
  if (msc > last.maxSalary) return last;

  return SSS_CONTRIBUTION_TABLE_2025[0];
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
