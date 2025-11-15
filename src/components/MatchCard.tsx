import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";

interface MatchCardProps {
  team1: string;
  team2: string;
  team1Score?: string;
  team2Score?: string;
  status: "live" | "upcoming" | "completed";
  time: string;
  venue: string;
  matchType: string;
}

const MatchCard = ({
  team1,
  team2,
  team1Score,
  team2Score,
  status,
  time,
  venue,
  matchType,
}: MatchCardProps) => {
  return (
    <Card className="group overflow-hidden border-border/50 bg-card transition-all hover:scale-[1.02] hover:shadow-lg">
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <Badge
            variant="outline"
            className={
              status === "live"
                ? "border-cricket-red bg-cricket-red/10 text-cricket-red"
                : status === "upcoming"
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-muted-foreground bg-muted text-muted-foreground"
            }
          >
            {status === "live" && "🔴 "}
            {status.toUpperCase()}
          </Badge>
          <span className="text-xs font-medium text-muted-foreground">{matchType}</span>
        </div>

        {/* Teams */}
        <div className="space-y-4">
          {/* Team 1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cricket-blue to-cricket-blue-light text-sm font-bold text-white">
                {team1.substring(0, 2).toUpperCase()}
              </div>
              <span className="font-semibold text-foreground">{team1}</span>
            </div>
            {team1Score && (
              <span className="text-xl font-bold text-foreground">{team1Score}</span>
            )}
          </div>

          {/* VS Divider */}
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold text-muted-foreground">VS</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Team 2 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cricket-green to-cricket-green-light text-sm font-bold text-white">
                {team2.substring(0, 2).toUpperCase()}
              </div>
              <span className="font-semibold text-foreground">{team2}</span>
            </div>
            {team2Score && (
              <span className="text-xl font-bold text-foreground">{team2Score}</span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 space-y-2 border-t border-border/50 pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{venue}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
