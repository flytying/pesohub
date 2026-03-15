import type { CalculatorPageData } from "@/types/content";

export const carLoanData: CalculatorPageData = {
  slug: "calculators/loans/car-loan-calculator-philippines",
  category: "loans",
  title: "Car Loan Calculator Philippines",
  metaTitle:
    "Car Loan Calculator Philippines | Estimate Monthly Car Payments | PesoHub",
  metaDescription:
    "Use this car loan calculator to estimate monthly car payments, total interest, and total repayment in the Philippines. Compare scenarios before checking actual offers.",
  h1: "Car Loan Calculator Philippines",
  intro:
    "Estimate your monthly car loan payment based on loan amount, interest rate, and repayment term. Use this as a planning tool before comparing actual bank, dealership, or financing offers.",
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
      "This calculator estimates your loan payment using the loan amount, interest rate, and repayment term you enter.",
    explanation:
      "The loan amount is typically the vehicle price minus your down payment. Results are meant for planning and educational use only. The exact payment method used by a lender may differ from the assumptions in this calculator, which is why your final quote may not match the estimate exactly.",
  },
  exampleCalculation: {
    scenario:
      "You buy a car worth ₱1,200,000 with a 20% down payment, financed over 60 months at 6.5% annual interest.",
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
    "A higher down payment usually lowers both your monthly payment and your total interest.",
    "A longer loan term may reduce the monthly amount, but it can also increase the total interest paid over time.",
    "A lower rate can reduce both your monthly payment and the total cost of borrowing, even when the loan amount stays the same.",
    "Compare car loan offers from at least 3 banks or financing companies before deciding.",
  ],
  faqs: [
    {
      question: "What does this car loan calculator estimate?",
      answer:
        "It estimates your monthly payment, total interest, and total repayment based on the loan amount, interest rate, and repayment term you enter.",
    },
    {
      question: "Is this an official loan quote?",
      answer:
        "No. This is a planning estimate only. Your actual quote may differ depending on the lender, approval terms, fees, promo offers, and credit review.",
    },
    {
      question: "Does down payment affect the result?",
      answer:
        "Yes. A higher down payment usually reduces the amount you need to borrow, which can lower both monthly payments and total interest.",
    },
    {
      question:
        "Why might dealer financing and bank financing look different?",
      answer:
        "Different lenders may use different rates, fee structures, promo terms, and approval rules. Even for the same vehicle price, the final cost may vary.",
    },
    {
      question: "Does a longer loan term reduce the monthly payment?",
      answer:
        "Usually, yes. But a longer term may also increase the total interest paid over the life of the loan.",
    },
    {
      question: "What costs are not included in this estimate?",
      answer:
        "This estimate may not include fees, insurance, registration, penalties, or other lender-specific charges.",
    },
  ],
  relatedPages: [
    "calculators/loans/home-loan-calculator-philippines",
    "calculators/loans/personal-loan-calculator-philippines",
  ],
};
