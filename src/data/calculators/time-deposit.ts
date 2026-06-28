import type { CalculatorPageData } from "@/types/content";

export const timeDepositData: CalculatorPageData = {
  slug: "calculators/savings/time-deposit-calculator-philippines",
  category: "savings",
  title: "Time Deposit Calculator Philippines 2026",
  metaTitle:
    "Time Deposit Calculator Philippines 2026 | Interest, Tax & Maturity",
  metaDescription:
    "Estimate your Philippine time deposit maturity amount, gross interest, 20% withholding tax, and after-tax return based on deposit amount, rate, and term.",
  h1: "Time Deposit Calculator Philippines 2026",
  intro:
    "Use this time deposit calculator to estimate your gross interest, 20% withholding tax, after-tax interest, and maturity amount based on your deposit amount, annual interest rate, and term.",
  updatedAt: "2026-06-28",
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
      question: "How do I compute time deposit interest in the Philippines?",
      answer:
        "For a simple estimate, gross interest = deposit amount × annual interest rate × term in years. Then subtract the 20% final withholding tax from the interest (not the principal) to get your after-tax interest, and add that to your deposit for the maturity amount. For example, ₱100,000 at 5.5% for 12 months earns ₱5,500 gross interest, ₱1,100 tax, ₱4,400 after-tax interest, and a ₱104,400 maturity amount.",
    },
    {
      question: "What is the tax on time deposit interest in the Philippines?",
      answer:
        "Interest from peso bank deposits is generally subject to a 20% final withholding tax. The bank withholds it automatically and remits it to the BIR, so the interest credited to you is already net of tax. Under CMEPA, a uniform 20% rate applies to deposits from July 1, 2025.",
    },
    {
      question: "Is the 20% tax deducted from the principal or the interest?",
      answer:
        "Only from the interest. Your principal (the amount you deposited) is never taxed — the 20% final withholding tax applies to the interest income your deposit earns.",
    },
    {
      question: "What is the maturity amount of a time deposit?",
      answer:
        "The maturity amount is the total value of your time deposit at the end of the term: your original deposit plus the interest it earned, after tax. It is the amount you can withdraw or roll over when the deposit matures.",
    },
    {
      question: "Is time deposit interest computed monthly or annually?",
      answer:
        "The advertised rate is an annual (per-year) rate, but the interest you earn is based on how long your money is locked in. Most Philippine time deposits use simple interest credited at maturity. Some products credit interest monthly or compound it — confirm the crediting rule with your bank. This calculator defaults to simple interest and offers optional compounding estimates.",
    },
    {
      question: "Is a time deposit better than a savings account?",
      answer:
        "It depends on your need. A time deposit usually pays a higher rate but locks your money for a fixed term, so it suits funds you will not touch. A savings account pays less but lets you withdraw anytime, so it suits emergency funds and money you may need soon.",
    },
    {
      question: "What happens if I withdraw my time deposit early?",
      answer:
        "Early withdrawal is usually allowed but penalised. Banks typically pay a lower rate (or forfeit part of the interest) when you break a time deposit before maturity. Check your bank's pre-termination terms before placing the deposit.",
    },
    {
      question: "Are time deposits covered by PDIC?",
      answer:
        "Yes. Time deposits at PDIC-member banks are insured. PDIC deposit insurance currently covers up to ₱1 million per depositor, per bank (effective March 15, 2025). Keep your total deposits per bank within that limit if protection is important to you.",
    },
    {
      question: "How much will ₱100,000 earn in a time deposit?",
      answer:
        "At 5.5% for 12 months using simple interest, ₱100,000 earns ₱5,500 gross interest, less ₱1,100 (20% tax), for ₱4,400 after-tax interest and a ₱104,400 maturity amount. The exact figure depends on the rate, term, and tax — use the calculator above to try your own numbers.",
    },
    {
      question: "Is this time deposit calculator an official bank quote?",
      answer:
        "No. This is a planning estimate only. Actual returns depend on the bank's exact rate, compounding and crediting rules, promotional conditions, and early withdrawal penalties. Always confirm the final figures with your bank.",
    },
  ],
  relatedPages: [
    "rates/savings-rates/best-savings-interest-rates-philippines",
    "calculators/savings/savings-goal-calculator-philippines",
    "rates",
  ],
};
