import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { UpdateBadge } from "@/components/shared/update-badge";
import { formatDate } from "@/lib/formatters";

interface PageHeroProps {
  title: string;
  description: string;
  badge?: string;
  breadcrumbs: { label: string; href?: string }[];
  /** "default" = light inline header, "dark" = full-width dark hero with grid */
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
      <section className="gradient-hero py-10 text-white sm:py-12">
        <div className="hero-glow" />
        <div className="hero-grid" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb pill */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/50 backdrop-blur-sm">
              {breadcrumbs.map((item, index) => {
                const isLast = index === breadcrumbs.length - 1;
                return (
                  <li key={index} className="flex items-center gap-1.5">
                    {index > 0 && (
                      <ChevronRight className="size-3 shrink-0" aria-hidden="true" />
                    )}
                    {isLast || !item.href ? (
                      <span
                        aria-current={isLast ? "page" : undefined}
                        className={isLast ? "text-white/70" : undefined}
                      >
                        {item.label}
                      </span>
                    ) : (
                      <Link
                        href={item.href}
                        className="transition-colors hover:text-white/80"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
            {description}
          </p>
          {badge && (
            <p className="mt-4 flex items-center gap-1.5 text-xs text-amber-300/60">
              <Clock className="size-3" />
              Updated {formatDate(badge)}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-10 pb-8 pt-2 border-b border-border">
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="size-3.5 shrink-0" aria-hidden="true" />
                )}
                {isLast || !item.href ? (
                  <span aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        {description}
      </p>
      {badge && (
        <div className="mt-4">
          <UpdateBadge date={badge} />
        </div>
      )}
    </section>
  );
}
