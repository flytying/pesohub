"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from "recharts";
import { formatPeso } from "@/lib/formatters";

interface LoanDonutChartProps {
  principal: number;
  interest: number;
}

const COLORS = ["#2180FF", "rgba(255,255,255,0.35)"]; // Principal (brand blue), Interest (muted)

export function LoanDonutChart({ principal, interest }: LoanDonutChartProps) {
  const data = [
    { name: "Principal", value: principal },
    { name: "Interest", value: interest },
  ];

  const total = principal + interest;

  if (total <= 0) return null;

  return (
    <div className="relative my-4 print:hidden">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={2}
            dataKey="value"
            strokeWidth={0}
            isAnimationActive={false}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
            <Label
              position="center"
              content={() => (
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                  <tspan x="50%" dy="-0.5em" fill="rgba(255,255,255,0.6)" fontSize="12">
                    Total
                  </tspan>
                  <tspan x="50%" dy="1.4em" fill="#fff" fontSize="14" fontWeight="bold">
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
