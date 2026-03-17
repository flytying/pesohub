import type { FAQ } from "@/types/content";

export const SSS_CONTRIBUTION_UPDATED_AT = "2026-03-17";

export const sssContributionMeta = {
  title: "SSS Contribution Table Philippines 2026",
  metaTitle:
    "SSS Contribution Table Philippines 2026 – Employee, Employer & MSC Reference | PesoHub",
  metaDescription:
    "View the latest SSS contribution table used in the Philippines, including employee share, employer share, MSC, and member-type shortcuts. Check the current schedule and compare contribution amounts more easily.",
  slug: "government/sss/sss-contribution-guide",
  directAnswer:
    "View the latest SSS contribution table used in the Philippines, including employee share, employer share, Monthly Salary Credit, and member-type contribution structure. Use this page to check the current schedule, compare contribution amounts across salary ranges, and move to the calculator if you want a faster estimate.",
};

export interface SSSPayrollExample {
  label: string;
  salary: number;
  msc: number;
  employeeShare: number;
  employerShare: number;
  totalContribution: number;
  note: string;
}

export const sssPayrollExamples: SSSPayrollExample[] = [
  {
    label: "Salary Near the Minimum MSC",
    salary: 5_000,
    msc: 5_000,
    employeeShare: 250,
    employerShare: 462.5,
    totalContribution: 712.5,
    note: "Near the lowest MSC bracket. Employee share is relatively small.",
  },
  {
    label: "Salary in the Middle Range",
    salary: 15_000,
    msc: 15_000,
    employeeShare: 750,
    employerShare: 1_387.5,
    totalContribution: 2_137.5,
    note: "Mid-range bracket. Both employee and employer shares increase proportionally.",
  },
  {
    label: "Salary Near or Above the Maximum MSC",
    salary: 35_000,
    msc: 30_000,
    employeeShare: 1_500,
    employerShare: 2_775,
    totalContribution: 4_275,
    note: "At or above the maximum MSC. Contribution does not increase further beyond the ceiling.",
  },
];

export const memberTypeCards = [
  {
    type: "Employee",
    description:
      "Employee and employer shares are both relevant. The employer deducts the employee share from the salary and remits the total to SSS.",
  },
  {
    type: "Self-Employed",
    description:
      "Contribution depends on declared monthly earnings and the self-employed schedule. The member pays the full contribution amount.",
  },
  {
    type: "Voluntary",
    description:
      "Contribution follows the voluntary-member schedule. The member pays the full contribution based on their chosen MSC bracket.",
  },
  {
    type: "Non-Working Spouse",
    description:
      "Contribution follows the applicable spouse-based rule shown by SSS. Paid in full by the member.",
  },
  {
    type: "OFW",
    description:
      "Contribution follows the OFW schedule shown in the official table set. The member pays the full contribution.",
  },
];

export const sssContributionFaqs: FAQ[] = [
  {
    question:
      "What is the current SSS contribution table used in 2026?",
    answer:
      "The latest official SSS contribution schedule currently published on the SSS contribution table page is Effective January 2025. Unless SSS releases a newer official schedule, that is the table users are relying on in 2026 payroll contexts.",
  },
  {
    question: "What is the current SSS contribution rate?",
    answer:
      "SSS announced that the contribution rate increased to 15% starting January 2025, from 14% previously.",
  },
  {
    question: "What are the current minimum and maximum MSC values?",
    answer:
      "SSS states that starting January 2025, the minimum MSC is ₱5,000 and the maximum MSC is ₱35,000.",
  },
  {
    question:
      "Why does the table show employee and employer shares separately?",
    answer:
      "For employed members, the employee and employer each contribute a portion of the total amount. The employee share is the part usually seen on the payslip deduction, while the employer pays its own share.",
  },
  {
    question: "Why does member type matter?",
    answer:
      "SSS contribution handling differs for employees, voluntary members, self-employed members, OFWs, and non-working spouses, so users should check the section that matches their actual classification.",
  },
  {
    question: "Where should I go after checking the table?",
    answer:
      "Use the SSS Contribution Calculator for a faster estimate, the SSS Guide for plain-language explanation, or the Take-Home Pay Calculator if you want to see SSS together with tax and other payroll deductions.",
  },
];
