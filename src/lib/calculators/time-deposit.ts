// ---------------------------------------------------------------------------
// Philippine Time Deposit Calculator
// Estimates gross interest, after-tax interest, and maturity amount.
// Pure TypeScript computation library.
// ---------------------------------------------------------------------------

/**
 * Input parameters for the time deposit calculation.
 */
export interface TimeDepositInput {
  /** Deposit amount in PHP. */
  depositAmount: number;
  /** Annual interest rate as a percentage (e.g. 5.5 for 5.5%). */
  annualRate: number;
  /** Term length (in the unit specified by termUnit). */
  term: number;
  /** Unit of the term. */
  termUnit: "months" | "years";
}

/**
 * Result of a time deposit computation.
 */
export interface TimeDepositResult {
  /** Original deposit amount. */
  principal: number;
  /** Estimated gross interest earned over the full term. */
  grossInterest: number;
  /** Estimated withholding tax on interest (20%). */
  taxOnInterest: number;
  /** Estimated after-tax interest (gross − tax). */
  afterTaxInterest: number;
  /** Estimated gross maturity amount (principal + gross interest). */
  grossMaturityAmount: number;
  /** Estimated net maturity value (principal + after-tax interest). */
  netMaturityValue: number;
  /** Term used in the calculation, formatted as a string. */
  termUsed: string;
  /** Term in months (for comparison purposes). */
  termInMonths: number;
}

// ---------------------------------------------------------------------------
// Philippine withholding tax on interest income: 20%
// ---------------------------------------------------------------------------

const INTEREST_WITHHOLDING_TAX_RATE = 0.2;

// ---------------------------------------------------------------------------
// Main computation
// ---------------------------------------------------------------------------

/**
 * Calculate estimated time deposit return.
 *
 * Uses simple interest: Interest = Principal × Rate × Time
 * Philippine time deposits typically use simple interest (not compounded).
 *
 * This function is pure -- it has no side effects.
 */
export function calculateTimeDeposit(
  input: TimeDepositInput,
): TimeDepositResult {
  const { depositAmount, annualRate, term, termUnit } = input;

  // Convert term to years for interest calculation
  const termInYears = termUnit === "years" ? term : term / 12;
  const termInMonths = termUnit === "years" ? term * 12 : term;

  // Simple interest calculation
  const rate = annualRate / 100;
  const grossInterest = round(depositAmount * rate * termInYears);

  // 20% withholding tax on interest
  const taxOnInterest = round(grossInterest * INTEREST_WITHHOLDING_TAX_RATE);
  const afterTaxInterest = round(grossInterest - taxOnInterest);

  // Maturity amounts
  const grossMaturityAmount = round(depositAmount + grossInterest);
  const netMaturityValue = round(depositAmount + afterTaxInterest);

  // Format term label
  const termUsed = formatTermLabel(term, termUnit);

  return {
    principal: depositAmount,
    grossInterest,
    taxOnInterest,
    afterTaxInterest,
    grossMaturityAmount,
    netMaturityValue,
    termUsed,
    termInMonths,
  };
}

/**
 * Calculate time deposit result for a specific term in months.
 * Convenience wrapper for term comparison.
 */
export function calculateForTerm(
  depositAmount: number,
  annualRate: number,
  months: number,
): TimeDepositResult {
  return calculateTimeDeposit({
    depositAmount,
    annualRate,
    term: months,
    termUnit: "months",
  });
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function formatTermLabel(term: number, unit: "months" | "years"): string {
  if (unit === "years") {
    return term === 1 ? "1 Year" : `${term} Years`;
  }
  return term === 1 ? "1 Month" : `${term} Months`;
}

/**
 * Round a number to two decimal places.
 */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}
