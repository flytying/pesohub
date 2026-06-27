"use client";

import { useState, useMemo } from "react";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { ResultActions } from "@/components/calculators/result-actions";
import {
  GradientResult,
  BreakdownCard,
  BreakdownRow,
} from "@/components/calculators/gradient-result";
import { formatPeso, formatPercent } from "@/lib/formatters";

function calculateMonthlySavings(
  targetAmount: number,
  startingBalance: number,
  months: number,
  annualRate: number
) {
  const remaining = targetAmount - startingBalance;
  if (remaining <= 0)
    return { monthly: 0, totalContributions: 0, interestEarned: 0 };
  if (months <= 0)
    return { monthly: remaining, totalContributions: remaining, interestEarned: 0 };

  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) {
    const monthly = remaining / months;
    return { monthly, totalContributions: monthly * months, interestEarned: 0 };
  }

  const fvStarting = startingBalance * Math.pow(1 + monthlyRate, months);
  const amountNeeded = targetAmount - fvStarting;
  if (amountNeeded <= 0) {
    return {
      monthly: 0,
      totalContributions: 0,
      interestEarned: fvStarting - startingBalance,
    };
  }

  const monthly =
    amountNeeded * (monthlyRate / (Math.pow(1 + monthlyRate, months) - 1));
  const totalContributions = monthly * months;
  const interestEarned = targetAmount - startingBalance - totalContributions;
  return {
    monthly: Math.max(monthly, 0),
    totalContributions: Math.max(totalContributions, 0),
    interestEarned: Math.max(interestEarned, 0),
  };
}

const TIMELINE_PRESETS = [
  { label: "6 months", months: 6 },
  { label: "1 year", months: 12 },
  { label: "2 years", months: 24 },
  { label: "3 years", months: 36 },
  { label: "5 years", months: 60 },
];

const DEFAULTS = { targetAmount: 100_000, months: 12, startingBalance: 0, annualRate: 3.0 };

export function SavingsGoalCalculator() {
  const [targetAmount, setTargetAmount] = useState(DEFAULTS.targetAmount);
  const [months, setMonths] = useState(DEFAULTS.months);
  const [startingBalance, setStartingBalance] = useState(DEFAULTS.startingBalance);
  const [annualRate, setAnnualRate] = useState(DEFAULTS.annualRate);

  const reset = () => {
    setTargetAmount(DEFAULTS.targetAmount);
    setMonths(DEFAULTS.months);
    setStartingBalance(DEFAULTS.startingBalance);
    setAnnualRate(DEFAULTS.annualRate);
  };

  const result = useMemo(
    () => calculateMonthlySavings(targetAmount, startingBalance, months, annualRate),
    [targetAmount, startingBalance, months, annualRate]
  );

  const presetComparisons = useMemo(
    () =>
      TIMELINE_PRESETS.map((p) => ({
        ...p,
        ...calculateMonthlySavings(targetAmount, startingBalance, p.months, annualRate),
      })),
    [targetAmount, startingBalance, annualRate]
  );

  const resultsSummary = [
    `Savings Goal: ${formatPeso(targetAmount)}`,
    `Timeline: ${months} months`,
    `Starting Balance: ${formatPeso(startingBalance)}`,
    `Interest Rate: ${formatPercent(annualRate)}`,
    `Monthly Savings Needed: ${formatPeso(result.monthly)}`,
    `Total Contributions: ${formatPeso(result.totalContributions)}`,
    `Estimated Interest Earned: ${formatPeso(result.interestEarned)}`,
  ].join("\n");

  return (
    <div className="space-y-6">
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* LEFT: Inputs */}
        <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,28px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-[18px] font-semibold text-[#0E1525]">
              Goal details
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
              label="Savings goal"
              value={targetAmount}
              onChange={setTargetAmount}
              prefix="₱"
              min={1_000}
              max={50_000_000}
              step={5_000}
              helpText="The total amount you want to save."
              tooltip="Your target amount — a down payment, travel fund, tuition, or any goal."
            />
            <CalculatorInput
              label="Timeline (months)"
              value={months}
              onChange={(v) => setMonths(Math.round(v))}
              min={1}
              max={120}
              step={1}
              helpText="How many months to reach your goal."
              tooltip="A longer timeline means smaller monthly amounts."
            />
            <CalculatorInput
              label="Starting balance"
              value={startingBalance}
              onChange={setStartingBalance}
              prefix="₱"
              min={0}
              max={50_000_000}
              step={1_000}
              helpText="Amount you have saved toward this goal already."
              tooltip="Existing savings reduce the monthly amount you need."
            />
            <CalculatorInput
              label="Annual interest rate (optional)"
              value={annualRate}
              onChange={setAnnualRate}
              min={0}
              max={20}
              step={0.1}
              helpText="Expected annual rate if kept in a savings account."
              tooltip="Set to 0 if unsure."
            />
          </div>
        </div>

        {/* RIGHT: Gradient result */}
        <GradientResult
          label="Monthly savings needed"
          actions={
            <ResultActions
              calculatorType="Savings Goal Calculator"
              resultsSummary={resultsSummary}
            />
          }
          eyebrow="Per month"
          figure={formatPeso(result.monthly)}
          sub={`for ${months} months`}
        >
          <BreakdownCard title="Savings breakdown">
            <BreakdownRow
              label="Starting balance"
              value={formatPeso(startingBalance)}
            />
            <BreakdownRow
              label="+ Monthly contributions"
              value={`+${formatPeso(result.totalContributions)}`}
              tone="positive"
            />
            <BreakdownRow
              label="+ Interest earned"
              value={`+${formatPeso(result.interestEarned)}`}
              tone="positive"
            />
            <BreakdownRow
              label="Goal amount"
              value={formatPeso(targetAmount)}
              tone="total"
              strong
            />
          </BreakdownCard>
        </GradientResult>
      </div>

      {/* Timeline comparison */}
      <div className="rounded-[18px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <h3 className="font-display text-[18px] font-semibold text-[#0E1525]">
          Compare timelines
        </h3>
        <p className="mt-1 text-[14px] text-[#6B7488]">
          See how the monthly amount changes depending on how long you save.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {presetComparisons.map((comp) => {
            const active = comp.months === months;
            return (
              <div
                key={comp.months}
                className={`rounded-[14px] border p-4 ${
                  active ? "border-brand bg-[#EAF0FF]" : "border-[#E7EBF3]"
                }`}
              >
                <p className="text-[14px] font-semibold text-[#5A6478]">
                  {comp.label}
                </p>
                <p className="mt-1 font-display text-lg font-bold tabular-nums text-[#0E1525]">
                  {formatPeso(comp.monthly)}
                </p>
                <p className="text-[13px] text-[#6B7488]">per month</p>
                {comp.interestEarned > 0 && (
                  <p className="mt-2 text-[13px] tabular-nums text-[#0E9F6E]">
                    +{formatPeso(comp.interestEarned)} interest
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
