import { generatePageMetadata } from "@/lib/seo";
import { SITE_NAME } from "@/config/site";
import { PageHero } from "@/components/shared/page-hero";
import {
  Calculator,
  TrendingUp,
  BookOpen,
  Info,
  TriangleAlert,
  ShieldCheck,
  Users,
  PiggyBank,
  Globe,
  FileCheck,
  RefreshCw,
} from "lucide-react";

export const metadata = generatePageMetadata({
  title: "About",
  description: `Learn about ${SITE_NAME}, a free Philippine finance utility website offering calculators, rate comparisons, and practical money guides for Filipinos.`,
  slug: "about",
});

const offerings = [
  {
    icon: Calculator,
    title: "Calculators",
    description:
      "Free tools for loans, tax, savings, and retirement computations specific to the Philippines.",
  },
  {
    icon: TrendingUp,
    title: "Rate pages",
    description:
      "Current exchange rates and savings account interest rate comparisons from Philippine banks.",
  },
  {
    icon: BookOpen,
    title: "Guides",
    description:
      "Plain-language explanations of tax rules, SSS benefits, and other financial topics that affect Filipino workers and families.",
  },
];

const buildPrinciples = [
  {
    icon: FileCheck,
    title: "Official sources only",
    description:
      "All government data — SSS contribution tables, PhilHealth premiums, Pag-IBIG rates, BIR tax brackets — is sourced directly from official agency publications, circulars, and advisories. We link to the original source on every reference page.",
  },
  {
    icon: RefreshCw,
    title: "Regular review cadence",
    description:
      "Exchange rates update daily. Bank savings rates are reviewed every two weeks. Government contribution tables and tax brackets are checked monthly. Every page shows its last verified date so you know how current the data is.",
  },
  {
    icon: ShieldCheck,
    title: "Calculator formulas cross-checked",
    description:
      "Calculator logic uses standard financial formulas (amortization, compound interest, TRAIN law brackets) and is tested against known outputs. Each calculator page explains the formula used and includes worked examples you can verify.",
  },
  {
    icon: Info,
    title: "Clear disclaimers",
    description:
      "Every reference page and calculator includes a disclaimer making clear that results are estimates for informational purposes. We label what is an official figure versus a computed estimate so you can make informed decisions.",
  },
];

const audiences = [
  {
    icon: Users,
    title: "Employees",
    description:
      "Checking payslip deductions, understanding SSS and PhilHealth contributions, or estimating take-home pay after tax.",
  },
  {
    icon: PiggyBank,
    title: "Savers & investors",
    description:
      "Comparing bank savings rates, estimating time deposit returns, or calculating how much to save each month for a goal.",
  },
  {
    icon: Calculator,
    title: "Loan applicants",
    description:
      "Estimating monthly car loan, home loan, or personal loan payments before applying. Comparing offers from different lenders.",
  },
  {
    icon: Globe,
    title: "OFWs & self-employed",
    description:
      "Checking exchange rates, computing voluntary SSS or Pag-IBIG contributions, or understanding how government benefits work.",
  },
];

const cardBase = "rounded-xl border border-gray-100 bg-surface-tertiary p-6";
const iconWrap =
  "flex size-11 items-center justify-center rounded-xl bg-surface-secondary text-brand";
const sectionCard =
  "rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 lg:p-10";

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`About ${SITE_NAME}`}
        description={`${SITE_NAME} is a free finance utility website built for Filipinos who need quick, practical answers to everyday money questions — from loan payments and exchange rates to tax deductions and government contributions.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        containerClassName="max-w-[1240px] px-[clamp(20px,3vw,36px)]"
      />

      <div className="mx-auto max-w-[1240px] space-y-6 px-[clamp(20px,3vw,36px)] pb-20 pt-6">
        {/* Our mission */}
        <section className={sectionCard}>
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Our mission
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            We believe financial information should be clear, accessible, and
            practical. Too many finance websites are cluttered with ads, buried
            in long articles, or hard to use on mobile. {SITE_NAME} puts the
            calculator, table, or answer first — then provides the explanation.
          </p>
          <p className="mt-4 text-[16px] leading-[1.6] text-[#5A6478]">
            Every tool and page is designed to help you move faster — whether you
            are comparing savings rates before opening an account, estimating your
            take-home pay, or verifying SSS contribution amounts from a payslip.
          </p>
        </section>

        {/* What we offer */}
        <section className={sectionCard}>
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            What we offer
          </h2>
          <p className="mt-3 text-[16px] leading-[1.6] text-[#5A6478]">
            Tools, rates, and guides designed to help you make smarter financial
            decisions in the Philippines.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={cardBase}>
                  <div className={iconWrap}>
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-[18px] font-semibold leading-[24px] text-[#0E1525]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-[#5A6478]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How we build and verify content */}
        <section className={sectionCard}>
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            How we build and verify content
          </h2>
          <p className="mt-3 text-[16px] leading-[1.6] text-[#5A6478]">
            Every page on {SITE_NAME} follows a consistent editorial process
            designed to keep financial information accurate and up to date.
            Because this site covers topics that directly affect people&apos;s
            money — tax deductions, government contributions, loan payments, and
            savings rates — we take accuracy seriously.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {buildPrinciples.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={cardBase}>
                  <div className={iconWrap}>
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-[18px] font-semibold leading-[24px] text-[#0E1525]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-[#5A6478]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Who this site is for */}
        <section className={sectionCard}>
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Who this site is for
          </h2>
          <p className="mt-3 text-[16px] leading-[1.6] text-[#5A6478]">
            {SITE_NAME} is built for anyone in the Philippines who needs clear,
            practical answers to everyday financial questions.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={cardBase}>
                  <div className={iconWrap}>
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-[18px] font-semibold leading-[24px] text-[#0E1525]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-[#5A6478]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Important disclaimer */}
        <section>
          <h2 className="text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
            Important disclaimer
          </h2>
          <div className="mt-6 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-6">
            <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-500" />
            <p className="text-[16px] leading-[1.6] text-[#5A6478]">
              {SITE_NAME} is an independent website and is not affiliated with any
              bank, government agency, or financial institution. The information
              provided is for educational and informational purposes only. It should
              not be considered professional financial advice. Always consult with a
              qualified financial advisor before making important financial decisions.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
