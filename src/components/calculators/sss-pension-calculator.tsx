"use client";

import { useState, useMemo, useId } from "react";
import { Info } from "lucide-react";
import { ResultActions } from "@/components/calculators/result-actions";
import { InfoTip } from "@/components/calculators/info-tip";
import {
  GradientResult,
  BreakdownCard,
} from "@/components/calculators/gradient-result";
import {
  computeSSSPension,
  PENSION_INCREASE,
} from "@/lib/calculators/sss-pension-formula";
import { formatPeso, formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const COMPARE_YEARS = [10, 15, 20, 30, 40];
const FORMULA_NAMES = ["Formula 1 · years", "Formula 2 · 40%", "Formula 3 · minimum"];
const GOVERN_NAMES = ["Formula 1", "Formula 2", "Formula 3"];

function greenFill(value: number, min: number, max: number) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return `linear-gradient(to right,#0B8270 0%,#0B8270 ${pct}%,#E3E8F2 ${pct}%,#E3E8F2 100%)`;
}

function GreenSlider({
  label,
  tip,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  tip: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const id = useId();
  const thumb = "ps-" + id.replace(/[:]/g, "");
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <label htmlFor={thumb} className="text-[15px] font-semibold text-[#344054]">
            {label}
          </label>
          <InfoTip text={tip} label={label} />
        </span>
        <span className="font-display text-[18px] font-bold tabular-nums text-[#0B8270]">{display}</span>
      </div>
      <style>{`#${thumb}{-webkit-appearance:none;width:100%;height:6px;border-radius:6px;outline:none;cursor:pointer}#${thumb}::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:3px solid #0B8270;box-shadow:0 2px 6px rgba(11,130,112,.3);cursor:pointer}#${thumb}::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid #0B8270;cursor:pointer}`}</style>
      <input
        id={thumb}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ background: greenFill(value, min, max) }}
      />
    </div>
  );
}

