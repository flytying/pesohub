// ---------------------------------------------------------------------------
// Philippine Take-Home Pay Calculator
// Combines withholding tax, SSS, PhilHealth, and Pag-IBIG deductions.
// Pure TypeScript computation library.
// ---------------------------------------------------------------------------

import { calculateWithholdingTax } from "@/lib/calculators/tax";
import { SSS_CONTRIBUTION_TABLE_2025 } from "@/lib/calculators/sss";

/**
 * Input parameters for the take-home pay calculation.
 */
export interface TakeHomePayInput {
  /** Monthly gross salary in PHP. */
  monthlySalary: number;
}

/**
 * Result of a take-home pay computation. All values are monthly.
 */
export interface TakeHomePayResult {
  /** Monthly gross salary. */
  grossSalary: number;
  /** Estimated monthly withholding tax (TRAIN Law). */
  withholdingTax: number;
  /** SSS employee share per month. */
  sssContribution: number;
  /** PhilHealth employee share per month. */
  philhealthContribution: number;
  /** Pag-IBIG employee share per month. */
  pagibigContribution: number;
  /** Total monthly deductions (tax + SSS + PhilHealth + Pag-IBIG). */
  totalDeductions: number;
  /** Monthly take-home pay after all deductions. */
  takeHomePay: number;
}

// ---------------------------------------------------------------------------
// PhilHealth constants (2025)
// Premium rate: 5% of monthly basic salary, split 50/50.
// Employee pays 2.5%. Monthly salary credit floor: ₱10,000, ceiling: ₱100,000.
// ---------------------------------------------------------------------------

const PHILHEALTH_RATE = 0.05;
const PHILHEALTH_EMPLOYEE_SHARE = 0.5;
const PHILHEALTH_SALARY_FLOOR = 10_000;
const PHILHEALTH_SALARY_CEILING = 100_000;

// ---------------------------------------------------------------------------
// Pag-IBIG constants
// Employee share: 1% if salary ≤ ₱1,500, else 2%.
// Maximum monthly salary credit: ₱5,000 → max employee contribution: ₱100.
// ---------------------------------------------------------------------------

const PAGIBIG_MAX_MSC = 5_000;

// ---------------------------------------------------------------------------
// Main computation
// ---------------------------------------------------------------------------

/**
 * Calculate estimated monthly take-home pay after common payroll deductions.
 *
 * This function is pure -- it has no side effects.
 */
export function calculateTakeHomePay(
  input: TakeHomePayInput,
): TakeHomePayResult {
  const { monthlySalary } = input;

  // 1. Withholding tax (monthly)
  const taxResult = calculateWithholdingTax({ monthlySalary });
  const withholdingTax = taxResult.monthlyTax;

  // 2. SSS employee share
  const sssContribution = lookupSSSEmployeeShare(monthlySalary);

  // 3. PhilHealth employee share
  const philhealthContribution = calculatePhilHealthEmployee(monthlySalary);

  // 4. Pag-IBIG employee share
  const pagibigContribution = calculatePagIBIGEmployee(monthlySalary);

  // Totals
  const totalDeductions = round(
    withholdingTax + sssContribution + philhealthContribution + pagibigContribution,
  );
  const takeHomePay = round(monthlySalary - totalDeductions);

  return {
    grossSalary: monthlySalary,
    withholdingTax,
    sssContribution,
    philhealthContribution,
    pagibigContribution,
    totalDeductions,
    takeHomePay,
  };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Look up the SSS employee share for a given monthly salary.
 */
function lookupSSSEmployeeShare(monthlySalary: number): number {
  // Find the matching bracket by salary range
  for (const bracket of SSS_CONTRIBUTION_TABLE_2025) {
    if (
      monthlySalary >= bracket.minSalary &&
      monthlySalary <= bracket.maxSalary
    ) {
      return bracket.employeeShare;
    }
  }

  // Above the highest bracket → use maximum
  const last =
    SSS_CONTRIBUTION_TABLE_2025[SSS_CONTRIBUTION_TABLE_2025.length - 1];
  if (monthlySalary > last.maxSalary) {
    return last.employeeShare;
  }

  // Below the lowest bracket → use minimum
  return SSS_CONTRIBUTION_TABLE_2025[0].employeeShare;
}

/**
 * Calculate the PhilHealth employee share.
 * Premium = 5% of salary (clamped to floor/ceiling), split 50/50.
 */
function calculatePhilHealthEmployee(monthlySalary: number): number {
  const clampedSalary = Math.min(
    Math.max(monthlySalary, PHILHEALTH_SALARY_FLOOR),
    PHILHEALTH_SALARY_CEILING,
  );
  return round(clampedSalary * PHILHEALTH_RATE * PHILHEALTH_EMPLOYEE_SHARE);
}

/**
 * Calculate the Pag-IBIG employee share.
 * 1% if salary ≤ ₱1,500, else 2%. Capped at ₱5,000 MSC (max ₱100/month).
 */
function calculatePagIBIGEmployee(monthlySalary: number): number {
  const cappedSalary = Math.min(monthlySalary, PAGIBIG_MAX_MSC);
  const rate = monthlySalary <= 1_500 ? 0.01 : 0.02;
  return round(cappedSalary * rate);
}

/**
 * Round a number to two decimal places.
 */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}
