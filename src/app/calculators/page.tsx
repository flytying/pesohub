import Link from "next/link";
import {
  ArrowRight,
  Wallet,
  Target,
  PiggyBank,
  LayoutList,
  Lightbulb,
  ClipboardCheck,
  ArrowDownRight,
  BookOpen,
  ScrollText,
  TrendingUp,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
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
    "Financial Calculators Philippines | Loan, Salary, Tax & Savings Tools",
  description:
    "Use PesoHub financial calculators to estimate loan payments, salary deductions, tax, SSS contributions, and savings goals in the Philippines.",
  slug: "calculators",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators" },
];

const needCards = [
  {
    title: "For borrowing money",
    description:
      "Estimate monthly payments and compare loan scenarios before applying.",
    href: "#borrowing",
    cta: "Explore borrowing calculators",
    icon: Wallet,
  },
  {
    title: "For salary and deductions",
    description:
      "Check tax, contributions, and take-home pay estimates using common Philippine inputs.",
    href: "#salary",
    cta: "Explore salary calculators",
    icon: Target,
  },
  {
    title: "For saving and planning",
    description:
      "Estimate savings targets, deposit growth, and practical financial goals.",
    href: "#savings",
    cta: "Explore savings calculators",
    icon: PiggyBank,
  },
];

const borrowingCalculators = [
  {
    title: "Car Loan Calculator",
    description:
      "Estimate monthly car loan payments based on your loan amount, interest rate, and repayment term.",
    bestFor: "People planning to finance a vehicle",
    youllNeed: "Loan amount, interest rate, loan term",
    href: "/calculators/loans/car-loan-calculator-philippines",
  },
  {
    title: "Home Loan Calculator",
    description:
      "Estimate monthly home loan payments for different loan amounts, rates, and repayment periods.",
    bestFor: "Buyers exploring housing loan affordability",
    youllNeed: "Loan amount, interest rate, loan term",
    href: "/calculators/loans/home-loan-calculator-philippines",
  },
  {
    title: "Personal Loan Calculator",
    description:
      "Estimate possible monthly payments for a personal loan based on the amount borrowed, interest rate, and repayment period.",
    bestFor: "Borrowers comparing short- to medium-term loan options",
    youllNeed: "Loan amount, interest rate, loan term",
    href: "/calculators/loans/personal-loan-calculator-philippines",
  },
];

const salaryCalculators = [
  {
    title: "Withholding Tax Calculator",
    description:
      "Estimate monthly withholding tax based on your salary and the applicable tax bracket or tax table assumptions.",
    bestFor:
      "Employees who want a clearer estimate of salary tax deductions",
    youllNeed: "Salary amount, pay frequency, tax assumptions",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
  },
  {
    title: "SSS Contribution Calculator",
    description:
      "Estimate SSS contribution amounts based on salary level or applicable contribution basis.",
    bestFor:
      "Employees, employers, and self-paying members checking contribution estimates",
    youllNeed: "Salary or contribution basis, member type",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
  },
  {
    title: "Take-Home Pay Calculator",
    description:
      "Estimate take-home pay after common deductions such as withholding tax and required contributions.",
    bestFor: "Employees who want a better picture of net pay",
    youllNeed: "Salary amount, tax estimate, contribution values",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
  },
];

const savingsCalculators = [
  {
    title: "Emergency Fund Calculator",
    description:
      "Estimate how much you may want to set aside for emergencies based on your monthly expenses and target number of months.",
    bestFor:
      "Individuals or households building a financial safety fund",
    youllNeed: "Monthly expenses, target number of months",
    href: "/calculators/savings/emergency-fund-calculator-philippines",
    comingSoon: true,
  },
  {
    title: "Time Deposit Calculator",
    description:
      "Estimate possible returns on a time deposit based on your deposit amount, interest rate, and term.",
    bestFor: "Savers comparing fixed-term savings options",
    youllNeed: "Deposit amount, interest rate, deposit term",
    href: "/calculators/savings/time-deposit-calculator-philippines",
    comingSoon: true,
  },
  {
    title: "Savings Goal Calculator",
    description:
      "Estimate how much you may need to save regularly to reach a target amount by your chosen timeline.",
    bestFor:
      "People saving for tuition, travel, gadgets, emergencies, or other planned expenses",
    youllNeed:
      "Goal amount, target date or timeline, current savings, regular contribution amount",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    comingSoon: true,
  },
];

