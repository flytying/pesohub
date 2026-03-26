"use client";

import { useState, useMemo } from "react";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import { CalculatorResult } from "@/components/calculators/calculator-result";
import { ResultPanel } from "@/components/calculators/result-panel";
import {
  calculateSSSContribution,
  MEMBER_TYPE_LABELS,
  type SSSMemberType,
} from "@/lib/calculators/sss-contribution";
import { formatPeso } from "@/lib/formatters";
import { Separator } from "@/components/ui/separator";
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

  const result = useMemo(() => {
    return calculateSSSContribution({ monthlySalary, memberType });
  }, [monthlySalary, memberType]);

  return (
    <div className="space-y-6">
      <CalculatorShell
        title="SSS Contribution Calculator"
        variant="split"
        resultsSummary={[
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
          .join("\n")}
      >
        {/* LEFT: Result Panel */}
        <ResultPanel className="flex flex-col justify-between">
          <div className="text-center">
            <p className="text-[14px] font-bold uppercase tracking-[0.1em] text-gray-300">
              Estimated Total Contribution
            </p>
            <p className="mt-2 text-[36px] font-semibold tabular-nums text-brand sm:text-[42px] animate-count-up">
              {formatPeso(result.totalContribution)}
            </p>
            <p className="mt-2 text-sm text-gray-400">
              MSC: {formatPeso(result.monthlySalaryCredit, 0)} •{" "}
              {MEMBER_TYPE_LABELS[memberType]}
            </p>
          </div>

          {/* Contribution bar visual */}
          <div className="my-6 space-y-3">
            <p className="text-[14px] font-medium text-gray-400">
              Contribution Breakdown
            </p>
            {result.isSharedContribution ? (
              <>
                <ContributionBar
                  label="Employee Share"
                  value={result.employeeShare}
                  total={result.totalContribution}
                  highlight
                />
                <ContributionBar
                  label="Employer Share"
                  value={result.employerShare}
                  total={result.totalContribution}
                />
              </>
            ) : (
              <ContributionBar
                label="Full Contribution (You Pay)"
                value={result.totalContribution}
                total={result.totalContribution}
                highlight
              />
            )}
          </div>

          <div className="space-y-1">
            {result.isSharedContribution ? (
              <>
                <CalculatorResult
                  label="Employee Share"
                  value={formatPeso(result.employeeShare)}
                  highlight
                />
                <CalculatorResult
                  label="Employer Share"
                  value={formatPeso(result.employerShare)}
                />
              </>
            ) : (
              <CalculatorResult
                label="Your Contribution"
                value={formatPeso(result.memberContribution)}
                highlight
              />
            )}
            <CalculatorResult
              label="Monthly Salary Credit"
              value={formatPeso(result.monthlySalaryCredit)}
            />
            <CalculatorResult
              label="Member Type Used"
              value={MEMBER_TYPE_LABELS[memberType]}
            />
          </div>
        </ResultPanel>

        {/* RIGHT: Inputs */}
        <div className="space-y-6 p-8">
          <CalculatorInput
            label="Monthly Compensation or Salary"
            value={monthlySalary}
            onChange={setMonthlySalary}
            prefix="₱"
            min={0}
            max={100_000}
            step={1_000}
            helpText="Enter your monthly salary or compensation amount."
            tooltip="Your monthly salary or declared earnings used to determine your SSS contribution bracket."
          />

          <div className="space-y-2">
            <Label htmlFor="member-type">Member Type</Label>
            <select
              id="member-type"
              value={memberType}
              onChange={(e) =>
                setMemberType(e.target.value as SSSMemberType)
              }
              className="flex h-9 w-full rounded-lg border border-gray-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20 focus-visible:outline-none"
            >
              {MEMBER_TYPES.map((type) => (
                <option key={type} value={type}>
                  {MEMBER_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
            <p className="text-[14px] text-gray-400">
              Choose the classification that best matches your current SSS status.
            </p>
          </div>

          <Separator />

          {/* Reference info */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-[14px] font-medium text-gray-500">
              Contribution Schedule Reference
            </p>
            <p className="mt-1 text-[14px] text-gray-400">
              Effective January 2025. Based on the SSS contribution table with
              MSC range ₱4,000–₱30,000 and a 14% total contribution rate for
              employed members (4.5% employee + 9.5% employer).
            </p>
          </div>

          {/* Scope note */}
          <p className="text-[14px] text-gray-400">
            This tool focuses on SSS contribution estimates only. For tax or
            fuller net-pay estimates, use the related salary calculators.
          </p>
        </div>
      </CalculatorShell>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Contribution bar sub-component
// ---------------------------------------------------------------------------

function ContributionBar({
  label,
  value,
  total,
  highlight = false,
}: {
  label: string;
  value: number;
  total: number;
  highlight?: boolean;
}) {
  const percentage = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[14px]">
        <span className={highlight ? "font-medium text-gray-500" : "text-gray-400"}>
          {label}
        </span>
        <span className={highlight ? "font-bold text-brand" : "text-gray-400"}>
          {formatPeso(value)}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            highlight ? "bg-brand" : "bg-gray-300"
          }`}
          style={{ width: `${Math.max(percentage, 2)}%` }}
        />
      </div>
    </div>
  );
}
