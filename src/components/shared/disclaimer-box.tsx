import { cn } from "@/lib/utils";
import { DISCLAIMER_TEXT } from "@/lib/constants";
import { TriangleAlert } from "lucide-react";

interface DisclaimerBoxProps {
  text?: string | string[];
  className?: string;
}

export function DisclaimerBox({
  text = DISCLAIMER_TEXT,
  className,
}: DisclaimerBoxProps) {
  const texts = Array.isArray(text) ? text : [text];
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border border-amber-300 bg-amber-50 p-6 text-[16px] leading-[22px] text-amber-900",
        className
      )}
    >
      <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
      <div className="space-y-2">
        {texts.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
      </div>
    </div>
  );
}
