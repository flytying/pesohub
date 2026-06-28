import type { FAQ } from "@/types/content";

export const PAGIBIG_CONTRIBUTION_UPDATED_AT = "2026-06-15";

export const pagibigContributionMeta = {
  title: "Pag-IBIG Contribution Table Philippines 2026",
  metaTitle:
    "Pag-IBIG Contribution Table 2026: Employee & Employer Share (HDMF)",
  metaDescription:
    "Updated Pag-IBIG (HDMF) contribution table for 2026 showing employee share, employer share, and salary bracket caps. Includes sample payroll deductions and a take-home pay calculator.",
  slug: "government/pag-ibig/pag-ibig-contribution-table-philippines",
  directAnswer:
    "View the current Pag-IBIG contribution table used in the Philippines and understand how the deduction usually appears on payroll. Use this page to check employee share, employer share, salary caps, and sample payroll cuts before moving to a broader take-home pay estimate.",
};

/**
 * Pag-IBIG contribution structure constants.
 * Based on HDMF Circular No. 460 (effective February 2024).
 *
 * Employee: 1% if salary ≤ ₱1,500, else 2%.
 * Employer: 2% regardless of salary.
 * Maximum Monthly Salary Credit (MSC): ₱10,000.
 * Max employee contribution: ₱200/month.
 * Max employer contribution: ₱200/month.
 */
export const PAGIBIG_MAX_MSC = 10_000;
export const PAGIBIG_EMPLOYEE_RATE_LOW = 0.01;
export const PAGIBIG_EMPLOYEE_RATE_HIGH = 0.02;
export const PAGIBIG_EMPLOYER_RATE = 0.02;
export const PAGIBIG_LOW_SALARY_THRESHOLD = 1_500;

export interface PagIBIGContributionRow {
  compensationRange: string;
  employeeRate: string;
  employerRate: string;
  employeeShare: string;
  employerShare: string;
  totalContribution: string;
  payrollNote: string;
}

export const pagibigContributionTable: PagIBIGContributionRow[] = [
  {
    compensationRange: "₱1,500 and below",
    employeeRate: "1%",
    employerRate: "2%",
    employeeShare: "1% of salary",
    employerShare: "2% of salary",
    totalContribution: "3% of salary",
    payrollNote: "Both shares computed on actual salary",
  },
  {
    compensationRange: "Over ₱1,500 – ₱10,000",
    employeeRate: "2%",
    employerRate: "2%",
    employeeShare: "2% of salary",
    employerShare: "2% of salary",
    totalContribution: "4% of salary",
    payrollNote: "Both shares computed on actual salary",
  },
  {
    compensationRange: "Over ₱10,000",
    employeeRate: "2%",
    employerRate: "2%",
    employeeShare: "₱200 (capped)",
    employerShare: "₱200 (capped)",
    totalContribution: "₱400 (capped)",
    payrollNote: "Contribution capped at ₱10,000 MSC",
  },
];

export interface PagIBIGPayrollExample {
  label: string;
  salary: number;
  employeeShare: number;
  employerShare: number;
  totalContribution: number;
  payslipNote: string;
}

export const pagibigPayrollExamples: PagIBIGPayrollExample[] = [
  {
    label: "Salary Below the Cap",
    salary: 3_000,
    employeeShare: 60,
    employerShare: 60,
    totalContribution: 120,
    payslipNote: "₱60 employee deduction shown on payslip",
  },
  {
    label: "Salary at the Cap",
    salary: 10_000,
    employeeShare: 200,
    employerShare: 200,
    totalContribution: 400,
    payslipNote: "₱200 employee deduction shown on payslip",
  },
  {
    label: "Salary Above the Cap",
    salary: 25_000,
    employeeShare: 200,
    employerShare: 200,
    totalContribution: 400,
    payslipNote: "₱200 employee deduction — same as at the cap",
  },
];

export const pagibigContributionFaqs: FAQ[] = [
  {
    question: "What is the Pag-IBIG contribution table used for?",
    answer:
      "It shows the employee and employer share of the monthly Pag-IBIG (HDMF) contribution at different salary levels, so you can check what your payslip deduction should roughly be and how the contribution is capped.",
  },
  {
    question: "Does the employer also pay a share?",
    answer:
      "Yes. The employer pays a 2% share on top of the employee share. On a payslip you usually only see the employee-side deduction, not the employer portion.",
  },
  {
    question:
      "Why does my Pag-IBIG deduction stop increasing after a certain salary level?",
    answer:
      "Because the contribution is computed on monthly salary up to a maximum of ₱10,000. Above that cap, the employee share stays at ₱200.00 and does not keep rising with salary.",
  },
  {
    question: "Is this the same as a housing loan payment?",
    answer:
      "No. This is the mandatory savings contribution to the Pag-IBIG Fund. A housing loan amortization is a separate payment. See the Pag-IBIG Housing Loan Guide for that.",
  },
  {
    question: "Why is my actual deduction different from this reference?",
    answer:
      "Payroll systems may use updated settings, classify compensation differently, apply specific rounding, or follow company rules. Treat this page as a practical reference, not an exact payslip.",
  },
  {
    question: "Where should I go after checking this page?",
    answer:
      "To see Pag-IBIG together with SSS, PhilHealth, and withholding tax in one net-pay figure, use the Take-Home Pay Calculator. To explore savings, see the MP2 Savings Guide.",
  },
  {
    question: "How much is the Pag-IBIG contribution for employees in 2026?",
    answer:
      "For most employees the mandatory employee share is 2% of monthly salary, capped at ₱200.00 once salary reaches the ₱10,000 maximum. Members earning ₱1,500 or below contribute 1%.",
  },
  {
    question: "What does HDMF mean and is it the same as Pag-IBIG?",
    answer:
      "HDMF stands for the Home Development Mutual Fund, which is the official name of Pag-IBIG. The two terms refer to the same fund and contribution.",
  },
];
