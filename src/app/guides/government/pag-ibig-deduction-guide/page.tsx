import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  Home,
  Shield,
  Landmark,
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
import {
  pagibigGuideMeta,
  deductionTypes,
  payslipPatterns,
  howToCheck,
  whyAmountDiffers,
  whatThisHelps,
  pagibigGuideFaqs,
  PAGIBIG_GUIDE_UPDATED_AT,
} from "@/data/guides/pag-ibig-guide";

export const metadata = generatePageMetadata({
  title: pagibigGuideMeta.metaTitle,
  description: pagibigGuideMeta.metaDescription,
  slug: pagibigGuideMeta.slug,
  updatedAt: PAGIBIG_GUIDE_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "Pag-IBIG Deduction Guide" },
];

const relatedPages = [
  {
    title: "Pag-IBIG Contribution Table",
    href: "/government/pag-ibig/pag-ibig-contribution-table-philippines",
    icon: Shield,
  },
  {
    title: "Pag-IBIG Housing Loan Guide",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    icon: Home,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
];

export default function PagIBIGDeductionGuidePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: pagibigGuideMeta.metaTitle,
          description: pagibigGuideMeta.metaDescription,
          updatedAt: PAGIBIG_GUIDE_UPDATED_AT,
          slug: pagibigGuideMeta.slug,
        })}
      />

      <PageHero
        title={pagibigGuideMeta.title}
        description={pagibigGuideMeta.directAnswer}
        badge={PAGIBIG_GUIDE_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Support text */}
      <p className="-mt-4 mb-8 text-sm text-muted-foreground">
        Useful for employees and payroll users who want a simpler explanation
        of Pag-IBIG-related deductions.
      </p>

      {/* What Does Pag-IBIG Deduction Usually Mean? */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          What Does Pag-IBIG Deduction Usually Mean?
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          In many payroll situations, a Pag-IBIG deduction refers to the
          regular Pag-IBIG contribution deducted from salary. But some users
          also confuse this with Pag-IBIG housing loan payments or MP2 savings,
          which are not always treated the same way in payroll.
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
                Regular Pag-IBIG contribution is the standard payroll-related
                deduction
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>Housing loan payment is a separate loan obligation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>MP2 is a separate savings product</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                Not every Pag-IBIG-related amount appears the same way on a
                payslip
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Regular Pag-IBIG Deduction vs Housing Loan vs MP2 */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Regular Pag-IBIG Deduction vs Housing Loan vs MP2
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          This is the most important distinction. These are all Pag-IBIG-related,
          but they are not the same thing. If you see a Pag-IBIG-related amount
          on payroll, the first step is to identify which of these it actually
          refers to.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {deductionTypes.map((type) => (
            <Card key={type.title} className={
              type.tag === "Payroll deduction"
                ? "border-primary/20 bg-primary/5"
                : ""
            }>
              <CardHeader>
                <span className={`inline-block w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  type.tag === "Payroll deduction"
                    ? "bg-primary/10 text-primary"
                    : type.tag === "Loan payment"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400"
                      : "bg-secondary text-foreground/80"
                }`}>
                  {type.tag}
                </span>
                <CardTitle className="mt-2 text-sm">{type.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {type.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Where Pag-IBIG Appears on Payroll */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Where Pag-IBIG Appears on Payroll
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          The regular Pag-IBIG contribution usually appears as one of the
          standard government deductions on a payslip, together with SSS,
          PhilHealth, and withholding tax. Housing loan payments and other
          Pag-IBIG-related amounts may or may not appear the same way depending
          on payroll handling and salary arrangements.
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

      {/* How to Tell Which Pag-IBIG Amount You Are Seeing */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How to Tell Which Pag-IBIG Amount You Are Seeing
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          If you are not sure what a Pag-IBIG deduction refers to, compare the
          amount against the regular contribution reference first. If the amount
          is different from the expected regular contribution, it may be
          connected to a housing loan payment or another separate arrangement.
        </p>
        <p className="mb-3 text-sm font-medium text-foreground/80">
          A practical way to check:
        </p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {howToCheck.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Why a Pag-IBIG-Related Amount May Be Different */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Why a Pag-IBIG-Related Amount May Be Different From the Regular
          Deduction
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          Not every Pag-IBIG-related payroll amount is the standard employee
          contribution. The amount may look different because the deduction is
          tied to a housing loan, a salary-based remittance setup, or another
          payroll-specific arrangement.
        </p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {whyAmountDiffers.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What This Guide Helps You Understand */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          What This Guide Helps You Understand
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

      {/* Need the Regular Contribution Reference? */}
      <Card className="my-8 border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Shield className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              Need the Regular Contribution Reference?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              If you want to verify the standard employee and employer
              contribution structure, go to the Pag-IBIG Contribution Table
              page next.
            </p>
          </div>
          <Link
            href="/government/pag-ibig/pag-ibig-contribution-table-philippines"
            className={buttonVariants({
              className: "shrink-0 font-medium",
            })}
          >
            View the Contribution Table
            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>

      {/* Need Help With Pag-IBIG Housing Loan? */}
      <Card className="my-8 border-border">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
            <Home className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              Need Help With Pag-IBIG Housing Loan Questions?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              If the Pag-IBIG-related amount is connected to a housing loan, go
              to the Pag-IBIG Housing Loan Guide next.
            </p>
          </div>
          <Link
            href="/government/pag-ibig/pag-ibig-housing-loan-guide"
            className={buttonVariants({
              variant: "outline",
              className: "shrink-0 font-medium",
            })}
          >
            View the Housing Loan Guide
            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>

      {/* Want to See Full Payroll Deductions? */}
      <Card className="my-8 border-border">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
            <Calculator className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              Want to See Pag-IBIG With Other Deductions?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              If you want to see how Pag-IBIG fits into a full payroll estimate
              with SSS, PhilHealth, and withholding tax, use the Take-Home Pay
              Calculator.
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
      <FaqSection faqs={pagibigGuideFaqs} />

      {/* Related Pag-IBIG Pages */}
      <section className="pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related Pag-IBIG Pages
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          After reading this guide, you may also want to review these related
          pages.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
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
          source="Pag-IBIG Fund (HDMF) — Contribution and Housing Loan Guidelines"
          sourceUrl="https://www.pagibigfund.gov.ph/"
          updatedAt={PAGIBIG_GUIDE_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </div>

      {/* Disclaimer */}
      <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
    </div>
    </>
  );
}
