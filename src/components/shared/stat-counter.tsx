interface StatCounterProps {
  value: string;
  label: string;
}

export function StatCounter({ value, label }: StatCounterProps) {
  return (
    <div className="rounded-lg bg-white/10 px-4 py-3 backdrop-blur-sm">
      <div className="text-2xl font-bold tabular-nums">{value}</div>
      <div className="text-xs text-white/70">{label}</div>
    </div>
  );
}
