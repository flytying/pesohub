import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  BookOpen,
  BarChart3,
  Landmark,
  FileText,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { JsonLd } from "@/components/seo/json-ld";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { buttonVariants } from "@/lib/button-variants";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema-markup";
import { formatPeso } from "@/lib/formatters";
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import {
  SSS_CONTRIBUTION_TABLE_2025,
  type SSSContributionBracket,
} from "@/lib/calculators/sss";
import {
  sssContributionMeta,
  sssPayrollExamples,
  memberTypeCards,
  sssContributionFaqs,
  SSS_CONTRIBUTION_UPDATED_AT,
} from "@/data/government/sss-contribution";

export const metadata = generatePageMetadata({
  title: sssContributionMeta.metaTitle,
  description: sssContributionMeta.metaDescription,
  slug: sssContributionMeta.slug,
  updatedAt: SSS_CONTRIBUTION_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "SSS Contribution Table" },
];

const whyDifferent = [
  "the member type may be different from what the user assumes",
  "payroll may use more detailed classification logic",
  "SSS may later publish a new contribution schedule",
  "the Employees\u2019 Compensation (EC) component may apply separately",
  "rounding or timing differences may affect the exact amount",
];

const relatedPages = [
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "SSS Pension Table",
    href: "/government/sss/sss-pension-table",
    icon: FileText,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: BarChart3,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: Calculator,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
];

