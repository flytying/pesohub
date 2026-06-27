"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Car,
  Home,
  Wallet,
  Calculator,
  Shield,
  HandCoins,
  Gift,
  Clock,
  Target,
  Percent,
  PiggyBank,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Icon components can't cross the server→client boundary, so callers pass a
// name and we resolve it here.
const ICONS: Record<string, LucideIcon> = {
  Car,
  Home,
  Wallet,
  Calculator,
  Shield,
  HandCoins,
  Gift,
  Clock,
  Target,
  Percent,
  PiggyBank,
};

type Accent = "borrow" | "salary" | "save";

const ACCENT: Record<
  Accent,
  { chip: string; ink: string; border: string; shadow: string }
> = {
  borrow: { chip: "#E8EDFF", ink: "#2347D9", border: "#BCC9F4", shadow: "rgba(35,71,217,.34)" },
  salary: { chip: "#DEF5F0", ink: "#0E9A86", border: "#A7E2D6", shadow: "rgba(14,154,134,.30)" },
  save: { chip: "#EDE8FC", ink: "#6D4DE0", border: "#CFC3F4", shadow: "rgba(109,77,224,.30)" },
};

export interface CalcItem {
  name: string;
  desc: string;
  href: string;
  /** key into the ICONS map above */
  icon: string;
}

export interface CalcGroup {
  id: string;
  title: string;
  desc: string;
  accent: Accent;
  items: CalcItem[];
}

function CalcCard({ item, accent }: { item: CalcItem; accent: Accent }) {
  const a = ACCENT[accent];
  const Icon = ICONS[item.icon] ?? Calculator;
  return (
    <Link
      href={item.href}
      className="group flex flex-col rounded-[18px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-all duration-150 hover:-translate-y-[3px]"
      style={{ ["--b" as string]: a.border }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = a.border;
        e.currentTarget.style.boxShadow = `0 16px 34px -18px ${a.shadow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E7EBF3";
        e.currentTarget.style.boxShadow = "0 1px 2px rgba(16,24,40,.04)";
      }}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-[20px] font-semibold text-[#0E1525]">
              {item.name}
            </span>
            <span className="rounded-[6px] bg-[#E3F6ED] px-[7px] py-[3px] text-[11px] font-bold uppercase tracking-[.06em] text-[#0E9F6E]">
              Live
            </span>
          </div>
          <p className="mt-2 max-w-[42ch] text-[15px] leading-[1.55] text-[#5A6478]">
            {item.desc}
          </p>
        </div>
        <span
          className="flex size-[52px] shrink-0 items-center justify-center rounded-[14px]"
          style={{ background: a.chip }}
        >
          <Icon className="size-6" style={{ color: a.ink }} />
        </span>
      </div>
      <div
        className="mt-auto inline-flex items-center gap-2 text-[15px] font-bold"
        style={{ color: a.ink }}
      >
        Use calculator
        <ArrowRight className="size-4" />
      </div>
    </Link>
  );
}

export function CalculatorsBrowser({ groups }: { groups: CalcGroup[] }) {
  const [cat, setCat] = useState<string>("all");

  const chips = [{ id: "all", label: "All calculators" }].concat(
    groups.map((g) => ({ id: g.id, label: g.title }))
  );

  const visible = cat === "all" ? groups : groups.filter((g) => g.id === cat);

  return (
    <>
      {/* Category filter chips */}
      <div className="mb-[30px] flex flex-wrap gap-[9px]">
        {chips.map((ch) => {
          const active = cat === ch.id;
          return (
            <button
              key={ch.id}
              type="button"
              onClick={() => setCat(ch.id)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-4 py-[9px] text-sm font-semibold transition-colors",
                active
                  ? "border-brand bg-brand text-white"
                  : "border-[#E7EBF3] bg-white text-[#475069] hover:border-[#BCC9F4] hover:text-brand"
              )}
            >
              {ch.label}
            </button>
          );
        })}
      </div>

      {visible.map((g) => (
        <section key={g.id} className="mb-[38px]">
          <div className="mb-[18px]">
            <h2 className="font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
              {g.title}
            </h2>
            <p className="mt-[5px] max-w-[62ch] text-[15px] leading-[1.5] text-[#6B7488]">
              {g.desc}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {g.items.map((item) => (
              <CalcCard key={item.href} item={item} accent={g.accent} />
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
