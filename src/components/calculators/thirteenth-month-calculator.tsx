"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { CalculatorResult } from "@/components/calculators/calculator-result";
import { ResultPanel } from "@/components/calculators/result-panel";
import {
  calculateThirteenthMonthPay,
  COMPUTATION_TYPE_LABELS,
  type ComputationType,
} from "@/lib/calculators/thirteenth-month";
import { formatPeso } from "@/lib/formatters";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const COMPUTATION_TYPES: ComputationType[] = ["full_year", "prorated"];

export function ThirteenthMonthCalculator() {
  const [monthlyBasicSalary, setMonthlyBasicSalary] = useState(24_000);
  const [monthsWorked, setMonthsWorked] = useState(12);
  const [computationType, setComputationType] =
    useState<ComputationType>("full_year");

  const result = useMemo(() => {
    const months = computationType === "full_year" ? 12 : monthsWorked;
    return calculateThirteenthMonthPay({
      monthlyBasicSalary,
      monthsWorked: months,
      computationType,
    });
  }, [monthlyBasicSalary, monthsWorked, computationType]);

  return (
    <div className="space-y-6">
      <CalculatorShell
        title="13th Month Pay Calculator"
        variant="split"
        resultsSummary={[
          `Monthly Basic Salary: ${formatPeso(monthlyBasicSalary)}`,
          `Months Counted: ${result.monthsWorked}`,
          `Computation Type: ${COMPUTATION_TYPE_LABELS[computationType]}`,
          `Total Basic Salary Earned: ${formatPeso(result.totalBasicSalaryEarned)}`,
          `Estimated 13th Month Pay: ${formatPeso(result.thirteenthMonthPay)}`,
        ].join("\n")}
      >
        {/* LEFT: Result Panel */}
        <ResultPanel className="flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50">
              Estimated 13th Month Pay
            </p>
            <p className="mt-2 text-3xl font-semibold tabular-nums sm:text-4xl animate-count-up">
              {formatPeso(result.thirteenthMonthPay)}
            </p>
            <p className="mt-2 text-sm text-white/50">
              {COMPUTATION_TYPE_LABELS[computationType]} •{" "}
              {result.monthsWorked} month{result.monthsWorked !== 1 ? "s" : ""}{" "}
              counted
            </p>
          </div>

          {/* Visual breakdown */}
          <div className="my-6 space-y-3">
            <p className="text-xs font-medium text-white/60">
              Computation Breakdown
            </p>
            <div className="rounded-lg bg-white/10 p-4 text-sm">
              <div className="flex items-center justify-between text-white/70">
                <span>Monthly Basic Salary</span>
                <span className="font-mono tabular-nums">
                  {formatPeso(monthlyBasicSalary)}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-white/70">
                <span>× Months Worked</span>
                <span className="font-mono tabular-nums">
                  {result.monthsWorked}
                </span>
              </div>
              <div className="my-2 border-t border-white/20" />
              <div className="flex items-center justify-between text-white/70">
                <span>Total Basic Salary Earned</span>
                <span className="font-mono tabular-nums">
                  {formatPeso(result.totalBasicSalaryEarned)}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between text-white/70">
                <span>÷ 12</span>
                <span />
              </div>
              <div className="my-2 border-t border-white/20" />
              <div className="flex items-center justify-between font-medium text-white">
                <span>Estimated 13th Month Pay</span>
                <span className="font-mono tabular-nums">
                  {formatPeso(result.thirteenthMonthPay)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <CalculatorResult
              label="Monthly Basic Salary Used"
              value={formatPeso(monthlyBasicSalary)}
              variant="dark"
            />
            <CalculatorResult
              label="Months Counted"
              value={String(result.monthsWorked)}
              variant="dark"
              highlight
            />
            <CalculatorResult
              label="Computation Type Used"
              value={COMPUTATION_TYPE_LABELS[computationType]}
              variant="dark"
            />
          </div>
        </ResultPanel>

        {/* RIGHT: Inputs */}
        <div className="space-y-6 p-8">
          <CalculatorInput
            label="Monthly Basic Salary"
            value={monthlyBasicSalary}
            onChange={setMonthlyBasicSalary}
            prefix="₱"
            min={0}
            max={500_000}
            step={1_000}
            helpText="Enter your regular basic monthly salary."
          />

          <div className="space-y-2">
            <Label htmlFor="computation-type">Computation Type</Label>
            <select
              id="computation-type"
              value={computationType}
              onChange={(e) =>
                setComputationType(e.target.value as ComputationType)
              }
              className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              {COMPUTATION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {COMPUTATION_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
            <p className="text-xs text-muted-foreground">
              Choose full-year if you worked the whole year. Choose prorated if
              you worked only part of the year.
            </p>
          </div>

          {computationType === "prorated" && (
            <CalculatorInput
              label="Months Worked in the Year"
              value={monthsWorked}
              onChange={(v) => setMonthsWorked(Math.round(v))}
              min={1}
              max={12}
              step={1}
              helpText="Enter the number of months counted for the computation."
            />
          )}

          <Separator />

          {/* Reference info */}
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-xs font-medium text-foreground">
              Computation Reference
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              13th month pay = total basic salary earned during the calendar year
              ÷ 12. Based on PD 851 and its implementing rules.
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            This estimate focuses on basic salary and may not reflect every
            payroll-specific classification.
          </p>
        </div>
      </CalculatorShell>
    </div>
  );
}
