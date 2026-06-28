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
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";

export const metadata = generatePageMetadata({
  title: "Salary Deductions, Tax & SSS Guides Philippines",
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
    <div className="mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(20px,3vw,36px)]">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Heading */}
      <div className="mb-6">
        <div className="mb-[10px] text-[15px] font-bold uppercase tracking-[.06em] text-brand">
          Guides
        </div>
        <h1 className="font-display text-[clamp(28px,3.4vw,40px)] font-semibold tracking-[-.02em] text-[#0E1525]">
          Finance Guides Philippines
        </h1>
        <p className="mt-[10px] max-w-[72ch] text-[17px] leading-[1.55] text-[#5A6478]">
          Understand how withholding tax, SSS, PhilHealth, and Pag-IBIG actually
          work — explained clearly so you can read your payslip, check your
          deductions, and know what to expect.
        </p>
      </div>

      {/* Intro */}
      <div className="mb-[34px] space-y-4 text-[15.5px] leading-[1.7] text-[#5A6478]">
        <p>
          Most Filipino workers encounter SSS, PhilHealth, Pag-IBIG, and
          withholding tax deductions on every payslip — but few understand how
          these amounts are actually computed. Government circulars and official
          documentation exist, but they are often written in legal or technical
          language that makes practical understanding difficult.
        </p>
        <p>
          These guides bridge that gap. Each one takes a specific financial topic
          — like how withholding tax is computed from your salary, or how SSS
          pension amounts are determined — and explains it step by step. The goal
          is to help you understand the rules well enough to verify your own
          payslip, estimate your benefits, or know what questions to ask your
          employer or agency.
        </p>
      </div>

      {/* All guides */}
      <div className="mb-[18px]">
        <h2 className="font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
          All guides
        </h2>
        <p className="mt-[5px] max-w-[62ch] text-[15px] leading-[1.5] text-[#6B7488]">
          Browse explainers and walkthroughs designed to make everyday financial
          topics easier to understand.
        </p>
      </div>
      <div className="mb-[38px] grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allGuides.map((guide) => {
          const Icon = guide.icon;
          return (
            <Link
              key={guide.title}
              href={guide.href}
              className="group flex flex-col rounded-[18px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-all duration-150 hover:-translate-y-[3px] hover:border-[#BCC9F4] hover:shadow-[0_16px_34px_-18px_rgba(21,53,199,.32)]"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-[19px] font-semibold leading-[1.25] text-[#0E1525]">
                    {guide.title}
                  </div>
                  <p className="mt-2 text-[15px] leading-[1.55] text-[#5A6478]">
                    {guide.description}
                  </p>
                </div>
                <span className="flex size-[48px] shrink-0 items-center justify-center rounded-[14px] bg-[#EAF0FF]">
                  <Icon className="size-[22px] text-brand" />
                </span>
              </div>
              <div className="mt-auto inline-flex items-center gap-2 text-[15px] font-bold text-brand">
                Read guide
                <ArrowRight className="size-4" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Need an estimate instead? */}
      <div className="mb-[18px]">
        <div className="mb-2 text-[13px] font-bold uppercase tracking-[.08em] text-brand">
          Need an estimate instead?
        </div>
        <h2 className="font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
          If you want a number, these tools may help more than a guide
        </h2>
      </div>
      <div className="mb-[38px] grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickPaths.map((path) => {
          const Icon = path.icon;
          return (
            <Link
              key={path.title}
              href={path.href}
              className="group flex flex-col rounded-[16px] border border-[#E7EBF3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-all duration-150 hover:-translate-y-[3px] hover:border-[#9DE3DF] hover:shadow-[0_14px_30px_-18px_rgba(25,201,194,.45)]"
            >
              <span className="mb-3 flex size-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[#DEF5F0]">
                <Icon className="size-5 text-[#0E9A86]" />
              </span>
              <h3 className="text-base font-bold leading-[1.3] text-[#0E1525]">
                {path.title}
              </h3>
              <p className="mt-1 flex-1 text-[14px] leading-[1.5] text-[#6B7488]">
                {path.description}
              </p>
              <ArrowRight className="mt-3 size-[18px] text-[#0E9A86]" />
            </Link>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="mb-6">
        <FaqSection faqs={faqs} />
      </div>
    </div>
  );
}
