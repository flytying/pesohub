"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { CalculatorResult } from "@/components/calculators/calculator-result";
import { ResultPanel } from "@/components/calculators/result-panel";
import dynamic from "next/dynamic";

const DeductionBreakdownChart = dynamic(
  () =>
    import("@/components/calculators/deduction-breakdown-chart").then(
      (m) => m.DeductionBreakdownChart,
    ),
  { ssr: false },
);

import { calculateTakeHomePay } from "@/lib/calculators/take-home-pay";
import { formatPeso, formatPercent } from "@/lib/formatters";
import { Separator } from "@/components/ui/separator";

export function TakeHomePayCalculator() {
  const [monthlySalary, setMonthlySalary] = useState(35_000);

  const result = useMemo(() => {
    return calculateTakeHomePay({ monthlySalary });
  }, [monthlySalary]);

  const deductionRate =
    monthlySalary > 0
      ? Math.round((result.totalDeductions / monthlySalary) * 10000) / 100
      : 0;

  return (
    <div className="space-y-6">
      <CalculatorShell
        title="Take-Home Pay Calculator"
        variant="split"
        resultsSummary={[
          `Gross Monthly Salary: ${formatPeso(monthlySalary)}`,
          `Estimated Monthly Take-Home Pay: ${formatPeso(result.takeHomePay)}`,
          `Total Deductions: ${formatPeso(result.totalDeductions)}`,
          `Deductions as % of Gross: ${formatPercent(deductionRate)}`,
          `Withholding Tax: ${formatPeso(result.withholdingTax)}`,
          `SSS Employee Share: ${formatPeso(result.sssContribution)}`,
          `PhilHealth Employee Share: ${formatPeso(result.philhealthContribution)}`,
          `Pag-IBIG Employee Share: ${formatPeso(result.pagibigContribution)}`,
        ].join("\n")}
      >
        {/* LEFT: Result Panel */}
        <ResultPanel className="flex flex-col justify-between">
          <div className="text-center">
            <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-gray-300">
              Estimated Monthly Take-Home Pay
            </p>
            <p className="mt-2 text-[36px] font-semibold tabular-nums text-brand sm:text-[42px] animate-count-up">
              {formatPeso(result.takeHomePay)}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Total deductions: {formatPercent(deductionRate)} of gross
            </p>
          </div>

          <DeductionBreakdownChart
            withholdingTax={result.withholdingTax}
            sss={result.sssContribution}
            philhealth={result.philhealthContribution}
            pagibig={result.pagibigContribution}
            takeHome={result.takeHomePay}
          />

          <div className="mt-6 space-y-1">
            <CalculatorResult
              label="Gross Monthly Salary"
              value={formatPeso(monthlySalary)}
            />
            <CalculatorResult
              label="Total Deductions"
              value={formatPeso(result.totalDeductions)}
              highlight
            />
            <CalculatorResult
              label="Deductions as % of Gross"
              value={formatPercent(deductionRate)}
            />
          </div>
        </ResultPanel>

        {/* RIGHT: Input */}
        <div className="space-y-6 p-8">
          <CalculatorInput
            label="Monthly Gross Salary"
            value={monthlySalary}
            onChange={setMonthlySalary}
            prefix="₱"
            min={0}
            max={1_000_000}
            step={1_000}
            helpText="Enter your monthly salary before deductions."
            tooltip="Your total monthly salary before withholding tax, SSS, PhilHealth, and Pag-IBIG deductions are applied."
          />

          <Separator />

          {/* Deduction Breakdown — receipt style */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-dashed border-gray-200 bg-gray-50 px-5 py-3">
              <h3 className="text-[16px] font-semibold text-gray-500">
                Deduction Breakdown
              </h3>
            </div>
            <div className="px-5 py-4">
              <div className="flex justify-between text-[16px] leading-[22px]">
                <span className="text-gray-400">Gross Salary</span>
                <span className="font-mono tabular-nums text-gray-500">
                  {formatPeso(monthlySalary)}
                </span>
              </div>
              <div className="my-3 border-t border-dashed border-gray-200" />
              <dl className="space-y-2.5 text-[16px] leading-[22px]">
                <div className="flex justify-between">
                  <dt className="text-gray-400">– Less: Withholding Tax</dt>
                  <dd className="font-mono tabular-nums text-gray-500">
                    ({formatPeso(result.withholdingTax)})
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">– Less: SSS</dt>
                  <dd className="font-mono tabular-nums text-gray-500">
                    ({formatPeso(result.sssContribution)})
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">– Less: PhilHealth</dt>
                  <dd className="font-mono tabular-nums text-gray-500">
                    ({formatPeso(result.philhealthContribution)})
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">– Less: Pag-IBIG</dt>
                  <dd className="font-mono tabular-nums text-gray-500">
                    ({formatPeso(result.pagibigContribution)})
                  </dd>
                </div>
              </dl>
            </div>
            <div className="border-t border-dashed border-gray-200 bg-gray-50 px-5 py-3">
              <div className="flex justify-between text-[16px] leading-[22px]">
                <span className="font-semibold text-gray-500">Estimated Take-Home Pay</span>
                <span className="font-mono tabular-nums font-bold text-brand">
                  {formatPeso(result.takeHomePay)}
                </span>
              </div>
            </div>
            <div className="border-t border-gray-100 px-5 py-2.5">
              <p className="text-[14px] text-gray-300">
                Based on TRAIN Law tax brackets, 2025 SSS table, current
                PhilHealth rate (5%), and standard Pag-IBIG rules.
              </p>
            </div>
          </div>
        </div>
      </CalculatorShell>
    </div>
  );
}
