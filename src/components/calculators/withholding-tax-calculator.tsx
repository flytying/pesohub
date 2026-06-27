"use client";

import { useState, useMemo } from "react";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { ResultActions } from "@/components/calculators/result-actions";
import {
  GradientResult,
  BreakdownCard,
  BreakdownRow,
} from "@/components/calculators/gradient-result";
import {
  calculateWithholdingTaxDetailed,
  PAY_FREQUENCY_LABELS,
  type PayFrequency,
} from "@/lib/calculators/withholding-tax-detailed";
import { formatPeso, formatPercent } from "@/lib/formatters";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const FREQUENCIES: PayFrequency[] = ["daily", "weekly", "semi-monthly", "monthly"];

const TAX_BRACKETS_DISPLAY = [
  { range: "₱0 - ₱250,000", rate: "0%", tax: "₱0" },
  { range: "₱250,001 - ₱400,000", rate: "15%", tax: "15% of excess over ₱250,000" },
  { range: "₱400,001 - ₱800,000", rate: "20%", tax: "₱22,500 + 20% of excess over ₱400,000" },
  { range: "₱800,001 - ₱2,000,000", rate: "25%", tax: "₱102,500 + 25% of excess over ₱800,000" },
  { range: "₱2,000,001 - ₱8,000,000", rate: "30%", tax: "₱402,500 + 30% of excess over ₱2,000,000" },
  { range: "Over ₱8,000,000", rate: "35%", tax: "₱2,202,500 + 35% of excess over ₱8,000,000" },
];

