// ---------------------------------------------------------------------------
// SSS Pension Calculator – Pure TypeScript computation library
// Based on the 2025 SSS contribution schedule and pension formulas.
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
// 2025 SSS Contribution Table
//
// Each entry defines a salary bracket (minSalary to maxSalary inclusive),
// the corresponding Monthly Salary Credit (MSC), and the total monthly
// contribution (employee + employer shares combined).
// ---------------------------------------------------------------------------

export interface SSSContributionBracket {
  /** Lower bound of the salary range (inclusive, PHP). */
  minSalary: number;
  /** Upper bound of the salary range (inclusive, PHP). */
  maxSalary: number;
  /** Monthly Salary Credit assigned to this bracket. */
  monthlySalaryCredit: number;
  /** Total monthly contribution (employee + employer). */
  totalContribution: number;
  /** Employee share of the monthly contribution. */
  employeeShare: number;
  /** Employer share of the monthly contribution. */
  employerShare: number;
}

export const SSS_CONTRIBUTION_TABLE_2025: SSSContributionBracket[] = [
  { minSalary: 0, maxSalary: 4_249, monthlySalaryCredit: 4_000, totalContribution: 570, employeeShare: 200, employerShare: 370 },
  { minSalary: 4_250, maxSalary: 4_749, monthlySalaryCredit: 4_500, totalContribution: 640.50, employeeShare: 225, employerShare: 415.50 },
  { minSalary: 4_750, maxSalary: 5_249, monthlySalaryCredit: 5_000, totalContribution: 712.50, employeeShare: 250, employerShare: 462.50 },
  { minSalary: 5_250, maxSalary: 5_749, monthlySalaryCredit: 5_500, totalContribution: 782.50, employeeShare: 275, employerShare: 507.50 },
  { minSalary: 5_750, maxSalary: 6_249, monthlySalaryCredit: 6_000, totalContribution: 855, employeeShare: 300, employerShare: 555 },
  { minSalary: 6_250, maxSalary: 6_749, monthlySalaryCredit: 6_500, totalContribution: 925, employeeShare: 325, employerShare: 600 },
  { minSalary: 6_750, maxSalary: 7_249, monthlySalaryCredit: 7_000, totalContribution: 997.50, employeeShare: 350, employerShare: 647.50 },
  { minSalary: 7_250, maxSalary: 7_749, monthlySalaryCredit: 7_500, totalContribution: 1_067.50, employeeShare: 375, employerShare: 692.50 },
  { minSalary: 7_750, maxSalary: 8_249, monthlySalaryCredit: 8_000, totalContribution: 1_140, employeeShare: 400, employerShare: 740 },
  { minSalary: 8_250, maxSalary: 8_749, monthlySalaryCredit: 8_500, totalContribution: 1_210, employeeShare: 425, employerShare: 785 },
  { minSalary: 8_750, maxSalary: 9_249, monthlySalaryCredit: 9_000, totalContribution: 1_282.50, employeeShare: 450, employerShare: 832.50 },
  { minSalary: 9_250, maxSalary: 9_749, monthlySalaryCredit: 9_500, totalContribution: 1_352.50, employeeShare: 475, employerShare: 877.50 },
  { minSalary: 9_750, maxSalary: 10_249, monthlySalaryCredit: 10_000, totalContribution: 1_425, employeeShare: 500, employerShare: 925 },
  { minSalary: 10_250, maxSalary: 10_749, monthlySalaryCredit: 10_500, totalContribution: 1_495, employeeShare: 525, employerShare: 970 },
  { minSalary: 10_750, maxSalary: 11_249, monthlySalaryCredit: 11_000, totalContribution: 1_567.50, employeeShare: 550, employerShare: 1_017.50 },
  { minSalary: 11_250, maxSalary: 11_749, monthlySalaryCredit: 11_500, totalContribution: 1_637.50, employeeShare: 575, employerShare: 1_062.50 },
  { minSalary: 11_750, maxSalary: 12_249, monthlySalaryCredit: 12_000, totalContribution: 1_710, employeeShare: 600, employerShare: 1_110 },
  { minSalary: 12_250, maxSalary: 12_749, monthlySalaryCredit: 12_500, totalContribution: 1_780, employeeShare: 625, employerShare: 1_155 },
  { minSalary: 12_750, maxSalary: 13_249, monthlySalaryCredit: 13_000, totalContribution: 1_852.50, employeeShare: 650, employerShare: 1_202.50 },
  { minSalary: 13_250, maxSalary: 13_749, monthlySalaryCredit: 13_500, totalContribution: 1_922.50, employeeShare: 675, employerShare: 1_247.50 },
  { minSalary: 13_750, maxSalary: 14_249, monthlySalaryCredit: 14_000, totalContribution: 1_995, employeeShare: 700, employerShare: 1_295 },
  { minSalary: 14_250, maxSalary: 14_749, monthlySalaryCredit: 14_500, totalContribution: 2_065, employeeShare: 725, employerShare: 1_340 },
  { minSalary: 14_750, maxSalary: 15_249, monthlySalaryCredit: 15_000, totalContribution: 2_137.50, employeeShare: 750, employerShare: 1_387.50 },
  { minSalary: 15_250, maxSalary: 15_749, monthlySalaryCredit: 15_500, totalContribution: 2_207.50, employeeShare: 775, employerShare: 1_432.50 },
  { minSalary: 15_750, maxSalary: 16_249, monthlySalaryCredit: 16_000, totalContribution: 2_280, employeeShare: 800, employerShare: 1_480 },
  { minSalary: 16_250, maxSalary: 16_749, monthlySalaryCredit: 16_500, totalContribution: 2_350, employeeShare: 825, employerShare: 1_525 },
  { minSalary: 16_750, maxSalary: 17_249, monthlySalaryCredit: 17_000, totalContribution: 2_422.50, employeeShare: 850, employerShare: 1_572.50 },
  { minSalary: 17_250, maxSalary: 17_749, monthlySalaryCredit: 17_500, totalContribution: 2_492.50, employeeShare: 875, employerShare: 1_617.50 },
  { minSalary: 17_750, maxSalary: 18_249, monthlySalaryCredit: 18_000, totalContribution: 2_565, employeeShare: 900, employerShare: 1_665 },
  { minSalary: 18_250, maxSalary: 18_749, monthlySalaryCredit: 18_500, totalContribution: 2_635, employeeShare: 925, employerShare: 1_710 },
  { minSalary: 18_750, maxSalary: 19_249, monthlySalaryCredit: 19_000, totalContribution: 2_707.50, employeeShare: 950, employerShare: 1_757.50 },
  { minSalary: 19_250, maxSalary: 19_749, monthlySalaryCredit: 19_500, totalContribution: 2_777.50, employeeShare: 975, employerShare: 1_802.50 },
  { minSalary: 19_750, maxSalary: 20_249, monthlySalaryCredit: 20_000, totalContribution: 2_850, employeeShare: 1_000, employerShare: 1_850 },
  { minSalary: 20_250, maxSalary: 20_749, monthlySalaryCredit: 20_500, totalContribution: 2_920, employeeShare: 1_025, employerShare: 1_895 },
  { minSalary: 20_750, maxSalary: 21_249, monthlySalaryCredit: 21_000, totalContribution: 2_992.50, employeeShare: 1_050, employerShare: 1_942.50 },
  { minSalary: 21_250, maxSalary: 21_749, monthlySalaryCredit: 21_500, totalContribution: 3_062.50, employeeShare: 1_075, employerShare: 1_987.50 },
  { minSalary: 21_750, maxSalary: 22_249, monthlySalaryCredit: 22_000, totalContribution: 3_135, employeeShare: 1_100, employerShare: 2_035 },
  { minSalary: 22_250, maxSalary: 22_749, monthlySalaryCredit: 22_500, totalContribution: 3_205, employeeShare: 1_125, employerShare: 2_080 },
  { minSalary: 22_750, maxSalary: 23_249, monthlySalaryCredit: 23_000, totalContribution: 3_277.50, employeeShare: 1_150, employerShare: 2_127.50 },
  { minSalary: 23_250, maxSalary: 23_749, monthlySalaryCredit: 23_500, totalContribution: 3_347.50, employeeShare: 1_175, employerShare: 2_172.50 },
  { minSalary: 23_750, maxSalary: 24_249, monthlySalaryCredit: 24_000, totalContribution: 3_420, employeeShare: 1_200, employerShare: 2_220 },
  { minSalary: 24_250, maxSalary: 24_749, monthlySalaryCredit: 24_500, totalContribution: 3_490, employeeShare: 1_225, employerShare: 2_265 },
  { minSalary: 24_750, maxSalary: 25_249, monthlySalaryCredit: 25_000, totalContribution: 3_562.50, employeeShare: 1_250, employerShare: 2_312.50 },
  { minSalary: 25_250, maxSalary: 25_749, monthlySalaryCredit: 25_500, totalContribution: 3_632.50, employeeShare: 1_275, employerShare: 2_357.50 },
  { minSalary: 25_750, maxSalary: 26_249, monthlySalaryCredit: 26_000, totalContribution: 3_705, employeeShare: 1_300, employerShare: 2_405 },
  { minSalary: 26_250, maxSalary: 26_749, monthlySalaryCredit: 26_500, totalContribution: 3_775, employeeShare: 1_325, employerShare: 2_450 },
  { minSalary: 26_750, maxSalary: 27_249, monthlySalaryCredit: 27_000, totalContribution: 3_847.50, employeeShare: 1_350, employerShare: 2_497.50 },
  { minSalary: 27_250, maxSalary: 27_749, monthlySalaryCredit: 27_500, totalContribution: 3_917.50, employeeShare: 1_375, employerShare: 2_542.50 },
  { minSalary: 27_750, maxSalary: 28_249, monthlySalaryCredit: 28_000, totalContribution: 3_990, employeeShare: 1_400, employerShare: 2_590 },
  { minSalary: 28_250, maxSalary: 28_749, monthlySalaryCredit: 28_500, totalContribution: 4_060, employeeShare: 1_425, employerShare: 2_635 },
  { minSalary: 28_750, maxSalary: 29_249, monthlySalaryCredit: 29_000, totalContribution: 4_132.50, employeeShare: 1_450, employerShare: 2_682.50 },
  { minSalary: 29_250, maxSalary: 29_749, monthlySalaryCredit: 29_500, totalContribution: 4_202.50, employeeShare: 1_475, employerShare: 2_727.50 },
  { minSalary: 29_750, maxSalary: 30_000, monthlySalaryCredit: 30_000, totalContribution: 4_275, employeeShare: 1_500, employerShare: 2_775 },
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

/**
 * Find the SSS contribution bracket that corresponds to the given Monthly
 * Salary Credit.  Falls back to the nearest bracket when an exact match is
 * not found.
 */
function findContributionBracket(msc: number): SSSContributionBracket {
  // Try exact MSC match first
  const exact = SSS_CONTRIBUTION_TABLE_2025.find(
    (b) => b.monthlySalaryCredit === msc,
  );
  if (exact) {
    return exact;
  }

  // Fall back to salary-range lookup (treat msc as a salary figure)
  for (const bracket of SSS_CONTRIBUTION_TABLE_2025) {
    if (msc >= bracket.minSalary && msc <= bracket.maxSalary) {
      return bracket;
    }
  }

  // If above the highest bracket, use the maximum
  const last = SSS_CONTRIBUTION_TABLE_2025[SSS_CONTRIBUTION_TABLE_2025.length - 1];
  if (msc > last.maxSalary) {
    return last;
  }

  // If below the lowest bracket, use the minimum
  return SSS_CONTRIBUTION_TABLE_2025[0];
}

/**
 * Round a number to two decimal places.
 */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}
