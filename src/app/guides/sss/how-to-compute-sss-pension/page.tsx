import Link from "next/link";
import { PiggyBank, Calculator, ArrowRight } from "lucide-react";
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
  sssPensionMeta,
  pensionFormulas,
  sssPensionFaqs,
  SSS_PENSION_UPDATED_AT,
} from "@/data/guides/sss-pension-guide";

export const metadata = generatePageMetadata({
  title: sssPensionMeta.metaTitle,
  description: sssPensionMeta.metaDescription,
  slug: sssPensionMeta.slug,
  updatedAt: SSS_PENSION_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "SSS Pension" },
];

export default function SssPensionGuidePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: sssPensionMeta.metaTitle,
          description: sssPensionMeta.metaDescription,
          updatedAt: SSS_PENSION_UPDATED_AT,
          slug: sssPensionMeta.slug,
        })}
      />

      <PageHero
        title="How to Compute Your SSS Pension"
        description="A step-by-step guide to understanding how your SSS retirement pension is calculated. Learn the three pension formulas, eligibility requirements, and see a worked example."
        badge={SSS_PENSION_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Direct Answer Box */}
      <section className="py-8">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <PiggyBank className="size-5 text-primary" />
              Quick Answer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {sssPensionMeta.directAnswer}
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Step 1: What is the SSS Pension */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          1. What Is the SSS Retirement Pension?
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            The SSS (Social Security System) retirement pension is a monthly
            cash benefit paid to qualified members who have reached retirement
            age and have made enough contributions. It is designed to provide
            a basic income replacement during retirement and is paid for the
            rest of the member&apos;s life.
          </p>
          <p>
            The pension amount depends on three factors: your{" "}
            <strong>average monthly salary credit (AMSC)</strong>, your{" "}
            <strong>total number of credited years of service (CYS)</strong>,
            and which of the three pension formulas produces the highest
            result.
          </p>
        </div>
      </section>

      {/* Step 2: Eligibility Requirements */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          2. Eligibility Requirements
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>To qualify for the SSS retirement pension, you must meet:</p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>At least 120 monthly contributions</strong> (equivalent
              to 10 years). These do not need to be consecutive.
            </li>
            <li>
              <strong>Age requirement:</strong> 60 years old for optional
              retirement (must be separated from employment) or 65 years old
              for technical/mandatory retirement.
            </li>
            <li>
              If you have less than 120 contributions, you may receive a{" "}
              <strong>lump sum benefit</strong> instead of a monthly pension.
            </li>
          </ul>
        </div>
      </section>

      {/* <AdPlaceholder slot="sss-pension-top" /> */}

      {/* Step 3: The Three Pension Formulas */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          3. The Three SSS Pension Formulas
        </h2>
        <p className="mb-4 text-muted-foreground">
          The SSS computes your pension using all three formulas below and
          gives you <strong>whichever is highest</strong>:
        </p>
        <div className="space-y-4">
          {pensionFormulas.map((formula) => (
            <Card key={formula.label}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Badge variant="secondary">{formula.label}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="font-mono text-sm text-foreground">
                  {formula.formula}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formula.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Key terms:</strong>
          </p>
          <ul className="list-inside list-disc space-y-1">
            <li>
              <strong>AMSC (Average Monthly Salary Credit)</strong> &mdash;
              the average of your last 60 monthly salary credits, or the
              average of all your monthly salary credits, whichever is higher.
            </li>
            <li>
              <strong>CYS (Credited Years of Service)</strong> &mdash; the
              total number of years you have made contributions. 120 monthly
              contributions = 10 CYS.
            </li>
          </ul>
        </div>
      </section>

      {/* Step 4: SSS Contribution Table Reference */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          4. SSS Contribution Table Reference
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>
            Your monthly salary credit (MSC) is determined by the SSS
            contribution schedule. The MSC is not your actual salary but the
            nearest bracket amount used to compute your contribution and
            benefits. Here are some representative MSC brackets:
          </p>
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Monthly Salary Range</TableHead>
                    <TableHead className="text-right">MSC</TableHead>
                    <TableHead className="text-right">Employee Share</TableHead>
                    <TableHead className="text-right">Employer Share</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>PHP 4,000 - PHP 4,249.99</TableCell>
                    <TableCell className="text-right">{formatPeso(4000, 0)}</TableCell>
                    <TableCell className="text-right">{formatPeso(180, 0)}</TableCell>
                    <TableCell className="text-right">{formatPeso(380, 0)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PHP 9,750 - PHP 10,249.99</TableCell>
                    <TableCell className="text-right">{formatPeso(10000, 0)}</TableCell>
                    <TableCell className="text-right">{formatPeso(450, 0)}</TableCell>
                    <TableCell className="text-right">{formatPeso(950, 0)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PHP 14,750 - PHP 15,249.99</TableCell>
                    <TableCell className="text-right">{formatPeso(15000, 0)}</TableCell>
                    <TableCell className="text-right">{formatPeso(675, 0)}</TableCell>
                    <TableCell className="text-right">{formatPeso(1425, 0)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PHP 19,750 - PHP 20,249.99</TableCell>
                    <TableCell className="text-right">{formatPeso(20000, 0)}</TableCell>
                    <TableCell className="text-right">{formatPeso(900, 0)}</TableCell>
                    <TableCell className="text-right">{formatPeso(1900, 0)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PHP 29,750 and above</TableCell>
                    <TableCell className="text-right">{formatPeso(30000, 0)}</TableCell>
                    <TableCell className="text-right">{formatPeso(1350, 0)}</TableCell>
                    <TableCell className="text-right">{formatPeso(2850, 0)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <p className="text-xs text-muted-foreground">
            This is a simplified excerpt. The full SSS contribution table has
            more brackets. Contribution amounts are based on the 2023 SSS
            schedule and may be updated.
          </p>
        </div>
      </section>

      {/* Step 5: How to Check Contributions */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          5. How to Check Your SSS Contributions
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <ol className="list-inside list-decimal space-y-2">
            <li>
              Go to{" "}
              <strong>
                <a
                  href="https://www.sss.gov.ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:text-primary/80"
                >
                  www.sss.gov.ph
                </a>
              </strong>{" "}
              and log in to your My.SSS account.
            </li>
            <li>
              Click on <strong>&ldquo;Inquiry&rdquo;</strong> in the menu,
              then select <strong>&ldquo;Contributions&rdquo;</strong>.
            </li>
            <li>
              Review your monthly contributions to confirm they are posted
              correctly. Look for any gaps or missed months.
            </li>
            <li>
              Note your <strong>total posted months</strong> and your{" "}
              <strong>most recent monthly salary credits</strong> to use in
              the pension formulas.
            </li>
          </ol>
          <p>
            You can also download the SSS Mobile App (available on iOS and
            Android) to check your records on the go.
          </p>
        </div>
      </section>

      {/* <AdPlaceholder slot="sss-pension-mid" /> */}

      {/* Worked Example */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Worked Example: MSC of PHP 20,000 with 25 Years of Contributions
        </h2>
        <Card>
          <CardContent className="space-y-4">
            <p className="text-sm font-medium text-foreground">
              Scenario: A member has an average monthly salary credit (AMSC) of
              PHP 20,000 and 25 credited years of service (CYS).
            </p>

            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">
                  Formula 1: PHP 300 + (20% x AMSC) + (2% x AMSC x CYS over 10)
                </p>
                <div className="mt-1 space-y-1 pl-4 font-mono">
                  <p>= PHP 300 + (20% x PHP 20,000) + (2% x PHP 20,000 x 15)</p>
                  <p>= PHP 300 + PHP 4,000 + PHP 6,000</p>
                  <p className="font-semibold text-foreground">
                    = PHP 10,300 per month
                  </p>
                </div>
              </div>

              <div>
                <p className="font-medium text-foreground">
                  Formula 2: 40% x AMSC
                </p>
                <div className="mt-1 space-y-1 pl-4 font-mono">
                  <p>= 40% x PHP 20,000</p>
                  <p className="font-semibold text-foreground">
                    = PHP 8,000 per month
                  </p>
                </div>
              </div>

              <div>
                <p className="font-medium text-foreground">
                  Formula 3: Minimum Pension
                </p>
                <div className="mt-1 pl-4 font-mono">
                  <p className="font-semibold text-foreground">
                    = PHP 2,000 per month (CYS &gt;= 10)
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-md bg-primary/5 p-3">
              <p className="text-sm font-medium text-foreground">
                Result: The SSS awards the highest amount:{" "}
                <strong>{formatPeso(10300, 0)}</strong> per month from
                Formula 1. This member would receive PHP 10,300 monthly for
                life upon retirement.
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              Note: Members who retire at age 60 receive a 1.5% additional
              pension for every year of CYS beyond 10 years, while those who
              retire at 65 receive the full computed amount. Actual amounts
              may vary based on your specific SSS contribution history.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Common Mistakes */}
      <section className="py-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Common Mistakes to Avoid
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Not checking for gaps in contributions.</strong> Even
              one missing month reduces your credited years. If you change
              jobs, make sure the new employer starts contributing
              immediately. Voluntary members should pay on time every month.
            </li>
            <li>
              <strong>
                Confusing monthly salary credit with actual salary.
              </strong>{" "}
              Your MSC is capped at a maximum amount (currently PHP 30,000).
              Even if you earn more, your contributions and pension are based
              on the capped MSC.
            </li>
            <li>
              <strong>
                Assuming you automatically qualify for a pension.
              </strong>{" "}
              You need at least 120 monthly contributions. If you fall short,
              you only receive a lump sum, which is significantly less than a
              lifetime monthly pension.
            </li>
            <li>
              <strong>Not factoring in the 13th-month pension.</strong> SSS
              pensioners receive a 13th-month pension (paid in December) in
              addition to the regular monthly amount. When planning for
              retirement income, include this extra month.
            </li>
            <li>
              <strong>
                Forgetting to update your SSS records after life changes.
              </strong>{" "}
              Marriages, new dependents, and change of beneficiaries should be
              updated at the SSS to ensure your benefits go to the right
              people.
            </li>
          </ul>
        </div>
      </section>

      {/* Related Calculator Callout */}
      <section className="py-8">
        <Card className="border-primary/20">
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Calculator className="size-8 text-primary" />
              <div>
                <p className="font-semibold text-foreground">
                  SSS Pension Calculator
                </p>
                <p className="text-sm text-muted-foreground">
                  Estimate your SSS retirement pension based on your salary
                  credit and years of contribution.
                </p>
              </div>
            </div>
            <Link
              href="/calculators/retirement/sss-pension-calculator"
              className="inline-flex items-center gap-1 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Use Calculator
              <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* <AdPlaceholder slot="sss-pension-bottom" /> */}

      <FaqSection faqs={sssPensionFaqs} />

      <RelatedPages currentSlug="guides/sss/how-to-compute-sss-pension" />

      <div className="py-4">
        <SourceCitation
          source="Social Security System (SSS)"
          sourceUrl="https://www.sss.gov.ph/sss/appmanager/pages.jsp?page=retirementbenefits"
          updatedAt={SSS_PENSION_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </div>
      <div className="py-8 space-y-4">
        <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
        <DisclaimerBox />
      </div>
    </div>
    </>
  );
}
