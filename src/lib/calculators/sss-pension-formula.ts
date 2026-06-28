// ---------------------------------------------------------------------------
// SSS retirement pension — three statutory formulas, highest wins, plus the
// ₱1,000 across-the-board increase (RA 11199). Pure TypeScript, no side effects.
// ---------------------------------------------------------------------------

export interface SSSPensionResult {
  /** Formula 1: ₱300 + 20% of AMSC + 2% of AMSC per credited year over 10. */
  f1: number;
  /** Formula 2: 40% of AMSC. */
  f2: number;
  /** Formula 3: statutory minimum (₱1,200 for 10–19 CYS, ₱2,400 for 20+). */
  f3: number;
  /** Highest of the three formulas (governing base). */
  base: number;
  /** Index of the governing formula: 0 = f1, 1 = f2, 2 = f3. */
  governs: 0 | 1 | 2;
  /** Final monthly pension: base + ₱1,000 across-the-board increase. */
  pension: number;
}

/** Across-the-board monthly pension increase added on top of the formula. */
export const PENSION_INCREASE = 1_000;

export function computeSSSPension(amsc: number, cys: number): SSSPensionResult {
  const f1 = 300 + 0.2 * amsc + 0.02 * amsc * Math.max(cys - 10, 0);
  const f2 = 0.4 * amsc;
  const f3 = cys >= 20 ? 2_400 : cys >= 10 ? 1_200 : 0;
  const base = Math.max(f1, f2, f3);
  const governs: 0 | 1 | 2 = base === f1 ? 0 : base === f2 ? 1 : 2;
  const pension = base + PENSION_INCREASE;
  return { f1, f2, f3, base, governs, pension };
}
