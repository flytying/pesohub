import type { FAQ } from "@/types/content";

export const SSS_PENSION_TABLE_UPDATED_AT = "2026-03-14";

export const sssPensionTableMeta = {
  title: "SSS Pension Table Philippines",
  metaTitle: "SSS Pension Table 2026 — Monthly Pension by Salary Credit & Years",
  metaDescription:
    "See estimated SSS monthly pension amounts by salary credit and years of contribution. Understand the three pension formulas and minimum pension guarantees.",
  slug: "government/sss/sss-pension-table",
  directAnswer:
    "Your SSS monthly pension depends on your Average Monthly Salary Credit (AMSC) and total Credited Years of Service (CYS). The pension is the highest of three formulas. For example, with a PHP 20,000 AMSC and 25 years of contributions, your estimated pension is about PHP 10,300 per month.",
};

/**
 * Pre-computed pension estimates for representative MSC values at different contribution years.
 * Computed using the three SSS pension formulas; the highest value wins.
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
  { monthlySalaryCredit: 4_000, pensionAt10Years: 2_000, pensionAt15Years: 2_000, pensionAt20Years: 2_400, pensionAt25Years: 3_000, pensionAt30Years: 3_600 },
  { monthlySalaryCredit: 6_000, pensionAt10Years: 2_400, pensionAt15Years: 2_700, pensionAt20Years: 3_600, pensionAt25Years: 4_500, pensionAt30Years: 5_400 },
  { monthlySalaryCredit: 8_000, pensionAt10Years: 2_400, pensionAt15Years: 3_200, pensionAt20Years: 4_400, pensionAt25Years: 5_600, pensionAt30Years: 6_800 },
  { monthlySalaryCredit: 10_000, pensionAt10Years: 2_300, pensionAt15Years: 3_300, pensionAt20Years: 5_300, pensionAt25Years: 7_300, pensionAt30Years: 9_300 },
  { monthlySalaryCredit: 15_000, pensionAt10Years: 3_300, pensionAt15Years: 4_800, pensionAt20Years: 7_800, pensionAt25Years: 10_800, pensionAt30Years: 13_800 },
  { monthlySalaryCredit: 20_000, pensionAt10Years: 4_300, pensionAt15Years: 6_300, pensionAt20Years: 10_300, pensionAt25Years: 14_300, pensionAt30Years: 18_300 },
  { monthlySalaryCredit: 25_000, pensionAt10Years: 5_300, pensionAt15Years: 7_800, pensionAt20Years: 12_800, pensionAt25Years: 17_800, pensionAt30Years: 22_800 },
  { monthlySalaryCredit: 30_000, pensionAt10Years: 6_300, pensionAt15Years: 9_300, pensionAt20Years: 15_300, pensionAt25Years: 21_300, pensionAt30Years: 27_300 },
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
      "SSS computes your pension using three formulas and gives you the highest amount: (1) PHP 300 + 20% of AMSC + 2% of AMSC for each CYS over 10, (2) 40% of AMSC, and (3) the minimum pension of PHP 2,000 (for 10-20 CYS) or PHP 4,000 (for 20+ CYS).",
  },
  {
    question: "What is the maximum SSS monthly pension?",
    answer:
      "There is no hard cap on the SSS pension, but it is limited by the maximum Monthly Salary Credit (PHP 30,000 in 2026) and your total years of contribution. With the maximum MSC and 30 years of contributions, the estimated pension is about PHP 27,300 per month.",
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
