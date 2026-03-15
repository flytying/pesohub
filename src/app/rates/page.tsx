import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  PiggyBank,
  Clock,
  Smartphone,
  Calculator,
  Landmark,
  BookOpen,
  ScrollText,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { buttonVariants } from "@/lib/button-variants";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";

export const metadata = generatePageMetadata({
  title:
    "Philippine Finance Rates | Exchange Rates, Savings Rates & More | PesoHub",
  description:
    "Browse Philippine finance rates in one place. Check exchange rates, compare savings account rates, and explore useful money references and related tools on PesoHub.",
  slug: "rates",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Rates" },
];

const browseTopics = [
  {
    icon: TrendingUp,
    title: "Exchange Rates",
    description:
      "Check reference exchange rates and understand how currency movements may affect remittances, travel, and conversions.",
    href: "#all-rates",
  },
  {
    icon: PiggyBank,
    title: "Savings Account Rates",
    description:
      "Compare savings account interest rates and see which options may help your money grow faster.",
    href: "#all-rates",
  },
  {
    icon: Clock,
    title: "Time Deposit Rates",
    description:
      "Explore time deposit rates in the Philippines and compare common terms, returns, and account types.",
    href: "#all-rates",
  },
  {
    icon: Smartphone,
    title: "Digital Bank Rates",
    description:
      "Review high-yield digital savings options and compare rate-focused products more easily.",
    href: "#all-rates",
  },
];

const ratePages = [
  {
    title: "USD to PHP Exchange Rate",
    description:
      "Check the USD to PHP exchange rate and understand how reference rates compare with rates used by banks, money changers, and remittance services.",
    href: "/rates/exchange-rates/usd-to-php-today",
    category: "Exchange Rates",
  },
  {
    title: "Best Savings Interest Rates in the Philippines",
    description:
      "Compare savings account interest rates in the Philippines, including traditional and high-yield options, so you can find accounts that better match your goals.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    category: "Savings Rates",
  },
  {
    title: "Time Deposit Rates in the Philippines",
    description:
      "Compare time deposit rates, common terms, and return potential across account options in the Philippines.",
    href: "/rates/savings-rates/time-deposit-rates-philippines",
    category: "Time Deposit Rates",
    comingSoon: true,
  },
  {
    title: "Best Digital Bank Rates in the Philippines",
    description:
      "Review digital bank rate options and compare savings-focused products with stronger interest potential.",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    category: "Digital Bank Rates",
    comingSoon: true,
  },
];

const guidanceItems = [
  {
    condition: "If you want to compare savings options",
    action: "Start with Savings Account Rates.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    label: "Savings Account Rates",
  },
  {
    condition: "If you want to estimate how your savings can grow",
    action: "Go to the Savings Goal Calculator.",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    label: "Savings Goal Calculator",
  },
  {
    condition: "If you want to understand official currency reference rates",
    action: "Start with USD to PHP Exchange Rate.",
    href: "/rates/exchange-rates/usd-to-php-today",
    label: "USD to PHP Exchange Rate",
  },
  {
    condition: "If you want government or salary references instead",
    action: "Browse Government Pages or Calculators.",
    href: "/government",
    label: "Government Pages",
  },
];

const howToUsePoints = [
  "Use reference rates for guidance, not guaranteed transaction pricing.",
  "Check bank or provider pages for final product terms, requirements, and promos.",
  "Look for review dates on pages that may change over time.",
];

const faqs = [
  {
    question: "What can I find on the PesoHub Rates page?",
    answer:
      "You can browse rate-related pages for exchange rates, savings account rates, and other finance reference pages that help you compare options or understand current figures more easily.",
  },
  {
    question: "Are these rates official?",
    answer:
      "Some rate pages may use official reference sources, while others summarize rates for comparison purposes. Always check the original bank, provider, or government source before making a financial decision.",
  },
  {
    question:
      "What is the difference between a reference rate and a product rate?",
    answer:
      "A reference rate is a published benchmark or guide rate, such as an exchange reference rate. A product rate is the rate attached to a savings account, time deposit, or other financial product.",
  },
  {
    question: "How often should I check rates?",
    answer:
      "That depends on the type of rate. Exchange rates can change often, while product rates such as savings or time deposit rates may change when providers update their offers or terms.",
  },
  {
    question:
      "Where should I go if I want to calculate savings or deductions?",
    answer:
      "You can visit PesoHub Calculators for tools like savings, salary, tax, and contribution calculators.",
  },
];

const relatedContent = [
  {
    title: "Savings Goal Calculator",
    description:
      "Estimate how much you need to save regularly to reach your target.",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Take-Home Pay Calculator",
    description:
      "See how deductions may affect your actual monthly pay.",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Government Reference Pages",
    description:
      "Browse official-reference-style pages for tax, SSS, and other useful finance topics.",
    href: "/government",
    icon: Landmark,
  },
  {
    title: "Guides Hub",
    description:
      "Read plain-language guides that explain common financial topics more clearly.",
    href: "/guides",
    icon: BookOpen,
  },
];

export default function RatesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <PageHero
        title="Philippine Finance Rates"
        description="Track the finance rates that matter most in the Philippines. Browse exchange rates, savings account rates, and other useful reference pages in one place. PesoHub organizes rate pages to help you compare options faster, understand what the numbers mean, and move to the next useful step."
        breadcrumbs={breadcrumbs}
      />

      {/* Support text */}
      <p className="-mt-4 mb-8 text-sm text-muted-foreground">
        Use this hub to check reference rates, explore savings options, and find
        related calculators and guides.
      </p>

      {/* CTA */}
      <div className="-mt-4 mb-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="#all-rates"
          className={buttonVariants({ className: "font-medium" })}
        >
          Browse rate topics
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="#related"
          className={buttonVariants({
            variant: "outline",
            className: "font-medium",
          })}
        >
          See related tools
        </Link>
      </div>

      {/* Browse Rate Topics */}
      <section className="pt-8">
        <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Browse rate topics
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {browseTopics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Link
                key={topic.title}
                href={topic.href}
                className="group block"
              >
                <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-3 text-sm">
                      {topic.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {topic.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* All Rate Pages */}
      <section id="all-rates" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          All Rate Pages
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Start with the rate page that matches what you want to compare or
          understand.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {ratePages.map((page) => (
            <Card key={page.title} className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground/80">
                    {page.category}
                  </span>
                  {page.comingSoon && (
                    <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                      Coming soon
                    </span>
                  )}
                </div>
                <CardTitle className="mt-2 text-base">{page.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {page.description}
                </CardDescription>
                <div className="mt-3">
                  <Link
                    href={page.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
                  >
                    View rates
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Not Sure Where to Start */}
      <section className="mt-12 rounded-lg border border-border bg-muted/30 p-6">
        <h2 className="text-sm font-semibold text-foreground">
          Not sure where to start?
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Choose the page that matches what you need most right now.
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {guidanceItems.map((item) => (
            <li key={item.label}>
              <span className="font-medium text-foreground/80">
                {item.condition}:
              </span>{" "}
              <Link
                href={item.href}
                className="text-primary hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* How to Use PesoHub Rate Pages */}
      <section className="pt-16">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How to use PesoHub rate pages
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          PesoHub rate pages are designed to make finance information easier to
          scan and compare. Some pages focus on official reference rates, while
          others help you compare product rates such as savings accounts or time
          deposits.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Where relevant, PesoHub pages should clearly explain what a rate
          represents, what it does not include, and when you should verify
          details with the official source or financial institution before making
          a decision.
        </p>
        <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
          {howToUsePoints.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Related Tools and Guides */}
      <section id="related" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related tools and guides
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Looking beyond rates? Explore calculators and guides that can help you
          plan savings, understand deductions, or compare related financial
          information.
        </p>
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

      {/* FAQ */}
      <FaqSection faqs={faqs} />

      {/* Final CTA */}
      <section className="mb-4 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-10">
        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
          Find the rate page you need
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Browse exchange rates, savings account rates, and related finance
          references — all in one place. Use PesoHub to compare faster and
          understand what the numbers mean.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#all-rates"
            className={buttonVariants({ className: "font-medium" })}
          >
            Browse rate pages
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/calculators"
            className={buttonVariants({
              variant: "outline",
              className: "font-medium",
            })}
          >
            Explore calculators
          </Link>
        </div>
      </section>
    </div>
  );
}
