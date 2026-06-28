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
      "Your SSS pension is the highest of three formulas: (a) ₱300 + 20% of average Monthly Salary Credit (MSC) + 2% of average MSC for each credited year of service (CYS) over 10; (b) 40% of average MSC; (c) the statutory minimum of ₱1,200 for 10–19 CYS or ₱2,400 for 20+ CYS. A ₱1,000 across-the-board increase is then added on top of whichever formula wins. The Monthly Salary Credit is the bracket assigned by SSS (₱5,000 to ₱35,000), not your exact salary. For most members with 20+ years and a moderate-to-high MSC, Formula (a) produces the highest pension.",
  },
  exampleCalculation: {
    scenario:
      "An SSS member with an average Monthly Salary Credit of ₱20,000 and 25 years of contribution.",
    inputs: {
      monthlySalaryCredit: 20_000,
      yearsOfContribution: 25,
    },
    result: {
      formulaA: 10_300,
      formulaB: 8_000,
      minimumPension: 2_400,
      acrossTheBoardIncrease: 1_000,
      monthlyPension: 11_300,
    },
  },
  tips: [
    "The SSS always pays the highest of the three formulas, so you never need to pick one yourself.",
    "Each extra year of service beyond 10 adds 2% of your salary credit under the first formula.",
    "Delaying retirement and continuing to contribute can raise both your years of service and your average salary credit.",
    "The minimum monthly pension is ₱1,200 for 10 to under 20 years of service and ₱2,400 for 20 years or more, before the ₱1,000 increase.",
    "Dependent children may qualify for an additional dependent’s pension, which this estimate does not include.",
  ],
  faqs: [
    {
      question: "How is the SSS pension calculated in the Philippines?",
      answer:
        "The SSS uses three formulas and pays the highest result. They are based on your average monthly salary credit and your credited years of service, and a ₱1,000 across-the-board increase is added on top.",
    },
    {
      question: "How many years do I need to qualify for an SSS pension?",
      answer:
        "You need at least 120 monthly contributions, which is about 10 credited years of service, to receive a lifetime monthly pension. With fewer contributions you receive a one-time lump-sum benefit instead.",
    },
    {
      question: "What is the average monthly salary credit (AMSC)?",
      answer:
        "It is the average of the salary credits used for your contributions over your membership. A higher AMSC produces a higher pension because it feeds directly into all three formulas.",
    },
    {
      question: "What is the minimum SSS pension?",
      answer:
        "Before the ₱1,000 increase, the minimum is ₱1,200 per month for 10 to under 20 credited years and ₱2,400 for 20 or more years. The ₱1,000 increase is then added on top.",
    },
    {
      question: "Do SSS pensioners get a 13th-month pension?",
      answer:
        "Yes. Retirement pensioners receive a 13th-month pension every December equal to one monthly pension, in addition to their twelve monthly payments.",
    },
    {
      question: "Can I increase my future SSS pension?",
      answer:
        "Yes. Contributing at a higher salary credit and accumulating more credited years both raise the formula results. The compare row above shows how more years of service lift the estimate.",
    },
  ],
  relatedPages: [
    "calculators/tax/withholding-tax-calculator-philippines",
    "calculators/loans/personal-loan-calculator-philippines",
  ],
};
