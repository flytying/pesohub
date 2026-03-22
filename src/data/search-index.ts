/**
 * Search Index
 *
 * Central search index for all site pages. When adding a new page,
 * add a corresponding entry here so it appears in search results.
 */

import { carLoanData } from "@/data/calculators/car-loan";
import { homeLoanData } from "@/data/calculators/home-loan";
import { personalLoanData } from "@/data/calculators/personal-loan";
import { withholdingTaxData } from "@/data/calculators/withholding-tax";
import { takeHomePayData } from "@/data/calculators/take-home-pay";
import { sssContributionCalcData } from "@/data/calculators/sss-contribution";
import { sssPensionData } from "@/data/calculators/sss-pension";
import { timeDepositData } from "@/data/calculators/time-deposit";
import { thirteenthMonthData } from "@/data/calculators/thirteenth-month";

import { withholdingTaxMeta } from "@/data/guides/withholding-tax-guide";
import { takeHomePayGuideMeta } from "@/data/guides/take-home-pay-guide";
import { sssPensionMeta } from "@/data/guides/sss-pension-guide";
import { pagibigGuideMeta } from "@/data/guides/pag-ibig-guide";
import { philhealthGuideMeta } from "@/data/guides/philhealth-guide";

import { sssContributionMeta } from "@/data/government/sss-contribution";
import { sssPensionTableMeta } from "@/data/government/sss-pension-table";
import { withholdingTaxTableMeta } from "@/data/government/withholding-tax-table";
import { bspExchangeRateMeta } from "@/data/government/bsp-exchange-rate";
import { pagibigContributionMeta } from "@/data/government/pag-ibig-contribution";
import { pagibigHousingLoanMeta } from "@/data/government/pag-ibig-housing-loan";
import { philhealthMeta } from "@/data/government/philhealth";

export interface SearchItem {
  title: string;
  description: string;
  href: string;
  category: "calculator" | "rates" | "guide" | "government" | "general";
  keywords: string[];
}

/** Extract FAQ questions as keyword strings */
function faqKeywords(faqs?: { question: string }[]): string[] {
  return faqs?.map((f) => f.question) ?? [];
}

/** Build a SearchItem from a CalculatorPageData-shaped object */
function fromCalculator(data: {
  title: string;
  metaDescription: string;
  slug: string;
  faqs?: { question: string }[];
  tips?: string[];
}, extraKeywords: string[] = []): SearchItem {
  return {
    title: data.title,
    description: data.metaDescription,
    href: `/${data.slug}`,
    category: "calculator",
    keywords: [...extraKeywords, ...faqKeywords(data.faqs), ...(data.tips ?? [])],
  };
}

/** Build a SearchItem from a guide/government meta object */
function fromMeta(
  meta: { title: string; metaDescription: string; slug: string },
  category: SearchItem["category"],
  extraKeywords: string[] = [],
): SearchItem {
  return {
    title: meta.title,
    description: meta.metaDescription,
    href: `/${meta.slug}`,
    category,
    keywords: extraKeywords,
  };
}

