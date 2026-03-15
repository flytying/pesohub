"use client";

import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResultActions } from "@/components/calculators/result-actions";

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
}

export function CalculatorShell({
  title,
  children,
  className,
  variant = "default",
  calculatorType,
  resultsSummary,
}: CalculatorShellProps) {
  if (variant === "split") {
    return (
      <div
        className={cn(
          "w-full overflow-hidden rounded-xl ring-1 ring-border bg-card",
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          <ResultActions
            calculatorType={calculatorType || title}
            resultsSummary={resultsSummary}
          />
        </div>
        <div className="grid lg:grid-cols-[2fr_3fr]">{children}</div>
      </div>
    );
  }

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">{children}</CardContent>
    </Card>
  );
}