export default function SSSContributionGuidePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: sssContributionMeta.metaTitle,
          description: sssContributionMeta.metaDescription,
          updatedAt: SSS_CONTRIBUTION_UPDATED_AT,
          slug: sssContributionMeta.slug,
        })}
      />

      <PageHero
        title={sssContributionMeta.title}
        description={sssContributionMeta.directAnswer}
        badge={SSS_CONTRIBUTION_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* SSS Contribution Table Reference */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          SSS Contribution Table Reference
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Find your salary range below to see your Monthly Salary Credit (MSC),
          employee share, employer share, and total monthly contribution. For
          employed members, both shares apply. For voluntary, self-employed,
          OFW, and non-working spouse members, the total contribution is usually
          paid by the member.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">
                  Range of Compensation
                </TableHead>
                <TableHead className="whitespace-nowrap text-right">
                  MSC
                </TableHead>
                <TableHead className="whitespace-nowrap text-right">
                  Employee Share
                </TableHead>
                <TableHead className="whitespace-nowrap text-right">
                  Employer Share
                </TableHead>
                <TableHead className="whitespace-nowrap text-right">
                  Total Contribution
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SSS_CONTRIBUTION_TABLE_2025.map(
                (bracket: SSSContributionBracket) => (
                  <TableRow key={bracket.monthlySalaryCredit}>
                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {formatPeso(bracket.minSalary)} –{" "}
                      {formatPeso(bracket.maxSalary)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {formatPeso(bracket.monthlySalaryCredit)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm font-medium text-primary">
                      {formatPeso(bracket.employeeShare)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm text-muted-foreground">
                      {formatPeso(bracket.employerShare)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm font-medium">
                      {formatPeso(bracket.totalContribution)}
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Always verify the latest official SSS schedule if you need the exact
          contribution basis for payroll or remittance. The official SSS
          contribution table page currently points to the schedule effective
          January 2025.
        </p>
      </section>

      {/* How to Read the Employee and Employer Shares */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How to Read the Employee and Employer Shares
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          For employed members, the SSS table separates the employee share and
          employer share. The employee portion is what usually appears as the
          payroll deduction, while the employer contributes its own share on top
          of that.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Employee Share
              </p>
              <p className="mt-1 text-xl font-bold text-primary">
                Your Payslip Deduction
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Deducted from your salary
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Employer Share
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">
                Paid by Your Employer
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                On top of your salary
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Total Contribution
              </p>
              <p className="mt-1 text-xl font-bold text-foreground">
                Both Combined
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Remitted to SSS
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What Is Monthly Salary Credit? */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          What Is Monthly Salary Credit?
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Monthly Salary Credit, or MSC, is the salary band SSS uses to
          determine contribution amounts and some benefit computations. The
          official SSS site explains that monthly contributions are based on
          member compensation and that MSC is the compensation base used in
          contribution and benefit calculations.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          This is why contributions move by bracket instead of changing by very
          small peso amounts every time salary changes.
        </p>
      </section>

      {/* How Member Type Affects the Table */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How Member Type Affects the Table
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Different member classifications may not use the same contribution
          breakdown. Employees typically have both employer and employee shares.
          Voluntary, self-employed, OFW, and non-working spouse views should be
          understood separately.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {memberTypeCards.map((card) => (
            <Card key={card.type} className="h-full">
              <CardHeader>
                <CardTitle className="text-sm">{card.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Sample SSS Payroll Cuts */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Sample SSS Payroll Cuts
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          These examples help show how the SSS contribution may look in a
          payroll context for employed members.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {sssPayrollExamples.map((example) => (
            <Card key={example.label}>
              <CardHeader>
                <CardTitle className="text-sm">{example.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Monthly Salary</dt>
                    <dd className="font-medium text-foreground">
                      {formatPeso(example.salary)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">MSC Used</dt>
                    <dd className="font-medium text-foreground">
                      {formatPeso(example.msc)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <dt className="text-muted-foreground">Employee Share</dt>
                    <dd className="font-semibold text-primary">
                      {formatPeso(example.employeeShare)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Employer Share</dt>
                    <dd className="font-medium text-foreground">
                      {formatPeso(example.employerShare)}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <dt className="text-muted-foreground">
                      Total Contribution
                    </dt>
                    <dd className="font-medium text-foreground">
                      {formatPeso(example.totalContribution)}
                    </dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs text-muted-foreground">
                  {example.note}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Your Actual SSS Contribution May Differ */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Why Your Actual SSS Contribution May Differ
        </h2>
        <p className="text-sm text-muted-foreground">
          Actual contributions may differ from this reference table for several
          reasons. That is why this page should always show the effective period
          of the table prominently.
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          {whyDifferent.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Current Schedule Used on This Page */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Current Schedule Used on This Page
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          As of the latest official SSS publication currently available, the
          contribution table is Effective January 2025. SSS also states that the
          contribution rate increased to 15%, with the minimum MSC at ₱5,000 and
          the maximum MSC at ₱35,000 starting January 2025.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Effective Period
              </p>
              <p className="mt-1 text-lg font-bold text-primary">
                January 2025
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Contribution Rate
              </p>
              <p className="mt-1 text-lg font-bold text-primary">15%</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Minimum MSC
              </p>
              <p className="mt-1 text-lg font-bold text-primary">₱5,000</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Maximum MSC
              </p>
              <p className="mt-1 text-lg font-bold text-primary">₱35,000</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Want a Faster Estimate? */}
      <Card className="my-8 border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Calculator className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              Want a Faster Estimate?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              If you already know your salary and member type, use the SSS
              Contribution Calculator to get a quicker estimate without scanning
              the full table.
            </p>
          </div>
          <Link
            href="/calculators/sss/sss-contribution-calculator-philippines"
            className={buttonVariants({
              className: "shrink-0 font-medium",
            })}
          >
            Use the SSS Contribution Calculator
            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>

      {/* FAQ */}
      <FaqSection faqs={sssContributionFaqs} />

      {/* Related Payroll Tools and Guides */}
      <section className="pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related Payroll Tools and Guides
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          After checking the SSS table, you may also want to review these
          related pages.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedPages.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.title}
                href={page.href}
                className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-4" />
                </div>
                <span className="text-sm font-medium group-hover:text-primary">
                  {page.title}
                </span>
                <ArrowRight className="ml-auto size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Source Citation */}
      <div className="py-8">
        <SourceCitation
          source="Social Security System (SSS) — Schedule of Contributions"
          sourceUrl="https://www.sss.gov.ph/sss/appmanager/pages.jsp?page=scheduleofcontribution"
          updatedAt={SSS_CONTRIBUTION_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </div>

      {/* Disclaimer */}
      <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
    </div>
    </>
  );
}
