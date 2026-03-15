import type { FAQ } from "@/types/content";

export const PAGIBIG_HOUSING_LOAN_UPDATED_AT = "2026-03-14";

export const pagibigHousingLoanMeta = {
  title: "Pag-IBIG Housing Loan Guide",
  metaTitle: "Pag-IBIG Housing Loan Guide 2025 — Rates, Limits & Requirements",
  metaDescription:
    "Complete guide to Pag-IBIG Fund housing loans. See interest rates, maximum loanable amounts, eligibility requirements, and how to apply for a Pag-IBIG home loan.",
  slug: "government/pag-ibig/pag-ibig-housing-loan-guide",
  directAnswer:
    "Pag-IBIG housing loans offer interest rates from 5.375% to 10.375% per year depending on loan amount and term. Maximum loanable amount is PHP 6 million (or PHP 10 million under the Affordable Housing Program). You need at least 24 monthly Pag-IBIG contributions to qualify.",
};

export interface HousingLoanRate {
  loanAmount: string;
  repricingPeriod: string;
  interestRate: number;
}

export const housingLoanRates: HousingLoanRate[] = [
  { loanAmount: "PHP 450,000 and below", repricingPeriod: "End of loan term (fixed)", interestRate: 5.375 },
  { loanAmount: "PHP 450,001 – PHP 750,000", repricingPeriod: "End of loan term (fixed)", interestRate: 6.375 },
  { loanAmount: "PHP 750,001 – PHP 1,500,000", repricingPeriod: "End of loan term (fixed)", interestRate: 6.625 },
  { loanAmount: "PHP 1,500,001 – PHP 2,500,000", repricingPeriod: "3 years", interestRate: 7.375 },
  { loanAmount: "PHP 2,500,001 – PHP 6,000,000", repricingPeriod: "3 years", interestRate: 8.375 },
];

export interface LoanLimit {
  contributionYears: string;
  maxLoanAmount: string;
}

export const loanLimits: LoanLimit[] = [
  { contributionYears: "2–4 years", maxLoanAmount: "PHP 500,000" },
  { contributionYears: "5–9 years", maxLoanAmount: "PHP 1,000,000" },
  { contributionYears: "10–14 years", maxLoanAmount: "PHP 2,000,000" },
  { contributionYears: "15–19 years", maxLoanAmount: "PHP 4,000,000" },
  { contributionYears: "20 years and above", maxLoanAmount: "PHP 6,000,000" },
];

export const eligibilityRequirements = [
  "Active Pag-IBIG member with at least 24 monthly contributions",
  "Not more than 65 years old at the time of loan application",
  "Must not have an existing Pag-IBIG housing loan or must have fully paid a previous one",
  "Has legal capacity to acquire and encumber real property",
  "Must not have had a Pag-IBIG housing loan that was foreclosed, canceled, or bought back",
];

export const documentRequirements = [
  "Pag-IBIG Housing Loan Application Form (HQP-HLF-068)",
  "Valid government-issued IDs (2 copies)",
  "Proof of income (COE with compensation, ITR, or business permit)",
  "Transfer Certificate of Title (TCT) or Condominium Certificate of Title (CCT)",
  "Tax Declaration and Tax Clearance",
  "Lot plan and vicinity map",
  "Contract to Sell or Deed of Absolute Sale",
];

export const pagibigHousingLoanFaqs: FAQ[] = [
  {
    question: "How long can I pay my Pag-IBIG housing loan?",
    answer:
      "Pag-IBIG housing loans can be paid over a maximum term of 30 years. The minimum term is 1 year. Longer terms mean lower monthly payments but higher total interest paid.",
  },
  {
    question: "What is the maximum Pag-IBIG housing loan amount?",
    answer:
      "The maximum loanable amount is PHP 6 million for regular housing loans. Under the Affordable Housing Program, members can borrow up to PHP 10 million for properties in designated areas. The actual amount depends on your paying capacity, contribution years, and property appraisal value.",
  },
  {
    question: "Can I use my Pag-IBIG savings as down payment?",
    answer:
      "Yes. You can use your Total Accumulated Value (TAV) in your Pag-IBIG savings as part of your equity or down payment for the housing loan. You can request a TAV withdrawal for this purpose.",
  },
  {
    question: "How do I apply for a Pag-IBIG housing loan?",
    answer:
      "You can apply online through the Pag-IBIG Fund Virtual Office or in person at any Pag-IBIG branch. Submit the required documents, wait for property appraisal and credit investigation, then sign the loan documents upon approval. The process typically takes 20-30 business days.",
  },
  {
    question: "What happens if I miss a Pag-IBIG housing loan payment?",
    answer:
      "Late payments incur a penalty of 1/20 of 1% per day of delay. If you miss three consecutive monthly payments, your loan account is classified as delinquent. After six months of non-payment, foreclosure proceedings may begin. Contact Pag-IBIG immediately if you are having difficulty making payments to explore restructuring options.",
  },
];
