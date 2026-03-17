// ---------------------------------------------------------------------------
// Philippine 13th Month Pay Calculator
// Based on PD 851 and its implementing rules.
// Pure TypeScript computation library.
// ---------------------------------------------------------------------------

/**
 * Computation type for 13th month pay.
 */
export type ComputationType = "full_year" | "prorated";

export const COMPUTATION_TYPE_LABELS: Record<ComputationType, string> = {
  full_year: "Full Year",
  prorated: "Prorated",
};

/**
 * Input parameters for the 13th month pay calculation.
 */
export interface ThirteenthMonthInput {
  /** Monthly basic salary in PHP. */
  monthlyBasicSalary: number;
  /** Number of months worked during the calendar year (1–12). */
  monthsWorked: number;
  /** Computation type. */
  computationType: ComputationType;
}

/**
 * Result of a 13th month pay computation.
 */
export interface ThirteenthMonthResult {
  /** Total basic salary earned during the covered months. */
  totalBasicSalaryEarned: number;
  /** Estimated 13th month pay. */
  thirteenthMonthPay: number;
  /** Monthly basic salary used. */
  monthlyBasicSalary: number;
  /** Months counted. */
  monthsWorked: number;
  /** Computation type used. */
  computationType: ComputationType;
}

// ---------------------------------------------------------------------------
// Main computation
// ---------------------------------------------------------------------------

/**
 * Calculate estimated 13th month pay.
 *
 * Formula: Total Basic Salary Earned During the Year ÷ 12
 * For fixed monthly salary: (Monthly Basic Salary × Months Worked) ÷ 12
 *
 * This function is pure -- it has no side effects.
 */
export function calculateThirteenthMonthPay(
  input: ThirteenthMonthInput,
): ThirteenthMonthResult {
  const { monthlyBasicSalary, monthsWorked, computationType } = input;

  const clampedMonths = Math.min(Math.max(Math.round(monthsWorked), 0), 12);
  const totalBasicSalaryEarned = round(monthlyBasicSalary * clampedMonths);
  const thirteenthMonthPay = round(totalBasicSalaryEarned / 12);

  return {
    totalBasicSalaryEarned,
    thirteenthMonthPay,
    monthlyBasicSalary,
    monthsWorked: clampedMonths,
    computationType,
  };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Round a number to two decimal places.
 */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}
