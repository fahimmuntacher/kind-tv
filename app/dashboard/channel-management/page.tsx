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
      <div className="space-y-8">
        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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

        {/* Top Channels Chart */}
        <div>
          <TopChannelsChart data={topChannelsData} />
        </div>

        {/* Channels List */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <CardTitle className="text-xl sm:text-2xl">All Channels</CardTitle>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-lg font-medium shadow-lg shadow-indigo-200 transition w-full sm:w-auto"
            >
              <Plus size={20} />
              Create Channel
            </button>
          </CardHeader>

          <CardContent className="space-y-4">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 rounded-xl border bg-white"
              >
                <div className="flex gap-4 flex-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl text-white flex-shrink-0">
                    {channel.emoji}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg truncate">{channel.name}</h3>
                      <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700 whitespace-nowrap">
                        {channel.status}
                      </span>
                      <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700 whitespace-nowrap">
                        {channel.ageRating}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-2 mb-2">
                      {channel.description}
                    </p>

                    <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="truncate">📁 {channel.category}</span>
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Clock size={12} /> {channel.broadcastTime}
                      </span>
                      <span className="flex items-center gap-1 whitespace-nowrap">
                        <Globe size={12} /> {channel.timezone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 justify-end sm:justify-start">
                  <button
                    onClick={() => openEditModal(channel)}
                    className="p-2.5 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
                    aria-label="Edit channel"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    className="p-2.5 text-red-600 rounded-lg hover:bg-red-50 transition"
                    aria-label="Delete channel"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Modal - Fully Responsive */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-bold text-center sm:text-left">
                  {editingChannel ? "Edit Channel" : "Create New Channel"}
                </h2>
              </div>

              <div className="p-6 space-y-4">
                <input
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Channel Name"
                  defaultValue={editingChannel?.name || ""}
                />
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Description"
                  defaultValue={editingChannel?.description || ""}
                />
                <input
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Thumbnail Emoji (e.g. 🎬)"
                  defaultValue={editingChannel?.emoji || ""}
                />
                <select
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue={editingChannel?.category || ""}
                >
                  <option value="">Select Category</option>
                  <option>Sports</option>
                  <option>Entertainment</option>
                  <option>News</option>
                  <option>Kids</option>
                </select>
                <select
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue={editingChannel?.ageRating || ""}
                >
                  <option value="">Select Age Rating</option>
                  <option>R</option>
                  <option>PG-13</option>
                  <option>PG</option>
                  <option>G</option>
                </select>
                <select
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue={editingChannel?.timezone || ""}
                >
                  <option value="">Select Timezone</option>
                  <option>UTC+6</option>
                  <option>UTC+0</option>
                  <option>UTC-5</option>
                  <option>UTC-8</option>
                </select>
              </div>

              <div className="p-6 border-t flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="w-full sm:w-auto px-6 py-3 border rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
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