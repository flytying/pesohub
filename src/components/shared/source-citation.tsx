import { cn } from "@/lib/utils";
import {
  BookOpen,
  CalendarCheck,
  RotateCcw,
  RefreshCw,
  FileText,
  ArrowRight,
} from "lucide-react";

interface SourceCitationProps {
  /** Name of the authoritative source */
  source: string;
  /** URL to the source for verification */
  sourceUrl: string;
  /** ISO date string of last content update */
  updatedAt: string;
  /** ISO date string of last source verification (defaults to updatedAt) */
  sourceCheckedAt?: string;
  /** What changed in the last update */
  changeNote?: string;
  /** Review cadence description, e.g. "every 14 days" */
  reviewCadence?: string;
  className?: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function SourceCitation({
  source,
  sourceUrl,
  updatedAt,
  sourceCheckedAt,
  changeNote,
  reviewCadence,
  className,
}: SourceCitationProps) {
  const checkedAt = sourceCheckedAt || updatedAt;

  const items: {
    icon: React.ElementType;
    label: string;
    value: string;
    href?: string;
  }[] = [
    {
      icon: BookOpen,
      label: "Source",
      value: source,
      href: sourceUrl,
    },
    {
      icon: CalendarCheck,
      label: "Updated",
      value: formatDate(updatedAt),
    },
  ];

  if (sourceCheckedAt && sourceCheckedAt !== updatedAt) {
    items.push({
      icon: RotateCcw,
      label: "Verified",
      value: formatDate(checkedAt),
    });
  }

  if (reviewCadence) {
    items.push({
      icon: RefreshCw,
      label: "Review cycle",
      value: reviewCadence,
    });
  }

  if (changeNote) {
    items.push({
      icon: FileText,
      label: "What changed",
      value: changeNote,
    });
  }

  return (
    <div className={cn("", className)}>
      <h2 className="mb-6 text-[32px] font-medium leading-[48px] text-gray-500">
        Source & Freshness
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          const content = (
            <>
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-50 text-brand">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] text-gray-300">{item.label}</p>
                <p className="text-[16px] font-semibold leading-[22px] text-gray-500">
                  {item.value}
                </p>
              </div>
              {item.href && (
                <ArrowRight className="size-4 shrink-0 text-gray-300 transition-colors group-hover:text-brand" />
              )}
            </>
          );

          if (item.href) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
              >
                {content}
              </a>
            );
          }

          return (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4"
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
