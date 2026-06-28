"use client";

import { useState } from "react";
import {
  payrollPeriodTables,
  type TaxBracketRow,
} from "@/data/government/withholding-tax-table";

const RATE_SCALE: Record<number, { text: string; bg: string }> = {
  0: { text: "#5B6678", bg: "#EEF1F7" },
  15: { text: "#1E5FD0", bg: "#E4EDFB" },
  20: { text: "#3D49C4", bg: "#E7E9FB" },
  25: { text: "#6D4DE0", bg: "#EDE8FC" },
  30: { text: "#B7791F", bg: "#FBF0DC" },
  32: { text: "#B7791F", bg: "#FBF0DC" },
  35: { text: "#C2484D", bg: "#FBE6E7" },
};

const CURRENT_SUB =
  "Effective January 1, 2023 onwards (TRAIN Law, RA 10963 — Annex E)";
const PREVIOUS_SUB =
  "January 1, 2018 – December 31, 2022 (TRAIN Law Phase 1)";

const HEAD =
  "px-[18px] py-[13px] text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]";
const GRID = "grid grid-cols-[1.4fr_1.6fr_.6fr]";

function RateBadge({ rate }: { rate: number }) {
  const sc = RATE_SCALE[rate] ?? { text: "#0E1525", bg: "#EEF1F7" };
  return (
    <span
      className="inline-flex rounded-[7px] px-[9px] py-[3px] font-display text-[12px] font-bold"
      style={{ color: sc.text, backgroundColor: sc.bg }}
    >
      {rate}%
    </span>
  );
}

function splitTax(s: string): { base: string; extra: string } {
  const t = s.trim();
  if (t === "₱0") return { base: "₱0", extra: "" };
  let i = t.indexOf(" + ");
  if (i > -1) return { base: t.slice(0, i), extra: "+ " + t.slice(i + 3) };
  i = t.indexOf(" +");
  if (i > -1) return { base: t.slice(0, i), extra: "+ " + t.slice(i + 2) };
  return { base: t, extra: "" };
}

function Table({ rows }: { rows: TaxBracketRow[] }) {
  return (
    <div className="overflow-hidden rounded-[16px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
      <div className="overflow-x-auto">
        <div className="min-w-[560px]">
          <div className={`${GRID} border-b border-[#E7EBF3] bg-[#F4F7FE]`}>
            <div className={HEAD}>Compensation Range</div>
            <div className={HEAD}>Prescribed Withholding Tax</div>
            <div className={`${HEAD} text-right`}>Rate</div>
          </div>
          {rows.map((r, i) => {
            const { base, extra } = splitTax(r.taxDue);
            const exempt = r.rate === 0;
            return (
              <div
                key={i}
                className={`${GRID} items-center ${
                  i < rows.length - 1 ? "border-b border-[#F0F3F8]" : ""
                } ${
                  exempt
                    ? "bg-[#F1FAF5]"
                    : i % 2
                      ? "bg-[#FAFBFE]"
                      : "bg-white"
                }`}
              >
                <div className="flex items-center gap-2 px-[18px] py-[14px]">
                  <span className="font-mono text-[12.5px] font-medium tabular-nums text-[#0E1525]">
                    {r.range}
                  </span>
                  {exempt && (
                    <span className="rounded-[6px] bg-[#E7F6EE] px-[7px] py-[2px] text-[10px] font-bold uppercase tracking-[.05em] text-[#0E9F6E]">
                      Exempt
                    </span>
                  )}
                </div>
                <div className="px-[18px] py-[14px]">
                  <div className="font-mono text-[12.5px] font-semibold tabular-nums text-[#0E1525]">
                    {base}
                  </div>
                  {extra && (
                    <div className="mt-[2px] font-mono text-[12px] tabular-nums text-[#8A93A6]">
                      {extra}
                    </div>
                  )}
                </div>
                <div className="px-[18px] py-[14px] text-right">
                  <RateBadge rate={r.rate} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Badge({ tone }: { tone: "current" | "previous" }) {
  const cur = tone === "current";
  return (
    <span
      className={`rounded-[6px] px-[8px] py-[2px] text-[11px] font-bold uppercase tracking-[.05em] ${
        cur ? "bg-[#EAF0FF] text-brand" : "bg-[#EEF1F7] text-[#6B7488]"
      }`}
    >
      {cur ? "Current" : "Previous"}
    </span>
  );
}

export function WithholdingTaxTables() {
  const [active, setActive] = useState(payrollPeriodTables[3].id); // Monthly
  const p =
    payrollPeriodTables.find((x) => x.id === active) ?? payrollPeriodTables[3];

  return (
    <div>
      {/* Pay-frequency tabs */}
      <div className="mb-5 flex flex-wrap gap-1 rounded-[13px] border border-[#E7EBF3] bg-white p-[5px]">
        {payrollPeriodTables.map((x) => {
          const on = x.id === active;
          return (
            <button
              key={x.id}
              type="button"
              onClick={() => setActive(x.id)}
              className={`min-w-[90px] flex-1 rounded-[9px] px-3 py-[10px] text-center text-[14px] font-bold transition-colors ${
                on
                  ? "bg-brand text-white shadow-[0_1px_3px_rgba(21,53,199,.3)]"
                  : "text-[#475069] hover:text-[#0E1525]"
              }`}
            >
              {x.label}
            </button>
          );
        })}
      </div>

      {/* Current table */}
      <div className="mb-2 flex flex-wrap items-center gap-[10px]">
        <span className="font-display text-[16px] font-semibold text-[#0E1525]">
          {p.label} withholding tax table
        </span>
        <Badge tone="current" />
      </div>
      <p className="mb-3 text-[14px] text-[#6B7488]">{CURRENT_SUB}</p>
      <Table rows={p.current} />

      {/* Previous table */}
      <div className="mb-2 mt-7 flex flex-wrap items-center gap-[10px]">
        <span className="font-display text-[16px] font-semibold text-[#0E1525]">
          Previous {p.label.toLowerCase()} withholding tax table
        </span>
        <Badge tone="previous" />
      </div>
      <p className="mb-3 text-[14px] text-[#6B7488]">{PREVIOUS_SUB}</p>
      <Table rows={p.old} />
    </div>
  );
}
