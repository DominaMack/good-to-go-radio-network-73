import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const interests = [
  "Listen Live",
  "Start My Own Radio Station",
  "Advertise",
  "Artist Promotion",
  "Host a Show",
  "General Information",
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent!", { description: "We'll get back to you shortly." });
    setForm({ name: "", email: "", phone: "", interest: "", message: "" });
  };

  return (
    <Layout>
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Questions, partnerships, or ready to launch? We'd love to hear from you."
      />

      <section className="py-20 bg-background">
        <div className="container-custom grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-6">
            {[
              { icon: Mail, label: "Email", value: "info@goodtogoradio.com", href: "mailto:info@goodtogoradio.com" },
              { icon: Phone, label: "Phone", value: "(123) 456-7890", href: "tel:1234567890" },
              { icon: MapPin, label: "Studios", value: "Broadcasting Worldwide", href: "#" },
            ].map((c, i) => (
              <a key={i} href={c.href} className="flex items-start gap-4 p-6 bg-card border border-border rounded-2xl hover:border-primary/60 transition-colors group">
                <div className="h-12 w-12 rounded-lg bg-gradient-gold-bright grid place-items-center shrink-0 shadow-gold">
                  <c.icon className="h-5 w-5 text-background" />
                </div>
                <div>
                  <p className="font-condensed text-xs uppercase tracking-widest text-muted-foreground">{c.label}</p>
                  <p className="font-display text-xl mt-1 group-hover:text-primary transition-colors">{c.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-secondary border-border" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-secondary border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interest">Interest</Label>
                  <Select value={form.interest} onValueChange={(v) => setForm({ ...form, interest: v })}>
                    <SelectTrigger id="interest" className="bg-secondary border-border">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {interests.map((i) => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={6} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-secondary border-border" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-gradient-gold-bright text-background font-condensed uppercase tracking-wider shadow-gold">
                Send Message <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
