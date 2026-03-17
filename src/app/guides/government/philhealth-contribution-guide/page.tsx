import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  BookOpen,
  Shield,
  Heart,
  Home,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { SourceCitation } from "@/components/shared/source-citation";
import { JsonLd } from "@/components/seo/json-ld";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/lib/button-variants";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema-markup";
import { GOVERNMENT_DISCLAIMER } from "@/lib/constants";
import {
  philhealthGuideMeta,
  payslipPatterns,
  whyDeductionChanges,
  verifyNextSteps,
  whatThisHelps,
  philhealthGuideFaqs,
  PHILHEALTH_GUIDE_UPDATED_AT,
} from "@/data/guides/philhealth-guide";

export const metadata = generatePageMetadata({
  title: philhealthGuideMeta.metaTitle,
  description: philhealthGuideMeta.metaDescription,
  slug: philhealthGuideMeta.slug,
  updatedAt: PHILHEALTH_GUIDE_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "PhilHealth Contribution Guide" },
];

const relatedPages = [
  {
    title: "PhilHealth Contribution Table",
    href: "/government/philhealth/philhealth-contribution-table-philippines",
    icon: Heart,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Withholding Tax Guide",
    href: "/guides/tax/how-withholding-tax-works-philippines",
    icon: BookOpen,
  },
  {
    title: "Pag-IBIG Contribution Table",
    href: "/government/pag-ibig/pag-ibig-contribution-table-philippines",
    icon: Home,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: Shield,
  },
];

export default function PhilHealthContributionGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: philhealthGuideMeta.metaTitle,
          description: philhealthGuideMeta.metaDescription,
          updatedAt: PHILHEALTH_GUIDE_UPDATED_AT,
          slug: philhealthGuideMeta.slug,
        })}
      />

      {/* Hero */}
      <PageHero
        title={philhealthGuideMeta.title}
        description={philhealthGuideMeta.directAnswer}
        badge={PHILHEALTH_GUIDE_UPDATED_AT}
        breadcrumbs={breadcrumbs}
      />

      {/* Support text */}
      <p className="-mt-4 mb-8 text-sm text-muted-foreground">
        Useful for employees and payroll users who want a plain-language
        explanation of the PhilHealth deduction.
      </p>

      {/* What Is PhilHealth Deduction on Payroll? */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          What Is PhilHealth Deduction on Payroll?
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          PhilHealth deduction is the employee-side share of the monthly
          PhilHealth premium that may be taken from salary through payroll. For
          employed members, the total premium is commonly split between employee
          and employer, so the deduction you see on your payslip is often only
          one part of the full contribution.
        </p>

        {/* In simple terms */}
        <div className="mt-6 rounded-lg border border-border bg-muted/30 p-5">
          <p className="text-sm font-medium text-foreground">
            In simple terms:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                It is a payroll deduction related to PhilHealth contribution
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                The employee usually pays a share through salary deduction
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>The employer usually pays a separate share</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                The full premium is larger than the employee-side payslip
                deduction
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Who Pays the PhilHealth Contribution? */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Who Pays the PhilHealth Contribution?
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          One of the most common points of confusion is whether the deduction on
          the payslip is the full PhilHealth contribution or only the employee
          portion. This is why the amount on your payslip may be lower than the
          full monthly premium shown in the contribution table.
        </p>

        {/* Visual split */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-5 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                Employee Share
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                Deducted from salary
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Usually shown on payslip
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Employer Share
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                Paid separately
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Not usually visible on payslip
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5 text-center">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Total Premium
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground">
                Sum of both shares
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Full contribution to PhilHealth
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How PhilHealth Usually Appears on a Payslip */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How PhilHealth Usually Appears on a Payslip
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          PhilHealth is usually one of the standard government payroll
          deductions shown together with SSS, Pag-IBIG, and withholding tax. It
          may appear as a separate line item on a payslip, and the amount shown
          is often the employee-side share only.
        </p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {payslipPatterns.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Why PhilHealth Deduction Can Change */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Why PhilHealth Deduction Can Change
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          PhilHealth deduction may change when salary changes, when the
          contribution basis changes, or when official premium schedules are
          updated. This is why payroll users often need both a simple guide and a
          current contribution table.
        </p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {whyDeductionChanges.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Where to Verify Your PhilHealth Deduction */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Where to Verify Your PhilHealth Deduction
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          If you want to confirm whether your PhilHealth deduction looks
          correct, the best next step is to compare it against the current
          PhilHealth contribution table or your employer&apos;s payroll basis.
        </p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {verifyNextSteps.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What This Guide Helps You Check */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          What This Guide Helps You Check
        </h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Use this page if you want to:
        </p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {whatThisHelps.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Need the Actual Contribution Reference? */}
      <Card className="my-8 border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Heart className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              Need the Actual Contribution Reference?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              If you want to see the contribution structure itself, including
              employee share, employer share, and salary basis, go to the
              PhilHealth Contribution Table page next.
            </p>
          </div>
          <Link
            href="/government/philhealth/philhealth-contribution-table-philippines"
            className={buttonVariants({
              className: "shrink-0 font-medium",
            })}
          >
            View the Contribution Table
            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>

      {/* Want to See How PhilHealth Affects Take-Home Pay? */}
      <Card className="my-8 border-border">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
            <Calculator className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              Want to See How PhilHealth Affects Take-Home Pay?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              If you want to see PhilHealth together with withholding tax, SSS,
              and Pag-IBIG in one salary estimate, use the Take-Home Pay
              Calculator next.
            </p>
          </div>
          <Link
            href="/calculators/tax/take-home-pay-calculator-philippines"
            className={buttonVariants({
              variant: "outline",
              className: "shrink-0 font-medium",
            })}
          >
            Use the Calculator
            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>

      {/* FAQ */}
      <FaqSection faqs={philhealthGuideFaqs} />

      {/* Related Payroll Pages */}
      <section className="pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related Payroll Pages
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          After reading this guide, you may also want to review these related
          pages.
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
          source="PhilHealth — Circular No. 2019-0009, PhilHealth Premium Contribution Schedule"
          sourceUrl="https://www.philhealth.gov.ph/"
          updatedAt={PHILHEALTH_GUIDE_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </div>

      {/* Disclaimer */}
      <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
    </div>
  );
}
