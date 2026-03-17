import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calculator,
  BookOpen,
  BarChart3,
  Landmark,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { buttonVariants } from "@/lib/button-variants";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ThirteenthMonthCalculator } from "@/components/calculators/thirteenth-month-calculator";
import { thirteenthMonthData } from "@/data/calculators/thirteenth-month";

export const metadata: Metadata = generatePageMetadata({
  title: thirteenthMonthData.metaTitle,
  description: thirteenthMonthData.metaDescription,
  slug: thirteenthMonthData.slug,
  updatedAt: thirteenthMonthData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "13th Month Pay Calculator" },
];

const usuallyIncluded = [
  "regular basic salary",
  "fixed salary actually earned during the covered months",
];

const usuallyExcluded = [
  "overtime pay",
  "holiday pay",
  "night shift differential",
  "allowances",
  "commissions that are not part of basic salary",
  "non-cash benefits",
];

const toolIncludes = [
  "a basic salary-based estimate",
  "full-year and prorated scenarios",
  "calendar-year computation illustration",
  "simple term comparison support",
];

const toolDoesNotInclude = [
  "automatic classification of every payroll item",
  "company payroll rules or legal advice",
  "determination of disputed pay items",
];

const whyDifferent = [
  "your salary changed during the year",
  "payroll items were classified differently",
  "your employer already provides a 13th month pay equivalent",
  "case law around PD 851 may affect how compliance is measured",
  "additional company-specific compensation rules apply",
];

const relatedPages = [
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: BarChart3,
  },
  {
    title: "Guides Hub",
    href: "/guides",
    icon: BookOpen,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: Landmark,
  },
];

