"use client";

import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

/**
 * InfoTip — a small info icon that reveals supporting text in a tooltip,
 * placed beside a field label. Replaces helper text shown below inputs so
 * calculator forms stay compact and consistent.
 */
export function InfoTip({ text, label }: { text: string; label?: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          type="button"
          aria-label={label ? `About ${label}` : "More information"}
          className="inline-flex text-[#C4CCDB] transition-colors hover:text-[#6B7488]"
        >
          <Info className="size-4" />
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[260px]">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
