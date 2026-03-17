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
          "w-full overflow-hidden rounded-xl ring-1 ring-border bg-card",
          className
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold tracking-tight">{title}</h2>
            {beforeYouStart && (
              <Dialog>
                <DialogTrigger className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-secondary transition-colors">
                  <Info className="size-3.5" />
                  <span className="hidden sm:inline">{beforeYouStart.title || "Before You Start"}</span>
                </DialogTrigger>
                <DialogPopup>
                  <DialogTitle>{beforeYouStart.title || "Before You Start"}</DialogTitle>
                  <DialogDescription className="mt-3">
                    {beforeYouStart.description}
                  </DialogDescription>
                  <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                    {beforeYouStart.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex justify-end">
                    <DialogClose className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
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
