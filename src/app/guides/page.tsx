import { PageHero } from "@/components/shared/page-hero";
import { ToolCard } from "@/components/shared/tool-card";
import { FaqSection } from "@/components/shared/faq-section";
// import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";

export const metadata = generatePageMetadata({
  title: "Finance Guides Philippines",
  description:
    "Practical finance guides for Filipinos. Learn about Philippine withholding tax, SSS contributions, and personal money management in plain language.",
  slug: "guides",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides" },
];

const guides = [
  {
    title: "Withholding Tax Guide Philippines",
    description:
      "A plain-language guide to Philippine withholding tax. Understand the TRAIN Law tax brackets, how your employer computes it, and how to verify your payslip.",
    href: "/guides/tax/how-withholding-tax-works-philippines",
    category: "Tax",
  },
  {
    title: "SSS Contribution Guide Philippines",
    description:
      "Everything you need to know about SSS contributions — how much you pay, what benefits you get, and how to check your records online.",
    href: "/guides/sss/how-to-compute-sss-pension",
    category: "Retirement",
  },
];

const faqs = [
  {
    question: "Are these guides up to date with current Philippine laws?",
    answer:
      "Yes. We review and update our guides whenever there are changes to tax laws, SSS contribution schedules, or related regulations. Each guide includes the date it was last updated.",
  },
  {
    question: "Can I use these guides as a substitute for professional advice?",
    answer:
      "Our guides are educational and meant to help you understand the basics. For specific tax filings, legal matters, or complex financial decisions, we recommend consulting a licensed accountant or financial advisor.",
  },
  {
    question: "Will you be adding more guides in the future?",
    answer:
      "Yes. We plan to expand our guide library to cover topics like Pag-IBIG contributions, PhilHealth, budgeting strategies, and investing basics for Filipinos. Stay tuned for updates.",
  },
];

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <PageHero
        title="Finance Guides Philippines"
        description="Practical, plain-language guides to help you understand Philippine taxes, SSS contributions, and personal finance fundamentals."
        breadcrumbs={breadcrumbs}
      />

      {/* <AdPlaceholder slot="guides-top" /> */}

      {/* All Guides */}
      <section>
        <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          All Guides
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {guides.map((guide) => (
            <ToolCard key={guide.href} {...guide} />
          ))}
        </div>
      </section>

      {/* <AdPlaceholder slot="guides-bottom" /> */}

      <FaqSection faqs={faqs} />
    </div>
  );
}
