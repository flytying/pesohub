import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ScrollText,
  TrendingUp,
  BarChart3,
  FileText,
  DollarSign,
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
    "Financial Calculators Philippines: Loan, Salary, Tax & Savings | PesoHub",
  description:
    "Use free Philippine financial calculators for car loans, home loans, withholding tax, SSS contributions, take-home pay, and savings planning.",
  slug: "calculators",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators" },
];

interface CalculatorData {
  title: string;
  description: string;
  href: string;
  comingSoon?: boolean;
}

const borrowingCalculators: CalculatorData[] = [
  {
    title: "Car Loan Calculator",
    description:
      "Estimate monthly payment, total interest, and total borrowing cost for a car loan based on vehicle price, down payment, loan term, and interest rate.",
    href: "/calculators/loans/car-loan-calculator-philippines",
  },
  {
    title: "Home Loan Calculator",
    description:
      "Estimate monthly home loan payments, total interest, and total loan cost based on property price, down payment, repayment term, and interest rate.",
    href: "/calculators/loans/home-loan-calculator-philippines",
  },
  {
    title: "Personal Loan Calculator",
    description:
      "Estimate monthly personal loan payments, total interest, and total repayment based on loan amount, repayment term, and annual interest rate.",
    href: "/calculators/loans/personal-loan-calculator-philippines",
  },
];

const salaryCalculators: CalculatorData[] = [
  {
    title: "Withholding Tax Calculator",
    description:
      "Estimate withholding tax based on salary and pay frequency using the current tax framework in the Philippines.",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
  },
  {
    title: "SSS Contribution Calculator",
    description:
      "Estimate SSS contributions based on salary or monthly compensation and see how contribution levels change across income ranges.",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
  },
  {
    title: "Take-Home Pay Calculator",
    description:
      "Estimate net pay after common deductions so you can see what may actually reach your bank account or payslip.",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
  },
  {
    title: "13th Month Pay Calculator",
    description:
      "Estimate your 13th month pay based on monthly basic salary and months worked, with full-year and prorated scenarios.",
    href: "/calculators/salary/thirteenth-month-pay-calculator-philippines",
  },
];

const savingsCalculators: CalculatorData[] = [
  {
    title: "Emergency Fund Calculator",
    description:
      "Estimate a target emergency fund amount based on your monthly expenses and preferred safety buffer.",
    href: "/calculators/savings/emergency-fund-calculator-philippines",
    comingSoon: true,
  },
  {
    title: "Time Deposit Calculator",
    description:
      "Estimate returns from a time deposit based on amount, term, and interest rate assumptions.",
    href: "/calculators/savings/time-deposit-calculator-philippines",
  },
  {
    title: "Savings Goal Calculator",
    description:
      "Estimate how much you may need to save regularly to reach a target amount within a chosen time frame.",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    comingSoon: true,
  },
];

const relatedPages = [
  {
    title: "Guides Hub",
    href: "/guides",
    icon: BookOpen,
  },
  {
    title: "Rates Hub",
    href: "/rates",
    icon: TrendingUp,
  },
  {
    title: "Withholding Tax Table",
    href: "/government/bir/withholding-tax-table-philippines",
    icon: ScrollText,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: FileText,
  },
  {
    title: "Pag-IBIG Housing Loan Guide",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    icon: BarChart3,
  },
  {
    title: "Best Savings Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: DollarSign,
  },
];

const faqs = [
  {
    question: "What can I calculate on this page?",
    answer:
      "This page helps you find calculators for common financial decisions in the Philippines, including loan payments, tax withholding, SSS contributions, take-home pay, and upcoming savings planning tools.",
  },
  {
    question: "How do I know which calculator to use?",
    answer:
      "Start with the question you are trying to answer. If you are planning a loan, use the borrowing section. If you are checking payroll deductions or net pay, use the salary and deductions section. If you are planning savings, use the saving and planning section.",
  },
  {
    question: "Are the calculator results official or final?",
    answer:
      "These calculators are designed for estimation and planning. Actual lender quotes, payroll results, or official contribution figures may vary depending on the final terms, rules, and provider data.",
  },
  {
    question: "Why might the actual result be different from the estimate?",
    answer:
      "Actual results may differ because of fees, lender policies, payroll settings, updated contribution tables, tax rules, or other details not captured in a simplified calculator input.",
  },
  {
    question:
      "Where should I verify the numbers after using a calculator?",
    answer:
      "After getting an estimate, check the related guide, rate table, or official reference page linked from the calculator or category section. PesoHub is best used as a planning tool before you verify final details.",
  },
  {
    question: "Are more calculators coming soon?",
    answer:
      "Yes. PesoHub's calculators hub is designed to expand over time, especially in areas like savings, planning, and comparison tools.",
  },
];

