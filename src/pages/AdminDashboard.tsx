import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Calendar, LogOut, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  teams: string[];
}

interface Team {
  id: string;
  name: string;
  city: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  
  // Tournament Form State
  const [tournamentName, setTournamentName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  // Team Form State
  const [teamName, setTeamName] = useState("");
  const [teamCity, setTeamCity] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
    }

    // Load data from localStorage
    const savedTournaments = localStorage.getItem("tournaments");
    const savedTeams = localStorage.getItem("teams");
    
    if (savedTournaments) setTournaments(JSON.parse(savedTournaments));
    if (savedTeams) setTeams(JSON.parse(savedTeams));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate("/admin/login");
  };

  const handleCreateTournament = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTournament: Tournament = {
      id: Date.now().toString(),
      name: tournamentName,
      startDate,
      endDate,
      teams: [],
    };
    
    const updatedTournaments = [...tournaments, newTournament];
    setTournaments(updatedTournaments);
    localStorage.setItem("tournaments", JSON.stringify(updatedTournaments));
    
    toast({
      title: "Tournament Created",
      description: `${tournamentName} has been added successfully.`,
    });
    
    // Reset form
    setTournamentName("");
    setStartDate("");
    setEndDate("");
  };

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTeam: Team = {
      id: Date.now().toString(),
      name: teamName,
      city: teamCity,
    };
    
    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    
    toast({
      title: "Team Created",
      description: `${teamName} has been added successfully.`,
    });
    
    // Reset form
    setTeamName("");
    setTeamCity("");
  };

  const handleDeleteTournament = (id: string) => {
    const updatedTournaments = tournaments.filter(t => t.id !== id);
    setTournaments(updatedTournaments);
    localStorage.setItem("tournaments", JSON.stringify(updatedTournaments));
    
    toast({
      title: "Tournament Deleted",
      description: "Tournament has been removed.",
    });
  };

  const handleDeleteTeam = (id: string) => {
    const updatedTeams = teams.filter(t => t.id !== id);
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    
    toast({
      title: "Team Deleted",
      description: "Team has been removed.",
    });
  };

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground border-b border-primary/20 sticky top-0 z-50 backdrop-blur-sm bg-primary/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Organizer Dashboard</h1>
              <p className="text-xs text-primary-foreground/70">Manage your tournaments</p>
            </div>
          </motion.div>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Total Tournaments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{tournaments.length}</p>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Total Teams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">{teams.length}</p>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 bg-gradient-to-br from-card to-secondary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Active Tournaments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-foreground">
                  {tournaments.filter(t => new Date(t.endDate) >= new Date()).length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="tournaments" className="space-y-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="tournaments" className="data-[state=active]:bg-background">
                <Trophy className="w-4 h-4 mr-2" />
                Tournaments
              </TabsTrigger>
              <TabsTrigger value="teams" className="data-[state=active]:bg-background">
                <Users className="w-4 h-4 mr-2" />
                Teams
              </TabsTrigger>
            </TabsList>

            {/* Tournaments Tab */}
            <TabsContent value="tournaments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create New Tournament
                  </CardTitle>
                  <CardDescription>Add a new cricket tournament</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateTournament} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tournamentName">Tournament Name</Label>
                        <Input
                          id="tournamentName"
                          placeholder="e.g., Premier League 2025"
                          value={tournamentName}
                          onChange={(e) => setTournamentName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="bg-accent hover:bg-accent/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Tournament
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Tournaments List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Tournaments</CardTitle>
                  <CardDescription>Manage your cricket tournaments</CardDescription>
                </CardHeader>
                <CardContent>
                  {tournaments.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No tournaments created yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {tournaments.map((tournament) => (
                        <motion.div
                          key={tournament.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{tournament.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTournament(tournament.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Teams Tab */}
            <TabsContent value="teams" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Add New Team
                  </CardTitle>
                  <CardDescription>Register a new cricket team</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateTeam} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="teamName">Team Name</Label>
                        <Input
                          id="teamName"
                          placeholder="e.g., Mumbai Warriors"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teamCity">City</Label>
                        <Input
                          id="teamCity"
                          placeholder="e.g., Mumbai"
                          value={teamCity}
                          onChange={(e) => setTeamCity(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" className="bg-accent hover:bg-accent/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Team
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Teams List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Teams</CardTitle>
                  <CardDescription>Manage registered teams</CardDescription>
                </CardHeader>
                <CardContent>
                  {teams.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No teams added yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {teams.map((team) => (
                        <motion.div
                          key={team.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-accent to-cricket-gold rounded-lg flex items-center justify-center">
                              <Users className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{team.name}</h3>
                              <p className="text-sm text-muted-foreground">{team.city}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTeam(team.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
