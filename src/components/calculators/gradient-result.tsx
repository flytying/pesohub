import { cn } from "@/lib/utils";

/**
 * GradientResult — the signature navy-gradient result panel from the design:
 * a cyan glow orb, white text, an optional header (label + actions), a big
 * centered money figure, then any children (split bar, breakdown card).
 */
export type ResultAccent = "blue" | "green";

const ACCENT: Record<
  ResultAccent,
  {
    panel: string;
    glow: string;
    shadow: string;
    label: string;
    eyebrow: string;
    sub: string;
  }
> = {
  blue: {
    panel: "var(--ph-grad-panel)",
    glow: "var(--ph-glow-cyan)",
    shadow: "shadow-[0_24px_50px_-22px_rgba(21,53,199,.6)]",
    label: "text-[#E6ECFF]",
    eyebrow: "text-[#B9C6FF]",
    sub: "text-[#C9D4FF]",
  },
  green: {
    panel: "var(--ph-grad-panel-green)",
    glow: "var(--ph-glow-green)",
    shadow: "shadow-[0_24px_50px_-22px_rgba(11,130,112,.55)]",
    label: "text-[#DDF4ED]",
    eyebrow: "text-[#9FE6D6]",
    sub: "text-[#DDF4ED]",
  },
};

export function GradientResult({
  label,
  actions,
  eyebrow,
  figure,
  sub,
  children,
  className,
  accent = "blue",
}: {
  label?: string;
  actions?: React.ReactNode;
  eyebrow?: string;
  figure: string;
  sub?: string;
  children?: React.ReactNode;
  className?: string;
  accent?: ResultAccent;
}) {
  const a = ACCENT[accent];
  return (
    <div
      className={cn(
        "relative flex flex-col gap-[18px] overflow-hidden rounded-[20px] p-[clamp(22px,3vw,30px)] text-white",
        a.shadow,
        className
      )}
      style={{ background: a.panel }}
    >
      <div
        aria-hidden
        className="absolute -right-10 -top-12 size-[220px] rounded-full"
        style={{ background: a.glow }}
      />

      {(label || actions) && (
        <div className="relative flex items-center justify-between gap-3">
          {label && (
            <div className={cn("text-[17px] font-bold", a.label)}>{label}</div>
          )}
          {actions && <div className="relative z-[3] flex gap-2">{actions}</div>}
        </div>
      )}

      <div className="relative px-0 pb-[2px] pt-[10px] text-center">
        {eyebrow && (
          <div className={cn("text-[13px] font-bold uppercase tracking-[.16em]", a.eyebrow)}>
            {eyebrow}
          </div>
        )}
        <div className="mt-2 font-display text-[clamp(40px,6vw,54px)] font-bold leading-none tracking-[-.02em] tabular-nums">
          {figure}
        </div>
        {sub && <div className={cn("mt-2 text-[15px]", a.sub)}>{sub}</div>}
      </div>

      {children && <div className="relative flex flex-col gap-[18px]">{children}</div>}
    </div>
  );
}

/**
 * MixBar — multi-segment "where your peso goes" bar with a wrapping legend,
 * used inside green salary/deduction result panels. Segments with value ≤ 0
 * are dropped. Each segment flexes proportionally to its value.
 */
