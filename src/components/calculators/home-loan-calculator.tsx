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

interface HomeLoanCalculatorProps {
  beforeYouStart?: {
    title?: string;
    description: string;
    items: string[];
  };
}

const DEFAULTS = {
  propertyPrice: 3_500_000,
  downPaymentPercent: 20,
  termYears: 20,
  interestRate: 7,
};

export function HomeLoanCalculator(_: HomeLoanCalculatorProps = {}) {
  const [propertyPrice, setPropertyPrice] = useState(DEFAULTS.propertyPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(
    DEFAULTS.downPaymentPercent
  );
  const [termYears, setTermYears] = useState(DEFAULTS.termYears);
  const [interestRate, setInterestRate] = useState(DEFAULTS.interestRate);

  const reset = () => {
    setPropertyPrice(DEFAULTS.propertyPrice);
    setDownPaymentPercent(DEFAULTS.downPaymentPercent);
    setTermYears(DEFAULTS.termYears);
    setInterestRate(DEFAULTS.interestRate);
  };

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

  const totalOfPayments = result.loanAmount + result.totalInterest;
  const principalPct =
    totalOfPayments > 0 ? (result.loanAmount / totalOfPayments) * 100 : 100;

  const resultsSummary = [
    `Property Price: ${formatPeso(propertyPrice)}`,
    `Down Payment (${downPaymentPercent}%): ${formatPeso(result.downPaymentAmount)}`,
    `Loan Amount: ${formatPeso(result.loanAmount)}`,
    `Interest Rate: ${interestRate}% p.a.`,
    `Term: ${termYears} years`,
    `Monthly Payment: ${formatPeso(result.monthlyPayment)}`,
    `Total Interest: ${formatPeso(result.totalInterest)}`,
    `Total Cost: ${formatPeso(result.totalCost)}`,
  ].join("\n");

  return (
    <div className="space-y-6">
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
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
              label="Property price"
              value={propertyPrice}
              onChange={setPropertyPrice}
              prefix="₱"
              min={500_000}
              max={50_000_000}
              step={100_000}
              helpText="Total price of the home, condo, or property."
              tooltip="The total selling price of the property including VAT, if applicable."
            />
            <CalculatorInput
              label="Down payment (%)"
              value={downPaymentPercent}
              onChange={setDownPaymentPercent}
              min={0}
              max={90}
              step={1}
              helpText="Amount you pay upfront — a bigger down payment lowers the loan."
              tooltip="A higher down payment reduces the loan amount and monthly payments."
            />
            <CalculatorInput
              label="Loan term (years)"
              value={termYears}
              onChange={setTermYears}
              min={5}
              max={30}
              step={1}
              helpText="Number of years to repay."
              tooltip="Home loans typically range from 5 to 30 years."
            />
            <CalculatorInput
              label="Annual interest rate (%)"
              value={interestRate}
              onChange={setInterestRate}
              min={1}
              max={20}
              step={0.1}
              helpText="The estimated annual interest rate offered by the lender."
              tooltip="Some lenders offer a fixed rate for the first few years, then a variable rate."
            />
          </div>
        </div>

        <GradientResult
          label="Estimated monthly payment"
          actions={
            <ResultActions
              calculatorType="Home Loan Calculator"
              resultsSummary={resultsSummary}
            />
          }
          eyebrow="Per month"
          figure={formatPeso(result.monthlyPayment)}
          sub={`over ${termYears} years`}
        >
          {result.loanAmount > 0 && (
            <SplitBar
              leftLabel={`Principal · ${Math.round(principalPct)}%`}
              leftValue={formatPeso(result.loanAmount)}
              leftPct={principalPct}
              rightLabel={`Interest · ${Math.round(100 - principalPct)}%`}
              rightValue={formatPeso(result.totalInterest)}
              total={`Total of payments · ${formatPeso(totalOfPayments)}`}
            />
          )}
          <BreakdownCard
            title="Cost breakdown"
            note="Based on standard monthly amortization (declining-balance interest). Total cost includes your down payment."
          >
            <BreakdownRow label="Property price" value={formatPeso(propertyPrice)} />
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
