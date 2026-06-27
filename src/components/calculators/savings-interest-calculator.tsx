"use client";

import { useMemo, useState } from "react";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { ResultActions } from "@/components/calculators/result-actions";
import {
  GradientResult,
  SplitBar,
  BreakdownCard,
  BreakdownRow,
} from "@/components/calculators/gradient-result";
import {
  calculateForTerm,
  calculateTimeDeposit,
} from "@/lib/calculators/time-deposit";
import { formatPeso, formatPercent } from "@/lib/formatters";
import { Label } from "@/components/ui/label";

export interface SavingsAccountOption {
  label: string;
  rate: number;
}

interface SavingsInterestCalculatorProps {
  accounts: SavingsAccountOption[];
  title?: string;
}

const CUSTOM_RATE = "__custom__";

const selectClass =
  "flex h-11 w-full rounded-[12px] border border-[#D6DEEC] bg-white px-3 text-[15px] text-[#0E1525] focus-visible:border-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/15";

export function SavingsInterestCalculator({
  accounts,
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

  function reset() {
    setDepositAmount(50_000);
    setSelected(accounts[0]?.label ?? CUSTOM_RATE);
    setAnnualRate(accounts[0]?.rate ?? 3);
    setMonths(12);
    setApplyTax(true);
  }

  const period = useMemo(
    () =>
      calculateTimeDeposit({
        depositAmount,
        annualRate,
        term: months,
        termUnit: "months",
      }),
    [depositAmount, annualRate, months]
  );
  const annual = useMemo(
    () => calculateForTerm(depositAmount, annualRate, 12),
    [depositAmount, annualRate]
  );

  const periodInterest = applyTax ? period.afterTaxInterest : period.grossInterest;
  const annualInterest = applyTax ? annual.afterTaxInterest : annual.grossInterest;
  const monthlyInterest = annualInterest / 12;
  const effectiveRate = applyTax ? annualRate * 0.8 : annualRate;

  const totalBalance = depositAmount + periodInterest;
  const depositPct = totalBalance > 0 ? (depositAmount / totalBalance) * 100 : 100;

  const resultsSummary = [
    `Deposit Amount: ${formatPeso(depositAmount)}`,
    `Interest Rate: ${formatPercent(annualRate)} p.a.`,
    `Holding Period: ${period.termUsed}`,
    `Estimated Monthly Interest: ${formatPeso(monthlyInterest)}`,
    `Estimated Annual Interest: ${formatPeso(annualInterest)}`,
    `Effective Return: ${formatPercent(effectiveRate)} p.a.`,
  ].join("\n");

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Gradient result */}
      <GradientResult
        actions={
          <ResultActions
            calculatorType="Savings Interest Calculator"
            resultsSummary={resultsSummary}
          />
        }
        eyebrow={`Estimated interest · ${period.termUsed}`}
        figure={formatPeso(periodInterest)}
        sub={
          applyTax
            ? "After 20% withholding tax on interest"
            : "Before withholding tax"
        }
      >
        <SplitBar
          leftLabel={`Deposit · ${Math.round(depositPct)}%`}
          leftValue={formatPeso(depositAmount)}
          leftPct={depositPct}
          rightLabel={`Interest · ${Math.round(100 - depositPct)}%`}
          rightValue={formatPeso(periodInterest)}
          total={`Total balance · ${formatPeso(totalBalance)}`}
        />
        <BreakdownCard
          note="Estimates use simple interest. Actual earnings vary — banks may compound daily and rates can change."
        >
          <BreakdownRow
            label="Estimated monthly interest"
            value={formatPeso(monthlyInterest)}
          />
          <BreakdownRow
            label="Estimated annual interest"
            value={formatPeso(annualInterest)}
            tone="positive"
          />
          <BreakdownRow
            label="Effective return"
            value={`${formatPercent(effectiveRate)} p.a.`}
            tone="total"
            strong
          />
        </BreakdownCard>
      </GradientResult>

      {/* RIGHT: Inputs */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,28px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-[18px] font-semibold text-[#0E1525]">
            Account details
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
            max={5_000_000}
            step={1_000}
            helpText="The balance you expect to maintain."
            tooltip="Some promo rates only apply up to a balance cap."
          />
          <div className="space-y-2">
            <Label htmlFor="savings-account" className="text-[15px] font-semibold text-[#344054]">
              Bank / account
            </Label>
            <select
              id="savings-account"
              value={selected}
              onChange={(e) => handleSelect(e.target.value)}
              className={selectClass}
            >
              {accounts.map((a) => (
                <option key={a.label} value={a.label}>
                  {a.label} — {formatPercent(a.rate)} p.a.
                </option>
              ))}
              <option value={CUSTOM_RATE}>Custom rate</option>
            </select>
          </div>
          <CalculatorInput
            label="Annual interest rate"
            value={annualRate}
            onChange={(v) => {
              setAnnualRate(v);
              setSelected(CUSTOM_RATE);
            }}
            min={0.1}
            max={20}
            step={0.05}
            helpText="Gross advertised rate. Adjust for your balance tier."
            tooltip="Promo rates may require conditions or apply only up to a balance cap."
          />
          <CalculatorInput
            label="Holding period (months)"
            value={months}
            onChange={setMonths}
            min={1}
            max={60}
            step={1}
            helpText="How long you plan to keep the money saved."
            tooltip="A longer horizon shows how interest adds up over time."
          />
          <div className="space-y-2">
            <Label htmlFor="apply-tax" className="text-[15px] font-semibold text-[#344054]">
              Tax assumption
            </Label>
            <select
              id="apply-tax"
              value={applyTax ? "after" : "before"}
              onChange={(e) => setApplyTax(e.target.value === "after")}
              className={selectClass}
            >
              <option value="after">After 20% withholding tax</option>
              <option value="before">Before tax (gross)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