export function MixBar({
  title,
  segments,
  footer,
}: {
  title?: string;
  segments: { label: string; value: number; color: string }[];
  footer?: React.ReactNode;
}) {
  const shown = segments.filter((s) => s.value > 0);
  return (
    <div className="rounded-[16px] border border-white/[.16] bg-white/[.07] p-[16px_18px]">
      {title && (
        <div className="mb-[10px] text-[12px] font-bold uppercase tracking-[.08em] text-[#9FE6D6]">
          {title}
        </div>
      )}
      <div className="flex h-[12px] gap-[3px] overflow-hidden rounded-[7px] bg-white/[.12]">
        {shown.map((s) => (
          <div
            key={s.label}
            className="min-w-[3px]"
            style={{ flex: `${s.value} 1 0`, background: s.color }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-[14px] gap-y-2">
        {shown.map((s) => (
          <span key={s.label} className="flex items-center gap-[6px] text-[12.5px] text-[#DDF4ED]">
            <span
              className="size-[9px] shrink-0 rounded-[3px]"
              style={{ background: s.color }}
            />
            {s.label}
          </span>
        ))}
      </div>
      {footer && (
        <div className="mt-4 border-t border-white/[.13] pt-[14px]">{footer}</div>
      )}
    </div>
  );
}

/**
 * ProgressLine — a labelled mint progress bar (e.g. "You keep 86% of gross"),
 * shown as the footer inside a green MixBar.
 */
export function ProgressLine({
  label,
  valueLabel,
  pct,
}: {
  label: string;
  valueLabel: string;
  pct: number;
}) {
  const w = Math.max(0, Math.min(100, pct));
  return (
    <>
      <div className="mb-[7px] flex items-center justify-between">
        <span className="text-[13px] font-semibold text-[#DDF4ED]">{label}</span>
        <span className="font-display text-[13px] font-bold text-[#9FE6D6]">{valueLabel}</span>
      </div>
      <div className="h-[8px] overflow-hidden rounded-[6px] bg-white/[.16]">
        <div
          className="h-full rounded-[6px] bg-[linear-gradient(90deg,#2FD3B5,#5BE8C0)]"
          style={{ width: `${w}%` }}
        />
      </div>
    </>
  );
}

/**
 * SplitBar — the two-segment principal/interest bar used on loan results.
 * `leftPct` is the principal share (0–100); the right segment fills the rest.
 */
export function SplitBar({
  leftLabel,
  leftValue,
  leftPct,
  rightLabel,
  rightValue,
  total,
}: {
  leftLabel: string;
  leftValue: string;
  leftPct: number;
  rightLabel: string;
  rightValue: string;
  total?: string;
}) {
  const pct = Math.max(2, Math.min(98, leftPct));
  return (
    <div className="rounded-[16px] border border-white/[.14] bg-white/[.06] p-[16px_18px]">
      <div className="mb-[11px] flex items-center justify-between text-[13px]">
        <span className="flex items-center gap-[7px] font-semibold text-[#C9D4FF]">
          <span className="size-[9px] shrink-0 rounded-full bg-[#6E8BEF]" />
          {leftLabel}
        </span>
        <span className="flex items-center gap-[7px] font-semibold text-[#A7E9D6]">
          {rightLabel}
          <span className="size-[9px] shrink-0 rounded-full bg-[#2BE5DF]" />
        </span>
      </div>
      <div className="flex h-[14px] gap-[3px]">
        <div
          className="rounded-[7px] bg-[linear-gradient(90deg,#8AA2F2,#5C7CEC)]"
          style={{ width: `${pct}%` }}
        />
        <div className="flex-1 rounded-[7px] bg-[linear-gradient(90deg,#2BD4E0,#43E6A0)]" />
      </div>
      <div className="mt-3 flex items-center justify-between font-display text-[18px] font-bold tabular-nums">
        <span>{leftValue}</span>
        <span className="text-[#6BEFC0]">{rightValue}</span>
      </div>
      {total && (
        <div className="mt-3 border-t border-white/[.12] pt-3 text-center text-[13px] text-[#9FB1F5]">
          {total}
        </div>
      )}
    </div>
  );
}

/** BreakdownCard — the nested white card inside the gradient result panel. */
export function BreakdownCard({
  title,
  children,
  note,
}: {
  title?: string;
  children: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="rounded-[16px] bg-white p-5 text-[#0E1525]">
      {title && (
        <div className="mb-2 text-[16px] font-bold text-[#0E1525]">{title}</div>
      )}
      <div>{children}</div>
      {note && (
        <p className="mt-3 text-[13px] leading-[1.5] text-[#8A93A6]">{note}</p>
      )}
    </div>
  );
}

const TONE: Record<string, string> = {
  default: "text-[#475069]",
  negative: "text-[#C0392B]",
  positive: "text-[#0E9F6E]",
  total: "text-brand",
  "total-green": "text-[#0B8270]",
};

/** BreakdownRow — a label/value row inside BreakdownCard. */
export function BreakdownRow({
  label,
  value,
  tone = "default",
  strong = false,
}: {
  label: string;
  value: string;
  tone?: "default" | "negative" | "positive" | "total" | "total-green";
  strong?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b border-[#F0F3F8] py-[11px] last:border-0",
        strong && "border-0 pb-[2px] pt-[14px]"
      )}
    >
      <span
        className={cn(
          "text-[15px] text-[#5A6478]",
          strong && "font-bold text-[#0E1525]"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "font-display text-[16px] font-bold tabular-nums",
          TONE[tone],
          strong && "text-[18px]"
        )}
      >
        {value}
      </span>
    </div>
  );
}
