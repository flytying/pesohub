import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
      <Card className="h-full transition-shadow duration-200 hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs font-medium">
              {category}
            </Badge>
            <ArrowRight className="size-4 text-muted-foreground/50 transition-colors group-hover:text-foreground" />
          </div>
          <CardTitle className="mt-2 text-base">{title}</CardTitle>
          <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
