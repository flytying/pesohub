"use client";

import { LoanCalculator, type LoanConfig } from "@/components/calculators/loan-calculator";

const config: LoanConfig = {
  calculatorType: "Personal Loan Calculator",
  resultLabel: "Estimated monthly payment",
  breakdownTitle: "Repayment breakdown",
  breakdownNote:
    "Based on standard monthly amortization (declining-balance interest), shown as your total repayment over the term.",
  amount: {
    label: "Loan amount",
    prefix: "₱",
    min: 5_000,
    max: 1_000_000,
    step: 5_000,
    minLabel: "₱5,000",
    maxLabel: "₱1,000,000",
    tooltip: "The amount you want to borrow.",
  },
  term: {
    label: "Repayment term (months)",
    min: 12,
    max: 84,
    step: 6,
    minLabel: "12 mo",
    maxLabel: "84 mo",
    tooltip: "The number of months to repay the loan.",
    presets: [
      { m: 12, label: "12mo" },
      { m: 24, label: "24mo" },
      { m: 36, label: "36mo" },
    ],
    subUnit: "mo",
  },
  rate: {
    label: "Annual interest rate",
    suffix: "%",
    min: 1,
    max: 20,
    step: 0.05,
    minLabel: "1%",
    maxLabel: "20%",
    tooltip: "The estimated annual interest rate offered by the lender.",
  },
  defaults: { amount: 100_000, downPct: 0, term: 36, rate: 12 },
  compareTerms: [
    { m: 12, label: "12 Months" },
    { m: 24, label: "24 Months" },
    { m: 36, label: "36 Months" },
    { m: 48, label: "48 Months" },
  ],
};

export function PersonalLoanCalculator() {
  return <LoanCalculator config={config} />;
}
