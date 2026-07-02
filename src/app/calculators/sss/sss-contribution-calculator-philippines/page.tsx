import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Info,
  Clock,
  Percent,
  Coins,
  PiggyBank,
  Wallet,
  Landmark,
  Calculator,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/shared/faq-section";
import { CalculatorNotice } from "@/components/shared/calculator-notice";
import { SSSContributionCalculator } from "@/components/calculators/sss-contribution-calculator";
import { sssContributionCalcData } from "@/data/calculators/sss-contribution";
import { computeSSSContribution } from "@/lib/calculators/sss-contribution-wisp";
import { formatDate, formatPeso } from "@/lib/formatters";

export const metadata: Metadata = generatePageMetadata({
  title: sssContributionCalcData.metaTitle,
  description: sssContributionCalcData.metaDescription,
  slug: sssContributionCalcData.slug,
  updatedAt: sssContributionCalcData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "SSS Contribution Calculator" },
];

const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,30px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]";
const H2 = "font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0E1525]";
const LEAD = "mt-[10px] text-[16px] leading-[1.65] text-[#475069]";

const factCards = [
  {
    title: "15% contribution rate",
    rate: "Total of the MSC",
    desc: "The combined SSS contribution is 15% of your monthly salary credit. For employees this is split 10% employer and 5% employee.",
    icon: Percent,
  },
  {
    title: "Salary credit range",
    rate: "₱5,000 to ₱35,000",
    desc: "Contributions are based on a bracketed monthly salary credit, not your exact pay. OFW members have a higher ₱8,000 minimum.",
    icon: Coins,
  },
  {
    title: "Provident fund",
    rate: "On MSC above ₱20,000",
    desc: "The portion of your salary credit above ₱20,000 funds the mandatory provident fund (WISP), a separate retirement savings account.",
    icon: PiggyBank,
  },
];

const relatedPages = [
  {
    title: "SSS Pension Calculator",
    href: "/calculators/retirement/sss-pension-calculator",
    icon: PiggyBank,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Wallet,
  },
  {
    title: "Withholding Tax Calculator",
    href: "/calculators/tax/withholding-tax-calculator-philippines",
    icon: Percent,
  },
  {
    title: "Government Hub",
    href: "/government",
    icon: Landmark,
  },
  {
    title: "Calculators Hub",
    href: "/calculators",
    icon: Calculator,
  },
];

// Worked example: ₱25,000 employed member (15% schedule)
const ex = computeSSSContribution(25_000, "employed");
const exampleRows = [
  { label: "Monthly salary", val: formatPeso(25_000, 0), kind: "plain" },
  { label: "Monthly salary credit (MSC)", val: formatPeso(ex.msc, 0), kind: "plain" },
  { label: "Employee share (5%)", val: formatPeso(ex.ee), kind: "you" },
  { label: "Employer share (10%)", val: formatPeso(ex.er), kind: "plain" },
  { label: "EC premium (employer)", val: formatPeso(ex.ec), kind: "plain" },
  { label: "Total contribution", val: formatPeso(ex.total), kind: "total" },
] as const;

