"use client";

import { useCallback, useMemo, useState } from "react";

/**
 * Generic calculator state management hook.
 *
 * Manages a set of numeric input fields and recomputes the result
 * whenever any field changes via the provided `computeFn`.
 */
export function useCalculator<
  TInput extends Record<string, number>,
  TResult,
>(
  defaults: TInput,
  computeFn: (input: TInput) => TResult
): {
  inputs: TInput;
  setField: <K extends keyof TInput>(field: K, value: TInput[K]) => void;
  result: TResult;
  reset: () => void;
} {
  const [inputs, setInputs] = useState<TInput>(defaults);

  const setField = useCallback(
    <K extends keyof TInput>(field: K, value: TInput[K]) => {
      setInputs((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const reset = useCallback(() => {
    setInputs(defaults);
  }, [defaults]);

  const result = useMemo(() => computeFn(inputs), [inputs, computeFn]);

  return { inputs, setField, result, reset };
}