export const searchIndex: SearchItem[] = [
  // ── Calculators ──────────────────────────────────────────────────
  fromCalculator(carLoanData, [
    "car loan", "auto loan", "vehicle", "amortization", "monthly payment",
    "car price", "down payment", "interest rate", "financing", "kotse",
  ]),
  fromCalculator(homeLoanData, [
    "home loan", "housing loan", "mortgage", "property", "real estate",
    "amortization", "monthly payment", "down payment", "bahay",
  ]),
  fromCalculator(personalLoanData, [
    "personal loan", "cash loan", "unsecured loan", "monthly payment",
    "interest rate", "amortization",
  ]),
  fromCalculator(withholdingTaxData, [
    "withholding tax", "income tax", "tax calculator", "BIR", "TRAIN Law",
    "tax bracket", "buwis", "salary tax",
  ]),
  fromCalculator(takeHomePayData, [
    "take home pay", "net pay", "salary", "sweldo", "sahod", "deductions",
    "SSS", "PhilHealth", "Pag-IBIG", "withholding tax", "gross pay",
  ]),
  fromCalculator(sssContributionCalcData, [
    "SSS contribution", "SSS calculator", "social security", "monthly contribution",
    "employee share", "employer share", "MSC",
  ]),
  fromCalculator(sssPensionData, [
    "SSS pension", "retirement", "pension calculator", "monthly pension",
    "years of contribution", "retirement age",
  ]),
  fromCalculator(timeDepositData, [
    "time deposit", "fixed deposit", "interest", "maturity", "bank",
    "savings", "investment",
  ]),
  fromCalculator(thirteenthMonthData, [
    "13th month pay", "thirteenth month", "bonus", "Christmas bonus",
    "basic salary", "pro-rated", "labor code",
  ]),
  {
    title: "Emergency Fund Calculator Philippines",
    description: "Estimate how much you may want to set aside for emergencies based on your monthly expenses and target number of months.",
    href: "/calculators/savings/emergency-fund-calculator-philippines",
    category: "calculator",
    keywords: [
      "emergency fund", "savings", "rainy day fund", "monthly expenses",
      "financial cushion", "safety net", "ipon",
    ],
  },
  {
    title: "Savings Goal Calculator Philippines",
    description: "Estimate how much you may need to save regularly to reach a target amount by your chosen timeline.",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    category: "calculator",
    keywords: [
      "savings goal", "target savings", "monthly savings", "ipon",
      "financial goal", "saving plan",
    ],
  },

  // ── Rates ────────────────────────────────────────────────────────
  {
    title: "USD to PHP Exchange Rate Today",
    description: "View the latest BSP reference exchange rate for US Dollar to Philippine Peso, with a 30-day trend chart and historical data.",
    href: "/rates/exchange-rates/usd-to-php-today",
    category: "rates",
    keywords: [
      "USD to PHP", "exchange rate", "dollar to peso", "BSP rate",
      "forex", "currency", "palitan", "dolyar",
    ],
  },
  {
    title: "Best Savings Interest Rates Philippines",
    description: "Compare savings account interest rates from major Philippine banks. Find the highest rates for your money.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    category: "rates",
    keywords: [
      "savings rate", "interest rate", "bank rates", "savings account",
      "highest rate", "best rate", "ipon", "bangko",
    ],
  },
  {
    title: "Best Digital Bank Rates Philippines",
    description: "Compare interest rates, features, and deposit insurance coverage of digital banks in the Philippines.",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    category: "rates",
    keywords: [
      "digital bank", "online bank", "Maya", "GCash", "Tonik", "GoTyme",
      "CIMB", "Seabank", "interest rate", "savings",
    ],
  },
  {
    title: "Time Deposit Rates Philippines",
    description: "Compare time deposit rates from Philippine banks. Find the best fixed-term deposit rates for your savings.",
    href: "/rates/savings-rates/time-deposit-rates-philippines",
    category: "rates",
    keywords: [
      "time deposit", "fixed deposit", "term deposit", "bank rates",
      "interest rate", "maturity", "placement",
    ],
  },

  // ── Guides ───────────────────────────────────────────────────────
  fromMeta(withholdingTaxMeta, "guide", [
    "withholding tax", "income tax", "TRAIN Law", "tax bracket", "BIR",
    "salary tax", "buwis", "tax computation", "how tax works",
  ]),
  fromMeta(takeHomePayGuideMeta, "guide", [
    "take home pay", "net pay", "salary", "deductions", "sweldo",
    "SSS", "PhilHealth", "Pag-IBIG", "gross to net",
  ]),
  fromMeta(sssPensionMeta, "guide", [
    "SSS pension", "retirement", "pension computation", "years of service",
    "monthly pension", "how to compute",
  ]),
  fromMeta(pagibigGuideMeta, "guide", [
    "Pag-IBIG", "HDMF", "Pag-IBIG deduction", "contribution",
    "housing fund", "mandatory deduction",
  ]),
  fromMeta(philhealthGuideMeta, "guide", [
    "PhilHealth", "health insurance", "contribution", "premium",
    "mandatory deduction", "healthcare",
  ]),

  // ── Government Reference Tables ──────────────────────────────────
  fromMeta(sssContributionMeta, "government", [
    "SSS contribution table", "SSS schedule", "contribution rate",
    "employee share", "employer share", "MSC", "social security",
  ]),
  fromMeta(sssPensionTableMeta, "government", [
    "SSS pension table", "pension estimate", "retirement table",
    "monthly pension", "years of contribution",
  ]),
  fromMeta(withholdingTaxTableMeta, "government", [
    "withholding tax table", "tax bracket", "BIR", "TRAIN Law",
    "income tax table", "tax schedule",
  ]),
  fromMeta(bspExchangeRateMeta, "government", [
    "BSP", "Bangko Sentral", "exchange rate", "reference rate",
    "central bank", "monetary policy",
  ]),
  fromMeta(pagibigContributionMeta, "government", [
    "Pag-IBIG contribution table", "HDMF", "contribution schedule",
    "employee share", "employer share",
  ]),
  fromMeta(pagibigHousingLoanMeta, "government", [
    "Pag-IBIG housing loan", "HDMF loan", "home loan", "housing",
    "loan terms", "interest rate", "affordable housing",
  ]),
  fromMeta(philhealthMeta, "government", [
    "PhilHealth contribution table", "premium rate", "health insurance",
    "contribution schedule", "mandatory premium",
  ]),

  // ── Index / Category Pages ───────────────────────────────────────
  {
    title: "Calculators",
    description: "Free Philippine financial calculators for loans, taxes, SSS, savings, and salary.",
    href: "/calculators",
    category: "general",
    keywords: ["calculator", "tools", "compute", "estimate"],
  },
  {
    title: "Rates",
    description: "Compare the latest exchange rates, savings rates, and digital bank rates in the Philippines.",
    href: "/rates",
    category: "general",
    keywords: ["rates", "interest", "exchange", "comparison"],
  },
  {
    title: "Guides",
    description: "Plain-language guides to Philippine taxes, deductions, and government benefits.",
    href: "/guides",
    category: "general",
    keywords: ["guide", "how to", "tutorial", "explanation"],
  },
  {
    title: "Government",
    description: "Official Philippine government contribution tables, tax schedules, and reference data.",
    href: "/government",
    category: "general",
    keywords: ["government", "official", "table", "schedule", "reference"],
  },
];
