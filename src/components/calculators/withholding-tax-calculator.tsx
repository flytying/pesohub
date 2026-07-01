"use client";

import { useState, useMemo, useId } from "react";
import { Info, ChevronDown } from "lucide-react";
import { ResultActions } from "@/components/calculators/result-actions";
import {
  GradientResult,
  MixBar,
  ProgressLine,
  BreakdownCard,
} from "@/components/calculators/gradient-result";
import {
  calculateWithholdingTaxDetailed,
  PERIODS_PER_YEAR,
  PAY_FREQUENCY_LABELS,
  type PayFrequency,
} from "@/lib/calculators/withholding-tax-detailed";
import { formatPeso } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { InfoTip } from "@/components/calculators/info-tip";
import { TRAIN_BRACKETS } from "@/data/calculators/withholding-tax";

const FREQUENCIES: PayFrequency[] = ["monthly", "semi-monthly", "weekly", "daily"];

const GROSS_LABELS: Record<PayFrequency, string> = {
  monthly: "Gross Monthly Pay",
  "semi-monthly": "Gross Semi-Monthly Pay",
  weekly: "Gross Weekly Pay",
  daily: "Gross Daily Pay",
};

const RATE_PILL: Record<string, string> = {
  "0%": "bg-[#EEF1F7] text-[#5B6678]",
  "15%": "bg-[#E4EDFB] text-[#1E5FD0]",
  "20%": "bg-[#E7E9FB] text-[#3D49C4]",
  "25%": "bg-[#EDE8FC] text-[#6D4DE0]",
  "30%": "bg-[#FBF0DC] text-[#B7791F]",
  "35%": "bg-[#FBE6E7] text-[#C2484D]",
};

function greenFill(value: number, min: number, max: number) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return `linear-gradient(to right,#0B8270 0%,#0B8270 ${pct}%,#E3E8F2 ${pct}%,#E3E8F2 100%)`;
}

function MoneyField({
  label,
  help,
  value,
  onChange,
  max,
  step,
}: {
  label: React.ReactNode;
  help: string;
  value: number;
  onChange: (v: number) => void;
  max: number;
  step: number;
}) {
  const id = useId();
  const thumb = "wt-" + id.replace(/[:]/g, "");
  return (
    <div>
      <div className="mb-[7px] flex items-center gap-1.5">
        <label htmlFor={id} className="text-[14px] font-bold text-[#0E1525]">
          {label}
        </label>
        <InfoTip text={help} label={typeof label === "string" ? label : undefined} />
      </div>
      <div className="flex items-center rounded-[12px] border border-[#D6DEEC] bg-white px-[14px] transition-shadow focus-within:border-[#0B8270] focus-within:shadow-[0_0_0_3px_rgba(11,130,112,.12)]">
        <span className="mr-2 font-mono text-[15px] text-[#6B7488]">₱</span>
        <input
          id={id}
          type="number"
          value={value === 0 ? "" : value}
          placeholder="0"
          min={0}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onChange(isNaN(v) ? 0 : Math.max(0, v));
          }}
          className="min-w-0 flex-1 border-none bg-transparent py-3 font-mono text-[16px] text-[#0E1525] outline-none"
        />
      </div>
      <style>{`#${thumb}{-webkit-appearance:none;width:100%;height:6px;border-radius:6px;outline:none;cursor:pointer;margin-top:12px}#${thumb}::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:3px solid #0B8270;box-shadow:0 2px 6px rgba(11,130,112,.3);cursor:pointer}#${thumb}::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid #0B8270;cursor:pointer}`}</style>
      <input
        id={thumb}
        type="range"
        aria-label={typeof label === "string" ? label : undefined}
        min={0}
        max={max}
        step={step}
        value={Math.min(value, max)}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ background: greenFill(Math.min(value, max), 0, max) }}
      />
    </div>
  );
}

