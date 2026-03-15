import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  TrendingDown,
  Clock,
  Percent,
  HelpCircle,
  BookOpen,
  Calculator,
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
import { PersonalLoanCalculator } from "@/components/calculators/personal-loan-calculator";
import { personalLoanData } from "@/data/calculators/personal-loan";

export const metadata: Metadata = generatePageMetadata({
  title: personalLoanData.metaTitle,
  description: personalLoanData.metaDescription,
  slug: personalLoanData.slug,
  updatedAt: personalLoanData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Personal Loan Calculator" },
];

const exampleScenarios = [
  {
    icon: TrendingDown,
    title: "Smaller loan amount",
    description:
      "Borrowing less usually lowers both your monthly payment and the total interest paid over the life of the loan.",
  },
  {
    icon: Clock,
    title: "Longer loan term",
    description:
      "A longer repayment term may make the monthly payment easier to manage, but it often increases the total interest paid over time.",
  },
  {
    icon: Percent,
    title: "Lower interest rate",
    description:
      "A lower rate can reduce both your monthly payment and the total cost of borrowing, even when the loan amount stays the same.",
  },
];

const questionsToConsider = [
  "Can I comfortably afford the estimated monthly payment along with my other fixed monthly expenses?",
  "Do I really need the full loan amount, or would borrowing less make repayment easier?",
  "Should I compare offers from several banks or lenders before deciding?",
  "Does a shorter term save more in total cost, even if the monthly payment is higher?",
  "Are there extra fees or deductions not included in this estimate?",
];

const actualQuoteDifferences = [
  "Lender or financing company terms",
  "Approval and credit review",
  "Processing fees, service charges, and other deductions",
  "Promo rates or limited-time offers",
  "Repayment structure used by the provider",
  "The way interest is calculated by the lender",
  "Whether fees are deducted upfront or added to the total amount due",
];

const relatedContent = [
  {
    title: "Car Loan Calculator",
    description: "Estimate payments for vehicle financing scenarios.",
    href: "/calculators/loans/car-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Home Loan Calculator",
    description: "Explore how larger long-term loans work.",
    href: "/calculators/loans/home-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Withholding Tax Calculator",
    description:
      "Estimate your monthly withholding tax deduction.",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "All loan calculators",
    description:
      "Browse all borrowing, salary, and savings calculators in one place.",
    href: "/calculators",
    icon: BookOpen,
  },
];

export default function PersonalLoanCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: personalLoanData.metaTitle,
          description: personalLoanData.metaDescription,
        })}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <PageHero
          title={personalLoanData.h1}
          description={personalLoanData.intro}
          badge={personalLoanData.updatedAt}
          breadcrumbs={breadcrumbs}
        />

        {/* Expectation-setting microcopy */}
        <p className="-mt-4 mb-8 text-sm text-muted-foreground">
          This calculator helps you estimate what a personal loan may cost per
          month. It is useful for quick planning, but your actual quote may
          differ depending on the lender, approval terms, fees, promo rates, and
          credit review.
        </p>

        {/* Calculator */}
        <PersonalLoanCalculator />

        {/* What Your Results Mean */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What your results mean
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Monthly payment
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your estimated monthly payment shows how much you may need to
                set aside each month for the loan itself. This can help you
                check whether the loan fits your budget before applying.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Total interest
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your estimated total interest shows how much borrowing may cost
                over the full repayment period, beyond the amount you actually
                borrowed.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Total repayment
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your estimated total repayment combines the estimated loan
                principal and total interest. This helps you see the full cost
                of borrowing, not just the monthly amount.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            A lower loan amount usually reduces both monthly payment and total
            interest. A longer loan term may reduce the monthly amount, but it
            can also increase the total interest paid over time.
          </div>
        </section>

        {/* Why Your Actual Quote May Be Different */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Why your actual quote may be different
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your actual personal loan offer may differ from this estimate
            depending on:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
            {actualQuoteDifferences.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Use this calculator as a planning tool, then compare actual offers
            before making a decision.
          </p>
        </section>

        {/* Example Scenarios */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            See how different inputs can change the estimate
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Small changes in loan amount, interest rate, or repayment term can
            make a noticeable difference in both monthly cost and total
            repayment.
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
            Questions to consider before applying
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

        {/* Compare Financing Options CTA */}
        <section className="mt-12 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-10">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Compare financing options before you commit
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            This calculator gives you a useful starting estimate, but comparing
            actual personal loan offers can help you spot important differences
            in rates, fees, repayment terms, and total borrowing cost.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/calculators"
              className={buttonVariants({ className: "font-medium" })}
            >
              Compare financing options
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/calculators/loans/car-loan-calculator-philippines"
              className={buttonVariants({
                variant: "outline",
                className: "font-medium",
              })}
            >
              Try the car loan calculator
            </Link>
          </div>
        </section>

        {/* Related Guides and Tools */}
        <section className="mt-12">
          <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Related guides and tools
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
            {personalLoanData.formula.description}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {personalLoanData.formula.explanation}
          </p>
        </section>

        {/* FAQ */}
        <FaqSection faqs={personalLoanData.faqs} />

        {/* Final Reassurance Block */}
        <section className="mb-4 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-10">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Use this estimate to plan with more confidence
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A personal loan calculator can help you understand the likely
            monthly cost before you apply. Use the estimate to test different
            loan amounts, rates, and terms, then compare actual offers from
            banks or lenders to find the option that fits your budget better.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/calculators/loans/personal-loan-calculator-philippines"
              className={buttonVariants({ className: "font-medium" })}
            >
              Calculate payment
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/calculators"
              className={buttonVariants({
                variant: "outline",
                className: "font-medium",
              })}
            >
              Compare financing options
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
