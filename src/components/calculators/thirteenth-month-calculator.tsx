"use client";

import { useState, useMemo } from "react";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { ResultActions } from "@/components/calculators/result-actions";
import {
  GradientResult,
  BreakdownCard,
  BreakdownRow,
} from "@/components/calculators/gradient-result";
import {
  calculateThirteenthMonthPay,
  COMPUTATION_TYPE_LABELS,
  type ComputationType,
} from "@/lib/calculators/thirteenth-month";
import { formatPeso } from "@/lib/formatters";
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

  const resultsSummary = [
    `Monthly Basic Salary: ${formatPeso(monthlyBasicSalary)}`,
    `Months Counted: ${result.monthsWorked}`,
    `Computation Type: ${COMPUTATION_TYPE_LABELS[computationType]}`,
    `Total Basic Salary Earned: ${formatPeso(result.totalBasicSalaryEarned)}`,
    `Estimated 13th Month Pay: ${formatPeso(result.thirteenthMonthPay)}`,
  ].join("\n");

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Inputs */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,28px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-[18px] font-semibold text-[#0E1525]">
            Pay details
          </h2>
          <button
            type="button"
            onClick={() => {
              setMonthlyBasicSalary(24_000);
              setMonthsWorked(12);
              setComputationType("full_year");
            }}
            className="text-[14px] font-bold text-brand transition-colors hover:text-brand-light"
          >
            Reset
          </button>
        </div>
        <div className="space-y-6">
          <CalculatorInput
            label="Monthly basic salary"
            value={monthlyBasicSalary}
            onChange={setMonthlyBasicSalary}
            prefix="₱"
            min={0}
            max={500_000}
            step={1_000}
            helpText="Your regular basic monthly salary."
            tooltip="Excludes overtime, commissions, allowances, and other supplementary income."
          />
          <div className="space-y-2">
            <Label htmlFor="computation-type" className="text-[15px] font-semibold text-[#344054]">
              Computation type
            </Label>
            <select
              id="computation-type"
              value={computationType}
              onChange={(e) => setComputationType(e.target.value as ComputationType)}
              className="flex h-11 w-full rounded-[12px] border border-[#D6DEEC] bg-white px-3 text-[15px] text-[#0E1525] focus-visible:border-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/15"
            >
              {COMPUTATION_TYPES.map((type) => (
                <option key={type} value={type}>
                  {COMPUTATION_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
            <p className="text-[14px] text-[#6B7488]">
              Full-year if you worked the whole year; prorated if only part.
            </p>
          </div>
          {computationType === "prorated" && (
            <CalculatorInput
              label="Months worked in the year"
              value={monthsWorked}
              onChange={(v) => setMonthsWorked(Math.round(v))}
              min={1}
              max={12}
              step={1}
              helpText="Number of months counted for the computation."
              tooltip="Months actually worked during the calendar year."
            />
          )}
          <div className="rounded-[14px] border border-[#E7EBF3] bg-[#F7F9FD] p-4">
            <p className="text-[14px] font-bold text-[#0E1525]">
              Computation reference
            </p>
            <p className="mt-1 text-[14px] leading-[1.5] text-[#6B7488]">
              13th month pay = total basic salary earned during the calendar year
              ÷ 12. Based on PD 851 and its implementing rules.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: Gradient result */}
      <GradientResult
        label="Estimated 13th month pay"
        actions={
          <ResultActions
            calculatorType="13th Month Pay Calculator"
            resultsSummary={resultsSummary}
          />
        }
        eyebrow="Estimated"
        figure={formatPeso(result.thirteenthMonthPay)}
        sub={`${COMPUTATION_TYPE_LABELS[computationType]} · ${result.monthsWorked} month${result.monthsWorked !== 1 ? "s" : ""} counted`}
      >
        <BreakdownCard
          title="Computation breakdown"
          note="Focuses on basic salary and may not reflect every payroll-specific classification."
        >
          <BreakdownRow
            label="Monthly basic salary"
            value={formatPeso(monthlyBasicSalary)}
          />
          <BreakdownRow
            label="× Months worked"
            value={String(result.monthsWorked)}
          />
          <BreakdownRow
            label="Total basic salary earned"
            value={formatPeso(result.totalBasicSalaryEarned)}
          />
          <BreakdownRow label="÷ 12" value="—" />
          <BreakdownRow
            label="Estimated 13th month pay"
            value={formatPeso(result.thirteenthMonthPay)}
            tone="total"
            strong
          />
        </BreakdownCard>
      </GradientResult>
    </div>
  );
}
