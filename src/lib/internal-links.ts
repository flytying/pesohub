import type { PageLink } from "@/types/content";

export const ALL_PAGES: PageLink[] = [
  {
    slug: "/calculators/loans/car-loan-calculator-philippines",
    title: "Car Loan Calculator",
    description: "Calculate monthly car loan payments, total interest, and amortization schedule.",
    category: "calculator",
  },
  {
    slug: "/calculators/loans/home-loan-calculator-philippines",
    title: "Home Loan Calculator",
    description: "Estimate monthly mortgage payments and total cost of your home loan.",
    category: "calculator",
  },
  {
    slug: "/calculators/loans/personal-loan-calculator-philippines",
    title: "Personal Loan Calculator",
    description: "Compute monthly personal loan payments and total interest charges.",
    category: "calculator",
  },
  {
    slug: "/calculators/tax/withholding-tax-calculator-philippines",
    title: "Withholding Tax Calculator",
    description: "Calculate your monthly and annual income tax based on TRAIN Law brackets.",
    category: "calculator",
  },
  {
    slug: "/calculators/retirement/sss-pension-calculator",
    title: "SSS Pension Calculator",
    description: "Estimate your monthly SSS retirement pension based on contributions.",
    category: "calculator",
  },
  {
    slug: "/rates/exchange-rates/usd-to-php-today",
    title: "USD to PHP Exchange Rate Today",
    description: "Current US Dollar to Philippine Peso exchange rate with historical data.",
    category: "rate",
  },
  {
    slug: "/rates/savings-rates/best-savings-interest-rates-philippines",
    title: "Best Savings Interest Rates",
    description: "Compare savings account interest rates from Philippine banks.",
    category: "rate",
  },
  {
    slug: "/guides/tax/how-withholding-tax-works-philippines",
    title: "How Withholding Tax Works",
    description: "Step-by-step guide to understanding Philippine income tax withholding.",
    category: "guide",
  },
  {
    slug: "/guides/sss/how-to-compute-sss-pension",
    title: "How to Compute SSS Pension",
    description: "Complete guide to calculating your SSS retirement pension benefits.",
    category: "guide",
  },
  {
    slug: "/government/sss/sss-contribution-guide",
    title: "SSS Contribution Table",
    description: "Complete 2025 SSS contribution table with employee and employer shares by salary bracket.",
    category: "government",
  },
  {
    slug: "/government/sss/sss-pension-table",
    title: "SSS Pension Table",
    description: "Estimated monthly SSS pension amounts by salary credit and years of contributions.",
    category: "government",
  },
  {
    slug: "/government/bir/withholding-tax-table-philippines",
    title: "Withholding Tax Table",
    description: "Official Philippine withholding tax brackets under the TRAIN Law.",
    category: "government",
  },
  {
    slug: "/government/bsp/bsp-exchange-rate-guide",
    title: "BSP Exchange Rate Guide",
    description: "How the BSP reference exchange rate works and how banks set their rates.",
    category: "government",
  },
  {
    slug: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    title: "Pag-IBIG Housing Loan Guide",
    description: "Pag-IBIG Fund housing loan interest rates, limits, and eligibility requirements.",
    category: "government",
  },
  {
    slug: "/government/philhealth/philhealth-contribution-table-philippines",
    title: "PhilHealth Contribution Table",
    description: "Current PhilHealth premium rate, salary floor, salary ceiling, employee and employer share.",
    category: "government",
  },
  {
    slug: "/calculators/salary/thirteenth-month-pay-calculator-philippines",
    title: "13th Month Pay Calculator",
    description: "Estimate your 13th month pay based on basic salary and months worked.",
    category: "calculator",
  },
];

