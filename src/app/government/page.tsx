import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
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
    "SSS, BIR, Pag-IBIG, PhilHealth & BSP Reference Tables | PesoHub",
  description:
    "Check Philippine government finance references including SSS contribution tables, withholding tax tables, Pag-IBIG deductions, PhilHealth rates, and BSP exchange guides.",
  slug: "government",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government" },
];

const governmentPages = [
  {
    title: "SSS Contribution Table",
    description:
      "Check SSS contribution schedules and contribution-related reference details to better understand required amounts and contribution structure.",
    href: "/government/sss/sss-contribution-guide",
    category: "SSS",
    logo: "/logos/sss.png",
  },
  {
    title: "SSS Pension Table",
    description:
      "Review SSS pension-related reference information to better understand pension figures, contribution history context, and retirement-related estimates.",
    href: "/government/sss/sss-pension-table",
    category: "SSS",
    logo: "/logos/sss.png",
  },
  {
    title: "Withholding Tax Table",
    description:
      "Check withholding tax brackets and reference tables used to understand salary-based tax deductions in the Philippines.",
    href: "/government/bir/withholding-tax-table-philippines",
    category: "BIR",
    logo: "/logos/bir.png",
  },
  {
    title: "BSP Exchange Rate Guide",
    description:
      "Review BSP exchange-rate reference information and understand how official reference rates differ from rates used in actual transactions.",
    href: "/government/bsp/bsp-exchange-rate-guide",
    category: "BSP",
    logo: "/logos/bsp.png",
  },
  {
    title: "Pag-IBIG Contribution Table",
    description:
      "Check the current Pag-IBIG contribution table, including employee share, employer share, salary cap, and sample payroll cuts.",
    href: "/government/pag-ibig/pag-ibig-contribution-table-philippines",
    category: "Pag-IBIG",
    logo: "/logos/pagibig.png",
  },
  {
    title: "Pag-IBIG Housing Loan Guide",
    description:
      "Explore Pag-IBIG housing loan reference information, including key terms, requirements, and government-backed housing loan context.",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    category: "Pag-IBIG",
    logo: "/logos/pagibig.png",
  },
  {
    title: "PhilHealth Contribution Table",
    description:
      "Check the current PhilHealth premium rate, salary floor, salary ceiling, employee share, employer share, and sample monthly payroll cuts.",
    href: "/government/philhealth/philhealth-contribution-table-philippines",
    category: "PhilHealth",
    logo: "/logos/philhealth.png",
  },
];

const faqs = [
  {
    question: "What can I find on the Government section of PesoHub?",
    answer:
      "You can browse government-related finance reference pages such as contribution tables, tax references, exchange-rate references, and Pag-IBIG information that help you verify figures and understand official-reference-style information more easily.",
  },
  {
    question: "Are these official government pages?",
    answer:
      "PesoHub pages are designed to help organize and explain reference information more clearly, but users should still verify important details with the official government source when needed.",
  },
  {
    question: "Should I use a reference page, guide, or calculator?",
    answer:
      "Use a reference page if you want to check a table, bracket, or official-reference-style summary. Use a guide if you want a plain-language explanation. Use a calculator if you want an estimate based on your own inputs.",
  },
  {
    question: "Why do some government figures change?",
    answer:
      "Contribution schedules, tax tables, and other public finance references may change when agencies update rules, thresholds, or rates. That is why year-sensitive pages should always be checked carefully.",
  },
  {
    question:
      "Where should I go if I want to estimate deductions or payments?",
    answer:
      "Visit PesoHub Calculators if you want to estimate tax, contributions, take-home pay, loan payments, or savings scenarios.",
  },
];

const relatedSections = [
  {
    title: "Calculators",
    href: "/calculators",
    icon: Calculator,
  },
  {
    title: "Guides",
    href: "/guides",
    icon: BookOpen,
  },
  {
    title: "Rates",
    href: "/rates",
    icon: TrendingUp,
  },
];

export default function GovernmentPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <PageHero
        title="Philippine Government Finance Reference"
        description="Look up SSS contributions, withholding tax brackets, Pag-IBIG schedules, PhilHealth premiums, and BSP exchange rate references — all in one place, without navigating multiple government portals."
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      {/* All Government Reference Pages */}
      <section id="all-pages" className="scroll-mt-20 bg-surface-tertiary py-20 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
                SSS, BIR, Pag-IBIG & PhilHealth
              </h2>
              <p className="mt-4 text-[20px] leading-[26px] text-gray-400">
                Contribution tables, tax brackets, and official references — organized so you can verify numbers without digging through government websites.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {governmentPages.map((page) => (
                <div
                  key={page.title}
                  className="flex h-full flex-col rounded-xl bg-white p-6 transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                >
                  <h4 className="text-[20px] font-semibold leading-[26px] text-brand">
                    {page.title}
                  </h4>
                  <div className="mt-2 flex items-start justify-between gap-4">
                    <p className="flex-1 text-[16px] leading-[22px] text-gray-400">
                      {page.description}
                    </p>
                    <Image
                      src={page.logo}
                      alt={`${page.category} logo`}
                      width={40}
                      height={40}
                      className="size-10 shrink-0 object-contain opacity-60"
                      unoptimized
                    />
                  </div>
                  <div className="mt-auto pt-5">
                    <Link
                      href={page.href}
                      className="inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
                    >
                      View reference
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer + FAQ + Related */}
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <FaqSection faqs={faqs} />

        {/* Related Sections */}
        <section className="mt-16">
          <h2 className="mb-8 text-[32px] font-medium leading-[48px] text-gray-500">
            Related Sections
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {relatedSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.title}
                  href={section.href}
                  className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-brand">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-[16px] font-semibold text-gray-500 group-hover:text-brand">
                    {section.title}
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
