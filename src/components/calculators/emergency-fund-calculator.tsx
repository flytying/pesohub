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
import { formatPeso } from "@/lib/formatters";
import { Label } from "@/components/ui/label";

const MONTH_OPTIONS = [3, 4, 5, 6];

interface ExpenseCategory {
  label: string;
  key: string;
  helpText: string;
  tooltip: string;
  defaultValue: number;
}

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { label: "Housing (rent / mortgage)", key: "housing", helpText: "Monthly rent or mortgage payment.", tooltip: "Include rent or mortgage amortization. If you own your home outright, enter 0.", defaultValue: 10_000 },
  { label: "Food & groceries", key: "food", helpText: "Monthly food and grocery spending.", tooltip: "Typical monthly spending on food, groceries, and dining out.", defaultValue: 8_000 },
  { label: "Utilities & bills", key: "utilities", helpText: "Electricity, water, internet, phone.", tooltip: "Electricity, water, internet, mobile phone, and other recurring bills.", defaultValue: 4_000 },
  { label: "Transportation", key: "transport", helpText: "Commute, fuel, or car expenses.", tooltip: "Daily commute costs, fuel, parking, or ride-hailing.", defaultValue: 3_000 },
  { label: "Loan payments", key: "loans", helpText: "Existing loan or credit card payments.", tooltip: "Monthly payments for personal loans, car loans, credit cards, or other debt.", defaultValue: 0 },
  { label: "Insurance & health", key: "insurance", helpText: "Health insurance or HMO premiums.", tooltip: "Private health insurance, HMO premiums, or regular medical costs.", defaultValue: 0 },
  { label: "Other essential expenses", key: "other", helpText: "Education, childcare, or other needs.", tooltip: "Other recurring essentials like education, childcare, or dependent support.", defaultValue: 0 },
];

export function EmergencyFundCalculator() {
  const [expenses, setExpenses] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const cat of EXPENSE_CATEGORIES) initial[cat.key] = cat.defaultValue;
    return initial;
  });
  const [targetMonths, setTargetMonths] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(0);

  const result = useMemo(() => {
    const monthlyTotal = Object.values(expenses).reduce((a, b) => a + b, 0);
    const targetAmount = monthlyTotal * targetMonths;
    const gap = Math.max(targetAmount - currentSavings, 0);
    const progressPercent =
      targetAmount > 0 ? Math.min((currentSavings / targetAmount) * 100, 100) : 0;
    return { monthlyTotal, targetAmount, gap, progressPercent };
  }, [expenses, targetMonths, currentSavings]);

  const updateExpense = (key: string, value: number) =>
    setExpenses((prev) => ({ ...prev, [key]: value }));

  const resultsSummary = [
    `Monthly Essential Expenses: ${formatPeso(result.monthlyTotal)}`,
    `Target Months: ${targetMonths} months`,
    `Emergency Fund Target: ${formatPeso(result.targetAmount)}`,
    `Current Savings: ${formatPeso(currentSavings)}`,
    `Remaining to Save: ${formatPeso(result.gap)}`,
  ].join("\n");

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Inputs */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,28px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-[18px] font-semibold text-[#0E1525]">
            Your expenses
          </h2>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="target-months" className="text-[15px] font-semibold text-[#344054]">
              Target months of coverage
            </Label>
            <select
              id="target-months"
              value={targetMonths}
              onChange={(e) => setTargetMonths(Number(e.target.value))}
              className="flex h-11 w-full rounded-[12px] border border-[#D6DEEC] bg-white px-3 text-[15px] text-[#0E1525] focus-visible:border-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/15"
            >
              {MONTH_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m} months
                </option>
              ))}
            </select>
            <p className="text-[14px] text-[#6B7488]">
              Advisors typically recommend 3 to 6 months.
            </p>
          </div>

          <div className="text-[13px] font-bold uppercase tracking-[.06em] text-[#6B7488]">
            Monthly essential expenses
          </div>
          {EXPENSE_CATEGORIES.map((cat) => (
            <CalculatorInput
              key={cat.key}
              label={cat.label}
              value={expenses[cat.key]}
              onChange={(v) => updateExpense(cat.key, v)}
              prefix="₱"
              min={0}
              max={500_000}
              step={500}
              helpText={cat.helpText}
              tooltip={cat.tooltip}
            />
          ))}

          <CalculatorInput
            label="Current savings"
            value={currentSavings}
            onChange={setCurrentSavings}
            prefix="₱"
            min={0}
            max={50_000_000}
            step={1_000}
            helpText="Amount you've already saved toward this fund."
            tooltip="Existing savings reduce how much you still need to set aside."
          />
        </div>
      </div>

      {/* RIGHT: Gradient result */}
      <GradientResult
        label="Emergency fund target"
        actions={
          <ResultActions
            calculatorType="Emergency Fund Calculator"
            resultsSummary={resultsSummary}
          />
        }
        eyebrow="Target"
        figure={formatPeso(result.targetAmount)}
        sub={`${targetMonths} months of essential expenses`}
      >
        <SplitBar
          leftLabel={`Saved · ${result.progressPercent.toFixed(0)}%`}
          leftValue={formatPeso(currentSavings)}
          leftPct={result.progressPercent}
          rightLabel={`Remaining · ${(100 - result.progressPercent).toFixed(0)}%`}
          rightValue={formatPeso(result.gap)}
          total={`Target · ${formatPeso(result.targetAmount)}`}
        />
        <BreakdownCard title="Fund breakdown">
          <BreakdownRow
            label="Monthly essential expenses"
            value={formatPeso(result.monthlyTotal)}
          />
          <BreakdownRow
            label="Emergency fund target"
            value={formatPeso(result.targetAmount)}
          />
          <BreakdownRow label="Current savings" value={formatPeso(currentSavings)} />
          <BreakdownRow
            label="Remaining to save"
            value={formatPeso(result.gap)}
            tone="total"
            strong
          />
        </BreakdownCard>
      </GradientResult>
    </div>
  );
}
