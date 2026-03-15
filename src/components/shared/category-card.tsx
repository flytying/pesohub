import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    <Link href={href} className="group block">
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
              <Icon className="size-5" />
            </div>
            {count !== undefined && (
              <span className="text-xs text-muted-foreground">
                {count} {count === 1 ? "tool" : "tools"}
              </span>
            )}
          </div>
          <CardTitle className="mt-3 text-base">{title}</CardTitle>
          <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
