import type { FAQ } from "@/types/content";

export const PAGIBIG_MP2_UPDATED_AT = "2026-04-02";

export const pagibigMp2Meta = {
  title: "Pag-IBIG MP2 Savings Guide Philippines 2026",
  metaTitle:
    "Pag-IBIG MP2 Guide 2026: Dividend Rate, Enrollment & Savings Calculator | PesoHub",
  metaDescription:
    "Complete Pag-IBIG MP2 guide for 2026 — current dividend rates, how to enroll, salary deduction process, MP2 vs regular fund comparison, and dividend history since 2010.",
  slug: "government/pag-ibig/pag-ibig-mp2-savings-guide",
  directAnswer:
    "Pag-IBIG MP2 is a voluntary savings program that offers higher dividends than the regular Pag-IBIG fund. You can contribute through employer salary deduction or directly through Pag-IBIG branches and online channels. This guide explains how the salary deduction works, how to enroll, and what to expect.",
};

export interface Mp2QuickFact {
  label: string;
  value: string;
  note: string;
}

export const mp2AtAGlance: Mp2QuickFact[] = [
  {
    label: "Minimum Contribution",
    value: "₱500/month",
    note: "No maximum limit",
  },
  {
    label: "Maturity Period",
    value: "5 years",
    note: "Savings locked until maturity",
  },
  {
    label: "Latest Dividend Rate",
    value: "5.61%",
    note: "2024 rate (tax-exempt)",
  },
  {
    label: "Tax on Dividends",
    value: "Tax-exempt",
    note: "No withholding tax on MP2 earnings",
  },
  {
    label: "Eligibility",
    value: "Active member",
    note: "At least 1 month Pag-IBIG contribution",
  },
  {
    label: "Contribution Frequency",
    value: "Monthly",
    note: "Via employer deduction or direct payment",
  },
];

export interface Mp2ComparisonRow {
  feature: string;
  regularPagibig: string;
  mp2: string;
}

export const mp2VsRegularComparison: Mp2ComparisonRow[] = [
  {
    feature: "Nature",
    regularPagibig: "Mandatory for employed members",
    mp2: "Voluntary — you choose to join",
  },
  {
    feature: "Contribution Amount",
    regularPagibig: "Based on salary (max ₱100/month employee share)",
    mp2: "₱500/month minimum, no maximum",
  },
  {
    feature: "Employer Role",
    regularPagibig: "Employer must deduct and remit",
    mp2: "Employer deducts only if you request it",
  },
  {
    feature: "Dividend Rate (2024)",
    regularPagibig: "5.61%",
    mp2: "5.61%",
  },
  {
    feature: "Tax on Dividends",
    regularPagibig: "Tax-exempt",
    mp2: "Tax-exempt",
  },
  {
    feature: "Maturity",
    regularPagibig: "Age 60 (retirement) or membership termination",
    mp2: "5 years from first contribution",
  },
  {
    feature: "Early Withdrawal",
    regularPagibig: "Only for specific claims (housing, calamity, etc.)",
    mp2: "Not allowed before maturity (except death, disability, insolvency)",
  },
  {
    feature: "Payslip Appearance",
    regularPagibig: "Shown as 'Pag-IBIG' or 'HDMF' deduction",
    mp2: "Separate line item (e.g., 'MP2' or 'Pag-IBIG MP2')",
  },
];

export interface Mp2EnrollmentStep {
  step: number;
  title: string;
  description: string;
}

export const mp2EnrollmentSteps: Mp2EnrollmentStep[] = [
  {
    step: 1,
    title: "Confirm You Are an Active Member",
    description:
      "You must have at least one month of regular Pag-IBIG contribution. Check your membership status through the Virtual Pag-IBIG portal or your latest payslip.",
  },
  {
    step: 2,
    title: "Fill Out the MP2 Savings Application Form",
    description:
      "Download the form from the Pag-IBIG website or request it from your HR department. Indicate your desired monthly contribution amount (minimum ₱500).",
  },
  {
    step: 3,
    title: "Submit to Your Employer's HR or Payroll Team",
    description:
      "Give the completed form to your company's HR or payroll department. They will set up the recurring salary deduction.",
  },
  {
    step: 4,
    title: "Employer Deducts from Monthly Payroll",
    description:
      "Starting the next payroll cycle, your chosen MP2 amount is deducted from your salary each month, separate from the regular Pag-IBIG contribution.",
  },
  {
    step: 5,
    title: "Employer Remits to Pag-IBIG",
    description:
      "Your employer sends the MP2 contribution to Pag-IBIG Fund along with (but separate from) regular Pag-IBIG contributions.",
  },
  {
    step: 6,
    title: "Track via Virtual Pag-IBIG",
    description:
      "Monitor your MP2 savings balance and contribution history through the Virtual Pag-IBIG portal at pagibigfund.gov.ph.",
  },
];

