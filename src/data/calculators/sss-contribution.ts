import type { CalculatorPageData } from "@/types/content";

export const sssContributionCalcData: CalculatorPageData = {
  slug: "calculators/sss/sss-contribution-calculator-philippines",
  category: "sss",
  title: "SSS Contribution Calculator Philippines",
  metaTitle:
    "SSS Contribution Calculator Philippines | Estimate SSS Deductions | PesoHub",
  metaDescription:
    "Use this SSS contribution calculator to estimate SSS deductions in the Philippines based on salary and member type. Check the reference period used, then confirm with the official SSS table.",
  h1: "SSS Contribution Calculator Philippines",
  intro:
    "Estimate your SSS contribution based on your salary level, member type, and the contribution schedule used by this calculator. Use this tool to get a quick planning estimate before checking the official SSS contribution table or your actual payroll details.",
  updatedAt: "2026-03-15",
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
    "A higher salary or compensation basis may move the estimate to a higher Monthly Salary Credit range, which can increase the contribution amount.",
    "The estimate may change depending on whether the user is classified as an employee, self-employed member, voluntary member, non-working spouse, or OFW because the official schedules are not all the same.",
    "If SSS updates the official schedule or contribution basis, the estimate may change even when salary stays the same.",
  ],
  faqs: [
    {
      question: "What does this SSS contribution calculator estimate?",
      answer:
        "It estimates SSS contribution based on your salary input, member type, and the contribution schedule assumptions used by the tool.",
    },
    {
      question: "Is this the same as a take-home pay calculator?",
      answer:
        "No. This page is focused on SSS contribution only. It does not automatically estimate withholding tax, PhilHealth, Pag-IBIG, or final net pay.",
    },
    {
      question: "Why does member type matter?",
      answer:
        "SSS publishes separate contribution schedules for different member classifications, including employers and employees, self-employed members, voluntary members, non-working spouses, and land-based OFWs.",
    },
    {
      question:
        "What reference period should this calculator show?",
      answer:
        "It should clearly show the schedule or effectivity period used by the tool. The official SSS site currently points to contribution schedules effective January 2025.",
    },
    {
      question: "Why is my actual contribution different from this result?",
      answer:
        "Actual amounts may differ because of member classification, salary credit mapping, payroll processing, official updates, or the specific contribution table used.",
    },
    {
      question: "Where should I verify the final amount?",
      answer:
        "You should check the official SSS contribution table, your payslip, employer payroll record, or your My.SSS account for confirmation. SSS's official contribution table and payment pages are the primary references.",
    },
  ],
  relatedPages: [
    "calculators/tax/take-home-pay-calculator-philippines",
    "calculators/tax/withholding-tax-calculator-philippines",
  ],
};
