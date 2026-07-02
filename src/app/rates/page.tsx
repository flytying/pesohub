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
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
} from "@/lib/schema-markup";

export const metadata = generatePageMetadata({
  title:
    "Savings and Digital Bank Rates in the Philippines",
  description:
    "Compare savings account rates, digital bank interest rates, time deposit rates, and USD to PHP exchange rates in the Philippines — starting with the best savings accounts and best digital banks for 2026.",
  slug: "rates",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Rates" },
];

const featuredCards = [
  {
    icon: Smartphone,
    title: "Best High-Yield Savings Accounts 2026",
    description:
      "Compare high-yield savings accounts from Philippine digital banks: base and promo interest rates, balance caps, requirements, PDIC notes, and estimated earnings.",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    cta: "Compare high-yield savings accounts",
  },
  {
    icon: PiggyBank,
    title: "Savings Account Interest Rates: Full List",
    description:
      "A full list of savings account interest rates from Philippine digital and traditional banks, with promo conditions, minimum balances, and estimated earnings.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    cta: "See the full rate list",
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
    <div className="mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(20px,3vw,36px)]">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCollectionPageSchema({
          name: "Savings and Digital Bank Rates in the Philippines",
          description:
            "Compare savings account rates, digital bank interest rates, time deposit rates, and exchange rates in the Philippines.",
          url: "/rates",
        })}
      />

      {/* Heading */}
      <div className="mb-6">
        <div className="mb-[10px] text-[15px] font-bold uppercase tracking-[.06em] text-brand">
          Rates
        </div>
        <h1 className="font-display text-[clamp(28px,3.4vw,40px)] font-semibold tracking-[-.02em] text-[#0E1525]">
          Savings and Digital Bank Rates in the Philippines
        </h1>
        <p className="mt-[10px] max-w-[72ch] text-[17px] leading-[1.55] text-[#5A6478]">
          Compare savings account rates, digital bank interest rates, time
          deposit rates, and exchange rates in the Philippines. Start with the
          most searched guides: best savings accounts and best digital banks for
          2026.
        </p>
      </div>

      {/* Featured rate guides */}
      <h2 className="mb-[18px] font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
        Featured rate guides
      </h2>
      <div className="mb-[38px] grid gap-4 sm:grid-cols-2">
        {featuredCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col rounded-[18px] border border-[#E7EBF3] bg-white p-7 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-all duration-150 hover:-translate-y-[3px] hover:border-[#C3D0F2] hover:shadow-[0_8px_24px_-12px_rgba(21,53,199,.28)]"
            >
              <span className="mb-4 flex size-[52px] shrink-0 items-center justify-center rounded-[14px] bg-[#EAF0FF]">
                <Icon className="size-6 text-brand" />
              </span>
              <h3 className="font-display text-[22px] font-semibold leading-[1.25] text-[#0E1525]">
                {card.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-[1.55] text-[#5A6478]">
                {card.description}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-[15px] font-bold text-brand">
                {card.cta}
                <ArrowRight className="size-4" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Other rate trackers */}
      <h2 className="mb-[18px] font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
        Other rate trackers
      </h2>
      <div className="mb-[38px] grid gap-[14px] sm:grid-cols-2">
        {otherTrackers.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group flex items-start gap-4 rounded-[16px] border border-[#E7EBF3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
            >
              <span className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[#EAF0FF]">
                <Icon className="size-[22px] text-brand" />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#0E1525] group-hover:text-brand">
                    {card.title}
                  </span>
                  <ArrowRight className="size-4 text-[#C4CCDB] transition-transform group-hover:translate-x-0.5" />
                </div>
                <p className="mt-1 text-[14.5px] leading-[1.5] text-[#6B7488]">
                  {card.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="mb-[38px]">
        <FaqSection faqs={faqs} />
      </div>

      {/* Related */}
      <section>
        <h2 className="mb-4 font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
          Related pages
        </h2>
        <div
          className={`grid gap-4 ${relatedPages.length >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"}`}
        >
          {relatedPages.map((page) => {
            const Icon = page.icon;
            return (
              <Link
                key={page.title}
                href={page.href}
                className="group flex items-center gap-3 rounded-[14px] border border-[#E7EBF3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF] text-brand">
                  <Icon className="size-[18px]" />
                </span>
                <span className="text-[15px] font-bold text-[#0E1525] group-hover:text-brand">
                  {page.title}
                </span>
                <ArrowRight className="ml-auto size-4 text-[#C4CCDB] transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
