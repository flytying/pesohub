import type { CalculatorPageData } from "@/types/content";

export const takeHomePayData: CalculatorPageData = {
  slug: "calculators/tax/take-home-pay-calculator-philippines",
  category: "tax",
  title: "Take-Home Pay Calculator Philippines",
  metaTitle:
    "Take-Home Pay Calculator Philippines – Estimate Net Pay After Salary Deductions | PesoHub",
  metaDescription:
    "Estimate your take-home pay in the Philippines after withholding tax, SSS, PhilHealth, and Pag-IBIG. See a full gross-to-net deduction breakdown with PesoHub's calculator.",
  h1: "Take-Home Pay Calculator Philippines",
  intro:
    "Estimate your monthly take-home pay in the Philippines after common payroll deductions such as withholding tax, SSS, PhilHealth, and Pag-IBIG. Use this calculator to compare gross salary against estimated net pay and understand where your deductions come from.",
  updatedAt: "2026-03-16",
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
    "Your take-home pay is your salary after common deductions are subtracted.",
    "Even if your gross salary stays the same, your estimated take-home pay will be lower because payroll deductions reduce the amount you actually receive.",
    "This calculator is useful for a standard estimate, but it does not replace your employer's actual payroll system or full payslip.",
  ],
  faqs: [
    {
      question: "What does this take-home pay calculator estimate?",
      answer:
        "This calculator estimates your monthly net pay after common deductions such as withholding tax, SSS, PhilHealth, and Pag-IBIG. It is designed for planning and comparison, not as a final payroll document.",
    },
    {
      question: "Does this include SSS, PhilHealth, and Pag-IBIG?",
      answer:
        "Yes. This page is intended to estimate take-home pay after those common mandatory employee deductions, along with withholding tax.",
    },
    {
      question: "Is this the same as a payslip calculator?",
      answer:
        "Not exactly. This is a simplified payroll estimate. Your actual payslip may include other deductions, loans, allowances, bonuses, or company-specific payroll treatment.",
    },
    {
      question:
        "Why is my actual take-home pay different from this estimate?",
      answer:
        "Actual take-home pay may differ because employers may apply different payroll inputs, taxable compensation treatment, rounding, loans, variable pay items, or voluntary deductions.",
    },
    {
      question:
        "What if I only want to estimate withholding tax?",
      answer:
        "Use the Withholding Tax Calculator if you want to isolate income tax and understand that deduction more clearly.",
    },
    {
      question: "Why does gross salary matter?",
      answer:
        "Gross salary is the starting point for the estimate. The calculator subtracts common deductions from gross pay to estimate your monthly net pay.",
    },
  ],
  relatedPages: [
    "calculators/tax/withholding-tax-calculator-philippines",
    "calculators/sss/sss-contribution-calculator-philippines",
    "government/sss/sss-contribution-guide",
  ],
};
