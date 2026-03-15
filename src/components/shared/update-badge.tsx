import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatters";
import { Clock } from "lucide-react";

interface UpdateBadgeProps {
  date: string;
}

export function UpdateBadge({ date }: UpdateBadgeProps) {
  return (
    <Badge variant="secondary" className="gap-1.5 text-xs font-normal">
      <Clock className="size-3" />
      Updated {formatDate(date)}
    </Badge>
  );
}
