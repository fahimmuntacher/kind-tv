"use client";

import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

type HeatmapCell = {
  day: string;
  hour: string;
  engagement: number;
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 24 }, (_, i) => i);

const generateMockData = (): HeatmapCell[] => {
  const data: HeatmapCell[] = [];
  days.forEach((day) => {
    hours.forEach((hour) => {
      data.push({
        day,
        hour: `${hour.toString().padStart(2, "0")}:00`,
        engagement: Math.floor(Math.random() * 100),
      });
    });
  });
  return data;
};

const engagementData = generateMockData();

export default function AnalyticsSuggestions() {
  const [selectedTime, setSelectedTime] = useState<{
    day: string;
    hour: string;
  } | null>(null);

  const getColor = (value: number) => {
    if (value < 20) return "bg-gray-200";
    if (value < 40) return "bg-indigo-300";
    if (value < 60) return "bg-indigo-400";
    if (value < 80) return "bg-indigo-600";
    return "bg-indigo-800 text-white";
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border max-w-full">
      <h2 className="text-lg sm:text-2xl font-bold mb-2">
        Analytics-Driven Smart Suggestions
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        Optimal posting times based on engagement.
      </p>

      {/* HEATMAP */}
      <div className="flex w-full overflow-x-auto">
        {/* DAY COLUMN */}
        <div className="flex-shrink-0 w-[72px] bg-white">
          <div className="h-8" />
          {days.map((day) => (
            <div
              key={day}
              className="h-10 sm:h-11 flex items-center justify-end pr-2 text-sm font-medium text-gray-700"
            >
              {day}
            </div>
          ))}
        </div>

        {/* GRID */}
        <div className="flex-shrink-0">
          <div
            className="grid gap-2"
            style={{
              gridTemplateColumns: "repeat(24, 42px)",
            }}
          >
            {/* HOURS */}
            {hours.map((h) => (
              <div
                key={`h-${h}`}
                className="h-8 text-[10px] font-semibold text-gray-600 flex items-center justify-center"
              >
                {h}:00
              </div>
            ))}

            {/* CELLS */}
            {days.map((day) =>
              hours.map((h) => {
                const hourStr = `${h.toString().padStart(2, "0")}:00`;
                const cell = engagementData.find(
                  (c) => c.day === day && c.hour === hourStr
                )!;

                return (
                  <button
                    key={`${day}-${h}`}
                    onClick={() => setSelectedTime({ day, hour: hourStr })}
                    className={`w-10 h-10 rounded-lg ${getColor(
                      cell.engagement
                    )} hover:scale-110 transition flex items-center justify-center text-xs font-bold`}
                    data-tooltip-id="heatmap-tooltip"
                    data-tooltip-content={`${day} ${hourStr}: ${cell.engagement}%`}
                  >
                    {cell.engagement > 75 && "🔥"}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center mt-3 sm:hidden">
        ← Scroll horizontally →
      </p>

      <Tooltip id="heatmap-tooltip" place="top" className="!text-xs z-50" />

      {selectedTime && (
        <div className="mt-6 p-5 bg-indigo-50 rounded-2xl border">
          <h3 className="font-bold text-indigo-900 mb-1">
            Best Time Suggested
          </h3>
          <p className="text-gray-700 mb-4">
            Post on <strong>{selectedTime.day}</strong> at{" "}
            <strong>{selectedTime.hour}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
