import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ScrollText,
  TrendingUp,
  BarChart3,
  FileText,
  DollarSign,
  Car,
  Home,
  Wallet,
  Calculator,
  Shield,
  HandCoins,
  Gift,
  Clock,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  comingSoon?: boolean;
}

const borrowingCalculators: CalculatorData[] = [
  {
    icon: Car,
    title: "Car Loan Calculator",
    description:
      "Estimate monthly payment, total interest, and total borrowing cost for a car loan based on vehicle price, down payment, loan term, and interest rate.",
    href: "/calculators/loans/car-loan-calculator-philippines",
  },
  {
    icon: Home,
    title: "Home Loan Calculator",
    description:
      "Estimate monthly home loan payments, total interest, and total loan cost based on property price, down payment, repayment term, and interest rate.",
    href: "/calculators/loans/home-loan-calculator-philippines",
  },
  {
    icon: Wallet,
    title: "Personal Loan Calculator",
    description:
      "Estimate monthly personal loan payments, total interest, and total repayment based on loan amount, repayment term, and annual interest rate.",
    href: "/calculators/loans/personal-loan-calculator-philippines",
  },
];

const salaryCalculators: CalculatorData[] = [
  {
    icon: Calculator,
    title: "Withholding Tax Calculator",
    description:
      "Estimate withholding tax based on salary and pay frequency using the current tax framework in the Philippines.",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
  },
  {
    icon: Shield,
    title: "SSS Contribution Calculator",
    description:
      "Estimate SSS contributions based on salary or monthly compensation and see how contribution levels change across income ranges.",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
  },
  {
    icon: HandCoins,
    title: "Take-Home Pay Calculator",
    description:
      "Estimate net pay after common deductions so you can see what may actually reach your bank account or payslip.",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
  },
  {
    icon: Gift,
    title: "13th Month Pay Calculator",
    description:
      "Estimate your 13th month pay based on monthly basic salary and months worked, with full-year and prorated scenarios.",
    href: "/calculators/salary/thirteenth-month-pay-calculator-philippines",
  },
];

const savingsCalculators: CalculatorData[] = [
  {
    icon: Shield,
    title: "Emergency Fund Calculator",
    description:
      "Estimate a target emergency fund amount based on your monthly expenses and preferred safety buffer.",
    href: "/calculators/savings/emergency-fund-calculator-philippines",
    comingSoon: true,
  },
  {
    icon: Clock,
    title: "Time Deposit Calculator",
    description:
      "Estimate returns from a time deposit based on amount, term, and interest rate assumptions.",
    href: "/calculators/savings/time-deposit-calculator-philippines",
  },
  {
    icon: Target,
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
  icon: Icon,
  title,
  description,
  href,
  comingSoon,
  hasBg = false,
}: CalculatorData & { hasBg?: boolean }) {
  return (
    <div className={`flex h-full flex-col rounded-xl bg-white p-6 transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] ${hasBg ? "" : "border border-gray-200"}`}>
      <h4 className="text-[20px] font-semibold leading-[26px] text-brand">
        {title}
      </h4>
      <div className="mt-2 flex items-start justify-between gap-4">
        <p className="flex-1 text-[16px] leading-[22px] text-gray-400">
          {description}
        </p>
        <Icon className="size-16 shrink-0 text-gray-400" strokeWidth={1.25} />
      </div>
      <div className="mt-auto pt-5">
        {comingSoon ? (
          <span className="inline-flex items-center rounded-full bg-pill-orange px-5 py-2.5 text-[14px] font-bold uppercase tracking-wide text-accent-orange">
            Coming soon
          </span>
        ) : (
          <Link
            href={href}
            className="inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
          >
            Use calculator
          </Link>
        )}
      </div>
    </div>
  );
}

export default function CalculatorsPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <PageHero
        title="Financial Calculators Philippines"
        description="Estimate car and home loan payments, see how much tax and SSS eat into your salary, or plan how fast your savings can grow — all with free calculators built for Philippine rates and rules."
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      {/* Borrowing Money */}
      <section id="borrowing" className="scroll-mt-20 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-[32px] font-medium leading-[48px] text-gray-500">
            Borrowing Money
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {borrowingCalculators.map((calc) => (
              <CalculatorCard key={calc.href} {...calc} />
            ))}
          </div>
        </div>
      </section>

      {/* Salary and Deductions */}
      <section id="salary" className="scroll-mt-20 bg-surface-tertiary py-20 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
                Salary and Deductions
              </h2>
              <p className="mt-4 text-[20px] leading-[26px] text-gray-400">
                Estimate withholding tax, SSS, PhilHealth, and Pag-IBIG deductions so you know exactly how much reaches your bank account each payday.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {salaryCalculators.map((calc) => (
                <CalculatorCard key={calc.href} {...calc} hasBg />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Saving and Planning */}
      <section id="savings" className="scroll-mt-20 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-[32px] font-medium leading-[48px] text-gray-500">
            Saving and Planning
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {savingsCalculators.map((calc) => (
              <CalculatorCard key={calc.href} {...calc} />
            ))}
          </div>
        </div>
      </section>

      {/* Important Note, FAQ, Related */}
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <FaqSection faqs={faqs} />

        {/* Related Guides and Reference Pages */}
        <section className="mt-16">
          <h2 className="mb-4 text-[32px] font-medium leading-[48px] text-gray-500">
            Related Guides and Reference Pages
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.title}
                  href={page.href}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-[16px] font-semibold text-gray-500 group-hover:text-brand">
                    {page.title}
                  </span>
                  <ArrowRight className="ml-auto size-4 text-gray-300 transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
