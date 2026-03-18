import { cn } from "@/lib/utils";
import { BookOpen, CalendarCheck, RotateCcw } from "lucide-react";

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

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-muted/30 p-4 text-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <BookOpen className="size-3.5" />
        Source & Freshness
      </div>

      <dl className="mt-3 space-y-2 text-muted-foreground">
        {/* Source */}
        <div className="flex items-start gap-2">
          <dt className="shrink-0 font-medium text-foreground/80 w-28">Source</dt>
          <dd>
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {source}
            </a>
          </dd>
        </div>

        {/* Last Updated */}
        <div className="flex items-start gap-2">
          <dt className="shrink-0 font-medium text-foreground/80 w-28 flex items-center gap-1">
            <CalendarCheck className="size-3" />
            Updated
          </dt>
          <dd>{formatDate(updatedAt)}</dd>
        </div>

        {/* Source Checked */}
        {sourceCheckedAt && sourceCheckedAt !== updatedAt && (
          <div className="flex items-start gap-2">
            <dt className="shrink-0 font-medium text-foreground/80 w-28 flex items-center gap-1">
              <RotateCcw className="size-3" />
              Verified
            </dt>
            <dd>{formatDate(checkedAt)}</dd>
          </div>
        )}

        {/* Review Cadence */}
        {reviewCadence && (
          <div className="flex items-start gap-2">
            <dt className="shrink-0 font-medium text-foreground/80 w-28">Review cycle</dt>
            <dd>{reviewCadence}</dd>
          </div>
        )}

        {/* Change Note */}
        {changeNote && (
          <div className="flex items-start gap-2">
            <dt className="shrink-0 font-medium text-foreground/80 w-28">What changed</dt>
            <dd>{changeNote}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
