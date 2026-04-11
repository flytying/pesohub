import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Landmark,
  Receipt,
  HandCoins,
  Shield,
  HeartPulse,
  Home,
  ScrollText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";

export const metadata = generatePageMetadata({
  title: "Salary Deductions, Tax & SSS Guides Philippines | PesoHub",
  description:
    "Learn how withholding tax, SSS, PhilHealth, Pag-IBIG, and take-home pay work with simple Philippine finance guides written in plain language.",
  slug: "guides",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Guides" },
];

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface GuideData {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

const allGuides: GuideData[] = [
  {
    icon: Receipt,
    title: "Withholding Tax Guide Philippines",
    description:
      "Understand what withholding tax is, how it is usually computed from salary, and how to check whether your payslip looks reasonable.",
    href: "/guides/tax/how-withholding-tax-works-philippines",
  },
  {
    icon: HandCoins,
    title: "Take-Home Pay Guide Philippines",
    description:
      "Understand why take-home pay differs from gross salary and how common deductions affect net pay.",
    href: "/guides/tax/take-home-pay-guide-philippines",
  },
  {
    icon: Shield,
    title: "SSS Contribution Guide Philippines",
    description:
      "Understand how SSS contributions work, how much may apply to your salary or member type, and how to check your records or contribution schedule.",
    href: "/guides/sss/how-to-compute-sss-pension",
  },
  {
    icon: HeartPulse,
    title: "PhilHealth Contribution Guide Philippines",
    description:
      "Understand how PhilHealth deductions work and where they fit into payroll or contribution estimates.",
    href: "/guides/government/philhealth-contribution-guide",
  },
  {
    icon: Home,
    title: "Pag-IBIG Deduction Guide Philippines",
    description:
      "Understand what Pag-IBIG deductions are and how they may appear in salary-related calculations.",
    href: "/guides/government/pag-ibig-deduction-guide",
  },
  {
    icon: ScrollText,
    title: "Government Deductions and Tables",
    description:
      "See what common payroll and contribution references mean before checking official figures.",
    href: "/government",
  },
];

const quickPaths = [
  {
    title: "Withholding Tax Calculator",
    description: "Estimate salary tax based on salary and tax assumptions.",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Take-Home Pay Calculator",
    description: "Estimate net pay after common deductions.",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "SSS Contribution Calculator",
    description: "Estimate SSS contributions based on salary and member type.",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "Reference Pages",
    description:
      "Check salary tax tables, contribution schedules, or supporting official references.",
    href: "/government",
    icon: Landmark,
  },
];

const faqs = [
  {
    question: "What are these guides for?",
    answer:
      "These guides are meant to help you understand confusing financial topics in plain language before you try to estimate, compare, or verify details elsewhere.",
  },
  {
    question: "Are these guides just articles?",
    answer:
      "They are more useful than a typical article list. Each guide is meant to help you move from confusion to understanding, then to the next useful step such as a calculator or reference page.",
  },
  {
    question:
      "How do I know whether I need a guide, calculator, or reference page?",
    answer:
      "Use a guide when you want an explanation. Use a calculator when you want an estimate. Use a reference page when you need to check a table, schedule, or official basis.",
  },
  {
    question: "Are these guides enough to confirm official figures?",
    answer:
      "No. Guides help explain the topic, but rules and official tables can change. Final figures should still be confirmed with the relevant agency, employer, provider, or official source.",
  },
  {
    question: "Will more guides be added?",
    answer:
      "Yes. This section can grow to cover take-home pay, PhilHealth, Pag-IBIG, payslip reading, savings topics, and other common money questions in the Philippines.",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function GuidesPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <PageHero
        title="Finance Guides Philippines"
        description="Understand how withholding tax, SSS, PhilHealth, and Pag-IBIG actually work — explained in plain language so you can read your payslip, check your deductions, and know what to expect."
        breadcrumbs={breadcrumbs}
        variant="dark"
      />

      {/* Intro */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-[16px] leading-[22px] text-gray-400">
            Most Filipino workers encounter SSS, PhilHealth, Pag-IBIG, and withholding tax deductions on every payslip — but few understand how these amounts are actually computed. Government circulars and official documentation exist, but they are often written in legal or technical language that makes practical understanding difficult.
          </p>
          <p className="mt-4 text-[16px] leading-[22px] text-gray-400">
            These guides bridge that gap. Each one takes a specific financial topic — like how withholding tax is computed from your salary, or how SSS pension amounts are determined — and explains it step by step in plain language. The goal is to help you understand the rules well enough to verify your own payslip, estimate your benefits, or know what questions to ask your employer or agency.
          </p>
        </div>
      </section>

      {/* All Guides — surface-tertiary bg, two-column layout */}
      <section id="all-guides" className="scroll-mt-20 bg-surface-tertiary py-20 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <h2 className="text-[32px] font-medium leading-[48px] text-gray-500">
                All Guides
              </h2>
              <p className="mt-4 text-[20px] leading-[26px] text-gray-400">
                Browse explainers and walkthroughs designed to make everyday
                financial topics easier to understand.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {allGuides.map((guide) => {
                const Icon = guide.icon;
                return (
                  <div
                    key={guide.title}
                    className="flex h-full flex-col rounded-xl bg-white p-6 transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
                  >
                    <h4 className="text-[20px] font-semibold leading-[26px] text-brand">
                      {guide.title}
                    </h4>
                    <div className="mt-2 flex items-start justify-between gap-4">
                      <p className="flex-1 text-[16px] leading-[22px] text-gray-400">
                        {guide.description}
                      </p>
                      <Icon
                        className="size-16 shrink-0 text-gray-400"
                        strokeWidth={1.25}
                      />
                    </div>
                    <div className="mt-auto pt-5">
                      <Link
                        href={guide.href}
                        className="inline-flex items-center rounded-full bg-brand px-5 py-2.5 text-[14px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
                      >
                        Read guide
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Need an estimate instead? */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[14px] font-bold uppercase tracking-[0.2em] text-brand">
              Need an estimate instead?
            </p>
            <h2 className="mt-4 text-[24px] font-semibold leading-[30px] text-gray-500">
              If you already understand the topic and want a number, these tools
              may help more than a guide.
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickPaths.map((path) => {
              const Icon = path.icon;
              return (
                <Link key={path.title} href={path.href} className="group block">
                  <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
                    <h4 className="text-[20px] font-semibold leading-[26px] text-gray-500">
                      {path.title}
                    </h4>
                    <p className="mt-2 flex-1 text-[16px] leading-[22px] text-gray-400">
                      {path.description}
                    </p>
                    <div className="mt-4 flex size-10 items-center justify-center rounded-full bg-accent-cyan text-white transition-transform group-hover:translate-x-1">
                      <ArrowRight className="size-5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Disclaimer + FAQ */}
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <FaqSection faqs={faqs} />
      </div>
    </>
  );
}
