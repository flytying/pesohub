import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconTileTone = "brand" | "neutral" | "borrow" | "salary" | "save";

const TONES: Record<IconTileTone, string> = {
  brand: "bg-secondary text-brand",
  neutral: "bg-muted text-brand",
  borrow: "bg-[#E8EDFF] text-[#2347D9]",
  salary: "bg-[#DEF5F0] text-[#0E9A86]",
  save: "bg-[#EDE8FC] text-[#6D4DE0]",
};

interface IconTileProps {
  icon: LucideIcon;
  tone?: IconTileTone;
  /** tile size in px (default 44) */
  size?: number;
  className?: string;
}

/**
 * IconTile — rounded-square container holding a single Lucide icon.
 * The recurring "icon chip" on cards, related rows, and source cards.
 */
export function IconTile({
  icon: Icon,
  tone = "brand",
  size = 44,
  className,
}: IconTileProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-xl",
        TONES[tone],
        className
      )}
      style={{ width: size, height: size }}
    >
      <Icon size={Math.round(size * 0.5)} strokeWidth={2} aria-hidden />
    </span>
  );
}
