import Link from "next/link";
import Image from "next/image";
import {
  Calculator,
  TrendingUp,
  BookOpen,
  Landmark,
  ArrowRight,
  ChevronRight,
  Target,
  Wallet,
  PiggyBank,
  ScrollText,
  Globe,
  FileText,
  RefreshCw,
  Info,
} from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { CategoryCard } from "@/components/shared/category-card";
import { FaqSection } from "@/components/shared/faq-section";
import { DisclaimerBox } from "@/components/shared/disclaimer-box";
import { UpdateBadge } from "@/components/shared/update-badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
} from "@/lib/schema-markup";

// Recently updated dates
import { USD_PHP_UPDATED_AT } from "@/data/rates/exchange-rates";
import { SAVINGS_RATES_UPDATED_AT } from "@/data/rates/savings-rates";
import { SSS_CONTRIBUTION_UPDATED_AT } from "@/data/government/sss-contribution";
import { WITHHOLDING_TAX_TABLE_UPDATED_AT } from "@/data/government/withholding-tax-table";
import { PAGIBIG_HOUSING_LOAN_UPDATED_AT } from "@/data/government/pag-ibig-housing-loan";

export const metadata = generatePageMetadata({
  title:
    "Financial Calculators, Savings Rates & Money Guides Philippines | PesoHub",
  description:
    "Compare loan payments, estimate take-home pay, check withholding tax, review savings rates, and browse Philippine finance guides and government reference tables on PesoHub.",
  slug: "",
});

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const goalCards = [
  {
    title: "Estimate a loan",
    description:
      "Check possible payments, compare borrowing scenarios, and understand the numbers before applying.",
    href: "/calculators",
    icon: Wallet,
  },
  {
    title: "Understand my salary deductions",
    description:
      "See how common deductions and take-home pay estimates work in a Philippine context.",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Target,
  },
  {
    title: "Compare savings rates",
    description:
      "Browse rate tables and compare options more easily before deciding where to save.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: PiggyBank,
  },
  {
    title: "Official reference tables",
    description:
      "Find commonly used government-related tables and reference pages in one place.",
    href: "/government",
    icon: ScrollText,
  },
];

const popularPages = [
  {
    title: "Loan Calculators",
    description:
      "Estimate monthly payments for car, home, and personal loans.",
    href: "/calculators",
    category: "Calculators",
  },
  {
    title: "Salary and Deduction Tools",
    description:
      "Estimate withholding tax, SSS contributions, and take-home pay.",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    category: "Calculators",
  },
  {
    title: "Savings Rate Tables",
    description:
      "Compare interest rates from top Philippine banks for savings and time deposits.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    category: "Rates",
  },
  {
    title: "Government Reference Pages",
    description:
      "SSS, BIR, Pag-IBIG, and BSP tables and guides in one place.",
    href: "/government",
    category: "Government",
  },
];

const recentlyUpdated = [
  {
    title: "USD to PHP Exchange Rate",
    href: "/rates/exchange-rates/usd-to-php-today",
    updatedAt: USD_PHP_UPDATED_AT,
  },
  {
    title: "Best Savings Interest Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    updatedAt: SAVINGS_RATES_UPDATED_AT,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    updatedAt: SSS_CONTRIBUTION_UPDATED_AT,
  },
  {
    title: "Withholding Tax Table",
    href: "/government/bir/withholding-tax-table-philippines",
    updatedAt: WITHHOLDING_TAX_TABLE_UPDATED_AT,
  },
  {
    title: "Pag-IBIG Housing Loan Guide",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    updatedAt: PAGIBIG_HOUSING_LOAN_UPDATED_AT,
  },
];

const trustPoints = [
  {
    icon: Globe,
    title: "Philippine financial focus",
    description:
      "The site is organized around common money questions and decisions relevant to users in the Philippines.",
  },
  {
    icon: FileText,
    title: "Simple explanations",
    description:
      "Complex terms and tables are presented in a simpler, easier-to-follow format.",
  },
  {
    icon: RefreshCw,
    title: "Up-to-date and reliable data",
    description:
      "Tools and tables are regularly updated to reflect current rates, policies, and commonly used financial references in the Philippines.",
  },
];

