"use client";

import { useState, useMemo, useId } from "react";
import { Info } from "lucide-react";
import { ResultActions } from "@/components/calculators/result-actions";
import { InfoTip } from "@/components/calculators/info-tip";
import {
  GradientResult,
  MixBar,
  ProgressLine,
  BreakdownCard,
} from "@/components/calculators/gradient-result";
import {
  computeSSSContribution,
  sssMscMin,
  SSS_MEMBER_LABELS,
  type SSSMember,
} from "@/lib/calculators/sss-contribution-wisp";
import { formatPeso, formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const MEMBERS: SSSMember[] = ["employed", "self", "voluntary", "ofw"];

const MEMBER_NOTES: Record<SSSMember, string> = {
  employed:
    "As an employee, your employer remits the contribution and shoulders the larger 10% share. Only the 5% employee share is deducted from your salary.",
  self: "As a self-employed member, you pay the full 15% yourself, plus the small Employees’ Compensation premium.",
  voluntary:
    "As a voluntary member, you shoulder the entire 15% contribution based on your declared monthly income.",
  ofw: "As an OFW member, you pay the full contribution yourself, with a higher minimum salary credit of ₱8,000.",
};

const COMPARE_LEVELS: Record<SSSMember, number[]> = {
  employed: [10_000, 16_000, 22_000, 30_000, 40_000],
  self: [10_000, 16_000, 22_000, 30_000, 40_000],
  voluntary: [10_000, 16_000, 22_000, 30_000, 40_000],
  ofw: [8_000, 15_000, 22_000, 30_000, 35_000],
};

function greenFill(value: number, min: number, max: number) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return `linear-gradient(to right,#0B8270 0%,#0B8270 ${pct}%,#E3E8F2 ${pct}%,#E3E8F2 100%)`;
}

