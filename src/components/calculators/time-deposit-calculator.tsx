"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { CalculatorResult } from "@/components/calculators/calculator-result";
import { ResultPanel } from "@/components/calculators/result-panel";
import {
  calculateTimeDeposit,
  calculateForTerm,
} from "@/lib/calculators/time-deposit";
import { formatPeso, formatPercent } from "@/lib/formatters";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const COMPARISON_TERMS = [3, 6, 12, 24];

export function TimeDepositCalculator() {
  const [depositAmount, setDepositAmount] = useState(100_000);
  const [annualRate, setAnnualRate] = useState(5.5);
  const [term, setTerm] = useState(12);
  const [termUnit, setTermUnit] = useState<"months" | "years">("months");

  const result = useMemo(() => {
    return calculateTimeDeposit({ depositAmount, annualRate, term, termUnit });
  }, [depositAmount, annualRate, term, termUnit]);

  const comparisons = useMemo(() => {
    return COMPARISON_TERMS.map((months) =>
      calculateForTerm(depositAmount, annualRate, months),
    );
  }, [depositAmount, annualRate]);

  return (
    <div className="space-y-6">
      <CalculatorShell
        title="Time Deposit Calculator"
        variant="split"
        resultsSummary={[
          `Deposit Amount: ${formatPeso(depositAmount)}`,
          `Annual Interest Rate: ${formatPercent(annualRate)}`,
          `Term: ${result.termUsed}`,
          `Estimated Gross Interest: ${formatPeso(result.grossInterest)}`,
          `Estimated After-Tax Interest: ${formatPeso(result.afterTaxInterest)}`,
          `Estimated Net Maturity Value: ${formatPeso(result.netMaturityValue)}`,
          `Tax on Interest (20%): ${formatPeso(result.taxOnInterest)}`,
        ].join("\n")}
      >
        {/* LEFT: Result Panel */}
        <ResultPanel className="flex flex-col justify-between">
          <div className="text-center">
            <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-gray-300">
              Estimated Maturity Amount
            </p>
            <p className="mt-2 text-[36px] font-semibold tabular-nums text-brand sm:text-[42px] animate-count-up">
              {formatPeso(result.netMaturityValue)}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              After 20% withholding tax on interest · {result.termUsed}
            </p>
          </div>

          {/* Visual breakdown */}
          <div className="my-6 space-y-3">
            <p className="text-[14px] font-medium text-gray-400">
              Return Breakdown
            </p>
            <ReturnBar
              label="After-Tax Interest"
              value={result.afterTaxInterest}
              total={result.grossInterest}
              highlight
            />
            <ReturnBar
              label="Tax Withheld (20%)"
              value={result.taxOnInterest}
              total={result.grossInterest}
            />
          </div>

          <div className="space-y-1">
            <CalculatorResult
              label="Estimated Gross Interest"
              value={formatPeso(result.grossInterest)}
            />
            <CalculatorResult
              label="Estimated After-Tax Interest"
              value={formatPeso(result.afterTaxInterest)}
              highlight
            />
            <CalculatorResult
              label="Estimated Net Maturity Value"
              value={formatPeso(result.netMaturityValue)}
            />
            <CalculatorResult
              label="Term Used"
              value={result.termUsed}
            />
          </div>
        </ResultPanel>

        {/* RIGHT: Inputs */}
        <div className="space-y-6 p-8">
          <CalculatorInput
            label="Deposit Amount"
            value={depositAmount}
            onChange={setDepositAmount}
            prefix="₱"
            min={1_000}
            max={10_000_000}
            step={10_000}
            helpText="Enter the amount you plan to place in the time deposit."
            tooltip="The lump-sum amount you plan to lock in for a fixed period. Most banks require a minimum placement."
          />

          <CalculatorInput
            label="Annual Interest Rate"
            value={annualRate}
            onChange={setAnnualRate}
            min={0.1}
            max={150}
            step={0.1}
            helpText="Enter the estimated annual rate offered by the bank."
            tooltip="The yearly interest rate offered by the bank for this time deposit. Rates may vary by term length and deposit amount."
          />

          <CalculatorInput
            label="Term"
            value={term}
            onChange={setTerm}
            min={1}
            max={termUnit === "years" ? 10 : 120}
            step={1}
            helpText="Enter the deposit duration."
            tooltip="How long your money will be locked in. Longer terms may offer higher rates but less access to your funds."
          />

          <div className="space-y-2">
            <Label htmlFor="term-unit">Term Unit</Label>
            <select
              id="term-unit"
              value={termUnit}
              onChange={(e) =>
                setTermUnit(e.target.value as "months" | "years")
              }
              className="flex h-9 w-full rounded-lg border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20 focus-visible:outline-none"
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
            <p className="text-[14px] text-gray-400">
              Choose months or years.
            </p>
          </div>

          <Separator />

          {/* Deposit Breakdown Table */}
          <div>
            <h3 className="mb-3 text-[16px] font-semibold text-gray-500">
              Deposit Breakdown
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Deposit Amount</span>
                <span className="font-mono tabular-nums">
                  {formatPeso(depositAmount)}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>+ Estimated Gross Interest</span>
                <span className="font-mono tabular-nums text-green-600">
                  +{formatPeso(result.grossInterest)}
                </span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>− Tax on Interest (20%)</span>
                <span className="font-mono tabular-nums text-red-600">
                  −{formatPeso(result.taxOnInterest)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium text-gray-500">
                <span>Estimated Net Maturity Value</span>
                <span className="font-mono tabular-nums">
                  {formatPeso(result.netMaturityValue)}
                </span>
              </div>
            </div>
            <p className="mt-3 text-[14px] text-gray-400">
              Based on simple interest calculation with 20% withholding tax on
              interest income.
            </p>
          </div>
        </div>
      </CalculatorShell>

      {/* Term Comparison Table */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-[16px] font-semibold text-gray-500">
          Compare Different Terms
        </h3>
        <p className="mt-1 text-[14px] text-gray-400">
          Check whether a longer deposit term gives a return that feels worth
          the lock-in period.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {comparisons.map((comp) => (
            <div
              key={comp.termInMonths}
              className={`rounded-lg border p-4 ${
                comp.termInMonths === result.termInMonths
                  ? "border-brand bg-brand/5"
                  : "border-gray-200"
              }`}
            >
              <p className="text-[14px] font-medium text-gray-400">
                {comp.termUsed}
              </p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-gray-500">
                {formatPeso(comp.afterTaxInterest)}
              </p>
              <p className="text-[14px] text-gray-400">after-tax interest</p>
              <p className="mt-2 text-[14px] tabular-nums text-gray-400">
                Maturity: {formatPeso(comp.netMaturityValue)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Return bar sub-component
// ---------------------------------------------------------------------------

function ReturnBar({
  label,
  value,
  total,
  highlight = false,
}: {
  label: string;
  value: number;
  total: number;
  highlight?: boolean;
}) {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[14px]">
        <span
          className={highlight ? "font-medium text-gray-500" : "text-gray-400"}
        >
          {label}
        </span>
        <span
          className={highlight ? "font-bold text-brand" : "text-gray-400"}
        >
          {formatPeso(value)}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            highlight ? "bg-brand" : "bg-gray-300"
          }`}
          style={{ width: `${Math.max(percentage, 2)}%` }}
        />
      </div>
    </div>
  );
}
