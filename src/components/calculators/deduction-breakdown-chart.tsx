"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";
import { formatPeso } from "@/lib/formatters";

interface DeductionBreakdownChartProps {
  withholdingTax: number;
  sss: number;
  philhealth: number;
  pagibig: number;
  takeHome: number;
}

const COLORS = [
  "#2180FF", // Take-Home (brand blue)
  "rgba(255,255,255,0.35)", // Tax
  "rgba(76,175,80,0.6)", // SSS (green)
  "rgba(255,152,0,0.6)", // PhilHealth (orange)
  "rgba(156,39,176,0.6)", // Pag-IBIG (purple)
];

export function DeductionBreakdownChart({
  withholdingTax,
  sss,
  philhealth,
  pagibig,
  takeHome,
}: DeductionBreakdownChartProps) {
  const data = [
    { name: "Take-Home", value: takeHome },
    { name: "Withholding Tax", value: withholdingTax },
    { name: "SSS", value: sss },
    { name: "PhilHealth", value: philhealth },
    { name: "Pag-IBIG", value: pagibig },
  ].filter((d) => d.value > 0);

  const total = withholdingTax + sss + philhealth + pagibig + takeHome;

  if (total <= 0) return null;

  return (
    <div className="relative my-4 print:hidden">
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={75}
            paddingAngle={2}
            dataKey="value"
            strokeWidth={0}
            isAnimationActive={false}
          >
            {data.map((entry) => {
              const colorIndex = [
                "Take-Home",
                "Withholding Tax",
                "SSS",
                "PhilHealth",
                "Pag-IBIG",
              ].indexOf(entry.name);
              return (
                <Cell
                  key={entry.name}
                  fill={COLORS[colorIndex] || COLORS[0]}
                />
              );
            })}
            <Label
              position="center"
              content={() => (
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan
                    x="50%"
                    dy="-0.5em"
                    fill="rgba(255,255,255,0.6)"
                    fontSize="12"
                  >
                    Monthly
                  </tspan>
                  <tspan
                    x="50%"
                    dy="1.4em"
                    fill="#fff"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {formatPeso(total, 0)}
                  </tspan>
                </text>
              )}
            />
          </Pie>
          <Tooltip
            formatter={(value) => formatPeso(Number(value))}
            contentStyle={{
              borderRadius: "6px",
              border: "1px solid rgba(255,255,255,0.15)",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              color: "#1a1a2e",
              boxShadow: "0 4px 12px rgb(0 0 0 / 0.25)",
              fontSize: "13px",
            }}
            itemStyle={{ color: "#1a1a2e" }}
            labelStyle={{ color: "#555" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
