import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Clock,
  Users,
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

const exampleScenarios = [
  {
    icon: TrendingUp,
    title: "Higher salary level",
    description:
      "A higher salary or compensation basis may move the estimate to a higher Monthly Salary Credit range, which can increase the contribution amount.",
  },
  {
    icon: Users,
    title: "Different member type",
    description:
      "The estimate may change depending on whether the user is classified as an employee, self-employed member, voluntary member, non-working spouse, or OFW because the official schedules are not all the same.",
  },
  {
    icon: Clock,
    title: "Updated contribution schedule",
    description:
      "If SSS updates the official schedule or contribution basis, the estimate may change even when salary stays the same. SSS announced that starting January 2025, the contribution rate increased to 15%, with the minimum MSC raised to ₱5,000 and the maximum MSC to ₱35,000.",
  },
];

const questionsToConsider = [
  "Am I using the correct member type for this estimate?",
  "Does this calculator clearly show the contribution schedule or reference period used?",
  "Am I looking for SSS only, or do I actually need a fuller payroll deduction estimate?",
  "Does my payslip or actual payment record include other deductions that are not shown here?",
  "Should I confirm this estimate against the official SSS table or My.SSS records?",
];

const actualDifferences = [
  "The member type selected",
  "The official contribution schedule and reference period used",
  "The Monthly Salary Credit that applies to your compensation",
  "Payroll setup or employer processing",
  "Updates to SSS rules, schedules, or implementation guidance",
  "Whether your contribution includes other program components under the official schedule",
];

const toolIncludes = [
  "SSS contribution estimate based on supported salary input",
  "Member-type-based schedule assumptions",
  "Contribution estimate using the calculator's stated reference period",
  "Optional contribution breakdown if supported by the tool",
];

const toolDoesNotInclude = [
  "Withholding tax",
  "Full take-home pay estimate",
  "PhilHealth deductions",
  "Pag-IBIG deductions",
  "Employer-specific payroll deductions",
  "Final posting or confirmation from SSS",
];

const relatedContent = [
  {
    title: "Take-Home Pay Calculator",
    description:
      "Estimate net pay after common deductions, not just SSS.",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Withholding Tax Calculator",
    description: "Estimate salary tax separately.",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "PhilHealth Contribution Guide",
    description:
      "Understand how PhilHealth may affect payroll deductions.",
    href: "/guides/government/philhealth-contribution-guide",
    icon: BookOpen,
  },
  {
    title: "Pag-IBIG Deduction Guide",
    description:
      "Review how Pag-IBIG contributions may be treated.",
    href: "/guides/government/pag-ibig-contribution-guide",
    icon: BookOpen,
  },
  {
    title: "SSS Contribution Table Guide",
    description:
      "See the official SSS schedule and member-type references.",
    href: "/government/sss/sss-contribution-guide",
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

        {/* Scope note / expectation-setting microcopy */}
        <div className="-mt-4 mb-8 space-y-1 text-sm text-muted-foreground">
          <p>
            This calculator is designed for SSS contribution estimates only. It
            does not automatically represent your full take-home pay, and it does
            not replace the official SSS contribution table.
          </p>
          <p>
            SSS publishes different contribution schedules depending on member
            classification, and the latest official schedules currently listed by
            SSS are effective January 2025.
          </p>
          <p>
            For net pay after multiple deductions, use the{" "}
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
        <SSSContributionCalculator />

        {/* What Your Result Means */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What your result means
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Estimated SSS contribution
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your estimated SSS contribution shows the amount that may apply
                based on your salary level or contribution basis and the member
                type selected in the calculator.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                SSS portion only
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                This result helps you understand the SSS portion only of your
                payroll or personal contribution obligations. It is not the same
                as a full salary deduction summary or take-home pay estimate.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            SSS contribution amounts can differ depending on whether you are an
            employee, employer, self-employed member, voluntary member,
            non-working spouse, or land-based OFW because SSS publishes separate
            schedules for different member types.
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
            For net pay after common deductions, use the{" "}
            <Link
              href="/calculators/tax/take-home-pay-calculator-philippines"
              className="text-primary hover:underline"
            >
              Take-Home Pay Calculator
            </Link>
            . For tax-only estimates, use the{" "}
            <Link
              href="/calculators/tax/withholding-tax-calculator-philippines"
              className="text-primary hover:underline"
            >
              Withholding Tax Calculator
            </Link>
            .
          </p>
        </section>

        {/* Why Your Actual SSS Contribution May Be Different */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Why your actual SSS contribution may be different
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your actual SSS contribution may differ from this estimate depending
            on:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
            {actualDifferences.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            SSS states that monthly contributions are based on compensation and
            payable under specific programs, and the latest official contribution
            table should be checked for final reference.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Use this calculator as a planning tool, then confirm the final
            amount using the official SSS contribution table, your payslip, or
            your My.SSS records.
          </p>
        </section>

        {/* Example Scenarios */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            See how different inputs can change the estimate
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Changes in salary level, member type, or contribution schedule can
            affect how much SSS contribution may apply.
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
            {sssContributionCalcData.formula.description}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            The contribution schedule period should be shown clearly near the
            calculator, such as &ldquo;Effective January 2025,&rdquo; so users
            can understand what official basis the estimate follows. The official
            SSS site provides a contribution table page and circulars listing
            separate schedules for employers and employees, household
            employment, self-employed members, voluntary and non-working spouse
            members, and land-based OFWs.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {sssContributionCalcData.formula.explanation}
          </p>
        </section>

        {/* FAQ */}
        <FaqSection faqs={sssContributionCalcData.faqs} />

        {/* Final Reassurance Block */}
        <section className="mb-4 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-10">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Use this estimate to check SSS contributions more clearly
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            An SSS contribution calculator can help you understand the likely
            contribution amount tied to your salary level and member type before
            reviewing your payslip or official records. Use it for quick
            planning, then confirm the final amount using the latest official SSS
            table.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/calculators/sss/sss-contribution-calculator-philippines"
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
