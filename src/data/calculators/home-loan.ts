import type { CalculatorPageData } from "@/types/content";

export const homeLoanData: CalculatorPageData = {
  slug: "calculators/loans/home-loan-calculator-philippines",
  category: "loans",
  title: "Home Loan Calculator Philippines",
  metaTitle:
    "Home Loan Calculator Philippines | Estimate Monthly Payments | PesoHub",
  metaDescription:
    "Use this home loan calculator to estimate monthly payments, total interest, and total repayment in the Philippines. Compare scenarios before checking actual offers.",
  h1: "Home Loan Calculator Philippines",
  intro:
    "Estimate your monthly home loan payment based on loan amount, interest rate, and repayment term. Use this as a planning tool before comparing actual bank, housing loan, or lender offers.",
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
      "This calculator estimates your loan payment using the loan amount, interest rate, and repayment term you enter.",
    explanation:
      "The loan amount is typically the property price minus your down payment. Results are meant for planning and educational use only. The exact payment method used by a lender may differ from the assumptions in this calculator, which is why your final quote may not match the estimate exactly.",
  },
  exampleCalculation: {
    scenario:
      "You purchase a house and lot worth ₱3,500,000 with a 20% down payment, financed over 20 years at 7% annual interest.",
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
    "A higher down payment usually lowers both your monthly payment and your total interest.",
    "A longer loan term may reduce the monthly amount, but it can also increase the total interest paid over time.",
    "A lower rate can reduce both your monthly payment and the total cost of borrowing, even when the loan amount stays the same.",
    "Compare home loan offers from at least 3 banks or housing loan providers before deciding.",
  ],
  faqs: [
    {
      question: "What does this home loan calculator estimate?",
      answer:
        "It estimates your monthly payment, total interest, and total repayment based on the loan amount, interest rate, and repayment term you enter.",
    },
    {
      question: "Is this an official loan quote?",
      answer:
        "No. This is a planning estimate only. Your actual quote may differ depending on the lender, approval terms, fees, promo offers, repricing structure, and credit review.",
    },
    {
      question: "Does down payment affect the result?",
      answer:
        "Yes. A higher down payment usually reduces the amount you need to borrow, which can lower both monthly payments and total interest.",
    },
    {
      question:
        "Why might different banks show different results?",
      answer:
        "Different lenders may use different rates, fee structures, promo periods, repricing schedules, and approval rules. Even for the same property price, the final cost may vary.",
    },
    {
      question: "Does a longer loan term reduce the monthly payment?",
      answer:
        "Usually, yes. But a longer term may also increase the total interest paid over the life of the loan.",
    },
    {
      question: "What costs are not included in this estimate?",
      answer:
        "Depending on the setup of your calculator, this estimate may not include fees, insurance, appraisal costs, taxes, penalties, or other lender-specific charges.",
    },
  ],
  relatedPages: [
    "calculators/loans/car-loan-calculator-philippines",
    "calculators/loans/personal-loan-calculator-philippines",
  ],
};