export function SSSContributionCalculator() {
  const [salary, setSalary] = useState(25_000);
  const [member, setMember] = useState<SSSMember>("employed");
  const sliderId = useId();
  const thumb = "sc-" + sliderId.replace(/[:]/g, "");

  const r = useMemo(() => computeSSSContribution(salary, member), [salary, member]);
  const employed = member === "employed";

  const mixSegments = [
    { label: "Regular SS", value: r.regular, color: "#FFB38A" },
    { label: "Provident (WISP)", value: r.wisp, color: "#7FE3DC" },
    { label: "EC premium", value: r.ec, color: "#FFD27F" },
  ];

  const sharePct = r.total > 0 ? (employed ? (r.youPay / r.total) * 100 : 100) : 0;

  const resultsSummary = [
    `Monthly salary / income: ${formatPeso(salary)}`,
    `Member type: ${SSS_MEMBER_LABELS[member]}`,
    `Monthly salary credit (MSC): ${formatPeso(r.msc)}`,
    `Total contribution: ${formatPeso(r.total)}`,
    employed ? `Employee share (5%): ${formatPeso(r.ee)}` : `Your contribution: ${formatPeso(r.total)}`,
    employed ? `Employer share (10%): ${formatPeso(r.er)}` : "",
    r.ec > 0 ? `EC premium: ${formatPeso(r.ec)}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const dedRow = "flex items-center justify-between gap-3 border-b border-[#F0F3F8] py-[11px]";

  return (
    <div className="grid items-stretch gap-[18px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Inputs */}
      <div className="flex flex-col">
        <div className="h-full rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(18px,2.5vw,26px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0E1525]">Contribution details</h2>
            <button
              type="button"
              onClick={() => {
                setSalary(25_000);
                setMember("employed");
              }}
              className="text-[14px] font-semibold text-[#0B8270] transition-opacity hover:opacity-80"
            >
              Reset
            </button>
          </div>

          {/* Membership type */}
          <label className="mb-[10px] block text-[13px] font-bold tracking-[.06em] text-[#6B7488]">
            MEMBERSHIP TYPE
          </label>
          <div className="mb-5 grid grid-cols-4 gap-1 rounded-[12px] bg-[#EEF1F7] p-1">
            {MEMBERS.map((m) => {
              const on = m === member;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMember(m)}
                  className={cn(
                    "rounded-[9px] px-[6px] py-[9px] text-center text-[13px] font-bold transition-colors",
                    on ? "bg-white text-[#0B8270] shadow-[0_1px_3px_rgba(16,24,40,.12)]" : "text-[#5A6478]"
                  )}
                >
                  {SSS_MEMBER_LABELS[m]}
                </button>
              );
            })}
          </div>

          {/* Salary slider */}
          <div className="mb-[14px]">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <label htmlFor={thumb} className="text-[15px] font-semibold text-[#344054]">
                  Monthly salary / income
                </label>
                <InfoTip
                  text={`Your gross monthly pay or declared monthly income. This maps to a salary credit between ${formatPeso(sssMscMin(member), 0)} and ₱35,000.`}
                  label="Monthly salary or income"
                />
              </span>
              <span className="font-display text-[18px] font-bold tabular-nums text-[#0B8270]">
                ₱{formatNumber(salary)}
              </span>
            </div>
            <style>{`#${thumb}{-webkit-appearance:none;width:100%;height:6px;border-radius:6px;outline:none;cursor:pointer}#${thumb}::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:3px solid #0B8270;box-shadow:0 2px 6px rgba(11,130,112,.3);cursor:pointer}#${thumb}::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid #0B8270;cursor:pointer}`}</style>
            <input
              id={thumb}
              type="range"
              min={0}
              max={50_000}
              step={500}
              value={Math.min(salary, 50_000)}
              onChange={(e) => setSalary(parseFloat(e.target.value))}
              style={{ background: greenFill(Math.min(salary, 50_000), 0, 50_000) }}
            />
          </div>

          <div className="my-[14px] h-px bg-[#EEF1F7]" />

          {/* MSC display */}
          <div className="flex items-center justify-between rounded-[13px] border border-[#EDF1F8] bg-[#F7F9FD] px-[15px] py-[13px]">
            <span className="text-[15px] font-semibold text-[#475069]">Monthly salary credit (MSC)</span>
            <span className="font-display text-[17px] font-bold tabular-nums text-[#0E1525]">
              ₱{formatNumber(r.msc)}
            </span>
          </div>

          {/* Member note */}
          <div className="mt-[14px] flex items-start gap-[11px]">
            <Info className="mt-0.5 size-[18px] shrink-0 text-brand" />
            <span className="text-[14px] leading-[1.55] text-[#475069]">{MEMBER_NOTES[member]}</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Green result */}
      <GradientResult
        accent="green"
        label="Monthly SSS contribution"
        actions={
          <ResultActions
            calculatorType="SSS Contribution Calculator"
            resultsSummary={resultsSummary}
          />
        }
        eyebrow="Total per month"
        figure={formatPeso(r.total)}
        sub={employed ? "Employer + employee combined" : "You pay the full amount"}
      >
        <MixBar
          title="Where it goes"
          segments={mixSegments}
          footer={
            <ProgressLine
              label={employed ? "Deducted from your salary" : "You shoulder"}
              valueLabel={employed ? `${formatPeso(r.youPay, 0)} (employee)` : "100% of total"}
              pct={sharePct}
            />
          }
        />
        <BreakdownCard title="Contribution breakdown">
          <div className={dedRow}>
            <span className="text-[14px] text-[#5A6478]">Salary credit (MSC)</span>
            <span className="font-display text-[15px] font-bold tabular-nums text-[#0E1525]">{formatPeso(r.msc, 0)}</span>
          </div>
          {employed ? (
            <>
              <div className={dedRow}>
                <span className="text-[14px] text-[#5A6478]">Employee share (5%)</span>
                <span className="font-display text-[15px] font-bold tabular-nums text-[#0E9F6E]">{formatPeso(r.ee)}</span>
              </div>
              <div className={dedRow}>
                <span className="text-[14px] text-[#5A6478]">Employer share (10%)</span>
                <span className="font-display text-[15px] font-bold tabular-nums text-[#0E1525]">{formatPeso(r.er)}</span>
              </div>
              {r.ec > 0 && (
                <div className={dedRow}>
                  <span className="text-[14px] text-[#5A6478]">EC premium (employer)</span>
                  <span className="font-display text-[15px] font-bold tabular-nums text-[#0E1525]">{formatPeso(r.ec)}</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className={dedRow}>
                <span className="text-[14px] text-[#5A6478]">Regular contribution</span>
                <span className="font-display text-[15px] font-bold tabular-nums text-[#0E9F6E]">{formatPeso(r.regular)}</span>
              </div>
              {r.wisp > 0 && (
                <div className={dedRow}>
                  <span className="text-[14px] text-[#5A6478]">Provident fund (WISP)</span>
                  <span className="font-display text-[15px] font-bold tabular-nums text-[#0E9F6E]">{formatPeso(r.wisp)}</span>
                </div>
              )}
              {r.ec > 0 && (
                <div className={dedRow}>
                  <span className="text-[14px] text-[#5A6478]">EC premium</span>
                  <span className="font-display text-[15px] font-bold tabular-nums text-[#0E9F6E]">{formatPeso(r.ec)}</span>
                </div>
              )}
            </>
          )}
          <div className="mt-[3px] flex items-center justify-between gap-3 border-t border-[#E7EBF3] pt-[13px]">
            <span className="text-[14px] font-bold text-[#0E1525]">Total contribution</span>
            <span className="font-display text-[16px] font-bold tabular-nums text-[#0B8270]">{formatPeso(r.total)}</span>
          </div>
        </BreakdownCard>
      </GradientResult>

      {/* Compare income levels */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)] lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-[20px] font-semibold text-[#0E1525]">Compare income levels</h3>
          <span className="text-[15px] text-[#6B7488]">{SSS_MEMBER_LABELS[member]} · tap to apply</span>
        </div>
        <p className="mb-[18px] mt-[7px] text-[15px] text-[#6B7488]">
          Estimated monthly SSS contribution at common income levels for a{" "}
          {SSS_MEMBER_LABELS[member].toLowerCase()} member.
        </p>
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {COMPARE_LEVELS[member].map((level) => {
            const rr = computeSSSContribution(level, member);
            const on = salary === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => setSalary(level)}
                className={cn(
                  "rounded-[15px] border-[1.5px] p-4 text-left transition-colors",
                  on ? "border-[#0B8270] bg-[#E6F5F1]" : "border-[#E7EBF3] hover:border-[#9FD8CC]"
                )}
              >
                <div className="text-[15px] font-bold text-[#5A6478]">₱{formatNumber(level)}/mo</div>
                <div className="mb-[2px] mt-[7px] font-display text-[22px] font-bold tabular-nums text-[#0E1525]">
                  ₱{formatNumber(rr.total)}
                </div>
                <div className="text-[15px] text-[#6B7488]">total / month</div>
                <div className="mt-[9px] text-[14px] text-[#5A6478]">MSC ₱{formatNumber(rr.msc)}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
