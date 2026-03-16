import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { RelatedPages } from "@/components/shared/related-pages";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
// import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
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
  whoPaysSections,
  howToPayMethods,
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
  { label: "SSS Contribution Guide" },
];

export default function SSSContributionGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
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
      />

      {/* Government Disclaimer */}
      <Card className="mb-8 border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
        <CardContent className="p-4 text-sm text-muted-foreground">
          {GOVERNMENT_DISCLAIMER}
        </CardContent>
      </Card>

      {/* Quick Summary */}
      <Card className="mb-8 border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">2026 SSS Contribution Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Total Rate:</strong> 14% of Monthly Salary Credit (MSC)</p>
          <p><strong>Employee Share:</strong> 4.5% of MSC</p>
          <p><strong>Employer Share:</strong> 9.5% of MSC</p>
          <p><strong>MSC Range:</strong> PHP 4,000 – PHP 30,000</p>
          <p><strong>Contribution Range:</strong> PHP 570 – PHP 4,275/month</p>
        </CardContent>
      </Card>

      {/* <AdPlaceholder slot="gov-sss-contrib-top" className="my-8" /> */}

      {/* Full Contribution Table */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Complete SSS Contribution Table 2026
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Find your salary range below to see your Monthly Salary Credit (MSC),
          employee share, employer share, and total monthly contribution.
        </p>
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Salary Range</TableHead>
                <TableHead className="text-right whitespace-nowrap">MSC</TableHead>
                <TableHead className="text-right whitespace-nowrap">Employee</TableHead>
                <TableHead className="text-right whitespace-nowrap">Employer</TableHead>
                <TableHead className="text-right whitespace-nowrap">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SSS_CONTRIBUTION_TABLE_2025.map((bracket: SSSContributionBracket) => (
                <TableRow key={bracket.monthlySalaryCredit}>
                  <TableCell className="whitespace-nowrap text-sm">
                    {formatPeso(bracket.minSalary)} – {formatPeso(bracket.maxSalary)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatPeso(bracket.monthlySalaryCredit)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatPeso(bracket.employeeShare)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm">
                    {formatPeso(bracket.employerShare)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm font-medium">
                    {formatPeso(bracket.totalContribution)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Who Pays */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Who Pays SSS Contributions?
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {whoPaysSections.map((section) => (
            <Card key={section.type}>
              <CardHeader>
                <CardTitle className="text-base">
                  <Badge variant="secondary" className="mr-2">{section.type}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {section.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* <AdPlaceholder slot="gov-sss-contrib-mid" className="my-8" /> */}

      {/* Worked Example */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Worked Example
        </h2>
        <Card>
          <CardContent className="space-y-3 p-6 text-sm">
            <p><strong>Scenario:</strong> An employee earns PHP 25,000 per month.</p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>Find the salary range: PHP 24,750 – PHP 25,249</li>
              <li>Monthly Salary Credit (MSC): <strong>PHP 25,000</strong></li>
              <li>Employee share (4.5%): <strong>PHP 1,250</strong></li>
              <li>Employer share (9.5%): <strong>PHP 2,312.50</strong></li>
              <li>Total monthly contribution: <strong>PHP 3,562.50</strong></li>
            </ol>
            <p className="text-muted-foreground">
              The employer deducts PHP 1,250 from the employee&apos;s salary and remits
              the total PHP 3,562.50 to SSS.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* How to Pay */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How to Pay SSS Contributions
        </h2>
        <div className="space-y-3">
          {howToPayMethods.map((method) => (
            <Card key={method.method}>
              <CardContent className="p-4">
                <p className="font-medium text-sm">{method.method}</p>
                <p className="mt-1 text-sm text-muted-foreground">{method.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Related Calculator Callout */}
      <Card className="my-8 border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Calculator className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">Estimate Your SSS Pension</p>
            <p className="text-sm text-muted-foreground">
              Use our calculator to see how your contributions translate into retirement benefits.
            </p>
          </div>
          <Link
            href="/calculators/retirement/sss-pension-calculator"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Calculate <ArrowRight className="size-3.5" />
          </Link>
        </CardContent>
      </Card>

      {/* <AdPlaceholder slot="gov-sss-contrib-bottom" className="my-8" /> */}

      <FaqSection faqs={sssContributionFaqs} />

      <RelatedPages currentSlug="/government/sss/sss-contribution-guide" />

      <div className="py-4">
        <SourceCitation
          source="Social Security System (SSS)"
          sourceUrl="https://www.sss.gov.ph/sss/appmanager/pages.jsp?page=scheduleofcontribution"
          updatedAt={SSS_CONTRIBUTION_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </div>
      <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
    </div>
  );
}
