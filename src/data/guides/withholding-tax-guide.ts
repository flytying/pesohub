import type { FAQ } from "@/types/content";

export const WITHHOLDING_TAX_UPDATED_AT = "2026-03-14";

export const withholdingTaxMeta = {
  title: "How Withholding Tax Works in the Philippines",
  metaTitle: "How Withholding Tax Works in the Philippines (2026 TRAIN Law Guide)",
  metaDescription:
    "Learn how Philippine withholding tax works under the TRAIN Law. Understand the tax brackets, computation formula, and how your employer deducts tax from your salary.",
  slug: "guides/tax/how-withholding-tax-works-philippines",
  directAnswer:
    "Withholding tax is the amount your employer deducts from your salary each payday and remits to the BIR on your behalf. Under the TRAIN Law, the first PHP 250,000 of annual taxable income is tax-free. Income above that is taxed at graduated rates from 15% to 35%.",
};

/**
 * TRAIN Law (RA 10963) graduated income tax table effective January 1, 2023 onwards.
 */
export interface TaxBracket {
  overBut: string;
  notOver: string;
  baseTax: number;
  rate: number;
  ofExcessOver: number;
}

export const trainLawBrackets: TaxBracket[] = [
  {
    overBut: "0",
    notOver: "250,000",
    baseTax: 0,
    rate: 0,
    ofExcessOver: 0,
  },
  {
    overBut: "250,000",
    notOver: "400,000",
    baseTax: 0,
    rate: 15,
    ofExcessOver: 250000,
  },
  {
    overBut: "400,000",
    notOver: "800,000",
    baseTax: 22500,
    rate: 20,
    ofExcessOver: 400000,
  },
  {
    overBut: "800,000",
    notOver: "2,000,000",
    baseTax: 102500,
    rate: 25,
    ofExcessOver: 800000,
  },
  {
    overBut: "2,000,000",
    notOver: "8,000,000",
    baseTax: 402500,
    rate: 30,
    ofExcessOver: 2000000,
  },
  {
    overBut: "8,000,000",
    notOver: "No limit",
    baseTax: 2202500,
    rate: 35,
    ofExcessOver: 8000000,
  },
];

export const withholdingTaxFaqs: FAQ[] = [
  {
    question:
      "Who is exempt from withholding tax in the Philippines?",
    answer:
      "Employees earning PHP 250,000 or less per year (roughly PHP 20,833 per month) are exempt from income tax under the TRAIN Law. Minimum wage earners are also exempt regardless of the amount, as long as they receive only the statutory minimum wage and mandatory benefits.",
  },
  {
    question:
      "What is the difference between withholding tax and income tax?",
    answer:
      "Income tax is the total amount you owe to the government for the year based on your taxable income. Withholding tax is the method of collecting that income tax in advance: your employer deducts a portion of your salary each payday and sends it to the BIR. At year-end, any overpayment or underpayment is reconciled.",
  },
  {
    question:
      "How do I know if my employer is withholding the correct amount?",
    answer:
      "Check your payslip for the withholding tax line item. You can verify the amount by computing your annual taxable income (gross pay minus SSS, PhilHealth, Pag-IBIG contributions and any other deductions), applying the TRAIN Law tax table, and dividing by 12 (or the number of pay periods). Your BIR Form 2316 at year-end should match the total withheld.",
  },
  {
    question: "What happens if too much tax was withheld?",
    answer:
      "If your employer withheld more tax than you actually owe for the year, you are entitled to a refund. This usually happens during the year-end adjustment in December. Your employer will compute your actual annual tax, compare it to the total withheld, and refund the excess through your payroll.",
  },
  {
    question:
      "Do freelancers and self-employed workers pay withholding tax?",
    answer:
      "Yes, but the process is different. Clients who hire freelancers may withhold a percentage (typically 5% or 10%) of the payment as creditable withholding tax (CWT). Self-employed individuals and professionals must file quarterly income tax returns (BIR Form 1701Q) and an annual return, applying the same TRAIN Law tax brackets or the optional 8% flat rate on gross sales/receipts.",
  },
];
