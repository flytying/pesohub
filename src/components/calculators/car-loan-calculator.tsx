"use client";

import { useState, useMemo, useId } from "react";
import { ResultActions } from "@/components/calculators/result-actions";
import {
  GradientResult,
  SplitBar,
  BreakdownCard,
  BreakdownRow,
} from "@/components/calculators/gradient-result";
import { Info } from "lucide-react";
import { calculateLoan } from "@/lib/calculators/loan";
import { formatPeso } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface CarLoanCalculatorProps {
  beforeYouStart?: { title?: string; description: string; items: string[] };
}

const DEFAULTS = {
  vehiclePrice: 1_200_000,
  downPaymentPercent: 20,
  termMonths: 60,
  interestRate: 6.5,
};

const TERM_PRESETS = [36, 48, 60];
const COMPARE_TERMS = [24, 36, 48, 60];

// ---- inline range field ----------------------------------------------------

function rangeFill(value: number, min: number, max: number) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return `linear-gradient(to right,#1535C7 0%,#1535C7 ${pct}%,#E3E8F2 ${pct}%,#E3E8F2 100%)`;
}

function Field({
  label,
  adornment,
  prefix,
  suffix,
  value,
  onChange,
  min,
  max,
  step,
  minLabel,
  maxLabel,
  help,
  children,
}: {
  label: string;
  adornment?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  help: string;
  children?: React.ReactNode;
}) {
  const id = useId();
  const thumb = "rs-" + id.replace(/[:]/g, "");
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="flex items-center gap-1.5">
          <label htmlFor={id} className="text-[15px] font-semibold text-[#344054]">
            {label}
          </label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                type="button"
                aria-label={`About ${label}`}
                className="inline-flex text-[#C4CCDB] transition-colors hover:text-[#6B7488]"
              >
                <Info className="size-4" />
              </TooltipTrigger>
              <TooltipContent side="top">{help}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
        {adornment}
      </div>
      <div className="flex items-center gap-[10px]">
        <div className="relative flex-1">
          {prefix && (
            <span className="pointer-events-none absolute left-[14px] top-1/2 -translate-y-1/2 font-bold text-[#5A6478]">
              {prefix}
            </span>
          )}
          <input
            id={id}
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!isNaN(v)) onChange(Math.min(Math.max(v, min), max));
              else onChange(min);
            }}
            className={cn(
              "h-[52px] w-full rounded-[12px] border border-[#D6DEEC] bg-white font-display text-[18px] font-bold text-[#0E1525] outline-none transition-shadow focus:border-brand focus:shadow-[0_0_0_3px_rgba(21,53,199,.12)]",
              prefix ? "pl-8" : "pl-[14px]",
              suffix ? "pr-9" : "pr-[14px]"
            )}
          />
          {suffix && (
            <span className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 font-bold text-[#5A6478]">
              {suffix}
            </span>
          )}
        </div>
        {children}
      </div>
      <style>{`#${thumb}{-webkit-appearance:none;width:100%;height:6px;border-radius:6px;outline:none;cursor:pointer;margin-top:14px}#${thumb}::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#1535C7;border:3px solid #fff;box-shadow:0 2px 6px rgba(21,53,199,.4);cursor:pointer}#${thumb}::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#1535C7;border:3px solid #fff;cursor:pointer}`}</style>
      <input
        id={thumb}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ background: rangeFill(value, min, max) }}
      />
      <div className="mt-[6px] flex justify-between text-[13px] text-[#8A93A6]">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}

// ---- component -------------------------------------------------------------

