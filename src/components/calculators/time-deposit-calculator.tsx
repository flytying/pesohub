"use client";

import { useState, useMemo } from "react";
import { ResultActions } from "@/components/calculators/result-actions";
import {
  MoneyField,
  GreenSlider,
  SelectField,
} from "@/components/calculators/green-fields";
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
  type TermUnit,
  type InterestMethod,
} from "@/lib/calculators/time-deposit";
import { CalcErrorState } from "@/components/calculators/calc-error-state";
import { formatPeso, formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const COMPARISON_TERMS = [3, 6, 12, 24, 36];

const TERM_CFG: Record<
  TermUnit,
  { min: number; max: number; step: number; default: number; noun: string }
> = {
  days: { min: 7, max: 1825, step: 1, default: 90, noun: "day" },
  months: { min: 1, max: 60, step: 1, default: 12, noun: "month" },
  years: { min: 1, max: 10, step: 1, default: 2, noun: "year" },
};

const METHOD_LABELS: Record<InterestMethod, string> = {
  simple: "Simple interest",
  monthly: "Compounded monthly",
  quarterly: "Compounded quarterly",
  annual: "Compounded annually",
};

const DEFAULTS = {
  depositAmount: 100_000,
  annualRate: 5.5,
  term: 12,
  termUnit: "months" as TermUnit,
  taxRatePct: 20,
  method: "simple" as InterestMethod,
};

export function TimeDepositCalculator() {
  const [depositAmount, setDepositAmount] = useState(DEFAULTS.depositAmount);
  const [annualRate, setAnnualRate] = useState(DEFAULTS.annualRate);
  const [term, setTerm] = useState(DEFAULTS.term);
  const [termUnit, setTermUnit] = useState<TermUnit>(DEFAULTS.termUnit);
  const [taxRatePct, setTaxRatePct] = useState(DEFAULTS.taxRatePct);
  const [method, setMethod] = useState<InterestMethod>(DEFAULTS.method);

  const reset = () => {
    setDepositAmount(DEFAULTS.depositAmount);
    setAnnualRate(DEFAULTS.annualRate);
    setTerm(DEFAULTS.term);
    setTermUnit(DEFAULTS.termUnit);
    setTaxRatePct(DEFAULTS.taxRatePct);
    setMethod(DEFAULTS.method);
  };

  const changeUnit = (u: TermUnit) => {
    setTermUnit(u);
    setTerm(TERM_CFG[u].default);
  };

  const taxRate = taxRatePct / 100;
  const cfg = TERM_CFG[termUnit];

  const result = useMemo(
    () =>
      calculateTimeDeposit({
        depositAmount,
        annualRate,
        term,
        termUnit,
        taxRate,
        method,
      }),
    [depositAmount, annualRate, term, termUnit, taxRate, method],
  );

  const comparisons = useMemo(
    () =>
      COMPARISON_TERMS.map((m) =>
        calculateForTerm(depositAmount, annualRate, m, taxRate, method),
      ),
    [depositAmount, annualRate, taxRate, method],
  );

  if ("error" in result) {
    return <CalcErrorState message={result.error} onReset={reset} />;
  }

  const validComparisons = comparisons.filter(
    (c): c is Exclude<typeof c, { error: string }> => !("error" in c),
  );

  const totalBalance = depositAmount + result.afterTaxInterest;
  const depositPct =
    totalBalance > 0 ? (depositAmount / totalBalance) * 100 : 100;

  const resultsSummary = [
    `Deposit Amount: ${formatPeso(depositAmount)}`,
    `Annual Interest Rate: ${annualRate.toFixed(2)}%`,
    `Term: ${result.termUsed}`,
    `Interest Method: ${METHOD_LABELS[method]}`,
    `Estimated Gross Interest: ${formatPeso(result.grossInterest)}`,
    `Estimated Tax Withheld (${taxRatePct}%): ${formatPeso(result.taxOnInterest)}`,
    `Estimated After-Tax Interest: ${formatPeso(result.afterTaxInterest)}`,
    `Estimated Net Maturity Value: ${formatPeso(result.netMaturityValue)}`,
    `Effective After-Tax Return: ${result.effectiveAfterTaxReturn.toFixed(2)}%`,
  ].join("\n");

  return (
    <div className="grid items-stretch gap-[18px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Inputs */}
      <div className="flex flex-col">
        <div className="h-full rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(18px,2.5vw,26px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0E1525]">
              Deposit details
            </h2>
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
              tip="Enter the amount you plan to place in a time deposit."
              value={depositAmount}
              onChange={setDepositAmount}
              min={1_000}
              max={5_000_000}
              step={10_000}
            />
            <GreenSlider
              accent="blue"
              label="Annual interest rate"
              tip="Use the gross annual rate quoted by the bank before tax."
              value={annualRate}
              display={`${annualRate.toFixed(2)}%`}
              min={0.25}
              max={12}
              step={0.25}
              onChange={setAnnualRate}
            />
            <SelectField
              accent="blue"
              label="Term unit"
              tip="Choose whether your term is measured in days, months, or years."
              value={termUnit}
              onChange={(v) => changeUnit(v as TermUnit)}
            >
              <option value="days">Days</option>
              <option value="months">Months</option>
              <option value="years">Years</option>
            </SelectField>
            <GreenSlider
              accent="blue"
              label="Term"
              tip="How long your money is locked in. Longer terms may offer higher rates but less access to your funds."
              value={term}
              display={`${term} ${cfg.noun}${term !== 1 ? "s" : ""}`}
              min={cfg.min}
              max={cfg.max}
              step={cfg.step}
              onChange={(v) => setTerm(Math.round(v))}
            />
            <GreenSlider
              accent="blue"
              label="Tax rate"
              tip="Most Philippine peso bank deposit interest is subject to 20% final withholding tax. Check your bank's product terms for exceptions."
              value={taxRatePct}
              display={`${taxRatePct}%`}
              min={0}
              max={30}
              step={1}
              onChange={(v) => setTaxRatePct(Math.round(v))}
            />
            <SelectField
              accent="blue"
              label="Interest calculation method"
              tip="Simple interest is the default for Philippine time deposits. Compounding options are estimates only."
              value={method}
              onChange={(v) => setMethod(v as InterestMethod)}
            >
              <option value="simple">Simple interest</option>
              <option value="monthly">Compounded monthly</option>
              <option value="quarterly">Compounded quarterly</option>
              <option value="annual">Compounded annually</option>
            </SelectField>
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
        eyebrow="Estimated Net Maturity Value"
        figure={formatPeso(result.netMaturityValue)}
        sub={`after ${taxRatePct}% tax on interest · ${result.termUsed}`}
      >
        <MixBar
          accent="purple"
          title="Where your money sits"
          segments={[
            { label: "Deposit", value: depositAmount, color: "#B9A9F2" },
            {
              label: "After-tax interest",
              value: result.afterTaxInterest,
              color: "#5CD2EE",
            },
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
          note={
            method === "simple"
              ? "Simple interest with the chosen withholding tax on interest income."
              : `${METHOD_LABELS[method]} — estimate only; tax shown on total interest.`
          }
        >
          <BreakdownRow
            label="Deposit amount"
            value={formatPeso(depositAmount)}
          />
          <BreakdownRow
            label="+ Estimated Gross Interest"
            value={`+${formatPeso(result.grossInterest)}`}
            tone="positive"
          />
          <BreakdownRow
            label={`− Estimated Tax Withheld (${taxRatePct}%)`}
            value={`−${formatPeso(result.taxOnInterest)}`}
            tone="negative"
          />
          <BreakdownRow
            label="Estimated After-Tax Interest"
            value={formatPeso(result.afterTaxInterest)}
          />
          <BreakdownRow
            label="Estimated Net Maturity Value"
            value={formatPeso(result.netMaturityValue)}
            tone="total"
            strong
          />
          <BreakdownRow
            label="Effective After-Tax Return"
            value={`${result.effectiveAfterTaxReturn.toFixed(2)}% / yr`}
          />
        </BreakdownCard>
        <p className="mt-3 text-[13.5px] leading-[1.55] text-white/70">
          Your net maturity value is your original deposit plus estimated
          interest after tax. Actual bank returns may differ depending on
          compounding, promotional terms, early withdrawal rules, and
          bank-specific product conditions.
          {method === "simple" &&
            " This calculator uses simple interest and does not include compounding or special crediting rules."}
        </p>
      </GradientResult>

      {/* Compare terms */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)] lg:col-span-2">
        <h3 className="font-display text-[20px] font-semibold text-[#0E1525]">
          Compare 3-Month, 6-Month, 12-Month, and 24-Month Time Deposit Returns
        </h3>
        <p className="mb-[18px] mt-[7px] text-[15px] leading-[1.6] text-[#6B7488]">
          Longer terms may produce higher total interest, but they also lock your
          money for a longer period. Compare after-tax interest, not just the
          advertised annual rate — shown for a ₱{formatNumber(depositAmount)}{" "}
          deposit at {annualRate.toFixed(2)}%. Tap a term to apply it.
        </p>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {validComparisons.map((comp) => {
            const on =
              comp.termInMonths === result.termInMonths &&
              termUnit === "months";
            return (
              <button
                key={comp.termInMonths}
                type="button"
                onClick={() => {
                  setTermUnit("months");
                  setTerm(comp.termInMonths);
                }}
                className={cn(
                  "rounded-[15px] border-[1.5px] p-4 text-left transition-colors",
                  on
                    ? "border-brand bg-[#EAF0FF]"
                    : "border-[#E7EBF3] hover:border-[#BCC9F4]",
                )}
              >
                <div className="text-[15px] font-bold text-[#5A6478]">
                  {comp.termUsed}
                </div>
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
