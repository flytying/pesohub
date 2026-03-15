/**
 * Content Freshness Registry
 *
 * Central configuration tracking every YMYL page's review cadence,
 * data source, last-verified date, and staleness threshold.
 *
 * Used by:
 *  - <SourceCitation> component (renders source box on pages)
 *  - scripts/check-content-freshness.mjs (cron-based staleness checker)
 */

export interface ContentEntry {
  /** Page slug (matches route path without leading slash) */
  slug: string;
  /** Human-readable page title */
  title: string;
  /** The data file that feeds this page */
  dataFile: string;
  /** Name of the UPDATED_AT export in the data file */
  updatedAtExport: string;
  /** Authoritative source name */
  source: string;
  /** URL to the authoritative source for verification */
  sourceUrl: string;
  /** How often (in days) this page should be reviewed */
  reviewCadenceDays: number;
  /** What category of content */
  category: "rates" | "government" | "guide" | "calculator";
  /** Staleness risk level */
  staleness: "high" | "medium" | "low";
  /** What to check during review */
  reviewChecklist: string[];
}

export const contentRegistry: ContentEntry[] = [
  // ── Rates (high staleness — data changes frequently) ──────────
  {
    slug: "rates/exchange-rates/usd-to-php-today",
    title: "USD to PHP Exchange Rate",
    dataFile: "src/data/rates/exchange-rates.ts",
    updatedAtExport: "USD_PHP_UPDATED_AT",
    source: "Bangko Sentral ng Pilipinas (BSP)",
    sourceUrl: "https://www.bsp.gov.ph/SitePages/Statistics/ExchangeRate.aspx",
    reviewCadenceDays: 1,
    category: "rates",
    staleness: "high",
    reviewChecklist: [
      "Verify currentRate matches BSP published rate",
      "Confirm historicalRates has latest 7 business days",
      "Check if BSP changed rate publication format",
    ],
  },
  {
    slug: "rates/savings-rates/best-savings-interest-rates-philippines",
    title: "Best Savings Interest Rates Philippines",
    dataFile: "src/data/rates/savings-rates.ts",
    updatedAtExport: "SAVINGS_RATES_UPDATED_AT",
    source: "Individual bank websites",
    sourceUrl: "https://www.bsp.gov.ph/SitePages/FinancialStability/DirBanksFIs.aspx",
    reviewCadenceDays: 14,
    category: "rates",
    staleness: "high",
    reviewChecklist: [
      "Check Maya, Tonik, GoTyme, SeaBank, CIMB for rate changes",
      "Verify promo rates haven't expired",
      "Check for new digital banks offering competitive rates",
      "Confirm PDIC coverage amount is current (PHP 1M as of Mar 2025)",
      "Verify minimum balance requirements haven't changed",
    ],
  },

  // ── Government (medium staleness — policy-driven changes) ─────
  {
    slug: "government/bir/withholding-tax-table-philippines",
    title: "Withholding Tax Table Philippines",
    dataFile: "src/data/government/withholding-tax-table.ts",
    updatedAtExport: "WITHHOLDING_TAX_TABLE_UPDATED_AT",
    source: "Bureau of Internal Revenue (BIR) — TRAIN Law (RA 10963)",
    sourceUrl: "https://www.bir.gov.ph/tax-information/tax-rates",
    reviewCadenceDays: 90,
    category: "government",
    staleness: "low",
    reviewChecklist: [
      "Check if new tax reform law has been signed",
      "Verify TRAIN Law brackets still effective",
      "Confirm tax exemption threshold unchanged",
    ],
  },
  {
    slug: "government/sss/sss-pension-table",
    title: "SSS Pension Table",
    dataFile: "src/data/government/sss-pension-table.ts",
    updatedAtExport: "SSS_PENSION_TABLE_UPDATED_AT",
    source: "Social Security System (SSS)",
    sourceUrl: "https://www.sss.gov.ph/sss/appmanager/pages.jsp?page=retirementbenefits",
    reviewCadenceDays: 90,
    category: "government",
    staleness: "medium",
    reviewChecklist: [
      "Check for SSS pension formula changes",
      "Verify MSC ceiling hasn't changed",
      "Confirm minimum pension amounts are current",
      "Check if new SSS circular affects computation",
    ],
  },
  {
    slug: "government/sss/sss-contribution-guide",
    title: "SSS Contribution Guide",
    dataFile: "src/data/government/sss-contribution.ts",
    updatedAtExport: "SSS_CONTRIBUTION_UPDATED_AT",
    source: "Social Security System (SSS)",
    sourceUrl: "https://www.sss.gov.ph/sss/appmanager/pages.jsp?page=scheduleofcontribution",
    reviewCadenceDays: 90,
    category: "government",
    staleness: "medium",
    reviewChecklist: [
      "Check if SSS contribution rate has increased",
      "Verify MSC ranges and brackets",
      "Confirm payment methods are current",
      "Check for new employer/employee share splits",
    ],
  },
  {
    slug: "government/bsp/bsp-exchange-rate-guide",
    title: "BSP Exchange Rate Guide",
    dataFile: "src/data/government/bsp-exchange-rate.ts",
    updatedAtExport: "BSP_EXCHANGE_RATE_UPDATED_AT",
    source: "Bangko Sentral ng Pilipinas (BSP)",
    sourceUrl: "https://www.bsp.gov.ph/SitePages/Statistics/ExchangeRate.aspx",
    reviewCadenceDays: 90,
    category: "government",
    staleness: "low",
    reviewChecklist: [
      "Verify BSP reference rate methodology unchanged",
      "Check if new forex regulations have been issued",
      "Confirm bank spread examples are still realistic",
    ],
  },
  {
    slug: "government/pag-ibig/pag-ibig-housing-loan-guide",
    title: "Pag-IBIG Housing Loan Guide",
    dataFile: "src/data/government/pag-ibig-housing-loan.ts",
    updatedAtExport: "PAGIBIG_HOUSING_LOAN_UPDATED_AT",
    source: "Pag-IBIG Fund (HDMF)",
    sourceUrl: "https://www.pagibigfund.gov.ph/HousingLoan.html",
    reviewCadenceDays: 60,
    category: "government",
    staleness: "medium",
    reviewChecklist: [
      "Verify housing loan interest rates haven't changed",
      "Check loan amount limits and contribution year requirements",
      "Confirm eligibility criteria are current",
      "Check for new Pag-IBIG circulars on housing loans",
    ],
  },

  // ── Guides (low staleness — educational, law-dependent) ───────
  {
    slug: "guides/tax/how-withholding-tax-works-philippines",
    title: "How Withholding Tax Works (Philippines)",
    dataFile: "src/data/guides/withholding-tax-guide.ts",
    updatedAtExport: "WITHHOLDING_TAX_UPDATED_AT",
    source: "Bureau of Internal Revenue (BIR) — TRAIN Law (RA 10963)",
    sourceUrl: "https://www.bir.gov.ph/tax-information/tax-rates",
    reviewCadenceDays: 90,
    category: "guide",
    staleness: "low",
    reviewChecklist: [
      "Check if TRAIN Law brackets still effective",
      "Verify worked examples are correct",
      "Confirm no new tax reform law has been enacted",
    ],
  },
  {
    slug: "guides/sss/how-to-compute-sss-pension",
    title: "How to Compute SSS Pension",
    dataFile: "src/data/guides/sss-pension-guide.ts",
    updatedAtExport: "SSS_PENSION_UPDATED_AT",
    source: "Social Security System (SSS)",
    sourceUrl: "https://www.sss.gov.ph/sss/appmanager/pages.jsp?page=retirementbenefits",
    reviewCadenceDays: 90,
    category: "guide",
    staleness: "low",
    reviewChecklist: [
      "Verify pension formulas A and B are unchanged",
      "Confirm minimum pension amounts",
      "Check worked examples against current SSS rules",
    ],
  },
];
