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

interface CarLoanCalculatorProps {
  beforeYouStart?: {
    title?: string;
    description: string;
    items: string[];
  };
}

export function CarLoanCalculator({ beforeYouStart }: CarLoanCalculatorProps = {}) {
  const [vehiclePrice, setVehiclePrice] = useState(1_200_000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [termMonths, setTermMonths] = useState(60);
  const [interestRate, setInterestRate] = useState(6.5);

  const result = useMemo(() => {
    const downPaymentAmount = vehiclePrice * (downPaymentPercent / 100);
    const loanAmount = vehiclePrice - downPaymentAmount;

    if (loanAmount <= 0) {
      return {
        downPaymentAmount,
        loanAmount: 0,
        monthlyPayment: 0,
        totalInterest: 0,
        totalCost: vehiclePrice,
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
  }, [vehiclePrice, downPaymentPercent, termMonths, interestRate]);

  return (
    <div className="space-y-6">
      <CalculatorShell
        title="Car Loan Calculator"
        variant="split"
        beforeYouStart={beforeYouStart}
        resultsSummary={[
          `Vehicle Price: ${formatPeso(vehiclePrice)}`,
          `Down Payment (${downPaymentPercent}%): ${formatPeso(result.downPaymentAmount)}`,
          `Loan Amount: ${formatPeso(result.loanAmount)}`,
          `Interest Rate: ${interestRate}% p.a.`,
          `Term: ${termMonths} months`,
          `Monthly Payment: ${formatPeso(result.monthlyPayment)}`,
          `Total Interest: ${formatPeso(result.totalInterest)}`,
          `Total Cost: ${formatPeso(result.totalCost)}`,
        ].join("\n")}
      >
        {/* LEFT: Result Panel */}
        <ResultPanel className="flex flex-col justify-between">
          <div className="text-center">
            <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-gray-300">
              Estimated Monthly Payment
            </p>
            <p className="mt-2 text-[36px] font-semibold tabular-nums text-brand sm:text-[42px]">
              {formatPeso(result.monthlyPayment)}
            </p>
          </div>

          {result.loanAmount > 0 && (
            <LoanDonutChart
              principal={result.loanAmount}
              interest={result.totalInterest}
            />
          )}


          <div className="mt-6 space-y-0">
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
              label="Total Interest"
              value={formatPeso(result.totalCost)}
              highlight
            />
          </div>
        </ResultPanel>

        {/* RIGHT: Inputs Panel */}
        <div className="space-y-6 p-8">
          <CalculatorInput
            label="Car Price"
            value={vehiclePrice}
            onChange={setVehiclePrice}
            prefix="₱"
            min={100_000}
            max={10_000_000}
            step={10_000}
            helpText="Enter the total vehicle price."
            tooltip="The full selling price of the car before any down payment or financing."
          />
          <CalculatorInput
            label="Down Payment (%)"
            value={downPaymentPercent}
            onChange={setDownPaymentPercent}
            min={0}
            max={90}
            step={1}
            helpText="Enter the amount you plan to pay upfront."
            tooltip="The percentage of the car price you pay upfront. A higher down payment means a smaller loan and lower monthly payments."
          />
          <CalculatorInput
            label="Loan Term (months)"
            value={termMonths}
            onChange={setTermMonths}
            min={12}
            max={84}
            step={12}
            helpText="Choose the number of months for repayment."
            tooltip="How long you have to repay the loan. A longer term lowers monthly payments but increases total interest paid."
          />
          <CalculatorInput
            label="Annual Interest Rate (%)"
            value={interestRate}
            onChange={setInterestRate}
            min={0}
            max={30}
            step={0.1}
            helpText="Enter the estimated annual interest rate offered by the lender."
            tooltip="The yearly interest rate charged by the bank or lender. Rates vary by lender, loan term, and your credit profile."
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
