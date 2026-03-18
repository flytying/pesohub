import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calculator,
  Landmark,
  BookOpen,
  BarChart3,
  Clock,
  Banknote,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { buttonVariants } from "@/lib/button-variants";
import { TimeDepositCalculator } from "@/components/calculators/time-deposit-calculator";
import { timeDepositData } from "@/data/calculators/time-deposit";

export const metadata: Metadata = generatePageMetadata({
  title: timeDepositData.metaTitle,
  description: timeDepositData.metaDescription,
  slug: timeDepositData.slug,
  updatedAt: timeDepositData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Time Deposit Calculator" },
];

const maturityMeaning = [
  "Principal is your original deposit",
  "Gross interest is the estimated return before tax",
  "After-tax interest is the estimated return after tax treatment",
  "Net maturity value is the estimated total amount you may receive at the end of the term",
];

const toolIncludes = [
  "estimated gross interest",
  "estimated after-tax interest",
  "estimated maturity amount",
  "simple term comparison",
];

const toolDoesNotInclude = [
  "every bank's exact product rules",
  "early withdrawal penalties",
  "official bank quotations or disclosures",
  "compounding or special crediting rules",
  "promotional rate conditions",
];

const whyDifferent = [
  "bank products may use different compounding or crediting rules",
  "promotional rates may have specific terms",
  "early withdrawal may reduce earnings",
  "minimum deposit rules may affect eligibility",
  "actual product disclosures may include additional conditions",
];

const tdVsSavings = {
  timeDeposit: [
    "usually involves a lock-in period",
    "may offer higher rates for fixed terms",
    "suited for parked funds you won't need soon",
    "early withdrawal may reduce returns",
  ],
  savingsAccount: [
    "usually offers easier access to funds",
    "suited for emergency funds or daily liquidity",
    "may offer lower rates than time deposits",
    "no lock-in period in most cases",
  ],
};

const relatedPages = [
  {
    title: "Best Savings Interest Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: BarChart3,
  },
  {
    title: "Savings Goal Calculator",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Rates Hub",
    href: "/rates",
    icon: Landmark,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: Calculator,
  },
  {
    title: "Guides Hub",
    href: "/guides",
    icon: BookOpen,
  },
];

export default function TimeDepositCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: timeDepositData.metaTitle,
          description: timeDepositData.metaDescription,
        })}
      />

      <PageHero
        title={timeDepositData.h1}
        description={timeDepositData.intro}
        badge={timeDepositData.updatedAt}
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <TimeDepositCalculator />
        </div>

        {/* Result support text */}
        <p className="mt-4 text-xs text-muted-foreground">
          This estimate is based on the amount, rate, and term you entered using
          a simplified time deposit return calculation.
        </p>

        {/* Gross Interest vs After-Tax Interest */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Gross Interest vs After-Tax Interest
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A time deposit may advertise a gross interest rate, but the amount
            you actually receive at maturity may be lower after applicable tax
            treatment is considered. This is why it helps to compare both gross
            return and estimated net return when evaluating deposit options.
          </p>
          <div className="mt-4 rounded-lg border border-border bg-muted/30 p-5">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                <Banknote className="size-4" />
              </div>
              <p className="text-sm text-muted-foreground">
                Use gross return for headline comparison, but use after-tax
                return when deciding how much your money may actually grow.
              </p>
            </div>
          </div>
        </section>

        {/* What Your Maturity Amount Means */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What Your Maturity Amount Means
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Your maturity amount is the estimated total value of your deposit at
            the end of the selected term. It includes your original principal
            plus the interest earned over the deposit period.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            {maturityMeaning.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* What This Calculator Includes */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What This Calculator Includes
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            This page is designed for a simple time deposit estimate and does
            not replace bank-specific product terms.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {toolIncludes.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            What This Calculator Does Not Include
          </h2>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
            {toolDoesNotInclude.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <XCircle className="mt-0.5 size-4 shrink-0 text-red-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-50/50 p-4 dark:bg-amber-950/20">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
            <p className="text-sm text-muted-foreground">
              Actual bank products may use different terms, rates, or early
              withdrawal rules. This estimate is for planning purposes only.
            </p>
          </div>
        </section>

        {/* Why Your Actual Time Deposit Return May Be Different */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Why Your Actual Time Deposit Return May Be Different
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your actual return may differ from this estimate for several
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

        {/* Time Deposit vs Savings Account */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Time Deposit vs Savings Account
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A time deposit is usually better for money you can leave untouched
            for a fixed period. A savings account is usually better if you want
            easier access to your funds. The right choice depends on whether you
            value liquidity more than a fixed-term return.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  Time Deposit
                </h3>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {tdVsSavings.timeDeposit.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <Banknote className="size-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  Savings Account
                </h3>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {tdVsSavings.savingsAccount.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FaqSection faqs={timeDepositData.faqs} />

        {/* Related Savings and Rates Pages */}
        <section className="pt-16">
          <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Related Savings and Rates Pages
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            After estimating your time deposit return, you may also want to
            compare related rates and savings options.
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
            Estimate your time deposit return before you commit
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            A time deposit calculator can help you estimate what your deposit
            may earn based on the rate and term you choose. Use it to compare
            terms, check after-tax returns, and decide whether a time deposit
            fits your savings plan.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#calculator"
              className={buttonVariants({ className: "font-medium" })}
            >
              Estimate time deposit return
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/rates/savings-rates/best-savings-interest-rates-philippines"
              className={buttonVariants({
                variant: "outline",
                className: "font-medium",
              })}
            >
              Compare savings rates
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
