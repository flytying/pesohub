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
    "Savings Rates, Time Deposit Rates & Exchange Rates Philippines | PesoHub",
  description:
    "Compare savings interest rates, check time deposit options, and track USD to PHP exchange rates with practical Philippine rate pages and comparisons.",
  slug: "rates",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Rates" },
];

const rateTypeCards = [
  {
    icon: TrendingUp,
    title: "Exchange Rates",
    description:
      "Track exchange rate pages such as USD to PHP and other currency conversions. Useful if you want to monitor movement, estimate value, or compare recent rate changes.",
    href: "/rates/exchange-rates/usd-to-php-today",
    cta: "View Exchange Rates",
  },
  {
    icon: PiggyBank,
    title: "Savings Rates",
    description:
      "Compare savings account interest rate categories and explore options for keeping funds accessible while earning interest.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    cta: "View Savings Rates",
  },
  {
    icon: Clock,
    title: "Time Deposit Rates",
    description:
      "Review fixed-term deposit rate categories if you want to compare returns for money you can set aside for a locked period.",
    href: "/rates/savings-rates/time-deposit-rates-philippines",
    cta: "View Time Deposit Rates",
  },
  {
    icon: Smartphone,
    title: "Digital Bank Rates",
    description:
      "Explore rates commonly associated with digital banks and app-based savings options. Useful if you want to compare newer savings products against more traditional options.",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    cta: "View Digital Bank Rates",
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
          <div className="mx-auto max-w-3xl">
            <p className="text-[16px] leading-[22px] text-gray-400">
              Interest rates on Philippine savings accounts vary dramatically — the gap between the lowest and highest rates can be more than 10x. A traditional bank might offer 0.25% per year while a digital bank offers 3% or more on the same deposit. For savers, this difference compounds over time and directly affects how fast your money grows.
            </p>
            <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
              The rate pages below gather current rates from Philippine banks and the BSP so you can compare options side by side. Whether you are choosing where to park an emergency fund, comparing time deposit terms, or tracking the peso-dollar exchange rate, these pages help you find the numbers without visiting each bank individually.
            </p>
          </div>
        </div>
      </section>

      {/* Choose a Rate Type */}
      <section id="choose" className="scroll-mt-20 py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-[32px] font-medium leading-[48px] text-gray-500">
            Choose a Rate Type
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {rateTypeCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                >
                  <h4 className="text-[20px] font-semibold leading-[26px] text-brand">
                    {card.title}
                  </h4>
                  <div className="mt-2 flex items-start justify-between gap-4">
                    <p className="flex-1 text-[16px] leading-[22px] text-gray-400">
                      {card.description}
                    </p>
                    <Icon
                      className="size-16 shrink-0 text-gray-400"
                      strokeWidth={1.25}
                    />
                  </div>
                  <div className="mt-auto pt-5">
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
