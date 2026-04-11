"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { CalculatorResult } from "@/components/calculators/calculator-result";
import { ResultPanel } from "@/components/calculators/result-panel";
import { formatPeso, formatPercent } from "@/lib/formatters";
import { Separator } from "@/components/ui/separator";

function calculateMonthlySavings(
  targetAmount: number,
  startingBalance: number,
  months: number,
  annualRate: number,
) {
  const remaining = targetAmount - startingBalance;
  if (remaining <= 0) return { monthly: 0, totalContributions: 0, interestEarned: 0 };
  if (months <= 0) return { monthly: remaining, totalContributions: remaining, interestEarned: 0 };

  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    const monthly = remaining / months;
    return { monthly, totalContributions: monthly * months, interestEarned: 0 };
  }

  // Future value of starting balance
  const fvStarting = startingBalance * Math.pow(1 + monthlyRate, months);
  const amountNeeded = targetAmount - fvStarting;

  if (amountNeeded <= 0) {
    return { monthly: 0, totalContributions: 0, interestEarned: fvStarting - startingBalance };
  }

  // PMT formula: how much per month to reach amountNeeded
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

export function SavingsGoalCalculator() {
  const [targetAmount, setTargetAmount] = useState(100_000);
  const [months, setMonths] = useState(12);
  const [startingBalance, setStartingBalance] = useState(0);
  const [annualRate, setAnnualRate] = useState(3.0);

  const result = useMemo(() => {
    return calculateMonthlySavings(targetAmount, startingBalance, months, annualRate);
  }, [targetAmount, startingBalance, months, annualRate]);

  const progressPercent =
    targetAmount > 0
      ? Math.min((startingBalance / targetAmount) * 100, 100)
      : 0;

  const presetComparisons = useMemo(() => {
    return TIMELINE_PRESETS.map((p) => ({
      ...p,
      ...calculateMonthlySavings(targetAmount, startingBalance, p.months, annualRate),
    }));
  }, [targetAmount, startingBalance, annualRate]);

  return (
    <div className="space-y-6">
      <CalculatorShell
        title="Savings Goal Calculator"
        variant="split"
        resultsSummary={[
          `Savings Goal: ${formatPeso(targetAmount)}`,
          `Timeline: ${months} months`,
          `Starting Balance: ${formatPeso(startingBalance)}`,
          `Interest Rate: ${formatPercent(annualRate)}`,
          `Monthly Savings Needed: ${formatPeso(result.monthly)}`,
          `Total Contributions: ${formatPeso(result.totalContributions)}`,
          `Estimated Interest Earned: ${formatPeso(result.interestEarned)}`,
        ].join("\n")}
        beforeYouStart={{
          description:
            "This calculator estimates how much you need to save each month to reach a target amount. Use it to plan for any financial goal.",
          items: [
            "Set a specific peso amount as your goal",
            "Choose a realistic timeline based on your budget",
            "Include any savings you already have toward this goal",
            "Add an interest rate if you plan to keep savings in a high-yield account",
            "Compare different timelines to find a monthly amount you can commit to",
          ],
        }}
      >
        {/* LEFT: Result Panel */}
        <ResultPanel className="flex flex-col justify-between">
          <div className="text-center">
            <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-gray-300">
              Monthly Savings Needed
            </p>
            <p className="mt-2 text-[36px] font-semibold tabular-nums text-brand sm:text-[42px] animate-count-up">
              {formatPeso(result.monthly)}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              per month for {months} months
            </p>
          </div>

          {/* Progress bar */}
          <div className="my-6 space-y-3">
            <p className="text-[14px] font-medium text-gray-400">
              Starting Progress
            </p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-gray-400">
                  {formatPeso(startingBalance)} of {formatPeso(targetAmount)}
                </span>
                <span className="font-bold text-brand">
                  {progressPercent.toFixed(0)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-brand transition-all duration-500"
                  style={{ width: `${Math.max(progressPercent, 2)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <CalculatorResult
              label="Monthly Savings Needed"
              value={formatPeso(result.monthly)}
              highlight
            />
            <CalculatorResult
              label="Total Contributions"
              value={formatPeso(result.totalContributions)}
            />
            <CalculatorResult
              label="Interest Earned"
              value={formatPeso(result.interestEarned)}
            />
            <CalculatorResult
              label="Goal Amount"
              value={formatPeso(targetAmount)}
            />
          </div>
        </ResultPanel>

        {/* RIGHT: Inputs */}
        <div className="space-y-6 p-8">
          <CalculatorInput
            label="Savings Goal"
            value={targetAmount}
            onChange={setTargetAmount}
            prefix="₱"
            min={1_000}
            max={50_000_000}
            step={5_000}
            helpText="The total amount you want to save."
            tooltip="Enter your target savings amount. This could be for a down payment, travel fund, tuition, or any financial goal."
          />

          <CalculatorInput
            label="Timeline (Months)"
            value={months}
            onChange={(v) => setMonths(Math.round(v))}
            min={1}
            max={120}
            step={1}
            helpText="How many months to reach your goal."
            tooltip="The number of months you plan to save. A longer timeline means smaller monthly amounts but more time before you reach your goal."
          />

          <CalculatorInput
            label="Starting Balance"
            value={startingBalance}
            onChange={setStartingBalance}
            prefix="₱"
            min={0}
            max={50_000_000}
            step={1_000}
            helpText="Amount you have saved toward this goal already."
            tooltip="If you already have some savings set aside for this goal, enter that amount here. It reduces the monthly amount you need to save."
          />

          <Separator />

          <CalculatorInput
            label="Annual Interest Rate (Optional)"
            value={annualRate}
            onChange={setAnnualRate}
            min={0}
            max={20}
            step={0.1}
            helpText="Expected annual rate if keeping savings in a bank account."
            tooltip="If you plan to keep your savings in a high-interest savings account or time deposit, enter the annual rate. Set to 0 if unsure."
          />

          <Separator />

          {/* Savings Breakdown */}
          <div>
            <h3 className="mb-3 text-[16px] font-semibold text-gray-500">
              Savings Breakdown
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Starting Balance</span>
                <span className="font-mono tabular-nums">
                  {formatPeso(startingBalance)}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>+ Monthly Contributions</span>
                <span className="font-mono tabular-nums text-green-600">
                  +{formatPeso(result.totalContributions)}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>+ Interest Earned</span>
                <span className="font-mono tabular-nums text-green-600">
                  +{formatPeso(result.interestEarned)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-gray-500">
                <span>Goal Amount</span>
                <span className="font-mono tabular-nums">
                  {formatPeso(targetAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CalculatorShell>

      {/* Timeline comparison */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-[16px] font-semibold text-gray-500">
          Compare Timelines
        </h3>
        <p className="mt-1 text-[14px] text-gray-400">
          See how the monthly amount changes depending on how long you save.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {presetComparisons.map((comp) => (
            <div
              key={comp.months}
              className={`rounded-lg border p-4 ${
                comp.months === months
                  ? "border-brand bg-brand/5"
                  : "border-gray-200"
              }`}
            >
              <p className="text-[14px] font-medium text-gray-400">
                {comp.label}
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-gray-500">
                {formatPeso(comp.monthly)}
              </p>
              <p className="text-[14px] text-gray-400">per month</p>
              {comp.interestEarned > 0 && (
                <p className="mt-2 text-[14px] tabular-nums text-green-600">
                  +{formatPeso(comp.interestEarned)} interest
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
