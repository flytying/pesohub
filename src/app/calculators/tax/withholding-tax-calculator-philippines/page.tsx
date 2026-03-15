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
import { WithholdingTaxCalculator } from "@/components/calculators/withholding-tax-calculator";
import { withholdingTaxData } from "@/data/calculators/withholding-tax";

export const metadata: Metadata = generatePageMetadata({
  title: withholdingTaxData.metaTitle,
  description: withholdingTaxData.metaDescription,
  slug: withholdingTaxData.slug,
  updatedAt: withholdingTaxData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Withholding Tax Calculator" },
];

const exampleScenarios = [
  {
    icon: TrendingUp,
    title: "Higher salary level",
    description:
      "A higher taxable salary may increase the withholding tax estimate depending on the applicable tax bracket.",
  },
  {
    icon: Clock,
    title: "Different pay frequency",
    description:
      "The estimate may change depending on whether salary is viewed monthly, semi-monthly, or through another supported pay schedule.",
  },
  {
    icon: DollarSign,
    title: "Additional taxable income",
    description:
      "If the tool supports extra taxable amounts, adding them may increase the withholding tax estimate.",
  },
];

const questionsToConsider = [
  "Am I looking for withholding tax only, or do I actually need a full take-home pay estimate?",
  "Does this estimate use the same tax period or reference table I need?",
  "Are there other deductions that affect my actual net pay?",
  "Does my compensation include bonuses, allowances, or other items that may affect payroll tax treatment?",
  "Should I compare this result with my payslip or employer payroll estimate?",
];

const actualQuoteDifferences = [
  "The tax table or reference period used",
  "Payroll setup and pay frequency",
  "Taxable and non-taxable pay components",
  "Employer payroll policies",
  "Adjustments, bonuses, or other compensation items",
  "Updates to applicable tax rules or official tables",
];

const toolIncludes = [
  "Withholding tax estimate based on the supported salary input",
  "Tax bracket or table-based calculation assumptions",
  "Salary-based tax planning estimate",
];

const toolDoesNotInclude = [
  "SSS deductions",
  "PhilHealth deductions",
  "Pag-IBIG deductions",
  "Employer-specific deductions or benefits",
  "A full take-home pay estimate unless explicitly stated",
];

const relatedContent = [
  {
    title: "Take-Home Pay Calculator",
    description:
      "Estimate net pay after common deductions, not just withholding tax.",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "SSS Contribution Guide",
    description: "Understand how SSS deductions may affect payroll.",
    href: "/government/sss/sss-contribution-guide",
    icon: Landmark,
  },
  {
    title: "How Withholding Tax Works",
    description:
      "See the salary tax reference and bracket guide behind the estimate.",
    href: "/guides/tax/how-withholding-tax-works-philippines",
    icon: BookOpen,
  },
  {
    title: "Withholding Tax Table",
    description: "View the official BIR withholding tax table reference.",
    href: "/government/bir/withholding-tax-table-philippines",
    icon: Landmark,
  },
];

export default function WithholdingTaxCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: withholdingTaxData.metaTitle,
          description: withholdingTaxData.metaDescription,
        })}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <PageHero
          title={withholdingTaxData.h1}
          description={withholdingTaxData.intro}
          badge={withholdingTaxData.updatedAt}
          breadcrumbs={breadcrumbs}
        />

        {/* Scope note / expectation-setting microcopy */}
        <div className="-mt-4 mb-8 space-y-1 text-sm text-muted-foreground">
          <p>
            This calculator estimates withholding tax only. It does not include
            SSS, PhilHealth, or Pag-IBIG deductions unless clearly stated in the
            tool.
          </p>
          <p>
            For a fuller net-pay estimate, use the{" "}
            <Link
              href="/calculators/tax/take-home-pay-calculator-philippines"
              className="text-primary hover:underline"
            >
              Take-Home Pay Calculator
            </Link>
            .
          </p>
        </div>

        {/* Calculator */}
        <WithholdingTaxCalculator />

        {/* What Your Result Means */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What your result means
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Estimated withholding tax
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your estimated withholding tax shows the amount that may be
                withheld from your salary for income tax purposes based on the
                salary input and tax table assumptions used by this tool.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Tax portion only
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                This result helps you understand the tax portion only of your
                payroll deductions. It does not automatically represent your
                final take-home pay.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            A tax estimate can be useful for salary planning, but withholding
            tax is only one part of the bigger payroll picture. Your actual net
            pay may also be affected by SSS, PhilHealth, Pag-IBIG, and other
            employer-specific deductions.
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
            For net pay after multiple deductions, use the{" "}
            <Link
              href="/calculators/tax/take-home-pay-calculator-philippines"
              className="text-primary hover:underline"
            >
              Take-Home Pay Calculator
            </Link>
            .
          </p>
        </section>

        {/* Why Your Actual Payroll Tax May Be Different */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Why your actual payroll tax may be different
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your actual withholding tax may differ from this estimate depending
            on:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
            {actualQuoteDifferences.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Use this calculator as a planning tool, then confirm final payroll
            details with your employer, payroll team, or the relevant official
            source.
          </p>
        </section>

        {/* Example Scenarios */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            See how salary level can affect the estimate
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Changes in salary amount, pay frequency, or taxable compensation can
            affect how much withholding tax may apply.
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
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
            {withholdingTaxData.formula.description}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {withholdingTaxData.formula.explanation}
          </p>
        </section>

        {/* FAQ */}
        <FaqSection faqs={withholdingTaxData.faqs} />

        {/* Final Reassurance Block */}
        <section className="mb-4 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-10">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Use this estimate to check withholding tax more clearly
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A withholding tax calculator can help you understand the likely tax
            portion of your payroll deductions before reviewing your payslip or
            employer estimate. Use it to check salary-based tax scenarios, then
            use related tools if you also need contribution or net-pay estimates.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/calculators/tax/withholding-tax-calculator-philippines"
              className={buttonVariants({ className: "font-medium" })}
            >
              Calculate tax
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
