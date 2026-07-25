"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { day: "Mon", revenue: 18400 },
  { day: "Tue", revenue: 22100 },
  { day: "Wed", revenue: 19800 },
  { day: "Thu", revenue: 27600 },
  { day: "Fri", revenue: 31200 },
  { day: "Sat", revenue: 40500 },
  { day: "Sun", revenue: 35300 },
];

export default function SalesChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={salesData}
          margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
        >
          <defs>
            <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F68B1F" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#F68B1F" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#F0EDE6"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 12, fill: "#6B6558" }}
            axisLine={{ stroke: "#F0EDE6" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6B6558" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `৳${v / 1000}k`}
          />
          <Tooltip
            formatter={(value) => [
              `৳${Number(value ?? 0).toLocaleString()}`,
              "Revenue",
            ]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #F0EDE6",
              fontSize: 13,
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#F68B1F"
            strokeWidth={2.5}
            fill="url(#salesFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
