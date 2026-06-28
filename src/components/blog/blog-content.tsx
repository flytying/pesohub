import Link from "next/link";
import { Info, TriangleAlert, Lightbulb } from "lucide-react";
import type { BlogSection } from "@/types/content";

const calloutConfig = {
  info: {
    icon: Info,
    border: "border-[#D3DEFA]",
    bg: "bg-[#EAF0FF]",
    tile: "bg-[#D3DEFA]",
    iconColor: "text-brand",
  },
  warning: {
    icon: TriangleAlert,
    border: "border-amber-300",
    bg: "bg-amber-50",
    tile: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  tip: {
    icon: Lightbulb,
    border: "border-brand/30",
    bg: "bg-brand/5",
    tile: "bg-brand/15",
    iconColor: "text-brand",
  },
};

// Tone a rate pill green/indigo/amber by the leading percentage in the cell.
function ratePillClass(rate: string): string {
  const base =
    "inline-flex rounded-[8px] px-[11px] py-1 font-display text-[13px] font-bold";
  const n = parseFloat(rate.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(n)) return `${base} bg-[#E7E9FB] text-[#3D49C4]`;
  if (n >= 4) return `${base} bg-[#E3F6ED] text-[#0B7E6E]`;
  if (n >= 1) return `${base} bg-[#E7E9FB] text-[#3D49C4]`;
  return `${base} bg-[#FBF0DC] text-[#9A6A12]`;
}

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case "heading":
      if (section.level === 3) {
        return (
          <h3
            key={index}
            className="mt-10 text-[20px] font-semibold leading-[26px] text-[#0E1525]"
          >
            {section.heading}
          </h3>
        );
      }
      return (
        <h2
          key={index}
          className="mt-16 text-[clamp(20px,2.2vw,25px)] font-semibold tracking-[-0.02em] text-[#0E1525]"
        >
          {section.heading}
        </h2>
      );

    case "paragraph":
      return (
        <p
          key={index}
          className="mt-4 text-[16px] leading-[1.6] text-[#344054]"
        >
          {section.content}
        </p>
      );

    case "list":
      return (
        <ul key={index} className="mt-4 space-y-2">
          {section.items?.map((item, i) => (
            <li
              key={i}
              className="flex gap-2 text-[16px] leading-[1.6] text-[#344054]"
            >
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gray-300" />
              {item}
            </li>
          ))}
        </ul>
      );

    case "ordered-list":
      return (
        <ol key={index} className="mt-5 flex flex-col gap-[14px]">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-[14px]">
              <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-[#EAF0FF] font-display text-[15px] font-bold text-brand">
                {i + 1}
              </span>
              <span className="pt-[3px] text-[16px] leading-[1.65] text-[#344054]">
                {/* Drop a redundant "Step N —" prefix; the badge already numbers it. */}
                {item.replace(/^Step\s+\d+\s*[—–-]\s*/, "")}
              </span>
            </li>
          ))}
        </ol>
      );

    case "table": {
      const columns = section.columns ?? [];
      const rows = section.rows ?? [];
      const n = columns.length || rows[0]?.length || 0;
      // 3-column tables are bank rankings: bank · rate · conditions, with a
      // toned rate pill and a wider conditions column. Anything else is a
      // generic comparison grid with equal columns.
      const ranking = n === 3;
      const template = ranking
        ? "minmax(116px,1.1fr) minmax(92px,0.7fr) minmax(220px,1.5fr)"
        : `minmax(140px,1.1fr) repeat(${Math.max(n - 1, 1)}, minmax(150px,1fr))`;
      const minWidth = ranking ? 560 : Math.max(n, 1) * 170;
      return (
        <div
          key={index}
          className="mt-6 overflow-x-auto rounded-[14px] border border-[#E0E6F2]"
        >
          <div style={{ minWidth }}>
            {/* Header */}
            <div
              className="grid gap-3 border-b border-[#E0E6F2] bg-[#EEF2FB] px-[18px] py-[13px] text-[11px] font-bold uppercase tracking-[.05em] text-[#56607A]"
              style={{ gridTemplateColumns: template }}
            >
              {columns.map((c, i) => (
                <span key={i}>{c}</span>
              ))}
            </div>
            {/* Rows */}
            {rows.map((row, ri) => (
              <div
                key={ri}
                className={`grid items-center gap-3 px-[18px] py-[14px] ${
                  ri < rows.length - 1 ? "border-b border-[#EEF1F7]" : ""
                } ${ri % 2 === 1 ? "bg-[#FAFBFE]" : ""}`}
                style={{ gridTemplateColumns: template }}
              >
                {row.map((cell, ci) =>
                  ci === 0 ? (
                    <span
                      key={ci}
                      className="font-display text-[14px] font-semibold text-[#0E1525]"
                    >
                      {cell}
                    </span>
                  ) : ranking && ci === 1 ? (
                    <span key={ci}>
                      <span className={ratePillClass(cell)}>{cell}</span>
                    </span>
                  ) : (
                    <span
                      key={ci}
                      className="text-[14px] leading-[1.5] text-[#5A6478]"
                    >
                      {cell}
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "callout": {
      const variant = section.variant || "info";
      const config = calloutConfig[variant];
      const Icon = config.icon;
      return (
        <div
          key={index}
          className={`mt-6 flex items-start gap-[14px] rounded-[16px] border ${config.border} ${config.bg} p-5`}
        >
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-[12px] ${config.tile}`}
          >
            <Icon className={`size-5 ${config.iconColor}`} />
          </span>
          <p className="self-center text-[15.5px] leading-[1.6] text-[#344054]">
            {section.content}
          </p>
        </div>
      );
    }

    case "quote":
      return (
        <blockquote
          key={index}
          className="mt-6 border-l-4 border-brand/30 pl-6 text-[16px] italic leading-[1.6] text-[#475069]"
        >
          {section.content}
        </blockquote>
      );

    case "cta":
      return (
        <div
          key={index}
          className="mt-6 rounded-lg border border-brand/30 bg-brand/5 p-6"
        >
          {section.content && (
            <p className="text-[16px] leading-[1.6] text-[#344054]">
              {section.content}
            </p>
          )}
          {section.links && section.links.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[16px] font-semibold text-brand underline-offset-2 hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );

    default:
      return null;
  }
}

interface BlogContentProps {
  sections: BlogSection[];
}

export function BlogContent({ sections }: BlogContentProps) {
  // The page renders a standardized disclaimer below the article, so drop any
  // in-content "Disclaimer:" callout to avoid showing two near-identical boxes.
  const visible = sections.filter(
    (s) =>
      !(
        s.type === "callout" && /^\s*disclaimer\b/i.test(s.content ?? "")
      ),
  );

  // Group into cards: each level-2 heading starts a new card; everything up to
  // the next H2 (intro paragraphs, H3s, lists, tables, callouts) shares it.
  // Mirrors the calculator pages — one card per content section.
  const groups: BlogSection[][] = [];
  for (const section of visible) {
    const isH2 =
      section.type === "heading" && (section.level ?? 2) === 2;
    if (isH2 || groups.length === 0) groups.push([]);
    groups[groups.length - 1].push(section);
  }

  return (
    <div className="flex flex-col gap-[14px]">
      {groups.map((group, gi) => (
        <section
          key={gi}
          className="rounded-[20px] border border-[#E7EBF3] bg-white p-[clamp(20px,2.5vw,30px)] shadow-[0_1px_2px_rgba(16,24,40,.04)] [&>*:first-child]:mt-0"
        >
          {group.map((section, i) => renderSection(section, i))}
        </section>
      ))}
    </div>
  );
}
