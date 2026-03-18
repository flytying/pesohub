import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";

/* ── Updated-at imports ─────────────────────────────────────── */
import { USD_PHP_UPDATED_AT } from "@/data/rates/exchange-rates";
import { SAVINGS_RATES_UPDATED_AT } from "@/data/rates/savings-rates";
import { TIME_DEPOSIT_RATES_UPDATED_AT } from "@/data/rates/time-deposit-rates";
import { DIGITAL_BANK_RATES_UPDATED_AT } from "@/data/rates/digital-bank-rates";
import { SSS_CONTRIBUTION_UPDATED_AT } from "@/data/government/sss-contribution";
import { SSS_PENSION_TABLE_UPDATED_AT } from "@/data/government/sss-pension-table";
import { WITHHOLDING_TAX_TABLE_UPDATED_AT } from "@/data/government/withholding-tax-table";
import { PAGIBIG_CONTRIBUTION_UPDATED_AT } from "@/data/government/pag-ibig-contribution";
import { PAGIBIG_HOUSING_LOAN_UPDATED_AT } from "@/data/government/pag-ibig-housing-loan";
import { PHILHEALTH_UPDATED_AT } from "@/data/government/philhealth";
import { BSP_EXCHANGE_RATE_UPDATED_AT } from "@/data/government/bsp-exchange-rate";
import { WITHHOLDING_TAX_UPDATED_AT } from "@/data/guides/withholding-tax-guide";
import { SSS_PENSION_UPDATED_AT } from "@/data/guides/sss-pension-guide";
import { TAKE_HOME_PAY_GUIDE_UPDATED_AT } from "@/data/guides/take-home-pay-guide";
import { PHILHEALTH_GUIDE_UPDATED_AT } from "@/data/guides/philhealth-guide";
import { PAGIBIG_GUIDE_UPDATED_AT } from "@/data/guides/pag-ibig-guide";

export const dynamic = "force-static";

/** Convert ISO date string to Date object */
function toDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    /* ── Homepage ──────────────────────────────────────────── */
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },

    /* ── Hub pages ─────────────────────────────────────────── */
    {
      url: `${SITE_URL}/calculators`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/rates`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/government`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    /* ── Calculators — Loans ───────────────────────────────── */
    {
      url: `${SITE_URL}/calculators/loans/car-loan-calculator-philippines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/calculators/loans/home-loan-calculator-philippines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/calculators/loans/personal-loan-calculator-philippines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    /* ── Calculators — Tax & Salary ────────────────────────── */
    {
      url: `${SITE_URL}/calculators/tax/withholding-tax-calculator-philippines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/calculators/tax/take-home-pay-calculator-philippines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/calculators/salary/thirteenth-month-pay-calculator-philippines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    /* ── Calculators — SSS & Retirement ────────────────────── */
    {
      url: `${SITE_URL}/calculators/sss/sss-contribution-calculator-philippines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/calculators/retirement/sss-pension-calculator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    /* ── Calculators — Savings ─────────────────────────────── */
    {
      url: `${SITE_URL}/calculators/savings/time-deposit-calculator-philippines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/calculators/savings/emergency-fund-calculator-philippines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/calculators/savings/savings-goal-calculator-philippines`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },

    /* ── Rates — Exchange ──────────────────────────────────── */
    {
      url: `${SITE_URL}/rates/exchange-rates/usd-to-php-today`,
      lastModified: toDate(USD_PHP_UPDATED_AT),
      changeFrequency: "daily",
      priority: 0.9,
    },

    /* ── Rates — Savings & Deposits ────────────────────────── */
    {
      url: `${SITE_URL}/rates/savings-rates/best-savings-interest-rates-philippines`,
      lastModified: toDate(SAVINGS_RATES_UPDATED_AT),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/rates/savings-rates/time-deposit-rates-philippines`,
      lastModified: toDate(TIME_DEPOSIT_RATES_UPDATED_AT),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/rates/savings-rates/best-digital-bank-rates-philippines`,
      lastModified: toDate(DIGITAL_BANK_RATES_UPDATED_AT),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    /* ── Guides — Tax & Salary ─────────────────────────────── */
    {
      url: `${SITE_URL}/guides/tax/how-withholding-tax-works-philippines`,
      lastModified: toDate(WITHHOLDING_TAX_UPDATED_AT),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/tax/take-home-pay-guide-philippines`,
      lastModified: toDate(TAKE_HOME_PAY_GUIDE_UPDATED_AT),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    /* ── Guides — Government Programs ──────────────────────── */
    {
      url: `${SITE_URL}/guides/sss/how-to-compute-sss-pension`,
      lastModified: toDate(SSS_PENSION_UPDATED_AT),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/government/philhealth-contribution-guide`,
      lastModified: toDate(PHILHEALTH_GUIDE_UPDATED_AT),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/guides/government/pag-ibig-deduction-guide`,
      lastModified: toDate(PAGIBIG_GUIDE_UPDATED_AT),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    /* ── Government — SSS ──────────────────────────────────── */
    {
      url: `${SITE_URL}/government/sss/sss-contribution-guide`,
      lastModified: toDate(SSS_CONTRIBUTION_UPDATED_AT),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/government/sss/sss-pension-table`,
      lastModified: toDate(SSS_PENSION_TABLE_UPDATED_AT),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    /* ── Government — BIR ──────────────────────────────────── */
    {
      url: `${SITE_URL}/government/bir/withholding-tax-table-philippines`,
      lastModified: toDate(WITHHOLDING_TAX_TABLE_UPDATED_AT),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    /* ── Government — PhilHealth ───────────────────────────── */
    {
      url: `${SITE_URL}/government/philhealth/philhealth-contribution-table-philippines`,
      lastModified: toDate(PHILHEALTH_UPDATED_AT),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    /* ── Government — Pag-IBIG ─────────────────────────────── */
    {
      url: `${SITE_URL}/government/pag-ibig/pag-ibig-contribution-table-philippines`,
      lastModified: toDate(PAGIBIG_CONTRIBUTION_UPDATED_AT),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/government/pag-ibig/pag-ibig-housing-loan-guide`,
      lastModified: toDate(PAGIBIG_HOUSING_LOAN_UPDATED_AT),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    /* ── Government — BSP ──────────────────────────────────── */
    {
      url: `${SITE_URL}/government/bsp/bsp-exchange-rate-guide`,
      lastModified: toDate(BSP_EXCHANGE_RATE_UPDATED_AT),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
