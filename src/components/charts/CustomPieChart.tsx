// src/components/CustomPieChart.tsx

"use client";

import { Card } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface PieChartProps {
  data: { name: string; count: number; color: string }[];
  title: string;
}

export function CustomPieChart({ data, title }: PieChartProps) {
  return (
    <Card className="grid grid-cols-1 p-2 md:grid-cols-2">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            stroke="black"
            strokeWidth={1}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, entry) => [entry.payload.count, entry.payload.name]}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {data.map((entry, index) => (
            <div key={`label-${index}`} className="mb-2 flex items-center text-sm">
              <span
                className="mr-2 inline-block h-4 w-4 shadow-sm"
                style={{ backgroundColor: entry.color }}
              ></span>
              {entry.name}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
