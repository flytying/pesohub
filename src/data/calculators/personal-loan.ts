import type { CalculatorPageData } from "@/types/content";

export const personalLoanData: CalculatorPageData = {
  slug: "calculators/loans/personal-loan-calculator-philippines",
  category: "loans",
  title: "Personal Loan Calculator Philippines",
  metaTitle:
    "Personal Loan Calculator Philippines 2025 - Monthly Payment & Interest",
  metaDescription:
    "Calculate your monthly personal loan payment in the Philippines. See total interest, total cost, and the full amortization schedule for bank and online lending.",
  h1: "Personal Loan Calculator Philippines",
  intro:
    "Estimate your monthly personal loan payment, total interest, and total repayment cost. Enter the loan amount, term in months, and interest rate to generate a complete amortization schedule.",
  updatedAt: "2025-03-01",
  defaultInputs: {
    loanAmount: 100_000,
    termMonths: 36,
    interestRate: 12,
  },
  formula: {
    name: "Standard Annuity Formula",
    description:
      "Personal loans in the Philippines use the same standard annuity formula as other amortizing loans.",
    explanation:
      "Monthly Payment = P x [r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly interest rate (annual rate / 12 / 100), and n is the total number of monthly payments. Note: Some Philippine lenders quote a flat monthly add-on rate (e.g., 1.5% per month) rather than a declining-balance rate. This calculator uses the declining-balance (annuity) method, which is the more accurate representation of how interest accrues on the remaining principal.",
  },
  exampleCalculation: {
    scenario:
      "You borrow PHP 100,000 over 36 months at 12% annual interest rate (declining balance).",
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
    "Compare the effective interest rate (EIR) rather than the quoted monthly add-on rate. A 1.5% monthly add-on rate translates to a much higher effective annual rate than 18%.",
    "Check for processing fees, documentary stamp tax, and insurance charges that increase the true cost of borrowing. Some banks charge 1-3% of the loan amount in processing fees.",
    "Use personal loans only for essential needs. Avoid taking personal loans for discretionary spending -- the high interest rates make them one of the most expensive forms of borrowing.",
    "If you have a good credit score and a stable income, negotiate with the bank for a lower interest rate. BPI, BDO, CIMB, and Tonik often offer competitive rates for qualified borrowers.",
  ],
  faqs: [
    {
      question:
        "What are typical personal loan interest rates in the Philippines?",
      answer:
        "Personal loan interest rates in the Philippines vary widely. Traditional banks like BPI, BDO, and Metrobank typically offer declining-balance rates from 10% to 18% per year. Online banks like CIMB, Tonik, and Maya may offer rates from 7% to 15%. Online lending apps often charge significantly higher rates, sometimes exceeding 24-36% per year when converted from their flat monthly add-on rates.",
    },
    {
      question:
        "What is the difference between add-on rate and declining balance rate?",
      answer:
        "An add-on rate calculates interest on the original loan amount for the entire term, meaning you pay interest on money you have already repaid. A declining-balance rate calculates interest only on the remaining outstanding balance each month. For example, a 1.2% monthly add-on rate on a PHP 100,000 loan for 12 months means you pay ₱1,200 in interest every month regardless of your remaining balance. The equivalent declining-balance rate would be approximately 24-26% per year.",
    },
    {
      question: "How much can I borrow with a personal loan in the Philippines?",
      answer:
        "Loan amounts typically range from PHP 10,000 to PHP 3,000,000, depending on the lender and your qualifications. Traditional banks usually offer PHP 20,000 to PHP 2,000,000 based on your monthly income and credit history. Online banks may offer up to PHP 1,000,000. Most lenders require that your monthly loan payment does not exceed 30-40% of your gross monthly income.",
    },
    {
      question:
        "What are the requirements for a personal loan in the Philippines?",
      answer:
        "Standard requirements include being 21-65 years old, a valid government ID, proof of income (payslips for employed, ITR for self-employed), a minimum monthly income (usually PHP 15,000-25,000 for banks), and proof of billing address. Some banks require at least 1-2 years of employment with the same company. A good credit record with no outstanding delinquencies is also important.",
    },
    {
      question: "Can I pay off my personal loan early?",
      answer:
        "Yes, most Philippine banks allow early repayment of personal loans. However, some lenders charge a pre-termination fee, typically 3-5% of the outstanding balance. Check your loan agreement for early termination clauses. Banks like BPI, BDO, and Security Bank may waive this fee for certain products or if you have been paying for at least 12-24 months.",
    },
  ],
  relatedPages: [
    "calculators/loans/car-loan-calculator-philippines",
    "calculators/loans/home-loan-calculator-philippines",
  ],
};
