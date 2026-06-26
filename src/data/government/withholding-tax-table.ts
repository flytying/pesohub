import type { FAQ } from "@/types/content";

export const WITHHOLDING_TAX_TABLE_UPDATED_AT = "2026-06-26";

export const withholdingTaxTableMeta = {
  title: "BIR Withholding Tax Table 2026 Philippines",
  metaTitle:
    "BIR Withholding Tax Table 2026 Philippines | Monthly & Semi-Monthly",
  metaDescription:
    "View the 2026 BIR withholding tax table for compensation income in the Philippines. Includes monthly, semi-monthly, weekly, daily, and annual TRAIN Law tax brackets.",
  slug: "government/bir/withholding-tax-table-philippines",
  directAnswer:
    "The 2026 BIR withholding tax table in the Philippines follows the TRAIN Law schedule effective January 1, 2023 onwards. Use the tables below to check monthly, semi-monthly, weekly, daily, and annual withholding tax brackets for compensation income.",
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
    question: "What is the BIR withholding tax table for 2026?",
    answer:
      "The 2026 BIR withholding tax table is the revised table in Annex E of RR 11-2018, effective January 1, 2023 onwards under the TRAIN Law (RA 10963). It sets the prescribed withholding tax for each payroll period — daily, weekly, semi-monthly, and monthly — based on taxable compensation, and remains the current table unless superseded by a later official update.",
  },
  {
    question: "Is the 2026 withholding tax table different from 2025?",
    answer:
      "No. The 2026 table is the same as 2025. The TRAIN Law's lower rate schedule took effect on January 1, 2023 and has not changed since, so the 2023, 2024, 2025, and 2026 withholding tax tables are identical. A page advertising a 'new 2026 table' is referring to this same schedule.",
  },
  {
    question: "What is the monthly withholding tax table for 2026?",
    answer:
      "For monthly-paid employees, compensation of ₱20,833 and below is exempt. Above that: ₱20,833–₱33,332 is taxed 15% of the excess over ₱20,833; ₱33,333–₱66,666 is ₱1,875 + 20% of the excess over ₱33,333; ₱66,667–₱166,666 is ₱8,541.80 + 25% of the excess over ₱66,667; ₱166,667–₱666,666 is ₱33,541.80 + 30%; and ₱666,667 and above is ₱183,541.80 + 35%.",
  },
  {
    question: "What is the semi-monthly withholding tax table for 2026?",
    answer:
      "For semi-monthly pay, compensation of ₱10,417 and below is exempt. Above that: ₱10,417–₱16,666 is taxed 15% of the excess over ₱10,417; ₱16,667–₱33,332 is ₱937.50 + 20%; ₱33,333–₱83,332 is ₱4,270.70 + 25%; ₱83,333–₱333,332 is ₱16,770.70 + 30%; and ₱333,333 and above is ₱91,770.70 + 35%.",
  },
  {
    question: "Who is exempt from withholding tax in the Philippines?",
    answer:
      "Employees whose taxable compensation falls within the exempt band for their payroll period (for example, ₱20,833 or less per month) have zero withholding tax. Statutory minimum wage earners are also exempt from withholding tax on their basic minimum wage, holiday pay, overtime, night-shift differential, and hazard pay.",
  },
  {
    question: "Is ₱20,833 per month still tax-free?",
    answer:
      "Yes. ₱20,833 per month corresponds to ₱250,000 per year, which is the tax-exempt threshold under the TRAIN Law. Monthly taxable compensation of ₱20,833 and below has zero withholding tax in 2026.",
  },
  {
    question:
      "Does the BIR tax table use gross salary or taxable compensation?",
    answer:
      "Taxable compensation, not gross salary. You first subtract mandatory contributions (SSS, PhilHealth, Pag-IBIG) and non-taxable benefits from gross pay to get taxable compensation, then match that amount to the withholding tax table.",
  },
  {
    question:
      "Are SSS, PhilHealth, and Pag-IBIG deducted before withholding tax?",
    answer:
      "Yes. Employee SSS, PhilHealth, and Pag-IBIG contributions are excluded from taxable compensation before the withholding tax table is applied, which lowers the tax due compared with using gross salary directly.",
  },
  {
    question: "Where can I find the official BIR withholding tax table?",
    answer:
      "The official table is published by the Bureau of Internal Revenue (BIR) in Revenue Regulations No. 11-2018, Annex E, available on bir.gov.ph. This page mirrors that schedule for quick reference but is not affiliated with the BIR — always confirm against the official source.",
  },
  {
    question: "How do I compute withholding tax from my monthly salary?",
    answer:
      "Subtract your SSS, PhilHealth, and Pag-IBIG employee shares from your gross monthly pay to get monthly taxable compensation. Find the matching row in the monthly table: the tax is the fixed amount for that bracket plus the stated percentage of the excess over the bracket floor. For example, ₱32,175 taxable falls in the ₱20,833–₱33,332 row: 15% of (₱32,175 − ₱20,833) ≈ ₱1,701 per month.",
  },
];
