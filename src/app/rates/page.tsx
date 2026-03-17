import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  PiggyBank,
  Clock,
  Smartphone,
  Calculator,
  BookOpen,
  CheckCircle,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
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
    "Rates in the Philippines – Compare Savings, Exchange, Time Deposit & Digital Bank Rates | PesoHub",
  description:
    "Compare exchange rates, savings rates, time deposit rates, and digital bank rates in the Philippines. Explore PesoHub's rates hub to find the right comparison page.",
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
    bestFor: "Best for tracking",
  },
  {
    icon: PiggyBank,
    title: "Savings Rates",
    description:
      "Compare savings account interest rate categories and explore options for keeping funds accessible while earning interest.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    cta: "View Savings Rates",
    bestFor: "Best for comparison",
  },
  {
    icon: Clock,
    title: "Time Deposit Rates",
    description:
      "Review fixed-term deposit rate categories if you want to compare returns for money you can set aside for a locked period.",
    href: "/rates/savings-rates/time-deposit-rates-philippines",
    cta: "View Time Deposit Rates",
    bestFor: "Best for fixed returns",
  },
  {
    icon: Smartphone,
    title: "Digital Bank Rates",
    description:
      "Explore rates commonly associated with digital banks and app-based savings options. Useful if you want to compare newer savings products against more traditional options.",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    cta: "View Digital Bank Rates",
    bestFor: "Best for digital-first options",
    comingSoon: true,
  },
];

const exploreCategories = [
  {
    icon: TrendingUp,
    title: "Exchange Rates",
    description:
      "Use exchange rate pages when you want to check how much one currency is worth in Philippine pesos or compare rate movement over time. This is helpful for remittances, travel planning, international payments, and general tracking.",
  },
  {
    icon: PiggyBank,
    title: "Savings Rates",
    description:
      "Use savings rate pages when you want to compare deposit account yields while keeping your money relatively accessible. This is helpful if you are looking for a place to park emergency funds or short-term savings.",
  },
  {
    icon: Clock,
    title: "Time Deposit Rates",
    description:
      "Use time deposit rate pages when you want to compare fixed-term options that may offer higher returns in exchange for locking in your funds for a set period.",
  },
  {
    icon: Smartphone,
    title: "Digital Bank Rates",
    description:
      "Use digital bank rate pages when you want to compare savings options from app-based banks and fintech-style providers. These pages are useful for users looking for flexible access, competitive yields, or promo-driven rate offers.",
  },
];

const howToUseColumns = [
  {
    title: "Use exchange rates if you want to:",
    items: [
      "track currency value",
      "estimate conversion",
      "follow recent movement",
    ],
  },
  {
    title: "Use savings rates if you want to:",
    items: [
      "compare accessible deposit options",
      "review savings yields",
      "keep funds flexible",
    ],
  },
  {
    title: "Use time deposit rates if you want to:",
    items: [
      "compare fixed-term returns",
      "set aside money for a defined period",
      "weigh yield against flexibility",
    ],
  },
  {
    title: "Use digital bank rates if you want to:",
    items: [
      "compare app-based savings options",
      "review newer bank products",
      "check promo-driven rate categories",
    ],
  },
];

const compareChecklist = [
  "current rate or quoted yield",
  "whether the rate is fixed or promotional",
  "access to funds",
  "minimum deposit or balance requirements",
  "lock-in period, if any",
  "account type or provider type",
  "update frequency",
  "whether the page is for tracking, planning, or product comparison",
];

