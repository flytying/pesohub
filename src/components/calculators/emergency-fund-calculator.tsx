"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { CalculatorResult } from "@/components/calculators/calculator-result";
import { ResultPanel } from "@/components/calculators/result-panel";
import { formatPeso } from "@/lib/formatters";
import { Separator } from "@/components/ui/separator";
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
  {
    label: "Housing (Rent / Mortgage)",
    key: "housing",
    helpText: "Monthly rent or mortgage payment.",
    tooltip:
      "Include your monthly rent or mortgage amortization. If you own your home outright, enter 0.",
    defaultValue: 10_000,
  },
  {
    label: "Food & Groceries",
    key: "food",
    helpText: "Monthly food and grocery spending.",
    tooltip:
      "Estimate your typical monthly spending on food, groceries, and dining out.",
    defaultValue: 8_000,
  },
  {
    label: "Utilities & Bills",
    key: "utilities",
    helpText: "Electricity, water, internet, phone.",
    tooltip:
      "Include electricity, water, internet, mobile phone, and other recurring utility bills.",
    defaultValue: 4_000,
  },
  {
    label: "Transportation",
    key: "transport",
    helpText: "Commute, fuel, or car expenses.",
    tooltip:
      "Include daily commute costs, fuel, parking, or ride-hailing expenses.",
    defaultValue: 3_000,
  },
  {
    label: "Loan Payments",
    key: "loans",
    helpText: "Existing loan or credit card payments.",
    tooltip:
      "Include monthly payments for personal loans, car loans, credit cards, or other debt obligations.",
    defaultValue: 0,
  },
  {
    label: "Insurance & Health",
    key: "insurance",
    helpText: "Health insurance or HMO premiums.",
    tooltip:
      "Include private health insurance, HMO premiums, or regular medical costs not covered by PhilHealth.",
    defaultValue: 0,
  },
  {
    label: "Other Essential Expenses",
    key: "other",
    helpText: "Education, childcare, or other needs.",
    tooltip:
      "Include any other recurring essential expenses like education, childcare, or dependent support.",
    defaultValue: 0,
  },
];

