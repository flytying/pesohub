"use client";

import { useState, useMemo } from "react";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { ResultActions } from "@/components/calculators/result-actions";
import {
  GradientResult,
  BreakdownCard,
  BreakdownRow,
} from "@/components/calculators/gradient-result";
import { calculateSSPension } from "@/lib/calculators/sss";
import { formatPeso } from "@/lib/formatters";

const METHOD_LABELS: Record<string, string> = {
  formula_a: "Formula A",
  formula_b: "Formula B",
  minimum_pension: "Minimum Pension",
};

export function SSSPensionCalculator() {
  const [monthlySalaryCredit, setMonthlySalaryCredit] = useState(20_000);
  const [yearsOfContribution, setYearsOfContribution] = useState(25);

  const result = useMemo(() => {
    const sss = calculateSSPension({ monthlySalaryCredit, yearsOfContribution });
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
      yearsOfContribution >= 20 ? 4000 : yearsOfContribution >= 10 ? 2000 : 0;
    return { ...sss, formulaA, formulaB, minimumPension };
  }, [monthlySalaryCredit, yearsOfContribution]);

  const resultsSummary = [
    `Monthly Salary Credit: ${formatPeso(monthlySalaryCredit)}`,
    `Years of Contribution: ${yearsOfContribution}`,
    `Estimated Monthly Pension: ${formatPeso(result.monthlyPension)}`,
    `Winning Formula: ${METHOD_LABELS[result.method] ?? result.method}`,
    `Monthly Contribution: ${formatPeso(result.monthlyContribution)}`,
    `Total Contributions (est.): ${formatPeso(result.totalContributions)}`,
  ].join("\n");

  const winner = (m: string) =>
    result.method === m ? ("total" as const) : ("default" as const);

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Inputs */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,28px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-[18px] font-semibold text-[#0E1525]">
            Pension details
          </h2>
          <button
            type="button"
            onClick={() => {
              setMonthlySalaryCredit(20_000);
              setYearsOfContribution(25);
            }}
            className="text-[14px] font-bold text-brand transition-colors hover:text-brand-light"
          >
            Reset
          </button>
        </div>
        <div className="space-y-6">
          <CalculatorInput
            label="Monthly salary credit (MSC)"
            value={monthlySalaryCredit}
            onChange={setMonthlySalaryCredit}
            prefix="₱"
            min={4_000}
            max={30_000}
            step={500}
            helpText="₱4,000 to ₱30,000 (SSS MSC range)."
            tooltip="The salary credit assigned by SSS based on your compensation bracket."
          />
          <CalculatorInput
            label="Years of contribution"
            value={yearsOfContribution}
            onChange={setYearsOfContribution}
            min={10}
            max={45}
            step={1}
            helpText="Minimum 10 years to qualify for a pension."
            tooltip="At least 10 years of contributions are needed to qualify for a pension."
          />
        </div>
      </div>

      {/* RIGHT: Gradient result */}
      <GradientResult
        label="Estimated monthly pension"
        actions={
          <ResultActions
            calculatorType="SSS Pension Calculator"
            resultsSummary={resultsSummary}
          />
        }
        eyebrow="Per month"
        figure={formatPeso(result.monthlyPension)}
        sub={`via ${METHOD_LABELS[result.method] ?? result.method} · SSS takes the highest`}
      >
        <BreakdownCard
          title="Formula comparison"
          note="SSS pays the highest of three formulas, plus the ₱1,000 across-the-board increase where applicable."
        >
          <BreakdownRow
            label="Formula A"
            value={formatPeso(result.formulaA)}
            tone={winner("formula_a")}
            strong={result.method === "formula_a"}
          />
          <BreakdownRow
            label="Formula B (40% of MSC)"
            value={formatPeso(result.formulaB)}
            tone={winner("formula_b")}
            strong={result.method === "formula_b"}
          />
          <BreakdownRow
            label="Minimum pension"
            value={formatPeso(result.minimumPension)}
            tone={winner("minimum_pension")}
            strong={result.method === "minimum_pension"}
          />
        </BreakdownCard>
        <BreakdownCard title="Contributions">
          <BreakdownRow
            label="Monthly contribution"
            value={formatPeso(result.monthlyContribution)}
          />
          <BreakdownRow
            label="Total contributions (est.)"
            value={formatPeso(result.totalContributions)}
          />
        </BreakdownCard>
      </GradientResult>
    </div>
  );
}
