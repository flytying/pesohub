// ---------------------------------------------------------------------------
// Philippine Time Deposit Calculator
// Estimates gross interest, withholding tax, after-tax interest, maturity
// amount, and the effective after-tax annual return.
// Pure TypeScript computation library.
// ---------------------------------------------------------------------------

import { round, type CalcError } from "./math-utils";

/** Unit the term is expressed in. */
export type TermUnit = "days" | "months" | "years";

/** Interest crediting method. "simple" is the default for PH time deposits. */
export type InterestMethod = "simple" | "monthly" | "quarterly" | "annual";

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
  termUnit: TermUnit;
  /** Final withholding tax rate on interest as a fraction (default 0.20 = 20%). */
  taxRate?: number;
  /** Interest crediting method (default "simple"). */
  method?: InterestMethod;
}

/**
 * Result of a time deposit computation.
 */
export interface TimeDepositResult {
  /** Original deposit amount. */
  principal: number;
  /** Estimated gross interest earned over the full term. */
  grossInterest: number;
  /** Estimated withholding tax on interest. */
  taxOnInterest: number;
  /** Estimated after-tax interest (gross − tax). */
  afterTaxInterest: number;
  /** Estimated gross maturity amount (principal + gross interest). */
  grossMaturityAmount: number;
  /** Estimated net maturity value (principal + after-tax interest). */
  netMaturityValue: number;
  /** Effective after-tax annual return as a percentage (annualised). */
  effectiveAfterTaxReturn: number;
  /** Term used in the calculation, formatted as a string. */
  termUsed: string;
  /** Term in months (for comparison purposes). */
  termInMonths: number;
  /** Tax rate applied, as a fraction. */
  taxRate: number;
  /** Interest method used. */
  method: InterestMethod;
}

// ---------------------------------------------------------------------------
// Philippine final withholding tax on interest income: 20%
// ---------------------------------------------------------------------------

export const INTEREST_WITHHOLDING_TAX_RATE = 0.2;

const DAYS_PER_YEAR = 365;

/** Compounding periods per year for each method. */
const PERIODS_PER_YEAR: Record<InterestMethod, number> = {
  simple: 0, // sentinel — simple interest, handled separately
  monthly: 12,
  quarterly: 4,
  annual: 1,
};

// ---------------------------------------------------------------------------
// Main computation
// ---------------------------------------------------------------------------

/**
 * Calculate estimated time deposit return.
 *
 * Simple interest:   Interest = Principal × Rate × Years
 * Compound interest: Interest = Principal × ((1 + Rate/n)^(n × Years) − 1)
 *
 * The withholding tax is applied once to the total gross interest. Real banks
 * withhold per crediting in compounded products, so this is a planning estimate.
 *
 * This function is pure -- it has no side effects.
 */
export function calculateTimeDeposit(
  input: TimeDepositInput,
): TimeDepositResult | CalcError {
  const { depositAmount, annualRate, term, termUnit } = input;
  const taxRate = input.taxRate ?? INTEREST_WITHHOLDING_TAX_RATE;
  const method = input.method ?? "simple";

  // -- Input validation --
  if (!Number.isFinite(depositAmount) || depositAmount <= 0) {
    return { error: "Enter a deposit amount greater than zero." };
  }
  if (!Number.isFinite(annualRate) || annualRate < 0) {
    return { error: "Enter an interest rate of zero or more." };
  }
  if (!Number.isFinite(term) || term <= 0) {
    return { error: "Enter a term greater than zero." };
  }

  const termInYears = toYears(term, termUnit);
  const termInMonths = Math.round(termInYears * 12);
  const rate = annualRate / 100;

  // Gross interest: simple or compound depending on method.
  let grossInterest: number;
  if (method === "simple") {
    grossInterest = depositAmount * rate * termInYears;
  } else {
    const n = PERIODS_PER_YEAR[method];
    grossInterest =
      depositAmount * (Math.pow(1 + rate / n, n * termInYears) - 1);
  }
  grossInterest = round(grossInterest);

  // Tax is computed on the already-rounded gross interest, so downstream
  // figures stay self-consistent (afterTax = gross − tax exactly). Deviation
  // from taxing the unrounded amount is < ₱0.005 — irrelevant for estimates.
  const taxOnInterest = round(grossInterest * taxRate);
  const afterTaxInterest = round(grossInterest - taxOnInterest);

  const grossMaturityAmount = round(depositAmount + grossInterest);
  const netMaturityValue = round(depositAmount + afterTaxInterest);

  // Effective after-tax annual return (annualised CAGR of the net outcome).
  const effectiveAfterTaxReturn =
    termInYears > 0 && depositAmount > 0
      ? round(
          (Math.pow(netMaturityValue / depositAmount, 1 / termInYears) - 1) *
            100,
        )
      : 0;

  return {
    principal: depositAmount,
    grossInterest,
    taxOnInterest,
    afterTaxInterest,
    grossMaturityAmount,
    netMaturityValue,
    effectiveAfterTaxReturn,
    termUsed: formatTermLabel(term, termUnit),
    termInMonths,
    taxRate,
    method,
  };
}

/**
 * Calculate time deposit result for a specific term in months.
 * Convenience wrapper for term comparison; carries the chosen tax + method.
 */
export function calculateForTerm(
  depositAmount: number,
  annualRate: number,
  months: number,
  taxRate: number = INTEREST_WITHHOLDING_TAX_RATE,
  method: InterestMethod = "simple",
): TimeDepositResult | CalcError {
  return calculateTimeDeposit({
    depositAmount,
    annualRate,
    term: months,
    termUnit: "months",
    taxRate,
    method,
  });
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function toYears(term: number, unit: TermUnit): number {
  if (unit === "years") return term;
  if (unit === "days") return term / DAYS_PER_YEAR;
  return term / 12;
}

function formatTermLabel(term: number, unit: TermUnit): string {
  const noun = unit === "years" ? "Year" : unit === "days" ? "Day" : "Month";
  return term === 1 ? `1 ${noun}` : `${term} ${noun}s`;
}
