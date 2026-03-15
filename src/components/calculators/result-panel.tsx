import { cn } from "@/lib/utils";

interface ResultPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function ResultPanel({ children, className }: ResultPanelProps) {
  return (
    <div
      className={cn(
        "gradient-result p-8 text-white",
        className
      )}
    >
      {children}
    </div>
  );
}
