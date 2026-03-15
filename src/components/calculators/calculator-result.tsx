import { cn } from "@/lib/utils";

interface CalculatorResultProps {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
  /** "default" for light backgrounds, "dark" for inside gradient panels */
  variant?: "default" | "dark";
}

export function CalculatorResult({
  label,
  value,
  highlight = false,
  className,
  variant = "default",
}: CalculatorResultProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "flex items-center justify-between py-2.5",
        highlight && !isDark && "border-t border-b border-border",
        highlight && isDark && "border-t border-b border-white/15",
        className
      )}
    >
      <span
        className={cn(
          "text-sm",
          isDark ? "text-white/60" : "text-muted-foreground",
          highlight && !isDark && "font-medium text-foreground",
          highlight && isDark && "font-medium text-white"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "font-mono tabular-nums",
          highlight
            ? isDark
              ? "text-lg font-semibold text-white"
              : "text-lg font-semibold text-foreground"
            : isDark
              ? "text-sm text-white/90"
              : "text-sm text-foreground"
        )}
      >
        {value}
      </span>
    </div>
  );
}
