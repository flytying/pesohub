"use client";

import { useState, useMemo } from "react";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { AmortizationTable } from "@/components/calculators/amortization-table";
import { ResultActions } from "@/components/calculators/result-actions";
import {
  GradientResult,
  SplitBar,
  BreakdownCard,
  BreakdownRow,
} from "@/components/calculators/gradient-result";
import { calculateLoan } from "@/lib/calculators/loan";
import { formatPeso } from "@/lib/formatters";

interface CarLoanCalculatorProps {
  beforeYouStart?: {
    title?: string;
    description: string;
    items: string[];
  };
}

const DEFAULTS = {
  vehiclePrice: 1_200_000,
  downPaymentPercent: 20,
  termMonths: 60,
  interestRate: 6.5,
};

export function CarLoanCalculator(_: CarLoanCalculatorProps = {}) {
  const [vehiclePrice, setVehiclePrice] = useState(DEFAULTS.vehiclePrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(
    DEFAULTS.downPaymentPercent
  );
  const [termMonths, setTermMonths] = useState(DEFAULTS.termMonths);
  const [interestRate, setInterestRate] = useState(DEFAULTS.interestRate);

  const reset = () => {
    setVehiclePrice(DEFAULTS.vehiclePrice);
    setDownPaymentPercent(DEFAULTS.downPaymentPercent);
    setTermMonths(DEFAULTS.termMonths);
    setInterestRate(DEFAULTS.interestRate);
  };

  const result = useMemo(() => {
    const downPaymentAmount = vehiclePrice * (downPaymentPercent / 100);
    const loanAmount = vehiclePrice - downPaymentAmount;

    if (loanAmount <= 0) {
      return {
        downPaymentAmount,
        loanAmount: 0,
        monthlyPayment: 0,
        totalInterest: 0,
        totalPayment: 0,
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
      totalPayment: loan.totalPayment,
      totalCost: downPaymentAmount + loan.totalPayment,
      schedule: loan.schedule,
    };
  }, [vehiclePrice, downPaymentPercent, termMonths, interestRate]);

  const totalOfPayments = result.loanAmount + result.totalInterest;
  const principalPct =
    totalOfPayments > 0 ? (result.loanAmount / totalOfPayments) * 100 : 100;
  const interestPct = 100 - principalPct;

  const resultsSummary = [
    `Vehicle Price: ${formatPeso(vehiclePrice)}`,
    `Down Payment (${downPaymentPercent}%): ${formatPeso(result.downPaymentAmount)}`,
    `Loan Amount: ${formatPeso(result.loanAmount)}`,
    `Interest Rate: ${interestRate}% p.a.`,
    `Term: ${termMonths} months`,
    `Monthly Payment: ${formatPeso(result.monthlyPayment)}`,
    `Total Interest: ${formatPeso(result.totalInterest)}`,
    `Total Cost: ${formatPeso(result.totalCost)}`,
  ].join("\n");

  return (
    <div className="space-y-6">
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* LEFT: Inputs */}
        <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,28px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-[18px] font-semibold text-[#0E1525]">
              Loan details
            </h2>
            <button
              type="button"
              onClick={reset}
              className="text-[14px] font-bold text-brand transition-colors hover:text-brand-light"
            >
              Reset
            </button>
          </div>
          <div className="space-y-6">
            <CalculatorInput
              label="Car price"
              value={vehiclePrice}
              onChange={setVehiclePrice}
              prefix="₱"
              min={100_000}
              max={5_000_000}
              step={10_000}
              helpText="The total vehicle price before financing."
              tooltip="The full selling price of the car before any down payment or financing."
            />
            <CalculatorInput
              label="Down payment (%)"
              value={downPaymentPercent}
              onChange={setDownPaymentPercent}
              min={0}
              max={60}
              step={1}
              helpText="Amount you pay upfront — a bigger down payment lowers the loan."
              tooltip="The percentage of the car price you pay upfront."
            />
            <CalculatorInput
              label="Loan term (months)"
              value={termMonths}
              onChange={setTermMonths}
              min={12}
              max={84}
              step={12}
              helpText="Number of months to repay."
              tooltip="How long you have to repay the loan. A longer term lowers monthly payments but increases total interest."
            />
            <CalculatorInput
              label="Annual interest rate (%)"
              value={interestRate}
              onChange={setInterestRate}
              min={1}
              max={20}
              step={0.1}
              helpText="The estimated annual interest rate offered by the lender."
              tooltip="The yearly interest rate charged by the bank or lender."
            />
          </div>
        </div>

        {/* RIGHT: Gradient result */}
        <GradientResult
          label="Estimated monthly payment"
          actions={
            <ResultActions
              calculatorType="Car Loan Calculator"
              resultsSummary={resultsSummary}
            />
          }
          eyebrow="Per month"
          figure={formatPeso(result.monthlyPayment)}
          sub={`over ${termMonths} months`}
        >
          {result.loanAmount > 0 && (
            <SplitBar
              leftLabel={`Principal · ${Math.round(principalPct)}%`}
              leftValue={formatPeso(result.loanAmount)}
              leftPct={principalPct}
              rightLabel={`Interest · ${Math.round(interestPct)}%`}
              rightValue={formatPeso(result.totalInterest)}
              total={`Total of payments · ${formatPeso(totalOfPayments)}`}
            />
          )}

          <BreakdownCard
            title="Cost breakdown"
            note="Based on standard monthly amortization (declining-balance interest). Total cost includes your down payment."
          >
            <BreakdownRow label="Car price" value={formatPeso(vehiclePrice)} />
            <BreakdownRow
              label={`– Down payment (${downPaymentPercent}%)`}
              value={`−${formatPeso(result.downPaymentAmount)}`}
              tone="negative"
            />
            <BreakdownRow label="Loan amount" value={formatPeso(result.loanAmount)} />
            <BreakdownRow
              label="+ Total interest"
              value={`+${formatPeso(result.totalInterest)}`}
              tone="positive"
            />
            <BreakdownRow
              label="Total cost (incl. down payment)"
              value={formatPeso(result.totalCost)}
              tone="total"
              strong
            />
          </BreakdownCard>
        </GradientResult>
      </div>

      {/* Amortization Table */}
      {result.schedule.length > 0 && (
        <div className="overflow-hidden rounded-[18px] border border-[#E7EBF3] bg-white shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <h3 className="px-6 pb-4 pt-6 font-display text-[18px] font-semibold text-[#0E1525]">
            Amortization schedule
          </h3>
          <AmortizationTable schedule={result.schedule} />
        </div>
      )}
    </div>
  );
}
