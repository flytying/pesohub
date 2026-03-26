import { cn } from "@/lib/utils";

interface CalculatorResultProps {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
  /** "default" for light backgrounds, "dark" kept for backwards compat */
  variant?: "default" | "dark";
}

export function CalculatorResult({
  label,
  value,
  highlight = false,
  className,
}: CalculatorResultProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-gray-100 py-3",
        highlight && "border-b-gray-200",
        className
      )}
    >
      <span
        className={cn(
          "text-[16px] leading-[22px] text-gray-400",
          highlight && "font-semibold uppercase tracking-wide text-gray-500"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "font-mono tabular-nums text-[16px] text-gray-500",
          highlight && "text-[18px] font-semibold"
        )}
      >
        {value}
      </span>
    </div>
  );
}
