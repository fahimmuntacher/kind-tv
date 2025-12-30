"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CalendarClock, Sparkles, Globe } from "lucide-react";

type RecurringType = "Daily" | "Weekly" | "Monthly";
type EndType = "Never" | "OnDate" | "After";

export default function RecurringScheduleCard() {
  const [enabled, setEnabled] = useState(false);
  const [type, setType] = useState<RecurringType>("Weekly");
  const [time, setTime] = useState("10:00");
  const [day, setDay] = useState("Monday");
  const [startDate, setStartDate] = useState("");
  const [endType, setEndType] = useState<EndType>("Never");
  const [endDate, setEndDate] = useState("");
  const [occurrences, setOccurrences] = useState(10);
  const [timezone, setTimezone] = useState("UTC");

  return (
    <Card className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition p-6 space-y-6">
      {/* Top Row: Title left, Switch right */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <CalendarClock className="w-5 h-5" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold">
            Recurring Publishing
          </h3>
        </div>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>

      <p className="text-gray-500 text-sm">
        Automate repeated publishing schedules
      </p>

      {enabled && (
        <CardContent className="space-y-8 p-0">
          {/* Frequency */}
          <section>
            <Label className="text-sm text-gray-600 mr-2.5">Repetition pattern</Label>
            <div className="mt-2 inline-flex rounded-xl border bg-gray-50 p-1">
              {(["Daily", "Weekly", "Monthly"] as RecurringType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition
                    ${
                      type === t
                        ? "bg-white shadow text-indigo-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </section>

          {/* Core Schedule */}
          <section className="rounded-xl border bg-gray-50 p-5 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {/* Start date */}
              <div>
                <Label className="text-xs uppercase tracking-wide text-gray-500">
                  Start date
                </Label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-white"
                />
              </div>

              {/* Time */}
              <div>
                <Label className="text-xs uppercase tracking-wide text-gray-500">
                  Time
                </Label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-white"
                />
              </div>

              {/* Weekly day */}
              {type === "Weekly" && (
                <div>
                  <Label className="text-xs uppercase tracking-wide text-gray-500">
                    Day of week
                  </Label>
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-white"
                  >
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Timezone */}
              <div>
                <Label className="text-xs uppercase tracking-wide text-gray-500 flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Timezone
                </Label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-white"
                >
                  <option value="UTC">UTC</option>
                  <option value="Asia/Dhaka">Asia/Dhaka</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="America/New_York">America/New_York</option>
                </select>
              </div>
            </div>
          </section>

          {/* End Rules */}
          <section>
            <Label className="text-sm text-gray-600">End condition</Label>
            <div className="mt-2 space-y-3">
              <select
                value={endType}
                onChange={(e) => setEndType(e.target.value as EndType)}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              >
                <option value="Never">Never end</option>
                <option value="OnDate">End on date</option>
                <option value="After">End after occurrences</option>
              </select>

              {endType === "OnDate" && (
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                />
              )}

              {endType === "After" && (
                <input
                  type="number"
                  min={1}
                  value={occurrences}
                  onChange={(e) => setOccurrences(Number(e.target.value))}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Number of occurrences"
                />
              )}
            </div>
          </section>

          {/* Smart Summary */}
          <div className="flex gap-3 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
            <Sparkles className="w-5 h-5 text-indigo-600 mt-0.5" />
            <div className="text-sm text-indigo-700">
              <p className="font-medium">Schedule overview</p>
              <p className="opacity-90">
                {type === "Daily" && `Publishes daily`}
                {type === "Weekly" && `Publishes every ${day}`}
                {type === "Monthly" && `Publishes monthly`} at {time} (
                {timezone})
              </p>
            </div>
          </div>

          {/* Action */}
          <div className="flex justify-end">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Save Recurring Schedule
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
