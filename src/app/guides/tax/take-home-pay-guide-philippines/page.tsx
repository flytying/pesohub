import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  BookOpen,
  Shield,
  Landmark,
  Heart,
  Home,
  Minus,
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
  takeHomePayGuideMeta,
  sampleBreakdown,
  deductionExplainers,
  whyPayslipDiffers,
  whatThisHelps,
  takeHomePayGuideFaqs,
  TAKE_HOME_PAY_GUIDE_UPDATED_AT,
} from "@/data/guides/take-home-pay-guide";

export const metadata = generatePageMetadata({
  title: takeHomePayGuideMeta.metaTitle,
  description: takeHomePayGuideMeta.metaDescription,
  slug: takeHomePayGuideMeta.slug,
  updatedAt: TAKE_HOME_PAY_GUIDE_UPDATED_AT,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides", href: "/guides" },
  { label: "Take-Home Pay Guide" },
];

const relatedPages = [
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
    title: "PhilHealth Contribution Table",
    href: "/government/philhealth/philhealth-contribution-table-philippines",
    icon: Heart,
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

export default function TakeHomePayGuidePage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateArticleSchema({
          title: takeHomePayGuideMeta.metaTitle,
          description: takeHomePayGuideMeta.metaDescription,
          updatedAt: TAKE_HOME_PAY_GUIDE_UPDATED_AT,
          slug: takeHomePayGuideMeta.slug,
        })}
      />

      <PageHero
        title={takeHomePayGuideMeta.title}
        description={takeHomePayGuideMeta.directAnswer}
        badge={TAKE_HOME_PAY_GUIDE_UPDATED_AT}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Support text */}
      <p className="-mt-4 mb-8 text-sm text-muted-foreground">
        Useful for employees who want a plain-language explanation of salary
        deductions before using a calculator.
      </p>

      {/* Why Is Take-Home Pay Lower Than Gross Salary? */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Why Is Take-Home Pay Lower Than Gross Salary?
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Gross salary is your pay before deductions. Take-home pay, or net pay,
          is what remains after common payroll deductions such as withholding
          tax, SSS, PhilHealth, and Pag-IBIG are subtracted. That is why the
          amount that reaches your payslip or bank account is usually lower than
          your gross monthly salary.
        </p>

        {/* In simple terms */}
        <div className="mt-6 rounded-lg border border-border bg-muted/30 p-5">
          <p className="text-sm font-medium text-foreground">
            In simple terms:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>Gross salary is before deductions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>Take-home pay is after deductions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                Tax and government contributions reduce the final amount received
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                Some payslips may also include employer-specific deductions or
                adjustments
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Sample Gross-to-Net Salary Breakdown */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Sample Gross-to-Net Salary Breakdown
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          The easiest way to understand take-home pay is to compare a sample
          gross salary with the deductions taken from it. This before-and-after
          format helps show that take-home pay is not a different kind of salary
          — it is simply your gross pay after payroll deductions.
        </p>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {sampleBreakdown.map((row) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between px-5 py-3 ${
                    row.highlight
                      ? "bg-primary/5 font-semibold"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm">
                    {row.isDeduction && (
                      <Minus className="size-3.5 text-muted-foreground" />
                    )}
                    <span
                      className={
                        row.highlight
                          ? "text-foreground"
                          : row.isDeduction
                            ? "text-muted-foreground"
                            : "text-foreground font-medium"
                      }
                    >
                      {row.label}
                    </span>
                  </div>
                  <span
                    className={`text-sm tabular-nums ${
                      row.highlight
                        ? "text-primary text-lg font-bold"
                        : row.isDeduction
                          ? "text-muted-foreground"
                          : "font-medium text-foreground"
                    }`}
                  >
                    {row.isDeduction ? `(${formatPeso(row.amount)})` : formatPeso(row.amount)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <p className="mt-2 text-xs text-muted-foreground">
          Based on a sample ₱35,000 monthly salary. Actual amounts depend on
          payroll handling and current contribution schedules.
        </p>
      </section>

      {/* What Deductions Reduce Take-Home Pay? */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          What Deductions Reduce Take-Home Pay?
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          The most common payroll deductions in the Philippines usually include
          the following. Together, these deductions reduce gross salary into
          take-home pay.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {deductionExplainers.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-sm">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Gross Pay Is Not Always the Same as Taxable Pay */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Gross Pay Is Not Always the Same as Taxable Pay
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          One reason payroll can feel confusing is that gross salary is not
          always the same as the amount used to compute tax. Some deductions and
          payroll treatments affect taxable compensation differently, which is
          one reason tax estimates and actual payslips do not always match
          perfectly.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This is why payroll explanations often need both a{" "}
          <Link
            href="/guides/tax/how-withholding-tax-works-philippines"
            className="text-primary hover:underline"
          >
            tax guide
          </Link>{" "}
          and a full{" "}
          <Link
            href="/calculators/tax/take-home-pay-calculator-philippines"
            className="text-primary hover:underline"
          >
            take-home pay calculator
          </Link>
          .
        </p>
      </section>

      {/* Why Your Actual Payslip May Be Different */}
      <section className="py-8">
        <h2 className="mb-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Why Your Actual Payslip May Be Different
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          Even if two employees have the same gross salary, their actual
          take-home pay may differ depending on payroll treatment and added
          deductions. This is why a simple guide or calculator should be treated
          as a planning tool, not a replacement for your actual payslip.
        </p>
        <p className="mb-3 text-sm font-medium text-foreground/80">
          Common reasons include:
        </p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          {whyPayslipDiffers.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" />
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

      {/* Want to Estimate Your Take-Home Pay Directly? */}
      <Card className="my-8 border-primary/20 bg-primary/5">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Calculator className="size-5 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              Want to Estimate Your Take-Home Pay Directly?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              If you already know your monthly gross salary and want to estimate
              your net pay, use the Take-Home Pay Calculator to see a deduction
              breakdown faster.
            </p>
          </div>
          <Link
            href="/calculators/tax/take-home-pay-calculator-philippines"
            className={buttonVariants({
              className: "shrink-0 font-medium",
            })}
          >
            Use the Take-Home Pay Calculator
            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>

      {/* FAQ */}
      <FaqSection faqs={takeHomePayGuideFaqs} />

      {/* Related Payroll Guides and Tools */}
      <section className="pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related Payroll Guides and Tools
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
          source="BIR TRAIN Law, SSS, PhilHealth, and Pag-IBIG official contribution schedules"
          sourceUrl="https://www.bir.gov.ph/"
          updatedAt={TAKE_HOME_PAY_GUIDE_UPDATED_AT}
          reviewCadence="Every 90 days"
        />
      </div>

      {/* Disclaimer */}
      <DisclaimerBox text={GOVERNMENT_DISCLAIMER} />
    </div>
    </>
  );
}
