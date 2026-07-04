import Link from "next/link";
import {
  Calculator,
  TrendingUp,
  BookOpen,
  Landmark,
  ArrowRight,
  PiggyBank,
  Percent,
  Wallet,
  Shield,
  Smartphone,
  Globe,
  FileText,
  RefreshCw,
  Clock,
  Sparkles,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import { FaqSection } from "@/components/shared/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/formatters";
import {
  generateWebsiteSchema,
  generateOrganizationSchema,
} from "@/lib/schema-markup";

// Recently-updated dates (live data is source of truth)
import { USD_PHP_UPDATED_AT } from "@/data/rates/exchange-rates";
import { SAVINGS_RATES_UPDATED_AT } from "@/data/rates/savings-rates";
import { TIME_DEPOSIT_RATES_UPDATED_AT } from "@/data/rates/time-deposit-rates";
import { SSS_CONTRIBUTION_UPDATED_AT } from "@/data/government/sss-contribution";
import { SSS_PENSION_TABLE_UPDATED_AT } from "@/data/government/sss-pension-table";
import { WITHHOLDING_TAX_TABLE_UPDATED_AT } from "@/data/government/withholding-tax-table";
import { PAGIBIG_HOUSING_LOAN_UPDATED_AT } from "@/data/government/pag-ibig-housing-loan";

export const metadata = generatePageMetadata({
  // The root layout's title.template does NOT apply to the homepage (same
  // segment), so the brand suffix is included here explicitly.
  title:
    "Savings Rates, Digital Banks & 2026 Tax Tables | PesoHub",
  description:
    "Compare Philippine savings and digital bank rates, check 2026 BIR and SSS tables, and use free calculators for time deposits, take-home pay, and loans.",
  slug: "",
});

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const categories: {
  name: string;
  count: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { name: "Calculators", count: "11 tools", href: "/calculators", icon: Calculator },
  { name: "Rates", count: "4 trackers", href: "/rates", icon: TrendingUp },
  { name: "Guides", count: "5 guides", href: "/guides", icon: BookOpen },
  { name: "Government", count: "8 tables", href: "/government", icon: Landmark },
];

type BadgeKind = "CALCULATOR" | "REFERENCE" | "RATES";

const BADGE: Record<BadgeKind, { bg: string; ink: string }> = {
  CALCULATOR: { bg: "#EAF0FF", ink: "#1535C7" },
  REFERENCE: { bg: "#FBF0DC", ink: "#B7791F" },
  RATES: { bg: "#DEF5F0", ink: "#0E9A86" },
};

// chip background + icon ink + hover border/shadow per accent
const ACCENT = {
  borrow: { chip: "#E8EDFF", ink: "#2347D9", border: "#BCC9F4", shadow: "rgba(35,71,217,.34)" },
  salary: { chip: "#DEF5F0", ink: "#0E9A86", border: "#A7E2D6", shadow: "rgba(14,154,134,.30)" },
  save: { chip: "#EDE8FC", ink: "#6D4DE0", border: "#CFC3F4", shadow: "rgba(109,77,224,.30)" },
  amber: { chip: "#FBF0DC", ink: "#B7791F", border: "#E8D2A3", shadow: "rgba(183,121,31,.30)" },
} as const;

const popularTools: {
  title: string;
  desc: string;
  href: string;
  badge: BadgeKind;
  icon: LucideIcon;
  accent: keyof typeof ACCENT;
}[] = [
  {
    title: "High-Yield Savings Accounts 2026",
    desc: "Compare high-yield savings accounts from Philippine digital banks, side by side with current rates.",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    badge: "RATES",
    icon: Smartphone,
    accent: "save",
  },
  {
    title: "Savings Account Interest Rates",
    desc: "A full list of savings account rates from digital and traditional banks, updated for 2026.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    badge: "RATES",
    icon: TrendingUp,
    accent: "salary",
  },
  {
    title: "BIR Withholding Tax Table 2026",
    desc: "Check the current TRAIN Law brackets and see the tax computed on your salary.",
    href: "/government/bir/withholding-tax-table-philippines",
    badge: "REFERENCE",
    icon: Percent,
    accent: "borrow",
  },
  {
    title: "SSS Pension Calculator",
    desc: "Estimate your monthly SSS retirement pension from your salary credit and years of service.",
    href: "/calculators/retirement/sss-pension-calculator",
    badge: "CALCULATOR",
    icon: PiggyBank,
    accent: "borrow",
  },
  {
    title: "Time Deposit Calculator",
    desc: "Estimate your maturity value and after-tax interest on a Philippine time deposit in seconds.",
    href: "/calculators/savings/time-deposit-calculator-philippines",
    badge: "CALCULATOR",
    icon: Landmark,
    accent: "salary",
  },
  {
    title: "SSS Contribution Table 2026",
    desc: "Find the current SSS contribution amounts by monthly salary and member type.",
    href: "/government/sss/sss-contribution-guide",
    badge: "REFERENCE",
    icon: Shield,
    accent: "amber",
  },
  {
    title: "Take-Home Pay Calculator",
    desc: "See your net pay after SSS, PhilHealth, Pag-IBIG, and withholding tax.",
    href: "/calculators/tax/take-home-pay-calculator-philippines",
    badge: "CALCULATOR",
    icon: Wallet,
    accent: "save",
  },
];

const savingsCards: {
  title: string;
  desc: string;
  href: string;
  cta: string;
  icon: LucideIcon;
}[] = [
  {
    title: "High-yield savings accounts",
    desc: "Compare high-yield savings accounts from digital banks like MariBank, Maya, Tonik, GoTyme, and more.",
    href: "/rates/savings-rates/best-digital-bank-rates-philippines",
    cta: "Compare accounts",
    icon: Smartphone,
  },
  {
    title: "Savings account interest rates",
    desc: "See the full list of savings account rates from digital and traditional banks, updated for 2026.",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    cta: "View rates",
    icon: TrendingUp,
  },
  {
    title: "Time deposit vs savings account",
    desc: "See whether a time deposit or a regular savings account grows your money faster.",
    href: "/rates/savings-rates/time-deposit-rates-philippines",
    cta: "Compare returns",
    icon: PiggyBank,
  },
];

const DIGITAL_BANK_RATES_HREF =
  "/rates/savings-rates/best-digital-bank-rates-philippines";

const bankSearches: string[] = [
  "SeaBank interest rate 2026",
  "Tonik Solo Stash interest rate 2026",
  "Maya savings interest rate 2026",
  "GoTyme interest rate 2026",
  "CIMB savings interest rate 2026",
  "OwnBank interest rate 2026",
  "NetBank interest rate 2026",
  "GCash / GSave interest rate 2026",
];

const refTables: {
  title: string;
  href: string;
  updated: string;
  icon: LucideIcon;
}[] = [
  {
    title: "BIR Withholding Tax Table",
    href: "/government/bir/withholding-tax-table-philippines",
    updated: WITHHOLDING_TAX_TABLE_UPDATED_AT,
    icon: Percent,
  },
  {
    title: "SSS Contribution Table",
    href: "/government/sss/sss-contribution-guide",
    updated: SSS_CONTRIBUTION_UPDATED_AT,
    icon: Shield,
  },
  {
    title: "SSS Pension Table",
    href: "/government/sss/sss-pension-table",
    updated: SSS_PENSION_TABLE_UPDATED_AT,
    icon: PiggyBank,
  },
  {
    title: "Pag-IBIG Housing Loan Guide",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    updated: PAGIBIG_HOUSING_LOAN_UPDATED_AT,
    icon: Landmark,
  },
  {
    title: "Savings Account Interest Rates",
    href: "/rates/savings-rates/best-savings-interest-rates-philippines",
    updated: SAVINGS_RATES_UPDATED_AT,
    icon: TrendingUp,
  },
  {
    title: "Time Deposit Rates",
    href: "/rates/savings-rates/time-deposit-rates-philippines",
    updated: TIME_DEPOSIT_RATES_UPDATED_AT,
    icon: Landmark,
  },
  {
    title: "USD to PHP Exchange Rate",
    href: "/rates/exchange-rates/usd-to-php-today",
    updated: USD_PHP_UPDATED_AT,
    icon: Globe,
  },
];

const whyCards: { title: string; desc: string; icon: LucideIcon }[] = [
  {
    title: "Philippine financial focus",
    desc: "Every tool and table is built around money questions and rules that actually apply in the Philippines.",
    icon: Globe,
  },
  {
    title: "Clear explanations",
    desc: "Complex brackets, contributions, and bank terms are broken down into simple, follow-along steps.",
    icon: FileText,
  },
  {
    title: "Up-to-date 2026 data",
    desc: "Rates, tax brackets, and contribution tables are reviewed and refreshed to reflect current figures.",
    icon: RefreshCw,
  },
];

const homeFaqs = [
  {
    question: "What is PesoHub?",
    answer:
      "PesoHub is a collection of money tools, guides, rate tables, and reference pages designed to help Filipinos understand everyday financial topics more easily.",
  },
  {
    question: "Who is PesoHub for?",
    answer:
      "PesoHub is for anyone in the Philippines looking for simpler ways to explore financial information, estimate figures, and compare common options.",
  },
  {
    question: "Are the tools and tables official?",
    answer:
      "PesoHub provides educational tools and reference content. Final figures, rates, and official details should always be verified with the relevant bank, provider, or government agency.",
  },
  {
    question: "How accurate are the calculations?",
    answer:
      "PesoHub tools are built to provide helpful estimates based on the assumptions shown on each page. Actual figures may vary depending on provider terms, official updates, fees, eligibility rules, or your specific situation.",
  },
  {
    question: "Is PesoHub affiliated with any government agency?",
    answer:
      "No. PesoHub is an independent site and is not affiliated with any government agency, bank, or financial institution. Always confirm official details with the relevant source.",
  },
];

// ---------------------------------------------------------------------------
// Section heading helper
// ---------------------------------------------------------------------------

function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mb-4">
      <div className="mb-2 text-[13px] font-bold uppercase tracking-[.08em] text-brand">
        {eyebrow}
      </div>
      <h2 className="font-display text-[clamp(22px,2.6vw,30px)] font-semibold tracking-[-.02em] text-[#0E1525]">
        {title}
      </h2>
      {lead && (
        <p className="mt-[7px] max-w-[70ch] text-base leading-[1.5] text-[#6B7488]">
          {lead}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-[clamp(20px,3vw,36px)] py-[clamp(20px,3vw,36px)]">
      <JsonLd data={generateWebsiteSchema()} />
      <JsonLd data={generateOrganizationSchema()} />

      {/* HERO */}
      <section className="gradient-hero relative mb-[clamp(20px,3vw,30px)] overflow-hidden rounded-3xl p-[clamp(28px,3.6vw,46px)] text-white shadow-[0_30px_60px_-28px_rgba(21,53,199,.6)]">
        <div
          aria-hidden
          className="absolute -right-10 -top-16 size-[360px] rounded-full bg-[radial-gradient(circle,rgba(43,229,223,.22),transparent_66%)]"
        />
        <div className="relative grid items-center gap-[clamp(26px,4vw,52px)] lg:grid-cols-[1.04fr_.96fr]">
          {/* Text */}
          <div className="text-center lg:text-left">
            <div className="text-[13px] font-bold uppercase tracking-[.14em] text-[#B9C6FF]">
              Free · Philippine-ready financial tools
            </div>
            <h1 className="mt-[14px] font-display text-[clamp(30px,4vw,50px)] font-semibold leading-[1.06] tracking-[-.02em]">
              Philippine savings rates, tax tables, and calculators
            </h1>
            <p className="mx-auto mt-[15px] max-w-[48ch] text-[clamp(16px,1.6vw,18px)] leading-[1.55] text-[#C9D4FF] lg:mx-0">
              Compare high-yield savings and digital bank rates, check 2026 BIR
              tax tables, and use free Philippine financial calculators.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link
                href="/rates/savings-rates/best-savings-interest-rates-philippines"
                className="inline-flex items-center gap-[9px] rounded-[12px] bg-white px-6 py-[14px] text-[15px] font-bold text-brand-light"
              >
                Compare savings rates
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/government/bir/withholding-tax-table-philippines"
                className="inline-flex items-center gap-[9px] rounded-[12px] border border-white/[.28] bg-white/10 px-[22px] py-[14px] text-[15px] font-bold text-white"
              >
                View 2026 tax tables
              </Link>
            </div>
          </div>

          {/* Visual — concentric rings + P mark + floating stat cards */}
          <div className="relative hidden min-h-[clamp(290px,29vw,350px)] lg:block" aria-hidden>
            <div className="absolute left-[52%] top-1/2 size-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(43,229,223,.28),transparent_64%)]" />
            <div className="absolute left-[53%] top-1/2 size-[clamp(360px,42vw,460px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
            <div className="absolute left-[53%] top-1/2 size-[clamp(270px,32vw,350px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[.14]" />
            <div className="absolute left-[53%] top-1/2 size-[clamp(190px,23vw,250px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(125,251,255,.22)]" />
            <div className="absolute left-[53%] top-1/2 w-[clamp(118px,14vw,176px)] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_18px_42px_rgba(0,210,216,.5)]">
              <svg viewBox="0 0 289 243" fill="none" xmlns="http://www.w3.org/2000/svg" className="block h-auto w-full">
                <path d="M204.426 0.0776184C251.505 2.27267 289 41.0522 289 88.5715C289 137.5 249.248 177.165 200.211 177.165H133.615C118.948 177.165 105.458 185.192 98.4603 198.082L91.3475 211.184C80.7055 230.788 60.156 243 37.8121 243H0L39.8406 169.61C54.9168 141.838 84.0279 124.538 115.682 124.538H200.409C220.304 124.538 236.432 108.445 236.432 88.5938C236.432 68.7426 220.304 52.65 200.409 52.65H88.0056C84.161 52.6499 81.7132 48.5495 83.5443 45.1764L90.7971 31.8156C101.439 12.2121 121.988 6.11035e-05 144.332 0H204.468L204.426 0.0776184Z" fill="url(#phHeroP)" />
                <defs>
                  <linearGradient id="phHeroP" x1="289.648" y1="0" x2="61.8683" y2="243.501" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#7DFBFF" />
                    <stop offset="1" stopColor="#00D2D8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Floating card 1 — Time Deposit */}
            <div className="absolute left-0 top-0 z-[2] w-[198px] rounded-[16px] bg-white p-[15px_17px] shadow-[0_20px_44px_-16px_rgba(8,16,40,.5)]">
              <div className="mb-[10px] flex items-center gap-[9px]">
                <span className="flex size-[30px] shrink-0 items-center justify-center rounded-[9px] bg-[#DEF5F0]">
                  <PiggyBank className="size-[17px] text-[#0E9A86]" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[.08em] text-[#6B7488]">
                  Time deposit
                </span>
              </div>
              <div className="font-display text-[25px] font-bold leading-none tracking-[-.02em] text-brand">
                ₱112,400
              </div>
              <div className="mt-[6px] text-[12px] text-[#6B7488]">
                Net maturity · 24-mo term
              </div>
            </div>

            {/* Floating card 3 — Withholding tax */}
            <div className="absolute bottom-[15%] left-[6%] z-[2] flex items-center gap-[11px] rounded-[14px] bg-[#F6CE4C] p-[12px_15px] shadow-[0_20px_44px_-16px_rgba(120,90,10,.45)]">
              <span className="flex size-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#11233F]">
                <Percent className="size-[19px] text-white" />
              </span>
              <div className="leading-[1.1]">
                <div className="text-[11.5px] font-semibold text-[#7A6320]">
                  Withholding tax
                </div>
                <div className="mt-[2px] font-display text-[19px] font-bold text-[#1A1304]">
                  15% bracket
                </div>
              </div>
            </div>

            {/* Floating card 2 — High-yield */}
            <div className="absolute bottom-0 right-0 z-[2] w-[200px] rounded-[16px] bg-[#A7E9C9] p-[14px_16px] shadow-[0_20px_44px_-16px_rgba(10,90,50,.45)]">
              <div className="flex items-center justify-between gap-[10px]">
                <div className="leading-none">
                  <div className="font-display text-[21px] font-bold text-[#0B3A28]">
                    High-yield
                  </div>
                  <div className="mt-[5px] text-[12px] text-[#1E6B4A]">
                    savings &amp; deposits
                  </div>
                </div>
                <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[11px] bg-[#0E9A86]">
                  <TrendingUp className="size-[19px] text-white" />
                </span>
              </div>
              <div className="mt-[11px] inline-flex items-center rounded-full bg-white/60 px-3 py-1 text-[12px] font-bold text-[#0B3A28]">
                Compare rates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <div className="mb-[clamp(28px,4vw,40px)] grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.name}
              href={c.href}
              className="group flex items-center gap-[13px] rounded-[16px] border border-[#E7EBF3] bg-white p-[16px_18px] shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-all duration-150 hover:-translate-y-[3px] hover:border-[#BCC9F4] hover:shadow-[0_14px_30px_-18px_rgba(21,53,199,.35)]"
            >
              <span className="flex size-[44px] shrink-0 items-center justify-center rounded-[12px] bg-[#EAF0FF]">
                <Icon className="size-[22px] text-brand" />
              </span>
              <div className="leading-[1.2]">
                <div className="text-base font-bold text-[#0E1525]">{c.name}</div>
                <div className="mt-[3px] text-[13.5px] text-[#6B7488]">{c.count}</div>
              </div>
              <ArrowRight className="ml-auto size-4 text-[#C4CCDB]" />
            </Link>
          );
        })}
      </div>

      {/* POPULAR TOOLS */}
      <SectionHeading
        eyebrow="Popular tools"
        title="The tools Filipinos reach for most"
        lead="Jump straight to the calculators and reference tables people search for every day."
      />
      <div className="mb-[clamp(34px,5vw,52px)] grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {popularTools.map((t) => {
          const Icon = t.icon;
          const a = ACCENT[t.accent];
          const b = BADGE[t.badge];
          return (
            <Link
              key={t.title}
              href={t.href}
              className="group flex min-h-[212px] flex-col rounded-[18px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-all duration-150 hover:-translate-y-[3px]"
              style={{ ["--accB" as string]: a.border, ["--accS" as string]: a.shadow }}
            >
              <div className="mb-4 flex items-center justify-between gap-[14px]">
                <span
                  className="flex size-[52px] shrink-0 items-center justify-center rounded-[14px]"
                  style={{ background: a.chip }}
                >
                  <Icon className="size-6" style={{ color: a.ink }} />
                </span>
                <span
                  className="rounded-[6px] px-[9px] py-1 text-[11px] font-bold uppercase tracking-[.06em]"
                  style={{ background: b.bg, color: b.ink }}
                >
                  {t.badge}
                </span>
              </div>
              <div className="mb-2 font-display text-[19px] font-semibold leading-[1.25] text-[#0E1525]">
                {t.title}
              </div>
              <p className="mb-[18px] flex-1 text-[15px] leading-[1.55] text-[#5A6478]">
                {t.desc}
              </p>
              <div className="inline-flex items-center gap-2 text-[15px] font-bold text-brand">
                Open
                <ArrowRight className="size-4" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* SAVINGS SPOTLIGHT */}
      <section className="mb-[clamp(34px,5vw,52px)] rounded-[22px] border border-[#E7EBF3] bg-white p-[clamp(24px,3.4vw,38px)] shadow-[0_1px_2px_rgba(16,24,40,.04)]">
        <div className="mb-[22px] flex flex-wrap items-end justify-between gap-[14px]">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#DEF5F0] px-[11px] py-[5px] text-[13px] font-bold uppercase tracking-[.06em] text-[#0E9A86]">
              <Sparkles className="size-[15px]" />
              Savings &amp; digital bank rates
            </div>
            <h2 className="max-w-[30ch] font-display text-[clamp(22px,2.6vw,30px)] font-semibold tracking-[-.02em] text-[#0E1525]">
              Compare the best savings and digital bank rates in 2026
            </h2>
            <p className="mt-[9px] max-w-[64ch] text-base leading-[1.55] text-[#5A6478]">
              Many PesoHub visitors are looking for where their savings can earn
              more. Start with updated savings account rates, digital bank rates,
              and time deposit comparisons.
            </p>
          </div>
          <Link
            href="/rates"
            className="inline-flex shrink-0 items-center gap-[9px] rounded-[12px] bg-brand px-[22px] py-[13px] text-[15px] font-bold text-white"
          >
            Compare all rates
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
          {savingsCards.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.title}
                href={s.href}
                className="flex flex-col rounded-[16px] border border-[#E7EBF3] bg-[#F7F9FD] p-5 transition-all duration-150 hover:-translate-y-[3px] hover:border-[#A7E2D6] hover:shadow-[0_14px_30px_-18px_rgba(14,154,134,.4)]"
              >
                <span className="mb-[14px] flex size-[42px] shrink-0 items-center justify-center rounded-[12px] bg-[#DEF5F0]">
                  <Icon className="size-5 text-[#0E9A86]" />
                </span>
                <div className="mb-[6px] text-[16.5px] font-bold leading-[1.3] text-[#0E1525]">
                  {s.title}
                </div>
                <p className="mb-[14px] flex-1 text-[14.5px] leading-[1.5] text-[#6B7488]">
                  {s.desc}
                </p>
                <div className="inline-flex items-center gap-[7px] text-[14.5px] font-bold text-[#0E9A86]">
                  {s.cta}
                  <ArrowRight className="size-[15px]" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* DIGITAL BANK RATE SEARCHES */}
      <SectionHeading
        eyebrow="Digital bank rates"
        title="Popular digital bank rate searches"
        lead="The digital bank rates Filipinos look up most for 2026 — jump straight to each bank on our digital bank rates page."
      />
      <div className="mb-[clamp(34px,5vw,52px)] flex flex-wrap gap-[10px]">
        {bankSearches.map((label) => (
          <Link
            key={label}
            href={DIGITAL_BANK_RATES_HREF}
            className="inline-flex items-center gap-2 rounded-full border border-[#E7EBF3] bg-white px-4 py-[10px] text-[14.5px] font-semibold text-[#344054] shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-colors hover:border-[#BCC9F4] hover:bg-[#FBFCFE] hover:text-brand"
          >
            <TrendingUp className="size-[15px] text-[#0E9A86]" />
            {label}
          </Link>
        ))}
      </div>

      {/* REFERENCE TABLES */}
      <SectionHeading
        eyebrow="2026 reference tables"
        title="Up-to-date tables, reviewed regularly"
        lead="Key rates and government tables, with the date each one was last checked."
      />
      <div className="mb-[clamp(34px,5vw,52px)] grid gap-[14px] sm:grid-cols-2 lg:grid-cols-3">
        {refTables.map((r) => {
          const Icon = r.icon;
          return (
            <Link
              key={r.title}
              href={r.href}
              className="flex flex-col rounded-[16px] border border-[#E7EBF3] bg-white p-5 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-all duration-150 hover:-translate-y-[3px] hover:border-[#BCC9F4] hover:shadow-[0_14px_30px_-18px_rgba(21,53,199,.32)]"
            >
              <div className="mb-[14px] flex items-center gap-3">
                <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[11px] bg-[#EAF0FF]">
                  <Icon className="size-5 text-brand" />
                </span>
                <span className="text-base font-bold leading-[1.3] text-[#0E1525]">
                  {r.title}
                </span>
              </div>
              <div className="inline-flex items-center gap-[7px] self-start rounded-full bg-[#F1F5FB] px-[11px] py-[5px] text-[12.5px] font-semibold text-[#5A6478]">
                <Clock className="size-[13px]" />
                Updated {formatDate(r.updated)}
              </div>
            </Link>
          );
        })}
      </div>

      {/* WHY PESOHUB */}
      <section className="mb-[clamp(28px,4vw,40px)] rounded-[22px] border border-[#E2E8F6] bg-[linear-gradient(150deg,#EEF2FB,#F4F6FB)] p-[clamp(26px,3.6vw,40px)]">
        <h2 className="mb-[6px] text-center font-display text-[clamp(22px,2.6vw,30px)] font-semibold tracking-[-.02em] text-[#0E1525]">
          Why people use PesoHub
        </h2>
        <p className="mx-auto mb-[26px] max-w-[60ch] text-center text-base leading-[1.55] text-[#5A6478]">
          Built for everyday money questions in the Philippines — clear, current,
          and free.
        </p>
        <div className="grid gap-[18px] lg:grid-cols-3">
          {whyCards.map((w) => {
            const Icon = w.icon;
            return (
              <div
                key={w.title}
                className="rounded-[16px] border border-[#E7EBF3] bg-white p-6 text-center"
              >
                <span className="mb-[14px] inline-flex size-[52px] items-center justify-center rounded-[14px] bg-[#EAF0FF]">
                  <Icon className="size-6 text-brand" />
                </span>
                <div className="mb-[7px] text-[17px] font-bold text-[#0E1525]">
                  {w.title}
                </div>
                <p className="text-[14.5px] leading-[1.6] text-[#6B7488]">
                  {w.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* DISCLAIMER */}
      <div className="mb-[clamp(28px,4vw,40px)] flex items-start gap-3 rounded-[14px] border border-[#F0E2BE] bg-[#FFF8E8] p-[15px_18px]">
        <TriangleAlert className="mt-[2px] size-[18px] shrink-0 text-[#C99A22]" />
        <p className="text-[14px] leading-[1.6] text-[#7A6320]">
          Figures, rates, and reference details may change over time and can vary
          by provider, product, or official source. Always confirm final details
          directly with the relevant bank or government agency.
        </p>
      </div>

      {/* FAQ */}
      <div className="mb-6">
        <FaqSection faqs={homeFaqs} />
      </div>
    </div>
  );
}
