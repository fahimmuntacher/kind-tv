import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type BroadcastItem = {
  label: string;
  title: string;
  meta?: string;
};

type LiveBroadcastCardProps = {
  nowPlaying: BroadcastItem;
  upNext: BroadcastItem;
};

const LiveBroadcastCard = ({ nowPlaying, upNext }: LiveBroadcastCardProps) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            📺 Live Broadcast
          </CardTitle>
          <Badge className="bg-green-500 hover:bg-green-500">LIVE</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <BroadcastBlock {...nowPlaying} />
        <BroadcastBlock {...upNext} />
      </CardContent>
    </Card>
  );
};

export default LiveBroadcastCard;

/* --------- Sub Component --------- */
const BroadcastBlock = ({ label, title, meta }: BroadcastItem) => (
  <div className="rounded-lg bg-slate-50 p-4">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="font-semibold text-slate-800">{title}</p>
    {meta && <p className="text-xs text-slate-400">{meta}</p>}
  </div>
);
