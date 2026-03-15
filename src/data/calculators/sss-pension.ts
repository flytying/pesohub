import type { CalculatorPageData } from "@/types/content";

export const sssPensionData: CalculatorPageData = {
  slug: "calculators/retirement/sss-pension-calculator",
  category: "retirement",
  title: "SSS Pension Calculator Philippines",
  metaTitle:
    "SSS Pension Calculator Philippines 2025 - Estimate Your Monthly Pension",
  metaDescription:
    "Calculate your estimated SSS monthly pension based on your salary credit and years of contribution. Uses the latest 2025 SSS contribution table and pension formulas.",
  h1: "SSS Pension Calculator Philippines",
  intro:
    "Estimate your SSS monthly retirement pension based on your Monthly Salary Credit (MSC) and total years of contribution. This calculator uses the three official SSS pension formulas and returns the highest result.",
  updatedAt: "2025-03-01",
  defaultInputs: {
    monthlySalaryCredit: 20_000,
    yearsOfContribution: 25,
  },
  formula: {
    name: "SSS Pension Formulas (Highest of Three)",
    description:
      "SSS uses three formulas and awards the highest pension amount.",
    explanation:
      "Your SSS pension is the highest of three formulas: (a) ₱300 + 20% of average Monthly Salary Credit (MSC) + 2% of average MSC for each credited year of service (CYS) over 10; (b) 40% of average MSC; (c) Minimum pension of ₱2,000 for 10-19 CYS or ₱4,000 for 20+ CYS. The Monthly Salary Credit is not your actual salary but the salary bracket assigned by SSS based on your compensation range. For most members with 20+ years and a moderate-to-high MSC, Formula (a) produces the highest pension.",
  },
  exampleCalculation: {
    scenario:
      "An SSS member with a Monthly Salary Credit of PHP 20,000 and 25 years of contribution.",
    inputs: {
      monthlySalaryCredit: 20_000,
      yearsOfContribution: 25,
    },
    result: {
      formulaA: 10_300,
      formulaB: 8_000,
      minimumPension: 4_000,
      monthlyPension: 10_300,
      monthlyContribution: 2_850,
      totalContributions: 855_000,
    },
  },
  tips: [
    "Maximize your Monthly Salary Credit by reporting your actual income to SSS. A higher MSC means higher contributions but also a significantly higher pension.",
    "Aim for at least 20 years of contributions to qualify for the higher minimum pension of ₱4,000/month and to maximize Formula (a) which grows with each credited year over 10.",
    "Voluntary members and OFWs can choose their MSC bracket. If you can afford it, selecting a higher bracket (up to ₱30,000) will result in a larger retirement pension.",
    "Continue contributing even after reaching 10 years of service. Each additional year adds 2% of your average MSC to your pension under Formula (a), which can significantly increase your monthly benefit.",
  ],
  faqs: [
    {
      question: "How many years do I need to contribute to SSS to get a pension?",
      answer:
        "You need at least 120 monthly contributions (10 years) to qualify for the SSS retirement pension. The pension amount increases with more years of contribution. Members with fewer than 120 contributions will receive a lump-sum benefit instead of a monthly pension upon retirement.",
    },
    {
      question:
        "What is the maximum SSS pension I can receive?",
      answer:
        "The maximum SSS pension depends on your Monthly Salary Credit and years of contribution. With the maximum MSC of ₱30,000 and 35 years of contribution (the practical maximum), Formula (a) yields approximately ₱21,300 per month. There is no hard cap, but the formula naturally limits the pension based on MSC and CYS. Pensioners also receive a 13th month pension each December.",
    },
    {
      question:
        "At what age can I claim my SSS retirement pension?",
      answer:
        "You can claim your SSS retirement pension at age 60 (optional retirement) if you have separated from employment or ceased self-employment, or at age 65 (mandatory/technical retirement) whether or not you are still working. You must have at least 120 monthly contributions to qualify for the monthly pension.",
    },
    {
      question:
        "What is the Monthly Salary Credit (MSC) in SSS?",
      answer:
        "The Monthly Salary Credit is the compensation bracket assigned by SSS based on your actual monthly earnings. It ranges from ₱4,000 to ₱30,000 (as of 2025). Your SSS contribution and benefits, including your pension, are computed based on your MSC, not your actual salary. For example, if your monthly salary is ₱20,500, your MSC would be ₱20,500 (falling in the ₱20,250-₱20,749 bracket).",
    },
    {
      question:
        "Do SSS pensioners receive a 13th month pension?",
      answer:
        "Yes, SSS retirement pensioners receive a 13th month pension every December, equivalent to one month of their regular monthly pension. This was mandated by RA 8282 (Social Security Act of 1997). Pensioners may also receive additional benefits if the SSS Board approves a pension increase.",
    },
  ],
  relatedPages: [
    "calculators/tax/withholding-tax-calculator-philippines",
    "calculators/loans/personal-loan-calculator-philippines",
  ],
};
