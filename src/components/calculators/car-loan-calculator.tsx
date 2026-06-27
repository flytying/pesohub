"use client";

import { LoanCalculator, type LoanConfig } from "@/components/calculators/loan-calculator";

const config: LoanConfig = {
  calculatorType: "Car Loan Calculator",
  resultLabel: "Estimated monthly payment",
  breakdownTitle: "Cost breakdown",
  breakdownNote:
    "Based on standard monthly amortization (declining-balance interest). Total cost includes your down payment.",
  amount: {
    label: "Car price",
    prefix: "₱",
    min: 200_000,
    max: 5_000_000,
    step: 10_000,
    minLabel: "₱200,000",
    maxLabel: "₱5,000,000",
    tooltip: "The total vehicle price before financing.",
  },
  priceBreakdownLabel: "Car price",
  downPayment: {
    label: "Down payment",
    suffix: "%",
    min: 0,
    max: 60,
    step: 1,
    minLabel: "0%",
    maxLabel: "60%",
    tooltip: "Amount you pay upfront — a bigger down payment lowers the loan.",
  },
  term: {
    label: "Loan term (months)",
    min: 12,
    max: 84,
    step: 6,
    minLabel: "12 mo",
    maxLabel: "84 mo",
    tooltip: "The number of months to repay the loan.",
    presets: [
      { m: 36, label: "36mo" },
      { m: 48, label: "48mo" },
      { m: 60, label: "60mo" },
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
  defaults: { amount: 1_200_000, downPct: 20, term: 60, rate: 6.5 },
  compareTerms: [
    { m: 24, label: "24 Months" },
    { m: 36, label: "36 Months" },
    { m: 48, label: "48 Months" },
    { m: 60, label: "60 Months" },
  ],
};

export function CarLoanCalculator() {
  return <LoanCalculator config={config} />;
}
