import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  Briefcase,
  UserCheck,
  Heart,
  Globe,
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { buttonVariants } from "@/lib/button-variants";
import { SSSContributionCalculator } from "@/components/calculators/sss-contribution-calculator";
import { sssContributionCalcData } from "@/data/calculators/sss-contribution";

export const metadata: Metadata = generatePageMetadata({
  title: sssContributionCalcData.metaTitle,
  description: sssContributionCalcData.metaDescription,
  slug: sssContributionCalcData.slug,
  updatedAt: sssContributionCalcData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "SSS Contribution Calculator" },
];

const resultMeaning = [
  "Total contribution is the full amount associated with the selected schedule",
  "Employee share is the amount usually deducted from salary for employed members",
  "Employer share applies only when the member classification includes employer contribution",
  "Monthly Salary Credit is the salary band used to determine the contribution amount",
];

const memberTypes = [
  {
    icon: Briefcase,
    title: "Employee",
    description:
      "For employed members, the estimate may show both employee share and employer share.",
  },
  {
    icon: Users,
    title: "Self-Employed",
    description:
      "For self-employed members, the estimate usually depends on declared monthly earnings and may not include an employer share.",
  },
  {
    icon: UserCheck,
    title: "Voluntary",
    description:
      "For voluntary members, the contribution is usually based on the selected contribution basis under the current schedule.",
  },
  {
    icon: Heart,
    title: "Non-Working Spouse",
    description:
      "For non-working spouses, contribution treatment may follow separate eligibility or basis rules depending on the applicable SSS classification.",
  },
  {
    icon: Globe,
    title: "OFW",
    description:
      "For OFWs, contribution rules may follow a separate contribution basis from standard local employee payroll computation.",
  },
];

const toolIncludes = [
  "SSS contribution estimate",
  "Employee share and employer share depending on member type",
];

const toolDoesNotInclude = [
  "Withholding tax",
  "PhilHealth or Pag-IBIG deductions",
  "Full net pay or take-home pay",
  "Official SSS table replacement or payroll system",
];

const whyDifferent = [
  "official SSS schedules may be updated",
  "member classification may be different from the one selected",
  "payroll setup may use more detailed assumptions",
  "compensation basis may be treated differently",
  "reference schedule changes may not yet be reflected in older estimates",
];

const relatedPages = [
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: FileText,
  },
  {
    title: "SSS Guide",
    href: "/guides/sss/how-to-compute-sss-pension",
    icon: BookOpen,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: BarChart3,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: Landmark,
  },
];

export default function SSSContributionCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: sssContributionCalcData.metaTitle,
          description: sssContributionCalcData.metaDescription,
        })}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <PageHero
          title={sssContributionCalcData.h1}
          description={sssContributionCalcData.intro}
          badge={sssContributionCalcData.updatedAt}
          breadcrumbs={breadcrumbs}
        />

        {/* Support text */}
        <p className="-mt-4 mb-8 text-sm text-muted-foreground">
          Useful for employees, self-employed members, voluntary members,
          non-working spouses, and OFWs who want a fast contribution estimate.
        </p>

        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <SSSContributionCalculator />
        </div>

        {/* Result support text */}
        <p className="mt-4 text-xs text-muted-foreground">
          This estimate is based on the member type and contribution schedule
          assumptions currently used by the calculator.
        </p>

        {/* Important note */}
        <div className="mt-6 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-50/50 p-4 dark:bg-amber-950/20">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Important
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              If the official SSS schedule changes, the final contribution may
              differ from this estimate. Always verify against the latest
              official SSS contribution table.
            </p>
          </div>
        </div>

        {/* What Your Result Means */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What Your Result Means
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your estimate shows the contribution amount tied to your Monthly
            Salary Credit and member type. For employees, the result may
            include both employee share and employer share. For other member
            types, the contribution structure may differ.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {resultMeaning.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* How Member Type Affects the Estimate */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How Member Type Affects the Estimate
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            SSS contribution schedules are not interpreted the same way for
            every member classification. That is why choosing the correct
            member type matters before relying on the result.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {memberTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Card key={type.title} className="h-full">
                  <CardHeader>
                    <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-4" />
                    </div>
                    <CardTitle className="mt-2 text-sm">
                      {type.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        {/* What Is Monthly Salary Credit? */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What Is Monthly Salary Credit?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Monthly Salary Credit, or MSC, is the salary band used by SSS to
            determine the contribution amount. Your actual salary is mapped to
            a contribution bracket, and the contribution is computed using the
            MSC assigned to that bracket.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            You do not need to compute MSC manually, but understanding it
            helps explain why contributions change in steps instead of changing
            by small amounts every time salary changes.
          </p>
        </section>

        {/* What This Calculator Includes and Does Not Include */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What This Calculator Includes and Does Not Include
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            This page estimates SSS contribution only. It does not calculate
            your full net pay, total deductions, or income tax.
          </p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Includes
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {toolIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Does not include
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                {toolDoesNotInclude.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <XCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">
              If you want a broader estimate of payroll deductions, use the{" "}
              <Link
                href="/calculators/tax/take-home-pay-calculator-philippines"
                className="text-primary hover:underline"
              >
                Take-Home Pay Calculator
              </Link>{" "}
              next.
            </p>
          </div>
        </section>

        {/* Why Your Actual SSS Contribution May Be Different */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Why Your Actual SSS Contribution May Be Different
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your actual contribution may differ from this estimate for several
            reasons.
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
        <FaqSection faqs={sssContributionCalcData.faqs} />

        {/* Related Tools and Reference Pages */}
        <section className="pt-16">
          <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Related Tools and Reference Pages
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            After estimating your SSS contribution, you may also want to check
            related payroll tools and reference pages.
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
            Use this estimate to check SSS contributions more clearly
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            An SSS contribution calculator can help you understand the likely
            contribution amount tied to your salary level and member type
            before reviewing your payslip or official records. Use it for
            quick planning, then confirm the final amount using the latest
            official SSS table.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#calculator"
              className={buttonVariants({ className: "font-medium" })}
            >
              Calculate SSS contribution
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/calculators/tax/take-home-pay-calculator-philippines"
              className={buttonVariants({
                variant: "outline",
                className: "font-medium",
              })}
            >
              See take-home pay instead
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