export function EmergencyFundCalculator() {
  const [expenses, setExpenses] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const cat of EXPENSE_CATEGORIES) {
      initial[cat.key] = cat.defaultValue;
    }
    return initial;
  });
  const [targetMonths, setTargetMonths] = useState(6);
  const [currentSavings, setCurrentSavings] = useState(0);

  const result = useMemo(() => {
    const monthlyTotal = Object.values(expenses).reduce((a, b) => a + b, 0);
    const targetAmount = monthlyTotal * targetMonths;
    const gap = Math.max(targetAmount - currentSavings, 0);
    const progressPercent =
      targetAmount > 0
        ? Math.min((currentSavings / targetAmount) * 100, 100)
        : 0;

    return { monthlyTotal, targetAmount, gap, progressPercent };
  }, [expenses, targetMonths, currentSavings]);

  const updateExpense = (key: string, value: number) => {
    setExpenses((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <CalculatorShell
        title="Emergency Fund Calculator"
        variant="split"
        resultsSummary={[
          `Monthly Essential Expenses: ${formatPeso(result.monthlyTotal)}`,
          `Target Months: ${targetMonths} months`,
          `Emergency Fund Target: ${formatPeso(result.targetAmount)}`,
          `Current Savings: ${formatPeso(currentSavings)}`,
          `Remaining to Save: ${formatPeso(result.gap)}`,
        ].join("\n")}
        beforeYouStart={{
          description:
            "An emergency fund covers your essential monthly expenses if you lose your income or face an unexpected cost. Use realistic amounts based on your actual spending.",
          items: [
            "List only essential expenses you cannot skip",
            "Use your actual monthly amounts, not ideal budgets",
            "Start with 3 months as a minimum target",
            "Aim for 6 months if your income is irregular or you have dependents",
            "Keep your emergency fund in a high-interest savings account for easy access",
          ],
        }}
      >
        {/* LEFT: Result Panel */}
        <ResultPanel className="flex flex-col">
          <div className="text-center">
            <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-gray-300">
              Emergency Fund Target
            </p>
            <p className="mt-2 text-[36px] font-semibold tabular-nums text-brand sm:text-[42px] animate-count-up">
              {formatPeso(result.targetAmount)}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              {targetMonths} months of essential expenses
            </p>
          </div>

          {/* Expense breakdown donut */}
          <div className="my-6 flex justify-center">
            <ExpenseDonut expenses={expenses} />
          </div>

          {/* Progress bar */}
          <div className="mb-6 space-y-3">
            <p className="text-[14px] font-medium text-gray-400">
              Your Progress
            </p>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-gray-400">Saved so far</span>
                <span className="font-bold text-brand">
                  {result.progressPercent.toFixed(0)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-brand transition-all duration-500"
                  style={{
                    width: `${Math.max(result.progressPercent, 2)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <CalculatorResult
              label="Monthly Expenses"
              value={formatPeso(result.monthlyTotal)}
            />
            <CalculatorResult
              label="Emergency Fund Target"
              value={formatPeso(result.targetAmount)}
            />
            <CalculatorResult
              label="Current Savings"
              value={formatPeso(currentSavings)}
            />
            <CalculatorResult
              label="Remaining to Save"
              value={formatPeso(result.gap)}
              highlight
            />
          </div>
        </ResultPanel>

        {/* RIGHT: Inputs */}
        <div className="space-y-6 p-8">
          <div className="space-y-2">
            <Label htmlFor="target-months">Target Months of Coverage</Label>
            <select
              id="target-months"
              value={targetMonths}
              onChange={(e) => setTargetMonths(Number(e.target.value))}
              className="flex h-9 w-full rounded-lg border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20 focus-visible:outline-none"
            >
              {MONTH_OPTIONS.map((m) => (
                <option key={m} value={m}>
                  {m} months
                </option>
              ))}
            </select>
            <p className="text-[14px] text-gray-300">
              Financial advisors typically recommend 3 to 6 months.
            </p>
          </div>

          <Separator />

          <p className="text-[14px] font-semibold uppercase tracking-wide text-gray-400">
            Monthly Essential Expenses
          </p>

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

          <Separator />

          <CalculatorInput
            label="Current Savings"
            value={currentSavings}
            onChange={setCurrentSavings}
            prefix="₱"
            min={0}
            max={10_000_000}
            step={1_000}
            helpText="How much you have saved toward your emergency fund so far."
            tooltip="Enter the amount you currently have set aside specifically for emergencies. This helps calculate how much more you need to save."
          />
        </div>
      </CalculatorShell>

      {/* Month comparison */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-[16px] font-semibold text-gray-500">
          Compare Coverage Levels
        </h3>
        <p className="mt-1 text-[14px] text-gray-400">
          See how much you would need at different coverage levels based on your
          current monthly expenses.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MONTH_OPTIONS.map((m) => {
            const target = result.monthlyTotal * m;
            return (
              <div
                key={m}
                className={`rounded-lg border p-4 ${
                  m === targetMonths
                    ? "border-brand bg-brand/5"
                    : "border-gray-200"
                }`}
              >
                <p className="text-[14px] font-medium text-gray-400">
                  {m} months
                </p>
                <p className="mt-1 text-lg font-semibold tabular-nums text-gray-500">
                  {formatPeso(target)}
                </p>
                <p className="text-[14px] text-gray-400">target amount</p>
                <p className="mt-2 text-[14px] tabular-nums text-gray-400">
                  Gap: {formatPeso(Math.max(target - currentSavings, 0))}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Expense breakdown donut (SVG)
// ---------------------------------------------------------------------------

const DONUT_COLORS = [
  "#093CB5", // brand
  "#00D2D8", // cyan
  "#E57300", // orange
  "#6366f1", // indigo
  "#10b981", // emerald
  "#f59e0b", // amber
  "#8b5cf6", // violet
];

function ExpenseDonut({ expenses }: { expenses: Record<string, number> }) {
  const entries = EXPENSE_CATEGORIES
    .map((cat, i) => ({
      label: cat.label.split("(")[0].trim(),
      value: expenses[cat.key],
      color: DONUT_COLORS[i % DONUT_COLORS.length],
    }))
    .filter((e) => e.value > 0);

  const total = entries.reduce((s, e) => s + e.value, 0);
  if (total === 0) return null;

  const size = 160;
  const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {entries.map((entry) => {
          const pct = entry.value / total;
          const dashLength = pct * circumference;
          const dashOffset = -offset * circumference;
          offset += pct;
          return (
            <circle
              key={entry.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={entry.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              className="transition-all duration-500"
            />
          );
        })}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-gray-500 text-[14px] font-semibold"
        >
          {formatPeso(total, 0)}
        </text>
      </svg>
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
        {entries.map((entry) => (
          <div key={entry.label} className="flex items-center gap-1.5 text-[12px] text-gray-400">
            <span
              className="inline-block size-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.label}
          </div>
        ))}
      </div>
    </div>
  );
}
