import type { FAQ } from "@/types/content";

export const PHILHEALTH_UPDATED_AT = "2026-03-17";

export const philhealthMeta = {
  title: "PhilHealth Contribution Table Philippines 2026",
  metaTitle:
    "PhilHealth Contribution Table Philippines 2026 – Employee & Employer Share Guide | PesoHub",
  metaDescription:
    "View the current PhilHealth contribution table in the Philippines, including premium rate, salary floor, salary ceiling, employee share, employer share, and sample payroll cuts.",
  slug: "government/philhealth/philhealth-contribution-table-philippines",
  directAnswer:
    "View the current PhilHealth contribution table used for payroll and direct contributors in the Philippines. Use this page to check the premium rate, salary floor and ceiling, employee share, employer share, and sample monthly payroll cuts before using a payroll calculator.",
};

/**
 * PhilHealth contribution structure constants.
 * Based on PhilHealth Circular No. 2019-0009.
 */
export const PHILHEALTH_PREMIUM_RATE = 0.05; // 5.0%
export const PHILHEALTH_SALARY_FLOOR = 10_000;
export const PHILHEALTH_SALARY_CEILING = 100_000;

export interface PhilHealthContributionRow {
  salaryRange: string;
  premiumRate: string;
  totalPremium: number;
  employeeShare: number;
  employerShare: number;
}

export const philhealthContributionTable: PhilHealthContributionRow[] = [
  {
    salaryRange: "₱10,000 and below",
    premiumRate: "5.0%",
    totalPremium: 500,
    employeeShare: 250,
    employerShare: 250,
  },
  {
    salaryRange: "₱15,000",
    premiumRate: "5.0%",
    totalPremium: 750,
    employeeShare: 375,
    employerShare: 375,
  },
  {
    salaryRange: "₱20,000",
    premiumRate: "5.0%",
    totalPremium: 1_000,
    employeeShare: 500,
    employerShare: 500,
  },
  {
    salaryRange: "₱25,000",
    premiumRate: "5.0%",
    totalPremium: 1_250,
    employeeShare: 625,
    employerShare: 625,
  },
  {
    salaryRange: "₱30,000",
    premiumRate: "5.0%",
    totalPremium: 1_500,
    employeeShare: 750,
    employerShare: 750,
  },
  {
    salaryRange: "₱35,000",
    premiumRate: "5.0%",
    totalPremium: 1_750,
    employeeShare: 875,
    employerShare: 875,
  },
  {
    salaryRange: "₱50,000",
    premiumRate: "5.0%",
    totalPremium: 2_500,
    employeeShare: 1_250,
    employerShare: 1_250,
  },
  {
    salaryRange: "₱75,000",
    premiumRate: "5.0%",
    totalPremium: 3_750,
    employeeShare: 1_875,
    employerShare: 1_875,
  },
  {
    salaryRange: "₱100,000 and above",
    premiumRate: "5.0%",
    totalPremium: 5_000,
    employeeShare: 2_500,
    employerShare: 2_500,
  },
];

export interface PhilHealthPayrollExample {
  label: string;
  salary: number;
  basisUsed: number;
  totalPremium: number;
  employeeShare: number;
  employerShare: number;
  note: string;
}

export const philhealthPayrollExamples: PhilHealthPayrollExample[] = [
  {
    label: "Salary below the floor",
    salary: 8_000,
    basisUsed: 10_000,
    totalPremium: 500,
    employeeShare: 250,
    employerShare: 250,
    note: "Salary is below the ₱10,000 floor, so the premium is based on the floor.",
  },
  {
    label: "Salary within the range",
    salary: 35_000,
    basisUsed: 35_000,
    totalPremium: 1_750,
    employeeShare: 875,
    employerShare: 875,
    note: "Salary falls within the floor and ceiling, so the premium is based on actual salary.",
  },
  {
    label: "Salary at or above the ceiling",
    salary: 120_000,
    basisUsed: 100_000,
    totalPremium: 5_000,
    employeeShare: 2_500,
    employerShare: 2_500,
    note: "Salary exceeds the ₱100,000 ceiling, so the premium is based on the ceiling.",
  },
];

export const philhealthFaqs: FAQ[] = [
  {
    question:
      "What is the PhilHealth contribution rate used in the current table?",
    answer:
      "PhilHealth's employer contribution table PDF shows a 5.0% premium rate for 2025, based on monthly basic salary within the published floor and ceiling.",
  },
  {
    question: "How is PhilHealth contribution computed?",
    answer:
      "PhilHealth contribution is computed from monthly basic salary using the published premium rate, subject to the income floor and income ceiling in the official schedule.",
  },
  {
    question: "Is the contribution split between employee and employer?",
    answer:
      "For employed members, the premium is typically split equally between employee and employer.",
  },
  {
    question: "What happens if salary is below the minimum salary base?",
    answer:
      "If salary is below the floor, the contribution is computed based on the floor shown in the schedule.",
  },
  {
    question: "What happens if salary is above the ceiling?",
    answer:
      "If salary is above the salary ceiling, the contribution is computed based on the ceiling, not the full salary amount.",
  },
  {
    question: "Is this page the same as an official PhilHealth advisory?",
    answer:
      "No. This page should work as a plain-language reference based on PhilHealth's published table and circular, not as a replacement for official PhilHealth issuances.",
  },
];
