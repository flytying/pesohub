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

const relatedRatePages = [
  {
    title: "Calculators Hub",
    description:
      "Estimate savings, loan payments, deductions, and more with free tools.",
    href: "/calculators",
    icon: Calculator,
  },
  {
    title: "Guides Hub",
    description:
      "Read plain-language guides on loans, taxes, and financial planning.",
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
        description="Compare exchange rates, savings rates, time deposit rates, and digital bank rates in one place. Use PesoHub's rates hub to explore major financial rate categories and find the pages that help you compare returns, track currency movement, and make more informed money decisions."
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Choose a Rate Type */}
      <section id="choose" className="scroll-mt-20 pt-8">
        <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Choose a Rate Type
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {rateTypeCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="h-full">
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
                  <div className="mt-3">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
                    >
                      {card.cta}
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Explore Related Rate Pages */}
      <section className="pt-16">
        <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Explore Related Rate Pages
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {relatedRatePages.map((item) => {
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

    </div>
    </>
  );
}
