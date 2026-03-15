import { cn } from "@/lib/utils";
import { DISCLAIMER_TEXT } from "@/lib/constants";
import { Info } from "lucide-react";

interface DisclaimerBoxProps {
  text?: string;
  className?: string;
}

export function DisclaimerBox({
  text = DISCLAIMER_TEXT,
  className,
}: DisclaimerBoxProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground",
        className
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0" />
      <p>{text}</p>
    </div>
  );
}
