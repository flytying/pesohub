import type { FAQ } from "@/types/content";

export const PAGIBIG_GUIDE_UPDATED_AT = "2026-03-17";

export const pagibigGuideMeta = {
  title: "Pag-IBIG Deduction Guide Philippines",
  metaTitle:
    "Pag-IBIG Deduction Guide Philippines – Regular Contribution vs Housing Loan vs MP2 | PesoHub",
  metaDescription:
    "Learn what Pag-IBIG deduction on payroll usually means in the Philippines, including the difference between regular contribution, housing loan payment, and MP2 savings.",
  slug: "guides/government/pag-ibig-deduction-guide",
  directAnswer:
    "Learn what Pag-IBIG deductions usually mean on payroll in the Philippines, including the difference between regular Pag-IBIG contribution, housing loan payments, and MP2 savings. Use this guide to understand which amounts are standard payroll deductions, which ones are loan-related, and where to verify the exact basis used.",
};

export interface PagIBIGDeductionType {
  title: string;
  description: string;
  tag: string;
}

export const deductionTypes: PagIBIGDeductionType[] = [
  {
    title: "Regular Pag-IBIG Contribution",
    description:
      "This is the standard contribution usually deducted from salary for Pag-IBIG membership and regular savings.",
    tag: "Payroll deduction",
  },
  {
    title: "Pag-IBIG Housing Loan Payment",
    description:
      "This is a separate loan payment connected to an approved housing loan. It is not the same as the regular payroll contribution.",
    tag: "Loan payment",
  },
  {
    title: "MP2 Savings",
    description:
      "MP2 is a separate voluntary savings product. It is not the same as the regular mandatory payroll deduction.",
    tag: "Voluntary savings",
  },
];

export const payslipPatterns = [
  "Regular contribution usually appears as a standard deduction",
  "Housing loan payment may appear separately if salary deduction is arranged",
  "MP2 may not appear unless there is a specific payment arrangement",
  "The payslip description may not always explain the full context clearly",
];

export const howToCheck = [
  "Review the regular contribution table first",
  "Compare the payslip amount with the expected employee share",
  "Ask whether there is an active housing loan deduction arrangement",
  "Confirm whether the amount is a voluntary savings or loan-related payment",
];

export const whyAmountDiffers = [
  "Regular contribution follows the standard contribution basis",
  "Housing loan payment depends on the approved loan and repayment schedule",
  "MP2 is separate from regular mandatory contribution",
  "Payroll handling may label amounts in a simplified way",
];

export const whatThisHelps = [
  "understand what Pag-IBIG deduction on a payslip usually means",
  "know the difference between regular contribution and housing loan payment",
  "understand how MP2 differs from regular payroll deduction",
  "know where to verify the correct amount",
  "move to the correct Pag-IBIG reference page next",
];

export const pagibigGuideFaqs: FAQ[] = [
  {
    question: "What is Pag-IBIG deduction on payroll?",
    answer:
      "In many cases, it refers to the regular Pag-IBIG contribution deducted from salary.",
  },
  {
    question:
      "Is Pag-IBIG deduction the same as a housing loan payment?",
    answer:
      "No. Regular contribution and housing loan payment are different Pag-IBIG-related amounts.",
  },
  {
    question: "Is MP2 part of the regular payroll deduction?",
    answer:
      "No. MP2 is a separate voluntary savings product and is not the same as the regular mandatory contribution.",
  },
  {
    question:
      "Why is my Pag-IBIG-related amount higher than I expected?",
    answer:
      "It may not be the regular contribution only. It could be connected to a housing loan payment or another arrangement.",
  },
  {
    question: "Where should I verify the regular contribution amount?",
    answer:
      "Use the Pag-IBIG Contribution Table page to verify the standard contribution basis.",
  },
  {
    question: "What page should I check next?",
    answer:
      "Check the contribution table for regular deduction, the housing loan guide for loan-related questions, or the Take-Home Pay Calculator for a full deduction estimate.",
  },
];
