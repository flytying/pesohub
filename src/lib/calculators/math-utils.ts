// ---------------------------------------------------------------------------
// Shared helpers for the pure calculator libraries.
// ---------------------------------------------------------------------------

/** Round a number to two decimal places (standard currency rounding). */
export function round(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Returned by a calculator when its input is invalid (negative, zero, or NaN
 * where a positive value is required). Callers narrow on the `error` key:
 *
 *   const r = calculateLoan(input);
 *   if ("error" in r) return <ErrorCard message={r.error} />;
 */
export interface CalcError {
  error: string;
}
