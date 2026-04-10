import type { FAQ } from "@/types/content";

export const PAGIBIG_CONTRIBUTION_UPDATED_AT = "2026-03-17";

export const pagibigContributionMeta = {
  title: "Pag-IBIG Contribution Table Philippines 2026",
  metaTitle:
    "Pag-IBIG Contribution Table 2026: Employee & Employer Share (HDMF) | PesoHub",
  metaDescription:
    "Updated Pag-IBIG (HDMF) contribution table for 2026 showing employee share, employer share, and salary bracket caps. Includes sample payroll deductions and a take-home pay calculator.",
  slug: "government/pag-ibig/pag-ibig-contribution-table-philippines",
  directAnswer:
    "View the current Pag-IBIG contribution table used in the Philippines and understand how the deduction usually appears on payroll. Use this page to check employee share, employer share, salary caps, and sample payroll cuts before moving to a broader take-home pay estimate.",
};

/**
 * Pag-IBIG contribution structure constants.
 * Based on Pag-IBIG Fund Circular No. 274 (as amended).
 *
 * Employee: 1% if salary ≤ ₱1,500, else 2%.
 * Employer: 2% regardless of salary.
 * Maximum Monthly Salary Credit (MSC): ₱5,000.
 * Max employee contribution: ₱100/month.
 * Max employer contribution: ₱100/month.
 */
export const PAGIBIG_MAX_MSC = 5_000;
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
    compensationRange: "Over ₱1,500 – ₱5,000",
    employeeRate: "2%",
    employerRate: "2%",
    employeeShare: "2% of salary",
    employerShare: "2% of salary",
    totalContribution: "4% of salary",
    payrollNote: "Both shares computed on actual salary",
  },
  {
    compensationRange: "Over ₱5,000",
    employeeRate: "2%",
    employerRate: "2%",
    employeeShare: "₱100 (capped)",
    employerShare: "₱100 (capped)",
    totalContribution: "₱200 (capped)",
    payrollNote: "Contribution capped at ₱5,000 MSC",
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
    salary: 5_000,
    employeeShare: 100,
    employerShare: 100,
    totalContribution: 200,
    payslipNote: "₱100 employee deduction shown on payslip",
  },
  {
    label: "Salary Above the Cap",
    salary: 25_000,
    employeeShare: 100,
    employerShare: 100,
    totalContribution: 200,
    payslipNote: "₱100 employee deduction — same as at the cap",
  },
];

export const pagibigContributionFaqs: FAQ[] = [
  {
    question: "What is the Pag-IBIG contribution table used for?",
    answer:
      "This page helps users understand the regular Pag-IBIG savings deduction used in payroll and how the employee and employer portions usually work.",
  },
  {
    question: "Does the employer also pay a share?",
    answer:
      "Yes. The employer pays a separate share on top of the employee share. The employee share is deducted from the salary, while the employer pays its portion separately. The payslip usually shows only the employee-side deduction.",
  },
  {
    question:
      "Why does my Pag-IBIG deduction stop increasing after a certain salary level?",
    answer:
      "Because Pag-IBIG contributions are subject to a salary cap (currently ₱5,000 Monthly Salary Credit). Once salary exceeds the cap, the contribution stays at ₱100 employee share and ₱100 employer share.",
  },
  {
    question: "Is this the same as a housing loan payment?",
    answer:
      "No. This page focuses on regular Pag-IBIG savings contributions, not housing loan amortization or other loan payments. For housing loan information, see the Pag-IBIG Housing Loan Guide.",
  },
  {
    question: "Why is my actual deduction different from this reference?",
    answer:
      "Actual deductions may differ because of updated schedules, payroll handling, or compensation treatment used by the employer. This page should be used as a practical reference, not a replacement for official payroll computation.",
  },
  {
    question: "Where should I go after checking this page?",
    answer:
      "Use the Take-Home Pay Calculator if you want to see Pag-IBIG together with tax, SSS, and PhilHealth. You can also visit the Pag-IBIG Housing Loan Guide or the Government Hub for related reference pages.",
  },
  {
    question:
      "How much is the Pag-IBIG contribution for employees in 2026?",
    answer:
      "For employees earning over ₱1,500 per month, the Pag-IBIG contribution is 2% of the monthly basic salary (employee share) plus 2% from the employer, for a combined 4%. The maximum monthly salary used for computation is capped at ₱10,000 for mandatory contributions, making the maximum employee share ₱200 per month.",
  },
  {
    question:
      "What does HDMF mean and is it the same as Pag-IBIG?",
    answer:
      "HDMF stands for Home Development Mutual Fund, which is the official name of the Pag-IBIG Fund. They are the same government agency — Pag-IBIG is the popular name while HDMF is used in legal and payroll documents. Your payslip may show either 'Pag-IBIG' or 'HDMF' for the same deduction.",
  },
];