export const mp2SalaryDeductionSteps: string[] = [
  "MP2 salary deduction is voluntary — your employer only deducts if you submit an MP2 application form",
  "The deducted amount is your chosen contribution (₱500/month minimum), not a percentage of your salary",
  "MP2 appears as a separate line item on your payslip, distinct from the mandatory Pag-IBIG contribution",
  "Your employer remits the MP2 amount to Pag-IBIG Fund alongside regular contributions",
  "You can request to stop or change the amount by notifying your HR or payroll department",
  "The employer does not contribute a matching share for MP2 — only the employee pays",
];

export const mp2OtcOptions: string[] = [
  "Virtual Pag-IBIG portal (online payment via bank transfer or e-wallet)",
  "Over-the-counter at any Pag-IBIG branch or satellite office",
  "Accredited payment centers (e.g., Bayad, SM Business Centers)",
  "Selected banks and e-wallet platforms",
  "You can make lump-sum or one-time contributions in addition to regular monthly payments",
];

export interface Mp2DividendYear {
  year: number;
  dividendRate: string;
  note?: string;
}

export const mp2DividendHistory: Mp2DividendYear[] = [
  { year: 2024, dividendRate: "5.61%" },
  { year: 2023, dividendRate: "7.05%" },
  { year: 2022, dividendRate: "6.63%" },
  { year: 2021, dividendRate: "6.00%" },
  { year: 2020, dividendRate: "6.12%" },
  { year: 2019, dividendRate: "7.23%", note: "Highest rate in recent years" },
];

export const mp2WithdrawalRules: string[] = [
  "MP2 savings mature 5 years after the month of your first contribution",
  "Upon maturity, you can withdraw the full amount (principal + accumulated dividends) or renew for another 5 years",
  "Early withdrawal before 5 years is generally not allowed",
  "Exceptions for early claim: death of member, permanent total disability, insolvency or bank closure",
  "If you stop contributing before maturity, your savings remain in the fund and continue earning dividends until the 5-year period ends",
  "Dividends are computed and credited annually based on average monthly balance",
];

export const pagibigMp2Faqs: FAQ[] = [
  {
    question: "Is MP2 salary deduction mandatory?",
    answer:
      "No. MP2 is a voluntary savings program. Your employer will only deduct MP2 from your salary if you submit an MP2 Savings Application Form requesting the deduction. It is completely separate from the mandatory Pag-IBIG contribution.",
  },
  {
    question: "Can my employer deduct MP2 from my salary?",
    answer:
      "Yes, but only if you authorize it by submitting the MP2 application form to your HR or payroll department. The employer then sets up a recurring deduction for the amount you specified.",
  },
  {
    question: "How much is the MP2 deduction per month?",
    answer:
      "The minimum monthly MP2 contribution is ₱500, with no maximum limit. You choose the exact amount when you fill out the application form, and you can request changes through your HR or payroll team.",
  },
  {
    question: "What is the difference between regular Pag-IBIG and MP2?",
    answer:
      "Regular Pag-IBIG is a mandatory contribution (up to ₱100/month employee share) that both employee and employer pay. MP2 is a voluntary savings program with a ₱500/month minimum, paid only by the employee, with a 5-year maturity period. Both earn the same dividend rate and are tax-exempt.",
  },
  {
    question: "Is the MP2 dividend taxable?",
    answer:
      "No. MP2 dividends are exempt from withholding tax, which means you receive the full dividend amount. This is one of the key advantages of MP2 over other savings instruments where interest is subject to 20% withholding tax.",
  },
  {
    question: "Can I withdraw my MP2 savings before 5 years?",
    answer:
      "Generally, no. MP2 savings are locked for 5 years from the date of your first contribution. Early withdrawal is only allowed in cases of death, permanent total disability, or insolvency. If you stop contributing, your balance stays in the fund and continues earning dividends until maturity.",
  },
  {
    question: "How do I check my MP2 balance?",
    answer:
      "You can check your MP2 balance through the Virtual Pag-IBIG portal at pagibigfund.gov.ph. Log in with your Pag-IBIG account, and your MP2 savings balance and contribution history will be available under the MP2 section.",
  },
  {
    question: "Where should I go after reading this guide?",
    answer:
      "Use the Take-Home Pay Calculator to see how MP2 fits alongside your other payroll deductions. You can also check the Pag-IBIG Contribution Table for details on the mandatory contribution, or visit the Government Hub for other reference pages.",
  },
  {
    question: "What is the Pag-IBIG MP2 dividend rate for 2025?",
    answer:
      "The Pag-IBIG MP2 dividend rate for 2025 has not yet been announced — it is typically released in the first half of the following year. The 2024 MP2 dividend rate was announced by Pag-IBIG Fund through its official channels. Check back for updates or visit the Pag-IBIG website for the latest announcement.",
  },
  {
    question: "Is Pag-IBIG MP2 a good investment?",
    answer:
      "Pag-IBIG MP2 has historically offered competitive dividend rates compared to bank savings accounts and time deposits, with rates ranging from 5% to over 7% in recent years. It is a low-risk savings option backed by the government. However, your money is locked in for 5 years, and dividends are not guaranteed. It works best as a conservative, medium-term savings vehicle.",
  },
];
