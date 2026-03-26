import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  count?: number;
}

export function CategoryCard({
  title,
  description,
  href,
  icon: Icon,
  count,
}: CategoryCardProps) {
  return (
    <Link href={href} className="group block h-full text-center">
      <div className="flex h-full flex-col items-center">
        <Icon className="size-16 text-gray-400" strokeWidth={1.2} />
        <h3 className="mt-4 text-[20px] font-semibold leading-[26px] text-gray-500">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-[16px] leading-relaxed text-gray-400">
          {description}
        </p>
        {count !== undefined && (
          <span className="mt-4 inline-block rounded-full bg-brand px-5 py-2.5 text-[14px] font-bold uppercase tracking-wide text-white">
            {count} {count === 1 ? "tool" : "tools"}
          </span>
        )}
      </div>
    </Link>
  );
}
