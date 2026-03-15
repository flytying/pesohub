import { PageHero } from "@/components/shared/page-hero";
import { ToolCard } from "@/components/shared/tool-card";
import { FaqSection } from "@/components/shared/faq-section";
// import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";

export const metadata = generatePageMetadata({
  title: "Philippine Finance Rates",
  description:
    "Track the latest Philippine exchange rates and savings interest rates. Compare USD to PHP conversion and bank savings account rates side by side.",
  slug: "rates",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Rates" },
];

const ratePages = [
  {
    title: "USD to PHP Exchange Rate",
    description:
      "View the latest US Dollar to Philippine Peso conversion rate, historical trends, and rate forecasts.",
    href: "/rates/exchange-rates/usd-to-php-today",
    category: "Exchange Rates",
  },
  {
    title: "Savings Account Rates",
    description:
      "Compare interest rates from major Philippine banks for regular savings, high-yield savings, and time deposit accounts.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    category: "Savings Rates",
  },
];

const faqs = [
  {
    question: "How often are the exchange rates updated?",
    answer:
      "Our USD to PHP exchange rate page sources data from the Bangko Sentral ng Pilipinas (BSP) reference rate and major market feeds. Rates are updated regularly throughout the business day.",
  },
  {
    question: "Can I use these rates for actual currency conversion?",
    answer:
      "The rates shown are reference rates and may differ from the actual rate offered by your bank or money transfer service. Always confirm the final rate with your provider before making a transaction.",
  },
  {
    question: "Which banks are included in the savings rate comparison?",
    answer:
      "We compare rates from major Philippine commercial banks and leading digital banks. The list is updated periodically to reflect the current market. Visit the Savings Account Rates page for the full list.",
  },
];

export default function RatesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <PageHero
        title="Philippine Finance Rates"
        description="Stay updated with the latest exchange rates and savings interest rates in the Philippines. Compare and make smarter financial decisions."
        breadcrumbs={breadcrumbs}
      />

      {/* <AdPlaceholder slot="rates-top" /> */}

      {/* All Rate Pages */}
      <section>
        <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          All Rate Pages
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {ratePages.map((page) => (
            <ToolCard key={page.href} {...page} />
          ))}
        </div>
      </section>

      {/* <AdPlaceholder slot="rates-bottom" /> */}

      <FaqSection faqs={faqs} />
    </div>
  );
}
