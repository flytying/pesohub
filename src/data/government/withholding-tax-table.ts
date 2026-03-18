import type { FAQ } from "@/types/content";

export const WITHHOLDING_TAX_TABLE_UPDATED_AT = "2026-03-16";

export const withholdingTaxTableMeta = {
  title: "Withholding Tax Table Philippines 2026",
  metaTitle:
    "Withholding Tax Table Philippines 2026: TRAIN Law Rates & Brackets | PesoHub",
  metaDescription:
    "Check Philippine withholding tax brackets and TRAIN Law salary tax tables, then use PesoHub tools to estimate your payroll deductions.",
  slug: "government/bir/withholding-tax-table-philippines",
  directAnswer:
    "View the current withholding tax table used for compensation income in the Philippines, with both annual and monthly reference views. Understand the tax brackets, see how monthly salary maps to annual taxable income, and check a worked example before using the calculator.",
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
  {
    overBut: "₱0",
    notOver: "₱20,833",
    baseTax: 0,
    rate: 0,
    ofExcessOver: 0,
  },
  {
    overBut: "₱20,833",
    notOver: "₱33,332",
    baseTax: 0,
    rate: 15,
    ofExcessOver: 20_833,
  },
  {
    overBut: "₱33,333",
    notOver: "₱66,666",
    baseTax: 1_875,
    rate: 20,
    ofExcessOver: 33_333,
  },
  {
    overBut: "₱66,667",
    notOver: "₱166,666",
    baseTax: 8_541.8,
    rate: 25,
    ofExcessOver: 66_667,
  },
  {
    overBut: "₱166,667",
    notOver: "₱666,666",
    baseTax: 33_541.8,
    rate: 30,
    ofExcessOver: 166_667,
  },
  {
    overBut: "₱666,667",
    notOver: "and above",
    baseTax: 183_541.8,
    rate: 35,
    ofExcessOver: 666_667,
  },
];

export const taxExemptions = [
  "13th month pay and other benefits up to ₱90,000 per year",
  "SSS, PhilHealth, and Pag-IBIG employee contributions",
  "De minimis benefits (rice subsidy, uniform, medical allowance, etc.)",
  "Mandatory contributions to retirement funds",
  "Holiday pay, overtime pay, night shift differential, and hazard pay (for minimum wage earners)",
];

export const withholdingTaxTableFaqs: FAQ[] = [
  {
    question:
      "What is the current withholding tax table used in 2026?",
    answer:
      "BIR's revised withholding tax table in Annex E is the table effective January 1, 2023 and onwards, and it remains the current reference table unless superseded by a later official update.",
  },
  {
    question:
      "Why does this page show both annual and monthly views?",
    answer:
      "The tax framework is annual-based, but many employees think in monthly salary terms. Showing both views makes the structure easier to understand in a payroll context. BIR's Annex E itself includes payroll-period views such as daily, weekly, semi-monthly, and monthly.",
  },
  {
    question: "Is income up to ₱250,000 still tax-exempt?",
    answer:
      "Yes. Under the current withholding tax structure used from 2023 onward, annual taxable income up to ₱250,000 is generally exempt.",
  },
  {
    question:
      "Does the table already account for SSS, PhilHealth, and Pag-IBIG?",
    answer:
      "The official computation steps say taxable compensation should exclude mandatory contributions and non-taxable benefits before the withholding tax table is applied. Actual payroll treatment depends on the compensation details used by the employer.",
  },
  {
    question:
      "Why is my actual payroll withholding different from the table example?",
    answer:
      "Payroll systems may account for mandatory deductions, supplementary compensation, allowances, rounding, or other payroll-specific rules. RR 11-2018 explains that more detailed computation methods may be needed in some cases.",
  },
  {
    question:
      "Where should I go after checking the table?",
    answer:
      "Use the Withholding Tax Calculator if you want a faster estimate from salary input, or read the Withholding Tax Guide if you want a plain-language explanation of how withholding tax works.",
  },
];
