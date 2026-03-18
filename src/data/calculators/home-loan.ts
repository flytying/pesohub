import type { CalculatorPageData } from "@/types/content";

export const homeLoanData: CalculatorPageData = {
  slug: "calculators/loans/home-loan-calculator-philippines",
  category: "loans",
  title: "Home Loan Calculator Philippines",
  metaTitle:
    "Home Loan Calculator Philippines: Monthly Payment & Amortization | PesoHub",
  metaDescription:
    "Estimate monthly home loan payments, total interest, and total repayment for Pag-IBIG or bank housing loans in the Philippines.",
  h1: "Home Loan Calculator Philippines",
  intro:
    "Estimate your monthly home loan payment, total interest, and total loan cost before applying. Adjust the property price, down payment, loan term, and interest rate to compare scenarios and find a monthly payment that fits your budget.",
  updatedAt: "2026-03-16",
  defaultInputs: {
    propertyPrice: 3_500_000,
    downPaymentPercent: 20,
    termYears: 20,
    interestRate: 7,
  },
  formula: {
    name: "Monthly Payment Formula",
    description:
      "This home loan calculator estimates your monthly payment using the loan amount, annual interest rate, and repayment term. The loan amount is the property price minus your down payment. The monthly payment is then estimated using a standard amortization formula.",
    explanation:
      "You do not need to calculate it manually, but understanding the formula can help you see why a larger down payment or shorter term can reduce your total borrowing cost. This formula is commonly used to estimate fixed monthly loan payments based on the amount borrowed, interest rate, and repayment term.",
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
      monthlyPayment: 21_708,
      totalInterest: 2_410_009,
      totalCost: 5_910_009,
    },
  },
  tips: [
    "Start with the property price you are considering",
    "Test 10%, 20%, and higher down payment options",
    "Compare 15-, 20-, and 30-year loan terms",
    "Try different interest rates if you are comparing lenders",
    "Leave room in your budget for fees, insurance, dues, taxes, and emergency savings",
  ],
  faqs: [
    {
      question: "What does this home loan calculator estimate?",
      answer:
        "This calculator estimates your monthly payment, loan amount, total interest, and total loan cost based on the property price, down payment, loan term, and interest rate you enter. It is designed for planning and comparison, not as an official lender quote.",
    },
    {
      question: "Is this an official Pag-IBIG or bank quote?",
      answer:
        "No. This calculator provides an estimate to help you compare scenarios before applying. Actual loan offers may vary based on lender policies, borrower profile, loan type, fees, and final approved terms.",
    },
    {
      question:
        "How much down payment is usually needed for a home loan?",
      answer:
        "The required down payment depends on the lender, the property, and the financing arrangement. A larger down payment can reduce the amount financed, lower the monthly payment, and reduce total interest over time.",
    },
    {
      question:
        "Does a longer loan term always make a home loan better?",
      answer:
        "Not always. A longer term can reduce the monthly payment, which may help with affordability, but it can also increase the total interest paid over the life of the loan. It is important to compare both monthly affordability and total cost.",
    },
    {
      question:
        "Can I use this calculator for both Pag-IBIG and bank home loans?",
      answer:
        "Yes. You can use the calculator to model both Pag-IBIG-style and bank-style scenarios by changing the interest rate, term, and down payment assumptions. It is useful for comparing different financing paths before applying.",
    },
    {
      question: "What costs are not included in the estimate?",
      answer:
        "This calculator does not include fees, insurance, property taxes, association dues, move-in costs, or maintenance expenses. It focuses on the estimated financing cost only.",
    },
  ],
  relatedPages: [
    "calculators/loans/car-loan-calculator-philippines",
    "calculators/loans/personal-loan-calculator-philippines",
  ],
};
