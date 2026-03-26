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
import { formatPeso } from "@/lib/formatters";
import {
  SSS_MEMBER_TYPES,
  type SSSContributionRow,
} from "@/lib/calculators/sss";

function formatRange(row: SSSContributionRow): string {
  if (row.minSalary === 0) return `Below ${formatPeso(row.maxSalary + 0.01)}`;
  if (row.maxSalary === Infinity) return `${formatPeso(row.minSalary)} & over`;
  return `${formatPeso(row.minSalary)} – ${formatPeso(row.maxSalary)}`;
}

function ContributionTable({
  rows,
  hasSplit,
  memberLabel,
  employerLabel,
}: {
  rows: SSSContributionRow[];
  hasSplit: boolean;
  memberLabel: string;
  employerLabel: string;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">
              Range of Compensation
            </TableHead>
            <TableHead className="whitespace-nowrap text-right">MSC</TableHead>
            {hasSplit ? (
              <>
                <TableHead className="whitespace-nowrap text-right">
                  {memberLabel}
                </TableHead>
                <TableHead className="whitespace-nowrap text-right">
                  {employerLabel}
                </TableHead>
              </>
            ) : null}
            <TableHead className="whitespace-nowrap text-right">
              {hasSplit ? "Total" : memberLabel}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.msc}>
              <TableCell className="whitespace-nowrap text-[14px] text-gray-400">
                {formatRange(row)}
              </TableCell>
              <TableCell className="text-right font-mono text-sm">
                {formatPeso(row.msc)}
              </TableCell>
              {hasSplit ? (
                <>
                  <TableCell className="text-right font-mono text-sm font-medium text-brand">
                    {formatPeso(row.memberShare)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-[14px] text-gray-400">
                    {formatPeso(row.employerShare)}
                  </TableCell>
                </>
              ) : null}
              <TableCell className="text-right font-mono text-sm font-medium">
                {formatPeso(row.total)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function SSSContributionTabs() {
  return (
    <Tabs defaultValue="employer-employee">
      <TabsList className="mb-4 flex w-full flex-wrap gap-1 sm:flex-nowrap">
        {SSS_MEMBER_TYPES.map((type) => (
          <TabsTrigger key={type.id} value={type.id} className="text-[14px]">
            {type.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {SSS_MEMBER_TYPES.map((type) => (
        <TabsContent key={type.id} value={type.id}>
          <p className="mb-4 text-[14px] text-gray-400">
            {type.description}
          </p>
          <ContributionTable
            rows={type.table}
            hasSplit={type.hasSplit}
            memberLabel={type.memberLabel}
            employerLabel={type.employerLabel}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
}
