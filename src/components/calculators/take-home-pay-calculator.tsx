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
            <p className="text-sm tracking-wide text-white/70">
              Estimated Monthly Take-Home Pay
            </p>
            <p className="mt-2 text-3xl font-semibold tabular-nums sm:text-4xl animate-count-up">
              {formatPeso(result.takeHomePay)}
            </p>
            <p className="mt-2 text-sm text-white/70">
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

          {/* Chart Legend */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs print:hidden">
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-full bg-white/85" />
              <span className="text-white/70">Take-Home</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-full bg-white/35" />
              <span className="text-white/70">Tax</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-full bg-[#4CAF50]/60" />
              <span className="text-white/70">SSS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-full bg-[#FF9800]/60" />
              <span className="text-white/70">PhilHealth</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-full bg-[#9C27B0]/60" />
              <span className="text-white/70">Pag-IBIG</span>
            </div>
          </div>

          <div className="mt-6 space-y-1">
            <CalculatorResult
              label="Gross Monthly Salary"
              value={formatPeso(monthlySalary)}
              variant="dark"
            />
            <CalculatorResult
              label="Total Deductions"
              value={formatPeso(result.totalDeductions)}
              variant="dark"
              highlight
            />
            <CalculatorResult
              label="Deductions as % of Gross"
              value={formatPercent(deductionRate)}
              variant="dark"
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

          {/* Deduction Breakdown Table */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              Deduction Breakdown
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Gross Salary</span>
                <span className="font-mono tabular-nums">
                  {formatPeso(monthlySalary)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-muted-foreground">
                <span>Withholding Tax</span>
                <span className="font-mono tabular-nums text-red-600">
                  −{formatPeso(result.withholdingTax)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>SSS Employee Share</span>
                <span className="font-mono tabular-nums text-red-600">
                  −{formatPeso(result.sssContribution)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>PhilHealth Employee Share</span>
                <span className="font-mono tabular-nums text-red-600">
                  −{formatPeso(result.philhealthContribution)}
                </span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Pag-IBIG Employee Share</span>
                <span className="font-mono tabular-nums text-red-600">
                  −{formatPeso(result.pagibigContribution)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-foreground">
                <span>Estimated Take-Home Pay</span>
                <span className="font-mono tabular-nums">
                  {formatPeso(result.takeHomePay)}
                </span>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Based on TRAIN Law tax brackets, 2025 SSS table, current
              PhilHealth rate (5%), and standard Pag-IBIG rules.
            </p>
          </div>
        </div>
      </CalculatorShell>
    </div>
  );
}
