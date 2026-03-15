import type { CalculatorPageData } from "@/types/content";

export const withholdingTaxData: CalculatorPageData = {
  slug: "calculators/tax/withholding-tax-calculator-philippines",
  category: "tax",
  title: "Withholding Tax Calculator Philippines",
  metaTitle:
    "Withholding Tax Calculator Philippines | Estimate Salary Tax | PesoHub",
  metaDescription:
    "Use this withholding tax calculator to estimate salary tax in the Philippines. This tool focuses on withholding tax only and does not include full net pay deductions unless stated.",
  h1: "Withholding Tax Calculator Philippines",
  intro:
    "Estimate withholding tax based on your salary and the applicable tax bracket or tax table assumptions. This tool is designed for withholding tax estimates only, so it should be used as a quick planning reference, not as a full take-home pay calculator.",
  updatedAt: "2025-03-01",
  defaultInputs: {
    monthlySalary: 35_000,
  },
  formula: {
    name: "TRAIN Law Graduated Income Tax Table",
    description:
      "This calculator estimates withholding tax using the salary details you enter and the tax table or bracket assumptions built into the tool. It is intended for educational and planning use only.",
    explanation:
      "Actual employer payroll systems may apply tax calculations differently depending on payroll treatment, compensation structure, and official updates, which is why your final withheld amount may not match this estimate exactly.",
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
      monthlyTax: 2_208,
      effectiveRate: 6.31,
      monthlyTakeHome: 32_792,
      annualTakeHome: 393_500,
    },
  },
  tips: [
    "A higher taxable salary may increase the withholding tax estimate depending on the applicable tax bracket.",
    "The estimate may change depending on whether salary is viewed monthly, semi-monthly, or through another supported pay schedule.",
    "If the tool supports extra taxable amounts, adding them may increase the withholding tax estimate.",
  ],
  faqs: [
    {
      question: "What does this withholding tax calculator estimate?",
      answer:
        "It estimates withholding tax based on your salary input and the tax table or bracket assumptions used by the tool.",
    },
    {
      question: "Is this a take-home pay calculator?",
      answer:
        "No. This page is focused on withholding tax only unless explicitly stated otherwise. It does not automatically include SSS, PhilHealth, or Pag-IBIG deductions.",
    },
    {
      question: "What deductions are not included here?",
      answer:
        "Unless the calculator clearly says otherwise, this estimate does not include SSS, PhilHealth, Pag-IBIG, or other employer-specific deductions.",
    },
    {
      question: "Why is my actual payslip different from this result?",
      answer:
        "Actual payroll tax may differ because of payroll setup, tax table updates, taxable versus non-taxable pay items, bonuses, and other deduction rules used by your employer.",
    },
    {
      question: "Where should I go if I want net pay instead?",
      answer:
        "Use the Take-Home Pay Calculator for a broader estimate of pay after common deductions.",
    },
    {
      question: "What tax period should this calculator show?",
      answer:
        "It should clearly show the tax year or reference period used so users can understand what official basis the estimate follows.",
    },
  ],
  relatedPages: [
    "calculators/retirement/sss-pension-calculator",
    "calculators/tax/take-home-pay-calculator-philippines",
  ],
};
