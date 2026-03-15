import { PageHero } from "@/components/shared/page-hero";
import { ToolCard } from "@/components/shared/tool-card";
import { FaqSection } from "@/components/shared/faq-section";
// import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";

export const metadata = generatePageMetadata({
  title: "Financial Calculators Philippines",
  description:
    "Free online financial calculators for Filipinos. Compute car loans, home loans, personal loans, withholding tax, and SSS contributions instantly.",
  slug: "calculators",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators" },
];

const calculators = [
  {
    title: "Car Loan Calculator",
    description:
      "Estimate monthly amortization and total interest for auto loans in the Philippines. Supports custom down payment and term length.",
    href: "/calculators/loans/car-loan-calculator-philippines",
    category: "Loans",
  },
  {
    title: "Home Loan Calculator",
    description:
      "Calculate monthly payments for Philippine housing loans from Pag-IBIG and major banks. Compare fixed and variable rate options.",
    href: "/calculators/loans/home-loan-calculator-philippines",
    category: "Loans",
  },
  {
    title: "Personal Loan Calculator",
    description:
      "Compare monthly payments and total cost across personal loan offers from banks and online lenders.",
    href: "/calculators/loans/personal-loan-calculator-philippines",
    category: "Loans",
  },
  {
    title: "Withholding Tax Calculator",
    description:
      "Compute your monthly withholding tax based on the latest BIR TRAIN Law tax table. See your net take-home pay.",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    category: "Tax",
  },
  {
    title: "SSS Contribution Calculator",
    description:
      "Estimate your monthly SSS contribution based on your salary bracket and the current contribution schedule.",
    href: "/calculators/retirement/sss-pension-calculator",
    category: "Retirement",
  },
];

const faqs = [
  {
    question: "Are these calculators based on current Philippine rates?",
    answer:
      "Yes. Our calculators use the latest publicly available formulas, including the TRAIN Law tax table for withholding tax and the current SSS contribution schedule. We update them whenever official rates change.",
  },
  {
    question: "Can I use these calculators on my phone?",
    answer:
      "Absolutely. All PesoHub calculators are fully responsive and work on smartphones, tablets, and desktops. No app download is needed.",
  },
  {
    question:
      "Should I rely on these calculators for official financial decisions?",
    answer:
      "Our calculators provide reliable estimates, but they should not replace professional financial advice. For official computations, always verify with your bank, the BIR, or the relevant government agency.",
  },
];

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <PageHero
        title="Financial Calculators Philippines"
        description="Free online calculators for loans, tax, and retirement. Get instant estimates tailored to Philippine rates and regulations."
        breadcrumbs={breadcrumbs}
      />

      {/* <AdPlaceholder slot="calculators-top" /> */}

      {/* All Calculators */}
      <section>
        <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          All Calculators
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calc) => (
            <ToolCard key={calc.href} {...calc} />
          ))}
        </div>
      </section>

      {/* <AdPlaceholder slot="calculators-bottom" /> */}

      <FaqSection faqs={faqs} />
    </div>
  );
}
