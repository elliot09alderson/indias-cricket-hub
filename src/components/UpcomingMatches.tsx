import MatchCard from "./MatchCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const UpcomingMatches = () => {
  const matches = [
    {
      team1: "Mumbai Masters",
      team2: "Delhi Dynamites",
      team1Score: "185/4",
      team2Score: "142/8",
      status: "live" as const,
      time: "Live - 2nd Innings",
      venue: "Wankhede Stadium, Mumbai",
      matchType: "T20",
    },
    {
      team1: "Chennai Champions",
      team2: "Bangalore Blasters",
      status: "upcoming" as const,
      time: "Today, 7:30 PM IST",
      venue: "M. A. Chidambaram Stadium, Chennai",
      matchType: "T20",
    },
    {
      team1: "Kolkata Kings",
      team2: "Hyderabad Heroes",
      status: "upcoming" as const,
      time: "Tomorrow, 3:30 PM IST",
      venue: "Eden Gardens, Kolkata",
      matchType: "ODI",
    },
    {
      team1: "Punjab Panthers",
      team2: "Rajasthan Royals",
      team1Score: "278/8",
      team2Score: "245/10",
      status: "completed" as const,
      time: "Yesterday",
      venue: "PCA Stadium, Mohali",
      matchType: "ODI",
    },
  ];

  return (
    <section id="matches" className="bg-background py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
              Upcoming Matches
            </h2>
            <p className="text-muted-foreground">
              Don't miss the action-packed cricket matches
            </p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex">
            View All Matches
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Matches Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {matches.map((match, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <MatchCard {...match} />
            </div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="w-full">
            View All Matches
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatches;