const homeFaqs = [
  {
    question: "What is PesoHub?",
    answer:
      "PesoHub is a collection of money tools, guides, rate tables, and reference pages designed to help Filipinos understand everyday financial topics more easily.",
  },
  {
    question: "Who is PesoHub for?",
    answer:
      "PesoHub is for anyone in the Philippines looking for simpler ways to explore financial information, estimate figures, and compare common options.",
  },
  {
    question: "Are the tools and tables official?",
    answer:
      "PesoHub provides educational tools and reference content. Final figures, rates, and official details should always be verified with the relevant bank, provider, or government agency.",
  },
  {
    question: "How accurate are the calculations?",
    answer:
      "PesoHub tools are built to provide helpful estimates based on the assumptions shown on each page. Actual figures may vary depending on provider terms, official updates, fees, eligibility rules, or your specific situation.",
  },
  {
    question: "Is PesoHub affiliated with any government agency?",
    answer:
      "No. PesoHub is an independent site and is not affiliated with any government agency, bank, or financial institution. Always confirm official details with the relevant source.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <JsonLd data={generateWebsiteSchema()} />
      <JsonLd data={generateOrganizationSchema()} />

      {/* Hero */}
      <section className="bg-brand text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
          {/* Left column — text */}
          <div>
            <h1 className="text-[48px] font-medium leading-[48px] tracking-tight">
              Practical tools
              <br />
              for smarter
              <br />
              money decisions
            </h1>
            <p className="mt-6 max-w-md text-[20px] leading-[26px] text-surface-secondary">
              Estimate loan payments, understand salary deductions, compare
              savings rates, and check key Philippine reference tables in one
              place.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex items-center gap-5">
              <Link
                href="/calculators"
                className="inline-flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-semibold uppercase leading-none tracking-wide text-gray-500 transition-all hover:shadow-lg"
              >
                Calculators
                <span className="flex size-7 items-center justify-center rounded-full bg-accent-cyan">
                  <ChevronRight className="size-4 text-white" />
                </span>
              </Link>
              <Link
                href="/rates"
                className="inline-flex items-center gap-1 text-sm font-semibold text-accent-cyan transition-colors hover:text-white"
              >
                View Rates
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Right column — hero illustration */}
          <div className="hidden lg:flex lg:justify-end">
            <div className="relative overflow-hidden rounded-2xl bg-white/10 p-2">
              <Image
                src="/hero.png"
                alt="Filipino financial empowerment"
                width={520}
                height={400}
                className="rounded-xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Start Here */}
      <section className="bg-surface-secondary py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            {/* Left — heading + description */}
            <div>
              <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
                Start here
              </h2>
              <p className="mt-4 text-[20px] leading-[26px] text-gray-400">
                Choose the path that best matches what you want to do. Each
                option helps you quickly find the right tools, calculators, or
                reference information based on your goal.
              </p>
            </div>

            {/* Right — 2×2 card grid */}
            <div className="grid gap-5 sm:grid-cols-2">
              {goalCards.map((goal) => {
                const Icon = goal.icon;
                return (
                  <Link key={goal.title} href={goal.href} className="group block">
                    <Card className="h-full ring-0 bg-white p-6 shadow-none transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                      <CardHeader className="p-0">
                        <div className="flex size-16 items-center justify-center rounded-full bg-accent-cyan text-white">
                          <Icon className="size-7" />
                        </div>
                        <CardTitle className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
                          {goal.title}
                        </CardTitle>
                        <CardDescription className="text-[16px] leading-[22px] text-gray-400">
                          {goal.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-16 text-center lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-brand">
            Browse by category
          </p>
          <h2 className="mt-4 text-[24px] font-semibold leading-[30px] text-gray-500">
            Explore tools, rate tables, guides, and reference pages by topic.
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard
              title="Calculators"
              description="Estimate payments, deductions, and contributions using Philippine-specific assumptions."
              href="/calculators"
              icon={Calculator}
              count={7}
            />
            <CategoryCard
              title="Rates"
              description="Compare exchange rates, savings rates, and other financial benchmarks."
              href="/rates"
              icon={TrendingUp}
              count={2}
            />
            <CategoryCard
              title="Guides"
              description="Understand common money topics in plain language."
              href="/guides"
              icon={BookOpen}
              count={2}
            />
            <CategoryCard
              title="Government"
              description="Quick-reference tables and explainers for BIR, SSS, Pag-IBIG, and more."
              href="/government"
              icon={Landmark}
              count={5}
            />
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="bg-surface-tertiary py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-brand">
              Popular tools
            </p>
            <h2 className="mt-4 text-[24px] font-semibold leading-[30px] text-gray-500">
              The most-used tools and reference pages for everyday money
              decisions.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popularPages.map((page) => (
              <Link key={page.title} href={page.href} className="group block">
                <div className="flex h-full flex-col rounded-xl bg-white p-6 transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                  <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                    {page.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[16px] leading-[22px] text-gray-400">
                    {page.description}
                  </p>
                  <div className="mt-4 flex size-10 items-center justify-center rounded-full bg-accent-cyan text-white transition-transform group-hover:translate-x-1">
                    <ArrowRight className="size-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Updated */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            {/* Left — heading + description + disclaimer */}
            <div>
              <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
                Recently updated
              </h2>
              <p className="mt-4 text-[20px] leading-[26px] text-gray-400">
                We review and update key pages regularly so information stays
                easier to check and navigate.
              </p>
              <div className="mt-6 flex items-start gap-2 text-[14px] leading-[22px] text-gray-300">
                <Info className="mt-0.5 size-5 flex-shrink-0 text-accent-orange" />
                <span>
                  Free tools and guides for educational use. Not affiliated
                  with banks or government agencies.
                </span>
              </div>
            </div>

            {/* Right — card grid */}
            <div className="grid gap-5 sm:grid-cols-2">
              {recentlyUpdated.map((item) => (
                <Link key={item.href} href={item.href} className="group block">
                  <div className="h-full rounded-xl border border-gray-100 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                    <h3 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                      {item.title}
                    </h3>
                    <div className="mt-3">
                      <UpdateBadge date={item.updatedAt} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      {/* Why Use PesoHub */}
      <section className="bg-surface-tertiary py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-center text-[24px] font-semibold leading-[30px] text-gray-500">
            Why Use PesoHub?
          </h3>
          <div className="mt-10 grid divide-x divide-gray-200 sm:grid-cols-3">
            {trustPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.title} className="flex flex-col items-center px-8 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-7" />
                  </div>
                  <h4 className="mt-5 text-[20px] font-semibold leading-[26px] text-gray-500">
                    {point.title}
                  </h4>
                  <p className="mt-2 text-[16px] leading-[22px] text-gray-400">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer + FAQ */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        {/* Important Note / Disclaimer */}
        <DisclaimerBox text="Figures, rates, and reference details may change over time and may vary by provider, product, or official source. Always confirm final details directly with the relevant institution or agency." />

        {/* FAQ */}
        <div className="pt-12">
          <FaqSection faqs={homeFaqs} />
        </div>
      </div>
    </>
  );
}
