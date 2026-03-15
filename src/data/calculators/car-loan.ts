import type { CalculatorPageData } from "@/types/content";

export const carLoanData: CalculatorPageData = {
  slug: "calculators/loans/car-loan-calculator-philippines",
  category: "loans",
  title: "Car Loan Calculator Philippines",
  metaTitle:
    "Car Loan Calculator Philippines 2025 - Monthly Payment & Amortization",
  metaDescription:
    "Calculate your monthly car loan payment in the Philippines. See the full amortization schedule, total interest, and total cost for bank auto financing.",
  h1: "Car Loan Calculator Philippines",
  intro:
    "Estimate your monthly car loan payment, total interest, and total cost of ownership. Enter the vehicle price, your down payment percentage, loan term, and interest rate to see the full amortization schedule.",
  updatedAt: "2025-03-01",
  defaultInputs: {
    vehiclePrice: 1_200_000,
    downPaymentPercent: 20,
    termMonths: 60,
    interestRate: 6.5,
  },
  formula: {
    name: "Standard Annuity Formula",
    description:
      "Philippine banks use the standard amortization formula for car loans.",
    explanation:
      "Monthly Payment = P x [r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount (vehicle price minus down payment), r is the monthly interest rate (annual rate / 12 / 100), and n is the total number of monthly payments. This formula produces a fixed monthly payment that covers both principal and interest over the life of the loan.",
  },
  exampleCalculation: {
    scenario:
      "You buy a car worth PHP 1,200,000 with a 20% down payment, financed over 60 months at 6.5% annual interest.",
    inputs: {
      vehiclePrice: 1_200_000,
      downPaymentPercent: 20,
      termMonths: 60,
      interestRate: 6.5,
    },
    result: {
      downPaymentAmount: 240_000,
      loanAmount: 960_000,
      monthlyPayment: 18_797,
      totalInterest: 167_831,
      totalCost: 1_367_831,
    },
  },
  tips: [
    "Aim for at least 20% down payment to get better interest rates and lower monthly payments from Philippine banks.",
    "Choose the shortest loan term you can comfortably afford -- a 36-month term pays significantly less interest than a 60-month term.",
    "Factor in additional costs like comprehensive insurance, registration, LTO fees, and chattel mortgage fees when budgeting for a new car.",
    "Compare car loan offers from at least 3 banks or financing companies. BPI, BDO, Metrobank, and EastWest Bank often have competitive auto loan rates.",
  ],
  faqs: [
    {
      question:
        "What is the typical interest rate for car loans in the Philippines?",
      answer:
        "Car loan interest rates in the Philippines typically range from 5.5% to 12% per year, depending on the bank, loan term, down payment, and whether the vehicle is brand new or secondhand. Major banks like BPI, BDO, and Metrobank generally offer rates starting at 5.5% to 7% for new cars with at least 20% down payment.",
    },
    {
      question:
        "What is the minimum down payment for a car loan in the Philippines?",
      answer:
        "Most Philippine banks and financing companies require a minimum down payment of 20% of the vehicle price for brand-new cars. Some banks may accept as low as 10-15% for select models or promotions, but a higher down payment typically results in better interest rates and lower monthly payments.",
    },
    {
      question: "How long can I finance a car loan in the Philippines?",
      answer:
        "Car loan terms in the Philippines usually range from 12 to 60 months (1 to 5 years). Some banks offer extended terms of up to 72 or 84 months for brand-new vehicles. Shorter loan terms have higher monthly payments but result in significantly less total interest paid.",
    },
    {
      question:
        "Can I get a car loan for a secondhand vehicle in the Philippines?",
      answer:
        "Yes, several banks and financing companies offer auto loans for pre-owned vehicles. However, the vehicle typically must be no more than 5-7 years old, interest rates are usually 1-3% higher than new car loans, and the maximum loan term may be shorter (usually up to 48 months). BPI, Security Bank, and RCBC are known for secondhand car financing.",
    },
    {
      question:
        "What additional fees should I expect when getting a car loan in the Philippines?",
      answer:
        "Beyond the monthly amortization, expect to pay chattel mortgage fees (around PHP 2,000-5,000), comprehensive car insurance (required by most lenders), processing fees (around PHP 3,000-5,000), LTO registration, and documentary stamp tax. Some banks also charge an early termination fee if you pay off the loan before the term ends.",
    },
  ],
  relatedPages: [
    "calculators/loans/home-loan-calculator-philippines",
    "calculators/loans/personal-loan-calculator-philippines",
  ],
};
