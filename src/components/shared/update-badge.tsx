import { formatDate } from "@/lib/formatters";
import { Clock } from "lucide-react";

interface UpdateBadgeProps {
  date: string;
}

export function UpdateBadge({ date }: UpdateBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-pill-blue px-4 py-2 text-[14px] font-normal leading-none text-gray-400">
      <Clock className="size-3.5" />
      Updated {formatDate(date)}
    </span>
  );
}
