import type { FAQ } from "@/types/content";

export const SSS_PENSION_TABLE_UPDATED_AT = "2026-06-28";

export const sssPensionTableMeta = {
  title: "SSS Pension Table Philippines",
  metaTitle: "SSS Pension Table 2026 — Monthly Pension by Salary Credit & Years",
  metaDescription:
    "See estimated SSS monthly pension amounts by salary credit and years of contribution. Understand the three pension formulas and minimum pension guarantees.",
  slug: "government/sss/sss-pension-table",
  directAnswer:
    "Your SSS monthly pension depends on your Average Monthly Salary Credit (AMSC) and total Credited Years of Service (CYS). The pension is the highest of three formulas. For example, with a ₱20,000 AMSC and 25 years of contributions, your estimated pension is about ₱10,300 per month.",
};

/**
 * Pre-computed pension estimates for representative MSC values at different contribution years.
 * Each value is the governing (highest) result of the three SSS pension formulas in
 * src/lib/calculators/sss-pension-formula.ts, BEFORE the ₱1,000 across-the-board increase
 * and the 13th-month pension, which are added on top. MSC range reflects the 2025 schedule
 * (₱5,000 minimum to ₱35,000 maximum).
 */
export interface PensionEstimate {
  monthlySalaryCredit: number;
  pensionAt10Years: number;
  pensionAt15Years: number;
  pensionAt20Years: number;
  pensionAt25Years: number;
  pensionAt30Years: number;
}

export const pensionEstimates: PensionEstimate[] = [
  { monthlySalaryCredit: 5_000, pensionAt10Years: 2_000, pensionAt15Years: 2_000, pensionAt20Years: 2_400, pensionAt25Years: 2_800, pensionAt30Years: 3_300 },
  { monthlySalaryCredit: 6_000, pensionAt10Years: 2_400, pensionAt15Years: 2_400, pensionAt20Years: 2_700, pensionAt25Years: 3_300, pensionAt30Years: 3_900 },
  { monthlySalaryCredit: 8_000, pensionAt10Years: 3_200, pensionAt15Years: 3_200, pensionAt20Years: 3_500, pensionAt25Years: 4_300, pensionAt30Years: 5_100 },
  { monthlySalaryCredit: 10_000, pensionAt10Years: 4_000, pensionAt15Years: 4_000, pensionAt20Years: 4_300, pensionAt25Years: 5_300, pensionAt30Years: 6_300 },
  { monthlySalaryCredit: 15_000, pensionAt10Years: 6_000, pensionAt15Years: 6_000, pensionAt20Years: 6_300, pensionAt25Years: 7_800, pensionAt30Years: 9_300 },
  { monthlySalaryCredit: 20_000, pensionAt10Years: 8_000, pensionAt15Years: 8_000, pensionAt20Years: 8_300, pensionAt25Years: 10_300, pensionAt30Years: 12_300 },
  { monthlySalaryCredit: 25_000, pensionAt10Years: 10_000, pensionAt15Years: 10_000, pensionAt20Years: 10_300, pensionAt25Years: 12_800, pensionAt30Years: 15_300 },
  { monthlySalaryCredit: 30_000, pensionAt10Years: 12_000, pensionAt15Years: 12_000, pensionAt20Years: 12_300, pensionAt25Years: 15_300, pensionAt30Years: 18_300 },
  { monthlySalaryCredit: 35_000, pensionAt10Years: 14_000, pensionAt15Years: 14_000, pensionAt20Years: 14_300, pensionAt25Years: 17_800, pensionAt30Years: 21_300 },
];

export const eligibilityRequirements = [
  "At least 120 monthly contributions (10 credited years of service)",
  "At least 60 years old for optional retirement (must have separated from employment)",
  "At least 65 years old for mandatory/technical retirement",
  "Must not be receiving any other SSS benefit at the time of retirement",
];

export const sssPensionTableFaqs: FAQ[] = [
  {
    question: "How is the SSS pension amount determined?",
    answer:
      "SSS computes your pension using three formulas and gives you the highest amount: (1) ₱300 + 20% of AMSC + 2% of AMSC for each CYS over 10, (2) 40% of AMSC, and (3) the statutory minimum pension of ₱1,200 (for 10 to 19 CYS) or ₱2,400 (for 20 or more CYS). A ₱1,000 across-the-board increase and a 13th-month pension are added on top.",
  },
  {
    question: "What is the maximum SSS monthly pension?",
    answer:
      "There is no hard cap on the SSS pension, but it is limited by the maximum Monthly Salary Credit (₱35,000 since the 2025 increase) and your total years of contribution. With the maximum ₱35,000 MSC and 30 years of contributions, the estimated pension is about ₱22,300 per month — ₱21,300 from the governing formula plus the ₱1,000 across-the-board increase.",
  },
  {
    question: "Can I receive SSS pension and still work?",
    answer:
      "If you retire at 60 (optional retirement), you must have separated from employment to start receiving your pension. If you retire at 65 (mandatory retirement), you can receive the pension regardless of employment status. There are no restrictions on working after age 65.",
  },
  {
    question: "Do SSS pensioners receive a 13th month pension?",
    answer:
      "Yes. SSS pensioners receive a 13th month pension every December, equal to one month of their regular pension amount.",
  },
  {
    question: "What happens to my SSS pension when I die?",
    answer:
      "Your primary beneficiaries (dependent spouse and children) will receive survivorship pension benefits. If there are no primary beneficiaries, secondary beneficiaries (dependent parents) may receive a lump sum benefit.",
  },
];