function CalculatorCard({
  title,
  description,
  href,
  comingSoon,
}: CalculatorData) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          {comingSoon && (
            <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              Coming Soon
            </span>
          )}
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
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
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <PageHero
        title="Financial Calculators Philippines"
        description="Explore financial calculators for common money decisions in the Philippines. Use PesoHub's calculator hub to estimate loan payments, understand salary deductions, plan savings goals, and find the right tool based on what you are trying to figure out."
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Borrowing Money */}
      <section id="borrowing" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Borrowing Money
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Use these calculators if you want to estimate monthly payments,
          compare repayment scenarios, and check affordability before applying
          for a loan.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {borrowingCalculators.map((calc) => (
            <CalculatorCard key={calc.href} {...calc} />
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Related:{" "}
          <Link
            href="/guides"
            className="text-primary hover:underline"
          >
            Guides Hub
          </Link>
          {" · "}
          <Link
            href="/government/pag-ibig/pag-ibig-housing-loan-guide"
            className="text-primary hover:underline"
          >
            Pag-IBIG Housing Loan Guide
          </Link>
          {" · "}
          <Link
            href="/rates/savings-rates/best-savings-interest-rates-philippines"
            className="text-primary hover:underline"
          >
            Rate Tables
          </Link>
          {" · "}
          <Link
            href="/rates"
            className="text-primary hover:underline"
          >
            Rates Hub
          </Link>
        </p>
      </section>

      {/* Salary and Deductions */}
      <section id="salary" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Salary and Deductions
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Use these calculators if you want to estimate payroll deductions,
          understand contribution amounts, and get a clearer picture of what
          affects take-home pay.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {salaryCalculators.map((calc) => (
            <CalculatorCard key={calc.href} {...calc} />
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Related:{" "}
          <Link
            href="/calculators/tax/withholding-tax-calculator-philippines"
            className="text-primary hover:underline"
          >
            Withholding Tax Calculator
          </Link>
          {" · "}
          <Link
            href="/government/sss/sss-contribution-guide"
            className="text-primary hover:underline"
          >
            SSS Contribution Table
          </Link>
          {" · "}
          <Link
            href="/guides"
            className="text-primary hover:underline"
          >
            Guides Hub
          </Link>
        </p>
      </section>

      {/* Saving and Planning */}
      <section id="savings" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Saving and Planning
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Use these tools if you want to plan savings targets, compare
          fixed-return options, and estimate how long it may take to reach a
          financial goal.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {savingsCalculators.map((calc) => (
            <CalculatorCard key={calc.href} {...calc} />
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Related:{" "}
          <Link
            href="/rates/savings-rates/best-savings-interest-rates-philippines"
            className="text-primary hover:underline"
          >
            Best Savings Rates
          </Link>
          {" · "}
          <Link
            href="/rates/exchange-rates/usd-to-php-today"
            className="text-primary hover:underline"
          >
            USD to PHP Exchange Rate
          </Link>
          {" · "}
          <Link
            href="/guides"
            className="text-primary hover:underline"
          >
            Guides Hub
          </Link>
        </p>
      </section>

      {/* Important Note */}
      <div className="pt-16">
        <DisclaimerBox text="Calculator results are estimates based on the inputs and assumptions shown. Actual figures may vary depending on provider terms, official tables, fees, and policy updates. Always confirm final numbers with the relevant bank, financial provider, employer, or government agency when needed." />
      </div>

      {/* FAQ */}
      <FaqSection faqs={faqs} />

      {/* Related Guides and Reference Pages */}
      <section className="pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related Guides and Reference Pages
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          After using a calculator, you may want to read the matching guide or
          check the reference table behind the estimate.
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
      <section className="mb-4 mt-16 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-12">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Find the right calculator for your situation
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Estimate payments, deductions, and savings goals using practical
          tools built around common financial needs in the Philippines.
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
            href="#salary"
            className={buttonVariants({
              variant: "outline",
              className: "font-medium",
            })}
          >
            Salary & deductions
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
