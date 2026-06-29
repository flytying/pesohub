import Link from "next/link";
import { Calendar } from "lucide-react";
import type { ReactNode } from "react";

interface LegalSection {
  heading: string;
  body: ReactNode;
}

interface LegalPageProps {
  title: string;
  /** Label shown in the breadcrumb trail (defaults to title). */
  breadcrumbLabel?: string;
  lastUpdated: string;
  intro?: ReactNode;
  sections: LegalSection[];
}

/**
 * LegalPage — shared layout for Privacy, Terms, and Disclaimer: a light
 * PageHero-style header (breadcrumb, display H1, "Last updated" stamp, lead)
 * followed by a single white card whose sections are divided by hairlines.
 */
export function LegalPage({
  title,
  breadcrumbLabel,
  lastUpdated,
  intro,
  sections,
}: LegalPageProps) {
  return (
    <>
      {/* Hero header */}
      <section className="mx-auto max-w-[1240px] px-[clamp(20px,3vw,36px)] pb-2 pt-8">
        <nav aria-label="Breadcrumb" className="mb-[14px]">
          <ol className="flex flex-wrap items-center gap-2 text-[14px]">
            <li>
              <Link
                href="/"
                className="font-bold text-brand transition-colors hover:text-brand-light"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#C4CCDB]">/</span>
              <span aria-current="page" className="text-[#5A6478]">
                {breadcrumbLabel ?? title}
              </span>
            </li>
          </ol>
        </nav>
        <h1 className="font-display text-[clamp(28px,3.4vw,40px)] font-semibold leading-[1.1] tracking-[-.02em] text-[#0E1525]">
          {title}
        </h1>
        <div className="mt-[14px] inline-flex items-center gap-2 text-[14px] text-[#6B7488]">
          <Calendar className="size-[15px]" />
          Last updated: {lastUpdated}
        </div>
        {intro && (
          <p className="mt-[14px] max-w-[72ch] text-[17px] leading-[1.55] text-[#5A6478]">
            {intro}
          </p>
        )}
      </section>

      <div className="mx-auto max-w-[1240px] px-[clamp(20px,3vw,36px)] pb-20 pt-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 lg:p-10">
          {sections.map((section, index) => (
            <section
              key={section.heading}
              className={
                index > 0 ? "mt-8 border-t border-gray-100 pt-8" : undefined
              }
            >
              <h2 className="text-[clamp(18px,2vw,22px)] font-semibold tracking-[-0.02em] text-[#0E1525]">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[16px] leading-[1.6] text-[#5A6478]">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
