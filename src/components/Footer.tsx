import { Link } from "react-router-dom";
import { Mail, Phone, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Logo from "./Logo";
import { stations } from "@/data/stations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/listen", label: "Listen Live" },
  { to: "/stations", label: "Stations" },
  { to: "/start-your-station", label: "Start Your Station" },
  { to: "/advertise", label: "Advertise" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're subscribed!", { description: "Thanks for joining the Good To Go Radio family." });
    setEmail("");
  };

  return (
    <footer className="bg-charcoal-deep border-t border-border pt-20 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-4">
            <Logo size="md" />
            <p className="font-display text-xl text-gradient-gold mt-6 tracking-wider">
              Your Sound. Your Station. Your Platform.
            </p>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              Good To Go Radio is more than just radio. We are a platform for creators, artists, entrepreneurs, and communities to be heard.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" className="h-10 w-10 grid place-items-center rounded-full border border-border hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-lg tracking-wider text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted-foreground hover:text-primary transition-colors text-sm">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-lg tracking-wider text-primary mb-4">Our Stations</h4>
            <ul className="space-y-2">
              {stations.map((s) => (
                <li key={s.slug}>
                  <Link to={`/stations/${s.slug}`} className="text-muted-foreground hover:text-primary transition-colors text-sm">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-display text-lg tracking-wider text-primary mb-4">Stay Tuned</h4>
            <p className="text-sm text-muted-foreground mb-4">Get exclusive drops, show schedules and offers.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mb-6">
              <Input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary border-border"
              />
              <Button type="submit" className="bg-gradient-gold-bright text-background font-condensed uppercase tracking-wider">
                Subscribe
              </Button>
            </form>
            <div className="space-y-2 text-sm">
              <a href="mailto:info@goodtogoradio.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Mail className="h-4 w-4 text-primary" /> info@goodtogoradio.com
              </a>
              <a href="tel:1234567890" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Phone className="h-4 w-4 text-primary" /> (123) 456-7890
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-condensed tracking-wider uppercase">
            © 2026 Good To Go Radio. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground font-condensed tracking-wider uppercase">
            Broadcasting Worldwide · 24/7
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
