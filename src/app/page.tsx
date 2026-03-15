import Link from "next/link";
import { Calculator, TrendingUp, BookOpen, Landmark, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/lib/button-variants";
import { ToolCard } from "@/components/shared/tool-card";
import { CategoryCard } from "@/components/shared/category-card";
import { FaqSection } from "@/components/shared/faq-section";
// import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
} from "@/lib/schema-markup";
import { SITE_DESCRIPTION } from "@/config/site";

export const metadata = generatePageMetadata({
  title: "PesoHub — Practical Money Tools for Filipinos",
  description:
    "Free financial calculators, exchange rates, and guides for Filipinos. Compute car loans, withholding tax, SSS contributions, and more.",
  slug: "",
});

const featuredTools = [
  {
    title: "Car Loan Calculator",
    description:
      "Estimate monthly payments for your car loan with Philippine bank rates.",
    href: "/calculators/loans/car-loan-calculator-philippines",
    category: "Calculator",
  },
  {
    title: "Withholding Tax Calculator",
    description:
      "Compute your monthly withholding tax based on the latest BIR tax table.",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    category: "Calculator",
  },
  {
    title: "USD to PHP Exchange Rate",
    description:
      "Track the latest US Dollar to Philippine Peso exchange rate and trends.",
    href: "/rates/exchange-rates/usd-to-php-today",
    category: "Rates",
  },
];

const allTools = [
  {
    title: "Car Loan Calculator",
    description:
      "Estimate monthly amortization and total interest for auto loans in the Philippines.",
    href: "/calculators/loans/car-loan-calculator-philippines",
    category: "Calculator",
  },
  {
    title: "Home Loan Calculator",
    description:
      "Calculate monthly payments for Philippine housing loans from Pag-IBIG and banks.",
    href: "/calculators/loans/home-loan-calculator-philippines",
    category: "Calculator",
  },
  {
    title: "Personal Loan Calculator",
    description:
      "Compare monthly payments and total cost across personal loan offers.",
    href: "/calculators/loans/personal-loan-calculator-philippines",
    category: "Calculator",
  },
  {
    title: "Withholding Tax Calculator",
    description:
      "Compute your monthly withholding tax under the TRAIN Law tax table.",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    category: "Calculator",
  },
  {
    title: "SSS Contribution Calculator",
    description:
      "Estimate your SSS monthly contribution based on salary bracket.",
    href: "/calculators/retirement/sss-pension-calculator",
    category: "Calculator",
  },
  {
    title: "USD to PHP Exchange Rate",
    description:
      "View the latest US Dollar to Philippine Peso conversion rate and history.",
    href: "/rates/exchange-rates/usd-to-php-today",
    category: "Rates",
  },
  {
    title: "Savings Account Rates",
    description:
      "Compare interest rates from top Philippine banks for savings and time deposits.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    category: "Rates",
  },
];

const homeFaqs = [
  {
    question: "What is PesoHub?",
    answer:
      "PesoHub is a free personal finance toolkit built for Filipinos. It provides calculators, rate trackers, and guides that help you make informed decisions about loans, taxes, savings, and more.",
  },
  {
    question: "Who is PesoHub for?",
    answer:
      "PesoHub is for any Filipino who wants to plan their finances better — whether you are computing a car loan, checking the latest USD to PHP rate, estimating your withholding tax, or exploring SSS contribution schedules.",
  },
  {
    question: "Is PesoHub free to use?",
    answer:
      "Yes, all tools, calculators, and guides on PesoHub are completely free. There are no subscriptions, no sign-ups, and no hidden charges.",
  },
  {
    question: "How accurate are the calculations?",
    answer:
      "Our calculators use the latest publicly available formulas and tax tables (such as the TRAIN Law tax table and current SSS contribution schedule). Results are estimates and should not be considered official financial advice.",
  },
  {
    question: "Is PesoHub affiliated with any government agency?",
    answer:
      "No. PesoHub is an independent project. It is not affiliated with the BIR, SSS, Pag-IBIG, or any Philippine government agency. Always verify results with the relevant official body.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <JsonLd data={generateWebsiteSchema()} />
      <JsonLd data={generateOrganizationSchema()} />

      {/* Hero */}
      <section className="gradient-hero py-20 text-white sm:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl lg:leading-tight">
            Practical Money Tools for Filipinos
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {SITE_DESCRIPTION}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/calculators"
              className={buttonVariants({
                size: "lg",
                className:
                  "bg-navy-400 text-white hover:bg-navy-500 border-transparent font-medium",
              })}
            >
              Browse Calculators
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/rates"
              className={buttonVariants({
                size: "lg",
                className:
                  "bg-navy-700 text-white hover:bg-navy-600 border-transparent font-medium",
              })}
            >
              View Rates
            </Link>
          </div>
        </div>
      </section>

      {/* <AdPlaceholder slot="home-top" /> */}

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Featured Tools */}
        <section>
          <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Featured Tools
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </section>

        {/* Browse by Category */}
        <section className="pt-16">
          <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
            Browse by Category
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <CategoryCard
              title="Calculators"
              description="Loan, tax, and retirement calculators built for Philippine scenarios."
              href="/calculators"
              icon={Calculator}
              count={5}
            />
            <CategoryCard
              title="Rates"
              description="Up-to-date exchange rates and savings interest rate comparisons."
              href="/rates"
              icon={TrendingUp}
              count={2}
            />
            <CategoryCard
              title="Guides"
              description="Plain-language guides on Philippine tax, SSS, and personal finance."
              href="/guides"
              icon={BookOpen}
              count={2}
            />
            <CategoryCard
              title="Government"
              description="Official Philippine government tables and reference guides explained clearly."
              href="/government"
              icon={Landmark}
              count={5}
            />
          </div>
        </section>

        {/* <AdPlaceholder slot="home-mid" /> */}

        {/* Popular Tools */}
        <section className="pt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
              Popular Tools
            </h2>
            <Link
              href="/calculators"
              className="flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              View all
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {allTools.map((tool) => (
              <ToolCard key={tool.href} {...tool} />
            ))}
          </div>
        </section>

        {/* <AdPlaceholder slot="home-bottom" /> */}

        {/* FAQ */}
        <div className="pt-16">
          <FaqSection faqs={homeFaqs} />
        </div>
      </div>
    </>
  );
}
