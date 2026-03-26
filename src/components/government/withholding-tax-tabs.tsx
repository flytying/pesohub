"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  payrollPeriodTables,
  type TaxBracketRow,
} from "@/data/government/withholding-tax-table";

function TaxTable({ brackets, periodLabel }: { brackets: TaxBracketRow[]; periodLabel: string }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Compensation Range</TableHead>
            <TableHead className="whitespace-nowrap">Prescribed Withholding Tax</TableHead>
            <TableHead className="whitespace-nowrap text-center">Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brackets.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="text-[14px] text-gray-400">{row.range}</TableCell>
              <TableCell className="text-[14px] text-gray-400">{row.taxDue}</TableCell>
              <TableCell className="text-center text-[14px] text-gray-400">{row.rate}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TableSection({
  label,
  effectiveDates,
  brackets,
  periodLabel,
  current,
}: {
  label: string;
  effectiveDates: string;
  brackets: TaxBracketRow[];
  periodLabel: string;
  current?: boolean;
}) {
  return (
    <div className={current ? "" : "mt-8 opacity-75"}>
      <div className="mb-3 flex items-center gap-2">
        <h3 className={`text-base font-semibold ${current ? "text-gray-500" : "text-gray-400"}`}>
          {label}
        </h3>
        {current ? (
          <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[14px] font-medium text-brand">Current</span>
        ) : (
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[14px] font-medium text-gray-400">Previous</span>
        )}
      </div>
      <p className="mb-3 text-[14px] text-gray-400">{effectiveDates}</p>
      <TaxTable brackets={brackets} periodLabel={periodLabel} />
    </div>
  );
}

export function WithholdingTaxTabs() {
  return (
    <Tabs defaultValue="monthly">
      <TabsList className="mb-4 flex w-full flex-wrap gap-1 sm:flex-nowrap">
        {payrollPeriodTables.map((period) => (
          <TabsTrigger key={period.id} value={period.id} className="text-[14px] sm:text-sm">
            {period.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {payrollPeriodTables.map((period) => (
        <TabsContent key={period.id} value={period.id}>
          <TableSection
            label={`${period.label} Withholding Tax Table`}
            effectiveDates="Effective January 1, 2023 onwards (TRAIN Law, RA 10963 — Annex E)"
            brackets={period.current}
            periodLabel={period.label}
            current
          />
          <TableSection
            label={`Previous ${period.label} Withholding Tax Table`}
            effectiveDates="January 1, 2018 – December 31, 2022 (TRAIN Law Phase 1)"
            brackets={period.old}
            periodLabel={period.label}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
