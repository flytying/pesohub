"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatPeso } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import type { AmortizationRow } from "@/lib/calculators/loan";

const INITIAL_VISIBLE_ROWS = 12;

interface AmortizationTableProps {
  schedule: AmortizationRow[];
  className?: string;
}

export function AmortizationTable({
  schedule,
  className,
}: AmortizationTableProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleRows = showAll
    ? schedule
    : schedule.slice(0, INITIAL_VISIBLE_ROWS);

  const hasMore = schedule.length > INITIAL_VISIBLE_ROWS;

  return (
    <div className={cn("space-y-4", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Month</TableHead>
            <TableHead className="text-right">Payment</TableHead>
            <TableHead className="text-right">Principal</TableHead>
            <TableHead className="text-right">Interest</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleRows.map((row) => (
            <TableRow key={row.month}>
              <TableCell className="font-mono tabular-nums">
                {row.month}
              </TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {formatPeso(row.payment)}
              </TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {formatPeso(row.principal)}
              </TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {formatPeso(row.interest)}
              </TableCell>
              <TableCell className="text-right font-mono tabular-nums">
                {formatPeso(row.balance)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {hasMore && (
        <div className="flex justify-center px-6 py-5">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="rounded-full border border-gray-200 px-5 py-2.5 text-[14px] font-semibold text-gray-500 transition-colors hover:bg-gray-50"
          >
            {showAll
              ? "Show Less"
              : `Show Full Schedule (${schedule.length} months)`}
          </button>
        </div>
      )}
    </div>
  );
}
