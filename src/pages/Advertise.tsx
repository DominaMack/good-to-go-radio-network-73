import { useState } from "react";
import { Check, ArrowRight, DollarSign, Globe, Calendar, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const benefits = [
  { icon: DollarSign, title: "Affordable Exposure", text: "Reach thousands without breaking the budget." },
  { icon: Globe, title: "Local & National Reach", text: "Target your community or scale across markets." },
  { icon: Calendar, title: "Events & Launches", text: "Drive RSVPs and sales for time-sensitive campaigns." },
  { icon: TrendingUp, title: "Brand Awareness", text: "Stay top of mind with consistent on-air presence." },
];

const Advertise = () => {
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", what: "", budget: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Inquiry received!", { description: "Our advertising team will contact you within 24 hours." });
    setForm({ name: "", business: "", email: "", phone: "", what: "", budget: "", message: "" });
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Advertise With Us"
        title="Reach Real Listeners"
        subtitle="Promote your business, event, product, or service across the Good To Go Radio network with affordable, high-impact packages."
      />

      <section className="py-20 bg-background">
        <div className="container-custom">
          <SectionHeading eyebrow="Why Advertise" title="Real Results, Real Reach" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 hover:border-primary/60 hover:-translate-y-1 transition-all duration-500">
                <div className="h-12 w-12 rounded-lg bg-gradient-gold-bright grid place-items-center mb-4">
                  <b.icon className="h-6 w-6 text-background" />
                </div>
                <h3 className="font-display text-xl tracking-wide mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-charcoal grain">
        <div className="container-custom max-w-3xl">
          <SectionHeading eyebrow="Get A Quote" title="Advertising Inquiry" subtitle="Tell us about your campaign and we'll build a custom package." />
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business">Business Name</Label>
                <Input id="business" value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-secondary border-border" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-secondary border-border" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="what">What do you want to advertise?</Label>
              <Input id="what" value={form.what} onChange={(e) => setForm({ ...form, what: e.target.value })} className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget</Label>
              <Input id="budget" placeholder="e.g. $500 / $1,000+" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="bg-secondary border-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
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

export default Advertise;
