"use client";

import { useState } from "react";
import DashBoardLayout from "@/app/layouts/DashBoardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Edit2, Trash2, Clock, Globe } from "lucide-react";
import StatCard from "@/app/components/Dashboard/StatCard";
import TopChannelsChart from "./(components)/TopChannelsChart";

type Channel = {
  id: number;
  name: string;
  emoji: string;
  status: string;
  ageRating: string;
  category: string;
  timezone: string;
  description: string;
  broadcastTime: string;
};

export default function ChannelManagementUI() {
  const [showModal, setShowModal] = useState(false);
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);

  const topChannelsData = [
    { name: "Premium Sports", viewers: 1200 },
    { name: "Movie Channel", viewers: 950 },
    { name: "News Channel", viewers: 700 },
    { name: "Kids Channel", viewers: 550 },
  ];

  const channels: Channel[] = [
    {
      id: 1,
      name: "Premium Sports",
      emoji: "🏆",
      status: "active",
      ageRating: "PG-13",
      category: "Sports",
      timezone: "UTC+6",
      description: "Live sports broadcasting 24/7",
      broadcastTime: "24/7",
    },
    {
      id: 2,
      name: "Movie Channel",
      emoji: "🎬",
      status: "active",
      ageRating: "R",
      category: "Entertainment",
      timezone: "UTC+6",
      description: "Latest blockbusters and classics",
      broadcastTime: "18:00 – 02:00",
    },
  ];

  const openEditModal = (channel: Channel) => {
    setEditingChannel(channel);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingChannel(null);
    setShowModal(false);
  };

  return (
    <DashBoardLayout panelName="Channel Management">
      <div className="bg-gradient-to-br from-slate-50 to-slate-100">
        {/* stats card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Channels"
            value={12}
            subtitle="All created channels"
            gradient="from-indigo-50 to-white"
            valueClassName="text-indigo-700"
          />
          <StatCard
            title="Active Channels"
            value={9}
            subtitle="Currently broadcasting"
            gradient="from-emerald-50 to-white"
            valueClassName="text-emerald-700"
          />
          <StatCard
            title="Scheduled Channels"
            value={5}
            subtitle="Time-based broadcasts"
            gradient="from-amber-50 to-white"
            valueClassName="text-amber-700"
          />
          <StatCard
            title="24/7 Channels"
            value={7}
            subtitle="Always live"
            gradient="from-sky-50 to-white"
            valueClassName="text-sky-700"
          />
        </div>

        <div className="mb-8">
          <TopChannelsChart data={topChannelsData} />
        </div>

        {/* Channels List */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>All Channels</CardTitle>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg shadow-indigo-200 transition"
            >
              <Plus size={20} />
              Create Channel
            </button>
          </CardHeader>

          <CardContent className="space-y-4">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="flex justify-between items-center p-4 rounded-xl border bg-white"
              >
                <div className="flex gap-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl text-white">
                    {channel.emoji}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{channel.name}</h3>
                      <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
                        {channel.status}
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                        {channel.ageRating}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600">
                      {channel.description}
                    </p>

                    <div className="flex gap-4 text-xs text-slate-500 mt-2">
                      <span>📁 {channel.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {channel.broadcastTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Globe size={12} /> {channel.timezone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(channel)}
                    className="p-2 text-indigo-600 rounded-lg hover:bg-indigo-50"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 text-red-600 rounded-lg hover:bg-red-50">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Modal (UI only) */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold">
                  {editingChannel ? "Edit Channel" : "Create New Channel"}
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Channel Name"
                  defaultValue={editingChannel?.name || ""}
                />
                <textarea
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Description"
                  defaultValue={editingChannel?.description || ""}
                />
                <input
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Thumbnail Emoji"
                  defaultValue={editingChannel?.emoji || ""}
                />
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  defaultValue={editingChannel?.category || ""}
                >
                  <option>Sports</option>
                  <option>Entertainment</option>
                  <option>News</option>
                </select>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  defaultValue={editingChannel?.ageRating || ""}
                >
                  <option>R</option>
                  <option>PG-13</option>
                  <option>G</option>
                </select>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  defaultValue={editingChannel?.timezone || ""}
                >
                  <option>UTC+6</option>
                  <option>UTC+0</option>
                  <option>UTC-5</option>
                </select>
              </div>

              <div className="p-6 border-t flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
                  {editingChannel ? "Save Changes" : "Create Channel"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashBoardLayout>
  );
}
