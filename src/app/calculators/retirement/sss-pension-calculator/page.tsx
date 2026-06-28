import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Info,
  Clock,
  Coins,
  CalendarClock,
  Award,
  Shield,
  Wallet,
  Target,
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
import { SSSPensionCalculator } from "@/components/calculators/sss-pension-calculator";
import { sssPensionData } from "@/data/calculators/sss-pension";
import { computeSSSPension } from "@/lib/calculators/sss-pension-formula";
import { formatPeso, formatDate } from "@/lib/formatters";

export const metadata: Metadata = generatePageMetadata({
  title: sssPensionData.metaTitle,
  description: sssPensionData.metaDescription,
  slug: sssPensionData.slug,
  updatedAt: sssPensionData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "SSS Pension Calculator" },
];

const CARD =
  "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,30px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]";
const H2 = "font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0E1525]";
const LEAD = "mt-[10px] max-w-[80ch] text-[16px] leading-[1.65] text-[#475069]";

const factCards = [
  {
    title: "Salary credit",
    rate: "Your average MSC",
    desc: "A higher average monthly salary credit across your contribution history lifts every formula, so paying at a higher credit pays off at retirement.",
    icon: Coins,
  },
  {
    title: "Years of service",
    rate: "120 contributions minimum",
    desc: "You need at least 10 credited years (120 monthly contributions) to qualify for a lifetime monthly pension instead of a one-time lump sum.",
    icon: CalendarClock,
  },
  {
    title: "Bonuses on top",
    rate: "+₱1,000 and 13th month",
    desc: "A ₱1,000 across-the-board increase is added to the governing formula, and pensioners receive a 13th-month pension every December.",
    icon: Award,
  },
];

const relatedPages = [
  {
    title: "SSS Contribution Calculator",
    href: "/calculators/sss/sss-contribution-calculator-philippines",
    icon: Shield,
  },
  {
    title: "Take-Home Pay Calculator",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    icon: Wallet,
  },
  {
    title: "Savings Goal Calculator",
    href: "/calculators/savings/savings-goal-calculator-philippines",
    icon: Target,
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

// Worked example: 25 years at a ₱20,000 average salary credit
const ex = computeSSSPension(20_000, 25);
const exampleRows = [
  { label: "Average monthly salary credit", val: "₱20,000", kind: "plain" },
  { label: "Credited years of service", val: "25 years", kind: "plain" },
  { label: "Formula 1 (₱300 + 20% + 2%/yr)", val: formatPeso(ex.f1, 0), kind: ex.governs === 0 ? "win" : "plain" },
  { label: "Formula 2 (40% of AMSC)", val: formatPeso(ex.f2, 0), kind: ex.governs === 1 ? "win" : "plain" },
  { label: "+ Across-the-board increase", val: "+₱1,000", kind: "add" },
  { label: "Estimated monthly pension", val: formatPeso(ex.pension, 0), kind: "total" },
] as const;

export default function SSSPensionCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={generateCalculatorSchema({
          title: sssPensionData.metaTitle,
          description: sssPensionData.metaDescription,
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
            {sssPensionData.h1}
          </h1>
          <p className="mt-[9px] max-w-[80ch] text-[16px] leading-[1.55] text-[#5A6478]">
            {sssPensionData.intro}
          </p>
          <div className="mt-[11px] flex items-center gap-[6px] text-[15px] font-semibold text-[#6B7488]">
            <Clock className="size-[15px]" />
            Updated {formatDate(sssPensionData.updatedAt)}
          </div>
        </div>

        {/* Calculator */}
        <div id="calculator" className="scroll-mt-20">
          <SSSPensionCalculator />
        </div>

        <div className="mt-9 space-y-[14px]">
          {/* How the pension is computed */}
          <section className={CARD}>
            <h2 className={H2}>How the SSS pension is computed</h2>
            <p className={LEAD}>
              The SSS computes your pension three ways and pays whichever gives the highest
              amount. The first formula rewards both your salary credit and your years of service,
              the second is a flat 40% of your average salary credit, and the third is a guaranteed
              minimum based on your years of service.
            </p>
            <p className={LEAD}>
              A ₱1,000 across-the-board increase is then added on top of whichever formula wins.
              Retirees also receive a 13th-month pension every December equal to one monthly
              pension.
            </p>
          </section>

          {/* What shapes your pension */}
          <section className={CARD}>
            <h2 className={H2}>What shapes your pension</h2>
            <p className={LEAD}>
              Three things drive the final amount under the Social Security Act of 2018 (RA 11199).
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
                A higher salary credit raises your pension. See how contributions are computed with
                the{" "}
                <Link
                  href="/calculators/sss/sss-contribution-calculator-philippines"
                  className="font-bold text-brand hover:underline"
                >
                  SSS Contribution calculator
                </Link>
                .
              </span>
            </div>
          </section>

          {/* Example */}
          <section className={CARD}>
            <h2 className={H2}>Example: 25 years at a ₱20,000 salary credit</h2>
            <p className="mt-[10px] text-[15px] text-[#5A6478]">
              Here is how the three formulas compare for a member retiring with 25 credited years
              and a ₱20,000 average salary credit.
            </p>
            <div className="mt-4 overflow-hidden rounded-[14px] border border-[#E7EBF3]">
              {exampleRows.map((r, i) => {
                const isTotal = r.kind === "total";
                const isWin = r.kind === "win";
                return (
                  <div
                    key={r.label}
                    className={`flex items-center justify-between px-[18px] py-[13px] ${
                      i < exampleRows.length - 1 ? "border-b border-[#EEF1F7]" : ""
                    } ${isTotal ? "bg-[#EAF5F1]" : isWin ? "bg-[#F2FAF6]" : ""}`}
                  >
                    <span className={`text-[15px] ${isTotal ? "font-bold text-[#0E1525]" : "text-[#475069]"}`}>
                      {r.label}
                    </span>
                    <span
                      className={`font-mono text-[14.5px] font-medium ${
                        isTotal
                          ? "text-[#0B8270]"
                          : r.kind === "add" || isWin
                            ? "text-[#0E9F6E]"
                            : "text-[#0E1525]"
                      }`}
                    >
                      {r.val}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-[14px] leading-[1.6] text-[#8A93A6]">
              Formula 1 gives the highest amount here, so it governs. The ₱1,000 increase is added
              to reach the final monthly pension.
            </p>
          </section>

          {/* Good to know */}
          <section className={CARD}>
            <h2 className={H2}>Good to know</h2>
            <ul className="mt-5 space-y-[14px]">
              {sssPensionData.tips.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[16px] leading-[1.55] text-[#344054]">
                  <ArrowRight className="mt-1 size-[18px] shrink-0 text-brand" />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {/* Disclaimer */}
          <div className="flex gap-3 rounded-[14px] border border-[#F0E2BE] bg-[#FFF8E8] p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-[#C99A22]" />
            <p className="text-[15px] leading-[1.6] text-[#7A6320]">
              This calculator provides estimates only and is not affiliated with the Social Security
              System. Your actual pension depends on your verified average monthly salary credit,
              exact credited years of service, and current SSS rules. Request an official
              computation from SSS before making retirement decisions.
            </p>
          </div>

          {/* FAQ */}
          <section className="pt-7">
            <FaqSection faqs={sssPensionData.faqs} />
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