export function SSSPensionCalculator() {
  const [amsc, setAmsc] = useState(20_000);
  const [cys, setCys] = useState(25);

  const r = useMemo(() => computeSSSPension(amsc, cys), [amsc, cys]);
  const fVals = [r.f1, r.f2, r.f3];

  const resultsSummary = [
    `Average monthly salary credit: ${formatPeso(amsc)}`,
    `Credited years of service: ${cys}`,
    `Formula 1 (years): ${formatPeso(r.f1)}`,
    `Formula 2 (40% of AMSC): ${formatPeso(r.f2)}`,
    `Formula 3 (minimum): ${formatPeso(r.f3)}`,
    `Governing formula: ${GOVERN_NAMES[r.governs]}`,
    `Across-the-board increase: ${formatPeso(PENSION_INCREASE)}`,
    `Estimated monthly pension: ${formatPeso(r.pension)}`,
  ].join("\n");

  const dedRow = "flex items-center justify-between gap-3 border-b border-[#F0F3F8] py-[11px]";

  return (
    <div className="grid items-stretch gap-[18px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Inputs */}
      <div className="flex flex-col">
        <div className="h-full rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(18px,2.5vw,26px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0E1525]">Pension details</h2>
            <button
              type="button"
              onClick={() => {
                setAmsc(20_000);
                setCys(25);
              }}
              className="text-[14px] font-semibold text-[#0B8270] transition-opacity hover:opacity-80"
            >
              Reset
            </button>
          </div>

          <div className="space-y-[18px]">
            <GreenSlider
              label="Average monthly salary credit"
              tip="Your average salary credit across your contribution history. Higher salary credits build a bigger pension."
              value={amsc}
              display={`₱${formatNumber(amsc)}`}
              min={5_000}
              max={35_000}
              step={500}
              onChange={setAmsc}
            />

            <div className="h-px bg-[#EEF1F7]" />

            <GreenSlider
              label="Credited years of service"
              tip="Total years with at least six monthly contributions. A monthly pension needs at least 10 years (120 contributions)."
              value={cys}
              display={`${cys} years`}
              min={10}
              max={40}
              step={1}
              onChange={setCys}
            />

            <div className="flex items-start gap-[11px] rounded-[13px] border border-[#EDF1F8] bg-[#F7F9FD] p-[13px_15px]">
              <Info className="mt-0.5 size-[18px] shrink-0 text-brand" />
              <span className="text-[14px] leading-[1.55] text-[#475069]">
                With fewer than 120 contributions you receive a one-time lump sum instead of a
                monthly pension.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Green result */}
      <GradientResult
        accent="green"
        label="Estimated monthly pension"
        actions={
          <ResultActions
            calculatorType="SSS Pension Calculator"
            resultsSummary={resultsSummary}
          />
        }
        eyebrow="Monthly pension"
        figure={formatPeso(r.pension)}
        sub={`at ${cys} years · ₱${formatNumber(amsc)} salary credit`}
      >
        {/* Three formulas */}
        <div className="rounded-[16px] border border-white/[.16] bg-white/[.07] p-[16px_18px]">
          <div className="mb-3 text-[12px] font-bold uppercase tracking-[.08em] text-[#9FE6D6]">
            The three formulas
          </div>
          <div className="flex flex-col gap-[11px]">
            {FORMULA_NAMES.map((name, i) => {
              const winning = r.governs === i;
              return (
                <div key={name} className="flex items-center justify-between gap-[10px]">
                  <span className="flex items-center gap-2 text-[13.5px] text-[#DDF4ED]">
                    {name}
                    {winning && (
                      <span className="rounded-[6px] bg-[#7BF0CF] px-[7px] py-[2px] text-[10px] font-bold tracking-[.05em] text-[#0E2496]">
                        HIGHEST
                      </span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "font-display text-[14px] font-bold tabular-nums",
                      winning ? "text-[#7BF0CF]" : "text-[#E6ECFF]"
                    )}
                  >
                    {formatPeso(fVals[i], 0)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-[14px] flex items-center justify-between border-t border-white/[.13] pt-[13px]">
            <span className="text-[13px] font-semibold text-[#DDF4ED]">+ Across-the-board increase</span>
            <span className="font-display text-[14px] font-bold text-[#9FE6D6]">
              +{formatPeso(PENSION_INCREASE, 0)}
            </span>
          </div>
        </div>

        {/* Breakdown */}
        <BreakdownCard title="Pension breakdown">
          <div className={dedRow}>
            <span className="text-[14px] text-[#5A6478]">Average salary credit</span>
            <span className="font-display text-[15px] font-bold tabular-nums text-[#0E1525]">
              ₱{formatNumber(amsc)}
            </span>
          </div>
          <div className={dedRow}>
            <span className="text-[14px] text-[#5A6478]">Credited years of service</span>
            <span className="font-display text-[15px] font-bold tabular-nums text-[#0E1525]">{cys} years</span>
          </div>
          <div className={dedRow}>
            <span className="text-[14px] text-[#5A6478]">Highest formula (base)</span>
            <span className="font-display text-[15px] font-bold tabular-nums text-[#0E1525]">{formatPeso(r.base)}</span>
          </div>
          <div className={dedRow}>
            <span className="text-[14px] text-[#5A6478]">Across-the-board increase</span>
            <span className="font-display text-[15px] font-bold tabular-nums text-[#0E9F6E]">
              +{formatPeso(PENSION_INCREASE)}
            </span>
          </div>
          <div className="mt-[3px] flex items-center justify-between gap-3 border-t border-[#E7EBF3] pt-[13px]">
            <span className="text-[14px] font-bold text-[#0E1525]">Monthly pension</span>
            <span className="font-display text-[16px] font-bold tabular-nums text-[#0B8270]">{formatPeso(r.pension)}</span>
          </div>
        </BreakdownCard>
      </GradientResult>

      {/* Compare years of service */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)] lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-[20px] font-semibold text-[#0E1525]">Compare years of service</h3>
          <span className="text-[15px] text-[#6B7488]">Same salary credit · tap to apply</span>
        </div>
        <p className="mb-[18px] mt-[7px] text-[15px] text-[#6B7488]">
          How your estimated monthly pension grows with more credited years at a ₱{formatNumber(amsc)}{" "}
          salary credit.
        </p>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {COMPARE_YEARS.map((y) => {
            const rr = computeSSSPension(amsc, y);
            const on = cys === y;
            return (
              <button
                key={y}
                type="button"
                onClick={() => setCys(y)}
                className={cn(
                  "rounded-[15px] border-[1.5px] p-4 text-left transition-colors",
                  on ? "border-[#0B8270] bg-[#E6F5F1]" : "border-[#E7EBF3] hover:border-[#9FD8CC]"
                )}
              >
                <div className="text-[15px] font-bold text-[#5A6478]">{y} years</div>
                <div className="mb-[2px] mt-[7px] font-display text-[22px] font-bold tabular-nums text-[#0E1525]">
                  ₱{formatNumber(rr.pension)}
                </div>
                <div className="text-[15px] text-[#6B7488]">per month</div>
                <div className="mt-[9px] text-[14px] text-[#5A6478]">{GOVERN_NAMES[rr.governs]} governs</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
