"use client";

import { useState, useMemo } from "react";
import { ResultActions } from "@/components/calculators/result-actions";
import { SelectField, GreenSlider } from "@/components/calculators/green-fields";
import {
  GradientResult,
  MixBar,
  ProgressLine,
  BreakdownCard,
  BreakdownRow,
} from "@/components/calculators/gradient-result";
import { formatPeso, formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const MONTH_OPTIONS = [3, 4, 5, 6, 9, 12];
const COVERAGE_LEVELS = [3, 4, 5, 6];

interface ExpenseCategory {
  key: string;
  label: string;
  short: string;
  color: string;
  defaultValue: number;
}

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  { key: "housing", label: "Housing (rent / mortgage)", short: "Housing", color: "#7FE3DC", defaultValue: 10_000 },
  { key: "food", label: "Food & groceries", short: "Food & groceries", color: "#9FB2FF", defaultValue: 8_000 },
  { key: "utilities", label: "Utilities & bills", short: "Utilities & bills", color: "#FFD27F", defaultValue: 4_000 },
  { key: "transport", label: "Transportation", short: "Transportation", color: "#FF9F9F", defaultValue: 3_000 },
  { key: "loans", label: "Loan payments", short: "Loan payments", color: "#B98CFF", defaultValue: 0 },
  { key: "insurance", label: "Insurance & health", short: "Insurance & health", color: "#6BEFC0", defaultValue: 0 },
  { key: "other", label: "Other essential expenses", short: "Other", color: "#FFC4E1", defaultValue: 0 },
];

function makeDefaults() {
  const o: Record<string, number> = {};
  for (const c of EXPENSE_CATEGORIES) o[c.key] = c.defaultValue;
  return o;
}

export function EmergencyFundCalculator() {
  const [expenses, setExpenses] = useState<Record<string, number>>(makeDefaults);
  const [months, setMonths] = useState(6);
  const [savings, setSavings] = useState(0);

  const reset = () => {
    setExpenses(makeDefaults());
    setMonths(6);
    setSavings(0);
  };

  const { monthlyTotal, targetAmount, gap, progress } = useMemo(() => {
    const monthlyTotal = EXPENSE_CATEGORIES.reduce((a, c) => a + (expenses[c.key] || 0), 0);
    const targetAmount = monthlyTotal * months;
    const gap = Math.max(targetAmount - savings, 0);
    const progress = targetAmount > 0 ? Math.min((savings / targetAmount) * 100, 100) : 0;
    return { monthlyTotal, targetAmount, gap, progress };
  }, [expenses, months, savings]);

  const update = (key: string, value: number) =>
    setExpenses((prev) => ({ ...prev, [key]: value }));

  const mixSegments = EXPENSE_CATEGORIES.filter((c) => (expenses[c.key] || 0) > 0).map((c) => ({
    label: c.short,
    value: expenses[c.key],
    color: c.color,
  }));

  const resultsSummary = [
    `Monthly Essential Expenses: ${formatPeso(monthlyTotal)}`,
    `Target Months: ${months} months`,
    `Emergency Fund Target: ${formatPeso(targetAmount)}`,
    `Current Savings: ${formatPeso(savings)}`,
    `Remaining to Save: ${formatPeso(gap)}`,
  ].join("\n");

  return (
    <div className="grid items-stretch gap-[18px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Inputs */}
      <div className="flex flex-col">
        <div className="h-full rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(18px,2.5vw,26px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0E1525]">Expense details</h2>
            <button
              type="button"
              onClick={reset}
              className="text-[14px] font-semibold text-brand transition-opacity hover:opacity-80"
            >
              Reset
            </button>
          </div>

          <div className="mb-[14px]">
            <SelectField
              accent="blue"
              label="Target months of coverage"
              tip="A common guideline is 3 to 6 months of essential expenses; more if your income is less stable."
              value={String(months)}
              onChange={(v) => setMonths(parseInt(v, 10))}
            >
              {MONTH_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m} months
                </option>
              ))}
            </SelectField>
          </div>

          <div className="my-[14px] h-px bg-[#EEF1F7]" />

          <div className="mb-[13px] flex items-center justify-between">
            <span className="text-[13px] font-bold tracking-[.06em] text-[#6B7488]">
              MONTHLY ESSENTIAL EXPENSES
            </span>
            <span className="text-[13px] text-[#8A93A6]">Drag to adjust</span>
          </div>
          <div className="space-y-[13px]">
            {EXPENSE_CATEGORIES.map((c) => (
              <GreenSlider
                key={c.key}
                accent="blue"
                label={c.label}
                value={expenses[c.key]}
                display={`₱${formatNumber(expenses[c.key])}`}
                min={0}
                max={80_000}
                step={500}
                onChange={(v) => update(c.key, v)}
              />
            ))}
          </div>

          <div className="my-[14px] h-px bg-[#EEF1F7]" />

          <GreenSlider
            accent="blue"
            label="Current savings"
            tip="Money you have already set aside for emergencies. This reduces how much you still need to save."
            value={savings}
            display={`₱${formatNumber(savings)}`}
            min={0}
            max={500_000}
            step={2_500}
            onChange={setSavings}
          />
        </div>
      </div>

      {/* RIGHT: Purple result */}
      <GradientResult
        accent="purple"
        label="Emergency fund target"
        actions={
          <ResultActions
            calculatorType="Emergency Fund Calculator"
            resultsSummary={resultsSummary}
          />
        }
        eyebrow="Target"
        figure={formatPeso(targetAmount)}
        sub={`${months} months of essential expenses`}
      >
        <MixBar
          accent="purple"
          title="Monthly expense mix"
          segments={mixSegments}
          footer={
            <ProgressLine
              accent="purple"
              label="Your progress"
              valueLabel={`${Math.round(progress)}% saved`}
              pct={progress}
            />
          }
        />
        <BreakdownCard title="Fund breakdown">
          <BreakdownRow label="Monthly expenses" value={formatPeso(monthlyTotal)} />
          <BreakdownRow label="Current savings" value={formatPeso(savings)} tone="positive" />
          <BreakdownRow label="Remaining to save" value={formatPeso(gap)} tone="total" strong />
        </BreakdownCard>
      </GradientResult>

      {/* Compare coverage levels */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)] lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-[20px] font-semibold text-[#0E1525]">Compare coverage levels</h3>
          <span className="text-[15px] text-[#6B7488]">Same expenses · tap to apply</span>
        </div>
        <p className="mb-[18px] mt-[7px] text-[15px] text-[#6B7488]">
          How much you would need at different coverage levels based on ₱{formatNumber(monthlyTotal)}{" "}
          monthly expenses.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {COVERAGE_LEVELS.map((m) => {
            const target = monthlyTotal * m;
            const lvlGap = Math.max(target - savings, 0);
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
                <div className="text-[15px] font-bold text-[#5A6478]">{m} months</div>
                <div className="mb-[2px] mt-[7px] font-display text-[22px] font-bold tabular-nums text-[#0E1525]">
                  ₱{formatNumber(target)}
                </div>
                <div className="text-[15px] text-[#6B7488]">target amount</div>
                <div className="mt-[9px] text-[14px] tabular-nums text-[#5A6478]">
                  Gap ₱{formatNumber(lvlGap)}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
