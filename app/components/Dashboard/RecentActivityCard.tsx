"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ActivityItem } from "./ActivityItem";

type ActivityItemType = {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  time: string;
};

type RecentActivityCardProps = {
  activities: ActivityItemType[];
  onViewAll?: () => void;
};

const RecentActivityCard = ({
  activities,
  onViewAll,
}: RecentActivityCardProps) => {
  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <CardTitle className="text-base font-semibold text-slate-800">
          🕒 Recent Admin Activity
        </CardTitle>

        <Button
          variant="link"
          className="px-0 text-purple-600 font-semibold"
          onClick={onViewAll}
        >
          View all
        </Button>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-0 divide-y">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
