import type { CalculatorPageData } from "@/types/content";

export const thirteenthMonthData: CalculatorPageData = {
  slug: "calculators/salary/thirteenth-month-pay-calculator-philippines",
  category: "salary",
  title: "13th Month Pay Calculator Philippines",
  metaTitle:
    "13th Month Pay Calculator Philippines – Full-Year & Prorated Estimate | PesoHub",
  metaDescription:
    "Estimate your 13th month pay in the Philippines using your monthly basic salary and months worked. Supports full-year and prorated scenarios with included vs excluded pay guidance.",
  h1: "13th Month Pay Calculator Philippines",
  intro:
    "Estimate your 13th month pay in the Philippines based on your monthly basic salary and months worked during the calendar year. Use this calculator for both full-year and prorated scenarios, then check the guide below to understand which pay elements are included and excluded from the computation.",
  updatedAt: "2026-03-17",
  defaultInputs: {
    monthlyBasicSalary: 24_000,
    monthsWorked: 12,
  },
  formula: {
    name: "13th Month Pay Estimation",
    description:
      "13th month pay is computed as total basic salary earned during the calendar year divided by 12. For a fixed monthly basic salary, this becomes monthly basic salary multiplied by months worked, then divided by 12.",
    explanation:
      "PD 851 and its implementing rule define 13th month pay as one-twelfth of the basic salary earned during the calendar year. If salary stayed the same, the estimate is usually straightforward.",
  },
  exampleCalculation: {
    scenario:
      "An employee earning ₱24,000 monthly basic salary who worked all 12 months.",
    inputs: {
      monthlyBasicSalary: 24_000,
      monthsWorked: 12,
    },
    result: {
      totalBasicSalaryEarned: 288_000,
      thirteenthMonthPay: 24_000,
    },
  },
  tips: [
    "13th month pay is based on basic salary, not all forms of pay.",
    "If you worked the full year, the result is usually equal to one month's basic salary.",
    "If you worked part of the year, the amount is prorated based on months actually worked.",
  ],
  faqs: [
    {
      question: "What is 13th month pay in the Philippines?",
      answer:
        "13th month pay is the benefit required under PD 851, as modified, generally computed as 1/12 of the basic salary earned during the calendar year for rank-and-file employees.",
    },
    {
      question: "How do I compute 13th month pay?",
      answer:
        "A simple estimate is total basic salary earned during the calendar year divided by 12. If salary is fixed and months worked are clear, that often means monthly basic salary multiplied by months worked, then divided by 12.",
    },
    {
      question: "Is 13th month pay prorated?",
      answer:
        "Yes. If the employee did not work the full year, the amount is generally based on the basic salary actually earned during the covered months, divided by 12.",
    },
    {
      question: "What pay items are usually excluded?",
      answer:
        "The rule focuses on basic salary, and cases applying PD 851 consistently emphasize that basis. Items outside basic salary are generally not part of the standard computation base.",
    },
    {
      question: "Is this the same as a Christmas bonus?",
      answer:
        "Not necessarily. Case law explains that an employer already paying a 13th month pay or its equivalent may not be required to pay a duplicate benefit on top of that equivalent.",
    },
    {
      question: "When should 13th month pay be paid?",
      answer:
        "MO No. 28 states that covered rank-and-file employees should receive 13th month pay not later than December 24 of every year.",
    },
  ],
  relatedPages: [
    "calculators/tax/take-home-pay-calculator-philippines",
    "calculators/tax/withholding-tax-calculator-philippines",
    "government/philhealth/philhealth-contribution-table-philippines",
  ],
};
