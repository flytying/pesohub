import type { CalculatorPageData } from "@/types/content";

export const homeLoanData: CalculatorPageData = {
  slug: "calculators/loans/home-loan-calculator-philippines",
  category: "loans",
  title: "Home Loan Calculator Philippines",
  metaTitle:
    "Home Loan Calculator Philippines 2025 - Housing Loan & Amortization",
  metaDescription:
    "Calculate your monthly home loan payment in the Philippines. Compare Pag-IBIG and bank housing loan amortization, total interest, and total cost.",
  h1: "Home Loan Calculator Philippines",
  intro:
    "Estimate your monthly housing loan payment for properties in the Philippines. Enter the property price, down payment, loan term in years, and interest rate to see the full amortization schedule. Works for Pag-IBIG Fund and bank housing loans.",
  updatedAt: "2025-03-01",
  defaultInputs: {
    propertyPrice: 3_500_000,
    downPaymentPercent: 20,
    termYears: 20,
    interestRate: 7,
  },
  formula: {
    name: "Standard Annuity Formula",
    description:
      "Both Pag-IBIG and banks use the standard annuity formula for housing loan amortization.",
    explanation:
      "Monthly Payment = P x [r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount (property price minus down payment), r is the monthly interest rate (annual rate / 12 / 100), and n is the total number of monthly payments (years x 12). Pag-IBIG Fund uses a fixed interest rate for the first 3 years, then reprices every 3 years. Bank housing loans may use fixed rates for 1-5 years before switching to variable rates.",
  },
  exampleCalculation: {
    scenario:
      "You purchase a house and lot worth PHP 3,500,000 with a 20% down payment, financed over 20 years at 7% annual interest.",
    inputs: {
      propertyPrice: 3_500_000,
      downPaymentPercent: 20,
      termYears: 20,
      interestRate: 7,
    },
    result: {
      downPaymentAmount: 700_000,
      loanAmount: 2_800_000,
      monthlyPayment: 21_709,
      totalInterest: 2_410_160,
      totalCost: 5_910_160,
    },
  },
  tips: [
    "Consider Pag-IBIG Fund housing loans for lower interest rates (as low as 5.375% for loans up to PHP 6 million) -- you must be an active Pag-IBIG member with at least 24 monthly contributions.",
    "Save for a higher down payment. Philippine banks generally require 10-20% down, but putting 20% or more reduces your monthly payment and may qualify you for a lower interest rate.",
    "Check if the developer offers in-house financing for the down payment period, then refinance to a bank or Pag-IBIG loan for the balance at a lower long-term rate.",
    "Budget for closing costs including transfer tax (0.5-0.75% of property price), documentary stamp tax (1.5%), registration fees, and notarial fees, which can total 5-8% of the property price.",
  ],
  faqs: [
    {
      question:
        "What is the difference between a Pag-IBIG home loan and a bank housing loan?",
      answer:
        "Pag-IBIG Fund home loans generally offer lower interest rates (5.375% to 10.375% depending on loan amount and repricing period) and longer terms (up to 30 years). However, the maximum loanable amount is capped at PHP 6 million. Bank housing loans typically have higher rates (6.5% to 9%+) but can finance larger amounts with fewer requirements. Active Pag-IBIG membership with at least 24 monthly contributions is required for Pag-IBIG loans.",
    },
    {
      question:
        "What is the minimum down payment for a home loan in the Philippines?",
      answer:
        "For bank housing loans, the minimum down payment is typically 10-20% of the property price. Pag-IBIG Fund requires at least 10% down payment for properties up to PHP 6 million. Some developers offer 0% down payment promotions, but this usually means spreading the down payment over the pre-selling period before the loan take-out.",
    },
    {
      question:
        "How long can I finance a home loan in the Philippines?",
      answer:
        "Pag-IBIG Fund housing loans can be financed up to 30 years. Bank housing loans typically offer terms of 5 to 25 years, with some banks extending up to 30 years for younger borrowers. The maximum term often depends on the borrower's age at loan maturity -- most banks require full repayment before the borrower turns 65 or 70.",
    },
    {
      question:
        "What documents do I need for a Philippine home loan application?",
      answer:
        "Common requirements include a valid government-issued ID, proof of income (Certificate of Employment, latest ITR, payslips for the last 3 months), bank statements for the last 6 months, TIN, and the property documents (Contract to Sell, Transfer Certificate of Title, and Tax Declaration). Self-employed applicants need additional documents like DTI registration, audited financial statements, and BIR Form 2316.",
    },
    {
      question:
        "Can I refinance my home loan to a lower interest rate?",
      answer:
        "Yes, refinancing is common in the Philippines. You can switch from a bank housing loan to a Pag-IBIG loan (or vice versa) or transfer to another bank with a lower rate. However, factor in the refinancing costs including appraisal fees, processing fees, documentary stamp tax, and any prepayment penalties from your original lender. Refinancing typically makes sense if the new rate is at least 1-2% lower than your current rate.",
    },
  ],
  relatedPages: [
    "calculators/loans/car-loan-calculator-philippines",
    "calculators/loans/personal-loan-calculator-philippines",
  ],
};
