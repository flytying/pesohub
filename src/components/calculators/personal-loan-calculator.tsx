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

interface PersonalLoanCalculatorProps {
  beforeYouStart?: {
    title?: string;
    description: string;
    items: string[];
  };
}

const DEFAULTS = { loanAmount: 100_000, termMonths: 36, interestRate: 12 };

export function PersonalLoanCalculator(_: PersonalLoanCalculatorProps = {}) {
  const [loanAmount, setLoanAmount] = useState(DEFAULTS.loanAmount);
  const [termMonths, setTermMonths] = useState(DEFAULTS.termMonths);
  const [interestRate, setInterestRate] = useState(DEFAULTS.interestRate);

  const reset = () => {
    setLoanAmount(DEFAULTS.loanAmount);
    setTermMonths(DEFAULTS.termMonths);
    setInterestRate(DEFAULTS.interestRate);
  };

  const result = useMemo(() => {
    if (loanAmount <= 0) {
      return { monthlyPayment: 0, totalInterest: 0, totalCost: 0, schedule: [] };
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

  const total = loanAmount + result.totalInterest;
  const principalPct = total > 0 ? (loanAmount / total) * 100 : 100;

  const resultsSummary = [
    `Loan Amount: ${formatPeso(loanAmount)}`,
    `Interest Rate: ${interestRate}% p.a.`,
    `Term: ${termMonths} months`,
    `Monthly Payment: ${formatPeso(result.monthlyPayment)}`,
    `Total Interest: ${formatPeso(result.totalInterest)}`,
    `Total Repayment: ${formatPeso(result.totalCost)}`,
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
              label="Loan amount"
              value={loanAmount}
              onChange={setLoanAmount}
              prefix="₱"
              min={10_000}
              max={3_000_000}
              step={5_000}
              helpText="The amount you want to borrow."
              tooltip="The total amount you plan to borrow, excluding fees and charges."
            />
            <CalculatorInput
              label="Repayment term (months)"
              value={termMonths}
              onChange={setTermMonths}
              min={3}
              max={60}
              step={1}
              helpText="Number of months to repay."
              tooltip="A longer term lowers monthly payments but increases total interest."
            />
            <CalculatorInput
              label="Annual interest rate (%)"
              value={interestRate}
              onChange={setInterestRate}
              min={1}
              max={60}
              step={0.1}
              helpText="The estimated annual interest rate offered by the lender."
              tooltip="The yearly interest rate charged by the lender."
            />
          </div>
        </div>

        <GradientResult
          label="Estimated monthly payment"
          actions={
            <ResultActions
              calculatorType="Personal Loan Calculator"
              resultsSummary={resultsSummary}
            />
          }
          eyebrow="Per month"
          figure={formatPeso(result.monthlyPayment)}
          sub={`over ${termMonths} months`}
        >
          {loanAmount > 0 && (
            <SplitBar
              leftLabel={`Principal · ${Math.round(principalPct)}%`}
              leftValue={formatPeso(loanAmount)}
              leftPct={principalPct}
              rightLabel={`Interest · ${Math.round(100 - principalPct)}%`}
              rightValue={formatPeso(result.totalInterest)}
              total={`Total of payments · ${formatPeso(total)}`}
            />
          )}
          <BreakdownCard
            title="Cost breakdown"
            note="Based on standard monthly amortization (declining-balance interest)."
          >
            <BreakdownRow label="Loan amount" value={formatPeso(loanAmount)} />
            <BreakdownRow
              label="+ Total interest"
              value={`+${formatPeso(result.totalInterest)}`}
              tone="positive"
            />
            <BreakdownRow
              label="Total repayment"
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
