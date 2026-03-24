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
    description:
      "Use calculators to estimate deductions, contributions, payments, and savings.",
    href: "/calculators",
    icon: Calculator,
  },
  {
    title: "Guides",
    description:
      "Use guides for plain-language explanations of tax, SSS, and government-related topics.",
    href: "/guides",
    icon: BookOpen,
  },
  {
    title: "Rates",
    description:
      "Browse rate-related pages for exchange rates, savings rates, and other finance references.",
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
        description="Use this section to check government-related finance references in one place. Browse contribution tables, tax references, exchange-rate references, and Pag-IBIG information that help you verify figures, understand official frameworks, and move to the right calculator or guide faster."
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* All Government Reference Pages */}
      <section id="all-pages" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          All Government Reference Pages
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Start with the reference page that best matches what you want to
          verify or understand.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {governmentPages.map((page) => (
            <Card key={page.title} className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base">{page.title}</CardTitle>
                    <CardDescription className="mt-1.5 text-sm leading-relaxed">
                      {page.description}
                    </CardDescription>
                    <div className="mt-3">
                      <Link
                        href={page.href}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
                      >
                        View reference
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                  <Image
                    src={page.logo}
                    alt={`${page.category} logo`}
                    width={48}
                    height={48}
                    className="size-12 shrink-0 object-contain opacity-60"
                    unoptimized
                  />
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Related Sections */}
      <section id="related" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related Sections
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Need more than a reference page? Explore related tools and explainers
          to help you understand or estimate the numbers you see here.
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          {relatedSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.title}
                href={section.href}
                className="group block"
              >
                <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-3 text-sm">
                      {section.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {section.description}
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