export default function SSSContributionCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: sssContributionCalcData.metaTitle,
          description: sssContributionCalcData.metaDescription,
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
            {sssContributionCalcData.h1}
          </h1>
          <p className="mt-[9px] text-[16px] leading-[1.55] text-[#5A6478]">
            {sssContributionCalcData.intro}
          </p>
          <div className="mt-[11px] flex items-center gap-[6px] text-[15px] font-semibold text-[#6B7488]">
            <Clock className="size-[15px]" />
            Updated {formatDate(sssContributionCalcData.updatedAt)}
          </div>
        </div>

        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <SSSContributionCalculator />
        </div>

        <div className="mt-9 space-y-[14px]">
          {/* How SSS contributions work */}
          <section className={CARD}>
            <h2 className={H2}>How SSS contributions work</h2>
            <p className={LEAD}>
              Your SSS contribution is a percentage of your monthly salary credit (MSC) — a
              bracketed figure based on your income, not your exact salary. Under the current
              schedule the total contribution rate is 15% of the MSC, and the MSC ranges from
              ₱5,000 to ₱35,000.
            </p>
            <p className={LEAD}>
              For employed members, the employer shoulders 10% and the employee 5%.
              Self-employed, voluntary, and OFW members pay the full 15% themselves. The portion
              of the MSC above ₱20,000 goes to the mandatory provident fund (WISP), which is a
              separate retirement savings account.
            </p>
          </section>

          {/* Key facts */}
          <section className={CARD}>
            <h2 className={H2}>Key facts about the current schedule</h2>
            <p className={LEAD}>
              The schedule below reflects the 15% contribution rate now in effect under the
              Social Security Act of 2018 (RA 11199).
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {factCards.map((d) => {
                const Icon = d.icon;
                return (
                  <div key={d.title} className="rounded-[16px] border border-[#E7EBF3] bg-white p-[22px]">
                    <span className="flex size-11 items-center justify-center rounded-[12px] bg-[#EAF0FF] text-brand">
                      <Icon className="size-[22px]" />
                    </span>
                    <h3 className="mt-[14px] font-display text-[18px] font-semibold text-[#0E1525]">{d.title}</h3>
                    <div className="mb-2 mt-[5px] text-[14px] font-bold text-brand">{d.rate}</div>
                    <p className="text-[14.5px] leading-[1.55] text-[#5A6478]">{d.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex items-start gap-[11px] rounded-[13px] border border-[#C9D6F7] bg-[#EAF0FF] p-[14px_16px]">
              <Info className="mt-0.5 size-[18px] shrink-0 text-brand" />
              <span className="text-[15px] leading-[1.55] text-[#26408B]">
                Once you know your contribution, see how it builds toward retirement with the{" "}
                <Link
                  href="/calculators/retirement/sss-pension-calculator"
                  className="font-bold text-brand hover:underline"
                >
                  SSS Pension calculator
                </Link>
                .
              </span>
            </div>
          </section>

          {/* Example */}
          <section className={CARD}>
            <h2 className={H2}>Example: a ₱25,000 employed member</h2>
            <p className="mt-[10px] text-[15px] text-[#5A6478]">
              Here is how the contribution splits for an employee earning ₱25,000 per month.
            </p>
            <div className="mt-4 overflow-hidden rounded-[14px] border border-[#E7EBF3]">
              {exampleRows.map((r, i) => {
                const isTotal = r.kind === "total";
                return (
                  <div
                    key={r.label}
                    className={`flex items-center justify-between px-[18px] py-[13px] ${
                      i < exampleRows.length - 1 ? "border-b border-[#EEF1F7]" : ""
                    } ${isTotal ? "bg-[#EAF5F1]" : ""}`}
                  >
                    <span className={`text-[15px] ${isTotal ? "font-bold text-[#0E1525]" : "text-[#475069]"}`}>
                      {r.label}
                    </span>
                    <span
                      className={`font-mono text-[14.5px] font-medium ${
                        isTotal ? "text-[#0B8270]" : r.kind === "you" ? "text-[#0E9F6E]" : "text-[#0E1525]"
                      }`}
                    >
                      {r.val}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-[14px] leading-[1.6] text-[#8A93A6]">
              The MSC is set by the SSS contribution table in ₱500 brackets, so the figure your
              employer remits may differ slightly from a straight percentage of your exact salary.
            </p>
          </section>

          {/* Good to know */}
          <section className={CARD}>
            <h2 className={H2}>Good to know</h2>
            <ul className="mt-5 space-y-[14px]">
              {sssContributionCalcData.tips.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[16px] leading-[1.55] text-[#344054]">
                  <ArrowRight className="mt-1 size-[18px] shrink-0 text-brand" />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {/* Disclaimer */}
          <CalculatorNotice text="This calculator provides estimates based on the current SSS contribution schedule and is not affiliated with the Social Security System. The official MSC brackets, EC contribution, and WISP rules determine the exact amount. Always check the official SSS contribution table or your member account." />

          {/* FAQ */}
          <section className="pt-7">
            <FaqSection faqs={sssContributionCalcData.faqs} />
          </section>

          {/* Related */}
          <section className="pt-7">
            <h2 className={`mb-4 ${H2}`}>Related calculators and guides</h2>
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
