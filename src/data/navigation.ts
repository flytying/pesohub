export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavItems: NavItem[] = [
  {
    label: "Calculators",
    href: "/calculators",
    children: [
      { label: "Car Loan Calculator", href: "/calculators/loans/car-loan-calculator-philippines" },
      { label: "Home Loan Calculator", href: "/calculators/loans/home-loan-calculator-philippines" },
      { label: "Personal Loan Calculator", href: "/calculators/loans/personal-loan-calculator-philippines" },
      { label: "Withholding Tax Calculator", href: "/calculators/tax/withholding-tax-calculator-philippines" },
      { label: "SSS Contribution Calculator", href: "/calculators/sss/sss-contribution-calculator-philippines" },
      { label: "SSS Pension Calculator", href: "/calculators/retirement/sss-pension-calculator" },
      { label: "Take-Home Pay Calculator", href: "/calculators/tax/take-home-pay-calculator-philippines" },
      { label: "Emergency Fund Calculator", href: "/calculators/savings/emergency-fund-calculator-philippines" },
      { label: "Time Deposit Calculator", href: "/calculators/savings/time-deposit-calculator-philippines" },
      { label: "Savings Goal Calculator", href: "/calculators/savings/savings-goal-calculator-philippines" },
      { label: "13th Month Pay Calculator", href: "/calculators/salary/thirteenth-month-pay-calculator-philippines" },
    ],
  },
  {
    label: "Rates",
    href: "/rates",
    children: [
      { label: "USD to PHP Today", href: "/rates/exchange-rates/usd-to-php-today" },
      { label: "Best Savings Rates", href: "/rates/savings-rates/best-savings-interest-rates-philippines" },
    ],
  },
  {
    label: "Guides",
    href: "/guides",
    children: [
      { label: "How Withholding Tax Works", href: "/guides/tax/how-withholding-tax-works-philippines" },
      { label: "Take-Home Pay Guide", href: "/guides/tax/take-home-pay-guide-philippines" },
      { label: "PhilHealth Contribution Guide", href: "/guides/government/philhealth-contribution-guide" },
      { label: "Pag-IBIG Deduction Guide", href: "/guides/government/pag-ibig-deduction-guide" },
      { label: "How to Compute SSS Pension", href: "/guides/sss/how-to-compute-sss-pension" },
    ],
  },
  {
    label: "Government",
    href: "/government",
    children: [
      { label: "SSS Contribution Table", href: "/government/sss/sss-contribution-guide" },
      { label: "SSS Pension Table", href: "/government/sss/sss-pension-table" },
      { label: "Withholding Tax Table", href: "/government/bir/withholding-tax-table-philippines" },
      { label: "BSP Exchange Rate Guide", href: "/government/bsp/bsp-exchange-rate-guide" },
      { label: "Pag-IBIG Contribution Table", href: "/government/pag-ibig/pag-ibig-contribution-table-philippines" },
      { label: "Pag-IBIG Housing Loan", href: "/government/pag-ibig/pag-ibig-housing-loan-guide" },
      { label: "PhilHealth Contribution Table", href: "/government/philhealth/philhealth-contribution-table-philippines" },
    ],
  },
];

export const footerNavItems = {
  tools: [
    { label: "Calculators", href: "/calculators" },
    { label: "Rates", href: "/rates" },
    { label: "Guides", href: "/guides" },
    { label: "Government", href: "/government" },
  ],
  calculators: [
    { label: "Car Loan", href: "/calculators/loans/car-loan-calculator-philippines" },
    { label: "Home Loan", href: "/calculators/loans/home-loan-calculator-philippines" },
    { label: "Personal Loan", href: "/calculators/loans/personal-loan-calculator-philippines" },
    { label: "Withholding Tax", href: "/calculators/tax/withholding-tax-calculator-philippines" },
    { label: "SSS Contribution", href: "/calculators/sss/sss-contribution-calculator-philippines" },
    { label: "SSS Pension", href: "/calculators/retirement/sss-pension-calculator" },
    { label: "Take-Home Pay", href: "/calculators/tax/take-home-pay-calculator-philippines" },
    { label: "Savings Goal", href: "/calculators/savings/savings-goal-calculator-philippines" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};
