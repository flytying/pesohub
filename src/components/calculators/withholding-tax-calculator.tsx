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
            <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-gray-300">Estimated Monthly Withholding Tax</p>
            <p className="mt-2 text-[36px] font-semibold tabular-nums text-brand sm:text-[42px] animate-count-up">
              {formatPeso(result.monthlyTax)}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Effective tax rate: {formatPercent(result.effectiveRate)}
            </p>
          </div>

          <TaxBreakdownChart
            tax={result.annualTax}
            takeHome={result.takeHomePay}
          />

          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <dl className="divide-y divide-dashed divide-gray-200 text-[14px]">
              <div className="flex justify-between px-4 py-3">
                <dt className="text-gray-400">Monthly Taxable Compensation</dt>
                <dd className="font-mono tabular-nums text-gray-500">{formatPeso(monthlySalary)}</dd>
              </div>
              <div className="flex justify-between px-4 py-3">
                <dt className="text-gray-400">Annual Income Tax</dt>
                <dd className="font-mono tabular-nums font-semibold text-brand">{formatPeso(result.annualTax)}</dd>
              </div>
              <div className="flex justify-between px-4 py-3">
                <dt className="text-gray-400">Tax-Only Take-Home</dt>
                <dd className="font-mono tabular-nums text-gray-500">{formatPeso(result.monthlyTakeHome)}</dd>
              </div>
              <div className="flex justify-between px-4 py-3">
                <dt className="text-gray-400">Effective Tax Rate</dt>
                <dd className="font-mono tabular-nums text-gray-500">{formatPercent(result.effectiveRate)}</dd>
              </div>
              <div className="flex justify-between px-4 py-3">
                <dt className="text-gray-400">Current Bracket</dt>
                <dd className="font-mono tabular-nums text-gray-500">{result.bracket}</dd>
              </div>
            </dl>
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
            <h3 className="mb-3 text-[16px] font-semibold text-gray-500">
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
                          ? "bg-brand/5 font-medium"
                          : ""
                      }
                    >
                      <TableCell className="text-[14px]">
                        {bracket.range}
                      </TableCell>
                      <TableCell className="text-center text-[14px]">
                        {bracket.rate}
                      </TableCell>
                      <TableCell className="text-[14px]">{bracket.tax}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <p className="mt-2 text-[14px] text-gray-400">
              Your current bracket is highlighted. Source: TRAIN Law (RA 10963),
              effective January 1, 2023.
            </p>
          </div>
        </div>
      </CalculatorShell>
    </div>
  );
}
