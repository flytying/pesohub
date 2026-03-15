// ---------------------------------------------------------------------------
// SSS Contribution Calculator – Pure TypeScript computation library
// Estimates SSS contribution based on salary and member type.
// Uses the 2025 SSS contribution schedule.
// ---------------------------------------------------------------------------

import {
  SSS_CONTRIBUTION_TABLE_2025,
  type SSSContributionBracket,
} from "@/lib/calculators/sss";

/**
 * Supported SSS member classifications.
 */
export type SSSMemberType =
  | "employee"
  | "self_employed"
  | "voluntary"
  | "non_working_spouse"
  | "ofw";

export const MEMBER_TYPE_LABELS: Record<SSSMemberType, string> = {
  employee: "Employee",
  self_employed: "Self-Employed",
  voluntary: "Voluntary",
  non_working_spouse: "Non-Working Spouse",
  ofw: "OFW (Land-Based)",
};

/**
 * Input parameters for the SSS contribution calculation.
 */
export interface SSSContributionInput {
  /** Monthly salary or compensation basis in PHP. */
  monthlySalary: number;
  /** SSS member classification. */
  memberType: SSSMemberType;
}

/**
 * Result of an SSS contribution computation.
 */
export interface SSSContributionResult {
  /** Monthly Salary Credit mapped from the salary input. */
  monthlySalaryCredit: number;
  /** Total monthly contribution (employee + employer or full for SE/voluntary). */
  totalContribution: number;
  /** Employee share of the monthly contribution (for employee type). */
  employeeShare: number;
  /** Employer share of the monthly contribution (for employee type). */
  employerShare: number;
  /** The member's personal contribution amount (what they actually pay). */
  memberContribution: number;
  /** Whether the contribution is shared with an employer. */
  isSharedContribution: boolean;
  /** The contribution bracket used. */
  bracket: SSSContributionBracket;
}

// ---------------------------------------------------------------------------
// Main computation
// ---------------------------------------------------------------------------

/**
 * Calculate the estimated SSS contribution based on salary and member type.
 *
 * For employees, the contribution is split between employee and employer.
 * For self-employed, voluntary, non-working spouse, and OFW members,
 * the member pays the full contribution amount.
 *
 * This function is pure -- it has no side effects.
 */
export function calculateSSSContribution(
  input: SSSContributionInput,
): SSSContributionResult {
  const { monthlySalary, memberType } = input;

  const bracket = findBracket(monthlySalary);
  const isSharedContribution = memberType === "employee";

  // For employee: pays employee share only; employer pays the rest.
  // For all other types: member pays the full contribution.
  const memberContribution = isSharedContribution
    ? bracket.employeeShare
    : bracket.totalContribution;

  return {
    monthlySalaryCredit: bracket.monthlySalaryCredit,
    totalContribution: bracket.totalContribution,
    employeeShare: bracket.employeeShare,
    employerShare: bracket.employerShare,
    memberContribution,
    isSharedContribution,
    bracket,
  };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Find the SSS contribution bracket for a given monthly salary.
 */
function findBracket(monthlySalary: number): SSSContributionBracket {
  for (const bracket of SSS_CONTRIBUTION_TABLE_2025) {
    if (
      monthlySalary >= bracket.minSalary &&
      monthlySalary <= bracket.maxSalary
    ) {
      return bracket;
    }
  }

  // Above the highest bracket → use maximum
  const last =
    SSS_CONTRIBUTION_TABLE_2025[SSS_CONTRIBUTION_TABLE_2025.length - 1];
  if (monthlySalary > last.maxSalary) {
    return last;
  }

  // Below the lowest bracket → use minimum
  return SSS_CONTRIBUTION_TABLE_2025[0];
}
