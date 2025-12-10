import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, Users, Calendar, LogOut, Plus, Trash2, 
  Upload, ImageIcon, MapPin, Phone, Award, Medal, Gift,
  Building, Map
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Tournament {
  id: string;
  name: string;
  banner: string;
  maxTeamSize: number;
  startDate: string;
  endDate: string;
  firstPrize: string;
  secondPrize: string;
  otherPrize?: string;
  location: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactNumber: string;
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  
  // Tournament Form State
  const [tournamentName, setTournamentName] = useState("");
  const [banner, setBanner] = useState("");
  const [maxTeamSize, setMaxTeamSize] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [firstPrize, setFirstPrize] = useState("");
  const [secondPrize, setSecondPrize] = useState("");
  const [otherPrize, setOtherPrize] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  
  // Team Form State
  const [teamName, setTeamName] = useState("");
  const [teamCity, setTeamCity] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!isLoggedIn) {
      navigate("/admin/login");
    }

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

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBanner(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateTournament = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!banner) {
      toast({
        title: "Banner Required",
        description: "Please upload a tournament banner.",
        variant: "destructive",
      });
      return;
    }
    
    const newTournament: Tournament = {
      id: Date.now().toString(),
      name: tournamentName,
      banner,
      maxTeamSize: parseInt(maxTeamSize),
      startDate,
      endDate,
      firstPrize,
      secondPrize,
      otherPrize: otherPrize || undefined,
      location,
      address,
      city,
      state,
      pincode,
      contactNumber,
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
    setBanner("");
    setMaxTeamSize("");
    setStartDate("");
    setEndDate("");
    setFirstPrize("");
    setSecondPrize("");
    setOtherPrize("");
    setLocation("");
    setAddress("");
    setCity("");
    setState("");
    setPincode("");
    setContactNumber("");
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
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create New Tournament
                  </CardTitle>
                  <CardDescription>Fill in the details to add a new cricket tournament</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleCreateTournament} className="space-y-8">
                    {/* Banner Upload Section */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-primary" />
                        Tournament Banner <span className="text-destructive">*</span>
                      </Label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 overflow-hidden ${
                          banner 
                            ? 'border-accent bg-accent/5' 
                            : 'border-muted-foreground/30 hover:border-primary/50 bg-muted/30'
                        }`}
                      >
                        {banner ? (
                          <div className="relative">
                            <img 
                              src={banner} 
                              alt="Tournament Banner" 
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <div className="text-white text-center">
                                <Upload className="w-8 h-8 mx-auto mb-2" />
                                <p className="text-sm">Click to change banner</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="h-48 flex flex-col items-center justify-center text-muted-foreground">
                            <Upload className="w-10 h-10 mb-3" />
                            <p className="text-sm font-medium">Click to upload banner</p>
                            <p className="text-xs mt-1">PNG, JPG up to 5MB</p>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleBannerUpload}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="tournamentName">Tournament Name <span className="text-destructive">*</span></Label>
                          <Input
                            id="tournamentName"
                            placeholder="e.g., Premier League 2025"
                            value={tournamentName}
                            onChange={(e) => setTournamentName(e.target.value)}
                            required
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxTeamSize">Max Team Size <span className="text-destructive">*</span></Label>
                          <Input
                            id="maxTeamSize"
                            type="number"
                            min="1"
                            placeholder="e.g., 15"
                            value={maxTeamSize}
                            onChange={(e) => setMaxTeamSize(e.target.value)}
                            required
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contactNumber" className="flex items-center gap-2">
                            <Phone className="w-3 h-3" /> Contact Number <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="contactNumber"
                            type="tel"
                            placeholder="e.g., 9876543210"
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                            className="bg-background"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Tournament Dates
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date <span className="text-destructive">*</span></Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">End Date <span className="text-destructive">*</span></Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            className="bg-background"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Prizes */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Prize Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstPrize" className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                              <Trophy className="w-3 h-3 text-white" />
                            </div>
                            First Prize <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="firstPrize"
                            placeholder="e.g., ₹1,00,000"
                            value={firstPrize}
                            onChange={(e) => setFirstPrize(e.target.value)}
                            required
                            className="bg-background border-yellow-400/30 focus:border-yellow-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="secondPrize" className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                              <Medal className="w-3 h-3 text-white" />
                            </div>
                            Second Prize <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="secondPrize"
                            placeholder="e.g., ₹50,000"
                            value={secondPrize}
                            onChange={(e) => setSecondPrize(e.target.value)}
                            required
                            className="bg-background border-slate-400/30 focus:border-slate-400"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="otherPrize" className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                              <Gift className="w-3 h-3 text-white" />
                            </div>
                            Other Prizes (Optional)
                          </Label>
                          <Input
                            id="otherPrize"
                            placeholder="e.g., ₹25,000"
                            value={otherPrize}
                            onChange={(e) => setOtherPrize(e.target.value)}
                            className="bg-background border-orange-400/30 focus:border-orange-400"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Venue Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location" className="flex items-center gap-2">
                            <Building className="w-3 h-3" /> Venue Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="location"
                            placeholder="e.g., Wankhede Stadium"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address <span className="text-destructive">*</span></Label>
                          <Input
                            id="address"
                            placeholder="e.g., D Road, Churchgate"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="bg-background"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City <span className="text-destructive">*</span></Label>
                          <Input
                            id="city"
                            placeholder="e.g., Mumbai"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State <span className="text-destructive">*</span></Label>
                          <Input
                            id="state"
                            placeholder="e.g., Maharashtra"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pincode">Pincode <span className="text-destructive">*</span></Label>
                          <Input
                            id="pincode"
                            placeholder="e.g., 400020"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            required
                            className="bg-background"
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 w-full md:w-auto">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {tournaments.map((tournament) => (
                        <motion.div
                          key={tournament.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="group relative rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                          {/* Banner */}
                          <div className="relative h-36 overflow-hidden">
                            <img 
                              src={tournament.banner} 
                              alt={tournament.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteTournament(tournament.id)}
                              className="absolute top-2 right-2 text-white hover:text-destructive hover:bg-white/20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          
                          {/* Content */}
                          <div className="p-4 space-y-3">
                            <h3 className="font-bold text-foreground text-lg line-clamp-1">{tournament.name}</h3>
                            
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span className="line-clamp-1">{tournament.city}, {tournament.state}</span>
                            </div>

                            {/* Prizes */}
                            <div className="flex items-center gap-3 pt-2 border-t border-border">
                              <div className="flex items-center gap-1" title="First Prize">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                                  <Trophy className="w-2.5 h-2.5 text-white" />
                                </div>
                                <span className="text-xs font-medium">{tournament.firstPrize}</span>
                              </div>
                              <div className="flex items-center gap-1" title="Second Prize">
                                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center">
                                  <Medal className="w-2.5 h-2.5 text-white" />
                                </div>
                                <span className="text-xs font-medium">{tournament.secondPrize}</span>
                              </div>
                            </div>
                          </div>
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
