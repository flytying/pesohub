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
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import { WithholdingTaxTabs } from "@/components/government/withholding-tax-tabs";
import {
  withholdingTaxTableMeta,
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
      {/* Withholding Tax Tables */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Withholding Tax Table Reference
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          View the current and previous withholding tax tables for
          compensation income. The current table is effective January 1, 2023
          onwards under the TRAIN Law (RA 10963). The previous table was in
          effect from January 1, 2018 to December 31, 2022.
        </p>
        <WithholdingTaxTabs />
        <p className="mt-3 text-xs text-muted-foreground">
          Source: TRAIN Law (RA 10963), BIR Revenue Regulations No. 11-2018,
          Annex E.
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
