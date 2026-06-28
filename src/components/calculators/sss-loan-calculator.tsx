"use client";

import { useState, useMemo } from "react";
import { Info } from "lucide-react";
import { ResultActions } from "@/components/calculators/result-actions";
import { MoneyField, SelectField, GreenSlider } from "@/components/calculators/green-fields";
import {
  GradientResult,
  MixBar,
  ProgressLine,
  BreakdownCard,
  BreakdownRow,
} from "@/components/calculators/gradient-result";
import {
  calculateSSSLoan,
  SSS_LOAN_TYPE_LABELS,
  SSS_LOAN_ANNUAL_RATE,
  type SSSLoanType,
} from "@/lib/calculators/sss-loan";
import { formatPeso, formatNumber } from "@/lib/formatters";
import { cn } from "@/lib/utils";

const DEFAULTS = {
  loanAmount: 40_000,
  termMonths: 24,
  loanType: "salary" as SSSLoanType,
};

const COMPARE_TERMS = [6, 12, 18, 24];

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
    <div className="grid items-stretch gap-[18px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Inputs */}
      <div className="flex flex-col">
        <div className="h-full rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(18px,2.5vw,26px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#0E1525]">Loan details</h2>
            <button
              type="button"
              onClick={reset}
              className="text-[14px] font-semibold text-[#0B8270] transition-opacity hover:opacity-80"
            >
              Reset
            </button>
          </div>

          <div className="space-y-5">
            <SelectField
              label="Loan type"
              tip="SSS salary loans deduct a 1% service fee from the proceeds; calamity loans have no service fee."
              value={loanType}
              onChange={(v) => setLoanType(v as SSSLoanType)}
            >
              <option value="salary">SSS Salary Loan</option>
              <option value="calamity">SSS Calamity Loan</option>
            </SelectField>

            <MoneyField
              label="Loan amount"
              tip="SSS salary loans are typically 1–2 months of your average monthly salary credit; calamity loans up to 1 month. Enter your approved amount."
              value={loanAmount}
              onChange={setLoanAmount}
              min={2_000}
              max={200_000}
              step={1_000}
            />

            <GreenSlider
              label="Term (months)"
              tip="SSS member loans are amortized over up to 24 monthly installments."
              value={termMonths}
              display={`${termMonths} months`}
              min={6}
              max={24}
              step={6}
              onChange={setTermMonths}
            />

            <div className="flex items-start gap-[11px] rounded-[13px] border border-[#EDF1F8] bg-[#F7F9FD] p-[13px_15px]">
              <Info className="mt-0.5 size-[18px] shrink-0 text-brand" />
              <span className="text-[14px] leading-[1.55] text-[#475069]">
                Fixed 10% annual interest on a diminishing balance, repaid over up to 24 months.
                A 1% service fee applies to salary loans. Penalties apply to missed payments.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Green result */}
      <GradientResult
        accent="green"
        label="Monthly amortization"
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
          <MixBar
            title="Where your repayment goes"
            segments={[
              { label: "Principal", value: loanAmount, color: "#7FE3DC" },
              { label: "Interest", value: result.totalInterest, color: "#FFB38A" },
            ]}
            footer={
              <ProgressLine
                label="Principal"
                valueLabel={`${Math.round(principalPct)}% of repayment`}
                pct={principalPct}
              />
            }
          />
        )}
        <BreakdownCard
          title="Cost breakdown"
          note="Estimate based on 10% annual interest on a diminishing balance. Actual SSS amortization may differ with penalties or rounding."
        >
          <BreakdownRow label="Loan amount" value={formatPeso(loanAmount)} />
          {result.serviceFee > 0 && (
            <BreakdownRow
              label="− Service fee (1%)"
              value={`−${formatPeso(result.serviceFee)}`}
              tone="negative"
            />
          )}
          <BreakdownRow label="Net proceeds (you receive)" value={formatPeso(result.netProceeds)} />
          <BreakdownRow
            label="+ Total interest"
            value={`+${formatPeso(result.totalInterest)}`}
            tone="positive"
          />
          <BreakdownRow
            label="Total repayment"
            value={formatPeso(result.totalRepayment)}
            tone="total-green"
            strong
          />
        </BreakdownCard>
      </GradientResult>

      {/* Compare terms */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)] lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-display text-[20px] font-semibold text-[#0E1525]">Compare repayment terms</h3>
          <span className="text-[15px] text-[#6B7488]">Same amount · tap to apply</span>
        </div>
        <p className="mb-[18px] mt-[7px] text-[15px] text-[#6B7488]">
          A longer term lowers the monthly amortization but raises total interest — on a{" "}
          ₱{formatNumber(loanAmount)} {SSS_LOAN_TYPE_LABELS[loanType].toLowerCase()}.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {COMPARE_TERMS.map((m) => {
            const rr = calculateSSSLoan({ loanAmount, termMonths: m, loanType });
            const on = termMonths === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => setTermMonths(m)}
                className={cn(
                  "rounded-[15px] border-[1.5px] p-4 text-left transition-colors",
                  on ? "border-[#0B8270] bg-[#E6F5F1]" : "border-[#E7EBF3] hover:border-[#9FD8CC]"
                )}
              >
                <div className="text-[15px] font-bold text-[#5A6478]">{m} months</div>
                <div className="mb-[2px] mt-[7px] font-display text-[22px] font-bold tabular-nums text-[#0E1525]">
                  ₱{formatNumber(rr.monthlyPayment)}
                </div>
                <div className="text-[15px] text-[#6B7488]">per month</div>
                <div className="mt-[9px] text-[14px] tabular-nums text-[#5A6478]">
                  Interest ₱{formatNumber(rr.totalInterest)}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
