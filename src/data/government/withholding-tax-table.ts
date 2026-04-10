import type { FAQ } from "@/types/content";

export const WITHHOLDING_TAX_TABLE_UPDATED_AT = "2026-03-16";

export const withholdingTaxTableMeta = {
  title: "Withholding Tax Table Philippines 2026",
  metaTitle:
    "Withholding Tax Table Philippines 2026: TRAIN Law Rates & Brackets | PesoHub",
  metaDescription:
    "View the 2026 BIR withholding tax table for the Philippines with TRAIN Law income tax brackets, monthly salary tax rates, and a worked example. Use our calculator for quick payroll estimates.",
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

// ── Payroll period table config ────────────────────────────────────

export interface PayrollPeriodTable {
  id: string;
  label: string;
  current: TaxBracketRow[];
  old: TaxBracketRow[];
}

export const payrollPeriodTables: PayrollPeriodTable[] = [
  {
    id: "daily",
    label: "Daily",
    current: [
      { range: "₱685 and below", taxDue: "₱0", rate: 0 },
      { range: "₱685 – ₱1,095", taxDue: "0.00 +15% over ₱685", rate: 15 },
      { range: "₱1,096 – ₱2,191", taxDue: "₱61.65 +20% over ₱1,096", rate: 20 },
      { range: "₱2,192 – ₱5,478", taxDue: "₱280.85 +25% over ₱2,192", rate: 25 },
      { range: "₱5,479 – ₱21,917", taxDue: "₱1,102.60 +30% over ₱5,479", rate: 30 },
      { range: "₱21,918 and above", taxDue: "₱6,034.30 +35% over ₱21,918", rate: 35 },
    ],
    old: [
      { range: "₱685 and below", taxDue: "₱0", rate: 0 },
      { range: "₱685 – ₱1,095", taxDue: "0.00 +20% over ₱685", rate: 20 },
      { range: "₱1,096 – ₱2,191", taxDue: "₱82.19 +25% over ₱1,096", rate: 25 },
      { range: "₱2,192 – ₱5,478", taxDue: "₱356.16 +30% over ₱2,192", rate: 30 },
      { range: "₱5,479 – ₱21,917", taxDue: "₱1,342.47 +32% over ₱5,479", rate: 32 },
      { range: "₱21,918 and above", taxDue: "₱6,602.74 +35% over ₱21,918", rate: 35 },
    ],
  },
  {
    id: "weekly",
    label: "Weekly",
    current: [
      { range: "₱4,808 and below", taxDue: "₱0", rate: 0 },
      { range: "₱4,808 – ₱7,691", taxDue: "0.00 +15% over ₱4,808", rate: 15 },
      { range: "₱7,692 – ₱15,384", taxDue: "₱432.60 +20% over ₱7,692", rate: 20 },
      { range: "₱15,385 – ₱38,461", taxDue: "₱1,971.20 +25% over ₱15,385", rate: 25 },
      { range: "₱38,462 – ₱153,845", taxDue: "₱7,740.45 +30% over ₱38,462", rate: 30 },
      { range: "₱153,846 and above", taxDue: "₱42,355.65 +35% over ₱153,846", rate: 35 },
    ],
    old: [
      { range: "₱4,808 and below", taxDue: "₱0", rate: 0 },
      { range: "₱4,808 – ₱7,691", taxDue: "0.00 +20% over ₱4,808", rate: 20 },
      { range: "₱7,692 – ₱15,384", taxDue: "₱576.92 +25% over ₱7,692", rate: 25 },
      { range: "₱15,385 – ₱38,461", taxDue: "₱2,500.00 +30% over ₱15,385", rate: 30 },
      { range: "₱38,462 – ₱153,845", taxDue: "₱9,423.08 +32% over ₱38,462", rate: 32 },
      { range: "₱153,846 and above", taxDue: "₱46,346.15 +35% over ₱153,846", rate: 35 },
    ],
  },
  {
    id: "semi-monthly",
    label: "Semi-Monthly",
    current: [
      { range: "₱10,417 and below", taxDue: "₱0", rate: 0 },
      { range: "₱10,417 – ₱16,666", taxDue: "0.00 +15% over ₱10,417", rate: 15 },
      { range: "₱16,667 – ₱33,332", taxDue: "₱937.50 +20% over ₱16,667", rate: 20 },
      { range: "₱33,333 – ₱83,332", taxDue: "₱4,270.70 +25% over ₱33,333", rate: 25 },
      { range: "₱83,333 – ₱333,332", taxDue: "₱16,770.70 +30% over ₱83,333", rate: 30 },
      { range: "₱333,333 and above", taxDue: "₱91,770.70 +35% over ₱333,333", rate: 35 },
    ],
    old: [
      { range: "₱10,417 and below", taxDue: "₱0", rate: 0 },
      { range: "₱10,417 – ₱16,666", taxDue: "0.00 +20% over ₱10,417", rate: 20 },
      { range: "₱16,667 – ₱33,332", taxDue: "₱1,250.00 +25% over ₱16,667", rate: 25 },
      { range: "₱33,333 – ₱83,332", taxDue: "₱5,416.67 +30% over ₱33,333", rate: 30 },
      { range: "₱83,333 – ₱333,332", taxDue: "₱20,416.67 +32% over ₱83,333", rate: 32 },
      { range: "₱333,333 and above", taxDue: "₱100,416.67 +35% over ₱333,333", rate: 35 },
    ],
  },
  {
    id: "monthly",
    label: "Monthly",
    current: [
      { range: "₱20,833 and below", taxDue: "₱0", rate: 0 },
      { range: "₱20,833 – ₱33,332", taxDue: "0.00 +15% over ₱20,833", rate: 15 },
      { range: "₱33,333 – ₱66,666", taxDue: "₱1,875.00 +20% over ₱33,333", rate: 20 },
      { range: "₱66,667 – ₱166,666", taxDue: "₱8,541.80 +25% over ₱66,667", rate: 25 },
      { range: "₱166,667 – ₱666,666", taxDue: "₱33,541.80 +30% over ₱166,667", rate: 30 },
      { range: "₱666,667 and above", taxDue: "₱183,541.80 +35% over ₱666,667", rate: 35 },
    ],
    old: [
      { range: "₱20,833 and below", taxDue: "₱0", rate: 0 },
      { range: "₱20,833 – ₱33,332", taxDue: "0.00 +20% over ₱20,833", rate: 20 },
      { range: "₱33,333 – ₱66,666", taxDue: "₱2,500.00 +25% over ₱33,333", rate: 25 },
      { range: "₱66,667 – ₱166,666", taxDue: "₱10,833.33 +30% over ₱66,667", rate: 30 },
      { range: "₱166,667 – ₱666,666", taxDue: "₱40,833.33 +32% over ₱166,667", rate: 32 },
      { range: "₱666,667 and above", taxDue: "₱200,833.33 +35% over ₱666,667", rate: 35 },
    ],
  },
  {
    id: "annual",
    label: "Annual",
    current: [
      { range: "Not over ₱250,000", taxDue: "₱0", rate: 0 },
      { range: "Over ₱250,000 to ₱400,000", taxDue: "15% of excess over ₱250,000", rate: 15 },
      { range: "Over ₱400,000 to ₱800,000", taxDue: "₱22,500 + 20% of excess over ₱400,000", rate: 20 },
      { range: "Over ₱800,000 to ₱2,000,000", taxDue: "₱102,500 + 25% of excess over ₱800,000", rate: 25 },
      { range: "Over ₱2,000,000 to ₱8,000,000", taxDue: "₱402,500 + 30% of excess over ₱2,000,000", rate: 30 },
      { range: "Over ₱8,000,000", taxDue: "₱2,202,500 + 35% of excess over ₱8,000,000", rate: 35 },
    ],
    old: [
      { range: "Not over ₱250,000", taxDue: "₱0", rate: 0 },
      { range: "Over ₱250,000 to ₱400,000", taxDue: "20% of excess over ₱250,000", rate: 20 },
      { range: "Over ₱400,000 to ₱800,000", taxDue: "₱30,000 + 25% of excess over ₱400,000", rate: 25 },
      { range: "Over ₱800,000 to ₱2,000,000", taxDue: "₱130,000 + 30% of excess over ₱800,000", rate: 30 },
      { range: "Over ₱2,000,000 to ₱8,000,000", taxDue: "₱490,000 + 32% of excess over ₱2,000,000", rate: 32 },
      { range: "Over ₱8,000,000", taxDue: "₱2,410,000 + 35% of excess over ₱8,000,000", rate: 35 },
    ],
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
  {
    question:
      "How do I compute my withholding tax from the BIR tax table?",
    answer:
      "Find the row in the withholding tax table that matches your annual taxable income (gross pay minus SSS, PhilHealth, and Pag-IBIG). The tax due is the fixed amount for that bracket plus a percentage of the excess over the bracket floor. For example, annual taxable income of \u20B1400,000 falls in the \u20B1250,001\u2013\u20B1400,000 bracket: \u20B10 + 15% of \u20B1150,000 = \u20B122,500 per year.",
  },
  {
    question:
      "What are the income tax brackets in the Philippines under TRAIN Law?",
    answer:
      "The TRAIN Law (RA 10963) sets six income tax brackets for compensation earners: 0% on income up to \u20B1250,000; 15% on \u20B1250,001\u2013\u20B1400,000; 20% on \u20B1400,001\u2013\u20B1800,000; 25% on \u20B1800,001\u2013\u20B12,000,000; 30% on \u20B12,000,001\u2013\u20B18,000,000; and 35% on income above \u20B18,000,000. These rates have been in effect since January 2023.",
  },
];
