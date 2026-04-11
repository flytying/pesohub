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

interface BlogCardProps {
  post: BlogPostEntry;
  /** If true, renders without border (for colored backgrounds) */
  hasBg?: boolean;
}

export function BlogCard({ post, hasBg = false }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex h-full flex-col rounded-xl bg-white p-6 transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] ${
        hasBg ? "" : "border border-gray-200"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-brand/10 px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-brand">
          {categoryLabels[post.category] || post.category}
        </span>
        <span className="flex items-center gap-1 text-[12px] text-gray-300">
          <Clock className="size-3" />
          {post.readTime} min read
        </span>
      </div>

      <h3 className="mt-3 text-[20px] font-semibold leading-[26px] text-gray-500 group-hover:text-brand">
        {post.title}
      </h3>

      <p className="mt-2 flex-1 text-[16px] leading-[22px] text-gray-400">
        {post.excerpt}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[14px] text-gray-300">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <ArrowRight className="size-4 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-brand" />
      </div>
    </Link>
  );
}
