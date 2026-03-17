import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  HelpCircle,
  Calculator,
  BookOpen,
  DollarSign,
  Percent,
  Clock,
  ShieldCheck,
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
import { CarLoanCalculator } from "@/components/calculators/car-loan-calculator";
import { carLoanData } from "@/data/calculators/car-loan";

export const metadata: Metadata = generatePageMetadata({
  title: carLoanData.metaTitle,
  description: carLoanData.metaDescription,
  slug: carLoanData.slug,
  updatedAt: carLoanData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Car Loan Calculator" },
];

const beforeYouStart = [
  "Start with the car's total purchase price",
  "Choose a down payment you can comfortably afford",
  "Compare 36-, 48-, and 60-month loan terms",
  "Test different interest rates if you are comparing lenders",
  "Leave room in your budget for insurance, registration, fuel, and maintenance",
];

const paymentFactors = [
  {
    icon: DollarSign,
    title: "Vehicle Price",
    description:
      "A more expensive car increases the total amount you need to finance, which usually increases the monthly payment.",
  },
  {
    icon: ShieldCheck,
    title: "Down Payment",
    description:
      "A larger down payment reduces the amount borrowed. This often lowers both your monthly payment and the total interest you pay over the life of the loan.",
  },
  {
    icon: Clock,
    title: "Loan Term",
    description:
      "A longer term spreads the cost over more months, which can lower the monthly payment. However, it may also increase the total interest paid overall.",
  },
  {
    icon: Percent,
    title: "Interest Rate",
    description:
      "Even a small difference in interest rate can change the total cost of borrowing. When comparing lenders, check both the monthly payment and the full loan cost.",
  },
];

const ownershipCosts = [
  "comprehensive insurance",
  "chattel mortgage fees",
  "LTO registration and renewal costs",
  "fuel",
  "maintenance and repairs",
  "parking and tolls",
];

const compareBeforeApplying = [
  "estimated monthly payment",
  "down payment required",
  "total interest over the full term",
  "total estimated loan cost",
  "required insurance or add-on products",
  "chattel mortgage and processing fees",
  "early repayment terms",
  "dealer financing versus bank financing",
];

const questionsToConsider = [
  "Can I comfortably afford the estimated monthly payment along with fuel, insurance, maintenance, parking, and registration costs?",
  "Would a larger down payment make the loan more manageable?",
  "Should I compare dealer financing and bank financing before deciding?",
  "Does a shorter term save more in total cost, even if the monthly payment is higher?",
  "Are there extra fees or required charges not included in this estimate?",
];

const relatedContent = [
  {
    title: "Personal Loan Calculator",
    description: "Estimate payments for a different type of borrowing.",
    href: "/calculators/loans/personal-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Home Loan Calculator",
    description: "Compare how larger long-term loans work.",
    href: "/calculators/loans/home-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Loan Guides",
    description:
      "Learn how rates, terms, and payment estimates work before comparing options.",
    href: "/guides",
    icon: BookOpen,
  },
  {
    title: "Interest Rate Guides",
    description:
      "Understand how rates are set and what affects your borrowing cost.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: BookOpen,
  },
  {
    title: "Financial Planning Guides",
    description:
      "Broader guides on budgeting, saving, and managing money in the Philippines.",
    href: "/guides",
    icon: BookOpen,
  },
];

export default function CarLoanCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: carLoanData.metaTitle,
          description: carLoanData.metaDescription,
        })}
      />

      <PageHero
        title={carLoanData.h1}
        description={carLoanData.intro}
        badge={carLoanData.updatedAt}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <CarLoanCalculator
            beforeYouStart={{
              description:
                "If you are still deciding what car budget makes sense, start with a few simple assumptions. Use the full vehicle price, then test different down payments and loan terms to see how your monthly payment changes.",
              items: beforeYouStart,
            }}
          />
        </div>

        {/* How to Tell if the Monthly Payment Is Realistic */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            How to Tell if the Monthly Payment Is Realistic
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A monthly car payment may look manageable at first, but it should
            still fit comfortably within your overall monthly budget. Before
            applying, check whether you can still cover your regular expenses,
            savings, emergency fund, and other debt payments after adding the
            estimated monthly amortization.
          </p>
          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            A lower monthly payment is not always the cheaper option overall. A
            longer loan term can reduce the monthly amount, but it may also
            increase the total interest paid over time. A bigger down payment
            usually lowers both the monthly payment and the total borrowing cost.
          </div>
        </section>

        {/* What Affects Your Monthly Car Loan Payment */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What Affects Your Monthly Car Loan Payment
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your estimated car loan payment depends on four main factors: the
            vehicle price, the down payment, the loan term, and the interest
            rate. Understanding how each one works can help you compare offers
            more clearly.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {paymentFactors.map((factor) => {
              const Icon = factor.icon;
              return (
                <div key={factor.title} className="space-y-2">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-sm font-semibold">{factor.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {factor.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Your Monthly Loan Payment Is Not the Full Cost */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Your Monthly Loan Payment Is Not the Full Cost of Owning a Car
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            A car loan calculator helps estimate the financing side of the
            purchase, but your total car budget should include more than just the
            monthly amortization. Also consider:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
            {ownershipCosts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Use the calculator to estimate your loan payment, then add these
            ownership costs before deciding what vehicle price range is truly
            affordable.
          </p>
        </section>

        {/* What to Compare Before Choosing a Car Loan */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What to Compare Before Choosing a Car Loan
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Do not compare lenders based on monthly payment alone. Two offers may
            look similar at first, but the total cost can be very different
            depending on the term, interest rate, and fees. Before applying,
            compare:
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
            {compareBeforeApplying.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Use this calculator more than once so you can compare multiple offers
            side by side before making a decision.
          </p>
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

        {/* Related Calculators and Guides */}
        <section className="mt-12">
          <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Related calculators and guides
          </h2>
          <p className="mb-6 -mt-4 text-sm text-muted-foreground">
            Looking at other borrowing options or comparing financial decisions?
            Explore related PesoHub tools and guides below.
          </p>
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

        {/* FAQ */}
        <FaqSection faqs={carLoanData.faqs} />

        {/* Final Reassurance Block */}
        <section className="mb-4 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-10">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
            Use this estimate to plan with more confidence
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A car loan calculator can help you understand the likely monthly cost
            before you apply. Use the estimate to test different down payments,
            rates, and terms, then compare actual offers from banks or dealers to
            find the option that fits your budget better.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#calculator"
              className={buttonVariants({ className: "font-medium" })}
            >
              Calculate payment
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/calculators/loans/personal-loan-calculator-philippines"
              className={buttonVariants({
                variant: "outline",
                className: "font-medium",
              })}
            >
              Try the personal loan calculator
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
