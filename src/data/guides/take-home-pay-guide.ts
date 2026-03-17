import type { FAQ } from "@/types/content";

export const TAKE_HOME_PAY_GUIDE_UPDATED_AT = "2026-03-17";

export const takeHomePayGuideMeta = {
  title: "Take-Home Pay Guide Philippines",
  metaTitle:
    "Take-Home Pay Guide Philippines – Why Net Pay Is Lower Than Gross Salary | PesoHub",
  metaDescription:
    "Learn why take-home pay is lower than gross salary in the Philippines. See how withholding tax, SSS, PhilHealth, and Pag-IBIG reduce net pay in plain language.",
  slug: "guides/tax/take-home-pay-guide-philippines",
  directAnswer:
    "Learn why your take-home pay is lower than your gross salary in the Philippines. This guide explains the most common payroll deductions, shows how each one affects net pay, and helps you understand why the amount that reaches your payslip or bank account is usually lower than your stated monthly salary.",
};

export interface SalaryBreakdownRow {
  label: string;
  amount: number;
  isDeduction: boolean;
  highlight?: boolean;
}

/**
 * Sample gross-to-net breakdown using ₱35,000 monthly salary.
 * Values align with the calculators on the site.
 */
export const sampleBreakdown: SalaryBreakdownRow[] = [
  { label: "Gross Monthly Salary", amount: 35_000, isDeduction: false },
  { label: "Less: Withholding Tax", amount: 1_741, isDeduction: true },
  { label: "Less: SSS", amount: 1_750, isDeduction: true },
  { label: "Less: PhilHealth", amount: 875, isDeduction: true },
  { label: "Less: Pag-IBIG", amount: 100, isDeduction: true },
  {
    label: "Estimated Take-Home Pay",
    amount: 30_534,
    isDeduction: false,
    highlight: true,
  },
];

export interface DeductionExplainer {
  title: string;
  description: string;
}

export const deductionExplainers: DeductionExplainer[] = [
  {
    title: "Withholding Tax",
    description:
      "This is the income tax withheld from salary based on taxable compensation. It is one of the biggest reasons your take-home pay is lower than your gross pay.",
  },
  {
    title: "SSS Contribution",
    description:
      "This is a mandatory social security contribution. The amount usually depends on salary band and member classification.",
  },
  {
    title: "PhilHealth Contribution",
    description:
      "This is a mandatory health insurance contribution. It is commonly shown as a separate payroll deduction.",
  },
  {
    title: "Pag-IBIG Contribution",
    description:
      "This is a mandatory savings contribution that also appears as part of regular payroll deductions.",
  },
];

export const whyPayslipDiffers = [
  "Loans or salary advances",
  "Company-specific deductions",
  "Overtime or bonuses",
  "Allowances",
  "Voluntary deductions",
  "Rounding or payroll timing differences",
];

export const whatThisHelps = [
  "understand why your net pay is lower than your gross pay",
  "identify which deductions are reducing your salary",
  "learn the difference between tax and contribution deductions",
  "prepare to read your payslip more confidently",
  "move to the take-home pay calculator with better context",
];

export const takeHomePayGuideFaqs: FAQ[] = [
  {
    question: "Why is my salary lower than my gross pay?",
    answer:
      "Because gross pay is before deductions, while the amount you receive is after tax and other payroll deductions.",
  },
  {
    question: "What is the difference between gross pay and net pay?",
    answer:
      "Gross pay is your salary before deductions. Net pay is your take-home pay after deductions are removed.",
  },
  {
    question:
      "What deductions are usually taken from salary in the Philippines?",
    answer:
      "Common deductions include withholding tax, SSS, PhilHealth, and Pag-IBIG, plus possible employer-specific or voluntary deductions.",
  },
  {
    question:
      "Why is my take-home pay different from an online estimate?",
    answer:
      "Online estimates may use standard assumptions, while your actual payslip may include payroll-specific treatment, loans, bonuses, or other adjustments.",
  },
  {
    question: "Is withholding tax the only reason net pay is lower?",
    answer:
      "No. Tax is only one part of the difference. Government contributions and other payroll deductions also reduce take-home pay.",
  },
  {
    question: "What should I do after reading this guide?",
    answer:
      "Use the Take-Home Pay Calculator if you want a faster net-pay estimate, or check the individual tax and contribution guides if you want to understand one deduction more closely.",
  },
];
