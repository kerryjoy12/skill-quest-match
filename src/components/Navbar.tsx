import { Link, useLocation } from "react-router-dom";
import { Briefcase, User, Menu, X, Users, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();

  const publicLinks = [
    { to: "/", label: "Find Jobs", icon: Briefcase },
    { to: "/skills", label: "Find Skills", icon: Users },
  ];

  const authLinks = user
    ? [
        ...publicLinks,
        { to: "/profile", label: "My Profile", icon: User },
      ]
    : publicLinks;

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-warm">
            <Briefcase className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            FundiLink
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {authLinks.map((link) => (
            <Link key={link.to} to={link.to}>
              <Button
                variant={location.pathname === link.to ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          ))}
          {user ? (
            <Button variant="ghost" size="sm" className="gap-2" onClick={signOut}>
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm" className="gap-2">
                <LogIn className="h-4 w-4" /> Login / Sign Up
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t bg-card p-4 md:hidden">
          {authLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>
              <Button
                variant={location.pathname === link.to ? "default" : "ghost"}
                className="w-full justify-start gap-2 mb-1"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          ))}
          {user ? (
            <Button variant="ghost" className="w-full justify-start gap-2 mb-1" onClick={() => { signOut(); setMobileOpen(false); }}>
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          ) : (
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="default" className="w-full justify-start gap-2 mb-1">
                <LogIn className="h-4 w-4" /> Login / Sign Up
              </Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
