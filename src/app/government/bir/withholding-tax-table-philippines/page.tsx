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
import { buttonVariants } from "@/lib/button-variants";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema-markup";
import { formatPeso } from "@/lib/formatters";
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import {
  withholdingTaxTableMeta,
  monthlyTaxBrackets,
  withholdingTaxTableFaqs,
  WITHHOLDING_TAX_TABLE_UPDATED_AT,
} from "@/data/government/withholding-tax-table";

export const metadata = generatePageMetadata({
  title: withholdingTaxTableMeta.metaTitle,
  description: withholdingTaxTableMeta.metaDescription,
  slug: withholdingTaxTableMeta.slug,
  updatedAt: WITHHOLDING_TAX_TABLE_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government", href: "/government" },
  { label: "Withholding Tax Table" },
];

const howToUsePoints = [
  "check the current withholding tax brackets",
  "view the monthly equivalent structure",
  "understand how the table works",
  "review a sample salary computation",
  "move to the calculator for a faster estimate",
];

const howToReadSteps = [
  "Identify taxable compensation",
  "Choose the correct payroll period",
  "Find the matching compensation range",
  "Use the base or prescribed tax",
  "Add the percentage on the excess amount",
];

const whyDifferent = [
  "employers may compute on taxable compensation after mandatory contributions",
  "supplementary compensation may be included separately",
  "more detailed payroll rules and rounding may apply",
  "RR 11-2018 discusses both regular and supplementary compensation methods",
];

const relatedPages = [
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Withholding Tax Guide",
    href: "/guides/tax/how-withholding-tax-works-philippines",
    icon: BookOpen,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: BarChart3,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: FileText,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
];

export default function WithholdingTaxTablePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: withholdingTaxTableMeta.metaTitle,
          description: withholdingTaxTableMeta.metaDescription,
          updatedAt: WITHHOLDING_TAX_TABLE_UPDATED_AT,
          slug: withholdingTaxTableMeta.slug,
        })}
      />

      <PageHero
        title={withholdingTaxTableMeta.title}
        description={withholdingTaxTableMeta.directAnswer}
        badge={WITHHOLDING_TAX_TABLE_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Support text */}
      <p className="-mt-4 mb-8 text-sm text-muted-foreground">
        Useful for employees, payroll users, and anyone who wants a
        plain-language reference before estimating withholding tax.
      </p>

      {/* How to Use This Page */}
      <section className="mb-10 rounded-lg border border-border bg-muted/30 p-6">
        <h2 className="text-sm font-semibold text-foreground">
          How to Use This Page
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          This page is a reference guide for the current withholding tax
          structure used for compensation income. The official withholding tax
          framework is annual-based, but many employees think in monthly salary
          terms, so this page shows both views to make the table easier to use.
          BIR&apos;s revised withholding tax table in Annex E is effective
          January 1, 2023 and onwards.
        </p>
        <p className="mt-3 text-sm font-medium text-foreground/80">
          Use this page to:
        </p>
        <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
          {howToUsePoints.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Annual Withholding Tax Table */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Annual Withholding Tax Table
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Philippine income tax brackets for compensation income are
          annual-based. Annual taxable income up to ₱250,000 is generally
          exempt, and the next brackets apply progressively above that
          threshold.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Annual Taxable Income
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Income Tax Due
                </th>
                <th className="px-4 py-3 text-center font-medium text-foreground">
                  Marginal Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Not over ₱250,000
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">₱0</td>
                <td className="px-4 py-2.5 text-center text-muted-foreground">
                  0%
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Over ₱250,000 to ₱400,000
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  15% of excess over ₱250,000
                </td>
                <td className="px-4 py-2.5 text-center text-muted-foreground">
                  15%
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Over ₱400,000 to ₱800,000
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  ₱22,500 + 20% of excess over ₱400,000
                </td>
                <td className="px-4 py-2.5 text-center text-muted-foreground">
                  20%
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Over ₱800,000 to ₱2,000,000
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  ₱102,500 + 25% of excess over ₱800,000
                </td>
                <td className="px-4 py-2.5 text-center text-muted-foreground">
                  25%
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Over ₱2,000,000 to ₱8,000,000
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  ₱402,500 + 30% of excess over ₱2,000,000
                </td>
                <td className="px-4 py-2.5 text-center text-muted-foreground">
                  30%
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Over ₱8,000,000
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  ₱2,202,500 + 35% of excess over ₱8,000,000
                </td>
                <td className="px-4 py-2.5 text-center text-muted-foreground">
                  35%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Source: TRAIN Law (RA 10963), BIR Annex E — effective January 1,
          2023 and onwards.
        </p>
      </section>

      {/* Monthly Withholding Tax Table View */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Monthly Withholding Tax Table View
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Most employees think in monthly salary, so this monthly view helps
          translate the annual structure into a payroll-friendly format.
          BIR&apos;s Annex E includes monthly compensation ranges and
          prescribed withholding tax for monthly payroll periods.
        </p>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Monthly Taxable Compensation
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Prescribed Withholding Tax
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">
                  ₱20,833 and below
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">₱0</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Over ₱20,833 to ₱33,332
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  15% of excess over ₱20,833
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Over ₱33,333 to ₱66,666
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  ₱1,875 + 20% of excess over ₱33,333
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Over ₱66,667 to ₱166,666
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  ₱8,541.80 + 25% of excess over ₱66,667
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">
                  Over ₱166,667 to ₱666,666
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  ₱33,541.80 + 30% of excess over ₱166,667
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 text-muted-foreground">
                  ₱666,667 and above
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  ₱183,541.80 + 35% of excess over ₱666,667
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Source: BIR Annex E, revised withholding tax table for monthly
          payroll period.
        </p>
      </section>

      {/* How to Read the Withholding Tax Table */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How to Read the Withholding Tax Table
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          BIR&apos;s computation logic is straightforward once the taxable
          compensation amount is identified. Under RR 11-2018, employers
          determine taxable compensation excluding non-taxable benefits and
          mandatory contributions, choose the correct payroll-period table,
          identify the compensation range, and compute withholding tax using
          the prescribed amount plus the rate on the excess over the range
          minimum.
        </p>
        <ol className="mt-4 space-y-2">
          {howToReadSteps.map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-muted-foreground">
          This is why the table can be shown in both annual and monthly form
          while still following the same tax structure.
        </p>
      </section>

      {/* Worked Example */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Worked Example: Monthly Salary Estimate
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Here is a simple example using the current monthly withholding tax
          table.
        </p>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              ₱35,000 Monthly Taxable Compensation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  Monthly taxable compensation
                </dt>
                <dd className="font-medium text-foreground">₱35,000</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  Matching monthly bracket
                </dt>
                <dd className="font-medium text-foreground">
                  Over ₱33,333 to ₱66,666
                </dd>
              </div>
              <div className="border-t border-border pt-2">
                <p className="text-xs text-muted-foreground">
                  Prescribed tax: ₱1,875
                </p>
                <p className="text-xs text-muted-foreground">
                  Excess over ₱33,333: ₱35,000 − ₱33,333 = ₱1,667
                </p>
                <p className="text-xs text-muted-foreground">
                  Additional tax: 20% × ₱1,667 = about ₱333.40
                </p>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <dt className="text-muted-foreground">
                  Estimated monthly withholding tax
                </dt>
                <dd className="font-semibold text-primary">
                  ≈ ₱2,208.40
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <p className="mt-3 text-xs text-muted-foreground">
          This is a simplified reference example. Actual payroll withholding
          may differ if taxable compensation is adjusted for mandatory
          deductions, allowances, supplementary compensation, or
          payroll-specific computation rules. RR 11-2018 notes that
          supplementary compensation and exceptional computations can affect
          the result.
        </p>
      </section>

      {/* Why Your Actual Payroll Withholding May Differ */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Why Your Actual Payroll Withholding May Differ
        </h2>
        <p className="text-sm text-muted-foreground">
          The table is a strong reference, but actual payroll withholding can
          differ because:
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
              If you already know your salary and want a quick estimate, use
              the Withholding Tax Calculator to see your monthly withholding
              tax, annual tax, and tax-only take-home pay faster.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              BIR also provides an official withholding tax calculator, but
              this reference page is designed to make the structure easier to
              understand before you estimate.
            </p>
          </div>
          <Link
            href="/calculators/tax/withholding-tax-calculator-philippines"
            className={buttonVariants({
              className: "shrink-0 font-medium",
            })}
          >
            Use the Calculator
            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>

      {/* FAQ */}
      <FaqSection faqs={withholdingTaxTableFaqs} />

      {/* Related Tax Pages and Payroll Tools */}
      <section className="pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related Tax Pages and Payroll Tools
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          After checking the table, use the calculator or guide to go from
          reference to action.
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
          source="Bureau of Internal Revenue (BIR) — TRAIN Law (RA 10963), RR 11-2018, Annex E"
          sourceUrl="https://www.bir.gov.ph/tax-information/tax-rates"
          updatedAt={WITHHOLDING_TAX_TABLE_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </div>

      {/* Disclaimer */}
      <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
    </div>
    </>
  );
}
