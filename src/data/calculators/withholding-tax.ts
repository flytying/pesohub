import type { CalculatorPageData } from "@/types/content";

export const withholdingTaxData: CalculatorPageData = {
  slug: "calculators/tax/withholding-tax-calculator-philippines",
  category: "tax",
  title: "Withholding Tax Calculator Philippines",
  metaTitle:
    "Withholding Tax Calculator Philippines: Compute Salary Tax",
  metaDescription:
    "Compute withholding tax on salary in the Philippines by pay frequency (monthly, semi-monthly, weekly, daily), with SSS, PhilHealth, Pag-IBIG, and allowances.",
  h1: "Withholding Tax Calculator Philippines",
  intro:
    "Compute your withholding tax on compensation in the Philippines by pay frequency — monthly, semi-monthly, weekly, or daily. The calculator deducts SSS, PhilHealth, and Pag-IBIG (estimated automatically or entered manually) and your allowances to find your taxable compensation, then applies the TRAIN Law tax table to estimate your per-period, monthly, and annual withholding tax.",
  updatedAt: "2026-06-26",
  defaultInputs: {
    monthlySalary: 35_000,
  },
  formula: {
    name: "TRAIN Law Graduated Income Tax Table",
    description:
      "This calculator deducts your SSS, PhilHealth, and Pag-IBIG employee shares (and any tax-exempt allowances) from your gross compensation to get taxable compensation, annualizes it, matches the correct TRAIN Law bracket, then splits the annual tax back across your pay frequency.",
    explanation:
      "Mandatory contributions and tax-exempt allowances are excluded before tax is computed, which mirrors how employer payroll systems determine taxable compensation. Actual payroll may still differ due to rounding, supplementary compensation, and employer-specific rules.",
  },
  exampleCalculation: {
    scenario:
      "An employee paid ₱35,000 monthly, with SSS, PhilHealth, and Pag-IBIG estimated automatically.",
    inputs: {
      monthlySalary: 35_000,
    },
    result: {
      annualTaxableIncome: 386_100,
      annualTax: 20_415,
      monthlyTax: 1_701.25,
      effectiveRate: 5.29,
      monthlyTakeHome: 30_473.75,
      annualTakeHome: 365_685,
    },
  },
  tips: [
    "Choose your pay frequency — the BIR uses a different withholding table for monthly, semi-monthly, weekly, and daily payroll.",
    "SSS, PhilHealth, and Pag-IBIG employee shares are deducted before tax. Estimate them automatically or enter your own amounts.",
    "Tax-exempt allowances and de minimis benefits are added to net pay but excluded from taxable compensation.",
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
        "Yes. The calculator deducts your SSS, PhilHealth, and Pag-IBIG employee shares from gross compensation before applying the tax table — these are estimated automatically from your salary, or you can enter your own amounts. This matches how employers compute taxable compensation.",
    },
    {
      question:
        "Can I compute withholding tax for semi-monthly, weekly, or daily pay?",
      answer:
        "Yes. Select your pay frequency and the calculator applies the correct BIR period table, showing your withholding tax for that pay period as well as the monthly and annual equivalents.",
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
