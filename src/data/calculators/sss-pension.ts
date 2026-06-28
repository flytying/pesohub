import type { CalculatorPageData } from "@/types/content";

export const sssPensionData: CalculatorPageData = {
  slug: "calculators/retirement/sss-pension-calculator",
  category: "retirement",
  title: "SSS Pension Calculator Philippines",
  metaTitle:
    "SSS Pension Calculator Philippines 2026 - Estimate Your Monthly Pension",
  metaDescription:
    "Calculate your estimated SSS monthly pension based on your salary credit and years of contribution. Uses the latest 2026 SSS contribution table (₱5,000–₱35,000 MSC) and the three official pension formulas.",
  h1: "SSS Pension Calculator Philippines",
  intro:
    "Estimate your SSS monthly retirement pension based on your Monthly Salary Credit (MSC) and total years of contribution. This calculator uses the three official SSS pension formulas and returns the highest result.",
  updatedAt: "2026-06-28",
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
    {
      question: "Can voluntary members get an SSS pension?",
      answer:
        "Yes. Voluntary members, self-employed members, and OFWs qualify for the same retirement pension as employees. The pension uses the same three formulas based on your average Monthly Salary Credit and credited years of service — you just need at least 120 monthly contributions (10 credited years) to receive a lifetime monthly pension instead of a lump sum.",
    },
    {
      question: "How do I compute my SSS pension?",
      answer:
        "Take your average Monthly Salary Credit (AMSC) and credited years of service (CYS), then compute all three formulas and use the highest: (a) ₱300 + 20% of AMSC + 2% of AMSC for each year over 10, (b) 40% of AMSC, and (c) the minimum of ₱1,200 (10–19 years) or ₱2,400 (20+ years). Example: ₱20,000 AMSC with 25 years gives Formula A = ₱10,300, which wins; adding the ₱1,000 across-the-board increase makes ₱11,300 per month.",
    },
    {
      question: "What does MSC (Monthly Salary Credit) mean in SSS?",
      answer:
        "The Monthly Salary Credit is the salary bracket SSS assigns to your contributions, not your exact salary. In 2026 it ranges from ₱5,000 to ₱35,000 in ₱500 steps. Your contributions and your future pension are based on the MSC, so contributing at a higher MSC builds a bigger pension.",
    },
    {
      question: "How much SSS pension will I get after 10 years?",
      answer:
        "Ten credited years (120 contributions) is the minimum to qualify for a monthly pension. At 10 years the 40%-of-AMSC formula usually governs: for example, a ₱20,000 AMSC gives about ₱8,000, plus the ₱1,000 increase for roughly ₱9,000 per month. A lower MSC may instead be lifted to the ₱1,200 statutory minimum. More credited years raise the amount under the first formula.",
    },
    {
      question: "Is the SSS pension based on contributions or salary?",
      answer:
        "It is based on your average Monthly Salary Credit (AMSC) — the average of the salary credits behind your contributions — together with your credited years of service, not your final or current salary. Paying contributions at a higher salary credit, and for more years, both increase the pension.",
    },
  ],
  relatedPages: [
    "calculators/tax/withholding-tax-calculator-philippines",
    "calculators/loans/personal-loan-calculator-philippines",
  ],
};
