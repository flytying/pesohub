// ---------------------------------------------------------------------------
// Loan Calculator – Pure TypeScript computation library
// Supports car loans, home loans, and personal loans (same annuity formula).
// ---------------------------------------------------------------------------

/**
 * Input parameters for a loan calculation.
 */
export interface LoanInput {
  /** Total amount borrowed (in PHP). */
  principal: number;
  /** Annual interest rate expressed as a percentage (e.g. 6.5 for 6.5%). */
  annualInterestRate: number;
  /** Loan repayment term in months. */
  termMonths: number;
}

/**
 * A single row in the amortization schedule.
 */
export interface AmortizationRow {
  /** Month number (1-indexed). */
  month: number;
  /** Fixed monthly payment amount. */
  payment: number;
  /** Portion of the payment applied to principal. */
  principal: number;
  /** Portion of the payment applied to interest. */
  interest: number;
  /** Outstanding balance after this payment. */
  balance: number;
}

/**
 * Full result of a loan calculation.
 */
export interface LoanResult {
  /** Fixed monthly payment amount. */
  monthlyPayment: number;
  /** Total amount paid over the life of the loan. */
  totalPayment: number;
  /** Total interest paid over the life of the loan. */
  totalInterest: number;
  /** Month-by-month amortization schedule. */
  schedule: AmortizationRow[];
}

/**
 * Calculate loan repayment using the standard annuity formula.
 *
 * Formula:  M = P * [r(1+r)^n] / [(1+r)^n - 1]
 *
 * Where:
 *   P = principal
 *   r = monthly interest rate (annual rate / 12 / 100)
 *   n = term in months
 *
 * When the interest rate is zero the payment is simply P / n.
 *
 * This function is pure – it has no side effects.
 */
export function calculateLoan(input: LoanInput): LoanResult {
  const { principal, annualInterestRate, termMonths } = input;

  // -- Edge case: zero-interest loan --
  if (annualInterestRate === 0) {
    return calculateZeroInterestLoan(principal, termMonths);
  }

  const monthlyRate = annualInterestRate / 100 / 12;

  // Standard annuity formula
  const compounded = Math.pow(1 + monthlyRate, termMonths);
  const monthlyPayment =
    principal * ((monthlyRate * compounded) / (compounded - 1));

  // Round to two decimal places for currency
  const roundedPayment = round(monthlyPayment);

  // Build amortization schedule
  const schedule: AmortizationRow[] = [];
  let balance = principal;

  for (let month = 1; month <= termMonths; month++) {
    const interestPortion = balance * monthlyRate;

    // On the last month, adjust to clear the remaining balance exactly.
    const isLastMonth = month === termMonths;
    const principalPortion = isLastMonth
      ? balance
      : roundedPayment - interestPortion;

    balance = isLastMonth ? 0 : balance - principalPortion;

    // Ensure balance never dips below zero due to floating-point drift.
    if (balance < 0) {
      balance = 0;
    }

    schedule.push({
      month,
      payment: isLastMonth ? round(principalPortion + interestPortion) : roundedPayment,
      principal: round(principalPortion),
      interest: round(interestPortion),
      balance: round(balance),
    });
  }

  const totalPayment = schedule.reduce((sum, row) => sum + row.payment, 0);
  const totalInterest = round(totalPayment - principal);

  return {
    monthlyPayment: roundedPayment,
    totalPayment: round(totalPayment),
    totalInterest,
    schedule,
  };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Handle the degenerate case where the interest rate is exactly zero.
 */
function calculateZeroInterestLoan(
  principal: number,
  termMonths: number,
): LoanResult {
  const monthlyPayment = round(principal / termMonths);
  const schedule: AmortizationRow[] = [];
  let balance = principal;

  for (let month = 1; month <= termMonths; month++) {
    const isLastMonth = month === termMonths;
    const payment = isLastMonth ? round(balance) : monthlyPayment;

    balance = isLastMonth ? 0 : balance - payment;

    if (balance < 0) {
      balance = 0;
    }

    schedule.push({
      month,
      payment,
      principal: payment,
      interest: 0,
      balance: round(balance),
    });
  }

  return {
    monthlyPayment,
    totalPayment: principal,
    totalInterest: 0,
    schedule,
  };
}

/**
 * Round a number to two decimal places (standard currency rounding).
 */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}
