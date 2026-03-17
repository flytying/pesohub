import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Landmark,
  TrendingUp,
  Home,
  Calculator,
  BookOpen,
  ScrollText,
  Heart,
} from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqSection } from "@/components/shared/faq-section";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { buttonVariants } from "@/lib/button-variants";
import { JsonLd } from "@/components/seo/json-ld";
import { generatePageMetadata } from "@/lib/seo";
import { generateBreadcrumbSchema } from "@/lib/schema-markup";

export const metadata = generatePageMetadata({
  title:
    "Philippine Government Finance Reference | SSS, BIR, BSP & Pag-IBIG | PesoHub",
  description:
    "Browse Philippine government finance reference pages on PesoHub. Check SSS tables, withholding tax references, BSP exchange-rate guides, and Pag-IBIG information in one place.",
  slug: "government",
});

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Government" },
];

const needCards = [
  {
    icon: Shield,
    title: "SSS contributions or pension",
    description:
      "Use SSS reference pages if you want to check contribution tables, pension-related figures, or contribution rules before using a calculator.",
    href: "#all-pages",
  },
  {
    icon: ScrollText,
    title: "Withholding tax",
    description:
      "Use BIR tax reference pages if you want to review tax brackets, tables, or official tax basis before estimating deductions.",
    href: "#all-pages",
  },
  {
    icon: TrendingUp,
    title: "Exchange rate reference",
    description:
      "Use BSP reference pages if you want to understand official exchange-rate references and how they differ from the rates you may see elsewhere.",
    href: "#all-pages",
  },
  {
    icon: Home,
    title: "Pag-IBIG contributions or housing",
    description:
      "Use Pag-IBIG pages if you want to check the contribution table, review housing-loan reference information, or understand Pag-IBIG payroll deductions.",
    href: "#all-pages",
  },
  {
    icon: Heart,
    title: "PhilHealth contributions",
    description:
      "Use PhilHealth pages if you want to check the premium rate, salary floor and ceiling, or employee and employer share for payroll purposes.",
    href: "#all-pages",
  },
];

const governmentPages = [
  {
    title: "SSS Contribution Table",
    description:
      "Check SSS contribution schedules and contribution-related reference details to better understand required amounts and contribution structure.",
    href: "/government/sss/sss-contribution-guide",
    category: "SSS",
  },
  {
    title: "SSS Pension Table",
    description:
      "Review SSS pension-related reference information to better understand pension figures, contribution history context, and retirement-related estimates.",
    href: "/government/sss/sss-pension-table",
    category: "SSS",
  },
  {
    title: "Withholding Tax Table",
    description:
      "Check withholding tax brackets and reference tables used to understand salary-based tax deductions in the Philippines.",
    href: "/government/bir/withholding-tax-table-philippines",
    category: "BIR",
  },
  {
    title: "BSP Exchange Rate Guide",
    description:
      "Review BSP exchange-rate reference information and understand how official reference rates differ from rates used in actual transactions.",
    href: "/government/bsp/bsp-exchange-rate-guide",
    category: "BSP",
  },
  {
    title: "Pag-IBIG Contribution Table",
    description:
      "Check the current Pag-IBIG contribution table, including employee share, employer share, salary cap, and sample payroll cuts.",
    href: "/government/pag-ibig/pag-ibig-contribution-table-philippines",
    category: "Pag-IBIG",
  },
  {
    title: "Pag-IBIG Housing Loan Guide",
    description:
      "Explore Pag-IBIG housing loan reference information, including key terms, requirements, and government-backed housing loan context.",
    href: "/government/pag-ibig/pag-ibig-housing-loan-guide",
    category: "Pag-IBIG",
  },
  {
    title: "PhilHealth Contribution Table",
    description:
      "Check the current PhilHealth premium rate, salary floor, salary ceiling, employee share, employer share, and sample monthly payroll cuts.",
    href: "/government/philhealth/philhealth-contribution-table-philippines",
    category: "PhilHealth",
  },
];

