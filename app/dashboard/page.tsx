import React from "react";
import DashBoardLayout from "../layouts/DashBoardLayout";
import StatCard from "../components/Dashboard/StatCard";
import SystemHealthCard from "../components/Dashboard/SystemHealthCard";
import LiveBroadcastCard from "../components/Dashboard/LiveBroadcastCard";
import RecentActivityCard from "../components/Dashboard/RecentActivityCard";

const AdminPanel = () => {
  return (
    <DashBoardLayout panelName="Dashboard">
      {/* Card */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Channels"
          value={24}
          subtitle="Streaming now"
          gradient="from-purple-50 to-white"
          valueClassName="text-purple-600"
        />

        <StatCard
          title="Content Library"
          value={312}
          subtitle="Approved videos"
          gradient="from-pink-50 to-white"
          valueClassName="text-pink-500"
        />

        <StatCard
          title="Child Profiles"
          value={126}
          subtitle="Across parents"
          gradient="from-blue-50 to-white"
          valueClassName="text-blue-600"
        />

        <StatCard
          title="Needs Review"
          value={8}
          subtitle="Action required"
          gradient="from-orange-50 to-white"
          valueClassName="text-orange-500"
        />
      </div>

      {/* broadcast + system health */}
      <div className="grid gap-6 lg:grid-cols-3 mt-8">
        <LiveBroadcastCard
          nowPlaying={{
            label: "Now Playing",
            title: "Learning Colors with Animals",
            meta: "Channel: Kids Learning TV",
          }}
          upNext={{
            label: "Up Next",
            title: "Alphabet Songs",
            meta: "Starts in 12 minutes",
          }}
        />

        <SystemHealthCard
          overallStatus="All systems operational"
          items={[
            {
              name: "Scheduler",
              description: "Broadcast timing service",
              status: "Running",
            },
            {
              name: "Content Queue",
              description: "Video processing & delivery",
              status: "Healthy",
            },
            {
              name: "Auth Service",
              description: "Login & permissions",
              status: "Online",
            },
          ]}
        />
      </div>

      {/* recent activity */}
      <div className="mt-8">
        <RecentActivityCard
          // onViewAll={() => console.log("Go to full activity page")}
          activities={[
            {
              icon: "📅",
              iconBg: "bg-purple-100",
              iconColor: "text-purple-600",
              title: "Channel schedule updated",
              subtitle: "Kids Learning TV",
              time: "Today",
            },
            {
              icon: "✅",
              iconBg: "bg-green-100",
              iconColor: "text-green-600",
              title: "Video approved (YouTube)",
              subtitle: "Alphabet Songs",
              time: "Yesterday",
            },
            {
              icon: "➕",
              iconBg: "bg-blue-100",
              iconColor: "text-blue-600",
              title: "New channel created",
              subtitle: "Story Time Zone",
              time: "2 days ago",
            },
          ]}
        />
      </div>
    </DashBoardLayout>
  );
};

export default AdminPanel;
