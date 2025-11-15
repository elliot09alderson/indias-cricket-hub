import { Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-cricket-gold">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <span className="hidden text-xl font-bold text-primary-foreground md:block">
                AICT
              </span>
            </a>

            {/* Navigation Links */}
            <div className="hidden items-center gap-6 lg:flex">
              <a href="#matches" className="text-sm font-medium text-primary-foreground/90 transition-colors hover:text-primary-foreground">
                Matches
              </a>
              <a href="#tournaments" className="text-sm font-medium text-primary-foreground/90 transition-colors hover:text-primary-foreground">
                Tournaments
              </a>
              <a href="#reels" className="text-sm font-medium text-primary-foreground/90 transition-colors hover:text-primary-foreground">
                Reels
              </a>
              <a href="#teams" className="text-sm font-medium text-primary-foreground/90 transition-colors hover:text-primary-foreground">
                Teams
              </a>
              <a href="#news" className="text-sm font-medium text-primary-foreground/90 transition-colors hover:text-primary-foreground">
                News
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            {isSearchOpen ? (
              <div className="flex items-center gap-2">
                <Input
                  type="search"
                  placeholder="Search matches, teams..."
                  className="w-48 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 md:w-64"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* User Login */}
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Organizer Login */}
            <Button className="hidden bg-accent hover:bg-accent/90 md:inline-flex">
              Organizer Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
