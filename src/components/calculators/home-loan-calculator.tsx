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

interface HomeLoanCalculatorProps {
  beforeYouStart?: {
    title?: string;
    description: string;
    items: string[];
  };
}

export function HomeLoanCalculator({ beforeYouStart }: HomeLoanCalculatorProps = {}) {
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
      <CalculatorShell
        title="Home Loan Calculator"
        variant="split"
        beforeYouStart={beforeYouStart}
        resultsSummary={[
          `Property Price: ${formatPeso(propertyPrice)}`,
          `Down Payment (${downPaymentPercent}%): ${formatPeso(result.downPaymentAmount)}`,
          `Loan Amount: ${formatPeso(result.loanAmount)}`,
          `Interest Rate: ${interestRate}% p.a.`,
          `Term: ${termYears} years`,
          `Monthly Payment: ${formatPeso(result.monthlyPayment)}`,
          `Total Interest: ${formatPeso(result.totalInterest)}`,
          `Total Cost: ${formatPeso(result.totalCost)}`,
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

          {result.loanAmount > 0 && (
            <LoanDonutChart
              principal={result.loanAmount}
              interest={result.totalInterest}
            />
          )}

          <div className="mt-6 space-y-1">
            <CalculatorResult
              label="Down Payment"
              value={formatPeso(result.downPaymentAmount)}
            />
            <CalculatorResult
              label="Loan Amount"
              value={formatPeso(result.loanAmount)}
            />
            <CalculatorResult
              label="Total Interest"
              value={formatPeso(result.totalInterest)}
            />
            <CalculatorResult
              label="Total Cost"
              value={formatPeso(result.totalCost)}
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
            helpText="Enter the total price of the home, condo, or property."
            tooltip="The total selling price of the property including VAT, if applicable."
          />
          <CalculatorInput
            label="Down Payment (%)"
            value={downPaymentPercent}
            onChange={setDownPaymentPercent}
            min={0}
            max={90}
            step={1}
            helpText="Enter the amount you plan to pay upfront."
            tooltip="The percentage of the property price you pay upfront. A higher down payment reduces the loan amount and monthly payments."
          />
          <CalculatorInput
            label="Loan Term (years)"
            value={termYears}
            onChange={setTermYears}
            min={5}
            max={30}
            step={1}
            helpText="Choose the number of years for repayment."
            tooltip="The number of years to repay the loan. Home loans typically range from 5 to 30 years."
          />
          <CalculatorInput
            label="Annual Interest Rate (%)"
            value={interestRate}
            onChange={setInterestRate}
            min={0}
            max={150}
            step={0.1}
            helpText="Enter the estimated annual interest rate offered by the lender."
            tooltip="The yearly interest rate from the bank. Some lenders offer a fixed rate for the first few years, then a variable rate after."
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