export function CarLoanCalculator(_: CarLoanCalculatorProps = {}) {
  const [vehiclePrice, setVehiclePrice] = useState(DEFAULTS.vehiclePrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(DEFAULTS.downPaymentPercent);
  const [termMonths, setTermMonths] = useState(DEFAULTS.termMonths);
  const [interestRate, setInterestRate] = useState(DEFAULTS.interestRate);
  const [showAll, setShowAll] = useState(false);

  const reset = () => {
    setVehiclePrice(DEFAULTS.vehiclePrice);
    setDownPaymentPercent(DEFAULTS.downPaymentPercent);
    setTermMonths(DEFAULTS.termMonths);
    setInterestRate(DEFAULTS.interestRate);
  };

  const downPaymentAmount = vehiclePrice * (downPaymentPercent / 100);
  const loanAmount = Math.max(vehiclePrice - downPaymentAmount, 0);

  const result = useMemo(() => {
    if (loanAmount <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalPayment: 0, schedule: [] };
    }
    return calculateLoan({ principal: loanAmount, annualInterestRate: interestRate, termMonths });
  }, [loanAmount, interestRate, termMonths]);

  const totalCost = downPaymentAmount + result.totalPayment;
  const totalOfPayments = loanAmount + result.totalInterest;
  const principalPct = totalOfPayments > 0 ? (loanAmount / totalOfPayments) * 100 : 100;

  const comparisons = useMemo(
    () =>
      COMPARE_TERMS.map((m) => {
        const l = loanAmount > 0
          ? calculateLoan({ principal: loanAmount, annualInterestRate: interestRate, termMonths: m })
          : { monthlyPayment: 0, totalInterest: 0 };
        return { months: m, monthly: l.monthlyPayment, interest: l.totalInterest };
      }),
    [loanAmount, interestRate]
  );

  const termYears = termMonths / 12;
  const termLabel =
    termMonths % 12 === 0 ? `${termYears} ${termYears === 1 ? "yr" : "yrs"}` : `${termMonths} mo`;

  const resultsSummary = [
    `Vehicle Price: ${formatPeso(vehiclePrice)}`,
    `Down Payment (${downPaymentPercent}%): ${formatPeso(downPaymentAmount)}`,
    `Loan Amount: ${formatPeso(loanAmount)}`,
    `Interest Rate: ${interestRate}% p.a.`,
    `Term: ${termMonths} months`,
    `Monthly Payment: ${formatPeso(result.monthlyPayment)}`,
    `Total Interest: ${formatPeso(result.totalInterest)}`,
    `Total Cost: ${formatPeso(totalCost)}`,
  ].join("\n");

  const visibleRows = showAll ? result.schedule : result.schedule.slice(0, 12);

  return (
    <div className="space-y-[18px]">
      <div className="grid items-stretch gap-[18px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* LEFT: Inputs */}
        <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(18px,2.5vw,26px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <div className="mb-[18px] flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0E1525]">Loan details</h2>
            <button type="button" onClick={reset} className="text-[14px] font-bold text-brand transition-colors hover:text-brand-light">
              Reset
            </button>
          </div>
          <div className="space-y-6">
            <Field
              label="Car price"
              prefix="₱"
              value={vehiclePrice}
              onChange={setVehiclePrice}
              min={200_000}
              max={5_000_000}
              step={10_000}
              minLabel="₱200,000"
              maxLabel="₱5,000,000"
              help="The total vehicle price before financing."
            />
            <Field
              label="Down payment"
              adornment={
                <span className="text-[14px] font-bold text-brand">
                  = {formatPeso(downPaymentAmount, 0)}
                </span>
              }
              suffix="%"
              value={downPaymentPercent}
              onChange={setDownPaymentPercent}
              min={0}
              max={60}
              step={1}
              minLabel="0%"
              maxLabel="60%"
              help="Amount you pay upfront — a bigger down payment lowers the loan."
            />
            <Field
              label="Loan term (months)"
              value={termMonths}
              onChange={setTermMonths}
              min={12}
              max={84}
              step={6}
              minLabel="12 mo"
              maxLabel="84 mo"
              help={`Number of months to repay — currently ${termLabel}.`}
            >
              <div className="flex shrink-0 gap-1 self-center rounded-[11px] bg-[#EEF1F7] p-1">
                {TERM_PRESETS.map((m) => {
                  const on = termMonths === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTermMonths(m)}
                      className={cn(
                        "rounded-[9px] px-3 py-[9px] text-[14px] font-semibold leading-none transition-colors",
                        on ? "bg-white text-brand shadow-[0_1px_3px_rgba(16,24,40,.12)]" : "text-[#6B7488]"
                      )}
                    >
                      {m}mo
                    </button>
                  );
                })}
              </div>
            </Field>
            <Field
              label="Annual interest rate"
              suffix="%"
              value={interestRate}
              onChange={setInterestRate}
              min={1}
              max={20}
              step={0.05}
              minLabel="1%"
              maxLabel="20%"
              help="The estimated annual interest rate offered by the lender."
            />
          </div>
        </div>

        {/* RIGHT: Gradient result */}
        <GradientResult
          label="Estimated monthly payment"
          actions={<ResultActions calculatorType="Car Loan Calculator" resultsSummary={resultsSummary} />}
          eyebrow="Per month"
          figure={formatPeso(result.monthlyPayment)}
          sub={`over ${termMonths} months`}
        >
          {loanAmount > 0 && (
            <SplitBar
              leftLabel={`Principal · ${Math.round(principalPct)}%`}
              leftValue={formatPeso(loanAmount)}
              leftPct={principalPct}
              rightLabel={`Interest · ${Math.round(100 - principalPct)}%`}
              rightValue={formatPeso(result.totalInterest)}
              total={`Total of payments · ${formatPeso(totalOfPayments)}`}
            />
          )}
          <BreakdownCard
            title="Cost breakdown"
            note="Based on standard monthly amortization (declining-balance interest). Total cost includes your down payment."
          >
            <BreakdownRow label="Car price" value={formatPeso(vehiclePrice)} />
            <BreakdownRow label={`– Down payment (${downPaymentPercent}%)`} value={`−${formatPeso(downPaymentAmount)}`} tone="negative" />
            <BreakdownRow label="Loan amount" value={formatPeso(loanAmount)} />
            <BreakdownRow label="+ Total interest" value={`+${formatPeso(result.totalInterest)}`} tone="positive" />
            <BreakdownRow label="Total cost (incl. down payment)" value={formatPeso(totalCost)} tone="total" strong />
          </BreakdownCard>
        </GradientResult>
      </div>

      {/* Compare loan terms */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,28px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-[20px] font-semibold text-[#0E1525]">Compare loan terms</h3>
          <span className="text-[13.5px] text-[#8A93A6]">Same price &amp; rate · tap to apply</span>
        </div>
        <p className="mt-1 text-[14.5px] text-[#6B7488]">
          A longer term lowers the monthly payment but usually raises total interest — at{" "}
          {interestRate.toFixed(2)}% on a {formatPeso(loanAmount)} loan.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {comparisons.map((c) => {
            const on = c.months === termMonths;
            return (
              <button
                key={c.months}
                type="button"
                onClick={() => setTermMonths(c.months)}
                className={cn(
                  "rounded-[14px] border p-4 text-left transition-colors",
                  on ? "border-brand bg-[#EAF0FF]" : "border-[#E7EBF3] hover:border-[#BCC9F4]"
                )}
              >
                <div className="text-[14px] font-semibold text-[#5A6478]">{c.months} Months</div>
                <div className="mt-1 font-display text-[22px] font-bold tabular-nums text-[#0E1525]">
                  {formatPeso(c.monthly, 0)}
                </div>
                <div className="text-[13px] text-[#6B7488]">per month</div>
                <div className="mt-2 text-[13px] tabular-nums text-[#6B7488]">
                  Interest {formatPeso(c.interest, 0)}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Amortization schedule */}
      {result.schedule.length > 0 && (
        <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(18px,2.4vw,26px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <h3 className="font-display text-[20px] font-semibold text-[#0E1525]">Amortization schedule</h3>
          <p className="mb-4 mt-1 text-[15px] text-[#6B7488]">
            How each fixed monthly payment splits between principal and interest as your balance falls.
          </p>
          <div className="overflow-x-auto rounded-[14px] border border-[#EEF1F7]">
            <table className="w-full min-w-[520px] text-[14px] tabular-nums">
              <thead>
                <tr className="bg-[#F5F7FC] text-[13px] font-bold tracking-[.04em] text-[#6B7488]">
                  <th className="px-4 py-3 text-left">MONTH</th>
                  <th className="px-4 py-3 text-right">PAYMENT</th>
                  <th className="px-4 py-3 text-right">PRINCIPAL</th>
                  <th className="px-4 py-3 text-right">INTEREST</th>
                  <th className="px-4 py-3 text-right">BALANCE</th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row, i) => (
                  <tr key={i} className={cn("border-t border-[#F1F4F9]", i % 2 ? "bg-[#FBFCFE]" : "bg-white")}>
                    <td className="px-4 py-[11px] font-semibold text-[#344054]">{row.month}</td>
                    <td className="px-4 py-[11px] text-right text-[#475069]">{formatPeso(row.payment)}</td>
                    <td className="px-4 py-[11px] text-right text-[#475069]">{formatPeso(row.principal)}</td>
                    <td className="px-4 py-[11px] text-right text-[#475069]">{formatPeso(row.interest)}</td>
                    <td className="px-4 py-[11px] text-right font-semibold text-[#0E1525]">{formatPeso(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {result.schedule.length > 12 && (
            <div className="mt-4 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                className="rounded-[11px] border border-[#D6DEEC] bg-white px-5 py-[11px] text-[15px] font-bold text-brand transition-colors hover:bg-[#FBFCFE]"
              >
                {showAll ? "Show less" : `Show full schedule (${result.schedule.length} months)`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
