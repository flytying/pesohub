"use client";

import { LoanCalculator, type LoanConfig } from "@/components/calculators/loan-calculator";

const config: LoanConfig = {
  calculatorType: "Home Loan Calculator",
  resultLabel: "Estimated monthly payment",
  breakdownTitle: "Cost breakdown",
  breakdownNote:
    "Based on standard monthly amortization (declining-balance interest). Total cost includes your down payment.",
  amount: {
    label: "Property price",
    prefix: "₱",
    min: 500_000,
    max: 20_000_000,
    step: 50_000,
    minLabel: "₱500,000",
    maxLabel: "₱20,000,000",
    tooltip: "The total property price before financing.",
  },
  priceBreakdownLabel: "Property price",
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
    min: 60,
    max: 360,
    step: 12,
    minLabel: "5 yrs",
    maxLabel: "30 yrs",
    tooltip: "The number of months to repay. Home loans typically run 5–30 years.",
    presets: [
      { m: 120, label: "10yr" },
      { m: 180, label: "15yr" },
      { m: 240, label: "20yr" },
    ],
    subUnit: "yr",
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
  defaults: { amount: 2_500_000, downPct: 20, term: 240, rate: 7 },
  compareTerms: [
    { m: 120, label: "10 Years" },
    { m: 180, label: "15 Years" },
    { m: 240, label: "20 Years" },
    { m: 300, label: "25 Years" },
  ],
};

export function HomeLoanCalculator() {
  return <LoanCalculator config={config} />;
}
