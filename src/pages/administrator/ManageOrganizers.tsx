import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit, Trash2, MoreVertical, UserCheck, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Organizer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
  tournaments: number;
  joinedDate: string;
}

const initialOrganizers: Organizer[] = [
  { id: "1", name: "Rajesh Kumar", email: "rajesh@cricket.com", phone: "+91 98765 43210", status: "active", tournaments: 5, joinedDate: "2024-01-15" },
  { id: "2", name: "Amit Sharma", email: "amit@cricket.com", phone: "+91 87654 32109", status: "active", tournaments: 3, joinedDate: "2024-02-20" },
  { id: "3", name: "Priya Patel", email: "priya@cricket.com", phone: "+91 76543 21098", status: "inactive", tournaments: 2, joinedDate: "2024-03-10" },
];

const ManageOrganizers = () => {
  const [organizers, setOrganizers] = useState<Organizer[]>(initialOrganizers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newOrganizer, setNewOrganizer] = useState({ name: "", email: "", phone: "" });
  const { toast } = useToast();

  const filteredOrganizers = organizers.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddOrganizer = () => {
    if (!newOrganizer.name || !newOrganizer.email) {
      toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    const organizer: Organizer = {
      id: Date.now().toString(),
      name: newOrganizer.name,
      email: newOrganizer.email,
      phone: newOrganizer.phone,
      status: "active",
      tournaments: 0,
      joinedDate: new Date().toISOString().split("T")[0],
    };

    setOrganizers([...organizers, organizer]);
    setNewOrganizer({ name: "", email: "", phone: "" });
    setIsAddDialogOpen(false);
    toast({ title: "Success", description: "Organizer added successfully" });
  };

  const toggleStatus = (id: string) => {
    setOrganizers(
      organizers.map((org) =>
        org.id === id ? { ...org, status: org.status === "active" ? "inactive" : "active" } : org
      )
    );
    toast({ title: "Status Updated", description: "Organizer status has been updated" });
  };

  const deleteOrganizer = (id: string) => {
    setOrganizers(organizers.filter((org) => org.id !== id));
    toast({ title: "Deleted", description: "Organizer has been removed" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold text-foreground">Manage Organizers</h2>
          <p className="text-muted-foreground mt-1">Add, edit, and manage tournament organizers</p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Organizer
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-primary/20">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add New Organizer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium text-foreground">Name *</label>
                <Input
                  value={newOrganizer.name}
                  onChange={(e) => setNewOrganizer({ ...newOrganizer, name: e.target.value })}
                  placeholder="Enter organizer name"
                  className="mt-1 bg-background/50 border-primary/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email *</label>
                <Input
                  type="email"
                  value={newOrganizer.email}
                  onChange={(e) => setNewOrganizer({ ...newOrganizer, email: e.target.value })}
                  placeholder="Enter email address"
                  className="mt-1 bg-background/50 border-primary/20"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Phone</label>
                <Input
                  value={newOrganizer.phone}
                  onChange={(e) => setNewOrganizer({ ...newOrganizer, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="mt-1 bg-background/50 border-primary/20"
                />
              </div>
              <Button onClick={handleAddOrganizer} className="w-full bg-gradient-to-r from-primary to-accent">
                Add Organizer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search organizers..."
          className="pl-10 bg-background/50 border-primary/20"
        />
      </div>

      <div className="grid gap-4">
        {filteredOrganizers.map((organizer, index) => (
          <motion.div
            key={organizer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {organizer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{organizer.name}</h3>
                      <p className="text-sm text-muted-foreground">{organizer.email}</p>
                      <p className="text-xs text-muted-foreground">{organizer.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{organizer.tournaments}</p>
                      <p className="text-xs text-muted-foreground">Tournaments</p>
                    </div>

                    <Badge
                      variant={organizer.status === "active" ? "default" : "secondary"}
                      className={organizer.status === "active" ? "bg-green-500/20 text-green-500" : ""}
                    >
                      {organizer.status}
                    </Badge>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-primary/20">
                        <DropdownMenuItem onClick={() => toggleStatus(organizer.id)}>
                          {organizer.status === "active" ? (
                            <>
                              <UserX className="w-4 h-4 mr-2" /> Deactivate
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-4 h-4 mr-2" /> Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteOrganizer(organizer.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {filteredOrganizers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No organizers found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrganizers;
