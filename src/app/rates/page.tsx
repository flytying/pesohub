import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  PiggyBank,
  Clock,
  Smartphone,
  Calculator,
  BookOpen,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";

export const metadata = generatePageMetadata({
  title:
    "Best Savings & Digital Bank Interest Rates Philippines | PesoHub",
  description:
    "Compare the best savings interest rates and digital bank rates in the Philippines. Plus time deposit rates and USD to PHP exchange rates, updated regularly.",
  slug: "rates",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Rates" },
];

const featuredCards = [
  {
    icon: PiggyBank,
    title: "Best Savings Interest Rates in the Philippines",
    description:
      "Compare savings account rates from Philippine banks and digital banks. See which accounts offer higher interest for your savings.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    cta: "View Savings Rates",
  },
  {
    icon: Smartphone,
    title: "Best Digital Bank Rates in the Philippines",
    description:
      "Compare digital bank interest rates in the Philippines, including app-based savings accounts, stashes, goals, and promo rates.",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    cta: "View Digital Bank Rates",
  },
];

const otherTrackers = [
  {
    icon: Clock,
    title: "Time Deposit Rates",
    description:
      "Compare fixed-term deposit returns and estimate maturity with the time deposit calculator.",
    href: "/rates/savings-rates/time-deposit-rates-philippines",
  },
  {
    icon: TrendingUp,
    title: "Exchange Rates",
    description:
      "Track the USD to PHP exchange rate sourced from the BSP, with recent history.",
    href: "/rates/exchange-rates/usd-to-php-today",
  },
];

const faqs = [
  {
    question: "What types of rates are included in this hub?",
    answer:
      "This hub is designed to organize common rate categories that matter to Filipino users, including exchange rates, savings rates, time deposit rates, and digital bank rates. Each category supports a different kind of comparison or financial decision.",
  },
  {
    question: "Are rates enough to choose a product right away?",
    answer:
      "Rates are a useful starting point, but they should not be the only factor in your decision. It is also important to check access to funds, requirements, promo terms, lock-in periods, and account features before choosing an option.",
  },
  {
    question:
      "What is the difference between savings rates and time deposit rates?",
    answer:
      "Savings rates usually apply to accounts that keep your funds more accessible, while time deposit rates are tied to money placed for a fixed term. Time deposits may offer stronger returns, but they usually involve less flexibility.",
  },
  {
    question:
      "What is the difference between digital bank rates and regular savings rates?",
    answer:
      "Digital bank rates usually refer to savings products offered by app-based or branch-light providers. They may differ from traditional bank products in accessibility, user experience, and promotional rate structure.",
  },
  {
    question:
      "Should I check exchange rates and savings rates on the same page?",
    answer:
      "These categories serve different needs. Exchange rates are for currency tracking and conversion, while savings and deposit rates are for comparing how your money may earn over time.",
  },
  {
    question: "How should I use this rates hub?",
    answer:
      "Use this hub as a starting point to choose the right rate category. Once you know whether you are comparing currency value, savings yield, time deposit return, or digital bank rates, you can move into the more specific page that matches your goal.",
  },
];

const relatedPages = [
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

export default function RatesPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <PageHero
        title="Rates in the Philippines"
        description="See how the peso is moving against the dollar, compare savings interest rates across banks, and find the best time deposit or digital bank rates — updated regularly so you can make informed decisions faster."
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      {/* Intro */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[16px] leading-[22px] text-gray-400">
            Interest rates on Philippine savings accounts vary dramatically — the gap between the lowest and highest rates can be more than 10x. A traditional bank might offer 0.25% per year while a digital bank offers 3% or more on the same deposit. For savers, this difference compounds over time and directly affects how fast your money grows.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            The rate pages below gather current rates from Philippine banks and the BSP so you can compare options side by side. Whether you are choosing where to park an emergency fund, comparing time deposit terms, or tracking the peso-dollar exchange rate, these pages help you find the numbers without visiting each bank individually.
          </p>
        </div>
      </section>

      {/* Featured rate guides */}
      <section id="featured" className="scroll-mt-20 bg-surface-secondary py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-[32px] font-medium leading-[48px] text-gray-500">
            Featured rate guides
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {featuredCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex h-full flex-col rounded-xl bg-white p-8 transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                >
                  <Icon
                    className="size-12 shrink-0 text-brand"
                    strokeWidth={1.25}
                  />
                  <h3 className="mt-4 text-[24px] font-semibold leading-[30px] text-brand">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[16px] leading-[22px] text-gray-400">
                    {card.description}
                  </p>
                  <div className="mt-auto pt-6">
                    <Link
                      href={card.href}
                      className="inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
                    >
                      {card.cta}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Other rate trackers */}
          <h2 className="mt-16 mb-8 text-[32px] font-medium leading-[48px] text-gray-500">
            Other rate trackers
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {otherTrackers.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group flex items-start gap-4 rounded-xl bg-white p-6 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[18px] font-semibold text-gray-500 group-hover:text-brand">
                        {card.title}
                      </span>
                      <ArrowRight className="size-4 text-gray-300 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <p className="mt-1 text-[16px] leading-[22px] text-gray-400">
                      {card.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer, FAQ, Related */}
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <FaqSection faqs={faqs} />

        {/* Related Pages */}
        <section className="mt-16">
          <h2 className="mb-8 text-[32px] font-medium leading-[48px] text-gray-500">
            Related Pages
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
