import { motion } from "framer-motion";
import { Users, Trophy, Calendar, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { title: "Total Organizers", value: "24", icon: Users, color: "from-primary to-accent" },
  { title: "Active Tournaments", value: "12", icon: Trophy, color: "from-accent to-primary" },
  { title: "Upcoming Matches", value: "48", icon: Calendar, color: "from-primary to-accent" },
  { title: "Monthly Growth", value: "+15%", icon: TrendingUp, color: "from-accent to-primary" },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-heading font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">Overview of platform statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-5 h-5 text-primary-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New organizer registered", time: "2 hours ago" },
                { action: "Tournament created: IPL 2024", time: "5 hours ago" },
                { action: "Organizer account verified", time: "1 day ago" },
                { action: "System settings updated", time: "2 days ago" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-primary/10 last:border-0">
                  <span className="text-foreground">{item.action}</span>
                  <span className="text-sm text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Add Organizer", icon: Users },
                { label: "View Reports", icon: TrendingUp },
                { label: "Manage Tournaments", icon: Trophy },
                { label: "System Logs", icon: Calendar },
              ].map((action, index) => (
                <button
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20"
                >
                  <action.icon className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