function SelectField({
  label,
  help,
  value,
  onChange,
  children,
}: {
  label: string;
  help: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <div className="mb-[7px] flex items-center gap-1.5">
        <label htmlFor={id} className="text-[14px] font-bold text-[#0E1525]">
          {label}
        </label>
        <InfoTip text={help} label={label} />
      </div>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer appearance-none rounded-[12px] border border-[#D6DEEC] bg-white py-3 pl-[14px] pr-10 text-[15px] text-[#0E1525] outline-none transition-shadow focus:border-[#0B8270] focus:shadow-[0_0_0_3px_rgba(11,130,112,.12)]"
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-[14px] top-1/2 size-[18px] -translate-y-1/2 text-[#6B7488]" />
      </div>
    </div>
  );
}

export function WithholdingTaxCalculator() {
  const [frequency, setFrequency] = useState<PayFrequency>("monthly");
  const [gross, setGross] = useState(35_000);
  const [taxableAllow, setTaxableAllow] = useState(0);
  const [exemptAllow, setExemptAllow] = useState(0);
  const [manual, setManual] = useState(false);
  const [sssManual, setSssManual] = useState(1750);
  const [philManual, setPhilManual] = useState(875);
  const [pagibigManual, setPagibigManual] = useState(200);

  const reset = () => {
    setFrequency("monthly");
    setGross(35_000);
    setTaxableAllow(0);
    setExemptAllow(0);
    setManual(false);
  };

  const result = useMemo(
    () =>
      calculateWithholdingTaxDetailed({
        periodGross: gross,
        frequency,
        taxableAllowances: taxableAllow,
        taxExemptAllowances: exemptAllow,
        autoEstimateContributions: !manual,
        sss: sssManual,
        philhealth: philManual,
        pagibig: pagibigManual,
      }),
    [gross, frequency, taxableAllow, exemptAllow, manual, sssManual, philManual, pagibigManual]
  );

  // Monthly-equivalent figures for display
  const toMonthly = PERIODS_PER_YEAR[frequency] / 12;
  const mGross = gross * toMonthly;
  const mTaxableAllow = taxableAllow * toMonthly;
  const mExemptAllow = exemptAllow * toMonthly;
  const mSss = result.contributions.sss * toMonthly;
  const mPhil = result.contributions.philhealth * toMonthly;
  const mPagibig = result.contributions.pagibig * toMonthly;
  const mTaxableComp = result.annualTaxable / 12;
  const mWithholding = result.monthlyTax;
  const mNet = mGross + mTaxableAllow + mExemptAllow - (mSss + mPhil + mPagibig) - mWithholding;
  const totalPay = mGross + mTaxableAllow + mExemptAllow;
  const keepPct = totalPay > 0 ? (mNet / totalPay) * 100 : 0;

  const mixSegments = [
    { label: "SSS", value: mSss, color: "#FFB38A" },
    { label: "PhilHealth", value: mPhil, color: "#7FE3DC" },
    { label: "Pag-IBIG", value: mPagibig, color: "#FFD27F" },
    { label: "Tax", value: mWithholding, color: "#FF9F9F" },
    { label: "Take-home", value: Math.max(mNet, 0), color: "#7BF0CF" },
  ];

  const activeIdx = (() => {
    const a = result.annualTaxable;
    if (a <= 250_000) return 0;
    for (let i = 0; i < TRAIN_BRACKETS.length; i++) {
      if (a > TRAIN_BRACKETS[i].lo && a <= TRAIN_BRACKETS[i].hi) return i;
    }
    return 0;
  })();

  const resultsSummary = [
    `Pay Frequency: ${PAY_FREQUENCY_LABELS[frequency]}`,
    `Gross ${PAY_FREQUENCY_LABELS[frequency]} Pay: ${formatPeso(gross)}`,
    `Estimated Monthly Withholding Tax: ${formatPeso(mWithholding)}`,
    `Estimated ${PAY_FREQUENCY_LABELS[frequency]} Withholding: ${formatPeso(result.periodTax)}`,
    `Estimated Annual Income Tax: ${formatPeso(result.annualTax)}`,
    `Taxable Compensation (monthly): ${formatPeso(mTaxableComp)}`,
    `Effective Tax Rate: ${result.effectiveRate.toFixed(2)}%`,
    `Current Tax Bracket: ${result.bracket}`,
  ].join("\n");

  const dedRow = "flex items-center justify-between gap-3 border-b border-[#F0F3F8] py-[11px]";

  return (
    <div className="space-y-[18px]">
      <div className="grid items-stretch gap-[18px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* LEFT: Inputs */}
        <div className="flex flex-col">
          <div className="h-full rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(18px,2.5vw,26px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
            <div className="mb-[18px] flex items-center justify-between">
              <h2 className="text-[16px] font-bold text-[#0E1525]">Withholding tax details</h2>
              <button
                type="button"
                onClick={reset}
                className="text-[14px] font-semibold text-[#0B8270] transition-opacity hover:opacity-80"
              >
                Reset
              </button>
            </div>

            <div className="space-y-5">
              <SelectField
                label="Pay Frequency"
                help="Choose how often you are paid. The BIR uses a different table for each payroll frequency."
                value={frequency}
                onChange={(v) => setFrequency(v as PayFrequency)}
              >
                {FREQUENCIES.map((f) => (
                  <option key={f} value={f}>
                    {PAY_FREQUENCY_LABELS[f]}
                  </option>
                ))}
              </SelectField>

              <MoneyField
                label={GROSS_LABELS[frequency]}
                help="Enter your gross pay for one pay period, before deductions."
                value={gross}
                onChange={setGross}
                max={200_000}
                step={500}
              />

              <MoneyField
                label="Taxable Allowances (per period)"
                help="Allowances that are part of taxable compensation. Leave at 0 if none."
                value={taxableAllow}
                onChange={setTaxableAllow}
                max={50_000}
                step={500}
              />

              <MoneyField
                label="Tax-Exempt Allowances (per period)"
                help="De minimis and other tax-exempt benefits. Leave at 0 if none."
                value={exemptAllow}
                onChange={setExemptAllow}
                max={50_000}
                step={500}
              />

              <div>
                <SelectField
                  label="Mandatory Contributions"
                  help="SSS, PhilHealth, and Pag-IBIG are deducted before withholding tax is computed. Automatic mode estimates the employee share from your salary."
                  value={manual ? "manual" : "auto"}
                  onChange={(v) => setManual(v === "manual")}
                >
                  <option value="auto">Estimate SSS, PhilHealth &amp; Pag-IBIG automatically</option>
                  <option value="manual">Enter my contributions manually</option>
                </SelectField>

                {manual && (
                  <div className="mt-[14px] flex flex-col gap-[10px]">
                    {[
                      { label: "SSS", value: sssManual, set: setSssManual },
                      { label: "PhilHealth", value: philManual, set: setPhilManual },
                      { label: "Pag-IBIG", value: pagibigManual, set: setPagibigManual },
                    ].map((m) => (
                      <div key={m.label} className="flex items-center gap-3">
                        <label className="w-[92px] shrink-0 text-[13px] font-bold text-[#475069]">{m.label}</label>
                        <div className="flex flex-1 items-center rounded-[10px] border border-[#D6DEEC] bg-white px-3 transition-shadow focus-within:border-[#0B8270] focus-within:shadow-[0_0_0_3px_rgba(11,130,112,.12)]">
                          <span className="mr-1.5 font-mono text-[14px] text-[#6B7488]">₱</span>
                          <input
                            type="number"
                            value={m.value === 0 ? "" : m.value}
                            placeholder="0"
                            min={0}
                            onChange={(e) => {
                              const v = parseFloat(e.target.value);
                              m.set(isNaN(v) ? 0 : Math.max(0, v));
                            }}
                            className="min-w-0 flex-1 border-none bg-transparent py-[11px] font-mono text-[15px] text-[#0E1525] outline-none"
                          />
                        </div>
                      </div>
                    ))}
                    <p className="text-[12.5px] leading-[1.5] text-[#8A93A6]">
                      Enter your monthly employee-share contributions from your payslip.
                    </p>
                  </div>
                )}
              </div>

              <p className="border-t border-[#EEF1F7] pt-4 text-[13px] leading-[1.55] text-[#8A93A6]">
                This calculator estimates withholding tax on compensation. It deducts SSS,
                PhilHealth, and Pag-IBIG (or your manual amounts) to get taxable compensation,
                then applies the TRAIN Law table. Actual payroll may differ due to employer
                rounding and other income items.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Green result */}
        <GradientResult
          accent="green"
          label="Withholding tax"
          actions={
            <ResultActions
              calculatorType="Withholding Tax Calculator"
              resultsSummary={resultsSummary}
            />
          }
          eyebrow="Estimated monthly withholding"
          figure={formatPeso(mWithholding)}
          sub={`Effective tax rate ${result.effectiveRate.toFixed(2)}% on taxable pay`}
        >
          <MixBar
            title="Where your peso goes"
            segments={mixSegments}
            footer={
              <ProgressLine
                label="You keep"
                valueLabel={`${Math.round(keepPct)}% of pay`}
                pct={keepPct}
              />
            }
          />
          <BreakdownCard title="Monthly breakdown" note="Figures shown as monthly equivalents. Net pay is after tax and mandatory contributions only.">
            <div className={dedRow}>
              <span className="text-[14px] text-[#5A6478]">Gross Monthly Pay</span>
              <span className="font-mono text-[14px] font-medium text-[#0E1525]">{formatPeso(mGross)}</span>
            </div>
            {mTaxableAllow > 0 && (
              <div className={dedRow}>
                <span className="text-[14px] text-[#5A6478]">+ Taxable Allowances</span>
                <span className="font-mono text-[14px] font-medium text-[#0E1525]">{formatPeso(mTaxableAllow)}</span>
              </div>
            )}
            <div className={dedRow}>
              <span className="text-[14px] text-[#5A6478]">− SSS</span>
              <span className="font-mono text-[14px] font-medium text-[#C0392B]">−{formatPeso(mSss)}</span>
            </div>
            <div className={dedRow}>
              <span className="text-[14px] text-[#5A6478]">− PhilHealth</span>
              <span className="font-mono text-[14px] font-medium text-[#C0392B]">−{formatPeso(mPhil)}</span>
            </div>
            <div className={dedRow}>
              <span className="text-[14px] text-[#5A6478]">− Pag-IBIG</span>
              <span className="font-mono text-[14px] font-medium text-[#C0392B]">−{formatPeso(mPagibig)}</span>
            </div>
            <div className={dedRow}>
              <span className="text-[14px] font-bold text-[#0E1525]">Taxable Compensation</span>
              <span className="font-mono text-[14px] font-bold text-[#0E1525]">{formatPeso(mTaxableComp)}</span>
            </div>
            <div className={dedRow}>
              <span className="text-[14px] text-[#5A6478]">− Withholding Tax</span>
              <span className="font-mono text-[14px] font-medium text-[#C0392B]">−{formatPeso(mWithholding)}</span>
            </div>
            {mExemptAllow > 0 && (
              <div className={dedRow}>
                <span className="text-[14px] text-[#5A6478]">+ Tax-Exempt Allowances</span>
                <span className="font-mono text-[14px] font-medium text-[#0E1525]">{formatPeso(mExemptAllow)}</span>
              </div>
            )}
            <div className="mt-[3px] flex items-center justify-between gap-3 border-t border-[#E7EBF3] pt-[13px]">
              <span className="text-[14px] font-bold text-[#0E1525]">Monthly Net Pay</span>
              <span className="font-mono text-[16px] font-bold text-[#0B8270]">{formatPeso(mNet)}</span>
            </div>
          </BreakdownCard>
        </GradientResult>
      </div>

      {/* Live bracket table */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,30px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <h2 className="font-display text-[clamp(19px,2.1vw,23px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
          TRAIN Law annual tax brackets (2023 onwards)
        </h2>
        <p className="mb-4 mt-1 text-[14.5px] text-[#6B7488]">
          Your bracket is based on annualized taxable income of{" "}
          <strong className="font-mono text-[#0E1525]">{formatPeso(result.annualTaxable, 0)}</strong>.
        </p>
        <div className="overflow-x-auto rounded-[14px] border border-[#E0E6F2]">
          <div className="min-w-[520px]">
            <div className="grid grid-cols-[1.3fr_0.5fr_1.6fr] gap-[14px] border-b border-[#E0E6F2] bg-[#EEF2FB] px-5 py-[13px] text-[12px] font-bold tracking-[.05em] text-[#56607A]">
              <span>ANNUAL TAXABLE INCOME</span>
              <span>RATE</span>
              <span>TAX DUE</span>
            </div>
            {TRAIN_BRACKETS.map((b, i) => {
              const active = i === activeIdx;
              return (
                <div
                  key={b.range}
                  className={cn(
                    "grid grid-cols-[1.3fr_0.5fr_1.6fr] items-center gap-[14px] px-5 py-[14px]",
                    i < TRAIN_BRACKETS.length - 1 && "border-b border-[#EEF1F7]",
                    active
                      ? "bg-[#EAF0FF] shadow-[inset_3px_0_0_#1535C7]"
                      : i % 2 === 1 && "bg-[#FBFCFE]"
                  )}
                >
                  <div className="flex items-center gap-[9px]">
                    <span className="font-mono text-[13.5px] font-medium text-[#0E1525]">{b.range}</span>
                    {active && (
                      <span className="rounded-[6px] border border-[#C3D0F2] bg-white px-[7px] py-[2px] text-[10.5px] font-bold tracking-[.04em] text-brand">
                        YOUR BRACKET
                      </span>
                    )}
                  </div>
                  <span>
                    <span className={cn("inline-flex items-center rounded-[7px] px-[9px] py-[3px] font-display text-[12px] font-bold", RATE_PILL[b.rate])}>
                      {b.rate}
                    </span>
                  </span>
                  <span className="font-mono text-[13px] text-[#475069]">{b.due}</span>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-[14px] text-[13px] text-[#8A93A6]">
          Your bracket (based on annual taxable income) is highlighted. Source: TRAIN Law (RA
          10963), effective January 1, 2023.
        </p>
      </div>
    </div>
  );
}
