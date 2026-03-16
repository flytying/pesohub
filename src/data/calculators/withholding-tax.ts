import type { CalculatorPageData } from "@/types/content";

export const withholdingTaxData: CalculatorPageData = {
  slug: "calculators/tax/withholding-tax-calculator-philippines",
  category: "tax",
  title: "Withholding Tax Calculator Philippines",
  metaTitle:
    "Withholding Tax Calculator Philippines – Estimate Monthly Tax From Salary | PesoHub",
  metaDescription:
    "Estimate your monthly withholding tax in the Philippines using your gross monthly salary. See annual tax, tax bracket, and tax-only take-home pay in one place.",
  h1: "Withholding Tax Calculator Philippines",
  intro:
    "Estimate your monthly withholding tax, annual income tax, and tax-only take-home pay using the current income tax brackets in the Philippines. Use this calculator to get a fast estimate based on your gross monthly salary before checking payroll details or official tables.",
  updatedAt: "2026-03-16",
  defaultInputs: {
    monthlySalary: 35_000,
  },
  formula: {
    name: "TRAIN Law Graduated Income Tax Table",
    description:
      "This calculator estimates withholding tax by converting your gross monthly salary into annual taxable income, matching it to the correct income tax bracket under the TRAIN Law, and applying the bracket formula to compute your estimated annual and monthly tax.",
    explanation:
      "In short, your monthly tax estimate comes from annual tax logic converted back into a monthly view. Actual employer payroll systems may apply tax calculations differently depending on payroll treatment, compensation structure, and official updates.",
  },
  exampleCalculation: {
    scenario:
      "An employee earning ₱35,000 per month gross salary (₱420,000 annual taxable income).",
    inputs: {
      monthlySalary: 35_000,
    },
    result: {
      annualTaxableIncome: 420_000,
      annualTax: 26_500,
      monthlyTax: 2_208.33,
      effectiveRate: 6.31,
      monthlyTakeHome: 32_791.67,
      annualTakeHome: 393_500,
    },
  },
  tips: [
    "This calculator uses gross monthly salary multiplied by 12 to estimate annual taxable income.",
    "It does not yet subtract mandatory contributions such as SSS, PhilHealth, and Pag-IBIG before computing tax.",
    "Because of that, your actual payroll withholding may be lower than this estimate.",
  ],
  faqs: [
    {
      question:
        "How do I compute withholding tax from my monthly salary?",
      answer:
        "A simple estimate starts by converting your monthly salary into annual taxable income, identifying the matching tax bracket, calculating annual tax using the bracket formula, and then dividing the result by 12 to estimate monthly withholding.",
    },
    {
      question:
        "What is the difference between withholding tax and income tax?",
      answer:
        "Income tax is the total tax due based on taxable income. Withholding tax is the amount typically deducted from your pay during the year as an advance collection of that tax.",
    },
    {
      question:
        "Who is exempt from income tax in the Philippines?",
      answer:
        "Under the current TRAIN-law structure, annual taxable income up to ₱250,000 is generally exempt from income tax.",
    },
    {
      question:
        "Does this calculator subtract SSS, PhilHealth, and Pag-IBIG first?",
      answer:
        "No. This version uses gross monthly salary multiplied by 12 and does not yet subtract mandatory contributions before estimating income tax. That is why actual payroll withholding may differ.",
    },
    {
      question:
        "Why is my payroll withholding different from this estimate?",
      answer:
        "Payroll withholding can differ because employers may calculate tax using taxable compensation after deductions, include other income items, or use payroll-specific rules and rounding.",
    },
    {
      question: "Can freelancers use this calculator?",
      answer:
        "This page is mainly designed for employees estimating withholding tax from salary. Freelancers and self-employed taxpayers may be subject to different tax treatment, including other filing and rate options.",
    },
  ],
  relatedPages: [
    "calculators/tax/take-home-pay-calculator-philippines",
    "government/bir/withholding-tax-table-philippines",
    "guides/tax/how-withholding-tax-works-philippines",
  ],
};
