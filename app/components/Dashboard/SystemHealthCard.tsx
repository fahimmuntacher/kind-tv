import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


type HealthItemProps = {
  name: string;
  description: string;
  status: "Running" | "Healthy" | "Online";
};

type SystemHealthCardProps = {
  overallStatus: string;
  items: HealthItemProps[];
};

const SystemHealthCard = ({ overallStatus, items }: SystemHealthCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            ⚙️ System Health
          </CardTitle>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {overallStatus}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {items.map((item) => (
          <HealthItem key={item.name} {...item} />
        ))}
      </CardContent>
    </Card>
  );
};

export default SystemHealthCard;

/* --------- Sub Component --------- */
const HealthItem = ({ name, description, status }: HealthItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 transition hover:bg-slate-100">
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
        <div>
          <p className="font-medium text-slate-800">{name}</p>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </div>

      <Badge variant="outline" className="border-green-300 text-green-600">
        {status}
      </Badge>
    </div>
  );
};
