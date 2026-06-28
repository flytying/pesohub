import Link from "next/link";
import { Info, TriangleAlert, Lightbulb } from "lucide-react";
import type { BlogSection } from "@/types/content";

const calloutConfig = {
  info: {
    icon: Info,
    border: "border-gray-200",
    bg: "bg-white",
    iconColor: "text-gray-300",
  },
  warning: {
    icon: TriangleAlert,
    border: "border-amber-300",
    bg: "bg-amber-50",
    iconColor: "text-amber-500",
  },
  tip: {
    icon: Lightbulb,
    border: "border-brand/30",
    bg: "bg-brand/5",
    iconColor: "text-brand",
  },
};

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
        <ol key={index} className="mt-4 space-y-2">
          {section.items?.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-[16px] leading-[1.6] text-[#344054]"
            >
              <span className="shrink-0 font-semibold text-brand">
                {i + 1}.
              </span>
              {item}
            </li>
          ))}
        </ol>
      );

    case "callout": {
      const variant = section.variant || "info";
      const config = calloutConfig[variant];
      const Icon = config.icon;
      return (
        <div
          key={index}
          className={`mt-6 flex gap-3 rounded-lg border ${config.border} ${config.bg} p-6`}
        >
          <Icon
            className={`mt-0.5 size-5 shrink-0 ${config.iconColor}`}
          />
          <p className="text-[16px] leading-[1.6] text-[#344054]">
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
  return (
    <>
      {sections.map((section, i) => (
        <span key={i} className="contents">
          {renderSection(section, i)}
        </span>
      ))}
    </>
  );
}
