import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Info,
  Clock,
  Percent,
  Wallet,
  Shield,
  PiggyBank,
  CreditCard,
  BookOpen,
  Calculator,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/shared/faq-section";
import { SSSLoanCalculator } from "@/components/calculators/sss-loan-calculator";
import { sssLoanData } from "@/data/calculators/sss-loan";
import { formatDate } from "@/lib/formatters";

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

const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,30px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]";
const H2 = "font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0E1525]";
const LEAD = "mt-[10px] text-[16px] leading-[1.65] text-[#475069]";

const loanFacts = [
  {
    icon: Percent,
    title: "10% annual interest",
    rate: "Diminishing balance",
    description:
      "Both the salary loan and the calamity loan charge a nominal 10% per year, computed on the diminishing principal balance as you pay it down.",
  },
  {
    icon: Clock,
    title: "Up to 24-month term",
    rate: "Monthly amortization",
    description:
      "SSS member loans are repaid in monthly installments over up to two years. Missed payments accrue penalties and are deducted from future SSS benefits.",
  },
  {
    icon: Wallet,
    title: "Net proceeds",
    rate: "1% service fee",
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

const relatedPages = [
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: Shield,
  },
  {
    title: "SSS Pension Calculator",
    href: "/calculators/retirement/sss-pension-calculator",
    icon: PiggyBank,
  },
  {
    title: "Personal Loan Calculator",
    href: "/calculators/loans/personal-loan-calculator-philippines",
    icon: CreditCard,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    icon: BookOpen,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: Calculator,
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

      <div className="mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(18px,3vw,34px)]">
        {/* Heading */}
        <div className="mb-5">
          <nav aria-label="Breadcrumb" className="mb-[10px]">
            <ol className="flex flex-wrap items-center gap-[7px] text-[15px] font-semibold text-[#6B7488]">
              {breadcrumbs.map((b, i) => {
                const last = i === breadcrumbs.length - 1;
                return (
                  <li key={i} className="flex items-center gap-[7px]">
                    {i > 0 && <span className="text-[#C4CCDB]">/</span>}
                    {last || !b.href ? (
                      <span className={last ? "text-[#5A6478]" : ""}>{b.label}</span>
                    ) : (
                      <Link href={b.href} className="font-bold text-brand">
                        {b.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          <h1 className="font-display text-[clamp(26px,3.4vw,38px)] font-semibold leading-[1.1] tracking-[-.02em] text-[#0E1525]">
            {sssLoanData.h1}
          </h1>
          <p className="mt-[9px] text-[16px] leading-[1.55] text-[#5A6478]">
            {sssLoanData.intro}
          </p>
          <div className="mt-[11px] flex items-center gap-[6px] text-[15px] font-semibold text-[#6B7488]">
            <Clock className="size-[15px]" />
            Updated {formatDate(sssLoanData.updatedAt)}
          </div>
        </div>

        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <SSSLoanCalculator />
        </div>

        <div className="mt-9 space-y-[14px]">
          {/* How SSS loans work */}
          <section className={CARD}>
            <h2 className={H2}>How SSS salary and calamity loans work</h2>
            <p className={LEAD}>
              The SSS salary loan and calamity loan are short-term cash loans for qualified
              members, repaid through monthly amortizations. Both use a flat 10% annual interest on
              the diminishing balance, so most of the interest is paid early in the term.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {loanFacts.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="rounded-[16px] border border-[#E7EBF3] bg-white p-[22px]">
                    <span className="flex size-11 items-center justify-center rounded-[12px] bg-[#EAF0FF] text-brand">
                      <Icon className="size-[22px]" />
                    </span>
                    <h3 className="mt-[14px] font-display text-[18px] font-semibold text-[#0E1525]">{f.title}</h3>
                    <div className="mb-2 mt-[5px] text-[14px] font-bold text-brand">{f.rate}</div>
                    <p className="text-[14.5px] leading-[1.55] text-[#5A6478]">{f.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Eligibility */}
          <section className={CARD}>
            <h2 className={H2}>Who can apply for an SSS loan</h2>
            <ul className="mt-4 space-y-3">
              {eligibility.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.6] text-[#475069]">
                  <ArrowRight className="mt-1 size-[18px] shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Disclaimer */}
          <div className="flex gap-3 rounded-[14px] border border-[#F0E2BE] bg-[#FFF8E8] p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-[#C99A22]" />
            <p className="text-[15px] leading-[1.6] text-[#7A6320]">
              This is an educational estimate for planning. Your actual approved amount,
              amortization, service fee, and any penalties are set by the SSS based on your
              contributions and records. Always confirm final figures with the SSS.
            </p>
          </div>

          {/* FAQ */}
          <section className="pt-7">
            <FaqSection faqs={sssLoanData.faqs} />
          </section>

          {/* Related */}
          <section className="pt-7">
            <h2 className={`mb-4 ${H2}`}>Related calculators and references</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPages.map((page) => {
                const Icon = page.icon;
                return (
                  <Link
                    key={page.title}
                    href={page.href}
                    className="group flex items-center gap-3 rounded-[14px] border border-[#E7EBF3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF] text-brand">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="flex-1 text-[15px] font-bold text-[#0E1525] group-hover:text-brand">
                      {page.title}
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-[#C4CCDB]" />
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
