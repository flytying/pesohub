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
import {
  calculateTimeDeposit,
  calculateForTerm,
} from "@/lib/calculators/time-deposit";
import { formatPeso, formatPercent } from "@/lib/formatters";
import { Label } from "@/components/ui/label";

const COMPARISON_TERMS = [3, 6, 12, 24];
const DEFAULTS = { depositAmount: 100_000, annualRate: 5.5, term: 12 };

export function TimeDepositCalculator() {
  const [depositAmount, setDepositAmount] = useState(DEFAULTS.depositAmount);
  const [annualRate, setAnnualRate] = useState(DEFAULTS.annualRate);
  const [term, setTerm] = useState(DEFAULTS.term);
  const [termUnit, setTermUnit] = useState<"months" | "years">("months");

  const reset = () => {
    setDepositAmount(DEFAULTS.depositAmount);
    setAnnualRate(DEFAULTS.annualRate);
    setTerm(DEFAULTS.term);
    setTermUnit("months");
  };

  const result = useMemo(
    () => calculateTimeDeposit({ depositAmount, annualRate, term, termUnit }),
    [depositAmount, annualRate, term, termUnit]
  );

  const comparisons = useMemo(
    () =>
      COMPARISON_TERMS.map((months) =>
        calculateForTerm(depositAmount, annualRate, months)
      ),
    [depositAmount, annualRate]
  );

  const totalBalance = depositAmount + result.afterTaxInterest;
  const depositPct = totalBalance > 0 ? (depositAmount / totalBalance) * 100 : 100;

  const resultsSummary = [
    `Deposit Amount: ${formatPeso(depositAmount)}`,
    `Annual Interest Rate: ${formatPercent(annualRate)}`,
    `Term: ${result.termUsed}`,
    `Estimated Gross Interest: ${formatPeso(result.grossInterest)}`,
    `Estimated After-Tax Interest: ${formatPeso(result.afterTaxInterest)}`,
    `Estimated Net Maturity Value: ${formatPeso(result.netMaturityValue)}`,
    `Tax on Interest (20%): ${formatPeso(result.taxOnInterest)}`,
  ].join("\n");

  return (
    <div className="space-y-6">
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* LEFT: Inputs */}
        <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,28px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-[18px] font-semibold text-[#0E1525]">
              Deposit details
            </h2>
            <button
              type="button"
              onClick={reset}
              className="text-[14px] font-bold text-brand transition-colors hover:text-brand-light"
            >
              Reset
            </button>
          </div>
          <div className="space-y-6">
            <CalculatorInput
              label="Deposit amount"
              value={depositAmount}
              onChange={setDepositAmount}
              prefix="₱"
              min={1_000}
              max={10_000_000}
              step={10_000}
              helpText="The amount you plan to place in the time deposit."
              tooltip="The lump sum you lock in for a fixed period. Most banks require a minimum placement."
            />
            <CalculatorInput
              label="Annual interest rate"
              value={annualRate}
              onChange={setAnnualRate}
              min={0.1}
              max={20}
              step={0.1}
              helpText="The estimated annual rate offered by the bank."
              tooltip="Rates may vary by term length and deposit amount."
            />
            <CalculatorInput
              label="Term"
              value={term}
              onChange={setTerm}
              min={1}
              max={termUnit === "years" ? 10 : 120}
              step={1}
              helpText="The deposit duration."
              tooltip="Longer terms may offer higher rates but less access to your funds."
            />
            <div className="space-y-2">
              <Label htmlFor="term-unit" className="text-[15px] font-semibold text-[#344054]">
                Term unit
              </Label>
              <select
                id="term-unit"
                value={termUnit}
                onChange={(e) => setTermUnit(e.target.value as "months" | "years")}
                className="flex h-11 w-full rounded-[12px] border border-[#D6DEEC] bg-white px-3 text-[15px] text-[#0E1525] focus-visible:border-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/15"
              >
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT: Gradient result */}
        <GradientResult
          label="Estimated maturity amount"
          actions={
            <ResultActions
              calculatorType="Time Deposit Calculator"
              resultsSummary={resultsSummary}
            />
          }
          eyebrow="Net maturity"
          figure={formatPeso(result.netMaturityValue)}
          sub={`After 20% withholding tax on interest · ${result.termUsed}`}
        >
          <SplitBar
            leftLabel={`Deposit · ${Math.round(depositPct)}%`}
            leftValue={formatPeso(depositAmount)}
            leftPct={depositPct}
            rightLabel={`Interest · ${Math.round(100 - depositPct)}%`}
            rightValue={formatPeso(result.afterTaxInterest)}
            total={`Total balance · ${formatPeso(totalBalance)}`}
          />
          <BreakdownCard
            title="Deposit breakdown"
            note="Based on simple interest with 20% withholding tax on interest income."
          >
            <BreakdownRow label="Deposit amount" value={formatPeso(depositAmount)} />
            <BreakdownRow
              label="+ Estimated gross interest"
              value={`+${formatPeso(result.grossInterest)}`}
              tone="positive"
            />
            <BreakdownRow
              label="− Tax on interest (20%)"
              value={`−${formatPeso(result.taxOnInterest)}`}
              tone="negative"
            />
            <BreakdownRow
              label="Estimated net maturity value"
              value={formatPeso(result.netMaturityValue)}
              tone="total"
              strong
            />
          </BreakdownCard>
        </GradientResult>
      </div>

      {/* Term comparison */}
      <div className="rounded-[18px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <h3 className="font-display text-[18px] font-semibold text-[#0E1525]">
          Compare different terms
        </h3>
        <p className="mt-1 text-[14px] text-[#6B7488]">
          Check whether a longer deposit term gives a return that feels worth the
          lock-in period.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {comparisons.map((comp) => {
            const active = comp.termInMonths === result.termInMonths;
            return (
              <div
                key={comp.termInMonths}
                className={`rounded-[14px] border p-4 ${
                  active ? "border-brand bg-[#EAF0FF]" : "border-[#E7EBF3]"
                }`}
              >
                <p className="text-[14px] font-semibold text-[#5A6478]">
                  {comp.termUsed}
                </p>
                <p className="mt-1 font-display text-lg font-bold tabular-nums text-[#0E1525]">
                  {formatPeso(comp.afterTaxInterest)}
                </p>
                <p className="text-[13px] text-[#6B7488]">after-tax interest</p>
                <p className="mt-2 text-[13px] tabular-nums text-[#6B7488]">
                  Maturity: {formatPeso(comp.netMaturityValue)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
