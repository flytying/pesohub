import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  category: string;
}

export function ToolCard({ title, description, href, category }: ToolCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="h-full rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-[14px] font-medium text-gray-400">
            {category}
          </span>
          <ArrowRight className="size-4 text-gray-400/50 transition-colors group-hover:text-gray-500" />
        </div>
        <p className="mt-2 text-[16px] font-semibold text-gray-500 group-hover:text-brand">{title}</p>
        <p className="text-[14px] text-gray-400 leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
