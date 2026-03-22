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
  SSS_CONTRIBUTION_TABLE_2025,
  SSS_MEMBER_TYPES,
  type SSSMemberType,
} from "@/lib/calculators/sss";

function ContributionTable({ memberType }: { memberType: SSSMemberType }) {
  const isSplit =
    memberType === "employer-employee" || memberType === "kasambahay";

  const shareLabels =
    memberType === "kasambahay"
      ? { employee: "Kasambahay Share", employer: "Household Employer Share" }
      : { employee: "Employee Share", employer: "Employer Share" };

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">
              Range of Compensation
            </TableHead>
            <TableHead className="whitespace-nowrap text-right">MSC</TableHead>
            {isSplit ? (
              <>
                <TableHead className="whitespace-nowrap text-right">
                  {shareLabels.employee}
                </TableHead>
                <TableHead className="whitespace-nowrap text-right">
                  {shareLabels.employer}
                </TableHead>
              </>
            ) : null}
            <TableHead className="whitespace-nowrap text-right">
              Total Contribution
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {SSS_CONTRIBUTION_TABLE_2025.map((bracket) => (
            <TableRow key={bracket.monthlySalaryCredit}>
              <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                {formatPeso(bracket.minSalary)} –{" "}
                {formatPeso(bracket.maxSalary)}
              </TableCell>
              <TableCell className="text-right font-mono text-sm">
                {formatPeso(bracket.monthlySalaryCredit)}
              </TableCell>
              {isSplit ? (
                <>
                  <TableCell className="text-right font-mono text-sm font-medium text-primary">
                    {formatPeso(bracket.employeeShare)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-muted-foreground">
                    {formatPeso(bracket.employerShare)}
                  </TableCell>
                </>
              ) : null}
              <TableCell className="text-right font-mono text-sm font-medium">
                {formatPeso(bracket.totalContribution)}
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
          <TabsTrigger key={type.id} value={type.id} className="text-xs sm:text-sm">
            {type.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {SSS_MEMBER_TYPES.map((type) => (
        <TabsContent key={type.id} value={type.id}>
          <p className="mb-4 text-sm text-muted-foreground">
            {type.description}
          </p>
          <ContributionTable memberType={type.id} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
