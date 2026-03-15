import type { FAQ } from "@/types/content";

export const WITHHOLDING_TAX_TABLE_UPDATED_AT = "2026-03-14";

export const withholdingTaxTableMeta = {
  title: "Withholding Tax Table Philippines",
  metaTitle: "Withholding Tax Table Philippines 2025 — TRAIN Law Brackets & Rates",
  metaDescription:
    "Official Philippine withholding tax table under the TRAIN Law (2023 onwards). See annual and monthly tax brackets, rates, and a worked example for employees.",
  slug: "government/bir/withholding-tax-table-philippines",
  directAnswer:
    "Under the TRAIN Law (effective 2023 onwards), the first PHP 250,000 of annual taxable income is tax-exempt. Income above that is taxed at progressive rates: 15% (PHP 250K–400K), 20% (PHP 400K–800K), 25% (PHP 800K–2M), 30% (PHP 2M–8M), and 35% (over PHP 8M).",
};

/**
 * Monthly equivalents for reference display.
 */
export interface MonthlyTaxBracket {
  overBut: string;
  notOver: string;
  baseTax: number;
  rate: number;
  ofExcessOver: number;
}

export const monthlyTaxBrackets: MonthlyTaxBracket[] = [
  { overBut: "PHP 0", notOver: "PHP 20,833", baseTax: 0, rate: 0, ofExcessOver: 0 },
  { overBut: "PHP 20,833", notOver: "PHP 33,333", baseTax: 0, rate: 15, ofExcessOver: 20_833 },
  { overBut: "PHP 33,333", notOver: "PHP 66,667", baseTax: 1_875, rate: 20, ofExcessOver: 33_333 },
  { overBut: "PHP 66,667", notOver: "PHP 166,667", baseTax: 8_541.67, rate: 25, ofExcessOver: 66_667 },
  { overBut: "PHP 166,667", notOver: "PHP 666,667", baseTax: 33_541.67, rate: 30, ofExcessOver: 166_667 },
  { overBut: "PHP 666,667", notOver: "and above", baseTax: 183_541.67, rate: 35, ofExcessOver: 666_667 },
];

export const taxExemptions = [
  "13th month pay and other benefits up to PHP 90,000 per year",
  "SSS, PhilHealth, and Pag-IBIG employee contributions",
  "De minimis benefits (rice subsidy, uniform, medical allowance, etc.)",
  "Mandatory contributions to retirement funds",
  "Holiday pay, overtime pay, night shift differential, and hazard pay (for minimum wage earners)",
];

export const withholdingTaxTableFaqs: FAQ[] = [
  {
    question: "Who is exempt from withholding tax in the Philippines?",
    answer:
      "Employees earning PHP 250,000 or less per year (about PHP 20,833/month) are exempt from income tax. Minimum wage earners are also exempt regardless of the amount, including their holiday pay, overtime pay, night shift differential, and hazard pay.",
  },
  {
    question: "What is the TRAIN Law?",
    answer:
      "The Tax Reform for Acceleration and Inclusion (TRAIN) Law, or Republic Act No. 10963, took effect on January 1, 2018. It simplified the income tax structure, raised the tax-exempt threshold to PHP 250,000, and adjusted brackets. The current rates (effective 2023 onwards) are the final phase of the TRAIN Law reform.",
  },
  {
    question: "How does my employer compute my withholding tax?",
    answer:
      "Your employer calculates your taxable income by subtracting mandatory contributions (SSS, PhilHealth, Pag-IBIG) and other exempt benefits from your gross salary. The remaining taxable income is then matched to the withholding tax table to determine the amount withheld each pay period.",
  },
  {
    question: "Is the withholding tax my final income tax?",
    answer:
      "For most employees with a single employer, the withholding tax serves as the final tax — your employer handles the year-end adjustment. If you have multiple income sources, you may need to file an annual income tax return (BIR Form 1700 or 1701) and pay any difference or claim a refund.",
  },
  {
    question: "How do I check if my employer is computing my tax correctly?",
    answer:
      "Review your payslip for the gross salary, deductions (SSS, PhilHealth, Pag-IBIG), and withholding tax amount. You can verify the tax by using the BIR withholding tax table or our Withholding Tax Calculator. Your BIR Form 2316 (Certificate of Compensation Payment/Tax Withheld) issued at year-end should match your total withholdings.",
  },
];
