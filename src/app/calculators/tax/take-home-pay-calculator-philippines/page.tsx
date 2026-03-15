import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Clock,
  DollarSign,
  HelpCircle,
  Calculator,
  Landmark,
  BookOpen,
  CheckCircle,
  XCircle,
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
} from "@/components/ui/card";
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

const exampleScenarios = [
  {
    icon: TrendingUp,
    title: "Higher salary level",
    description:
      "A higher gross salary will increase withholding tax and may also change SSS and PhilHealth deductions, resulting in a different net pay estimate.",
  },
  {
    icon: Clock,
    title: "Different pay frequency",
    description:
      "Pay period assumptions may affect how deductions are calculated. This tool uses monthly gross salary as the basis.",
  },
  {
    icon: DollarSign,
    title: "Different deduction assumptions",
    description:
      "Your actual SSS, PhilHealth, or Pag-IBIG contributions may differ if your employer uses a different salary credit or rate basis.",
  },
];

const questionsToConsider = [
  "Am I looking at take-home pay or just withholding tax?",
  "Does this estimate match how my employer calculates deductions?",
  "Are there employer-specific deductions not covered here?",
  "Does my pay include non-taxable allowances or benefits?",
  "Should I compare this with my actual payslip?",
];

const actualPayDifferences = [
  "Employer-specific deductions or benefits not included here",
  "Different salary credit bases used by your employer",
  "Non-taxable allowances, bonuses, or overtime pay",
  "Salary loan repayments or voluntary deductions",
  "Updates to contribution rates or official tables",
  "Payroll setup and pay frequency differences",
];

const toolIncludes = [
  "Withholding tax estimate based on TRAIN Law brackets",
  "SSS employee share based on 2025 contribution table",
  "PhilHealth employee share based on current premium rate",
  "Pag-IBIG employee share based on standard contribution rules",
];

const toolDoesNotInclude = [
  "Employer-specific deductions or benefits",
  "Loan or salary deduction repayments",
  "13th month pay, bonuses, or overtime",
  "Holiday pay or night differential",
  "Other voluntary deductions",
];

const relatedContent = [
  {
    title: "Withholding Tax Calculator",
    description:
      "Estimate withholding tax only, without SSS, PhilHealth, or Pag-IBIG.",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "SSS Contribution Guide",
    description: "Understand how SSS deductions are calculated from your salary.",
    href: "/government/sss/sss-contribution-guide",
    icon: Landmark,
  },
  {
    title: "PhilHealth Contribution Guide",
    description:
      "Learn about PhilHealth premium rates and employee share calculations.",
    href: "/guides/government/philhealth-contribution-guide",
    icon: BookOpen,
  },
  {
    title: "Pag-IBIG Contribution Guide",
    description:
      "See how Pag-IBIG contributions are computed based on your salary.",
    href: "/guides/government/pag-ibig-contribution-guide",
    icon: BookOpen,
  },
  {
    title: "Salary Deduction Guide",
    description:
      "A broader look at common salary deductions in the Philippines.",
    href: "/guides/tax/salary-deductions-philippines",
    icon: BookOpen,
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

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <PageHero
          title={takeHomePayData.h1}
          description={takeHomePayData.intro}
          badge={takeHomePayData.updatedAt}
          breadcrumbs={breadcrumbs}
        />

        {/* Scope note / expectation-setting microcopy */}
        <div className="-mt-4 mb-8 space-y-1 text-sm text-muted-foreground">
          <p>
            This calculator estimates take-home pay after common payroll
            deductions. It covers withholding tax, SSS, PhilHealth, and
            Pag-IBIG — but not employer-specific items like salary loans,
            allowances, or voluntary deductions.
          </p>
          <p>
            For withholding tax only, use the{" "}
            <Link
              href="/calculators/tax/withholding-tax-calculator-philippines"
              className="text-primary hover:underline"
            >
              Withholding Tax Calculator
            </Link>
            .
          </p>
        </div>

        {/* Calculator */}
        <TakeHomePayCalculator />

        {/* What Your Result Means */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What your result means
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Estimated take-home pay
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your estimated take-home pay shows the amount you may receive
                after withholding tax, SSS, PhilHealth, and Pag-IBIG deductions
                are subtracted from your gross monthly salary.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Deduction breakdown
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                The breakdown shows how each mandatory deduction contributes to
                the total amount withheld from your salary. This can help you
                understand where your deductions are going and plan accordingly.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            A take-home pay estimate can be useful for budgeting and salary
            planning, but actual payslip amounts may differ due to
            employer-specific deductions, allowances, or adjustments not covered
            by this tool.
          </div>
        </section>

        {/* What This Tool Includes and Does Not Include */}
        <section className="mt-12">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                What this tool includes
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {toolIncludes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                What this tool does not include
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {toolDoesNotInclude.map((item) => (
                  <li key={item} className="flex gap-2">
                    <XCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            For withholding tax only, use the{" "}
            <Link
              href="/calculators/tax/withholding-tax-calculator-philippines"
              className="text-primary hover:underline"
            >
              Withholding Tax Calculator
            </Link>
            .
          </p>
        </section>

        {/* Why Your Actual Take-Home Pay May Be Different */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Why your actual take-home pay may be different
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your actual net pay may differ from this estimate depending on:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
            {actualPayDifferences.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Use this calculator as a planning tool, then compare with your
            actual payslip or check with your employer or payroll team for the
            final figures.
          </p>
        </section>

        {/* Example Scenarios */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            See how different inputs can affect the estimate
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Changes in salary level, pay frequency, or deduction assumptions can
            affect your estimated take-home pay.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {exampleScenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <Card key={scenario.title} className="h-full">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-3 text-sm">
                      {scenario.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {scenario.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Questions to Consider */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Questions to consider
          </h2>
          <ul className="mt-4 space-y-3">
            {questionsToConsider.map((question, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <HelpCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                {question}
              </li>
            ))}
          </ul>
        </section>

        {/* Related Calculators and Guides */}
        <section className="mt-12">
          <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Related calculators and guides
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedContent.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group block"
                >
                  <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                    <CardHeader>
                      <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle className="mt-3 text-sm">
                        {item.title}
                      </CardTitle>
                      <CardDescription className="text-xs leading-relaxed">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* How This Calculator Works */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How this calculator works
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {takeHomePayData.formula.description}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {takeHomePayData.formula.explanation}
          </p>
        </section>

        {/* FAQ */}
        <FaqSection faqs={takeHomePayData.faqs} />

        {/* Final Reassurance Block */}
        <section className="mb-4 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-10">
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
              href="/calculators/tax/take-home-pay-calculator-philippines"
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
