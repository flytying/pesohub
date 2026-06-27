"use client";

import { useState, useMemo } from "react";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { ResultActions } from "@/components/calculators/result-actions";
import {
  GradientResult,
  SplitBar,
  BreakdownCard,
  BreakdownRow,
} from "@/components/calculators/gradient-result";
import {
  calculateSSSLoan,
  SSS_LOAN_TYPE_LABELS,
  SSS_LOAN_ANNUAL_RATE,
  type SSSLoanType,
} from "@/lib/calculators/sss-loan";
import { formatPeso } from "@/lib/formatters";
import { Label } from "@/components/ui/label";

const DEFAULTS = {
  loanAmount: 40_000,
  termMonths: 24,
  loanType: "salary" as SSSLoanType,
};

export function SSSLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(DEFAULTS.loanAmount);
  const [termMonths, setTermMonths] = useState(DEFAULTS.termMonths);
  const [loanType, setLoanType] = useState<SSSLoanType>(DEFAULTS.loanType);

  const reset = () => {
    setLoanAmount(DEFAULTS.loanAmount);
    setTermMonths(DEFAULTS.termMonths);
    setLoanType(DEFAULTS.loanType);
  };

  const result = useMemo(
    () => calculateSSSLoan({ loanAmount, termMonths, loanType }),
    [loanAmount, termMonths, loanType]
  );

  const total = loanAmount + result.totalInterest;
  const principalPct = total > 0 ? (loanAmount / total) * 100 : 100;

  const resultsSummary = [
    `Loan Type: ${SSS_LOAN_TYPE_LABELS[loanType]}`,
    `Loan Amount: ${formatPeso(loanAmount)}`,
    `Interest Rate: ${SSS_LOAN_ANNUAL_RATE}% p.a. (diminishing)`,
    `Term: ${termMonths} months`,
    `Monthly Amortization: ${formatPeso(result.monthlyPayment)}`,
    `Service Fee: ${formatPeso(result.serviceFee)}`,
    `Net Proceeds: ${formatPeso(result.netProceeds)}`,
    `Total Interest: ${formatPeso(result.totalInterest)}`,
    `Total Repayment: ${formatPeso(result.totalRepayment)}`,
  ].join("\n");

  return (
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
          <div className="space-y-2">
            <Label htmlFor="loan-type" className="text-[15px] font-semibold text-[#344054]">
              Loan type
            </Label>
            <select
              id="loan-type"
              value={loanType}
              onChange={(e) => setLoanType(e.target.value as SSSLoanType)}
              className="flex h-11 w-full rounded-[12px] border border-[#D6DEEC] bg-white px-3 text-[15px] text-[#0E1525] focus-visible:border-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/15"
            >
              <option value="salary">SSS Salary Loan</option>
              <option value="calamity">SSS Calamity Loan</option>
            </select>
            <p className="text-[14px] text-[#6B7488]">
              Salary loans deduct a 1% service fee; calamity loans have none.
            </p>
          </div>
          <CalculatorInput
            label="Loan amount"
            value={loanAmount}
            onChange={setLoanAmount}
            prefix="₱"
            min={2_000}
            max={200_000}
            step={1_000}
            helpText="The approved loan amount (often 1–2× your monthly salary credit)."
            tooltip="SSS salary loans are typically 1–2 months of your average monthly salary credit; calamity loans up to 1 month."
          />
          <CalculatorInput
            label="Term (months)"
            value={termMonths}
            onChange={setTermMonths}
            min={6}
            max={24}
            step={6}
            helpText="SSS member loans are repaid over 24 months."
            tooltip="Both salary and calamity loans are amortized over 24 monthly installments."
          />
          <div className="rounded-[14px] border border-[#E7EBF3] bg-[#F7F9FD] p-4">
            <p className="text-[14px] font-bold text-[#0E1525]">
              SSS loan terms
            </p>
            <p className="mt-1 text-[14px] leading-[1.5] text-[#6B7488]">
              Fixed 10% annual interest on a diminishing balance, repaid over 24
              months. A 1% service fee applies to salary loans. Penalties apply
              to missed payments.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: Gradient result */}
      <GradientResult
        label="Estimated monthly amortization"
        actions={
          <ResultActions
            calculatorType="SSS Loan Calculator"
            resultsSummary={resultsSummary}
          />
        }
        eyebrow="Per month"
        figure={formatPeso(result.monthlyPayment)}
        sub={`${SSS_LOAN_TYPE_LABELS[loanType]} · ${termMonths} months · 10% p.a.`}
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
          note="Estimate based on 10% annual interest on a diminishing balance. Actual SSS amortization may differ with penalties or rounding."
        >
          <BreakdownRow label="Loan amount" value={formatPeso(loanAmount)} />
          {result.serviceFee > 0 && (
            <BreakdownRow
              label="– Service fee (1%)"
              value={`−${formatPeso(result.serviceFee)}`}
              tone="negative"
            />
          )}
          <BreakdownRow
            label="Net proceeds (you receive)"
            value={formatPeso(result.netProceeds)}
          />
          <BreakdownRow
            label="+ Total interest"
            value={`+${formatPeso(result.totalInterest)}`}
            tone="positive"
          />
          <BreakdownRow
            label="Total repayment"
            value={formatPeso(result.totalRepayment)}
            tone="total"
            strong
          />
        </BreakdownCard>
      </GradientResult>
    </div>
  );
}
