"use client";

import { useState, useMemo } from "react";
import { ResultActions } from "@/components/calculators/result-actions";
import { MoneyField, GreenSlider } from "@/components/calculators/green-fields";
import {
  GradientResult,
  MixBar,
  BreakdownCard,
  BreakdownRow,
} from "@/components/calculators/gradient-result";
import { formatPeso, formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";

function calculateMonthlySavings(
  targetAmount: number,
  startingBalance: number,
  months: number,
  annualRate: number
) {
  const remaining = targetAmount - startingBalance;
  if (remaining <= 0) return { monthly: 0, totalContributions: 0, interestEarned: 0 };
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
    return { monthly: 0, totalContributions: 0, interestEarned: fvStarting - startingBalance };
  }

  const monthly = amountNeeded * (monthlyRate / (Math.pow(1 + monthlyRate, months) - 1));
  const totalContributions = monthly * months;
  const interestEarned = targetAmount - startingBalance - totalContributions;
  return {
    monthly: Math.max(monthly, 0),
    totalContributions: Math.max(totalContributions, 0),
    interestEarned: Math.max(interestEarned, 0),
  };
}

function monthsLabel(m: number) {
  if (m % 12 === 0) {
    const y = m / 12;
    return `${y} year${y === 1 ? "" : "s"}`;
  }
  return `${m} month${m === 1 ? "" : "s"}`;
}

const COMPARE_TIMELINES = [6, 12, 24, 36, 60];
const DEFAULTS = { goal: 100_000, months: 12, start: 0, rate: 3.0 };

export function SavingsGoalCalculator() {
  const [goal, setGoal] = useState(DEFAULTS.goal);
  const [months, setMonths] = useState(DEFAULTS.months);
  const [start, setStart] = useState(DEFAULTS.start);
  const [rate, setRate] = useState(DEFAULTS.rate);

  const reset = () => {
    setGoal(DEFAULTS.goal);
    setMonths(DEFAULTS.months);
    setStart(DEFAULTS.start);
    setRate(DEFAULTS.rate);
  };

  const r = useMemo(
    () => calculateMonthlySavings(goal, start, months, rate),
    [goal, start, months, rate]
  );

  const contribTotal = start + r.totalContributions;

  const resultsSummary = [
    `Savings Goal: ${formatPeso(goal)}`,
    `Timeline: ${monthsLabel(months)}`,
    `Starting Balance: ${formatPeso(start)}`,
    `Interest Rate: ${rate.toFixed(2)}%`,
    `Monthly Savings Needed: ${formatPeso(r.monthly)}`,
    `Total Contributions: ${formatPeso(r.totalContributions)}`,
    `Estimated Interest Earned: ${formatPeso(r.interestEarned)}`,
  ].join("\n");

  return (
    <div className="grid items-stretch gap-[18px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Inputs */}
      <div className="flex flex-col">
        <div className="h-full rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(18px,2.5vw,26px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0E1525]">Goal details</h2>
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
              label="Savings goal"
              tip="The total amount you want to save — a down payment, travel fund, tuition, or any target."
              value={goal}
              onChange={setGoal}
              min={10_000}
              max={5_000_000}
              step={10_000}
            />
            <GreenSlider
              accent="blue"
              label="Timeline"
              tip="How long you will save toward the goal. A longer timeline means smaller monthly amounts."
              value={months}
              display={monthsLabel(months)}
              min={1}
              max={120}
              step={1}
              onChange={(v) => setMonths(Math.round(v))}
            />
            <MoneyField
              accent="blue"
              label="Starting balance"
              tip="Money you have already saved toward this goal. It reduces the monthly amount needed."
              value={start}
              onChange={setStart}
              min={0}
              max={2_000_000}
              step={5_000}
            />
            <GreenSlider
              accent="blue"
              label="Annual interest rate"
              tip="Expected annual rate if the money sits in an interest-earning account. Set to 0 if unsure."
              value={rate}
              display={`${rate.toFixed(2)}%`}
              min={0}
              max={10}
              step={0.25}
              onChange={setRate}
            />
          </div>
        </div>
      </div>

      {/* RIGHT: Purple result */}
      <GradientResult
        accent="purple"
        label="Monthly savings needed"
        actions={
          <ResultActions
            calculatorType="Savings Goal Calculator"
            resultsSummary={resultsSummary}
          />
        }
        eyebrow="Per month"
        figure={formatPeso(r.monthly)}
        sub={`for ${monthsLabel(months)}`}
      >
        <MixBar
          accent="purple"
          title="How your goal is funded"
          segments={[
            { label: "Contributions", value: contribTotal, color: "#BCA9F4" },
            { label: "Interest", value: r.interestEarned, color: "#5CD2EE" },
          ]}
          footer={
            <div className="text-center text-[13px] text-[#CFC8F2]">
              Goal amount · <span className="font-semibold text-white">{formatPeso(goal)}</span>
            </div>
          }
        />
        <BreakdownCard title="Savings breakdown">
          <BreakdownRow label="Starting balance" value={formatPeso(start)} />
          <BreakdownRow
            label="+ Monthly contributions"
            value={`+${formatPeso(r.totalContributions)}`}
            tone="positive"
          />
          <BreakdownRow
            label="+ Interest earned"
            value={`+${formatPeso(r.interestEarned)}`}
            tone="positive"
          />
          <BreakdownRow label="Goal amount" value={formatPeso(goal)} tone="total" strong />
        </BreakdownCard>
      </GradientResult>

      {/* Compare timelines */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)] lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-[20px] font-semibold text-[#0E1525]">Compare timelines</h3>
          <span className="text-[15px] text-[#6B7488]">Same goal &amp; rate · tap to apply</span>
        </div>
        <p className="mb-[18px] mt-[7px] text-[15px] text-[#6B7488]">
          See how the monthly amount changes depending on how long you save.
        </p>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {COMPARE_TIMELINES.map((m) => {
            const c = calculateMonthlySavings(goal, start, m, rate);
            const on = months === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setMonths(m)}
                className={cn(
                  "rounded-[15px] border-[1.5px] p-4 text-left transition-colors",
                  on ? "border-brand bg-[#EAF0FF]" : "border-[#E7EBF3] hover:border-[#BCC9F4]"
                )}
              >
                <div className="text-[15px] font-bold text-[#5A6478]">{monthsLabel(m)}</div>
                <div className="mb-[2px] mt-[7px] font-display text-[22px] font-bold tabular-nums text-[#0E1525]">
                  ₱{formatNumber(c.monthly)}
                </div>
                <div className="text-[15px] text-[#6B7488]">per month</div>
                <div className="mt-[9px] text-[14px] font-semibold text-[#0E9F6E]">
                  +₱{formatNumber(c.interestEarned)} interest
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
