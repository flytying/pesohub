"use client";

import { useState, useMemo, useId } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { ResultActions } from "@/components/calculators/result-actions";
import {
  GradientResult,
  MixBar,
  ProgressLine,
  BreakdownCard,
  BreakdownRow,
} from "@/components/calculators/gradient-result";
import { calculateTakeHomePay } from "@/lib/calculators/take-home-pay";
import { formatPeso, formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import { InfoTip } from "@/components/calculators/info-tip";

const DEFAULT_SALARY = 35_000;
const SLIDER_MAX = 200_000;

const VIEWS = [
  { key: "monthly", label: "Monthly", factor: 1, eyebrow: "NET TAKE-HOME", word: "per month" },
  { key: "semimonthly", label: "Per payday", factor: 0.5, eyebrow: "NET PER PAYDAY", word: "per payday" },
  { key: "annual", label: "Annual", factor: 12, eyebrow: "NET TAKE-HOME", word: "per year" },
] as const;

type ViewKey = (typeof VIEWS)[number]["key"];

const COMPARE_LEVELS = [18_000, 25_000, 35_000, 55_000, 90_000];

function greenFill(value: number, min: number, max: number) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return `linear-gradient(to right,#0B8270 0%,#0B8270 ${pct}%,#E3E8F2 ${pct}%,#E3E8F2 100%)`;
}

