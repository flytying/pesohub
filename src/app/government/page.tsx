import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Calculator,
  BookOpen,
  Shield,
  Percent,
  Globe,
  Home,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";

export const metadata = generatePageMetadata({
  title:
    "SSS, BIR, Pag-IBIG, PhilHealth & BSP Reference Tables",
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
    title: "Pag-IBIG MP2 Savings Guide",
    description:
      "Learn how the MP2 voluntary savings program works, including employer salary deduction, enrollment, dividend rates, and maturity rules.",
    href: "/government/pag-ibig/pag-ibig-mp2-savings-guide",
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

const CATEGORY: Record<
  string,
  { icon: LucideIcon; chip: string; ink: string; border: string; shadow: string }
> = {
  SSS: { icon: Shield, chip: "#EAF0FF", ink: "#1535C7", border: "#BCC9F4", shadow: "rgba(35,71,217,.32)" },
  BIR: { icon: Percent, chip: "#FBF0DC", ink: "#B7791F", border: "#E8D2A3", shadow: "rgba(183,121,31,.30)" },
  BSP: { icon: Globe, chip: "#DEF5F0", ink: "#0E9A86", border: "#A7E2D6", shadow: "rgba(14,154,134,.30)" },
  "Pag-IBIG": { icon: Home, chip: "#EDE8FC", ink: "#6D4DE0", border: "#CFC3F4", shadow: "rgba(109,77,224,.30)" },
  PhilHealth: { icon: HeartPulse, chip: "#FBE6E7", ink: "#C2484D", border: "#EFC4C6", shadow: "rgba(194,72,77,.30)" },
};

export default function GovernmentPage() {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(20px,3vw,36px)]">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Heading */}
      <div className="mb-6">
        <div className="mb-[10px] text-[15px] font-bold uppercase tracking-[.06em] text-brand">
          Government
        </div>
        <h1 className="font-display text-[clamp(28px,3.4vw,40px)] font-semibold tracking-[-.02em] text-[#0E1525]">
          Philippine Government Finance Reference
        </h1>
        <p className="mt-[10px] max-w-[72ch] text-[17px] leading-[1.55] text-[#5A6478]">
          Look up SSS contributions, withholding tax brackets, Pag-IBIG
          schedules, PhilHealth premiums, and BSP exchange rate references — all
          in one place, without navigating multiple government portals.
        </p>
      </div>

      {/* All reference pages */}
      <div className="mb-[18px]">
        <h2 className="font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
          SSS, BIR, Pag-IBIG &amp; PhilHealth
        </h2>
        <p className="mt-[5px] max-w-[62ch] text-[15px] leading-[1.5] text-[#6B7488]">
          Contribution tables, tax brackets, and official references — organized
          so you can verify numbers without digging through government websites.
        </p>
      </div>
      <div className="mb-[38px] grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {governmentPages.map((page) => {
          const c = CATEGORY[page.category] ?? CATEGORY.SSS;
          const Icon = c.icon;
          return (
            <Link
              key={page.title}
              href={page.href}
              className="group flex flex-col rounded-[18px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-all duration-150 hover:-translate-y-[3px]"
              onMouseEnter={undefined}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <span className="font-display text-[19px] font-semibold leading-[1.25] text-[#0E1525]">
                    {page.title}
                  </span>
                  <p className="mt-2 text-[15px] leading-[1.55] text-[#5A6478]">
                    {page.description}
                  </p>
                </div>
                <span
                  className="flex size-[48px] shrink-0 items-center justify-center rounded-[14px]"
                  style={{ background: c.chip }}
                >
                  <Icon className="size-[22px]" style={{ color: c.ink }} />
                </span>
              </div>
              <div className="mt-auto inline-flex items-center gap-2 text-[15px] font-bold text-brand">
                View reference
                <ArrowRight className="size-4" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* FAQ */}
      <div className="mb-[38px]">
        <FaqSection faqs={faqs} />
      </div>

      {/* Related sections */}
      <section>
        <h2 className="mb-4 font-display text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-.02em] text-[#0E1525]">
          Related sections
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {relatedSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.title}
                href={section.href}
                className="group flex items-center gap-3 rounded-[14px] border border-[#E7EBF3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF] text-brand">
                  <Icon className="size-[18px]" />
                </span>
                <span className="text-[15px] font-bold text-[#0E1525] group-hover:text-brand">
                  {section.title}
                </span>
                <ArrowRight className="ml-auto size-4 text-[#C4CCDB] transition-transform group-hover:translate-x-0.5" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
