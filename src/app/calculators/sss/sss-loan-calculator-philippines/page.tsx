import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Percent,
  Clock,
  Wallet,
  TriangleAlert,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import { SSSLoanCalculator } from "@/components/calculators/sss-loan-calculator";
import { sssLoanData } from "@/data/calculators/sss-loan";

export const metadata: Metadata = generatePageMetadata({
  title: sssLoanData.metaTitle,
  description: sssLoanData.metaDescription,
  slug: sssLoanData.slug,
  updatedAt: sssLoanData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "SSS Loan Calculator" },
];

const loanFacts = [
  {
    icon: Percent,
    title: "10% annual interest",
    description:
      "Both the salary loan and the calamity loan charge a nominal 10% per year, computed on the diminishing principal balance as you pay it down.",
  },
  {
    icon: Clock,
    title: "24-month term",
    description:
      "SSS member loans are repaid in 24 monthly installments. Missed payments accrue penalties and are deducted from future SSS benefits.",
  },
  {
    icon: Wallet,
    title: "Net proceeds",
    description:
      "A 1% service fee is deducted from a salary loan, so the cash you receive is slightly less than the approved amount. Calamity loans have no service fee.",
  },
];

const eligibility = [
  "Salary loan (1 month): at least 36 posted monthly contributions, with 6 in the last 12 months.",
  "Salary loan (2 months): at least 72 posted monthly contributions.",
  "Calamity loan: at least 36 posted contributions and residence in an area declared under a state of calamity.",
  "The member must be currently employed, self-employed, or a voluntary/OFW payer in good standing.",
];

const relatedContent = [
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "SSS Pension Calculator",
    href: "/calculators/retirement/sss-pension-calculator",
    icon: Calculator,
  },
  {
    title: "Personal Loan Calculator",
    href: "/calculators/loans/personal-loan-calculator-philippines",
    icon: Calculator,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: BookOpen,
  },
  {
    title: "All Calculators",
    href: "/calculators",
    icon: TrendingUp,
  },
];

export default function SSSLoanCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: sssLoanData.metaTitle,
          description: sssLoanData.metaDescription,
        })}
      />

      <div className="mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(20px,3vw,36px)]">
        <PageHero
          title={sssLoanData.h1}
          description={sssLoanData.intro}
          badge={sssLoanData.updatedAt}
          breadcrumbs={breadcrumbs}
        />

        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <SSSLoanCalculator />
        </div>

        {/* How SSS loans work */}
        <section className="mt-12">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            How SSS salary and calamity loans work
          </h2>
          <p className="mt-4 max-w-[72ch] text-[16px] leading-[1.6] text-[#5A6478]">
            The SSS salary loan and calamity loan are short-term cash loans for
            qualified members, repaid through monthly amortizations over two
            years. Both use a flat 10% annual interest on the diminishing
            balance, so most of the interest is paid early in the term.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {loanFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.title}
                  className="rounded-[18px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)]"
                >
                  <span className="flex size-12 items-center justify-center rounded-[14px] bg-[#EAF0FF] text-brand">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-4 text-[18px] font-bold text-[#0E1525]">
                    {fact.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-[1.6] text-[#5A6478]">
                    {fact.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Eligibility */}
        <section className="mt-12 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,32px)]">
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Who can apply for an SSS loan
          </h2>
          <ul className="mt-4 space-y-3">
            {eligibility.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#5A6478]"
              >
                <ArrowRight className="mt-1 size-4 shrink-0 text-[#C4CCDB]" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-3 rounded-[14px] border border-[#F0E2BE] bg-[#FFF8E8] p-5">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-[#C99A22]" />
            <p className="text-[16px] leading-[1.6] text-[#7A6320]">
              This is an educational estimate. Your actual approved amount,
              amortization, service fee, and any penalties are set by the SSS
              based on your contributions and records. Always confirm final
              figures with the SSS.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <div className="mt-12 rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(22px,3vw,34px)]">
          <FaqSection faqs={sssLoanData.faqs} />
        </div>

        {/* Related */}
        <section className="mt-12">
          <h2 className="mb-4 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Related calculators and references
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedContent.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-[14px] border border-[#E7EBF3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF] text-brand">
                    <Icon className="size-[18px]" />
                  </span>
                  <span className="flex-1 text-[15px] font-bold text-[#0E1525] group-hover:text-brand">
                    {item.title}
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-[#C4CCDB]" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
