"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

type ChannelData = {
  name: string;
  viewers: number;
  color?: string; // optional custom color
};

interface TopChannelsChartProps {
  data: ChannelData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border rounded-lg p-3 shadow-lg text-sm">
        <p className="font-semibold">{label}</p>
        <p className="text-indigo-600">{payload[0].value} viewers</p>
      </div>
    );
  }
  return null;
};

const TopChannelsChart: React.FC<TopChannelsChartProps> = ({ data }) => {
  const colors = ["#6366F1", "#10B981", "#F59E0B", "#3B82F6", "#EC4899", "#F43F5E"];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-sm border-2 border-gray-200 w-full">
      <h2 className="text-xl font-bold mb-6 text-gray-700">Top Watching Channels</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="name"
            tick={{ fill: "#374151", fontSize: 14, fontWeight: 500 }}
            axisLine={{ stroke: "#D1D5DB" }}
          />
          <YAxis
            tick={{ fill: "#374151", fontSize: 14, fontWeight: 500 }}
            axisLine={{ stroke: "#D1D5DB" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="viewers" radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopChannelsChart;
