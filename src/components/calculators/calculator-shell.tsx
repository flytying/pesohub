"use client";

import { Info, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResultActions } from "@/components/calculators/result-actions";
import {
  Dialog,
  DialogTrigger,
  DialogPopup,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

interface CalculatorShellProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  /** "default" = single column card, "split" = two-panel layout */
  variant?: "default" | "split";
  /** Calculator name for email subject */
  calculatorType?: string;
  /** Text summary of results for email body */
  resultsSummary?: string;
  /** Content for the "Before You Start" modal */
  beforeYouStart?: {
    title?: string;
    description: string;
    items: string[];
  };
}

export function CalculatorShell({
  title,
  children,
  className,
  variant = "default",
  calculatorType,
  resultsSummary,
  beforeYouStart,
}: CalculatorShellProps) {
  if (variant === "split") {
    return (
      <div
        className={cn(
          "w-full overflow-hidden rounded-xl border border-gray-200 bg-white",
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            {beforeYouStart && (
              <Dialog>
                <DialogTrigger className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[14px] font-semibold text-brand hover:bg-gray-50 transition-colors">
                  <Info className="size-4" />
                  <span className="hidden sm:inline">{beforeYouStart.title || "Before you start"}</span>
                </DialogTrigger>
                <DialogPopup>
                  <DialogTitle>{beforeYouStart.title || "Before You Start"}</DialogTitle>
                  <DialogDescription className="mt-3 text-[16px] leading-[22px] text-gray-400">
                    {beforeYouStart.description}
                  </DialogDescription>
                  <ul className="mt-4 space-y-2.5 text-[16px] leading-[22px] text-gray-400">
                    {beforeYouStart.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle className="mt-0.5 size-4 shrink-0 text-brand" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex justify-end">
                    <DialogClose className="rounded-full bg-brand px-5 py-2.5 text-[14px] font-bold text-white hover:bg-brand-dark transition-colors">
                      Got it
                    </DialogClose>
                  </div>
                </DialogPopup>
              </Dialog>
            )}
          </div>
          <ResultActions
            calculatorType={calculatorType || title}
            resultsSummary={resultsSummary}
          />
        </div>
        <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">{children}</div>
      </div>
    );
  }

  return (
    <Card className={cn("w-full border-gray-200", className)}>
      <CardHeader>
        <CardTitle className="text-[20px] font-semibold leading-[26px] text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
}
