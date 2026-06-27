"use client";

import { useState, useMemo } from "react";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { ResultActions } from "@/components/calculators/result-actions";
import {
  GradientResult,
  SplitBar,
  BreakdownCard,
  BreakdownRow,
} from "@/components/calculators/gradient-result";
import { calculateTakeHomePay } from "@/lib/calculators/take-home-pay";
import { formatPeso, formatPercent } from "@/lib/formatters";

const DEFAULT_SALARY = 35_000;

export function TakeHomePayCalculator() {
  const [monthlySalary, setMonthlySalary] = useState(DEFAULT_SALARY);

  const result = useMemo(
    () => calculateTakeHomePay({ monthlySalary }),
    [monthlySalary]
  );

  const deductionRate =
    monthlySalary > 0
      ? Math.round((result.totalDeductions / monthlySalary) * 10000) / 100
      : 0;
  const takeHomePct = monthlySalary > 0 ? (result.takeHomePay / monthlySalary) * 100 : 100;

  const resultsSummary = [
    `Gross Monthly Salary: ${formatPeso(monthlySalary)}`,
    `Estimated Monthly Take-Home Pay: ${formatPeso(result.takeHomePay)}`,
    `Total Deductions: ${formatPeso(result.totalDeductions)}`,
    `Deductions as % of Gross: ${formatPercent(deductionRate)}`,
    `Withholding Tax: ${formatPeso(result.withholdingTax)}`,
    `SSS Employee Share: ${formatPeso(result.sssContribution)}`,
    `PhilHealth Employee Share: ${formatPeso(result.philhealthContribution)}`,
    `Pag-IBIG Employee Share: ${formatPeso(result.pagibigContribution)}`,
  ].join("\n");

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Input */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,28px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-[18px] font-semibold text-[#0E1525]">
            Salary details
          </h2>
          <button
            type="button"
            onClick={() => setMonthlySalary(DEFAULT_SALARY)}
            className="text-[14px] font-bold text-brand transition-colors hover:text-brand-light"
          >
            Reset
          </button>
        </div>
        <CalculatorInput
          label="Monthly gross salary"
          value={monthlySalary}
          onChange={setMonthlySalary}
          prefix="₱"
          min={0}
          max={1_000_000}
          step={1_000}
          helpText="Your monthly salary before deductions."
          tooltip="Total monthly salary before withholding tax, SSS, PhilHealth, and Pag-IBIG."
        />
        <p className="mt-6 text-[13px] leading-[1.6] text-[#8A93A6]">
          Based on TRAIN Law tax brackets, the 2025 SSS table, the current
          PhilHealth rate (5%), and standard Pag-IBIG rules.
        </p>
      </div>

      {/* RIGHT: Gradient result */}
      <GradientResult
        label="Estimated take-home pay"
        actions={
          <ResultActions
            calculatorType="Take-Home Pay Calculator"
            resultsSummary={resultsSummary}
          />
        }
        eyebrow="Per month"
        figure={formatPeso(result.takeHomePay)}
        sub={`Total deductions: ${formatPercent(deductionRate)} of gross`}
      >
        <SplitBar
          leftLabel={`Take-home · ${Math.round(takeHomePct)}%`}
          leftValue={formatPeso(result.takeHomePay)}
          leftPct={takeHomePct}
          rightLabel={`Deductions · ${Math.round(100 - takeHomePct)}%`}
          rightValue={formatPeso(result.totalDeductions)}
          total={`Gross salary · ${formatPeso(monthlySalary)}`}
        />
        <BreakdownCard
          title="Deduction breakdown"
          note="Estimates only — actual payroll deductions may differ by employer."
        >
          <BreakdownRow label="Gross salary" value={formatPeso(monthlySalary)} />
          <BreakdownRow
            label="– Withholding tax"
            value={`−${formatPeso(result.withholdingTax)}`}
            tone="negative"
          />
          <BreakdownRow
            label="– SSS"
            value={`−${formatPeso(result.sssContribution)}`}
            tone="negative"
          />
          <BreakdownRow
            label="– PhilHealth"
            value={`−${formatPeso(result.philhealthContribution)}`}
            tone="negative"
          />
          <BreakdownRow
            label="– Pag-IBIG"
            value={`−${formatPeso(result.pagibigContribution)}`}
            tone="negative"
          />
          <BreakdownRow
            label="Estimated take-home pay"
            value={formatPeso(result.takeHomePay)}
            tone="total"
            strong
          />
        </BreakdownCard>
      </GradientResult>
    </div>
  );
}
