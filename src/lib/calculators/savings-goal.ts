// ---------------------------------------------------------------------------
// Savings Goal Calculator — monthly contribution needed to reach a target,
// accounting for a starting balance and compound interest. Pure, no side effects.
// ---------------------------------------------------------------------------

export interface SavingsGoalResult {
  /** Monthly contribution needed to reach the goal. */
  monthly: number;
  /** Sum of all monthly contributions over the timeline. */
  totalContributions: number;
  /** Estimated interest earned over the timeline. */
  interestEarned: number;
}

/**
 * Compute the monthly savings needed to reach `targetAmount` in `months`,
 * starting from `startingBalance`, at `annualRate` percent compounded monthly.
 *
 * Uses the future-value-of-annuity formula. When the rate is zero the required
 * contribution is simply the remaining amount spread evenly across the months.
 */
export function calculateMonthlySavings(
  targetAmount: number,
  startingBalance: number,
  months: number,
  annualRate: number,
): SavingsGoalResult {
  const remaining = targetAmount - startingBalance;
  if (remaining <= 0) return { monthly: 0, totalContributions: 0, interestEarned: 0 };
  if (months <= 0)
    return { monthly: remaining, totalContributions: remaining, interestEarned: 0 };

  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) {
    const monthly = remaining / months;
    return { monthly, totalContributions: monthly * months, interestEarned: 0 };
  }

  const fvStarting = startingBalance * Math.pow(1 + monthlyRate, months);
  const amountNeeded = targetAmount - fvStarting;
  if (amountNeeded <= 0) {
    return { monthly: 0, totalContributions: 0, interestEarned: fvStarting - startingBalance };
  }

  const monthly = amountNeeded * (monthlyRate / (Math.pow(1 + monthlyRate, months) - 1));
  const totalContributions = monthly * months;
  const interestEarned = targetAmount - startingBalance - totalContributions;
  return {
    monthly: Math.max(monthly, 0),
    totalContributions: Math.max(totalContributions, 0),
    interestEarned: Math.max(interestEarned, 0),
  };
}
