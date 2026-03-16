import type { CalculatorPageData } from "@/types/content";

export const personalLoanData: CalculatorPageData = {
  slug: "calculators/loans/personal-loan-calculator-philippines",
  category: "loans",
  title: "Personal Loan Calculator Philippines",
  metaTitle:
    "Personal Loan Calculator Philippines – Estimate Monthly Payment & Repayment | PesoHub",
  metaDescription:
    "Estimate your monthly personal loan payment in the Philippines using PesoHub's free personal loan calculator. Compare loan amount, repayment term, and interest rate before applying.",
  h1: "Personal Loan Calculator Philippines",
  intro:
    "Estimate your monthly personal loan payment, total interest, and total repayment before applying. Adjust the loan amount, repayment term, and interest rate to compare scenarios and find a monthly payment that fits your budget.",
  updatedAt: "2026-03-16",
  defaultInputs: {
    loanAmount: 100_000,
    termMonths: 36,
    interestRate: 12,
  },
  formula: {
    name: "Monthly Payment Formula",
    description:
      "This personal loan calculator estimates your monthly payment using the loan amount, annual interest rate, and repayment term. The monthly payment is then estimated using a standard amortization formula.",
    explanation:
      "You do not need to calculate it manually, but understanding the formula can help you see why a shorter term may reduce total interest while a longer term may lower the monthly payment. This formula is commonly used to estimate fixed monthly loan payments based on the amount borrowed, interest rate, and repayment term.",
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
    "Borrow only what you actually need",
    "Compare shorter and longer repayment terms",
    "Check whether the monthly payment fits your regular budget",
    "Ask whether fees will be deducted from the amount you receive",
    "Compare more than one lender type before deciding",
  ],
  faqs: [
    {
      question: "What does this personal loan calculator estimate?",
      answer:
        "This calculator estimates your monthly payment, total interest, and total repayment based on the loan amount, repayment term, and interest rate you enter. It is designed for planning and comparison, not as an official lender quote.",
    },
    {
      question: "Is this an official personal loan offer?",
      answer:
        "No. This calculator provides an estimate only. Actual loan offers may vary depending on the lender, your credit profile, approval terms, fees, and final repayment structure.",
    },
    {
      question: "Why do different lenders show different loan costs?",
      answer:
        "Different lenders may use different interest rates, fee structures, repayment terms, and approval criteria. That is why it is important to compare both the monthly payment and the total repayment before choosing a loan.",
    },
    {
      question:
        "Does a longer repayment term always make a loan better?",
      answer:
        "Not always. A longer term can reduce the monthly payment, which may help with short-term affordability, but it can also increase the total interest paid over time. It is important to compare both the monthly amount and the full borrowing cost.",
    },
    {
      question: "Does this calculator include fees and deductions?",
      answer:
        "No. This calculator focuses on the estimated repayment based on the amount, term, and interest rate you enter. It may not reflect processing fees, insurance, service charges, or other deductions that affect the actual amount released or the full cost of borrowing.",
    },
    {
      question:
        "Can the approved amount and released amount be different?",
      answer:
        "Yes. Some lenders may deduct fees or charges before releasing the funds, which means the actual amount you receive can be lower than the approved loan amount.",
    },
  ],
  relatedPages: [
    "calculators/loans/car-loan-calculator-philippines",
    "calculators/loans/home-loan-calculator-philippines",
  ],
};
