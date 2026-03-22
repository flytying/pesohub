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
    <div className="overflow-x-auto rounded-lg border border-border">
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
              <TableCell className="text-sm text-muted-foreground">{row.range}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{row.taxDue}</TableCell>
              <TableCell className="text-center text-sm text-muted-foreground">{row.rate}%</TableCell>
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
        <h3 className={`text-base font-semibold ${current ? "text-foreground" : "text-muted-foreground"}`}>
          {label}
        </h3>
        {current ? (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Current</span>
        ) : (
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">Previous</span>
        )}
      </div>
      <p className="mb-3 text-xs text-muted-foreground">{effectiveDates}</p>
      <TaxTable brackets={brackets} periodLabel={periodLabel} />
    </div>
  );
}

export function WithholdingTaxTabs() {
  return (
    <Tabs defaultValue="monthly">
      <TabsList className="mb-4 flex w-full flex-wrap gap-1 sm:flex-nowrap">
        {payrollPeriodTables.map((period) => (
          <TabsTrigger key={period.id} value={period.id} className="text-xs sm:text-sm">
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
