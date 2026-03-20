"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { ResultPanel } from "@/components/calculators/result-panel";
import dynamic from "next/dynamic";
const TaxBreakdownChart = dynamic(
  () => import("@/components/calculators/tax-breakdown-chart").then((m) => m.TaxBreakdownChart),
  { ssr: false }
);
import { calculateWithholdingTax } from "@/lib/calculators/tax";
import { formatPeso, formatPercent } from "@/lib/formatters";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const TAX_BRACKETS_DISPLAY = [
  {
    range: "₱0 - ₱250,000",
    rate: "0%",
    tax: "₱0",
  },
  {
    range: "₱250,001 - ₱400,000",
    rate: "15%",
    tax: "15% of excess over ₱250,000",
  },
  {
    range: "₱400,001 - ₱800,000",
    rate: "20%",
    tax: "₱22,500 + 20% of excess over ₱400,000",
  },
  {
    range: "₱800,001 - ₱2,000,000",
    rate: "25%",
    tax: "₱102,500 + 25% of excess over ₱800,000",
  },
  {
    range: "₱2,000,001 - ₱8,000,000",
    rate: "30%",
    tax: "₱402,500 + 30% of excess over ₱2,000,000",
  },
  {
    range: "Over ₱8,000,000",
    rate: "35%",
    tax: "₱2,202,500 + 35% of excess over ₱8,000,000",
  },
];

export function WithholdingTaxCalculator() {
  const [monthlySalary, setMonthlySalary] = useState(35_000);

  const result = useMemo(() => {
    return calculateWithholdingTax({ monthlySalary });
  }, [monthlySalary]);

  const annualTaxableIncome = monthlySalary * 12;

  return (
    <div className="space-y-6">
      <CalculatorShell
        title="Withholding Tax Calculator"
        variant="split"
        resultsSummary={[
          `Gross Monthly Salary: ${formatPeso(monthlySalary)}`,
          `Estimated Monthly Withholding Tax: ${formatPeso(result.monthlyTax)}`,
          `Estimated Annual Income Tax: ${formatPeso(result.annualTax)}`,
          `Estimated Tax-Only Take-Home Pay: ${formatPeso(result.monthlyTakeHome)}`,
          `Effective Tax Rate: ${formatPercent(result.effectiveRate)}`,
          `Current Tax Bracket: ${result.bracket}`,
        ].join("\n")}
      >
        {/* LEFT: Result Panel */}
        <ResultPanel className="flex flex-col justify-between">
          <div className="text-center">
            <p className="text-sm tracking-wide text-white/70">Estimated Monthly Withholding Tax</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums sm:text-4xl animate-count-up">
              {formatPeso(result.monthlyTax)}
            </p>
            <p className="mt-2 text-sm text-white/70">
              Effective tax rate: {formatPercent(result.effectiveRate)}
            </p>
          </div>

          <TaxBreakdownChart
            tax={result.annualTax}
            takeHome={result.takeHomePay}
          />

          {/* Chart Legend */}
          <div className="flex justify-center gap-6 text-xs print:hidden">
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-full bg-white/35" />
              <span className="text-white/70">Tax</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-full bg-white/85" />
              <span className="text-white/70">Take-Home</span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="border-t border-b border-white/15 py-3">
              <span className="text-sm font-medium text-white">Estimated Annual Income Tax</span>
              <span className="mt-1 block font-mono text-lg font-semibold tabular-nums text-white">
                {formatPeso(result.annualTax)}
              </span>
            </div>
            <div className="py-1">
              <span className="text-sm text-white/70">Estimated Tax-Only Take-Home Pay</span>
              <span className="mt-1 block font-mono text-sm tabular-nums text-white/90">
                {formatPeso(result.monthlyTakeHome)}
              </span>
            </div>
            <div className="py-1">
              <span className="text-sm text-white/70">Effective Tax Rate</span>
              <span className="mt-1 block font-mono text-sm tabular-nums text-white/90">
                {formatPercent(result.effectiveRate)}
              </span>
            </div>
            <div className="py-1">
              <span className="text-sm text-white/70">Current Tax Bracket</span>
              <span className="mt-1 block font-mono text-sm tabular-nums text-white/90">
                {result.bracket}
              </span>
            </div>
          </div>
        </ResultPanel>

        {/* RIGHT: Input + Bracket Table */}
        <div className="space-y-6 p-8">
          <CalculatorInput
            label="Monthly Gross Salary"
            value={monthlySalary}
            onChange={setMonthlySalary}
            prefix="₱"
            min={0}
            max={1_000_000}
            step={1_000}
            helpText="Enter your monthly salary before deductions."
            tooltip="Your total monthly salary before any deductions like tax, SSS, PhilHealth, or Pag-IBIG."
          />

          <Separator />

          {/* TRAIN Law Tax Bracket Table */}
          <div className="overflow-x-auto">
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              TRAIN Law Tax Brackets (2023 Onwards)
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Annual Taxable Income</TableHead>
                  <TableHead className="text-center">Rate</TableHead>
                  <TableHead>Tax Due</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TAX_BRACKETS_DISPLAY.map((bracket, i) => {
                  const isActive =
                    (i === 0 && annualTaxableIncome <= 250_000) ||
                    (i === 1 &&
                      annualTaxableIncome > 250_000 &&
                      annualTaxableIncome <= 400_000) ||
                    (i === 2 &&
                      annualTaxableIncome > 400_000 &&
                      annualTaxableIncome <= 800_000) ||
                    (i === 3 &&
                      annualTaxableIncome > 800_000 &&
                      annualTaxableIncome <= 2_000_000) ||
                    (i === 4 &&
                      annualTaxableIncome > 2_000_000 &&
                      annualTaxableIncome <= 8_000_000) ||
                    (i === 5 && annualTaxableIncome > 8_000_000);

                  return (
                    <TableRow
                      key={i}
                      className={
                        isActive
                          ? "bg-primary/5 font-medium"
                          : ""
                      }
                    >
                      <TableCell className="text-sm">
                        {bracket.range}
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {bracket.rate}
                      </TableCell>
                      <TableCell className="text-sm">{bracket.tax}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <p className="mt-2 text-xs text-muted-foreground">
              Your current bracket is highlighted. Source: TRAIN Law (RA 10963),
              effective January 1, 2023.
            </p>
          </div>
        </div>
      </CalculatorShell>
    </div>
  );
}
