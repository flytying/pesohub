// ---------------------------------------------------------------------------
// Philippine Withholding Tax Calculator – TRAIN Law (effective 2023+)
// Pure TypeScript computation library.
// ---------------------------------------------------------------------------

/**
 * Input parameters for the withholding tax calculation.
 *
 * Provide **either** `annualTaxableIncome` directly, **or** `monthlySalary`
 * (which will be multiplied by 12 to derive the annual figure).  If both are
 * supplied, `annualTaxableIncome` takes precedence.
 */
export interface TaxInput {
  /** Annual taxable income in PHP. Takes precedence over monthlySalary. */
  annualTaxableIncome?: number;
  /** Monthly gross salary in PHP. Used to derive annual income (salary * 12). */
  monthlySalary?: number;
}

/**
 * Result of a withholding tax computation.
 */
export interface TaxResult {
  /** Total annual income tax due. */
  annualTax: number;
  /** Estimated monthly tax (annualTax / 12). */
  monthlyTax: number;
  /** Effective tax rate as a percentage (e.g. 12.34 for 12.34%). */
  effectiveRate: number;
  /** Human-readable description of the applicable tax bracket. */
  bracket: string;
  /** Annual take-home pay after tax. */
  takeHomePay: number;
  /** Monthly take-home pay after tax. */
  monthlyTakeHome: number;
}

// ---------------------------------------------------------------------------
// TRAIN Law tax brackets (2023 onwards)
// ---------------------------------------------------------------------------

interface TaxBracket {
  /** Lower bound of the bracket (inclusive). */
  floor: number;
  /** Upper bound of the bracket (inclusive). Infinity for the top bracket. */
  ceiling: number;
  /** Fixed tax amount for income up to the floor. */
  baseTax: number;
  /** Marginal rate applied to income exceeding the floor (as a decimal). */
  rate: number;
  /** Human-readable label. */
  label: string;
}

const TAX_BRACKETS: TaxBracket[] = [
  {
    floor: 0,
    ceiling: 250_000,
    baseTax: 0,
    rate: 0,
    label: "0% (up to PHP 250,000)",
  },
  {
    floor: 250_000,
    ceiling: 400_000,
    baseTax: 0,
    rate: 0.15,
    label: "15% of excess over PHP 250,000",
  },
  {
    floor: 400_000,
    ceiling: 800_000,
    baseTax: 22_500,
    rate: 0.2,
    label: "PHP 22,500 + 20% of excess over PHP 400,000",
  },
  {
    floor: 800_000,
    ceiling: 2_000_000,
    baseTax: 102_500,
    rate: 0.25,
    label: "PHP 102,500 + 25% of excess over PHP 800,000",
  },
  {
    floor: 2_000_000,
    ceiling: 8_000_000,
    baseTax: 402_500,
    rate: 0.3,
    label: "PHP 402,500 + 30% of excess over PHP 2,000,000",
  },
  {
    floor: 8_000_000,
    ceiling: Infinity,
    baseTax: 2_202_500,
    rate: 0.35,
    label: "PHP 2,202,500 + 35% of excess over PHP 8,000,000",
  },
];

// ---------------------------------------------------------------------------
// Main computation
// ---------------------------------------------------------------------------

/**
 * Calculate the Philippine withholding tax under the TRAIN Law (2023+).
 *
 * This function is pure -- it has no side effects.
 *
 * @throws {Error} if neither annualTaxableIncome nor monthlySalary is provided.
 */
export function calculateWithholdingTax(input: TaxInput): TaxResult {
  const annualIncome = resolveAnnualIncome(input);

  const bracket = findBracket(annualIncome);

  const excess = Math.max(annualIncome - bracket.floor, 0);
  const annualTax = round(bracket.baseTax + excess * bracket.rate);

  const monthlyTax = round(annualTax / 12);
  const effectiveRate =
    annualIncome > 0 ? round((annualTax / annualIncome) * 100) : 0;

  const takeHomePay = round(annualIncome - annualTax);
  const monthlyTakeHome = round(takeHomePay / 12);

  return {
    annualTax,
    monthlyTax,
    effectiveRate,
    bracket: bracket.label,
    takeHomePay,
    monthlyTakeHome,
  };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Resolve the annual taxable income from the input.
 */
function resolveAnnualIncome(input: TaxInput): number {
  if (input.annualTaxableIncome !== undefined) {
    return input.annualTaxableIncome;
  }

  if (input.monthlySalary !== undefined) {
    return input.monthlySalary * 12;
  }

  throw new Error(
    "Either annualTaxableIncome or monthlySalary must be provided.",
  );
}

/**
 * Find the applicable tax bracket for a given annual income.
 */
function findBracket(annualIncome: number): TaxBracket {
  for (let i = TAX_BRACKETS.length - 1; i >= 0; i--) {
    if (annualIncome > TAX_BRACKETS[i].floor) {
      return TAX_BRACKETS[i];
    }
  }

  // Income is zero or negative -- falls into the first (0%) bracket.
  return TAX_BRACKETS[0];
}

/**
 * Round a number to two decimal places.
 */
function round(value: number): number {
  return Math.round(value * 100) / 100;
}
