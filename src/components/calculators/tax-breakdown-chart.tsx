"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from "recharts";
import { formatPeso } from "@/lib/formatters";

interface TaxBreakdownChartProps {
  tax: number;
  takeHome: number;
}

const COLORS = ["#00D2D8", "#093CB5"]; // Tax (accent-cyan), Take-home (brand blue)

export function TaxBreakdownChart({ tax, takeHome }: TaxBreakdownChartProps) {
  const data = [
    { name: "Tax", value: tax },
    { name: "Take-Home", value: takeHome },
  ];

  const total = tax + takeHome;

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
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
            <Label
              position="center"
              content={() => (
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
                  <tspan x="50%" dy="-0.5em" fill="#9CA3AF" fontSize="12">
                    Annual
                  </tspan>
                  <tspan x="50%" dy="1.4em" fill="#28314B" fontSize="14" fontWeight="bold">
                    {formatPeso(total, 0)}
                  </tspan>
                </text>
              )}
            />
          </Pie>
          <Tooltip
            formatter={(value) => formatPeso(Number(value))}
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #CFD5E4",
              backgroundColor: "#fff",
              color: "#28314B",
              boxShadow: "0 4px 12px rgb(0 0 0 / 0.04)",
              fontSize: "14px",
            }}
            itemStyle={{ color: "#28314B" }}
            labelStyle={{ color: "#474F66" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