const guidanceItems = [
  {
    condition: "If you want to estimate salary deductions",
    links: [
      {
        label: "Withholding Tax Calculator",
        href: "/calculators/tax/withholding-tax-calculator-philippines",
      },
      {
        label: "Take-Home Pay Calculator",
        href: "/calculators/tax/take-home-pay-calculator-philippines",
      },
    ],
  },
  {
    condition: "If you want to understand SSS contributions more clearly",
    links: [
      {
        label: "SSS Contribution Guide",
        href: "/government/sss/sss-contribution-guide",
      },
    ],
  },
  {
    condition: "If you want plain-language help with tax or deductions",
    links: [{ label: "Guides", href: "/guides" }],
  },
  {
    condition: "If you want a faster estimate instead of reading tables",
    links: [{ label: "Calculators", href: "/calculators" }],
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
    description:
      "Use calculators to estimate deductions, contributions, payments, and savings.",
    href: "/calculators",
    icon: Calculator,
  },
  {
    title: "Guides",
    description:
      "Use guides for plain-language explanations of tax, SSS, and government-related topics.",
    href: "/guides",
    icon: BookOpen,
  },
  {
    title: "Rates",
    description:
      "Browse rate-related pages for exchange rates, savings rates, and other finance references.",
    href: "/rates",
    icon: TrendingUp,
  },
];

export default function GovernmentPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <JsonLd data={generateBreadcrumbSchema(breadcrumbs)} />

      {/* Hero */}
      <PageHero
        title="Philippine Government Finance Reference"
        description="Use this section to check government-related finance references in one place. Browse contribution tables, tax references, exchange-rate references, and Pag-IBIG information that help you verify figures, understand official frameworks, and move to the right calculator or guide faster."
        breadcrumbs={breadcrumbs}
      />

      {/* Start with What You Need to Check */}
      <section className="pt-4">
        <h2 className="mb-6 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Start with what you need to check
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {needCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group block"
              >
                <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-3 text-sm">
                      {card.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* All Government Reference Pages */}
      <section id="all-pages" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          All Government Reference Pages
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Start with the reference page that best matches what you want to
          verify or understand.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          {governmentPages.map((page) => (
            <Card key={page.title} className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground/80">
                    {page.category}
                  </span>
                </div>
                <CardTitle className="mt-2 text-base">{page.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {page.description}
                </CardDescription>
                <div className="mt-3">
                  <Link
                    href={page.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80"
                  >
                    View reference
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Not Sure Where to Go Next */}
      <section className="mt-12 rounded-lg border border-border bg-muted/30 p-6">
        <h2 className="text-sm font-semibold text-foreground">
          Not sure where to go next?
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Choose the next step based on what you want to do after checking a
          reference page.
        </p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {guidanceItems.map((item) => (
            <li key={item.condition}>
              <span className="font-medium text-foreground/80">
                {item.condition}:
              </span>{" "}
              {item.links.map((link, i) => (
                <span key={link.href}>
                  {i > 0 && " or "}
                  <Link
                    href={link.href}
                    className="text-primary hover:underline"
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </li>
          ))}
        </ul>
      </section>

      {/* Related Sections */}
      <section id="related" className="scroll-mt-20 pt-16">
        <h2 className="mb-2 text-lg font-semibold uppercase tracking-wide text-muted-foreground sm:text-base">
          Related Sections
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Need more than a reference page? Explore related tools and explainers
          to help you understand or estimate the numbers you see here.
        </p>
        <div className="grid gap-5 sm:grid-cols-3">
          {relatedSections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.title}
                href={section.href}
                className="group block"
              >
                <Card className="h-full transition-shadow duration-200 hover:shadow-md">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-3 text-sm">
                      {section.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed">
                      {section.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <FaqSection faqs={faqs} />

      {/* Final CTA */}
      <section className="mb-4 rounded-lg border border-border bg-muted/30 p-8 text-center sm:p-10">
        <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
          Check the reference, then take the next step
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Use government reference pages to verify tables, brackets, and
          schedules. Then move to a calculator for estimates or a guide for
          plain-language explanations.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#all-pages"
            className={buttonVariants({ className: "font-medium" })}
          >
            Browse reference pages
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/calculators"
            className={buttonVariants({
              variant: "outline",
              className: "font-medium",
            })}
          >
            Explore calculators
          </Link>
        </div>
      </section>
    </div>
  );
}
