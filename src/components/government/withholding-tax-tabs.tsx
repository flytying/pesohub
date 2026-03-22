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
  annualTaxBrackets,
  annualTaxBracketsOld,
  monthlyTaxBrackets,
  monthlyTaxBracketsOld,
  type TaxBracketRow,
} from "@/data/government/withholding-tax-table";

function TaxTable({
  brackets,
  periodLabel,
}: {
  brackets: TaxBracketRow[];
  periodLabel: string;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">
              {periodLabel} Taxable Income
            </TableHead>
            <TableHead className="whitespace-nowrap">Income Tax Due</TableHead>
            <TableHead className="whitespace-nowrap text-center">
              Marginal Rate
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brackets.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="text-sm text-muted-foreground">
                {row.range}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {row.taxDue}
              </TableCell>
              <TableCell className="text-center text-sm text-muted-foreground">
                {row.rate}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TableSection({
  label,
  period,
  effectiveDates,
  brackets,
  current,
}: {
  label: string;
  period: string;
  effectiveDates: string;
  brackets: TaxBracketRow[];
  current?: boolean;
}) {
  return (
    <div className={current ? "" : "mt-8 opacity-75"}>
      <div className="mb-3 flex items-center gap-2">
        <h3
          className={`text-base font-semibold ${current ? "text-foreground" : "text-muted-foreground"}`}
        >
          {label}
        </h3>
        {current ? (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            Current
          </span>
        ) : (
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            Previous
          </span>
        )}
      </div>
      <p className="mb-3 text-xs text-muted-foreground">{effectiveDates}</p>
      <TaxTable brackets={brackets} periodLabel={period} />
    </div>
  );
}

export function WithholdingTaxTabs() {
  return (
    <Tabs defaultValue="monthly">
      <TabsList className="mb-4">
        <TabsTrigger value="monthly">Monthly Table</TabsTrigger>
        <TabsTrigger value="annual">Annual Table</TabsTrigger>
      </TabsList>

      <TabsContent value="monthly">
        <TableSection
          label="Monthly Withholding Tax Table"
          period="Monthly"
          effectiveDates="Effective January 1, 2023 onwards (TRAIN Law, RA 10963 — Annex E)"
          brackets={monthlyTaxBrackets}
          current
        />
        <TableSection
          label="Previous Monthly Withholding Tax Table"
          period="Monthly"
          effectiveDates="January 1, 2018 – December 31, 2022 (TRAIN Law Phase 1)"
          brackets={monthlyTaxBracketsOld}
        />
      </TabsContent>

      <TabsContent value="annual">
        <TableSection
          label="Annual Income Tax Table"
          period="Annual"
          effectiveDates="Effective January 1, 2023 onwards (TRAIN Law, RA 10963 — Annex E)"
          brackets={annualTaxBrackets}
          current
        />
        <TableSection
          label="Previous Annual Income Tax Table"
          period="Annual"
          effectiveDates="January 1, 2018 – December 31, 2022 (TRAIN Law Phase 1)"
          brackets={annualTaxBracketsOld}
        />
      </TabsContent>
    </Tabs>
  );
}
