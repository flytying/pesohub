"use client";

import { useId } from "react";
import { ChevronDown } from "lucide-react";
import { InfoTip } from "@/components/calculators/info-tip";

/** Green-accented slider track fill (matches the salary/deduction calculators). */
export function greenFill(value: number, min: number, max: number) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return `linear-gradient(to right,#0B8270 0%,#0B8270 ${pct}%,#E3E8F2 ${pct}%,#E3E8F2 100%)`;
}

const THUMB = (id: string) =>
  `#${id}{-webkit-appearance:none;width:100%;height:6px;border-radius:6px;outline:none;cursor:pointer}#${id}::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#fff;border:3px solid #0B8270;box-shadow:0 2px 6px rgba(11,130,112,.3);cursor:pointer}#${id}::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid #0B8270;cursor:pointer}`;

/** Number input (₱) + green slider, with an info tooltip beside the label. */
export function MoneyField({
  label,
  tip,
  value,
  onChange,
  min = 0,
  max,
  step,
}: {
  label: string;
  tip: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max: number;
  step: number;
}) {
  const id = useId();
  const thumb = "gf-" + id.replace(/[:]/g, "");
  return (
    <div>
      <div className="mb-[7px] flex items-center gap-1.5">
        <label htmlFor={id} className="text-[14px] font-bold text-[#0E1525]">
          {label}
        </label>
        <InfoTip text={tip} label={label} />
      </div>
      <div className="flex items-center rounded-[12px] border border-[#D6DEEC] bg-white px-[14px] transition-shadow focus-within:border-[#0B8270] focus-within:shadow-[0_0_0_3px_rgba(11,130,112,.12)]">
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
          className="min-w-0 flex-1 border-none bg-transparent py-3 font-mono text-[16px] text-[#0E1525] outline-none"
        />
      </div>
      <style>{THUMB(thumb)}</style>
      <input
        id={thumb}
        type="range"
        min={min}
        max={max}
        step={step}
        value={Math.min(Math.max(value, min), max)}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-3"
        style={{ background: greenFill(Math.min(Math.max(value, min), max), min, max) }}
      />
    </div>
  );
}

/** Native select styled green, with an info tooltip beside the label. */
export function SelectField({
  label,
  tip,
  value,
  onChange,
  children,
}: {
  label: string;
  tip: string;
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
        <InfoTip text={tip} label={label} />
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

/** Label + value row above a green slider, with an info tooltip beside the label. */
export function GreenSlider({
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
  const thumb = "gs-" + id.replace(/[:]/g, "");
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
      <style>{THUMB(thumb)}</style>
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
