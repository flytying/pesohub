import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { UpdateBadge } from "@/components/shared/update-badge";
import { formatDate } from "@/lib/formatters";

interface PageHeroProps {
  title: string;
  description: string;
  badge?: string;
  breadcrumbs: { label: string; href?: string }[];
  /** "default" = light inline header, "dark" = full-width brand-blue hero */
  variant?: "default" | "dark";
}

export function PageHero({
  title,
  description,
  badge,
  breadcrumbs,
  variant = "default",
}: PageHeroProps) {
  if (variant === "dark") {
    return (
      <section className="bg-brand pb-14 pt-10 text-white sm:pb-16 sm:pt-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb — simple inline text */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-[14px]">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={index} className="flex items-center gap-1.5">
                    {index > 0 && (
                      <ChevronRight className="size-3.5 text-surface-secondary" aria-hidden="true" />
                    )}
                    {isLast || !item.href ? (
                      <span
                        aria-current={isLast ? "page" : undefined}
                        className="text-surface-secondary"
                      >
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-accent-cyan transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <h1 className="text-[32px] font-medium leading-[48px] sm:text-[48px] sm:leading-[48px]">
            {title}
          </h1>
          <p className="mt-3 text-[16px] leading-[22px] text-surface-secondary sm:text-[20px] sm:leading-[26px]">
            {description}
          </p>
          {badge && (
            <p className="mt-4 flex items-center gap-1.5 text-[14px] text-white/70">
              <Clock className="size-3.5" />
              Updated {formatDate(badge)}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-brand pb-14 pt-10 text-white sm:pb-16 sm:pt-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb — simple inline text */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-[14px]">
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={index} className="flex items-center gap-1.5">
                  {index > 0 && (
                    <ChevronRight className="size-3.5 text-surface-secondary" aria-hidden="true" />
                  )}
                  {isLast || !item.href ? (
                    <span
                      aria-current={isLast ? "page" : undefined}
                      className="text-surface-secondary"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-accent-cyan transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <h1 className="text-[32px] font-medium leading-[48px] sm:text-[48px] sm:leading-[48px]">
          {title}
        </h1>
        <p className="mt-3 text-[16px] leading-[22px] text-surface-secondary sm:text-[20px] sm:leading-[26px]">
          {description}
        </p>
        {badge && (
          <div className="mt-4">
            <UpdateBadge date={badge} />
          </div>
        )}
      </div>
    </section>
  );
}
