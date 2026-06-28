"use client";

import { useState, useMemo } from "react";
import { ResultActions } from "@/components/calculators/result-actions";
import { MoneyField, GreenSlider } from "@/components/calculators/green-fields";
import {
  GradientResult,
  MixBar,
  ProgressLine,
  BreakdownCard,
  BreakdownRow,
} from "@/components/calculators/gradient-result";
import {
  calculateTimeDeposit,
  calculateForTerm,
} from "@/lib/calculators/time-deposit";
import { formatPeso, formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const COMPARISON_TERMS = [3, 6, 12, 24, 36];
const DEFAULTS = { depositAmount: 100_000, annualRate: 5.5, term: 12 };

export function TimeDepositCalculator() {
  const [depositAmount, setDepositAmount] = useState(DEFAULTS.depositAmount);
  const [annualRate, setAnnualRate] = useState(DEFAULTS.annualRate);
  const [term, setTerm] = useState(DEFAULTS.term);

  const reset = () => {
    setDepositAmount(DEFAULTS.depositAmount);
    setAnnualRate(DEFAULTS.annualRate);
    setTerm(DEFAULTS.term);
  };

  const result = useMemo(
    () => calculateTimeDeposit({ depositAmount, annualRate, term, termUnit: "months" }),
    [depositAmount, annualRate, term]
  );

  const comparisons = useMemo(
    () => COMPARISON_TERMS.map((m) => calculateForTerm(depositAmount, annualRate, m)),
    [depositAmount, annualRate]
  );

  const totalBalance = depositAmount + result.afterTaxInterest;
  const depositPct = totalBalance > 0 ? (depositAmount / totalBalance) * 100 : 100;

  const resultsSummary = [
    `Deposit Amount: ${formatPeso(depositAmount)}`,
    `Annual Interest Rate: ${annualRate.toFixed(2)}%`,
    `Term: ${result.termUsed}`,
    `Estimated Gross Interest: ${formatPeso(result.grossInterest)}`,
    `Tax on Interest (20%): ${formatPeso(result.taxOnInterest)}`,
    `Estimated After-Tax Interest: ${formatPeso(result.afterTaxInterest)}`,
    `Estimated Net Maturity Value: ${formatPeso(result.netMaturityValue)}`,
  ].join("\n");

  return (
    <div className="grid items-stretch gap-[18px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Inputs */}
      <div className="flex flex-col">
        <div className="h-full rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(18px,2.5vw,26px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0E1525]">Deposit details</h2>
            <button
              type="button"
              onClick={reset}
              className="text-[14px] font-semibold text-brand transition-opacity hover:opacity-80"
            >
              Reset
            </button>
          </div>

          <div className="space-y-5">
            <MoneyField
              accent="blue"
              label="Deposit amount"
              tip="The lump sum you lock in for a fixed period. Most banks require a minimum placement."
              value={depositAmount}
              onChange={setDepositAmount}
              min={1_000}
              max={5_000_000}
              step={10_000}
            />
            <GreenSlider
              accent="blue"
              label="Annual interest rate"
              tip="The gross annual rate offered by the bank. Rates vary by term length and deposit amount."
              value={annualRate}
              display={`${annualRate.toFixed(2)}%`}
              min={0.25}
              max={12}
              step={0.25}
              onChange={setAnnualRate}
            />
            <GreenSlider
              accent="blue"
              label="Term"
              tip="How long your money is locked in. Longer terms may offer higher rates but less access to your funds."
              value={term}
              display={`${term} month${term !== 1 ? "s" : ""}`}
              min={1}
              max={60}
              step={1}
              onChange={(v) => setTerm(Math.round(v))}
            />
          </div>
        </div>
      </div>

      {/* RIGHT: Purple result */}
      <GradientResult
        accent="purple"
        label="Time deposit maturity"
        actions={
          <ResultActions
            calculatorType="Time Deposit Calculator"
            resultsSummary={resultsSummary}
          />
        }
        eyebrow="Net maturity"
        figure={formatPeso(result.netMaturityValue)}
        sub={`after 20% tax on interest · ${result.termUsed}`}
      >
        <MixBar
          accent="purple"
          title="Where your money sits"
          segments={[
            { label: "Deposit", value: depositAmount, color: "#B9A9F2" },
            { label: "After-tax interest", value: result.afterTaxInterest, color: "#5CD2EE" },
          ]}
          footer={
            <ProgressLine
              accent="purple"
              label="Your deposit"
              valueLabel={`${Math.round(depositPct)}% of maturity`}
              pct={depositPct}
            />
          }
        />
        <BreakdownCard
          title="Deposit breakdown"
          note="Based on simple interest with 20% withholding tax on interest income."
        >
          <BreakdownRow label="Deposit amount" value={formatPeso(depositAmount)} />
          <BreakdownRow
            label="+ Gross interest"
            value={`+${formatPeso(result.grossInterest)}`}
            tone="positive"
          />
          <BreakdownRow
            label="− Tax on interest (20%)"
            value={`−${formatPeso(result.taxOnInterest)}`}
            tone="negative"
          />
          <BreakdownRow
            label="Net maturity value"
            value={formatPeso(result.netMaturityValue)}
            tone="total"
            strong
          />
        </BreakdownCard>
      </GradientResult>

      {/* Compare terms */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)] lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-[20px] font-semibold text-[#0E1525]">Compare terms</h3>
          <span className="text-[15px] text-[#6B7488]">Same amount &amp; rate · tap to apply</span>
        </div>
        <p className="mb-[18px] mt-[7px] text-[15px] text-[#6B7488]">
          Check whether a longer lock-in gives a return worth the wait, on a{" "}
          ₱{formatNumber(depositAmount)} deposit at {annualRate.toFixed(2)}%.
        </p>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {comparisons.map((comp) => {
            const on = comp.termInMonths === result.termInMonths;
            return (
              <button
                key={comp.termInMonths}
                type="button"
                onClick={() => setTerm(comp.termInMonths)}
                className={cn(
                  "rounded-[15px] border-[1.5px] p-4 text-left transition-colors",
                  on ? "border-brand bg-[#EAF0FF]" : "border-[#E7EBF3] hover:border-[#BCC9F4]"
                )}
              >
                <div className="text-[15px] font-bold text-[#5A6478]">{comp.termUsed}</div>
                <div className="mb-[2px] mt-[7px] font-display text-[22px] font-bold tabular-nums text-[#0E1525]">
                  ₱{formatNumber(comp.netMaturityValue)}
                </div>
                <div className="text-[15px] text-[#6B7488]">at maturity</div>
                <div className="mt-[9px] text-[14px] font-semibold text-[#0E9F6E]">
                  +₱{formatNumber(comp.afterTaxInterest)} interest
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
