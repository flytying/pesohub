import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calculator,
  Landmark,
  BookOpen,
  BarChart3,
  FileText,
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
import { TakeHomePayCalculator } from "@/components/calculators/take-home-pay-calculator";
import { takeHomePayData } from "@/data/calculators/take-home-pay";

export const metadata: Metadata = generatePageMetadata({
  title: takeHomePayData.metaTitle,
  description: takeHomePayData.metaDescription,
  slug: takeHomePayData.slug,
  updatedAt: takeHomePayData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Take-Home Pay Calculator" },
];

const grossToNetBreakdown = [
  "Gross Monthly Salary",
  "Less: Withholding Tax",
  "Less: SSS Employee Share",
  "Less: PhilHealth Employee Share",
  "Less: Pag-IBIG Employee Share",
  "Equals: Estimated Take-Home Pay",
];

const whyGrossDifferent = [
  "withholding tax reduces pay based on taxable income",
  "SSS is a mandatory employee contribution",
  "PhilHealth is a mandatory health insurance contribution",
  "Pag-IBIG is a mandatory savings contribution",
  "total deductions reduce the amount that becomes net pay",
];

const toolIncludes = [
  "estimated withholding tax",
  "estimated SSS employee share",
  "estimated PhilHealth employee share",
  "estimated Pag-IBIG employee share",
  "total deductions",
  "estimated monthly take-home pay",
];

const toolDoesNotInclude = [
  "employer-specific deductions",
  "salary loans",
  "allowances",
  "overtime",
  "bonuses",
  "commissions",
  "voluntary deductions",
  "special payroll adjustments",
];

const whyPayslipDifferent = [
  "employer payroll systems may use more detailed inputs",
  "taxable income may differ from the gross salary used in a simple estimate",
  "loans or company-specific deductions may be applied",
  "bonuses or variable pay may affect deductions",
  "payroll timing, rounding, or special treatments may vary",
];

const checkOneDeduction = [
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
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: FileText,
  },
  {
    title: "Withholding Tax Table",
    href: "/government/bir/withholding-tax-table-philippines",
    icon: FileText,
  },
];

const relatedPages = [
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
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: FileText,
  },
  {
    title: "Withholding Tax Table",
    href: "/government/bir/withholding-tax-table-philippines",
    icon: FileText,
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

export default function TakeHomePayCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: takeHomePayData.metaTitle,
          description: takeHomePayData.metaDescription,
        })}
      />

      <PageHero
        title={takeHomePayData.h1}
        description={takeHomePayData.intro}
        badge={takeHomePayData.updatedAt}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <TakeHomePayCalculator />
        </div>

        {/* Result support text */}
        <p className="mt-4 text-xs text-muted-foreground">
          This estimate shows standard monthly deductions based on the
          assumptions currently used by the calculator.
        </p>

        {/* How Gross Salary Turns Into Take-Home Pay */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How Gross Salary Turns Into Take-Home Pay
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your take-home pay is your salary after common deductions are
            subtracted. This breakdown helps show where the difference between
            gross pay and net pay comes from.
          </p>
          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-5">
            <div className="space-y-2 text-sm">
              {grossToNetBreakdown.map((item, i) => (
                <div
                  key={item}
                  className={`flex items-center gap-2 ${
                    i === 0
                      ? "font-medium text-foreground"
                      : i === grossToNetBreakdown.length - 1
                        ? "border-t border-border pt-2 font-semibold text-primary"
                        : "text-muted-foreground"
                  }`}
                >
                  {i > 0 && i < grossToNetBreakdown.length - 1 && (
                    <span className="text-red-500">−</span>
                  )}
                  {i === grossToNetBreakdown.length - 1 && (
                    <span className="text-primary">=</span>
                  )}
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            This is the core paycheck breakdown most employees want to
            understand at a glance.
          </p>
        </section>

        {/* Why Your Gross Pay Is Different From Your Net Pay */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Why Your Gross Pay Is Different From Your Net Pay
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Gross pay is your salary before deductions. Net pay, or take-home
            pay, is what remains after common mandatory deductions are taken
            out. Even if your gross salary stays the same, your estimated
            take-home pay will be lower because payroll deductions reduce the
            amount you actually receive.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            {whyGrossDifferent.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What This Calculator Includes / Does Not Include */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What This Calculator Includes
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            This estimate is designed to show the most common payroll
            deductions used in a standard salary scenario.
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
          <p className="mt-3 text-sm text-muted-foreground">
            This calculator is useful for a standard estimate, but it does not
            replace your employer&apos;s actual payroll system or full payslip.
          </p>
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
              Because of these exclusions, your actual payslip may differ from
              the estimate.
            </p>
          </div>
        </section>

        {/* Why Your Actual Payslip May Be Different */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Why Your Actual Payslip May Be Different
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your actual payslip may differ from this estimate for several
            reasons.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {whyPayslipDifferent.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Want to Check One Deduction at a Time? */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Want to Check One Deduction at a Time?
          </h2>
          <p className="mt-3 mb-4 text-sm text-muted-foreground">
            If you want to understand one payroll deduction more closely, use
            the matching calculator or reference page below.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {checkOneDeduction.map((page) => {
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

        {/* FAQ */}
        <FaqSection faqs={takeHomePayData.faqs} />

        {/* Related Payroll Tools and Guides */}
        <section className="pt-16">
          <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Related Payroll Tools and Guides
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            After checking your estimated take-home pay, you may also want to
            review the individual deduction tools and payroll reference pages.
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
            Use this estimate to understand your likely take-home pay
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A take-home pay calculator can help you estimate what you may
            actually receive after common mandatory deductions. Use it to plan
            your budget, compare salary scenarios, or prepare before reviewing
            your payslip or employer estimate.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#calculator"
              className={buttonVariants({ className: "font-medium" })}
            >
              Calculate take-home pay
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/calculators/tax/withholding-tax-calculator-philippines"
              className={buttonVariants({
                variant: "outline",
                className: "font-medium",
              })}
            >
              See withholding tax only
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
