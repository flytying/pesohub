import type { CalculatorPageData } from "@/types/content";

export const takeHomePayData: CalculatorPageData = {
  slug: "calculators/tax/take-home-pay-calculator-philippines",
  category: "tax",
  title: "Take-Home Pay Calculator Philippines",
  metaTitle:
    "Take-Home Pay Calculator Philippines | Estimate Net Salary | PesoHub",
  metaDescription:
    "Estimate your take-home pay in the Philippines after withholding tax, SSS, PhilHealth, and Pag-IBIG deductions. Use this calculator for salary planning.",
  h1: "Take-Home Pay Calculator Philippines",
  intro:
    "Estimate your monthly take-home pay after common payroll deductions including withholding tax, SSS, PhilHealth, and Pag-IBIG contributions. This calculator gives you a clearer picture of your likely net pay based on your gross salary.",
  updatedAt: "2026-03-15",
  defaultInputs: {
    monthlySalary: 35_000,
  },
  formula: {
    name: "Take-Home Pay Estimation",
    description:
      "This calculator estimates take-home pay by subtracting common mandatory deductions from your gross monthly salary. It uses the TRAIN Law tax brackets for withholding tax, the 2025 SSS contribution table for SSS, the current PhilHealth premium rate, and standard Pag-IBIG contribution rules.",
    explanation:
      "Actual payroll systems may apply deductions differently depending on your employer's setup, compensation structure, and any additional deductions not covered here. This estimate is a starting reference, not a substitute for your official payslip.",
  },
  exampleCalculation: {
    scenario:
      "An employee earning ₱35,000 per month gross salary with standard mandatory deductions.",
    inputs: {
      monthlySalary: 35_000,
    },
    result: {
      grossSalary: 35_000,
      withholdingTax: 2_208,
      sssContribution: 1_750,
      philhealthContribution: 875,
      pagibigContribution: 100,
      totalDeductions: 4_933,
      takeHomePay: 30_067,
    },
  },
  tips: [
    "A higher gross salary will increase withholding tax and may also change SSS and PhilHealth deductions.",
    "Pay period assumptions may affect how deductions are calculated. This tool uses monthly gross salary as the basis.",
    "Your actual SSS, PhilHealth, or Pag-IBIG contributions may differ if your employer uses a different salary credit or rate basis.",
  ],
  faqs: [
    {
      question: "What does this take-home pay calculator estimate?",
      answer:
        "It estimates your monthly net pay after subtracting common mandatory deductions: withholding tax (TRAIN Law), SSS employee share, PhilHealth employee share, and Pag-IBIG employee share.",
    },
    {
      question: "Does this include SSS, PhilHealth, and Pag-IBIG?",
      answer:
        "Yes. Unlike the withholding tax calculator which only estimates income tax, this tool includes SSS, PhilHealth, and Pag-IBIG employee contributions in the deduction breakdown.",
    },
    {
      question: "Is this a payslip calculator?",
      answer:
        "No. This tool estimates take-home pay based on standard deduction rules. Your actual payslip may include additional items such as salary loans, allowances, overtime, bonuses, or employer-specific deductions that are not covered here.",
    },
    {
      question: "Why is my result different from my actual payslip?",
      answer:
        "Differences may come from employer-specific deductions, different salary credit bases, non-taxable allowances, loans, bonuses, overtime pay, or adjustments that this calculator does not include.",
    },
    {
      question: "What if I only want to see withholding tax?",
      answer:
        "Use the Withholding Tax Calculator instead. It focuses specifically on income tax estimation without the other mandatory deductions.",
    },
    {
      question: "What tax year does this calculator use?",
      answer:
        "This calculator uses the TRAIN Law tax brackets effective 2023 onwards, the 2025 SSS contribution table, the current PhilHealth premium rate (5%), and standard Pag-IBIG contribution rules.",
    },
  ],
  relatedPages: [
    "calculators/tax/withholding-tax-calculator-philippines",
    "government/sss/sss-contribution-guide",
  ],
};
