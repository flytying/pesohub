import type { FAQ } from "@/types/content";

export const PHILHEALTH_UPDATED_AT = "2026-06-29";

export const philhealthMeta = {
  title: "PhilHealth Contribution Table Philippines 2026",
  metaTitle:
    "PhilHealth Contribution Table Philippines 2026 – Employee & Employer Share Guide",
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
      "The table applies a 5.0% premium rate on monthly basic salary, the rate published under PhilHealth Circular No. 2019-0009, subject to a salary floor of ₱10,000 and a ceiling of ₱100,000.",
  },
  {
    question: "How is PhilHealth contribution computed?",
    answer:
      "The total monthly premium is 5% of your monthly basic salary, within the floor and ceiling. For employed members this premium is split equally, so the employee share shown on a payslip is half of the total premium.",
  },
  {
    question: "Is the contribution split between employee and employer?",
    answer:
      "Yes. For employed members the premium is shared 50/50. The employee share is deducted from salary, and the employer pays an equal share on top.",
  },
  {
    question: "What happens if salary is below the minimum salary base?",
    answer:
      "If salary is below the ₱10,000 floor, the premium is computed on the floor, giving a total premium of ₱500.00 and an employee share of ₱250.00.",
  },
  {
    question: "What happens if salary is above the ceiling?",
    answer:
      "If salary is above the ₱100,000 ceiling, the premium is computed on the ceiling, giving a total premium of ₱5,000.00 and an employee share of ₱2,500.00. It does not increase further.",
  },
  {
    question: "Is this page the same as an official PhilHealth advisory?",
    answer:
      "No. This page restates the published schedule for easier reading. For payroll-exact figures, always check the latest official PhilHealth advisory or your employer's payroll system.",
  },
];
