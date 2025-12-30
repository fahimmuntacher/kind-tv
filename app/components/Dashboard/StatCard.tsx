import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  gradient?: string;
  valueClassName?: string;
};

const StatCard = ({
  title,
  value,
  subtitle,
  gradient = "from-slate-50 to-white",
  valueClassName = "text-slate-800",
}: StatCardProps) => {
  return (
    <Card
      className={cn(
        "transition hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br",
        gradient
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-slate-500">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className={cn("text-4xl font-bold", valueClassName)}>{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
};

export default StatCard;
