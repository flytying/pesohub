import type { CalculatorPageData } from "@/types/content";

export const sssContributionCalcData: CalculatorPageData = {
  slug: "calculators/sss/sss-contribution-calculator-philippines",
  category: "sss",
  title: "SSS Contribution Calculator Philippines",
  metaTitle:
    "SSS Contribution Calculator 2026: Compute Your Monthly Deduction",
  metaDescription:
    "Free SSS contribution calculator for 2026 — compute your monthly SSS salary deduction based on the latest contribution table. Works for employees, self-employed, voluntary, and OFW members.",
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
      "An employed member earning ₱25,000 per month under the 15% contribution rate.",
    inputs: {
      monthlySalary: 25_000,
    },
    result: {
      monthlySalaryCredit: 25_000,
      totalContribution: 3_780,
      employeeShare: 1_250,
      employerShare: 2_530,
    },
  },
  tips: [
    "Your MSC is set by an income bracket in ₱500 steps, so two slightly different salaries can land on the same salary credit.",
    "Paying a higher salary credit raises both your contribution and your future SSS pension and benefit amounts.",
    "Self-employed, voluntary, and OFW members can choose to pay at a higher salary credit to build larger benefits.",
    "Contributions also count toward sickness, maternity, disability, and salary-loan eligibility — not just retirement.",
    "Keep your contributions continuous where possible, since the number of paid months affects benefit qualification.",
  ],
  faqs: [
    {
      question: "How much is the SSS contribution in the Philippines?",
      answer:
        "The total SSS contribution is currently 15% of your monthly salary credit (MSC). For an employee, the employer pays 10% and the employee pays 5%. Self-employed, voluntary, and OFW members pay the full 15%.",
    },
    {
      question: "What is the monthly salary credit (MSC)?",
      answer:
        "The MSC is a bracketed figure based on your income, ranging from ₱5,000 to ₱35,000. Your contribution is computed on the MSC, not directly on your exact salary.",
    },
    {
      question: "What is WISP in my SSS contribution?",
      answer:
        "WISP is the mandatory provident fund. When your salary credit is above ₱20,000, the contribution on that excess goes to a separate retirement savings account on top of your regular SSS contribution.",
    },
    {
      question: "How much is deducted from my salary if I am employed?",
      answer:
        "Only the 5% employee share is deducted from your pay. Your employer adds the 10% employer share and the small Employees’ Compensation premium and remits the total to SSS.",
    },
    {
      question: "Do self-employed and voluntary members pay more?",
      answer:
        "They pay the full 15% themselves because there is no employer to share the cost. They can also choose a higher salary credit to increase their future benefits.",
    },
    {
      question: "Does a higher contribution mean a bigger pension?",
      answer:
        "Yes. A higher salary credit increases your average monthly salary credit over time, which is a key input in the SSS pension formula. Try the SSS Pension calculator to see the effect.",
    },
  ],
  relatedPages: [
    "government/sss/sss-contribution-guide",
    "calculators/tax/take-home-pay-calculator-philippines",
    "calculators/tax/withholding-tax-calculator-philippines",
  ],
};
