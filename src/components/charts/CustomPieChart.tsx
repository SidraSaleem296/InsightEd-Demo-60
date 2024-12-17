"use client";

import { ActivityEntry } from "@/types";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import React from "react";
import { Card } from "@/components/ui/card";

interface CustomPieChartProps {
  data: ActivityEntry[];
  title: string;
}

export function CustomPieChart({ data, title }: CustomPieChartProps) {
  const colors = data.map((entry) => entry.color); // Extract colors from data

  return (
    <div className="bg-gray-900 p-4 rounded shadow-md">
      <h3 className="text-center text-lg font-semibold text-white mb-4">
        {title}
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-center">
        {/* Chart Container */}
        <ResponsiveContainer width="50%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              // stroke="black"
              strokeWidth={1}
              labelLine={false}
              label={({ name }) => ""}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                color: "#FFFFFF",
                borderRadius: "5px",
                fontSize: "0.9rem",
              }}
              itemStyle={{
                color: "#FFFFFF", // Ensure tooltip items have white text
              }}
              formatter={(value, name) => [`${value}`, `${name}`]}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Labels */}
        <div className="mt-4 md:mt-0 md:ml-4 text-sm">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center mb-2">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-white">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
