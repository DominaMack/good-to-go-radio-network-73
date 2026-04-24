import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/listen", label: "Listen Live" },
  { to: "/stations", label: "Stations" },
  { to: "/start-your-station", label: "Start Your Station" },
  { to: "/advertise", label: "Advertise" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-gradient-to-b from-background/80 to-transparent"
      )}
    >
      <div className="container-custom flex items-center justify-between h-20">
        <Logo size="sm" />

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-4 py-2 text-sm font-condensed uppercase tracking-wider transition-colors relative",
                  isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-primary" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="default" size="sm" className="bg-gradient-gold-bright text-background hover:opacity-90 font-condensed uppercase tracking-wider">
            <Link to="/listen">
              <Play className="h-4 w-4 mr-1 fill-current" /> Listen Live
            </Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="container-custom py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-3 font-condensed uppercase tracking-wider rounded-md",
                    isActive ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-secondary"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button asChild className="mt-2 bg-gradient-gold-bright text-background font-condensed uppercase tracking-wider">
              <Link to="/listen"><Play className="h-4 w-4 mr-2 fill-current" /> Listen Live</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