const whichToStart = [
  {
    condition: "Start with Exchange Rates if...",
    answer:
      "You want to check USD to PHP or compare currency value today.",
    href: "/rates/exchange-rates/usd-to-php-today",
    label: "Exchange Rates",
  },
  {
    condition: "Start with Savings Rates if...",
    answer:
      "You want a deposit account that keeps funds accessible while earning interest.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    label: "Savings Rates",
  },
  {
    condition: "Start with Time Deposit Rates if...",
    answer:
      "You are willing to lock funds for a fixed period in exchange for a potentially stronger rate.",
    href: "/rates/savings-rates/time-deposit-rates-philippines",
    label: "Time Deposit Rates",
  },
  {
    condition: "Start with Digital Bank Rates if...",
    answer:
      "You want to compare newer app-based banks and savings products.",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    label: "Digital Bank Rates",
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
    title: "Savings Rates",
    description:
      "Compare savings account interest rates across traditional and high-yield options.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    icon: PiggyBank,
  },
  {
    title: "USD to PHP Exchange Rate",
    description:
      "Check the latest USD to PHP rate and understand how reference rates work.",
    href: "/rates/exchange-rates/usd-to-php-today",
    icon: TrendingUp,
  },
  {
    title: "Time Deposit Rates",
    description:
      "Compare fixed-term deposit rates and return potential across account options.",
    href: "/rates/savings-rates/time-deposit-rates-philippines",
    icon: Clock,
  },
  {
    title: "Digital Banks Comparison",
    description:
      "Review digital bank savings options and compare rate-focused products.",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    icon: Smartphone,
  },
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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <PageHero
        title="Rates in the Philippines"
        description="Compare exchange rates, savings rates, time deposit rates, and digital bank rates in one place. Use PesoHub's rates hub to explore major financial rate categories and find the pages that help you compare returns, track currency movement, and make more informed money decisions."
        breadcrumbs={breadcrumbs}
      />

      {/* Choose a Rate Type */}
      <section id="choose" className="scroll-mt-20 pt-8">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Choose a Rate Type
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Start with the category that matches what you want to compare.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {rateTypeCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground/80">
                        {card.bestFor}
                      </span>
                      {card.comingSoon && (
                        <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                          Coming soon
                        </span>
                      )}
                    </div>
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

      {/* Explore Rate Categories */}
      <section id="explore" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Explore Rate Categories
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Each category below supports a different financial decision. Choose
          the one that best matches what you want to compare.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {exploreCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Card key={cat.title} className="h-full">
                <CardHeader>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="mt-3 text-sm">{cat.title}</CardTitle>
                  <CardDescription className="text-xs leading-relaxed">
                    {cat.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How to Use These Rate Pages */}
      <section className="pt-16">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          How to Use These Rate Pages
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Different rate pages support different goals. Exchange rates help you
          understand currency value. Deposit rate pages help you compare
          potential returns on saved money. The best page for you depends on
          whether you want liquidity, fixed returns, convenience, or simple
          comparison.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howToUseColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {col.title}
              </h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {col.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* What to Compare When Looking at Rates */}
      <section className="pt-16">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          What to Compare When Looking at Rates
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          A higher number is not always enough reason to choose one option over
          another. It helps to compare the full context around the rate so you
          can make a more informed decision. Before relying on a rate, compare:
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {compareChecklist.map((item) => (
            <li key={item} className="flex gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-600" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Which Rate Page Should You Start With */}
      <section className="mt-12 rounded-lg border border-border bg-muted/30 p-6">
        <h2 className="text-sm font-semibold text-foreground">
          Which Rate Page Should You Start With?
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          If you are not sure where to begin, use this quick guide.
        </p>
        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
          {whichToStart.map((item) => (
            <li key={item.label}>
              <span className="font-medium text-foreground/80">
                {item.condition}
              </span>
              <br />
              <span>{item.answer} </span>
              <Link
                href={item.href}
                className="text-primary hover:underline"
              >
                Go to {item.label} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Explore Related Rate Pages */}
      <section className="pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Explore Related Rate Pages
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Start with the category that best matches your goal, then move into a
          more specific comparison page.
        </p>
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

      {/* Final CTA */}
      <section className="mb-4 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-10">
        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
          Find the rate category that fits your goal
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Whether you want to track currency value, compare savings yields,
          explore fixed-term returns, or review digital bank options — start
          with the right rate type and move to a more specific comparison page.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#choose"
            className={buttonVariants({ className: "font-medium" })}
          >
            Choose a rate type
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/calculators"
            className={buttonVariants({
              variant: "outline",
              className: "font-medium",
            })}
          >
            Explore calculators
          </Link>
        </div>
      </section>
    </div>
  );
}
