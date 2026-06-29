"use client";

import { useMemo, useState } from "react";
import { CalculatorInput } from "@/components/calculators/calculator-input";
import {
  SavingsInterestCalculator,
  type SavingsAccountOption,
} from "@/components/calculators/savings-interest-calculator";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { formatPeso, formatPercent } from "@/lib/formatters";

const TAX_RATE = 0.2;

const selectClass =
  "flex h-11 w-full rounded-[12px] border border-[#D6DEEC] bg-white px-3 text-[15px] text-[#0E1525] focus-visible:border-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/15";

type Mode = "compare" | "single";

/** Two-tab shell shared by both comparison calculators. */
function ModeTabs({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const tabs: { value: Mode; label: string }[] = [
    { value: "compare", label: "Compare accounts" },
    { value: "single", label: "Single account estimate" },
  ];
  return (
    <div className="mb-6 inline-flex rounded-[12px] border border-[#E7EBF3] bg-[#F5F6FF] p-1">
      {tabs.map((t) => (
        <button
          key={t.value}
          type="button"
          onClick={() => setMode(t.value)}
          aria-pressed={mode === t.value}
          className={`rounded-[9px] px-4 py-2 text-[14px] font-bold transition-colors ${
            mode === t.value
              ? "bg-white text-brand shadow-[0_1px_2px_rgba(16,24,40,.08)]"
              : "text-[#5A6478] hover:text-[#0E1525]"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function SharedInputs({
  deposit,
  setDeposit,
  months,
  setMonths,
  children,
}: {
  deposit: number;
  setDeposit: (v: number) => void;
  months: number;
  setMonths: (v: number) => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-5 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,28px)] shadow-[0_1px_2px_rgba(16,24,40,.04)] sm:grid-cols-2 lg:grid-cols-4">
      <CalculatorInput
        label="Deposit amount"
        value={deposit}
        onChange={setDeposit}
        prefix="₱"
        min={1_000}
        max={5_000_000}
        step={1_000}
        helpText="The balance you expect to maintain."
        tooltip="Some promo rates only apply up to a balance cap."
      />
      <CalculatorInput
        label="Holding period (months)"
        value={months}
        onChange={setMonths}
        min={1}
        max={60}
        step={1}
        helpText="How long you plan to keep the money saved."
        tooltip="Used to estimate total interest over your holding period."
      />
      {children}
    </div>
  );
}

interface SummaryRow {
  label: string;
  rate: number;
  grossAnnual: number;
}

function PeriodSummary({
  rows,
  months,
}: {
  rows: SummaryRow[];
  months: number;
}) {
  const top = rows[0];
  if (!top) return null;
  const periodInterest = (top.grossAnnual * months) / 12;
  return (
    <p className="mt-4 text-[15px] leading-[1.6] text-[#5A6478]">
      Top option:{" "}
      <span className="font-semibold text-[#0E1525]">{top.label}</span> at{" "}
      <span className="font-semibold text-brand">
        {formatPercent(top.rate)} p.a.
      </span>{" "}
      — about{" "}
      <span className="font-semibold text-[#0E1525]">
        {formatPeso(periodInterest)}
      </span>{" "}
      gross interest over {months} {months === 1 ? "month" : "months"} (before
      the 20% withholding tax).
    </p>
  );
}

// ---------------------------------------------------------------------------
// Savings comparison (broad savings page)
// ---------------------------------------------------------------------------

export interface SavingsComparisonRow {
  bankName: string;
  accountType: string;
  rate: number;
  rateType: "Promo" | "Standard";
  bankType: "digital" | "traditional";
  minimumBalance: number;
  conditions: string;
}

export function SavingsComparison({
  rows,
  accounts,
}: {
  rows: SavingsComparisonRow[];
  accounts: SavingsAccountOption[];
}) {
  const [mode, setMode] = useState<Mode>("compare");
  const [deposit, setDeposit] = useState(50_000);
  const [months, setMonths] = useState(12);
  const [applyTax, setApplyTax] = useState(true);
  const [typeFilter, setTypeFilter] = useState<"all" | "digital" | "traditional">("all");
  const [rateFilter, setRateFilter] = useState<"all" | "standard" | "promo">("all");

  const computed = useMemo(() => {
    return rows
      .filter((r) => (typeFilter === "all" ? true : r.bankType === typeFilter))
      .filter((r) => {
        if (rateFilter === "standard") return r.rateType === "Standard";
        if (rateFilter === "promo") return r.rateType === "Promo";
        return true;
      })
      .map((r) => {
        const grossAnnual = (deposit * r.rate) / 100;
        const afterTaxAnnual = grossAnnual * (1 - TAX_RATE);
        const annual = applyTax ? afterTaxAnnual : grossAnnual;
        return {
          ...r,
          grossAnnual,
          afterTaxAnnual,
          annual,
          monthly: annual / 12,
        };
      })
      .sort((a, b) => b.rate - a.rate);
  }, [rows, deposit, applyTax, typeFilter, rateFilter]);

  return (
    <div>
      <ModeTabs mode={mode} setMode={setMode} />

      {mode === "single" ? (
        <SavingsInterestCalculator accounts={accounts} />
      ) : (
        <>
          <SharedInputs
            deposit={deposit}
            setDeposit={setDeposit}
            months={months}
            setMonths={setMonths}
          >
            <div className="space-y-2">
              <Label htmlFor="account-type-filter" className="text-[16px] font-semibold leading-[1.6] text-gray-500">
                Account type
              </Label>
              <select
                id="account-type-filter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
                className={selectClass}
              >
                <option value="all">All accounts</option>
                <option value="digital">Digital banks</option>
                <option value="traditional">Traditional banks</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate-type-filter" className="text-[16px] font-semibold leading-[1.6] text-gray-500">
                Rate type
              </Label>
              <select
                id="rate-type-filter"
                value={rateFilter}
                onChange={(e) => setRateFilter(e.target.value as typeof rateFilter)}
                className={selectClass}
              >
                <option value="all">All rates</option>
                <option value="standard">Standard only</option>
                <option value="promo">Promo only</option>
              </select>
            </div>
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <Label htmlFor="tax-assumption" className="text-[16px] font-semibold leading-[1.6] text-gray-500">
                Tax assumption
              </Label>
              <select
                id="tax-assumption"
                value={applyTax ? "after" : "before"}
                onChange={(e) => setApplyTax(e.target.value === "after")}
                className={selectClass}
              >
                <option value="after">After 20% withholding tax</option>
                <option value="before">Before tax (gross)</option>
              </select>
            </div>
          </SharedInputs>

          <PeriodSummary
            rows={computed.map((r) => ({
              label: `${r.bankName} — ${r.accountType}`,
              rate: r.rate,
              grossAnnual: r.grossAnnual,
            }))}
            months={months}
          />

          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Account</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Est. monthly interest</TableHead>
                  <TableHead className="text-right">Est. annual interest</TableHead>
                  <TableHead className="text-right">After-tax annual</TableHead>
                  <TableHead className="hidden md:table-cell">Conditions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {computed.map((r) => (
                  <TableRow key={`${r.bankName}-${r.accountType}`}>
                    <TableCell className="font-medium">
                      {r.bankName}
                      <span className="block text-[13px] font-normal text-gray-400">
                        {r.accountType}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-brand">
                      {formatPercent(r.rate)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatPeso(r.monthly)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatPeso(r.annual)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-[#0E9F6E]">
                      {formatPeso(r.afterTaxAnnual)}
                    </TableCell>
                    <TableCell className="hidden text-[14px] text-gray-400 md:table-cell">
                      {r.conditions}
                    </TableCell>
                  </TableRow>
                ))}
                {computed.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-[14px] text-gray-400">
                      No accounts match the selected filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-[13px] leading-[1.5] text-gray-400">
            Estimates use simple interest on the deposit amount. Promo rates may
            require conditions or apply only up to a balance cap, so actual
            earnings can differ. Switch to <strong>Single account estimate</strong>{" "}
            for a detailed breakdown of one account.
          </p>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Digital bank comparison (digital bank page)
// ---------------------------------------------------------------------------

export interface DigitalComparisonRow {
  bankName: string;
  baseRate: number;
  promoRate: number | null;
  balanceCap: string;
  requirement: string;
}

export function DigitalBankComparison({
  rows,
  accounts,
}: {
  rows: DigitalComparisonRow[];
  accounts: SavingsAccountOption[];
}) {
  const [mode, setMode] = useState<Mode>("compare");
  const [deposit, setDeposit] = useState(50_000);
  const [months, setMonths] = useState(12);
  const [applyTax, setApplyTax] = useState(true);
  const [basis, setBasis] = useState<"base" | "promo">("base");

  const computed = useMemo(() => {
    return rows
      .map((r) => {
        const usedRate =
          basis === "promo" && r.promoRate != null ? r.promoRate : r.baseRate;
        const grossAnnual = (deposit * usedRate) / 100;
        const afterTaxAnnual = grossAnnual * (1 - TAX_RATE);
        const annual = applyTax ? afterTaxAnnual : grossAnnual;
        return {
          ...r,
          usedRate,
          grossAnnual,
          annual,
          monthly: annual / 12,
        };
      })
      .sort((a, b) => b.usedRate - a.usedRate);
  }, [rows, deposit, applyTax, basis]);

  return (
    <div>
      <ModeTabs mode={mode} setMode={setMode} />

      {mode === "single" ? (
        <SavingsInterestCalculator accounts={accounts} />
      ) : (
        <>
          <SharedInputs
            deposit={deposit}
            setDeposit={setDeposit}
            months={months}
            setMonths={setMonths}
          >
            <div className="space-y-2">
              <Label htmlFor="rate-basis" className="text-[16px] font-semibold leading-[1.6] text-gray-500">
                Rate basis
              </Label>
              <select
                id="rate-basis"
                value={basis}
                onChange={(e) => setBasis(e.target.value as typeof basis)}
                className={selectClass}
              >
                <option value="base">Base rates only</option>
                <option value="promo">Include promo rates</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="digital-tax" className="text-[16px] font-semibold leading-[1.6] text-gray-500">
                Tax assumption
              </Label>
              <select
                id="digital-tax"
                value={applyTax ? "after" : "before"}
                onChange={(e) => setApplyTax(e.target.value === "after")}
                className={selectClass}
              >
                <option value="after">After 20% withholding tax</option>
                <option value="before">Before tax (gross)</option>
              </select>
            </div>
          </SharedInputs>

          <PeriodSummary
            rows={computed.map((r) => ({
              label: r.bankName,
              rate: r.usedRate,
              grossAnnual: r.grossAnnual,
            }))}
            months={months}
          />

          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Digital bank</TableHead>
                  <TableHead className="text-right">Base rate</TableHead>
                  <TableHead className="text-right">Promo rate</TableHead>
                  <TableHead className="text-right">Est. monthly interest</TableHead>
                  <TableHead className="text-right">Est. annual interest</TableHead>
                  <TableHead className="hidden lg:table-cell">Balance cap</TableHead>
                  <TableHead className="hidden xl:table-cell">Requirement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {computed.map((r) => (
                  <TableRow key={r.bankName}>
                    <TableCell className="font-medium">{r.bankName}</TableCell>
                    <TableCell className="text-right font-semibold text-brand">
                      {formatPercent(r.baseRate)}
                    </TableCell>
                    <TableCell className="text-right">
                      {r.promoRate != null ? (
                        <span className="font-semibold text-amber-600">
                          {formatPercent(r.promoRate)}
                        </span>
                      ) : (
                        <span className="text-gray-400">&mdash;</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatPeso(r.monthly)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatPeso(r.annual)}
                    </TableCell>
                    <TableCell className="hidden text-[14px] text-gray-400 lg:table-cell">
                      {r.balanceCap}
                    </TableCell>
                    <TableCell className="hidden text-[14px] text-gray-400 xl:table-cell">
                      {r.requirement}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-3 text-[13px] leading-[1.5] text-gray-400">
            Estimates use simple interest on the deposit amount. Promo rates
            often apply only up to the balance cap shown, so real earnings can be
            lower than an &ldquo;include promo&rdquo; estimate. Switch to{" "}
            <strong>Single account estimate</strong> for a detailed breakdown of
            one bank.
          </p>
        </>
      )}
    </div>
  );
}
