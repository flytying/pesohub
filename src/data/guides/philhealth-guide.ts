import type { FAQ } from "@/types/content";

export const PHILHEALTH_GUIDE_UPDATED_AT = "2026-03-17";

export const philhealthGuideMeta = {
  title: "PhilHealth Contribution Guide Philippines",
  metaTitle:
    "PhilHealth Contribution Guide Philippines – What the Deduction Means on Payroll | PesoHub",
  metaDescription:
    "Learn what the PhilHealth deduction on your payslip means, who pays it, how it appears on payroll, and where to verify the contribution amount in the Philippines.",
  slug: "guides/government/philhealth-contribution-guide",
  directAnswer:
    "Learn what the PhilHealth deduction on your payslip means, who pays it, how it is usually split between employee and employer, and where to verify the exact contribution amount. Use this guide if you want a simple explanation before checking the contribution table or a take-home pay estimate.",
};

export const payslipPatterns = [
  "Usually listed as a separate government deduction",
  "Often shown alongside SSS and Pag-IBIG",
  "May not show the employer share on the employee payslip",
  "Helps reduce gross salary into net pay",
];

export const whyDeductionChanges = [
  "Salary changes may affect the deduction",
  "Salary floor and ceiling may affect the computation",
  "Official contribution schedules may be updated",
  "Payroll handling may affect how it appears in practice",
];

export const verifyNextSteps = [
  "Check the PhilHealth Contribution Table page",
  "Compare the deduction with your payslip",
  "Use the Take-Home Pay Calculator if you want to see PhilHealth together with other deductions",
  "Confirm with payroll or HR if the amount looks different from what you expect",
];

export const whatThisHelps = [
  "understand what the PhilHealth deduction on your payslip means",
  "know whether the amount shown is only the employee share",
  "understand how PhilHealth fits into payroll deductions",
  "know where to verify the contribution amount",
  "move to a table or calculator with better context",
];

export const philhealthGuideFaqs: FAQ[] = [
  {
    question: "What is PhilHealth deduction?",
    answer:
      "PhilHealth deduction is the employee-side payroll deduction related to the monthly PhilHealth premium.",
  },
  {
    question:
      "Is the amount on my payslip the full PhilHealth contribution?",
    answer:
      "Usually, the amount shown on the employee payslip is only the employee share, not the full contribution.",
  },
  {
    question: "Does the employer also pay a share?",
    answer:
      "For employed members, there is usually an employer share in addition to the employee-side deduction.",
  },
  {
    question: "Why does my PhilHealth deduction change?",
    answer:
      "The amount may change because of salary changes, salary cap rules, updated contribution schedules, or payroll handling.",
  },
  {
    question: "Where can I check the exact contribution basis?",
    answer:
      "Use the PhilHealth Contribution Table page or check with your payroll or HR team for the exact schedule being used.",
  },
  {
    question: "Is PhilHealth deduction part of take-home pay computation?",
    answer:
      "Yes. PhilHealth is one of the deductions that can reduce gross salary into net pay.",
  },
];