const popularCalculators = [
  {
    title: "Withholding Tax Calculator",
    description: "Estimate salary tax deductions more clearly.",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
  },
  {
    title: "Take-Home Pay Calculator",
    description:
      "See a practical estimate of net pay after common deductions.",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
  },
  {
    title: "Car Loan Calculator",
    description:
      "Estimate monthly payments before applying for a vehicle loan.",
    href: "/calculators/loans/car-loan-calculator-philippines",
  },
  {
    title: "Savings Goal Calculator",
    description:
      "Plan how much you may need to save regularly to reach your target.",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    comingSoon: true,
  },
];

const relatedPages = [
  {
    title: "Salary and tax guides",
    description:
      "Understand common salary deductions, tax terms, and take-home pay concepts.",
    href: "/guides",
    cta: "Read guides",
    icon: BookOpen,
  },
  {
    title: "Contribution tables and references",
    description:
      "Review useful reference pages related to common contribution calculations.",
    href: "/government",
    cta: "View references",
    icon: ScrollText,
  },
  {
    title: "Loan and savings explainers",
    description:
      "Learn how rates, terms, and payment estimates work before comparing options.",
    href: "/guides",
    cta: "Explore guides",
    icon: TrendingUp,
  },
];

const trustPoints = [
  {
    icon: LayoutList,
    title: "Clear use cases",
    description:
      "Calculators are grouped by real-life financial needs, not just by internal category names.",
  },
  {
    icon: Lightbulb,
    title: "Less guesswork",
    description:
      "Each calculator tells you what it estimates before you click.",
  },
  {
    icon: ClipboardCheck,
    title: "More useful expectations",
    description:
      "Input guidance helps users understand what details they may need to prepare.",
  },
  {
    icon: ArrowDownRight,
    title: "Better next steps",
    description:
      "Related guides and reference pages make it easier to understand the numbers behind the estimate.",
  },
];

const faqs = [
  {
    question: "What can I calculate here?",
    answer:
      "You can use these tools to estimate loan payments, salary deductions, contribution amounts, savings targets, and other common financial scenarios in the Philippines.",
  },
  {
    question: "Are these results final or official?",
    answer:
      "No. Calculator results are estimates based on the inputs and assumptions shown. Final figures may vary depending on provider terms, official tables, fees, and policy updates.",
  },
  {
    question: "How do I know which calculator to use?",
    answer:
      "Start with your goal. Each calculator card explains what it estimates, who it is for, and the information you'll usually need.",
  },
  {
    question: "Why might my result differ from actual figures?",
    answer:
      "Actual figures may change based on product terms, updated official tables, provider-specific fees, or differences in the assumptions used.",
  },
  {
    question: "Where should I verify the numbers?",
    answer:
      "You should confirm final figures with the relevant bank, financial provider, employer, or government agency, depending on the calculation.",
  },
];

interface CalculatorCardProps {
  title: string;
  description: string;
  bestFor: string;
  youllNeed: string;
  href: string;
  comingSoon?: boolean;
}

