import type { CalculatorPageData } from "@/types/content";

export const personalLoanData: CalculatorPageData = {
  slug: "calculators/loans/personal-loan-calculator-philippines",
  category: "loans",
  title: "Personal Loan Calculator Philippines",
  metaTitle:
    "Personal Loan Calculator Philippines | Estimate Monthly Payments | PesoHub",
  metaDescription:
    "Use this personal loan calculator to estimate monthly payments, total interest, and total repayment in the Philippines. Compare scenarios before checking actual offers.",
  h1: "Personal Loan Calculator Philippines",
  intro:
    "Estimate your monthly personal loan payment based on loan amount, interest rate, and repayment term. Use this as a planning tool before comparing actual bank, lender, or financing offers.",
  updatedAt: "2025-03-01",
  defaultInputs: {
    loanAmount: 100_000,
    termMonths: 36,
    interestRate: 12,
  },
  formula: {
    name: "Standard Annuity Formula",
    description:
      "This calculator estimates your loan payment using the loan amount, interest rate, and repayment term you enter. Results are meant for planning and educational use only.",
    explanation:
      "The exact payment method used by a lender may differ from the assumptions in this calculator, which is why your final quote may not match the estimate exactly.",
  },
  exampleCalculation: {
    scenario:
      "You borrow ₱100,000 over 36 months at 12% annual interest rate (declining balance).",
    inputs: {
      loanAmount: 100_000,
      termMonths: 36,
      interestRate: 12,
    },
    result: {
      monthlyPayment: 3_321,
      totalInterest: 19_572,
      totalCost: 119_572,
    },
  },
  tips: [
    "A lower loan amount usually reduces both monthly payment and total interest.",
    "A longer loan term may reduce the monthly amount, but it can also increase the total interest paid over time.",
    "A lower rate can reduce both your monthly payment and the total cost of borrowing, even when the loan amount stays the same.",
    "Compare personal loan offers from at least 3 banks or lenders before deciding.",
  ],
  faqs: [
    {
      question: "What does this personal loan calculator estimate?",
      answer:
        "It estimates your monthly payment, total interest, and total repayment based on the loan amount, interest rate, and repayment term you enter.",
    },
    {
      question: "Is this an official loan quote?",
      answer:
        "No. This is a planning estimate only. Your actual quote may differ depending on the lender, approval terms, fees, promo offers, and credit review.",
    },
    {
      question: "Does the loan amount affect the result?",
      answer:
        "Yes. A larger loan amount usually increases both monthly payment and total interest, while a smaller loan amount usually lowers them.",
    },
    {
      question: "Why might different lenders show different results?",
      answer:
        "Different lenders may use different rates, fee structures, promo terms, repayment methods, and approval rules. Even for the same loan amount, the final cost may vary.",
    },
    {
      question: "Does a longer loan term reduce the monthly payment?",
      answer:
        "Usually, yes. But a longer term may also increase the total interest paid over the life of the loan.",
    },
    {
      question: "What costs are not included in this estimate?",
      answer:
        "Depending on the setup of your calculator, this estimate may not include processing fees, service charges, insurance, penalties, or other lender-specific charges.",
    },
  ],
  relatedPages: [
    "calculators/loans/car-loan-calculator-philippines",
    "calculators/loans/home-loan-calculator-philippines",
  ],
};
