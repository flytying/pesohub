"use client";

import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Chip — a filter pill. White at rest, solid blue when active.
 * Used for calculator category filters and similar toggles.
 */
export function Chip({ children, active = false, onClick, className }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-[9px] text-sm font-semibold transition-colors",
        active
          ? "border-brand bg-brand text-white"
          : "border-border bg-white text-[#475069] hover:border-brand/40 hover:text-brand",
        className
      )}
    >
      {children}
    </button>
  );
}
