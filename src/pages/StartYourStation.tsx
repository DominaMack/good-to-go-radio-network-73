import { useState } from "react";
import { Check, ArrowRight, Mic, Music, Church, Briefcase, Users, GraduationCap, DollarSign, Megaphone, Calendar, Star } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const features = [
  "Custom online radio station",
  "24/7 streaming capability",
  "Mobile-friendly listening access",
  "Station branding support",
  "Technical support",
  "Monetization opportunities",
  "Play music, talk, ministry, podcasts, and more",
];

const audience = [
  { icon: Music, label: "DJs & Artists" },
  { icon: Mic, label: "Podcasters" },
  { icon: Church, label: "Churches & Ministries" },
  { icon: Briefcase, label: "Entrepreneurs" },
  { icon: Star, label: "Influencers" },
  { icon: Briefcase, label: "Businesses" },
  { icon: GraduationCap, label: "Schools" },
  { icon: Users, label: "Communities" },
];

const monetize = [
  { icon: Megaphone, label: "Run Ads" },
  { icon: DollarSign, label: "Sponsorships" },
  { icon: Mic, label: "Paid Interviews" },
  { icon: Music, label: "Artist Promotion" },
  { icon: Calendar, label: "Event Promotions" },
  { icon: Users, label: "Memberships" },
  { icon: Briefcase, label: "Business Shoutouts" },
];

const StartYourStation = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Request sent!", { description: "We'll reach out within 24 hours to launch your station." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Launch Your Channel"
        title="Start Your Station"
        subtitle="Own your voice. Build your brand. Broadcast worldwide — starting at $499 setup + $199/month."
      />

      <section className="py-20 bg-background">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Everything You Need <br /> To <span className="text-gradient-gold">Go Live.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              We handle the tech, infrastructure, and branding setup. You bring the voice. Within days you can be broadcasting to a global audience.
            </p>
            <ul className="mt-8 space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="h-6 w-6 rounded-full bg-primary/15 grid place-items-center mt-0.5 shrink-0">
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="bg-card border border-primary/40 rounded-2xl p-8 text-center">
              <p className="font-condensed text-xs uppercase tracking-widest text-muted-foreground">One-time</p>
              <p className="font-display text-6xl text-gradient-gold mt-3">$499</p>
              <p className="font-condensed uppercase tracking-wider mt-1">Setup Fee</p>
              <div className="h-px w-12 bg-border mx-auto my-4" />
              <p className="text-sm text-muted-foreground">Branding, deployment, and full station configuration.</p>
            </div>
            <div className="bg-gradient-gold-bright text-background rounded-2xl p-8 text-center shadow-gold-strong">
              <p className="font-condensed text-xs uppercase tracking-widest opacity-80">Recurring</p>
              <p className="font-display text-6xl mt-3">$199</p>
              <p className="font-condensed uppercase tracking-wider mt-1">Per Month</p>
              <div className="h-px w-12 bg-background/40 mx-auto my-4" />
              <p className="text-sm">Hosting, streaming, support, and continuous network access.</p>
            </div>
            <Button asChild size="lg" className="col-span-2 bg-gradient-gold-bright text-background font-condensed uppercase tracking-wider shadow-gold">
              <a href="#inquiry">Start My Station Today <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-charcoal grain">
        <div className="container-custom">
          <SectionHeading eyebrow="Who It's For" title="Built For Every Voice" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {audience.map((a, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/60 transition-colors">
                <a.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <p className="font-condensed uppercase tracking-wider text-sm">{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container-custom">
          <SectionHeading eyebrow="Make It Pay" title="Monetize Your Station" subtitle="Multiple ways to turn listeners into revenue." />
          <div className="flex flex-wrap justify-center gap-3">
            {monetize.map((m, i) => (
              <div key={i} className="flex items-center gap-2 px-5 py-3 rounded-full border border-primary/40 bg-card hover:bg-primary/10 transition-colors">
                <m.icon className="h-4 w-4 text-primary" />
                <span className="font-condensed uppercase tracking-wider text-sm">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="inquiry" className="py-20 bg-charcoal-deep">
        <div className="container-custom max-w-2xl">
          <SectionHeading eyebrow="Let's Launch" title="Tell Us About Your Station" />
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-secondary border-border" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Tell us about your station idea</Label>
              <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-secondary border-border" />
            </div>
            <Button type="submit" size="lg" className="w-full bg-gradient-gold-bright text-background font-condensed uppercase tracking-wider">
              Submit Inquiry <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default StartYourStation;
