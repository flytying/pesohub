import { PageHero } from "@/components/shared/page-hero";
import { ToolCard } from "@/components/shared/tool-card";
import { FaqSection } from "@/components/shared/faq-section";
// import { AdPlaceholder } from "@/components/ads/ad-placeholder";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";

export const metadata = generatePageMetadata({
  title: "Philippine Government Finance Reference",
  description:
    "Clear, plain-language guides to Philippine government finance rules. Understand SSS contributions, BIR withholding tax, BSP exchange rates, and Pag-IBIG housing loans.",
  slug: "government",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government" },
];

const governmentPages = [
  {
    title: "SSS Contribution Table 2025",
    description:
      "Complete SSS contribution table with employee and employer shares by salary bracket. See rates for employed, self-employed, and voluntary members.",
    href: "/government/sss/sss-contribution-guide",
    category: "SSS",
  },
  {
    title: "SSS Pension Table",
    description:
      "Estimated monthly SSS pension amounts by salary credit and years of contribution. Includes the three pension formulas and eligibility requirements.",
    href: "/government/sss/sss-pension-table",
    category: "SSS",
  },
  {
    title: "Withholding Tax Table Philippines",
    description:
      "Official TRAIN Law withholding tax brackets and rates for 2023 onwards. See annual and monthly tax tables with a worked example.",
    href: "/government/bir/withholding-tax-table-philippines",
    category: "BIR",
  },
  {
    title: "BSP Exchange Rate Guide",
    description:
      "How the Bangko Sentral ng Pilipinas sets the USD/PHP reference rate, what the PDS is, and why bank rates differ from the BSP rate.",
    href: "/government/bsp/bsp-exchange-rate-guide",
    category: "BSP",
  },
  {
    title: "Pag-IBIG Housing Loan Guide",
    description:
      "Pag-IBIG Fund housing loan interest rates, maximum loanable amounts, eligibility requirements, and how to apply.",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    category: "Pag-IBIG",
  },
];

const faqs = [
  {
    question: "Is PesoHub affiliated with any Philippine government agency?",
    answer:
      "No. PesoHub is an independent project and is not affiliated with the SSS, BIR, BSP, Pag-IBIG, or any other Philippine government agency. Our government reference pages explain official rules in clearer language but should not be treated as official publications.",
  },
  {
    question: "Are these government reference pages up to date?",
    answer:
      "We review and update our reference pages whenever official rules, rates, or schedules change. Each page shows the date it was last updated. Always verify critical information with the relevant government agency.",
  },
  {
    question: "Can I use these pages for official filings or applications?",
    answer:
      "Our pages are educational references only. For official filings, applications, or compliance, always use the official forms, tables, and guidelines published by the relevant government agency (SSS, BIR, BSP, or Pag-IBIG).",
  },
];

export default function GovernmentPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      <PageHero
        title="Philippine Government Finance Reference"
        description="Plain-language guides to SSS, BIR, BSP, and Pag-IBIG rules. Understand contribution tables, tax brackets, exchange rates, and housing loan terms."
        breadcrumbs={breadcrumbs}
      />

      {/* <AdPlaceholder slot="government-top" /> */}

      <section>
        <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          All Reference Pages
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {governmentPages.map((page) => (
            <ToolCard key={page.href} {...page} />
          ))}
        </div>
      </section>

      {/* <AdPlaceholder slot="government-bottom" /> */}

      <FaqSection faqs={faqs} />
    </div>
  );
}
