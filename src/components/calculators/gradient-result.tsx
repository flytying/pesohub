import { cn } from "@/lib/utils";

/**
 * GradientResult — the signature navy-gradient result panel from the design:
 * a cyan glow orb, white text, an optional header (label + actions), a big
 * centered money figure, then any children (split bar, breakdown card).
 */
export function GradientResult({
  label,
  actions,
  eyebrow,
  figure,
  sub,
  children,
  className,
}: {
  label?: string;
  actions?: React.ReactNode;
  eyebrow?: string;
  figure: string;
  sub?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-[18px] overflow-hidden rounded-[20px] p-[clamp(22px,3vw,30px)] text-white shadow-[0_24px_50px_-22px_rgba(21,53,199,.6)]",
        className
      )}
      style={{ background: "var(--ph-grad-panel)" }}
    >
      <div
        aria-hidden
        className="absolute -right-10 -top-12 size-[220px] rounded-full"
        style={{ background: "var(--ph-glow-cyan)" }}
      />

      {(label || actions) && (
        <div className="relative flex items-center justify-between gap-3">
          {label && (
            <div className="text-[17px] font-bold text-[#E6ECFF]">{label}</div>
          )}
          {actions && <div className="relative z-[3] flex gap-2">{actions}</div>}
        </div>
      )}

      <div className="relative px-0 pb-[2px] pt-[10px] text-center">
        {eyebrow && (
          <div className="text-[13px] font-bold uppercase tracking-[.16em] text-[#B9C6FF]">
            {eyebrow}
          </div>
        )}
        <div className="mt-1 font-display text-[clamp(34px,5vw,50px)] font-bold leading-[1.02] tracking-[-.02em] tabular-nums">
          {figure}
        </div>
        {sub && <div className="mt-2 text-[15px] text-[#C9D4FF]">{sub}</div>}
      </div>

      {children && <div className="relative flex flex-col gap-[18px]">{children}</div>}
    </div>
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
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center justify-between text-[13.5px]">
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
      <div className="flex items-center justify-between text-[15px] font-bold tabular-nums">
        <span>{leftValue}</span>
        <span className="text-[#6BEFC0]">{rightValue}</span>
      </div>
      {total && (
        <div className="text-center text-[13.5px] text-[#B9C6FF]">{total}</div>
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
  tone?: "default" | "negative" | "positive" | "total";
  strong?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b border-[#EEF1F7] py-[10px] last:border-0",
        strong && "border-0 pt-3 text-[17px]"
      )}
    >
      <span
        className={cn(
          "text-[15px] text-[#5A6478]",
          strong && "text-[16px] font-bold text-[#0E1525]"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "font-mono text-[15px] font-semibold tabular-nums",
          TONE[tone],
          strong && "text-[17px] font-bold"
        )}
      >
        {value}
      </span>
    </div>
  );
}
