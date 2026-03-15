"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { CalculatorResult } from "@/components/calculators/calculator-result";
import { AmortizationTable } from "@/components/calculators/amortization-table";
import { ResultPanel } from "@/components/calculators/result-panel";
import dynamic from "next/dynamic";
const LoanDonutChart = dynamic(
  () => import("@/components/calculators/loan-donut-chart").then((m) => m.LoanDonutChart),
  { ssr: false }
);
import { calculateLoan } from "@/lib/calculators/loan";
import { formatPeso } from "@/lib/formatters";

export function HomeLoanCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(3_500_000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [termYears, setTermYears] = useState(20);
  const [interestRate, setInterestRate] = useState(7);

  const result = useMemo(() => {
    const downPaymentAmount = propertyPrice * (downPaymentPercent / 100);
    const loanAmount = propertyPrice - downPaymentAmount;
    const termMonths = termYears * 12;

    if (loanAmount <= 0) {
      return {
        downPaymentAmount,
        loanAmount: 0,
        monthlyPayment: 0,
        totalInterest: 0,
        totalCost: propertyPrice,
        schedule: [],
      };
    }

    const loan = calculateLoan({
      principal: loanAmount,
      annualInterestRate: interestRate,
      termMonths,
    });

    return {
      downPaymentAmount,
      loanAmount,
      monthlyPayment: loan.monthlyPayment,
      totalInterest: loan.totalInterest,
      totalCost: downPaymentAmount + loan.totalPayment,
      schedule: loan.schedule,
    };
  }, [propertyPrice, downPaymentPercent, termYears, interestRate]);

  return (
    <div className="space-y-6">
      <CalculatorShell title="Home Loan Calculator" variant="split">
        {/* LEFT: Result Panel */}
        <ResultPanel className="flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50">Monthly Payment</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums sm:text-4xl animate-count-up">
              {formatPeso(result.monthlyPayment)}
            </p>
          </div>

          {result.loanAmount > 0 && (
            <LoanDonutChart
              principal={result.loanAmount}
              interest={result.totalInterest}
            />
          )}

          {/* Chart Legend */}
          <div className="flex justify-center gap-6 text-xs print:hidden">
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-full bg-white/85" />
              <span className="text-white/60">Principal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-full bg-white/35" />
              <span className="text-white/60">Interest</span>
            </div>
          </div>

          <div className="mt-6 space-y-1">
            <CalculatorResult
              label="Down Payment"
              value={formatPeso(result.downPaymentAmount)}
              variant="dark"
            />
            <CalculatorResult
              label="Loan Amount"
              value={formatPeso(result.loanAmount)}
              variant="dark"
            />
            <CalculatorResult
              label="Total Interest"
              value={formatPeso(result.totalInterest)}
              variant="dark"
            />
            <CalculatorResult
              label="Total Cost"
              value={formatPeso(result.totalCost)}
              variant="dark"
              highlight
            />
          </div>
        </ResultPanel>

        {/* RIGHT: Inputs Panel */}
        <div className="space-y-6 p-8">
          <CalculatorInput
            label="Property Price"
            value={propertyPrice}
            onChange={setPropertyPrice}
            prefix="₱"
            min={500_000}
            max={50_000_000}
            step={100_000}
            helpText="Total price of the property"
          />
          <CalculatorInput
            label="Down Payment (%)"
            value={downPaymentPercent}
            onChange={setDownPaymentPercent}
            min={0}
            max={90}
            step={1}
            helpText="Typical PH requirement: 10-20%"
          />
          <CalculatorInput
            label="Loan Term (years)"
            value={termYears}
            onChange={setTermYears}
            min={5}
            max={30}
            step={1}
            helpText="5 to 30 years"
          />
          <CalculatorInput
            label="Annual Interest Rate (%)"
            value={interestRate}
            onChange={setInterestRate}
            min={0}
            max={20}
            step={0.1}
            helpText="Pag-IBIG: ~5.375% | Banks: ~6.5-9%"
          />
        </div>
      </CalculatorShell>

      {/* Amortization Table */}
      {result.schedule.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <h3 className="mb-3 text-sm font-semibold text-foreground">
            Amortization Schedule
          </h3>
          <AmortizationTable schedule={result.schedule} />
        </div>
      )}
    </div>
  );
}
