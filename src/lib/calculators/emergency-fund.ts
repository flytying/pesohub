// ---------------------------------------------------------------------------
// Emergency Fund Calculator — target fund, remaining gap, and progress from
// monthly essential expenses and current savings. Pure, no side effects.
// ---------------------------------------------------------------------------

export interface EmergencyFundResult {
  /** Emergency fund target = monthly expenses × months of coverage. */
  targetAmount: number;
  /** Remaining amount still to save (never negative). */
  gap: number;
  /** Progress toward the target as a percentage, capped at 100. */
  progress: number;
}

/**
 * Compute the emergency-fund target, gap, and progress.
 *
 * @param monthlyTotal Total monthly essential expenses.
 * @param months       Months of coverage to target.
 * @param savings      Current savings already set aside.
 */
export function computeEmergencyFund(
  monthlyTotal: number,
  months: number,
  savings: number,
): EmergencyFundResult {
  const targetAmount = monthlyTotal * months;
  const gap = Math.max(targetAmount - savings, 0);
  const progress = targetAmount > 0 ? Math.min((savings / targetAmount) * 100, 100) : 0;
  return { targetAmount, gap, progress };
}
