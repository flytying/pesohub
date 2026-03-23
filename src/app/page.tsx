import Link from "next/link";
import {
  Calculator,
  TrendingUp,
  BookOpen,
  Landmark,
  ArrowRight,
  Target,
  Wallet,
  PiggyBank,
  ScrollText,
  Globe,
  FileText,
  RefreshCw,
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
    title: "I want to estimate a loan",
    description:
      "Check possible payments, compare borrowing scenarios, and understand the numbers before applying.",
    href: "/calculators",
    icon: Wallet,
  },
  {
    title: "I want to understand my salary deductions",
    description:
      "See how common deductions and take-home pay estimates work in a Philippine context.",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Target,
  },
  {
    title: "I want to compare savings rates",
    description:
      "Browse rate tables and compare options more easily before deciding where to save.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: PiggyBank,
  },
  {
    title: "I want official reference tables",
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
      <section className="gradient-hero py-24 text-white sm:py-32 lg:py-40">
        <div className="hero-glow" />
        <div className="hero-grid" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          {/* Badge pill */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-peso-blue backdrop-blur-sm">
            <span className="inline-block size-1.5 rounded-full bg-peso-blue animate-pulse" />
            Free tools for Filipinos
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.1]">
            Practical tools for{" "}
            <span className="text-peso-blue">smarter money</span>{" "}
            decisions
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            Estimate loan payments, understand salary deductions, compare
            savings rates, and check key Philippine reference tables in one
            place.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 rounded-full bg-peso-blue px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-lg hover:shadow-peso-blue/25"
            >
              Browse Calculators
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/rates"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/25"
            >
              View Rates
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Start Here (formerly "Start with Your Goal") */}
        <section>
          <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Start here
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Choose the path that matches what you want to do.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {goalCards.map((goal) => {
              const Icon = goal.icon;
              return (
                <Link key={goal.title} href={goal.href} className="group block">
                  <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                    <CardHeader>
                      <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle className="mt-3 text-base">
                        {goal.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {goal.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Browse by Category */}
        <section className="pt-16">
          <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Browse by category
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Explore tools, rate tables, guides, and reference pages by topic.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        </section>

        {/* Popular Tools */}
        <section className="pt-16">
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
              Popular tools
            </h2>
            <p className="text-sm text-muted-foreground">
              The most-used tools and reference pages for everyday money
              decisions.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popularPages.map((page) => (
              <Link key={page.title} href={page.href} className="group block">
                <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">
                        {page.category}
                      </span>
                      <ArrowRight className="size-4 text-muted-foreground/50 transition-colors group-hover:text-foreground" />
                    </div>
                    <CardTitle className="mt-2 text-base">
                      {page.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {page.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Recently Updated */}
        <section className="pt-16">
          <div className="mb-6">
            <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
              Recently updated
            </h2>
            <p className="text-sm text-muted-foreground">
              We review and update key pages regularly so information stays
              easier to check and navigate.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentlyUpdated.map((item) => (
              <Link key={item.href} href={item.href} className="group block">
                <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium group-hover:text-primary">
                      {item.title}
                    </CardTitle>
                    <div className="mt-2">
                      <UpdateBadge date={item.updatedAt} />
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Trust line — surfaced earlier per recommendation #7 */}
        <section className="pt-16">
          <div className="rounded-lg border border-border bg-muted/30 px-6 py-4 text-center text-sm text-muted-foreground">
            Free tools and guides for educational use. Not affiliated with
            banks or government agencies.
          </div>
        </section>

        {/* Why Use PesoHub */}
        <section className="pt-12">
          <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Why use PesoHub
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Important Note / Disclaimer */}
        <div className="pt-16">
          <DisclaimerBox text="Figures, rates, and reference details may change over time and may vary by provider, product, or official source. Always confirm final details directly with the relevant institution or agency." />
        </div>

        {/* FAQ */}
        <div className="pt-8">
          <FaqSection faqs={homeFaqs} />
        </div>
      </div>
    </>
  );
}
