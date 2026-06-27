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

// Display order + section copy for the crawlable per-frequency tables.
// Each entry maps a payroll-period id to its anchor id, H2 heading, and intro.
const SECTIONS: {
  id: string;
  anchor: string;
  heading: string;
  intro: string;
}[] = [
  {
    id: "monthly",
    anchor: "monthly-table",
    heading: "Monthly Withholding Tax Table 2026 Philippines",
    intro:
      "For employees paid once a month. Match your monthly taxable compensation (gross pay less SSS, PhilHealth, and Pag-IBIG) to the row below.",
  },
  {
    id: "semi-monthly",
    anchor: "semi-monthly-table",
    heading: "Semi-Monthly Withholding Tax Table 2026 Philippines",
    intro:
      "For employees paid twice a month (for example, on the 15th and the 30th). Each cut-off uses half-month taxable compensation.",
  },
  {
    id: "weekly",
    anchor: "weekly-table",
    heading: "Weekly Withholding Tax Table 2026 Philippines",
    intro: "For employees paid every week.",
  },
  {
    id: "daily",
    anchor: "daily-table",
    heading: "Daily Withholding Tax Table 2026 Philippines",
    intro: "For employees paid on a daily basis.",
  },
  {
    id: "annual",
    anchor: "annual-table",
    heading: "Annual Income Tax Brackets 2026",
    intro:
      "The underlying annual TRAIN Law brackets the payroll-period tables are derived from.",
  },
];

function TaxTable({ brackets }: { brackets: TaxBracketRow[] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">Compensation Range</TableHead>
            <TableHead className="whitespace-nowrap">
              Prescribed Withholding Tax
            </TableHead>
            <TableHead className="whitespace-nowrap text-center">Rate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brackets.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="font-mono text-[14px] tabular-nums text-gray-400">
                {row.range}
              </TableCell>
              <TableCell className="font-mono text-[14px] tabular-nums text-gray-400">
                {row.taxDue}
              </TableCell>
              <TableCell className="text-center font-mono text-[14px] tabular-nums text-gray-400">
                {row.rate}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 * Static, crawlable per-frequency withholding tax tables.
 * Renders one H2 section per payroll frequency (current TRAIN schedule rows),
 * so search engines index every table without relying on JS tabs.
 */
export function WithholdingTaxTables() {
  return (
    <div className="space-y-6">
      {SECTIONS.map((section) => {
        const period = payrollPeriodTables.find((p) => p.id === section.id);
        if (!period) return null;
        return (
          <section
            key={section.id}
            id={section.anchor}
            className="scroll-mt-20 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]"
          >
            <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
              {section.heading}
            </h2>
            <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
              {section.intro}
            </p>
            <TaxTable brackets={period.current} />
          </section>
        );
      })}
      <p className="text-[14px] text-gray-400">
        All tables reflect the current TRAIN Law schedule (RA 10963), effective
        January 1, 2023 onwards. Source: BIR Revenue Regulations No. 11-2018,
        Annex E.
      </p>
    </div>
  );
}