function CalculatorCard({
  title,
  description,
  bestFor,
  youllNeed,
  href,
  comingSoon,
}: CalculatorCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          {comingSoon && (
            <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              Coming soon
            </span>
          )}
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
        <dl className="mt-3 space-y-1 text-xs text-muted-foreground">
          <div>
            <dt className="inline font-medium text-foreground/80">
              Best for:{" "}
            </dt>
            <dd className="inline">{bestFor}</dd>
          </div>
          <div>
            <dt className="inline font-medium text-foreground/80">
              You&apos;ll usually need:{" "}
            </dt>
            <dd className="inline">{youllNeed}</dd>
          </div>
        </dl>
        <div className="mt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
          >
            Use calculator
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </CardHeader>
    </Card>
  );
}

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <PageHero
        title="Financial calculators for common money decisions in the Philippines"
        description="Use these calculators to estimate payments, deductions, and savings scenarios based on common Philippine financial needs. Whether you are checking a loan, reviewing salary deductions, or planning a savings goal, start with the calculator that best matches your situation."
        breadcrumbs={breadcrumbs}
      />

      {/* CTA Buttons */}
      <div className="-mt-4 mb-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="#needs"
          className={buttonVariants({
            className: "font-medium",
          })}
        >
          Browse by need
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="#popular"
          className={buttonVariants({
            variant: "outline",
            className: "font-medium",
          })}
        >
          See popular calculators
        </Link>
      </div>

      {/* Important Note */}
      <DisclaimerBox text="Calculator results are estimates based on the inputs and assumptions shown. Actual figures may vary depending on provider terms, official tables, fees, and policy updates. Always confirm final numbers with the relevant bank, financial provider, employer, or government agency when needed." />

      {/* Start with Your Need */}
      <section id="needs" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Start with your need
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Not sure where to begin? Start with the situation that best matches
          what you want to calculate.
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          {needCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.href} href={card.href} className="group block">
                <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-3 text-base">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {card.description}
                    </CardDescription>
                    <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
                      {card.cta}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Borrowing Calculators */}
      <section id="borrowing" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Borrowing calculators
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Use these calculators to estimate monthly payments and understand how
          loan costs may change based on amount, interest rate, and repayment
          term.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {borrowingCalculators.map((calc) => (
            <CalculatorCard key={calc.href} {...calc} />
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Related pages: Loan guides, loan rate tables, borrowing explainers
        </p>
      </section>

      {/* Salary and Deduction Calculators */}
      <section id="salary" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Salary and deduction calculators
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Use these calculators to get a clearer estimate of common salary
          deductions and see how they may affect your take-home pay.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {salaryCalculators.map((calc) => (
            <CalculatorCard key={calc.href} {...calc} />
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Related pages: Salary guides, tax references, contribution tables
        </p>
      </section>

      {/* Saving and Planning Calculators */}
      <section id="savings" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Saving and planning calculators
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Use these calculators to estimate savings targets, compare fixed-term
          deposit scenarios, and plan practical financial goals.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {savingsCalculators.map((calc) => (
            <CalculatorCard key={calc.href} {...calc} />
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Related pages: Savings guides, savings rate tables, financial planning
          articles
        </p>
      </section>

      {/* Popular Calculators */}
      <section id="popular" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Popular calculators
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Start with the calculators many users check first.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularCalculators.map((calc) => (
            <Link key={calc.href} href={calc.href} className="group block">
              <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium group-hover:text-primary">
                      {calc.title}
                    </CardTitle>
                    {calc.comingSoon && (
                      <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                        Soon
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-xs leading-relaxed">
                    {calc.description}
                  </CardDescription>
                  <p className="mt-2 flex items-center gap-1 text-xs font-medium text-primary">
                    Use calculator
                    <ArrowRight className="size-3" />
                  </p>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Related Guides and Reference Pages */}
      <section className="pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related guides and reference pages
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Need more context before using a calculator? These pages can help
          explain the terms, assumptions, and official references behind the
          estimates.
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          {relatedPages.map((page) => {
            const Icon = page.icon;
            return (
              <Link key={page.title} href={page.href} className="group block">
                <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-3 text-sm">
                      {page.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {page.description}
                    </CardDescription>
                    <p className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
                      {page.cta}
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </p>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why Use This Calculators Page */}
      <section className="pt-16">
        <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Why use this calculators page
        </h2>
        <p className="mb-8 text-sm text-muted-foreground">
          This page is designed to help you choose the right calculator faster.
          Instead of making you open several tools just to figure out which one
          applies to your situation, each calculator includes a short explanation
          of what it estimates, who it is for, and the information you will
          usually need.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => {
            const Icon = point.icon;
            return (
              <div key={point.title} className="space-y-2">
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-sm font-semibold">{point.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <FaqSection faqs={faqs} />

      {/* Final CTA */}
      <section className="mb-4 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Choose the right calculator for your situation
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Estimate payments, deductions, and savings goals using practical tools
          built around common financial needs in the Philippines.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#needs"
            className={buttonVariants({
              className: "font-medium",
            })}
          >
            Browse by need
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="#popular"
            className={buttonVariants({
              variant: "outline",
              className: "font-medium",
            })}
          >
            See popular calculators
          </Link>
        </div>
      </section>
    </div>
  );
}
