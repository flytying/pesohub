import type { CalculatorPageData } from "@/types/content";

export const timeDepositData: CalculatorPageData = {
  slug: "calculators/savings/time-deposit-calculator-philippines",
  category: "savings",
  title: "Time Deposit Calculator Philippines",
  metaTitle:
    "Time Deposit Calculator Philippines – Estimate Interest, After-Tax Return & Maturity Amount | PesoHub",
  metaDescription:
    "Estimate your time deposit return in the Philippines using deposit amount, interest rate, and term. Compare gross interest, after-tax interest, and maturity amount with PesoHub.",
  h1: "Time Deposit Calculator Philippines",
  intro:
    "Estimate your time deposit earnings in the Philippines based on your deposit amount, interest rate, and term. Compare gross interest, estimated after-tax interest, and maturity amount so you can evaluate whether a time deposit fits your savings plan.",
  updatedAt: "2026-03-16",
  defaultInputs: {
    depositAmount: 100_000,
    annualRate: 5.5,
    term: 12,
  },
  formula: {
    name: "Simple Interest Time Deposit Estimation",
    description:
      "This calculator estimates time deposit return using a simple interest formula: Interest = Principal × Annual Rate × Term in Years. It then applies the standard 20% withholding tax on interest income to estimate your after-tax return and net maturity value.",
    explanation:
      "Actual bank products may use different compounding or crediting rules, and promotional rates may have specific conditions. This estimate is a starting reference, not a substitute for an official bank quotation.",
  },
  exampleCalculation: {
    scenario:
      "A depositor placing ₱100,000 at 5.5% annual interest for 12 months.",
    inputs: {
      depositAmount: 100_000,
      annualRate: 5.5,
      term: 12,
    },
    result: {
      grossInterest: 5_500,
      taxOnInterest: 1_100,
      afterTaxInterest: 4_400,
      netMaturityValue: 104_400,
    },
  },
  tips: [
    "Use gross return for headline comparison, but use after-tax return when deciding how much your money may actually grow.",
    "A time deposit with a longer term may offer a different return profile from a shorter one.",
    "This calculator is useful for a simple time deposit estimate and does not replace bank-specific product terms.",
  ],
  faqs: [
    {
      question: "What does this time deposit calculator estimate?",
      answer:
        "This calculator estimates your gross interest, after-tax interest, and maturity amount based on the deposit amount, interest rate, and term you enter.",
    },
    {
      question: "What is the maturity amount?",
      answer:
        "The maturity amount is the estimated total value of your time deposit at the end of the selected term, including your original deposit and estimated interest.",
    },
    {
      question: "Why should I compare gross and after-tax return?",
      answer:
        "Gross return shows the headline earnings, but after-tax return gives a better estimate of what you may actually receive. Comparing both helps you evaluate the real value of the deposit.",
    },
    {
      question: "Is this the same as an official bank quote?",
      answer:
        "No. This calculator provides a planning estimate only. Actual bank products may have different rules, rates, penalties, or conditions.",
    },
    {
      question: "What happens if I withdraw before maturity?",
      answer:
        "Actual early withdrawal treatment depends on the bank's terms. Some products may reduce or forfeit part of the expected return if the deposit is withdrawn before the full term.",
    },
    {
      question: "Should I use a time deposit or a savings account?",
      answer:
        "A time deposit is usually better if you can leave money untouched for a fixed term. A savings account is usually better if you need easier access to your funds.",
    },
  ],
  relatedPages: [
    "rates/savings-rates/best-savings-interest-rates-philippines",
    "calculators/savings/savings-goal-calculator-philippines",
    "rates",
  ],
};
