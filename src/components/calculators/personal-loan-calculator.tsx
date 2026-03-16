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

export function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(100_000);
  const [termMonths, setTermMonths] = useState(36);
  const [interestRate, setInterestRate] = useState(12);

  const result = useMemo(() => {
    if (loanAmount <= 0) {
      return {
        monthlyPayment: 0,
        totalInterest: 0,
        totalCost: 0,
        schedule: [],
      };
    }

    const loan = calculateLoan({
      principal: loanAmount,
      annualInterestRate: interestRate,
      termMonths,
    });

    return {
      monthlyPayment: loan.monthlyPayment,
      totalInterest: loan.totalInterest,
      totalCost: loan.totalPayment,
      schedule: loan.schedule,
    };
  }, [loanAmount, termMonths, interestRate]);

  return (
    <div className="space-y-6">
      <CalculatorShell
        title="Personal Loan Calculator"
        variant="split"
        resultsSummary={[
          `Loan Amount: ${formatPeso(loanAmount)}`,
          `Interest Rate: ${interestRate}% p.a.`,
          `Term: ${termMonths} months`,
          `Monthly Payment: ${formatPeso(result.monthlyPayment)}`,
          `Total Interest: ${formatPeso(result.totalInterest)}`,
          `Total Repayment: ${formatPeso(result.totalCost)}`,
        ].join("\n")}
      >
        {/* LEFT: Result Panel */}
        <ResultPanel className="flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50">Estimated Monthly Payment</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums sm:text-4xl animate-count-up">
              {formatPeso(result.monthlyPayment)}
            </p>
          </div>

          {loanAmount > 0 && (
            <LoanDonutChart
              principal={loanAmount}
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
              label="Loan Amount"
              value={formatPeso(loanAmount)}
              variant="dark"
            />
            <CalculatorResult
              label="Total Interest"
              value={formatPeso(result.totalInterest)}
              variant="dark"
            />
            <CalculatorResult
              label="Total Repayment"
              value={formatPeso(result.totalCost)}
              variant="dark"
              highlight
            />
          </div>
        </ResultPanel>

        {/* RIGHT: Inputs Panel */}
        <div className="space-y-6 p-8">
          <CalculatorInput
            label="Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            prefix="₱"
            min={10_000}
            max={3_000_000}
            step={5_000}
            helpText="Enter the amount you want to borrow."
          />
          <CalculatorInput
            label="Repayment Term (months)"
            value={termMonths}
            onChange={setTermMonths}
            min={3}
            max={60}
            step={1}
            helpText="Choose the number of months for repayment."
          />
          <CalculatorInput
            label="Annual Interest Rate (%)"
            value={interestRate}
            onChange={setInterestRate}
            min={0}
            max={36}
            step={0.1}
            helpText="Enter the estimated annual interest rate offered by the lender."
          />
        </div>
      </CalculatorShell>

      {/* Amortization Table */}
      {result.schedule.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <h3 className="mb-1 text-sm font-semibold text-foreground">
            Amortization Schedule
          </h3>
          <p className="mb-3 text-xs text-muted-foreground">
            Review the estimated monthly breakdown of your loan payments over the full repayment term.
          </p>
          <AmortizationTable schedule={result.schedule} />
          <p className="mt-3 text-xs text-muted-foreground">
            This schedule is an estimate based on the values you entered. Actual lender computations, fees, and repayment structures may vary.
          </p>
        </div>
      )}
    </div>
  );
}
