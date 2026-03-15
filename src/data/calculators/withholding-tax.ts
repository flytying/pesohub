import type { CalculatorPageData } from "@/types/content";

export const withholdingTaxData: CalculatorPageData = {
  slug: "calculators/tax/withholding-tax-calculator-philippines",
  category: "tax",
  title: "Withholding Tax Calculator Philippines",
  metaTitle:
    "Withholding Tax Calculator Philippines 2025 - TRAIN Law Income Tax",
  metaDescription:
    "Calculate your monthly withholding tax under the TRAIN Law in the Philippines. See your effective tax rate, tax bracket, and take-home pay based on your salary.",
  h1: "Withholding Tax Calculator Philippines",
  intro:
    "Compute your monthly and annual income tax under the TRAIN Law (RA 10963) effective 2023 onwards. Enter your monthly salary to see your withholding tax, effective tax rate, and take-home pay.",
  updatedAt: "2025-03-01",
  defaultInputs: {
    monthlySalary: 35_000,
  },
  formula: {
    name: "TRAIN Law Graduated Income Tax Table",
    description:
      "The Philippines uses a progressive income tax system under the TRAIN Law.",
    explanation:
      "Your annual taxable income determines which tax bracket you fall into. Tax is computed as: Base Tax + (Marginal Rate x Excess over Bracket Floor). For example, if your annual taxable income is ₱420,000, you fall in the ₱400,001 - ₱800,000 bracket. Your tax would be ₱22,500 + 20% of the amount exceeding ₱400,000. Income up to ₱250,000 per year is tax-exempt. This calculator uses your gross monthly salary multiplied by 12 to derive annual taxable income, and does not account for mandatory deductions (SSS, PhilHealth, Pag-IBIG) which reduce your taxable income.",
  },
  exampleCalculation: {
    scenario:
      "An employee earning PHP 35,000 per month gross salary (PHP 420,000 annual taxable income).",
    inputs: {
      monthlySalary: 35_000,
    },
    result: {
      annualTaxableIncome: 420_000,
      annualTax: 26_500,
      monthlyTax: 2_208,
      effectiveRate: 6.31,
      monthlyTakeHome: 32_792,
      annualTakeHome: 393_500,
    },
  },
  tips: [
    "Remember that your actual taxable income is reduced by mandatory contributions (SSS, PhilHealth, Pag-IBIG). Deduct these from your gross salary before computing tax for a more accurate estimate.",
    "The 13th month pay and other bonuses are tax-exempt up to PHP 90,000 per year under the TRAIN Law. Any excess is added to your taxable income.",
    "Self-employed individuals and freelancers earning no more than PHP 3 million annually can opt for the 8% flat tax rate on gross sales/receipts instead of the graduated income tax table.",
    "Keep records of all deductions and contributions. If you are employed by multiple employers or have side income, you may need to file an annual income tax return (BIR Form 1700 or 1701) to reconcile your taxes.",
  ],
  faqs: [
    {
      question:
        "What are the income tax brackets under the TRAIN Law in the Philippines?",
      answer:
        "Under the TRAIN Law (effective 2023 onwards), the graduated income tax brackets are: 0% for income up to ₱250,000; 15% for income over ₱250,000 to ₱400,000; 20% for income over ₱400,000 to ₱800,000 (plus ₱22,500); 25% for income over ₱800,000 to ₱2,000,000 (plus ₱102,500); 30% for income over ₱2,000,000 to ₱8,000,000 (plus ₱402,500); and 35% for income over ₱8,000,000 (plus ₱2,202,500).",
    },
    {
      question:
        "Who is exempt from withholding tax in the Philippines?",
      answer:
        "Employees earning ₱250,000 or less annually (approximately ₱20,833 or less per month) are exempt from income tax under the TRAIN Law. Minimum wage earners are also exempt regardless of region. Additionally, the 13th month pay and other benefits up to ₱90,000 per year are tax-exempt for all employees.",
    },
    {
      question:
        "What is the difference between withholding tax and income tax?",
      answer:
        "Withholding tax is the amount your employer deducts from your salary and remits directly to the BIR on your behalf each payday. Income tax is the total tax you owe for the entire year. Withholding tax is essentially a pre-payment of your income tax. At the end of the year, your total withholding tax should approximately equal your annual income tax liability. Any overpayment or underpayment is reconciled through your annual income tax return.",
    },
    {
      question:
        "How does the 8% flat tax option work for freelancers?",
      answer:
        "Self-employed individuals and professionals with annual gross sales or receipts not exceeding ₱3 million can elect to pay an 8% flat tax on gross sales/receipts exceeding ₱250,000. This replaces both the graduated income tax and the 3% percentage tax. It simplifies tax computation and filing. You must declare your choice during the first quarter of each taxable year by filing BIR Form 2551Q.",
    },
    {
      question:
        "Are mandatory contributions (SSS, PhilHealth, Pag-IBIG) deducted before computing withholding tax?",
      answer:
        "Yes, mandatory employee contributions to SSS, PhilHealth, and Pag-IBIG are deducted from your gross compensation before computing the withholding tax. These contributions reduce your taxable income, which means your actual tax may be lower than what this calculator shows if you enter gross salary. For a more precise estimate, subtract your total mandatory contributions from your gross salary before using this calculator.",
    },
  ],
  relatedPages: [
    "calculators/retirement/sss-pension-calculator",
    "calculators/loans/personal-loan-calculator-philippines",
  ],
};
