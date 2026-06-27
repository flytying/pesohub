import type { FAQ } from "@/types/content";

export const SSS_LOAN_UPDATED_AT = "2026-06-28";

export const sssLoanData = {
  slug: "calculators/sss/sss-loan-calculator-philippines",
  category: "salary",
  metaTitle: "SSS Loan Calculator Philippines: Salary & Calamity Loan Amortization",
  metaDescription:
    "Estimate the monthly amortization and total cost of an SSS salary or calamity loan in the Philippines. Uses 10% annual interest on a diminishing balance over 24 months.",
  h1: "SSS Loan Calculator Philippines",
  intro:
    "Estimate the monthly amortization and total cost of an SSS salary or calamity loan. See the monthly payment, total interest, service fee, and net proceeds based on the standard 10% annual interest over a 24-month term.",
  updatedAt: SSS_LOAN_UPDATED_AT,
  faqs: [
    {
      question: "What does this SSS loan calculator estimate?",
      answer:
        "It estimates the monthly amortization, total interest, and total repayment for an SSS salary or calamity loan, plus the service fee deducted from the proceeds. It uses the standard 10% annual interest on a diminishing balance over a 24-month term.",
    },
    {
      question: "How much can I borrow from an SSS salary loan?",
      answer:
        "A one-month salary loan is roughly equal to your average monthly salary credit (MSC), and a two-month loan is about twice that. You need at least 36 posted monthly contributions for a one-month loan and 72 for a two-month loan. Enter your expected approved amount in the calculator.",
    },
    {
      question: "What is the interest rate on an SSS loan?",
      answer:
        "SSS salary and calamity loans charge a nominal 10% per year computed on the diminishing principal balance. A 1% service fee is deducted from the proceeds of a salary loan, so the cash you receive is slightly less than the approved amount.",
    },
    {
      question: "How long do I have to repay an SSS loan?",
      answer:
        "SSS member loans are payable in 24 monthly installments (two years). Missed payments accrue penalties, and any unpaid balance is deducted from your future SSS benefits, so keep payments current.",
    },
    {
      question: "Is this an official SSS quote?",
      answer:
        "No. This is an educational estimate for planning. Your actual approved amount, amortization, fees, and any penalties are determined by the SSS based on your contributions and records. Always confirm final figures with the SSS.",
    },
  ] as FAQ[],
};
