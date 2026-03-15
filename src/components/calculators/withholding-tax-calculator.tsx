"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { CalculatorResult } from "@/components/calculators/calculator-result";
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
          `Monthly Gross Salary: ${formatPeso(monthlySalary)}`,
          `Monthly Tax: ${formatPeso(result.monthlyTax)}`,
          `Annual Tax: ${formatPeso(result.annualTax)}`,
          `Monthly Take-Home Pay: ${formatPeso(result.monthlyTakeHome)}`,
          `Annual Take-Home Pay: ${formatPeso(result.takeHomePay)}`,
          `Effective Tax Rate: ${formatPercent(result.effectiveRate)}`,
        ].join("\n")}
      >
        {/* LEFT: Result Panel */}
        <ResultPanel className="flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50">Monthly Take-Home Pay</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums sm:text-4xl animate-count-up">
              {formatPeso(result.monthlyTakeHome)}
            </p>
            <p className="mt-2 text-sm text-white/50">
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
              <span className="text-white/60">Tax</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-full bg-white/85" />
              <span className="text-white/60">Take-Home</span>
            </div>
          </div>

          <div className="mt-6 space-y-1">
            <CalculatorResult
              label="Monthly Tax"
              value={formatPeso(result.monthlyTax)}
              variant="dark"
              highlight
            />
            <CalculatorResult
              label="Annual Tax"
              value={formatPeso(result.annualTax)}
              variant="dark"
            />
            <CalculatorResult
              label="Annual Take-Home"
              value={formatPeso(result.takeHomePay)}
              variant="dark"
            />
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
            helpText="Your gross monthly salary before deductions"
          />

          <Separator />

          {/* TRAIN Law Tax Bracket Table */}
          <div>
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
