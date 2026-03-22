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
 * Shared interface for withholding tax bracket rows.
 */
export interface TaxBracketRow {
  range: string;
  taxDue: string;
  rate: number;
}

// ── Current tables (January 1, 2023 onwards) ──────────────────────

export const annualTaxBrackets: TaxBracketRow[] = [
  { range: "Not over ₱250,000", taxDue: "₱0", rate: 0 },
  { range: "Over ₱250,000 to ₱400,000", taxDue: "15% of excess over ₱250,000", rate: 15 },
  { range: "Over ₱400,000 to ₱800,000", taxDue: "₱22,500 + 20% of excess over ₱400,000", rate: 20 },
  { range: "Over ₱800,000 to ₱2,000,000", taxDue: "₱102,500 + 25% of excess over ₱800,000", rate: 25 },
  { range: "Over ₱2,000,000 to ₱8,000,000", taxDue: "₱402,500 + 30% of excess over ₱2,000,000", rate: 30 },
  { range: "Over ₱8,000,000", taxDue: "₱2,202,500 + 35% of excess over ₱8,000,000", rate: 35 },
];

export const monthlyTaxBrackets: TaxBracketRow[] = [
  { range: "Not over ₱20,833", taxDue: "₱0", rate: 0 },
  { range: "Over ₱20,833 to ₱33,332", taxDue: "15% of excess over ₱20,833", rate: 15 },
  { range: "Over ₱33,333 to ₱66,666", taxDue: "₱1,875 + 20% of excess over ₱33,333", rate: 20 },
  { range: "Over ₱66,667 to ₱166,666", taxDue: "₱8,541.80 + 25% of excess over ₱66,667", rate: 25 },
  { range: "Over ₱166,667 to ₱666,666", taxDue: "₱33,541.80 + 30% of excess over ₱166,667", rate: 30 },
  { range: "Over ₱666,667", taxDue: "₱183,541.80 + 35% of excess over ₱666,667", rate: 35 },
];

// ── Previous tables (January 1, 2018 – December 31, 2022) ────────

export const annualTaxBracketsOld: TaxBracketRow[] = [
  { range: "Not over ₱250,000", taxDue: "₱0", rate: 0 },
  { range: "Over ₱250,000 to ₱400,000", taxDue: "20% of excess over ₱250,000", rate: 20 },
  { range: "Over ₱400,000 to ₱800,000", taxDue: "₱30,000 + 25% of excess over ₱400,000", rate: 25 },
  { range: "Over ₱800,000 to ₱2,000,000", taxDue: "₱130,000 + 30% of excess over ₱800,000", rate: 30 },
  { range: "Over ₱2,000,000 to ₱8,000,000", taxDue: "₱490,000 + 32% of excess over ₱2,000,000", rate: 32 },
  { range: "Over ₱8,000,000", taxDue: "₱2,410,000 + 35% of excess over ₱8,000,000", rate: 35 },
];

export const monthlyTaxBracketsOld: TaxBracketRow[] = [
  { range: "Not over ₱20,833", taxDue: "₱0", rate: 0 },
  { range: "Over ₱20,833 to ₱33,332", taxDue: "20% of excess over ₱20,833", rate: 20 },
  { range: "Over ₱33,333 to ₱66,666", taxDue: "₱2,500 + 25% of excess over ₱33,333", rate: 25 },
  { range: "Over ₱66,667 to ₱166,666", taxDue: "₱10,833.33 + 30% of excess over ₱66,667", rate: 30 },
  { range: "Over ₱166,667 to ₱666,666", taxDue: "₱40,833.33 + 32% of excess over ₱166,667", rate: 32 },
  { range: "Over ₱666,667", taxDue: "₱200,833.33 + 35% of excess over ₱666,667", rate: 35 },
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
