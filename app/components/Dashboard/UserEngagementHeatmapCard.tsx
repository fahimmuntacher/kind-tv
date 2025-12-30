"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

type UserEngagementData = {
  name: string;   // region or user group
  value: number;  // engagement %
};

type Props = {
  data: UserEngagementData[];
  title?: string;
};

export const UserEngagementBarChart = ({
  data,
  title = "User Engagement",
}: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={false}
                domain={[0, "auto"]}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                content={({ payload }) => {
                  if (!payload?.length) return null;
                  const d = payload[0];
                  return (
                    <div className="rounded-lg border bg-white px-3 py-2 text-sm shadow-lg">
                      <p className="font-semibold text-gray-900">{d.name}</p>
                      <p className="text-indigo-600">{d.value}% active</p>
                    </div>
                  );
                }}
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={getBarColor(entry.value)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

/* ---------------- Utils ---------------- */
const getBarColor = (value: number) => {
  if (value >= 80) return "#ef4444"; // red
  if (value >= 60) return "#f97316"; // orange
  if (value >= 40) return "#facc15"; // yellow
  if (value >= 20) return "#22c55e"; // green
  return "#e5e7eb"; // gray
};
