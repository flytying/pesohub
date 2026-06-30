import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_NOTICE =
  "PesoHub provides free financial tools and information for educational purposes only. It is not affiliated with any bank or government agency. Rates and terms shown are estimates — always confirm the final figures with your lender and consult a qualified professional before making financial decisions.";

interface CalculatorNoticeProps {
  text?: string;
  className?: string;
}

/**
 * Warm-yellow educational/estimate notice shown at the foot of calculator pages.
 * Distinct from the amber `DisclaimerBox` used on rates/government pages — the
 * palette here matches the calculator page redesign.
 */
export function CalculatorNotice({ text = DEFAULT_NOTICE, className }: CalculatorNoticeProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-[15px] border border-[#F0E2BE] bg-[#FFF8E8] p-[18px]",
        className
      )}
    >
      <Info className="mt-0.5 size-5 shrink-0 text-[#C99A22]" aria-hidden="true" />
      <p className="text-[15px] leading-[1.6] text-[#7A6320]">{text}</p>
    </div>
  );
}
