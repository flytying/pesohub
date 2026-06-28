"use client";

import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { InfoTip } from "@/components/calculators/info-tip";

export type FieldAccent = "green" | "blue";

const ACCENT: Record<
  FieldAccent,
  { hex: string; ringRgb: string; thumbRgb: string }
> = {
  green: { hex: "#0B8270", ringRgb: "11,130,112", thumbRgb: "11,130,112" },
  blue: { hex: "#1535C7", ringRgb: "21,53,199", thumbRgb: "21,53,199" },
};

/** Accent-aware slider track fill. */
export function trackFill(value: number, min: number, max: number, accent: FieldAccent = "green") {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return `linear-gradient(to right,${ACCENT[accent].hex} 0%,${ACCENT[accent].hex} ${pct}%,#E3E8F2 ${pct}%,#E3E8F2 100%)`;
}

const thumbCss = (id: string, accent: FieldAccent) => {
  const { hex, thumbRgb } = ACCENT[accent];
  return `#${id}{-webkit-appearance:none;width:100%;height:6px;border-radius:6px;outline:none;cursor:pointer}#${id}::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:3px solid ${hex};box-shadow:0 2px 6px rgba(${thumbRgb},.3);cursor:pointer}#${id}::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid ${hex};cursor:pointer}`;
};

/** Number input (₱) + slider, with an info tooltip beside the label. */
export function MoneyField({
  label,
  tip,
  value,
  onChange,
  min = 0,
  max,
  step,
  accent = "green",
}: {
  label: string;
  tip?: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max: number;
  step: number;
  accent?: FieldAccent;
}) {
  const id = useId();
  const thumb = "gf-" + id.replace(/[:]/g, "");
  const { hex, ringRgb } = ACCENT[accent];
  return (
    <div>
      <div className="mb-[7px] flex items-center gap-1.5">
        <label htmlFor={id} className="text-[14px] font-bold text-[#0E1525]">
          {label}
        </label>
        {tip && <InfoTip text={tip} label={label} />}
      </div>
      <div
        className="flex items-center rounded-[12px] border border-[#D6DEEC] bg-white px-[14px]"
        style={{ ["--tw-ring" as string]: "" }}
      >
        <span className="mr-2 font-mono text-[15px] text-[#6B7488]">₱</span>
        <input
          id={id}
          type="number"
          value={value === 0 ? "" : value}
          placeholder="0"
          min={min}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            onChange(isNaN(v) ? 0 : Math.max(min, v));
          }}
          onFocus={(e) => {
            const box = e.currentTarget.parentElement!;
            box.style.borderColor = hex;
            box.style.boxShadow = `0 0 0 3px rgba(${ringRgb},.12)`;
          }}
          onBlur={(e) => {
            const box = e.currentTarget.parentElement!;
            box.style.borderColor = "#D6DEEC";
            box.style.boxShadow = "none";
          }}
          className="min-w-0 flex-1 border-none bg-transparent py-3 font-mono text-[16px] text-[#0E1525] outline-none"
        />
      </div>
      <style>{thumbCss(thumb, accent)}</style>
      <input
        id={thumb}
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(Math.max(value, min), max)}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-3"
        style={{ background: trackFill(Math.min(Math.max(value, min), max), min, max, accent) }}
      />
    </div>
  );
}

/** Native select, with an info tooltip beside the label. */
export function SelectField({
  label,
  tip,
  value,
  onChange,
  children,
  accent = "green",
}: {
  label: string;
  tip?: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  accent?: FieldAccent;
}) {
  const id = useId();
  const { hex, ringRgb } = ACCENT[accent];
  return (
    <div>
      <div className="mb-[7px] flex items-center gap-1.5">
        <label htmlFor={id} className="text-[14px] font-bold text-[#0E1525]">
          {label}
        </label>
        {tip && <InfoTip text={tip} label={label} />}
      </div>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = hex;
            e.currentTarget.style.boxShadow = `0 0 0 3px rgba(${ringRgb},.12)`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#D6DEEC";
            e.currentTarget.style.boxShadow = "none";
          }}
          className="w-full cursor-pointer appearance-none rounded-[12px] border border-[#D6DEEC] bg-white py-3 pl-[14px] pr-10 text-[15px] text-[#0E1525] outline-none"
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-[14px] top-1/2 size-[18px] -translate-y-1/2 text-[#6B7488]" />
      </div>
    </div>
  );
}

/** Label + value row above a slider, with an info tooltip beside the label. */
export function GreenSlider({
  label,
  tip,
  value,
  display,
  min,
  max,
  step,
  onChange,
  accent = "green",
}: {
  label: string;
  tip?: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  accent?: FieldAccent;
}) {
  const id = useId();
  const thumb = "gs-" + id.replace(/[:]/g, "");
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <label htmlFor={thumb} className="text-[15px] font-semibold text-[#344054]">
            {label}
          </label>
          {tip && <InfoTip text={tip} label={label} />}
        </span>
        <span
          className="font-display text-[18px] font-bold tabular-nums"
          style={{ color: ACCENT[accent].hex }}
        >
          {display}
        </span>
      </div>
      <style>{thumbCss(thumb, accent)}</style>
      <input
        id={thumb}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ background: trackFill(value, min, max, accent) }}
      />
    </div>
  );
}
