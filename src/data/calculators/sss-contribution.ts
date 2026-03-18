import type { CalculatorPageData } from "@/types/content";

export const sssContributionCalcData: CalculatorPageData = {
  slug: "calculators/sss/sss-contribution-calculator-philippines",
  category: "sss",
  title: "SSS Contribution Calculator Philippines",
  metaTitle:
    "SSS Contribution Calculator Philippines: Salary Deduction Estimate | PesoHub",
  metaDescription:
    "Estimate SSS contributions for employees, self-employed members, voluntary members, and OFWs based on salary and member type.",
  h1: "SSS Contribution Calculator Philippines",
  intro:
    "Estimate your SSS contribution in the Philippines based on your monthly compensation and member type. Use this calculator to check your employee share, employer share, total contribution, and Monthly Salary Credit before comparing it with the official SSS contribution table.",
  updatedAt: "2026-03-16",
  defaultInputs: {
    monthlySalary: 25_000,
  },
  formula: {
    name: "SSS Contribution Table Lookup",
    description:
      "This calculator estimates SSS contribution using the salary details and member type you enter, together with the contribution schedule built into the tool. It is intended for educational and planning use only.",
    explanation:
      "Actual payroll posting or contribution computation may differ depending on classification, salary credit mapping, and official SSS implementation rules, which is why your final amount may not match this estimate exactly.",
  },
  exampleCalculation: {
    scenario:
      "An employed member earning ₱25,000 per month with standard employee-employer sharing.",
    inputs: {
      monthlySalary: 25_000,
    },
    result: {
      monthlySalaryCredit: 25_000,
      totalContribution: 3_562.5,
      employeeShare: 1_250,
      employerShare: 2_312.5,
    },
  },
  tips: [
    "Choose the correct member type before relying on the result.",
    "This calculator estimates SSS contribution only and does not calculate full net pay.",
    "If SSS updates the official schedule, the final contribution may differ from this estimate.",
  ],
  faqs: [
    {
      question:
        "What does this SSS contribution calculator estimate?",
      answer:
        "This calculator estimates your SSS contribution based on your monthly compensation and selected member type. It may also show employee share, employer share, total contribution, and Monthly Salary Credit depending on the classification used.",
    },
    {
      question: "Is this the same as take-home pay?",
      answer:
        "No. This calculator estimates SSS contribution only. It does not calculate full net pay after withholding tax, PhilHealth, Pag-IBIG, and other payroll deductions.",
    },
    {
      question: "Why does member type matter?",
      answer:
        "Member type matters because contribution treatment may differ for employees, self-employed members, voluntary members, non-working spouses, and OFWs. The estimate depends on the classification selected.",
    },
    {
      question: "What is Monthly Salary Credit?",
      answer:
        "Monthly Salary Credit is the salary band used by SSS to determine the contribution amount. It helps convert actual salary or compensation into the bracket used for contribution computation.",
    },
    {
      question:
        "Why is my actual contribution different from this estimate?",
      answer:
        "Actual contribution may differ because of official schedule updates, payroll treatment, classification differences, or other compensation details not fully reflected in a simplified estimate.",
    },
    {
      question: "Where should I verify the final amount?",
      answer:
        "Use the SSS Contribution Table or official SSS references to verify the final amount, especially if you need the exact contribution under the latest schedule.",
    },
  ],
  relatedPages: [
    "government/sss/sss-contribution-guide",
    "calculators/tax/take-home-pay-calculator-philippines",
    "calculators/tax/withholding-tax-calculator-philippines",
  ],
};
