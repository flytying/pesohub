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

interface PersonalLoanCalculatorProps {
  beforeYouStart?: {
    title?: string;
    description: string;
    items: string[];
  };
}

export function PersonalLoanCalculator({ beforeYouStart }: PersonalLoanCalculatorProps = {}) {
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
        beforeYouStart={beforeYouStart}
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
          <div className="text-center">
            <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-gray-300">Estimated Monthly Payment</p>
            <p className="mt-2 text-[36px] font-semibold tabular-nums text-brand sm:text-[42px] animate-count-up">
              {formatPeso(result.monthlyPayment)}
            </p>
          </div>

          {loanAmount > 0 && (
            <LoanDonutChart
              principal={loanAmount}
              interest={result.totalInterest}
            />
          )}

          <div className="mt-6 space-y-1">
            <CalculatorResult
              label="Loan Amount"
              value={formatPeso(loanAmount)}
            />
            <CalculatorResult
              label="Total Interest"
              value={formatPeso(result.totalInterest)}
            />
            <CalculatorResult
              label="Total Repayment"
              value={formatPeso(result.totalCost)}
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
            tooltip="The total amount you plan to borrow from the lender, excluding fees and charges."
          />
          <CalculatorInput
            label="Repayment Term (months)"
            value={termMonths}
            onChange={setTermMonths}
            min={3}
            max={60}
            step={1}
            helpText="Choose the number of months for repayment."
            tooltip="How long you have to repay the loan. A longer term lowers monthly payments but increases total interest paid."
          />
          <CalculatorInput
            label="Annual Interest Rate (%)"
            value={interestRate}
            onChange={setInterestRate}
            min={0}
            max={150}
            step={0.1}
            helpText="Enter the estimated annual interest rate offered by the lender."
            tooltip="The yearly interest rate charged by the lender. Rates vary by lender, loan amount, and your credit profile."
          />
        </div>
      </CalculatorShell>

      {/* Amortization Table */}
      {result.schedule.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <h3 className="px-6 pt-6 pb-4 text-[16px] font-semibold text-gray-500">
            Amortization Schedule
          </h3>
          <AmortizationTable schedule={result.schedule} />
        </div>
      )}
    </div>
  );
}
