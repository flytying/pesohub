import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { UpdateBadge } from "@/components/shared/update-badge";

interface PageHeroProps {
  title: string;
  description: string;
  badge?: string;
  breadcrumbs: { label: string; href?: string }[];
}

export function PageHero({
  title,
  description,
  badge,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <section className="mb-10 pb-8 pt-2 border-b border-border">
      <Breadcrumbs items={breadcrumbs} />
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
