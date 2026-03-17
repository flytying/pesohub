import type { FAQ } from "@/types/content";

export const PAGIBIG_HOUSING_LOAN_UPDATED_AT = "2026-03-17";

export const pagibigHousingLoanMeta = {
  title: "Pag-IBIG Housing Loan Guide Philippines",
  metaTitle:
    "Pag-IBIG Housing Loan Guide Philippines – Eligibility, Loanable Amount & Requirements | PesoHub",
  metaDescription:
    "Learn how a Pag-IBIG housing loan works in the Philippines, including eligibility, loanable amount, rates, repricing, and common requirements before applying.",
  slug: "government/pag-ibig/pag-ibig-housing-loan-guide",
  directAnswer:
    "Learn how a Pag-IBIG housing loan works in the Philippines, who may qualify, what affects the loanable amount, how rates and repricing work, and what documents are usually required. Use this guide to understand the basics before you estimate payments or prepare an application.",
};

export interface HousingLoanRate {
  loanAmount: string;
  repricingPeriod: string;
  interestRate: number;
}

export const housingLoanRates: HousingLoanRate[] = [
  { loanAmount: "₱450,000 and below", repricingPeriod: "End of loan term (fixed)", interestRate: 5.375 },
  { loanAmount: "₱450,001 – ₱750,000", repricingPeriod: "End of loan term (fixed)", interestRate: 6.375 },
  { loanAmount: "₱750,001 – ₱1,500,000", repricingPeriod: "End of loan term (fixed)", interestRate: 6.625 },
  { loanAmount: "₱1,500,001 – ₱2,500,000", repricingPeriod: "3 years", interestRate: 7.375 },
  { loanAmount: "₱2,500,001 – ₱6,000,000", repricingPeriod: "3 years", interestRate: 8.375 },
];

export interface LoanLimit {
  contributionYears: string;
  maxLoanAmount: string;
}

export const loanLimits: LoanLimit[] = [
  { contributionYears: "2–4 years", maxLoanAmount: "₱500,000" },
  { contributionYears: "5–9 years", maxLoanAmount: "₱1,000,000" },
  { contributionYears: "10–14 years", maxLoanAmount: "₱2,000,000" },
  { contributionYears: "15–19 years", maxLoanAmount: "₱4,000,000" },
  { contributionYears: "20 years and above", maxLoanAmount: "₱6,000,000" },
];

export const eligibilityItems = [
  "Active Pag-IBIG membership",
  "Required contribution history (at least 24 monthly contributions)",
  "Age and loan maturity conditions (not over 65 at application, not over 70 at loan maturity)",
  "Capacity to repay the monthly loan",
  "Acceptable loan purpose and property type",
];

export const loanableAmountFactors = [
  "Ability to repay the monthly loan",
  "Appraised value or collateral basis",
  "Contribution and membership standing",
  "Chosen loan term",
  "Product rules and internal evaluation",
];

export const rateComparisonPoints = [
  "The starting rate",
  "The monthly payment under different terms",
  "How long the rate is expected to stay fixed",
  "What may happen when the loan is repriced later",
];

export const documentChecklist = [
  "Membership and account information",
  "Valid identification",
  "Proof of income",
  "Employment or business documents",
  "Property-related documents",
  "Signed application forms",
  "Additional supporting documents if required",
];

export const housingPurposes = [
  "Home purchase",
  "House and lot purchase",
  "Condominium purchase",
  "Home construction",
  "Home improvement",
  "Refinancing or related approved housing purposes",
];

export const questionsBeforeApplying = [
  "Am I likely to meet the membership and contribution conditions?",
  "Is the property type likely to fit the loan purpose?",
  "Does the monthly payment look realistic for my budget?",
  "Have I compared loan terms and rate scenarios?",
  "Do I already have the basic documents I will need?",
];

export const pagibigHousingLoanFaqs: FAQ[] = [
  {
    question: "What is a Pag-IBIG housing loan?",
    answer:
      "A Pag-IBIG housing loan is a housing financing option designed for qualified Pag-IBIG members who meet the required conditions and want to finance an approved housing purpose.",
  },
  {
    question: "How do I know if I may qualify?",
    answer:
      "Qualification usually depends on factors such as membership standing, contribution history, age or maturity conditions, repayment capacity, and the type of property or housing purpose involved.",
  },
  {
    question: "What affects how much I may borrow?",
    answer:
      "Loanable amount usually depends on repayment capacity, property value or appraisal basis, contribution standing, chosen term, and the program rules used in the evaluation.",
  },
  {
    question: "Why do rates and repricing matter?",
    answer:
      "The rate and repricing structure affect your monthly payment and may also affect how your payment changes over time. That is why it helps to compare scenarios before applying.",
  },
  {
    question:
      "Do I need complete documents before estimating my payment?",
    answer:
      "No. You can use a calculator first to estimate the possible monthly payment, then gather documents once you are more confident the loan scenario fits your budget.",
  },
  {
    question: "What should I do after reading this guide?",
    answer:
      "Use the Home Loan Calculator if you want to estimate payments, or check the Pag-IBIG Contribution Table if you want to understand the contribution side of the broader Pag-IBIG journey.",
  },
];