export default function ThirteenthMonthPayCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: thirteenthMonthData.metaTitle,
          description: thirteenthMonthData.metaDescription,
        })}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <PageHero
          title={thirteenthMonthData.h1}
          description={thirteenthMonthData.intro}
          badge={thirteenthMonthData.updatedAt}
          breadcrumbs={breadcrumbs}
        />

        {/* Support text */}
        <p className="-mt-4 mb-8 text-sm text-muted-foreground">
          Useful for employees who want a quick 13th month pay estimate and a
          plain-language explanation of how it is computed.
        </p>

        {/* Calculator */}
        <ThirteenthMonthCalculator />

        {/* Result support text */}
        <p className="mt-4 text-xs text-muted-foreground">
          This estimate follows the standard rule that 13th month pay is based
          on 1/12 of the basic salary earned within the calendar year.
        </p>

        {/* Full-Year vs Prorated 13th Month Pay */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Full-Year vs Prorated 13th Month Pay
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            If you worked the full calendar year, the estimate is usually based
            on your total basic salary earned during the year divided by 12. If
            you did not work the full year, the amount is usually prorated based
            on the basic salary earned during the months counted for the
            computation.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-foreground">
                  Full-Year Estimate
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  For employees who worked the full calendar year. Usually equals
                  one month&apos;s basic salary.
                </p>
                <p className="mt-3 font-mono text-xs text-muted-foreground">
                  ₱24,000 × 12 ÷ 12 = ₱24,000
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <p className="text-sm font-semibold text-foreground">
                  Prorated Estimate
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  For employees who started later, resigned earlier, or had
                  incomplete service during the year.
                </p>
                <p className="mt-3 font-mono text-xs text-muted-foreground">
                  ₱24,000 × 8 ÷ 12 = ₱16,000
                </p>
              </CardContent>
            </Card>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Both scenarios still use basic salary as the base. This is why the
            months worked matter when estimating 13th month pay.
          </p>
        </section>

        {/* How 13th Month Pay Is Computed */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How 13th Month Pay Is Computed
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The standard idea is simple: add the employee&apos;s basic salary
            earned within the calendar year, then divide by 12. For a fixed
            monthly basic salary, this often becomes monthly basic salary
            multiplied by months worked, then divided by 12.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            PD 851 and its implementing rule define 13th month pay as
            one-twelfth of the basic salary earned during the calendar year.
          </p>
          <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm font-semibold text-foreground">Formula</p>
            <p className="mt-2 font-mono text-sm text-primary">
              13th Month Pay = Total Basic Salary Earned During the Year ÷ 12
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              If monthly basic salary stayed the same, the estimate is usually
              straightforward.
            </p>
          </div>
        </section>

        {/* What Is Included and Excluded */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What Is Included and Excluded in the Computation
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The most important rule to understand is that 13th month pay is
            based on basic salary, not all forms of pay. Philippine rulings on
            PD 851 consistently treat basic salary as the computation base.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Usually Included
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {usuallyIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Usually Excluded
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {usuallyExcluded.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <XCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            If you are unsure whether a pay item counts, check your company
            payroll policy or labor guidance before relying on the estimate.
          </p>
        </section>

        {/* Sample 13th Month Pay Computations */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Sample 13th Month Pay Computations
          </h2>
          <p className="mt-3 mb-4 text-sm text-muted-foreground">
            These examples help show how the estimate works for common
            scenarios.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Full-Year Example */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Full-Year Example</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">
                      Monthly Basic Salary
                    </dt>
                    <dd className="font-medium text-foreground">₱24,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Months Worked</dt>
                    <dd className="font-medium text-foreground">12</dd>
                  </div>
                  <div className="border-t border-border pt-2">
                    <p className="text-xs text-muted-foreground">
                      ₱24,000 × 12 ÷ 12
                    </p>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <dt className="text-muted-foreground">
                      Estimated 13th Month Pay
                    </dt>
                    <dd className="font-semibold text-primary">₱24,000</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Prorated Example */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Prorated Example</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">
                      Monthly Basic Salary
                    </dt>
                    <dd className="font-medium text-foreground">₱24,000</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Months Worked</dt>
                    <dd className="font-medium text-foreground">8</dd>
                  </div>
                  <div className="border-t border-border pt-2">
                    <p className="text-xs text-muted-foreground">
                      ₱24,000 × 8 ÷ 12
                    </p>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2">
                    <dt className="text-muted-foreground">
                      Estimated 13th Month Pay
                    </dt>
                    <dd className="font-semibold text-primary">₱16,000</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Changing Salary Note */}
            <Card className="border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20">
              <CardHeader>
                <CardTitle className="text-sm">Changing Salary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  If your salary changed during the year, the safer approach is
                  to total the actual basic salary earned during each covered
                  month, then divide the annual total by 12.
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  This calculator uses a fixed monthly salary for simplicity.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* What This Calculator Includes and Does Not Include */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What This Calculator Includes
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            This page is designed for a simple 13th month pay estimate and does
            not replace payroll review.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {toolIncludes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What This Calculator Does Not Include
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {toolDoesNotInclude.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <XCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-50/50 p-4 dark:bg-amber-950/20">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <p className="text-sm text-muted-foreground">
              This estimate focuses on basic salary and may not reflect every
              payroll-specific classification. Always check your company payroll
              policy for final amounts.
            </p>
          </div>
        </section>

        {/* Why Your Actual 13th Month Pay May Be Different */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Why Your Actual 13th Month Pay May Be Different
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your actual 13th month pay may differ from a simple estimate for
            several reasons.
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

        {/* FAQ */}
        <FaqSection faqs={thirteenthMonthData.faqs} />

        {/* Related Payroll Pages and Guides */}
        <section className="pt-16">
          <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Related Payroll Pages and Guides
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            After estimating your 13th month pay, you may also want to review
            these related pages.
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

        {/* Final CTA */}
        <section className="mb-4 mt-16 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-10">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Use this estimate to plan for your 13th month pay
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A 13th month pay calculator helps you estimate what you may receive
            based on your basic salary and months worked. Use it to plan your
            year-end budget or compare full-year and prorated scenarios.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/calculators/salary/thirteenth-month-pay-calculator-philippines"
              className={buttonVariants({ className: "font-medium" })}
            >
              Calculate 13th month pay
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/calculators/tax/take-home-pay-calculator-philippines"
              className={buttonVariants({
                variant: "outline",
                className: "font-medium",
              })}
            >
              See take-home pay estimate
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
