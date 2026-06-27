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
  calculateSSSContribution,
  MEMBER_TYPE_LABELS,
  type SSSMemberType,
} from "@/lib/calculators/sss-contribution";
import { formatPeso } from "@/lib/formatters";
import { Label } from "@/components/ui/label";

const MEMBER_TYPES: SSSMemberType[] = [
  "employee",
  "self_employed",
  "voluntary",
  "non_working_spouse",
  "ofw",
];

export function SSSContributionCalculator() {
  const [monthlySalary, setMonthlySalary] = useState(25_000);
  const [memberType, setMemberType] = useState<SSSMemberType>("employee");

  const result = useMemo(
    () => calculateSSSContribution({ monthlySalary, memberType }),
    [monthlySalary, memberType]
  );

  const employeePct =
    result.totalContribution > 0
      ? (result.employeeShare / result.totalContribution) * 100
      : 50;

  const resultsSummary = [
    `Monthly Compensation or Salary: ${formatPeso(monthlySalary)}`,
    `Member Type Used: ${MEMBER_TYPE_LABELS[memberType]}`,
    `Estimated Total Contribution: ${formatPeso(result.totalContribution)}`,
    result.isSharedContribution
      ? `Employee Share: ${formatPeso(result.employeeShare)}`
      : `Your Contribution: ${formatPeso(result.memberContribution)}`,
    result.isSharedContribution
      ? `Employer Share: ${formatPeso(result.employerShare)}`
      : "",
    `Monthly Salary Credit: ${formatPeso(result.monthlySalaryCredit)}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* LEFT: Inputs */}
      <div className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,28px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-[18px] font-semibold text-[#0E1525]">
            Member details
          </h2>
          <button
            type="button"
            onClick={() => {
              setMonthlySalary(25_000);
              setMemberType("employee");
            }}
            className="text-[14px] font-bold text-brand transition-colors hover:text-brand-light"
          >
            Reset
          </button>
        </div>
        <div className="space-y-6">
          <CalculatorInput
            label="Monthly compensation or salary"
            value={monthlySalary}
            onChange={setMonthlySalary}
            prefix="₱"
            min={0}
            max={100_000}
            step={1_000}
            helpText="Your monthly salary or declared earnings."
            tooltip="Used to determine your SSS contribution bracket."
          />
          <div className="space-y-2">
            <Label htmlFor="member-type" className="text-[15px] font-semibold text-[#344054]">
              Member type
            </Label>
            <select
              id="member-type"
              value={memberType}
              onChange={(e) => setMemberType(e.target.value as SSSMemberType)}
              className="flex h-11 w-full rounded-[12px] border border-[#D6DEEC] bg-white px-3 text-[15px] text-[#0E1525] focus-visible:border-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/15"
            >
              {MEMBER_TYPES.map((type) => (
                <option key={type} value={type}>
                  {MEMBER_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </div>
          <div className="rounded-[14px] border border-[#E7EBF3] bg-[#F7F9FD] p-4">
            <p className="text-[14px] font-bold text-[#0E1525]">
              Contribution schedule reference
            </p>
            <p className="mt-1 text-[14px] leading-[1.5] text-[#6B7488]">
              Effective January 2025. Based on the SSS contribution table with
              MSC range ₱4,000–₱30,000 and a 14% total rate for employed members
              (4.5% employee + 9.5% employer).
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: Gradient result */}
      <GradientResult
        label="Estimated total contribution"
        actions={
          <ResultActions
            calculatorType="SSS Contribution Calculator"
            resultsSummary={resultsSummary}
          />
        }
        eyebrow="Per month"
        figure={formatPeso(result.totalContribution)}
        sub={`MSC ${formatPeso(result.monthlySalaryCredit, 0)} · ${MEMBER_TYPE_LABELS[memberType]}`}
      >
        {result.isSharedContribution && (
          <SplitBar
            leftLabel={`Employee · ${Math.round(employeePct)}%`}
            leftValue={formatPeso(result.employeeShare)}
            leftPct={employeePct}
            rightLabel={`Employer · ${Math.round(100 - employeePct)}%`}
            rightValue={formatPeso(result.employerShare)}
            total={`Total · ${formatPeso(result.totalContribution)}`}
          />
        )}
        <BreakdownCard title="Contribution breakdown">
          {result.isSharedContribution ? (
            <>
              <BreakdownRow
                label="Employee share"
                value={formatPeso(result.employeeShare)}
              />
              <BreakdownRow
                label="Employer share"
                value={formatPeso(result.employerShare)}
              />
            </>
          ) : (
            <BreakdownRow
              label="Your contribution"
              value={formatPeso(result.memberContribution)}
            />
          )}
          <BreakdownRow
            label="Monthly salary credit"
            value={formatPeso(result.monthlySalaryCredit)}
          />
          <BreakdownRow
            label="Total contribution"
            value={formatPeso(result.totalContribution)}
            tone="total"
            strong
          />
        </BreakdownCard>
      </GradientResult>
    </div>
  );
}
