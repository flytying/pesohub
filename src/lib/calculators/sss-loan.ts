import { calculateLoan } from "@/lib/calculators/loan";

export type SSSLoanType = "salary" | "calamity";

export const SSS_LOAN_TYPE_LABELS: Record<SSSLoanType, string> = {
  salary: "SSS Salary Loan",
  calamity: "SSS Calamity Loan",
};

// SSS member loans carry a flat 10% nominal annual interest on a diminishing
// principal balance. The salary loan deducts a 1% service fee from the
// proceeds; the calamity loan has no service fee.
export const SSS_LOAN_ANNUAL_RATE = 10;
const SERVICE_FEE_RATE: Record<SSSLoanType, number> = {
  salary: 0.01,
  calamity: 0,
};

export interface SSSLoanInput {
  loanAmount: number;
  termMonths: number;
  loanType: SSSLoanType;
}

export interface SSSLoanResult {
  monthlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
  serviceFee: number;
  netProceeds: number;
  annualRate: number;
}

/**
 * Estimates the monthly amortization and total cost of an SSS salary or
 * calamity loan using 10% annual interest on a diminishing balance, plus the
 * service fee deducted from the proceeds.
 */
export function calculateSSSLoan({
  loanAmount,
  termMonths,
  loanType,
}: SSSLoanInput): SSSLoanResult {
  const serviceFee = Math.round(loanAmount * SERVICE_FEE_RATE[loanType]);
  const netProceeds = loanAmount - serviceFee;

  if (loanAmount <= 0 || termMonths <= 0) {
    return {
      monthlyPayment: 0,
      totalInterest: 0,
      totalRepayment: loanAmount,
      serviceFee,
      netProceeds,
      annualRate: SSS_LOAN_ANNUAL_RATE,
    };
  }

  const loan = calculateLoan({
    principal: loanAmount,
    annualInterestRate: SSS_LOAN_ANNUAL_RATE,
    termMonths,
  });

  return {
    monthlyPayment: loan.monthlyPayment,
    totalInterest: loan.totalInterest,
    totalRepayment: loan.totalPayment,
    serviceFee,
    netProceeds,
    annualRate: SSS_LOAN_ANNUAL_RATE,
  };
}
