import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator,
  BookOpen,
  TrendingUp,
  ArrowRight,
  PhilippinePeso,
  Wallet,
  Clock,
  Percent,
  Shield,
  FileText,
  Wrench,
  SquareParking,
  Fuel,
  CircleCheck,
  HelpCircle,
  TriangleAlert,
  Info,
  Car,
  type LucideIcon,
} from "lucide-react";
import { generatePageMetadata } from "@/lib/seo";
import {
  generateBreadcrumbSchema,
  generateCalculatorSchema,
} from "@/lib/schema-markup";
import { JsonLd } from "@/components/seo/json-ld";
import { FaqSection } from "@/components/shared/faq-section";
import { HomeLoanCalculator } from "@/components/calculators/home-loan-calculator";
import { homeLoanData } from "@/data/calculators/home-loan";
import { formatDate } from "@/lib/formatters";

export const metadata: Metadata = generatePageMetadata({
  title: homeLoanData.metaTitle,
  description: homeLoanData.metaDescription,
  slug: homeLoanData.slug,
  updatedAt: homeLoanData.updatedAt,
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Calculators", href: "/calculators" },
  { label: "Loans", href: "/calculators" },
  { label: "Home Loan" },
];

const factors: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: PhilippinePeso, title: "Property price", description: "A more expensive property increases the amount you finance, which usually raises the monthly payment." },
  { icon: Wallet, title: "Down payment", description: "A larger down payment reduces the amount borrowed, lowering both your monthly payment and total interest." },
  { icon: Clock, title: "Loan term", description: "A longer term spreads the cost over more months and lowers the monthly payment, but increases total interest." },
  { icon: Percent, title: "Interest rate", description: "Even a small difference in rate changes the total cost of borrowing. Compare both the monthly payment and full loan cost." },
];

const ownershipCosts: { icon: LucideIcon; label: string }[] = [
  { icon: Shield, label: "Home / fire insurance" },
  { icon: FileText, label: "Property tax (amilyar)" },
  { icon: FileText, label: "Transfer & registration fees" },
  { icon: SquareParking, label: "Association or condo dues" },
  { icon: Wrench, label: "Maintenance & repairs" },
  { icon: Fuel, label: "Utilities & furnishing" },
];

const compareList = [
  "Estimated monthly payment",
  "Down payment required",
  "Total interest over the full term",
  "Total estimated loan cost",
  "Required insurance or add-on products",
  "Mortgage & processing fees",
  "Early repayment terms",
  "Pag-IBIG vs bank financing",
];

const questions = [
  "Can I comfortably afford the monthly payment along with property tax, insurance, association dues, and maintenance costs?",
  "Would a larger down payment make the loan more manageable?",
  "Should I compare Pag-IBIG and bank financing before deciding?",
  "Does a shorter term save more in total cost, even if the monthly payment is higher?",
  "Are there extra fees or required charges not included in this estimate?",
];

const relatedContent = [
  { title: "Car Loan Calculator", href: "/calculators/loans/car-loan-calculator-philippines", icon: Car },
  { title: "Personal Loan Calculator", href: "/calculators/loans/personal-loan-calculator-philippines", icon: Calculator },
  { title: "Pag-IBIG Housing Loan Guide", href: "/government/pag-ibig/pag-ibig-housing-loan-guide", icon: BookOpen },
  { title: "Rates Hub", href: "/rates", icon: TrendingUp },
  { title: "All Calculators", href: "/calculators", icon: Calculator },
];

const CARD = "rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,30px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]";
const H2 = "font-display text-[22px] font-semibold tracking-[-0.02em] text-[#0E1525]";
const LEAD = "mt-[10px] max-w-[80ch] text-[16px] leading-[1.65] text-[#475069]";

