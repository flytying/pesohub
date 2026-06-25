"use client";

import { useMemo, useState } from "react";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { CalculatorResult } from "@/components/calculators/calculator-result";
import { ResultPanel } from "@/components/calculators/result-panel";
import {
  calculateForTerm,
  calculateTimeDeposit,
} from "@/lib/calculators/time-deposit";
import { formatPeso, formatPercent } from "@/lib/formatters";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

export interface SavingsAccountOption {
  /** Display label, e.g. "Maya — Personal Savings". */
  label: string;
  /** Annual interest rate as a percentage (e.g. 3.25). */
  rate: number;
}

interface SavingsInterestCalculatorProps {
  /** Accounts that seed the picker. The first option seeds the default rate. */
  accounts: SavingsAccountOption[];
  /** Optional title shown in the calculator shell. */
  title?: string;
}

const CUSTOM_RATE = "__custom__";

/**
 * Estimates how much interest a savings deposit can earn.
 *
 * Uses simple interest with an optional 20% final withholding tax on interest
 * income, consistent with the site's time deposit calculator. Savings accounts
 * compound in practice, so figures are estimates for comparison, not exact
 * earnings.
 */
export function SavingsInterestCalculator({
  accounts,
  title = "Savings Interest Calculator",
}: SavingsInterestCalculatorProps) {
  const [depositAmount, setDepositAmount] = useState(50_000);
  const [selected, setSelected] = useState(accounts[0]?.label ?? CUSTOM_RATE);
  const [annualRate, setAnnualRate] = useState(accounts[0]?.rate ?? 3);
  const [months, setMonths] = useState(12);
  const [applyTax, setApplyTax] = useState(true);

  function handleSelect(value: string) {
    setSelected(value);
    const match = accounts.find((a) => a.label === value);
    if (match) setAnnualRate(match.rate);
  }

  // Interest over the chosen holding period.
  const period = useMemo(
    () =>
      calculateTimeDeposit({
        depositAmount,
        annualRate,
        term: months,
        termUnit: "months",
      }),
    [depositAmount, annualRate, months],
  );

  // Interest over a full year (for the annual + monthly figures).
  const annual = useMemo(
    () => calculateForTerm(depositAmount, annualRate, 12),
    [depositAmount, annualRate],
  );

  const periodInterest = applyTax
    ? period.afterTaxInterest
    : period.grossInterest;
  const annualInterest = applyTax ? annual.afterTaxInterest : annual.grossInterest;
  const monthlyInterest = annualInterest / 12;
  const effectiveRate = applyTax ? annualRate * 0.8 : annualRate;

  return (
    <div className="space-y-6">
      <CalculatorShell
        title={title}
        variant="split"
        resultsSummary={[
          `Deposit Amount: ${formatPeso(depositAmount)}`,
          `Interest Rate: ${formatPercent(annualRate)} p.a.`,
          `Holding Period: ${period.termUsed}`,
          `Estimated Monthly Interest: ${formatPeso(monthlyInterest)}`,
          `Estimated Annual Interest: ${formatPeso(annualInterest)}`,
          `Effective Return: ${formatPercent(effectiveRate)} p.a.`,
        ].join("\n")}
      >
        {/* LEFT: Result Panel */}
        <ResultPanel className="flex flex-col justify-between">
          <div className="text-center">
            <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-gray-300">
              Estimated Interest ({period.termUsed})
            </p>
            <p className="mt-2 animate-count-up text-[36px] font-semibold tabular-nums text-brand sm:text-[42px]">
              {formatPeso(periodInterest)}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              {applyTax
                ? "After 20% withholding tax on interest"
                : "Before withholding tax"}
            </p>
          </div>

          <div className="my-6 space-y-1">
            <CalculatorResult
              label="Estimated Monthly Interest"
              value={formatPeso(monthlyInterest)}
            />
            <CalculatorResult
              label="Estimated Annual Interest"
              value={formatPeso(annualInterest)}
              highlight
            />
            <CalculatorResult
              label={`Interest over ${period.termUsed}`}
              value={formatPeso(periodInterest)}
            />
            <CalculatorResult
              label="Effective Return"
              value={`${formatPercent(effectiveRate)} p.a.`}
            />
          </div>

          <p className="text-[14px] text-gray-400">
            Estimates use simple interest. Actual earnings vary as banks may
            compound daily and rates can change.
          </p>
        </ResultPanel>

        {/* RIGHT: Inputs */}
        <div className="space-y-6 p-8">
          <CalculatorInput
            label="Deposit Amount"
            value={depositAmount}
            onChange={setDepositAmount}
            prefix="₱"
            min={1_000}
            max={5_000_000}
            step={1_000}
            helpText="Enter the amount you plan to keep in the savings account."
            tooltip="The balance you expect to maintain. Some promo rates only apply up to a balance cap."
          />

          <div className="space-y-2">
            <Label htmlFor="savings-account">Bank / Account</Label>
            <select
              id="savings-account"
              value={selected}
              onChange={(e) => handleSelect(e.target.value)}
              className="flex h-9 w-full rounded-lg border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20 focus-visible:outline-none"
            >
              {accounts.map((a) => (
                <option key={a.label} value={a.label}>
                  {a.label} — {formatPercent(a.rate)} p.a.
                </option>
              ))}
              <option value={CUSTOM_RATE}>Custom rate</option>
            </select>
            <p className="text-[14px] text-gray-400">
              Pick an account to prefill its rate, or choose a custom rate.
            </p>
          </div>

          <CalculatorInput
            label="Annual Interest Rate"
            value={annualRate}
            onChange={(v) => {
              setAnnualRate(v);
              setSelected(CUSTOM_RATE);
            }}
            min={0.1}
            max={20}
            step={0.05}
            helpText="Gross advertised rate. Adjust if your balance qualifies for a different tier."
            tooltip="The yearly interest rate the account pays. Promo rates may require conditions or apply only up to a balance cap."
          />

          <CalculatorInput
            label="Holding Period (Months)"
            value={months}
            onChange={setMonths}
            min={1}
            max={60}
            step={1}
            helpText="How long you plan to keep the money saved."
            tooltip="Savings accounts stay accessible, but a longer horizon shows how interest adds up over time."
          />

          <div className="space-y-2">
            <Label htmlFor="apply-tax">Tax Assumption</Label>
            <select
              id="apply-tax"
              value={applyTax ? "after" : "before"}
              onChange={(e) => setApplyTax(e.target.value === "after")}
              className="flex h-9 w-full rounded-lg border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20 focus-visible:outline-none"
            >
              <option value="after">After 20% withholding tax</option>
              <option value="before">Before tax (gross)</option>
            </select>
            <p className="text-[14px] text-gray-400">
              Interest income from deposits is generally subject to a 20% final
              withholding tax.
            </p>
          </div>

          <Separator />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Deposit Amount</span>
              <span className="font-mono tabular-nums">
                {formatPeso(depositAmount)}
              </span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>+ Estimated Interest ({period.termUsed})</span>
              <span className="font-mono tabular-nums text-green-600">
                +{formatPeso(periodInterest)}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium text-gray-500">
              <span>Estimated Balance</span>
              <span className="font-mono tabular-nums">
                {formatPeso(depositAmount + periodInterest)}
              </span>
            </div>
          </div>
        </div>
      </CalculatorShell>
    </div>
  );
}
