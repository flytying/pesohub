"use client";

import { useCallback, useId, useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { formatNumber } from "@/lib/formatters";

interface CalculatorInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
  tooltip?: string;
}

export function CalculatorInput({
  label,
  value,
  onChange,
  prefix,
  min = 0,
  max = 10_000_000,
  step = 1,
  helpText,
  tooltip,
}: CalculatorInputProps) {
  const id = useId();
  const [isFocused, setIsFocused] = useState(false);
  const [rawValue, setRawValue] = useState(String(value));

  const formattedDisplay = prefix
    ? `${prefix} ${formatNumber(value, step < 1 ? 2 : 0)}`
    : formatNumber(value, step < 1 ? 2 : 0);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    setRawValue(String(value));
  }, [value]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    const parsed = parseFloat(rawValue);
    if (!isNaN(parsed)) {
      const clamped = Math.min(Math.max(parsed, min), max);
      onChange(clamped);
    }
  }, [rawValue, min, max, onChange]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setRawValue(val);

      const parsed = parseFloat(val);
      if (!isNaN(parsed)) {
        const clamped = Math.min(Math.max(parsed, min), max);
        onChange(clamped);
      }
    },
    [min, max, onChange]
  );

  const handleSliderChange = useCallback(
    (newValue: number | readonly number[]) => {
      const val = Array.isArray(newValue) ? newValue[0] : newValue;
      onChange(val);
      setRawValue(String(val));
    },
    [onChange]
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Label htmlFor={id} className="text-[16px] font-semibold leading-[22px] text-gray-500">{label}</Label>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                type="button"
                className="inline-flex text-gray-300 hover:text-gray-500 transition-colors"
                aria-label={`Info about ${label}`}
              >
                <Info className="size-4" />
              </TooltipTrigger>
              <TooltipContent side="top">{tooltip}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <Input
        id={id}
        type={isFocused ? "number" : "text"}
        inputMode="decimal"
        value={isFocused ? rawValue : formattedDisplay}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        min={min}
        max={max}
        step={step}
        className={cn(
          "rounded-lg border-gray-200 bg-white px-4 py-3 font-mono text-[16px] text-gray-500 focus:border-brand focus:ring-brand",
          prefix && "tabular-nums"
        )}
      />
      <Slider
        value={[value]}
        onValueChange={handleSliderChange}
        min={min}
        max={max}
        step={step}
      />
      {helpText && (
        <p className="text-[14px] text-gray-300">{helpText}</p>
      )}
    </div>
  );
}