export default function HomeLoanCalculatorPage() {
  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />
      <JsonLd data={generateCalculatorSchema({ title: homeLoanData.metaTitle, description: homeLoanData.metaDescription })} />

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
                      <Link href={b.href} className="font-bold text-brand">{b.label}</Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          <h1 className="font-display text-[clamp(26px,3.4vw,38px)] font-semibold leading-[1.1] tracking-[-.02em] text-[#0E1525]">
            {homeLoanData.h1}
          </h1>
          <p className="mt-[9px] max-w-[80ch] text-[16px] leading-[1.55] text-[#5A6478]">{homeLoanData.intro}</p>
          <div className="mt-[11px] flex items-center gap-[6px] text-[15px] font-semibold text-[#6B7488]">
            <Clock className="size-[15px]" />
            Updated {formatDate(homeLoanData.updatedAt)}
          </div>
        </div>

        <div id="calculator" className="scroll-mt-20">
          <HomeLoanCalculator />
        </div>

        <div className="mt-9 space-y-[14px]">
          <section className={CARD}>
            <h2 className={H2}>How to tell if the monthly payment is realistic</h2>
            <p className={LEAD}>
              A monthly home loan payment may look manageable at first, but it should still fit comfortably within your overall monthly budget. Before applying, check whether you can still cover your regular expenses, savings, emergency fund, and other debt payments after adding the estimated monthly amortization.
            </p>
            <div className="mt-4 flex gap-3 rounded-[14px] border border-[#F0E2BE] bg-[#FFF8E8] p-5">
              <TriangleAlert className="mt-0.5 size-5 shrink-0 text-[#C99A22]" />
              <p className="text-[15px] leading-[1.6] text-[#7A6320]">
                A lower monthly payment is not always the cheaper option overall. A longer loan term can reduce the monthly amount, but it usually increases the total interest paid over time. A bigger down payment generally lowers both the monthly payment and the total borrowing cost.
              </p>
            </div>
          </section>

          <section className={CARD}>
            <h2 className={H2}>What affects your monthly home loan payment</h2>
            <p className={LEAD}>Your estimated payment depends on a few main factors. Understanding how each one works helps you compare offers more clearly.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {factors.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="rounded-[15px] border border-[#E7EBF3] bg-white p-5">
                    <span className="flex size-11 items-center justify-center rounded-[12px] bg-[#EAF0FF] text-brand"><Icon className="size-5" /></span>
                    <h3 className="mt-4 text-[17px] font-bold text-[#0E1525]">{f.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.55] text-[#5A6478]">{f.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className={CARD}>
            <h2 className={H2}>Your monthly payment is not your full housing budget</h2>
            <p className={LEAD}>A home loan calculator estimates the financing side of the purchase, but your real housing budget should include more than the monthly amortization. Also consider:</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ownershipCosts.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.label} className="flex items-center gap-[10px] rounded-[12px] bg-[#F7F9FD] px-[15px] py-[13px] text-[15px] text-[#344054]">
                    <Icon className="size-[18px] shrink-0 text-brand" />{c.label}
                  </div>
                );
              })}
            </div>
          </section>

          <section className={CARD}>
            <h2 className={H2}>What to compare before choosing a home loan</h2>
            <p className={LEAD}>Don&apos;t compare lenders on the monthly payment alone. Two offers may look similar at first, but the total cost can differ. Before applying, compare:</p>
            <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
              {compareList.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[15px] leading-[1.5] text-[#475069]">
                  <CircleCheck className="mt-0.5 size-[18px] shrink-0 text-brand" />{item}
                </li>
              ))}
            </ul>
          </section>

          <section className={CARD}>
            <h2 className={H2}>Questions to consider before applying</h2>
            <ul className="mt-4 space-y-3">
              {questions.map((q) => (
                <li key={q} className="flex gap-3 text-[15.5px] leading-[1.6] text-[#475069]">
                  <HelpCircle className="mt-0.5 size-5 shrink-0 text-brand" />{q}
                </li>
              ))}
            </ul>
          </section>

          <section className="pt-7"><FaqSection faqs={homeLoanData.faqs} /></section>

          <section className="pt-7">
            <h2 className={`mb-4 ${H2}`}>Related calculators and guides</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedContent.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.title} href={item.href} className="group flex items-center gap-3 rounded-[14px] border border-[#E7EBF3] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-colors hover:border-[#C3D0F2] hover:bg-[#FBFCFE]">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF] text-brand"><Icon className="size-[18px]" /></span>
                    <span className="flex-1 text-[15px] font-bold text-[#0E1525] group-hover:text-brand">{item.title}</span>
                    <ArrowRight className="size-4 shrink-0 text-[#C4CCDB]" />
                  </Link>
                );
              })}
            </div>
          </section>

          <div className="flex gap-3 rounded-[15px] border border-[#F0E2BE] bg-[#FFF8E8] p-[18px]">
            <Info className="mt-0.5 size-5 shrink-0 text-[#C99A22]" />
            <p className="text-[15px] leading-[1.6] text-[#7A6320]">
              PesoHub provides free financial tools and information for educational purposes only. It is not affiliated with any bank or government agency. Rates and terms shown are estimates — always confirm the final figures with your lender and consult a qualified professional before making financial decisions.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
