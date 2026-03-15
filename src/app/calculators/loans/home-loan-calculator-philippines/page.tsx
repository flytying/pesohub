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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { buttonVariants } from "@/lib/button-variants";
import { HomeLoanCalculator } from "@/components/calculators/home-loan-calculator";
import { homeLoanData } from "@/data/calculators/home-loan";

export const metadata: Metadata = generatePageMetadata({
  title: homeLoanData.metaTitle,
  description: homeLoanData.metaDescription,
  slug: homeLoanData.slug,
  updatedAt: homeLoanData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Home Loan Calculator" },
];

const exampleScenarios = [
  {
    icon: TrendingDown,
    title: "Higher down payment",
    description:
      "A larger down payment usually reduces the amount you need to borrow, which can lower both monthly payments and total interest.",
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
  "Can I comfortably afford the estimated monthly payment along with association dues, insurance, maintenance, property taxes, and other housing-related costs?",
  "Would a larger down payment make the loan more manageable?",
  "Should I compare offers from several banks or housing loan providers before deciding?",
  "Does a shorter term save more in total cost, even if the monthly payment is higher?",
  "Are there extra fees or required charges not included in this estimate?",
];

const actualQuoteDifferences = [
  "Lender or financing institution terms",
  "Approval and credit review",
  "Property appraisal and loan-to-value limits",
  "Processing fees, insurance, and other charges",
  "Promo rates or repricing terms",
  "Required minimum down payment",
  "The way interest is structured or repriced over time",
];

const relatedContent = [
  {
    title: "Car Loan Calculator",
    description: "Estimate payments for a different type of borrowing.",
    href: "/calculators/loans/car-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Personal Loan Calculator",
    description: "Compare shorter-term borrowing scenarios.",
    href: "/calculators/loans/personal-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Pag-IBIG Housing Loan Guide",
    description:
      "Review Pag-IBIG housing loan rates, terms, and requirements.",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    icon: Landmark,
  },
  {
    title: "All loan calculators",
    description:
      "Browse all borrowing, salary, and savings calculators in one place.",
    href: "/calculators",
    icon: BookOpen,
  },
];

export default function HomeLoanCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: homeLoanData.metaTitle,
          description: homeLoanData.metaDescription,
        })}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <PageHero
          title={homeLoanData.h1}
          description={homeLoanData.intro}
          badge={homeLoanData.updatedAt}
          breadcrumbs={breadcrumbs}
        />

        {/* Expectation-setting microcopy */}
        <p className="-mt-4 mb-8 text-sm text-muted-foreground">
          This calculator helps you estimate what a home loan may cost per month.
          It is useful for early planning, but your actual quote may differ
          depending on the lender, down payment, fees, property type, promo
          terms, and credit review.
        </p>

        {/* Calculator */}
        <HomeLoanCalculator />

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
                set aside each month for the loan itself. This can help you check
                whether the property may fit your budget before applying.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Total interest
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your estimated total interest shows how much borrowing may cost
                over the full repayment period, on top of the amount you
                actually borrowed.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Total repayment
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Your estimated total repayment combines the estimated loan
                principal and total interest. This helps you understand the full
                cost of financing, not just the monthly amount.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            A higher down payment usually lowers both your monthly payment and
            your total interest. A longer loan term may reduce the monthly
            amount, but it can also increase the total interest paid over time.
          </div>
        </section>

        {/* Why Your Actual Quote May Be Different */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Why your actual quote may be different
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your actual home loan offer may differ from this estimate depending
            on:
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
            Small changes in down payment, interest rate, or loan term can make
            a noticeable difference in both monthly cost and total repayment.
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
            actual home financing offers can help you spot important differences
            in rates, fees, repayment terms, repricing structure, and total
            borrowing cost.
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
              href="/government/pag-ibig/pag-ibig-housing-loan-guide"
              className={buttonVariants({
                variant: "outline",
                className: "font-medium",
              })}
            >
              Pag-IBIG housing loan guide
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
            {homeLoanData.formula.description}
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            {homeLoanData.formula.explanation}
          </p>
        </section>

        {/* FAQ */}
        <FaqSection faqs={homeLoanData.faqs} />

        {/* Final Reassurance Block */}
        <section className="mb-4 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-10">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Use this estimate to plan with more confidence
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A home loan calculator can help you understand the likely monthly
            cost before you apply. Use the estimate to test different down
            payments, rates, and terms, then compare actual offers from banks or
            housing loan providers to find the option that fits your budget
            better.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/calculators/loans/home-loan-calculator-philippines"
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
