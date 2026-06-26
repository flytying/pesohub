// ---------------------------------------------------------------------------
// Philippine Withholding Tax Calculator — detailed, deduction-aware.
// Supports pay frequency, taxable/tax-exempt allowances, and either an
// automatic estimate of SSS/PhilHealth/Pag-IBIG or manually entered amounts.
// Pure TypeScript computation library (no side effects).
// ---------------------------------------------------------------------------

import { calculateWithholdingTax } from "@/lib/calculators/tax";
import {
  lookupSSSEmployeeShare,
  calculatePhilHealthEmployee,
  calculatePagIBIGEmployee,
} from "@/lib/calculators/take-home-pay";

export type PayFrequency = "daily" | "weekly" | "semi-monthly" | "monthly";

/** Pay periods per year for each supported frequency. */
export const PERIODS_PER_YEAR: Record<PayFrequency, number> = {
  daily: 260,
  weekly: 52,
  "semi-monthly": 24,
  monthly: 12,
};

export const PAY_FREQUENCY_LABELS: Record<PayFrequency, string> = {
  daily: "Daily",
  weekly: "Weekly",
  "semi-monthly": "Semi-Monthly",
  monthly: "Monthly",
};

export interface WithholdingTaxDetailedInput {
  /** Gross compensation for one pay period (in the chosen frequency). */
  periodGross: number;
  /** Pay frequency. */
  frequency: PayFrequency;
  /** Taxable allowances for one pay period (added to taxable compensation). */
  taxableAllowances?: number;
  /** Tax-exempt allowances/de minimis for one pay period (excluded from tax). */
  taxExemptAllowances?: number;
  /**
   * When true, SSS, PhilHealth, and Pag-IBIG employee shares are estimated
   * automatically from the monthly-equivalent salary. When false, the manual
   * values below are used.
   */
  autoEstimateContributions: boolean;
  /** Manual SSS employee share for one pay period (used when auto is false). */
  sss?: number;
  /** Manual PhilHealth employee share for one pay period (used when auto is false). */
  philhealth?: number;
  /** Manual Pag-IBIG employee share for one pay period (used when auto is false). */
  pagibig?: number;
}

export interface WithholdingTaxDetailedResult {
  frequency: PayFrequency;
  /** Mandatory contribution employee shares for one pay period. */
  contributions: {
    sss: number;
    philhealth: number;
    pagibig: number;
    total: number;
  };
  /** Taxable compensation for one pay period (after contributions + exempt). */
  periodTaxable: number;
  /** Withholding tax for one pay period. */
  periodTax: number;
  /** Net pay for one pay period (gross + taxable allow + exempt allow − contribs − tax). */
  periodNet: number;
  /** Monthly-equivalent withholding tax. */
  monthlyTax: number;
  /** Annual withholding tax. */
  annualTax: number;
  /** Annual taxable income. */
  annualTaxable: number;
  /** Effective tax rate on taxable income, as a percentage. */
  effectiveRate: number;
  /** Human-readable applicable annual bracket. */
  bracket: string;
}

/**
 * Compute deduction-aware withholding tax for any pay frequency.
 *
 * Contributions are monthly concepts, so all per-period money is converted to a
 * monthly-equivalent for the contribution lookup and tax base, then the annual
 * tax is split back across the chosen number of pay periods. This mirrors how
 * the BIR's per-period withholding tables are derived (annual ÷ periods).
 */
export function calculateWithholdingTaxDetailed(
  input: WithholdingTaxDetailedInput,
): WithholdingTaxDetailedResult {
  const {
    periodGross,
    frequency,
    taxableAllowances = 0,
    taxExemptAllowances = 0,
    autoEstimateContributions,
  } = input;

  const periods = PERIODS_PER_YEAR[frequency];
  const toMonthly = periods / 12; // period amount × this = monthly-equivalent
  const monthlyGross = periodGross * toMonthly;

  // Mandatory contributions (monthly), then prorate back to the pay period.
  let sssMonthly: number;
  let philhealthMonthly: number;
  let pagibigMonthly: number;

  if (autoEstimateContributions) {
    sssMonthly = lookupSSSEmployeeShare(monthlyGross);
    philhealthMonthly = calculatePhilHealthEmployee(monthlyGross);
    pagibigMonthly = calculatePagIBIGEmployee(monthlyGross);
  } else {
    // Manual amounts are entered per pay period → convert to monthly.
    sssMonthly = (input.sss ?? 0) * toMonthly;
    philhealthMonthly = (input.philhealth ?? 0) * toMonthly;
    pagibigMonthly = (input.pagibig ?? 0) * toMonthly;
  }

  const monthlyTaxableAllow = taxableAllowances * toMonthly;
  const monthlyExemptAllow = taxExemptAllowances * toMonthly;

  // Monthly taxable compensation: gross + taxable allowances, less mandatory
  // contributions and tax-exempt allowances. Floored at zero.
  const monthlyContribs = sssMonthly + philhealthMonthly + pagibigMonthly;
  const monthlyTaxable = Math.max(
    monthlyGross + monthlyTaxableAllow - monthlyExemptAllow - monthlyContribs,
    0,
  );

  const annualTaxable = round(monthlyTaxable * 12);
  const tax = calculateWithholdingTax({ annualTaxableIncome: annualTaxable });

  const annualTax = tax.annualTax;
  const monthlyTax = round(annualTax / 12);
  const periodTax = round(annualTax / periods);

  // Per-period figures.
  const sss = round(sssMonthly / toMonthly);
  const philhealth = round(philhealthMonthly / toMonthly);
  const pagibig = round(pagibigMonthly / toMonthly);
  const contribTotal = round(sss + philhealth + pagibig);
  const periodTaxable = round(monthlyTaxable / toMonthly);

  const periodNet = round(
    periodGross +
      taxableAllowances +
      taxExemptAllowances -
      contribTotal -
      periodTax,
  );

  return {
    frequency,
    contributions: { sss, philhealth, pagibig, total: contribTotal },
    periodTaxable,
    periodTax,
    periodNet,
    monthlyTax,
    annualTax,
    annualTaxable,
    effectiveRate: tax.effectiveRate,
    bracket: tax.bracket,
  };
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}
