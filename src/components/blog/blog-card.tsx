import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPostEntry } from "@/data/blog";

const categoryLabels: Record<string, string> = {
  savings: "Savings",
  investing: "Investing",
  tax: "Tax",
  government: "Government",
  banking: "Banking",
  budgeting: "Budgeting",
  insurance: "Insurance",
  general: "General",
};

const categoryTone: Record<string, { bg: string; ink: string }> = {
  savings: { bg: "#DEF5F0", ink: "#0E9A86" },
  investing: { bg: "#EDE8FC", ink: "#6D4DE0" },
  tax: { bg: "#FBF0DC", ink: "#B7791F" },
  government: { bg: "#EAF0FF", ink: "#1535C7" },
  banking: { bg: "#EAF0FF", ink: "#1535C7" },
  budgeting: { bg: "#DEF5F0", ink: "#0E9A86" },
  insurance: { bg: "#FBE6E7", ink: "#C2484D" },
  general: { bg: "#EEF1F7", ink: "#5A6478" },
};

interface BlogCardProps {
  post: BlogPostEntry;
  /** Retained for API compatibility. */
  hasBg?: boolean;
}

export function BlogCard({ post }: BlogCardProps) {
  const tone = categoryTone[post.category] ?? categoryTone.general;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col rounded-[18px] border border-[#E7EBF3] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.04)] transition-all duration-150 hover:-translate-y-[3px] hover:border-[#C3D0F2] hover:shadow-[0_16px_34px_-20px_rgba(21,53,199,.34)]"
    >
      <div className="flex items-center gap-2">
        <span
          className="rounded-[6px] px-[9px] py-1 text-[11px] font-bold uppercase tracking-[.06em]"
          style={{ background: tone.bg, color: tone.ink }}
        >
          {categoryLabels[post.category] || post.category}
        </span>
        <span className="flex items-center gap-1 text-[12px] text-[#8A93A6]">
          <Clock className="size-3" />
          {post.readTime} min read
        </span>
      </div>

      <h3 className="mt-3 font-display text-[19px] font-semibold leading-[1.3] text-[#0E1525] group-hover:text-brand">
        {post.title}
      </h3>

      <p className="mt-2 flex-1 text-[15px] leading-[1.55] text-[#5A6478]">
        {post.excerpt}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[14px] text-[#8A93A6]">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <ArrowRight className="size-4 text-[#C4CCDB] transition-transform group-hover:translate-x-1 group-hover:text-brand" />
      </div>
    </Link>
  );
}
