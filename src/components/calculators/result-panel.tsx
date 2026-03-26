import { cn } from "@/lib/utils";

interface ResultPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function ResultPanel({ children, className }: ResultPanelProps) {
  return (
    <div
      className={cn(
        "border-r border-gray-200 bg-white p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