const selectClass =
  "flex h-11 w-full rounded-[12px] border border-[#D6DEEC] bg-white px-3 text-[15px] text-[#0E1525] focus-visible:border-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/15";

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
    [periodGross, frequency, taxableAllowances, taxExemptAllowances, autoEstimate, sss, philhealth, pagibig]
  );

  const freqLabel = PAY_FREQUENCY_LABELS[frequency];

  const resultsSummary = [
    `Pay Frequency: ${freqLabel}`,
    `Gross ${freqLabel} Pay: ${formatPeso(periodGross)}`,
    `Estimated ${freqLabel} Withholding Tax: ${formatPeso(result.periodTax)}`,
    `Estimated Monthly Withholding Tax: ${formatPeso(result.monthlyTax)}`,
    `Estimated Annual Income Tax: ${formatPeso(result.annualTax)}`,
    `Estimated ${freqLabel} Net Pay: ${formatPeso(result.periodNet)}`,
    `Effective Tax Rate: ${formatPercent(result.effectiveRate)}`,
    `Current Tax Bracket: ${result.bracket}`,
  ].join("\n");

  return (
    <div className="space-y-6">
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* LEFT: Inputs */}
        <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,28px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-[18px] font-semibold text-[#0E1525]">
              Pay details
            </h2>
            <button
              type="button"
              onClick={() => {
                setFrequency("monthly");
                setPeriodGross(35_000);
                setTaxableAllowances(0);
                setTaxExemptAllowances(0);
                setAutoEstimate(true);
              }}
              className="text-[14px] font-bold text-brand transition-colors hover:text-brand-light"
            >
              Reset
            </button>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="pay-frequency" className="text-[15px] font-semibold text-[#344054]">
                Pay frequency
              </Label>
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
              <p className="text-[14px] text-[#6B7488]">
                The BIR uses a different table for each payroll frequency.
              </p>
            </div>
            <CalculatorInput
              label={`Gross ${freqLabel} pay`}
              value={periodGross}
              onChange={setPeriodGross}
              prefix="₱"
              min={0}
              max={1_000_000}
              step={1_000}
              helpText="Your gross pay for one pay period, before deductions."
              tooltip="Basic compensation for one payroll period. Enter allowances separately below."
            />
            <CalculatorInput
              label="Taxable allowances (per period)"
              value={taxableAllowances}
              onChange={setTaxableAllowances}
              prefix="₱"
              min={0}
              max={1_000_000}
              step={500}
              helpText="Allowances that are part of taxable compensation. 0 if none."
              tooltip="Allowances treated as taxable income."
            />
            <CalculatorInput
              label="Tax-exempt allowances (per period)"
              value={taxExemptAllowances}
              onChange={setTaxExemptAllowances}
              prefix="₱"
              min={0}
              max={1_000_000}
              step={500}
              helpText="De minimis and other tax-exempt benefits. 0 if none."
              tooltip="Benefits excluded from tax such as de minimis benefits within BIR limits."
            />
            <div className="space-y-2">
              <Label htmlFor="contrib-mode" className="text-[15px] font-semibold text-[#344054]">
                Mandatory contributions
              </Label>
              <select
                id="contrib-mode"
                value={autoEstimate ? "auto" : "manual"}
                onChange={(e) => setAutoEstimate(e.target.value === "auto")}
                className={selectClass}
              >
                <option value="auto">Estimate SSS, PhilHealth &amp; Pag-IBIG automatically</option>
                <option value="manual">Enter my contributions manually</option>
              </select>
              <p className="text-[14px] text-[#6B7488]">
                Contributions are deducted before withholding tax is computed.
              </p>
            </div>
            {!autoEstimate && (
              <div className="space-y-6 rounded-[14px] border border-[#E7EBF3] bg-[#F7F9FD] p-4">
                <CalculatorInput label="SSS (per period)" value={sss} onChange={setSss} prefix="₱" min={0} max={100_000} step={50} helpText="Your SSS employee share for this pay period." />
                <CalculatorInput label="PhilHealth (per period)" value={philhealth} onChange={setPhilhealth} prefix="₱" min={0} max={100_000} step={50} helpText="Your PhilHealth employee share for this pay period." />
                <CalculatorInput label="Pag-IBIG (per period)" value={pagibig} onChange={setPagibig} prefix="₱" min={0} max={100_000} step={50} helpText="Your Pag-IBIG employee share for this pay period." />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Gradient result */}
        <GradientResult
          label={`Estimated ${freqLabel.toLowerCase()} withholding tax`}
          actions={
            <ResultActions
              calculatorType="Withholding Tax Calculator"
              resultsSummary={resultsSummary}
            />
          }
          eyebrow={freqLabel}
          figure={formatPeso(result.periodTax)}
          sub={`Effective rate ${formatPercent(result.effectiveRate)} · ${formatPeso(result.monthlyTax)}/month`}
        >
          <BreakdownCard
            title="Pay breakdown"
            note="Deducts SSS, PhilHealth, and Pag-IBIG to get taxable compensation, then applies the TRAIN Law table."
          >
            <BreakdownRow label={`Gross ${freqLabel.toLowerCase()} pay`} value={formatPeso(periodGross)} />
            <BreakdownRow label="− SSS" value={`−${formatPeso(result.contributions.sss)}`} tone="negative" />
            <BreakdownRow label="− PhilHealth" value={`−${formatPeso(result.contributions.philhealth)}`} tone="negative" />
            <BreakdownRow label="− Pag-IBIG" value={`−${formatPeso(result.contributions.pagibig)}`} tone="negative" />
            <BreakdownRow label="Taxable compensation" value={formatPeso(result.periodTaxable)} />
            <BreakdownRow label="− Withholding tax" value={`−${formatPeso(result.periodTax)}`} tone="negative" />
            <BreakdownRow label={`${freqLabel} net pay`} value={formatPeso(result.periodNet)} tone="total" strong />
          </BreakdownCard>
        </GradientResult>
      </div>

      {/* TRAIN Law bracket table */}
      <div className="rounded-[18px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <h3 className="mb-3 font-display text-[18px] font-semibold text-[#0E1525]">
          TRAIN Law annual tax brackets (2023 onwards)
        </h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Annual taxable income</TableHead>
                <TableHead className="text-center">Rate</TableHead>
                <TableHead>Tax due</TableHead>
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
                  <TableRow key={i} className={isActive ? "bg-[#EAF0FF] font-medium" : ""}>
                    <TableCell className="font-mono text-[14px] tabular-nums">{bracket.range}</TableCell>
                    <TableCell className="text-center font-mono text-[14px] tabular-nums">{bracket.rate}</TableCell>
                    <TableCell className="text-[14px]">{bracket.tax}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
