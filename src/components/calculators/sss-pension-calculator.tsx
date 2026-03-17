"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { CalculatorResult } from "@/components/calculators/calculator-result";
import { ResultPanel } from "@/components/calculators/result-panel";
import { calculateSSPension } from "@/lib/calculators/sss";
import { formatPeso } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

const METHOD_LABELS: Record<string, string> = {
  formula_a: "Formula A",
  formula_b: "Formula B",
  minimum_pension: "Minimum Pension",
};

function FormulaBar({
  label,
  value,
  maxValue,
  isWinner,
}: {
  label: string;
  value: number;
  maxValue: number;
  isWinner: boolean;
}) {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span
          className={isWinner ? "font-medium text-white" : "text-white/60"}
        >
          {label}
        </span>
        <span className="flex items-center gap-1">
          <span
            className={
              isWinner ? "font-bold text-white" : "text-white/60"
            }
          >
            {formatPeso(value)}
          </span>
          {isWinner && (
            <CheckCircle className="size-3 text-white" />
          )}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/20">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            isWinner ? "bg-white/90" : "bg-white/30"
          )}
          style={{ width: `${Math.max(percentage, 2)}%` }}
        />
      </div>
    </div>
  );
}

export function SSSPensionCalculator() {
  const [monthlySalaryCredit, setMonthlySalaryCredit] = useState(20_000);
  const [yearsOfContribution, setYearsOfContribution] = useState(25);

  const result = useMemo(() => {
    const sss = calculateSSPension({
      monthlySalaryCredit,
      yearsOfContribution,
    });

    // Compute individual formula values for comparison bars
    const yearsOver10 = Math.max(yearsOfContribution - 10, 0);
    const formulaA =
      Math.round(
        (300 +
          0.2 * monthlySalaryCredit +
          0.02 * monthlySalaryCredit * yearsOver10) *
          100
      ) / 100;
    const formulaB = Math.round(0.4 * monthlySalaryCredit * 100) / 100;
    const minimumPension =
      yearsOfContribution >= 20
        ? 4000
        : yearsOfContribution >= 10
          ? 2000
          : 0;

    return { ...sss, formulaA, formulaB, minimumPension };
  }, [monthlySalaryCredit, yearsOfContribution]);

  const maxFormulaValue = Math.max(
    result.formulaA,
    result.formulaB,
    result.minimumPension
  );

  return (
    <div className="space-y-6">
      <CalculatorShell
        title="SSS Pension Calculator"
        variant="split"
        resultsSummary={[
          `Monthly Salary Credit: ${formatPeso(monthlySalaryCredit)}`,
          `Years of Contribution: ${yearsOfContribution}`,
          `Estimated Monthly Pension: ${formatPeso(result.monthlyPension)}`,
          `Winning Formula: ${METHOD_LABELS[result.method] ?? result.method}`,
          `Monthly Contribution: ${formatPeso(result.monthlyContribution)}`,
          `Total Contributions (est.): ${formatPeso(result.totalContributions)}`,
        ].join("\n")}
      >
        {/* LEFT: Result Panel */}
        <ResultPanel className="flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50">Estimated Monthly Pension</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums sm:text-4xl animate-count-up">
              {formatPeso(result.monthlyPension)}
            </p>
            <p className="mt-2 text-sm text-white/50">
              via {METHOD_LABELS[result.method] ?? result.method}
            </p>
          </div>

          {/* Formula Comparison Bars */}
          <div className="my-6 space-y-3">
            <p className="text-xs font-medium text-white/60">
              Formula Comparison
            </p>
            <FormulaBar
              label="Formula A"
              value={result.formulaA}
              maxValue={maxFormulaValue}
              isWinner={result.method === "formula_a"}
            />
            <FormulaBar
              label="Formula B (40% MSC)"
              value={result.formulaB}
              maxValue={maxFormulaValue}
              isWinner={result.method === "formula_b"}
            />
            <FormulaBar
              label="Minimum Pension"
              value={result.minimumPension}
              maxValue={maxFormulaValue}
              isWinner={result.method === "minimum_pension"}
            />
          </div>

          <div className="space-y-1">
            <CalculatorResult
              label="Monthly Contribution"
              value={formatPeso(result.monthlyContribution)}
              variant="dark"
            />
            <CalculatorResult
              label="Total Contributions (est.)"
              value={formatPeso(result.totalContributions)}
              variant="dark"
            />
          </div>
        </ResultPanel>

        {/* RIGHT: Inputs Panel */}
        <div className="space-y-6 p-8">
          <CalculatorInput
            label="Monthly Salary Credit (MSC)"
            value={monthlySalaryCredit}
            onChange={setMonthlySalaryCredit}
            prefix="₱"
            min={4_000}
            max={30_000}
            step={500}
            helpText="₱4,000 to ₱30,000 (SSS MSC range)"
            tooltip="The salary credit assigned by SSS based on your compensation bracket. This determines your contribution and pension amounts."
          />
          <CalculatorInput
            label="Years of Contribution"
            value={yearsOfContribution}
            onChange={setYearsOfContribution}
            min={10}
            max={45}
            step={1}
            helpText="Minimum 10 years to qualify for pension"
            tooltip="The total number of years you have contributed to SSS. At least 10 years of contributions are needed to qualify for a pension."
          />
        </div>
      </CalculatorShell>
    </div>
  );
}
