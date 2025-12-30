"use client"
export const ActivityItem = ({
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  time,
}: {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  time: string;
}) => {
  return (
    <div className="flex items-center gap-4 px-6 py-4 transition hover:bg-slate-50">
      {/* Icon */}
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1">
        <p className="font-medium text-slate-800">{title}</p>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      {/* Time */}
      <span className="whitespace-nowrap text-sm text-slate-400">
        {time}
      </span>
    </div>
  );
};
