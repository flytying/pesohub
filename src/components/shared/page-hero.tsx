import Link from "next/link";
import { Clock } from "lucide-react";
import { formatDate } from "@/lib/formatters";

interface PageHeroProps {
  title: string;
  description: string;
  badge?: string;
  /** Label prefix for the badge date (default: "Updated") */
  badgeLabel?: string;
  breadcrumbs: { label: string; href?: string }[];
  /** Retained for API compatibility — detail headers are light in the new design. */
  variant?: "default" | "dark";
  /** Retained for API compatibility — no longer rendered. */
  image?: { src: string; alt: string };
}

/**
 * PageHero — the light detail-page header from the design: a breadcrumb
 * trail, a Space Grotesk display H1, a lead paragraph, and an optional
 * "Updated <date>" stamp. Sits at the top of the 1240px content column.
 */
export function PageHero({
  title,
  description,
  badge,
  badgeLabel = "Updated",
  breadcrumbs,
}: PageHeroProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-2 pt-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-[14px]">
        <ol className="flex flex-wrap items-center gap-2 text-[14px]">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-[#C4CCDB]">/</span>}
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className="text-[#5A6478]"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="font-bold text-brand transition-colors hover:text-brand-light"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <h1 className="font-display text-[clamp(28px,3.4vw,40px)] font-semibold leading-[1.1] tracking-[-.02em] text-[#0E1525]">
        {title}
      </h1>
      <p className="mt-[10px] max-w-[72ch] text-[17px] leading-[1.55] text-[#5A6478]">
        {description}
      </p>
      {badge && (
        <div className="mt-[14px] inline-flex items-center gap-2 text-[14px] text-[#6B7488]">
          <Clock className="size-[15px]" />
          {badgeLabel} {formatDate(badge)}
        </div>
      )}
    </div>
  );
}
