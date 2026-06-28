"use client";

import { useState, useMemo } from "react";
import { Info } from "lucide-react";
import { ResultActions } from "@/components/calculators/result-actions";
import { MoneyField, SelectField, GreenSlider } from "@/components/calculators/green-fields";
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

export function ThirteenthMonthCalculator() {
  const [monthlyBasicSalary, setMonthlyBasicSalary] = useState(24_000);
  const [monthsWorked, setMonthsWorked] = useState(12);
  const [computationType, setComputationType] = useState<ComputationType>("full_year");

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
    <div className="grid items-stretch gap-[18px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Inputs */}
      <div className="flex flex-col">
        <div className="h-full rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(18px,2.5vw,26px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0E1525]">Pay details</h2>
            <button
              type="button"
              onClick={() => {
                setMonthlyBasicSalary(24_000);
                setMonthsWorked(12);
                setComputationType("full_year");
              }}
              className="text-[14px] font-semibold text-[#0B8270] transition-opacity hover:opacity-80"
            >
              Reset
            </button>
          </div>

          <div className="space-y-5">
            <MoneyField
              label="Monthly basic salary"
              tip="Your regular basic monthly salary. Excludes overtime, commissions, allowances, and other supplementary income."
              value={monthlyBasicSalary}
              onChange={setMonthlyBasicSalary}
              min={0}
              max={200_000}
              step={1_000}
            />

            <SelectField
              label="Computation type"
              tip="Full-year if you worked the whole calendar year; prorated if you worked only part of it."
              value={computationType}
              onChange={(v) => setComputationType(v as ComputationType)}
            >
              <option value="full_year">{COMPUTATION_TYPE_LABELS.full_year}</option>
              <option value="prorated">{COMPUTATION_TYPE_LABELS.prorated}</option>
            </SelectField>

            {computationType === "prorated" && (
              <GreenSlider
                label="Months worked in the year"
                tip="Number of months actually worked during the calendar year, counted for the computation."
                value={monthsWorked}
                display={`${monthsWorked} month${monthsWorked !== 1 ? "s" : ""}`}
                min={1}
                max={12}
                step={1}
                onChange={(v) => setMonthsWorked(Math.round(v))}
              />
            )}

            <div className="flex items-start gap-[11px] rounded-[13px] border border-[#EDF1F8] bg-[#F7F9FD] p-[13px_15px]">
              <Info className="mt-0.5 size-[18px] shrink-0 text-brand" />
              <span className="text-[14px] leading-[1.55] text-[#475069]">
                13th month pay = total basic salary earned during the calendar year ÷ 12. Based on
                PD 851 and its implementing rules.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Green result */}
      <GradientResult
        accent="green"
        label="13th month pay"
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
          note="The first ₱90,000 of 13th month pay and other bonuses per year is exempt from income tax."
        >
          <BreakdownRow label="Monthly basic salary" value={formatPeso(monthlyBasicSalary)} />
          <BreakdownRow label="× Months worked" value={String(result.monthsWorked)} />
          <BreakdownRow label="Total basic salary earned" value={formatPeso(result.totalBasicSalaryEarned)} />
          <BreakdownRow label="÷ 12" value="—" />
          <BreakdownRow
            label="Estimated 13th month pay"
            value={formatPeso(result.thirteenthMonthPay)}
            tone="total-green"
            strong
          />
        </BreakdownCard>
      </GradientResult>
    </div>
  );
}
