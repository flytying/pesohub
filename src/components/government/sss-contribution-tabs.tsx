"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { formatPeso } from "@/lib/formatters";
import {
  SSS_MEMBER_TYPES,
  type SSSContributionRow,
  type SSSMemberType,
} from "@/lib/calculators/sss";

function formatRange(row: SSSContributionRow): string {
  if (row.minSalary === 0) return `Below ${formatPeso(row.maxSalary + 0.01)}`;
  if (row.maxSalary === Infinity) return `${formatPeso(row.minSalary)} & over`;
  return `${formatPeso(row.minSalary)} – ${formatPeso(row.maxSalary)}`;
}

const HEAD =
  "px-4 py-[13px] text-[12px] font-bold uppercase tracking-[.05em] text-[#475069]";

export function SSSContributionTabs() {
  const types = SSS_MEMBER_TYPES;
  const [active, setActive] = useState<SSSMemberType>(types[0].id);
  const t = types.find((x) => x.id === active) ?? types[0];
  const cols = t.hasSplit
    ? "grid-cols-[1.5fr_1fr_1fr_1fr_1fr]"
    : "grid-cols-[1.7fr_1fr_1fr]";

  return (
    <div>
      {/* Segmented member-type tabs */}
      <div className="mb-[14px] flex flex-wrap gap-[6px] rounded-[13px] bg-[#EEF1F7] p-[5px]">
        {types.map((x) => {
          const on = x.id === active;
          return (
            <button
              key={x.id}
              type="button"
              onClick={() => setActive(x.id)}
              className={`min-w-[92px] flex-1 rounded-[9px] px-3 py-[9px] text-center text-[13.5px] font-bold transition-colors ${
                on
                  ? "bg-white text-brand shadow-[0_1px_3px_rgba(16,24,40,.12)]"
                  : "text-[#5A6478] hover:text-[#0E1525]"
              }`}
            >
              {x.label}
            </button>
          );
        })}
      </div>

      {/* Info note */}
      <div className="mb-[18px] flex items-start gap-[11px] rounded-[13px] border border-[#EDF1F8] bg-[#F7F9FD] px-4 py-[13px]">
        <Info className="mt-[2px] size-[18px] shrink-0 text-brand" />
        <span className="text-[15px] leading-[1.55] text-[#475069]">
          {t.description}
        </span>
      </div>

      {/* Table */}
      <div className="max-h-[560px] overflow-auto rounded-[16px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <div
          className={`sticky top-0 z-10 grid ${cols} border-b border-[#E7EBF3] bg-[#F4F7FE]`}
        >
          <div className={HEAD}>Range of Compensation</div>
          <div className={`${HEAD} text-right`}>MSC</div>
          {t.hasSplit && (
            <div className={`${HEAD} text-right`}>{t.memberLabel}</div>
          )}
          {t.hasSplit && (
            <div className={`${HEAD} text-right`}>{t.employerLabel}</div>
          )}
          <div className={`${HEAD} text-right`}>
            {t.hasSplit ? "Total" : t.memberLabel}
          </div>
        </div>

        {t.table.map((row, i) => (
          <div
            key={row.msc}
            className={`grid ${cols} ${i % 2 ? "bg-[#FAFBFE]" : "bg-white"} ${
              i < t.table.length - 1 ? "border-b border-[#F0F3F8]" : ""
            }`}
          >
            <div className="px-4 py-[11px] text-[13.5px] text-[#475069]">
              {formatRange(row)}
            </div>
            <div className="px-4 py-[11px] text-right font-mono text-[13.5px] tabular-nums text-[#0E1525]">
              {formatPeso(row.msc)}
            </div>
            {t.hasSplit && (
              <div className="px-4 py-[11px] text-right font-mono text-[13.5px] font-semibold tabular-nums text-brand">
                {formatPeso(row.memberShare)}
              </div>
            )}
            {t.hasSplit && (
              <div className="px-4 py-[11px] text-right font-mono text-[13.5px] tabular-nums text-[#5A6478]">
                {formatPeso(row.employerShare)}
              </div>
            )}
            <div
              className={`px-4 py-[11px] text-right font-mono text-[13.5px] tabular-nums ${
                t.hasSplit
                  ? "font-semibold text-[#0E1525]"
                  : "font-semibold text-brand"
              }`}
            >
              {formatPeso(row.total)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
