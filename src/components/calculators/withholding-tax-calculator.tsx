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
import {
  calculateWithholdingTaxDetailed,
  PAY_FREQUENCY_LABELS,
  type PayFrequency,
} from "@/lib/calculators/withholding-tax-detailed";
import { formatPeso, formatPercent } from "@/lib/formatters";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const FREQUENCIES: PayFrequency[] = [
  "daily",
  "weekly",
  "semi-monthly",
  "monthly",
];

const TAX_BRACKETS_DISPLAY = [
  { range: "₱0 - ₱250,000", rate: "0%", tax: "₱0" },
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

const selectClass =
  "flex h-9 w-full rounded-lg border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20 focus-visible:outline-none";

export function WithholdingTaxCalculator() {
  const [frequency, setFrequency] = useState<PayFrequency>("monthly");
  const [periodGross, setPeriodGross] = useState(35_000);
  const [taxableAllowances, setTaxableAllowances] = useState(0);
  const [taxExemptAllowances, setTaxExemptAllowances] = useState(0);
  const [autoEstimate, setAutoEstimate] = useState(true);
  const [sss, setSss] = useState(0);
  const [philhealth, setPhilhealth] = useState(0);
  const [pagibig, setPagibig] = useState(0);

  const result = useMemo(
    () =>
      calculateWithholdingTaxDetailed({
        periodGross,
        frequency,
        taxableAllowances,
        taxExemptAllowances,
        autoEstimateContributions: autoEstimate,
        sss,
        philhealth,
        pagibig,
      }),
    [
      periodGross,
      frequency,
      taxableAllowances,
      taxExemptAllowances,
      autoEstimate,
      sss,
      philhealth,
      pagibig,
    ],
  );

  const freqLabel = PAY_FREQUENCY_LABELS[frequency];

  return (
    <div className="space-y-6">
      <CalculatorShell
        title="Withholding Tax Calculator"
        variant="split"
        resultsSummary={[
          `Pay Frequency: ${freqLabel}`,
          `Gross ${freqLabel} Pay: ${formatPeso(periodGross)}`,
          `Estimated ${freqLabel} Withholding Tax: ${formatPeso(result.periodTax)}`,
          `Estimated Monthly Withholding Tax: ${formatPeso(result.monthlyTax)}`,
          `Estimated Annual Income Tax: ${formatPeso(result.annualTax)}`,
          `Estimated ${freqLabel} Net Pay: ${formatPeso(result.periodNet)}`,
          `Effective Tax Rate: ${formatPercent(result.effectiveRate)}`,
          `Current Tax Bracket: ${result.bracket}`,
        ].join("\n")}
      >
        {/* LEFT: Result Panel */}
        <ResultPanel className="flex flex-col justify-between">
          <div className="text-center">
            <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-gray-300">
              Estimated {freqLabel} Withholding Tax
            </p>
            <p className="mt-2 text-[36px] font-semibold tabular-nums text-brand sm:text-[42px] animate-count-up">
              {formatPeso(result.periodTax)}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Effective tax rate: {formatPercent(result.effectiveRate)} ·{" "}
              {formatPeso(result.monthlyTax)}/month
            </p>
          </div>

          <TaxBreakdownChart
            tax={result.annualTax}
            takeHome={Math.max(result.annualTaxable - result.annualTax, 0)}
          />

          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <dl className="divide-y divide-dashed divide-gray-200 text-[14px]">
              <div className="flex justify-between px-4 py-3">
                <dt className="text-gray-400">Gross {freqLabel} Pay</dt>
                <dd className="font-mono tabular-nums text-gray-500">
                  {formatPeso(periodGross)}
                </dd>
              </div>
              <div className="flex justify-between px-4 py-3">
                <dt className="text-gray-400">− SSS</dt>
                <dd className="font-mono tabular-nums text-gray-500">
                  {formatPeso(result.contributions.sss)}
                </dd>
              </div>
              <div className="flex justify-between px-4 py-3">
                <dt className="text-gray-400">− PhilHealth</dt>
                <dd className="font-mono tabular-nums text-gray-500">
                  {formatPeso(result.contributions.philhealth)}
                </dd>
              </div>
              <div className="flex justify-between px-4 py-3">
                <dt className="text-gray-400">− Pag-IBIG</dt>
                <dd className="font-mono tabular-nums text-gray-500">
                  {formatPeso(result.contributions.pagibig)}
                </dd>
              </div>
              <div className="flex justify-between px-4 py-3">
                <dt className="text-gray-400">Taxable Compensation</dt>
                <dd className="font-mono tabular-nums text-gray-500">
                  {formatPeso(result.periodTaxable)}
                </dd>
              </div>
              <div className="flex justify-between px-4 py-3">
                <dt className="text-gray-400">− Withholding Tax</dt>
                <dd className="font-mono tabular-nums font-semibold text-brand">
                  {formatPeso(result.periodTax)}
                </dd>
              </div>
              <div className="flex justify-between px-4 py-3">
                <dt className="text-gray-500">{freqLabel} Net Pay</dt>
                <dd className="font-mono tabular-nums font-semibold text-gray-500">
                  {formatPeso(result.periodNet)}
                </dd>
              </div>
            </dl>
          </div>
        </ResultPanel>

        {/* RIGHT: Inputs + Bracket Table */}
        <div className="space-y-6 p-8">
          <div className="space-y-2">
            <Label htmlFor="pay-frequency">Pay Frequency</Label>
            <select
              id="pay-frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as PayFrequency)}
              className={selectClass}
            >
              {FREQUENCIES.map((f) => (
                <option key={f} value={f}>
                  {PAY_FREQUENCY_LABELS[f]}
                </option>
              ))}
            </select>
            <p className="text-[14px] text-gray-400">
              Choose how often you are paid. The BIR uses a different table for
              each payroll frequency.
            </p>
          </div>

          <CalculatorInput
            label={`Gross ${freqLabel} Pay`}
            value={periodGross}
            onChange={setPeriodGross}
            prefix="₱"
            min={0}
            max={1_000_000}
            step={1_000}
            helpText="Enter your gross pay for one pay period, before deductions."
            tooltip="Your basic compensation for one payroll period, before tax and contributions. Enter allowances separately below."
          />

          <CalculatorInput
            label="Taxable Allowances (per period)"
            value={taxableAllowances}
            onChange={setTaxableAllowances}
            prefix="₱"
            min={0}
            max={1_000_000}
            step={500}
            helpText="Allowances that are part of taxable compensation. Leave at 0 if none."
            tooltip="Allowances treated as taxable income (e.g. taxable transportation or representation allowances)."
          />

          <CalculatorInput
            label="Tax-Exempt Allowances (per period)"
            value={taxExemptAllowances}
            onChange={setTaxExemptAllowances}
            prefix="₱"
            min={0}
            max={1_000_000}
            step={500}
            helpText="De minimis and other tax-exempt benefits. Leave at 0 if none."
            tooltip="Benefits excluded from tax such as de minimis benefits within BIR limits. These are added back to net pay but not taxed."
          />

          <div className="space-y-2">
            <Label htmlFor="contrib-mode">Mandatory Contributions</Label>
            <select
              id="contrib-mode"
              value={autoEstimate ? "auto" : "manual"}
              onChange={(e) => setAutoEstimate(e.target.value === "auto")}
              className={selectClass}
            >
              <option value="auto">Estimate SSS, PhilHealth &amp; Pag-IBIG automatically</option>
              <option value="manual">Enter my contributions manually</option>
            </select>
            <p className="text-[14px] text-gray-400">
              SSS, PhilHealth, and Pag-IBIG are deducted before withholding tax
              is computed. Automatic mode estimates the employee share from your
              salary.
            </p>
          </div>

          {!autoEstimate && (
            <div className="space-y-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <CalculatorInput
                label="SSS (per period)"
                value={sss}
                onChange={setSss}
                prefix="₱"
                min={0}
                max={100_000}
                step={50}
                helpText="Your SSS employee share for this pay period."
              />
              <CalculatorInput
                label="PhilHealth (per period)"
                value={philhealth}
                onChange={setPhilhealth}
                prefix="₱"
                min={0}
                max={100_000}
                step={50}
                helpText="Your PhilHealth employee share for this pay period."
              />
              <CalculatorInput
                label="Pag-IBIG (per period)"
                value={pagibig}
                onChange={setPagibig}
                prefix="₱"
                min={0}
                max={100_000}
                step={50}
                helpText="Your Pag-IBIG employee share for this pay period."
              />
            </div>
          )}

          <Separator />

          <p className="text-[14px] text-gray-400">
            This calculator estimates withholding tax on compensation. It
            deducts SSS, PhilHealth, and Pag-IBIG (or your manual amounts) to get
            taxable compensation, then applies the TRAIN Law tax table. Actual
            payroll may differ due to employer rounding and other income items.
          </p>
        </div>
      </CalculatorShell>

      {/* TRAIN Law Tax Bracket Table */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-3 text-[16px] font-semibold text-gray-500">
          TRAIN Law Annual Tax Brackets (2023 Onwards)
        </h3>
        <div className="overflow-x-auto">
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
                const a = result.annualTaxable;
                const isActive =
                  (i === 0 && a <= 250_000) ||
                  (i === 1 && a > 250_000 && a <= 400_000) ||
                  (i === 2 && a > 400_000 && a <= 800_000) ||
                  (i === 3 && a > 800_000 && a <= 2_000_000) ||
                  (i === 4 && a > 2_000_000 && a <= 8_000_000) ||
                  (i === 5 && a > 8_000_000);

                return (
                  <TableRow
                    key={i}
                    className={isActive ? "bg-brand/5 font-medium" : ""}
                  >
                    <TableCell className="text-[14px]">{bracket.range}</TableCell>
                    <TableCell className="text-center text-[14px]">
                      {bracket.rate}
                    </TableCell>
                    <TableCell className="text-[14px]">{bracket.tax}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <p className="mt-2 text-[14px] text-gray-400">
          Your bracket (based on annual taxable income) is highlighted. Source:
          TRAIN Law (RA 10963), effective January 1, 2023.
        </p>
      </div>
    </div>
  );
}