const LINK_MAP: Record<string, string[]> = {
  "/calculators/loans/car-loan-calculator-philippines": [
    "/calculators/loans/personal-loan-calculator-philippines",
    "/calculators/loans/home-loan-calculator-philippines",
    "/rates/savings-rates/best-savings-interest-rates-philippines",
  ],
  "/calculators/loans/home-loan-calculator-philippines": [
    "/calculators/loans/car-loan-calculator-philippines",
    "/calculators/loans/personal-loan-calculator-philippines",
    "/rates/savings-rates/best-savings-interest-rates-philippines",
  ],
  "/calculators/loans/personal-loan-calculator-philippines": [
    "/calculators/loans/car-loan-calculator-philippines",
    "/calculators/loans/home-loan-calculator-philippines",
    "/calculators/tax/withholding-tax-calculator-philippines",
  ],
  "/calculators/tax/withholding-tax-calculator-philippines": [
    "/guides/tax/how-withholding-tax-works-philippines",
    "/calculators/retirement/sss-pension-calculator",
    "/calculators/loans/personal-loan-calculator-philippines",
  ],
  "/calculators/retirement/sss-pension-calculator": [
    "/guides/sss/how-to-compute-sss-pension",
    "/calculators/tax/withholding-tax-calculator-philippines",
    "/calculators/loans/personal-loan-calculator-philippines",
  ],
  "/rates/exchange-rates/usd-to-php-today": [
    "/rates/savings-rates/best-savings-interest-rates-philippines",
    "/calculators/loans/personal-loan-calculator-philippines",
    "/calculators/tax/withholding-tax-calculator-philippines",
  ],
  "/rates/savings-rates/best-savings-interest-rates-philippines": [
    "/rates/exchange-rates/usd-to-php-today",
    "/calculators/loans/home-loan-calculator-philippines",
    "/calculators/loans/car-loan-calculator-philippines",
  ],
  "/guides/tax/how-withholding-tax-works-philippines": [
    "/calculators/tax/withholding-tax-calculator-philippines",
    "/calculators/retirement/sss-pension-calculator",
    "/guides/sss/how-to-compute-sss-pension",
  ],
  "/guides/sss/how-to-compute-sss-pension": [
    "/calculators/retirement/sss-pension-calculator",
    "/guides/tax/how-withholding-tax-works-philippines",
    "/government/sss/sss-pension-table",
  ],
  "/government/sss/sss-contribution-guide": [
    "/calculators/retirement/sss-pension-calculator",
    "/government/sss/sss-pension-table",
    "/government/bir/withholding-tax-table-philippines",
  ],
  "/government/sss/sss-pension-table": [
    "/calculators/retirement/sss-pension-calculator",
    "/government/sss/sss-contribution-guide",
    "/guides/sss/how-to-compute-sss-pension",
  ],
  "/government/bir/withholding-tax-table-philippines": [
    "/calculators/tax/withholding-tax-calculator-philippines",
    "/guides/tax/how-withholding-tax-works-philippines",
    "/government/sss/sss-contribution-guide",
  ],
  "/government/bsp/bsp-exchange-rate-guide": [
    "/rates/exchange-rates/usd-to-php-today",
    "/rates/savings-rates/best-savings-interest-rates-philippines",
    "/government/bir/withholding-tax-table-philippines",
  ],
  "/government/pag-ibig/pag-ibig-housing-loan-guide": [
    "/calculators/loans/home-loan-calculator-philippines",
    "/government/sss/sss-contribution-guide",
    "/rates/savings-rates/best-savings-interest-rates-philippines",
  ],
  "/government/philhealth/philhealth-contribution-table-philippines": [
    "/calculators/tax/take-home-pay-calculator-philippines",
    "/calculators/sss/sss-contribution-calculator-philippines",
    "/government/sss/sss-contribution-guide",
  ],
  "/calculators/salary/thirteenth-month-pay-calculator-philippines": [
    "/calculators/tax/take-home-pay-calculator-philippines",
    "/calculators/tax/withholding-tax-calculator-philippines",
    "/calculators/sss/sss-contribution-calculator-philippines",
  ],
};

export function getRelatedPages(currentSlug: string): PageLink[] {
  const slugs = LINK_MAP[currentSlug] || [];
  return slugs
    .map((s) => ALL_PAGES.find((p) => p.slug === s))
    .filter(Boolean) as PageLink[];
}