export function TakeHomePayCalculator() {
  const [gross, setGross] = useState(DEFAULT_SALARY);
  const [view, setView] = useState<ViewKey>("monthly");
  const sliderId = useId();
  const thumb = "th-" + sliderId.replace(/[:]/g, "");

  const result = useMemo(
    () => calculateTakeHomePay({ monthlySalary: gross }),
    [gross]
  );

  const v = VIEWS.find((x) => x.key === view) ?? VIEWS[0];
  const f = v.factor;

  const keepPct = gross > 0 ? (result.takeHomePay / gross) * 100 : 100;

  const mixSegments = [
    { label: "SSS", value: result.sssContribution, color: "#FFB38A" },
    { label: "PhilHealth", value: result.philhealthContribution, color: "#7FE3DC" },
    { label: "Pag-IBIG", value: result.pagibigContribution, color: "#FFD27F" },
    { label: "Tax", value: result.withholdingTax, color: "#FF9F9F" },
    { label: "Take-home", value: result.takeHomePay, color: "#7BF0CF" },
  ];

  const resultsSummary = [
    `Gross Monthly Salary: ${formatPeso(gross)}`,
    `Estimated Monthly Take-Home Pay: ${formatPeso(result.takeHomePay)}`,
    `Total Deductions: ${formatPeso(result.totalDeductions)}`,
    `Withholding Tax: ${formatPeso(result.withholdingTax)}`,
    `SSS Employee Share: ${formatPeso(result.sssContribution)}`,
    `PhilHealth Employee Share: ${formatPeso(result.philhealthContribution)}`,
    `Pag-IBIG Employee Share: ${formatPeso(result.pagibigContribution)}`,
  ].join("\n");

  return (
    <div className="grid items-stretch gap-[18px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Input */}
      <div className="flex flex-col">
        <div className="h-full rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(18px,2.5vw,26px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0E1525]">Salary details</h2>
            <button
              type="button"
              onClick={() => {
                setGross(DEFAULT_SALARY);
                setView("monthly");
              }}
              className="text-[14px] font-semibold text-[#0B8270] transition-opacity hover:opacity-80"
            >
              Reset
            </button>
          </div>

          {/* Gross salary slider */}
          <div className="mb-[18px]">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <label htmlFor={sliderId} className="text-[15px] font-semibold text-[#344054]">
                  Monthly gross salary
                </label>
                <InfoTip
                  text="Your basic monthly pay before any deductions. Bonuses and the 13th-month pay are excluded."
                  label="Monthly gross salary"
                />
              </span>
              <span className="font-display text-[18px] font-bold tabular-nums text-[#0B8270]">
                ₱{formatNumber(gross)}
              </span>
            </div>
            <style>{`#${thumb}{-webkit-appearance:none;width:100%;height:6px;border-radius:6px;outline:none;cursor:pointer}#${thumb}::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:3px solid #0B8270;box-shadow:0 2px 6px rgba(11,130,112,.3);cursor:pointer}#${thumb}::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid #0B8270;cursor:pointer}`}</style>
            <input
              id={thumb}
              type="range"
              min={0}
              max={SLIDER_MAX}
              step={1000}
              value={Math.min(gross, SLIDER_MAX)}
              onChange={(e) => setGross(parseFloat(e.target.value))}
              style={{ background: greenFill(Math.min(gross, SLIDER_MAX), 0, SLIDER_MAX) }}
            />
          </div>

          <div className="my-4 h-px bg-[#EEF1F7]" />

          {/* View tabs */}
          <label className="mb-[10px] block text-[13px] font-bold tracking-[.06em] text-[#6B7488]">
            SHOW RESULT AS
          </label>
          <div className="flex gap-1 rounded-[12px] bg-[#EEF1F7] p-1">
            {VIEWS.map((tab) => {
              const on = tab.key === view;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setView(tab.key)}
                  className={cn(
                    "flex-1 rounded-[9px] px-[6px] py-[9px] text-[14px] font-bold transition-colors",
                    on ? "bg-white text-[#0B8270] shadow-[0_1px_3px_rgba(16,24,40,.12)]" : "text-[#5A6478]"
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Info box */}
          <div className="mt-[18px] rounded-[14px] border border-[#EDF1F8] bg-[#F7F9FD] p-[15px_16px]">
            <div className="flex items-start gap-[11px]">
              <Info className="mt-0.5 size-[18px] shrink-0 text-brand" />
              <span className="text-[14px] leading-[1.55] text-[#475069]">
                Figures use the{" "}
                <strong className="text-[#0E1525]">private-sector employee</strong>{" "}
                contribution split. Self-employed and voluntary members pay
                differently — see the{" "}
                <Link
                  href="/calculators/sss/sss-contribution-calculator-philippines"
                  className="font-bold text-brand hover:underline"
                >
                  SSS Contribution calculator
                </Link>
                .
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Green result */}
      <GradientResult
        accent="green"
        label="Take-home pay"
        actions={
          <ResultActions
            calculatorType="Take-Home Pay Calculator"
            resultsSummary={resultsSummary}
          />
        }
        eyebrow={v.eyebrow}
        figure={formatPeso(result.takeHomePay * f)}
        sub={`from ₱${formatNumber(gross * f)} gross ${v.word}`}
      >
        <MixBar
          title="Where your peso goes"
          segments={mixSegments}
          footer={
            <ProgressLine
              label="You keep"
              valueLabel={`${Math.round(keepPct)}% of gross`}
              pct={keepPct}
            />
          }
        />
        <BreakdownCard title="Deduction breakdown">
          <BreakdownRow label="Gross salary" value={formatPeso(gross * f)} />
          <BreakdownRow
            label="SSS contribution"
            value={`−${formatPeso(result.sssContribution * f)}`}
            tone="negative"
          />
          <BreakdownRow
            label="PhilHealth"
            value={`−${formatPeso(result.philhealthContribution * f)}`}
            tone="negative"
          />
          <BreakdownRow
            label="Pag-IBIG"
            value={`−${formatPeso(result.pagibigContribution * f)}`}
            tone="negative"
          />
          <BreakdownRow
            label="Withholding tax"
            value={`−${formatPeso(result.withholdingTax * f)}`}
            tone="negative"
          />
          <BreakdownRow
            label="Net take-home"
            value={formatPeso(result.takeHomePay * f)}
            tone="total-green"
            strong
          />
        </BreakdownCard>
      </GradientResult>

      {/* Compare salary levels */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)] lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-[20px] font-semibold text-[#0E1525]">
            Compare salary levels
          </h3>
          <span className="text-[15px] text-[#6B7488]">Monthly net · tap to apply</span>
        </div>
        <p className="mb-[18px] mt-[7px] text-[15px] text-[#6B7488]">
          Estimated monthly take-home pay at common salary levels after all
          mandatory deductions.
        </p>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {COMPARE_LEVELS.map((level) => {
            const r = calculateTakeHomePay({ monthlySalary: level });
            const keep = level > 0 ? Math.round((r.takeHomePay / level) * 100) : 0;
            const on = gross === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => setGross(level)}
                className={cn(
                  "rounded-[15px] border-[1.5px] p-4 text-left transition-colors",
                  on ? "border-[#0B8270] bg-[#E6F5F1]" : "border-[#E7EBF3] hover:border-[#9FD8CC]"
                )}
              >
                <div className="text-[15px] font-bold text-[#5A6478]">
                  ₱{formatNumber(level)}/mo
                </div>
                <div className="mb-[2px] mt-[7px] font-display text-[22px] font-bold tabular-nums text-[#0E1525]">
                  ₱{formatNumber(r.takeHomePay)}
                </div>
                <div className="text-[15px] text-[#6B7488]">net per month</div>
                <div className="mt-[9px] text-[14px] font-semibold text-[#0E9F6E]">
                  {keep}% kept
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
