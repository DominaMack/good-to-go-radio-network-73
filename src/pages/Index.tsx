import { Link } from "react-router-dom";
import { Play, Radio, Mic, Globe, Megaphone, DollarSign, Check, ArrowRight, Headphones, TrendingUp, Users, Calendar, Building2 } from "lucide-react";
import Layout from "@/components/Layout";
import StationCard from "@/components/StationCard";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { FEATURED_HOMEPAGE_LIMIT, homepageFeaturedStations } from "@/data/stations";
import heroStudio from "@/assets/hero-studio.jpg";
import waveform from "@/assets/waveform.jpg";
import startStation from "@/assets/start-station.jpg";
import advertise from "@/assets/advertise.jpg";

const features = [
  { icon: Radio, title: "24/7 Streaming", text: "Non-stop music, talk shows, interviews, and entertainment anytime, anywhere." },
  { icon: Mic, title: "Artist Promotion", text: "Get your music heard by real listeners and grow your fanbase." },
  { icon: DollarSign, title: "Own Your Station", text: "Launch your own online radio station starting at just $499 setup + $199/month." },
  { icon: Megaphone, title: "Advertise", text: "Promote your business, event, or brand to an engaged listening audience." },
  { icon: Globe, title: "Global Reach", text: "Broadcast worldwide and let listeners tune in from anywhere." },
];

const stationFeatures = [
  "Custom online radio station",
  "24/7 streaming capability",
  "Mobile-friendly listening access",
  "Station branding support",
  "Technical support",
  "Monetization opportunities",
  "Play music, talk, ministry, podcasts, and more",
];

const adOptions = [
  { icon: Megaphone, title: "Commercial Spots", text: "Professionally produced audio ads aired across our network." },
  { icon: Mic, title: "Sponsored Segments", text: "Own a recurring segment and become part of the show." },
  { icon: Users, title: "Interviews & Shout Outs", text: "Live on-air features that put your brand front and center." },
  { icon: Calendar, title: "Event Promotion", text: "Drive attendance with targeted promotional campaigns." },
  { icon: TrendingUp, title: "Brand Visibility", text: "Build top-of-mind awareness with consistent ad rotation." },
];

const stats = [
  { value: "10+", label: "Radio Stations" },
  { value: "50K+", label: "Monthly Listeners" },
  { value: "100+", label: "Countries" },
  { value: "24/7", label: "Streaming" },
  { value: "1", label: "Mission: Your Voice" },
];

const Index = () => {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden -mt-20 pt-20">
        <div className="absolute inset-0">
          <img src={heroStudio} alt="Good To Go Radio studio with vintage gold microphone" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        </div>

        <div className="container-custom relative grid lg:grid-cols-2 gap-12 items-center py-20">
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/40 bg-background/40 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-condensed text-xs uppercase tracking-[0.3em] text-primary">Welcome to Good To Go Radio</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95]">
              Your <span className="text-gradient-gold">Sound.</span>
              <br />
              Your <span className="text-gradient-gold">Station.</span>
              <br />
              Your <span className="text-gradient-gold">Platform.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Stream music, promote your brand, discover new talent, and launch your very own online radio station with Good To Go Radio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gradient-gold-bright text-background hover:opacity-90 font-condensed uppercase tracking-wider text-base shadow-gold-strong">
                <Link to="/listen"><Play className="h-5 w-5 mr-2 fill-current" /> Listen Live</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-condensed uppercase tracking-wider text-base">
                <Link to="/start-your-station"><Mic className="h-5 w-5 mr-2" /> Start Your Station</Link>
              </Button>
            </div>

            {/* Live wave indicator */}
            <div className="flex items-end gap-1 h-8 pt-4">
              {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.4, 0.7, 1, 0.6, 0.5].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-gradient-gold-bright rounded-full origin-bottom animate-wave"
                  style={{ height: `${h * 100}%`, animationDelay: `${i * 0.08}s`, animationDuration: `${0.8 + (i % 3) * 0.15}s` }}
                />
              ))}
              <span className="ml-3 font-condensed text-xs uppercase tracking-[0.3em] text-primary self-center">Now Broadcasting</span>
            </div>
          </div>

          {/* Floating now-playing card */}
          <div className="hidden lg:block">
            <div className="relative ml-auto w-full max-w-md">
              <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full" />
              <div className="relative bg-card/80 backdrop-blur-xl border border-primary/30 rounded-2xl p-6 shadow-gold-strong">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-condensed text-xs uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" /> On Air Now
                  </span>
                  <Headphones className="h-4 w-4 text-primary" />
                </div>
                <div className="aspect-square rounded-xl bg-gradient-gold-bright mb-4 grid place-items-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_60%)]" />
                  <Radio className="h-24 w-24 text-background relative" strokeWidth={1.5} />
                </div>
                <p className="font-condensed text-xs uppercase tracking-widest text-muted-foreground">The Flagship</p>
                <h3 className="font-display text-2xl mt-1">Good To Go Radio</h3>
                <div className="mt-4 flex items-center gap-3">
                  <button className="h-12 w-12 rounded-full bg-gradient-gold-bright text-background grid place-items-center shadow-gold animate-pulse-gold">
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  </button>
                  <div className="flex-1 h-1 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-gold-bright" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-charcoal-deep grain">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why Good To Go Radio"
            title="Built For Voices That Matter"
            subtitle="Everything you need to listen, broadcast, and grow — on one premium network."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {features.map((f, i) => (
              <div key={i} className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-gold">
                <div className="h-12 w-12 rounded-lg bg-gradient-gold-bright grid place-items-center mb-4 shadow-gold">
                  <f.icon className="h-6 w-6 text-background" strokeWidth={2} />
                </div>
                <h3 className="font-display text-2xl tracking-wide mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
                <div className="absolute top-4 right-4 font-display text-primary/20 text-3xl">0{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATIONS */}
      <section className="py-24 bg-background relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="container-custom">
          <SectionHeading
            eyebrow="Tune In To Our Network"
            title="Featured Radio Stations"
            subtitle={`Our homepage spotlights ${FEATURED_HOMEPAGE_LIMIT} featured stations at a time, curated to highlight the strongest voices on the network.`}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {homepageFeaturedStations.map((s) => <StationCard key={s.slug} station={s} />)}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-condensed uppercase tracking-wider">
              <Link to="/stations">View All Stations <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WAVEFORM DIVIDER */}
      <div className="relative h-32 overflow-hidden border-y border-border">
        <img src={waveform} alt="Gold sound wave" className="absolute inset-0 w-full h-full object-cover opacity-50" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      {/* START YOUR STATION */}
      <section className="py-24 bg-charcoal grain">
        <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-primary/10 blur-3xl rounded-full" />
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-primary/30 shadow-gold-strong">
              <img src={startStation} alt="Broadcaster recording in studio" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-condensed text-xs uppercase tracking-[0.3em] text-primary">Live · 02:45:11</span>
                <p className="font-display text-3xl mt-2">Your Station, Your Voice</p>
              </div>
            </div>
          </div>

          <div>
            <span className="font-condensed text-xs uppercase tracking-[0.3em] text-primary">Launch Your Channel</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 leading-tight">
              Start Your Own <span className="text-gradient-gold">Radio Station</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Own your voice. Build your brand. Broadcast worldwide. Good To Go Radio makes it simple and affordable to launch your own online radio station — no expensive equipment or technical headaches.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-background border border-primary/40 rounded-xl p-6 text-center">
                <p className="font-condensed text-xs uppercase tracking-widest text-muted-foreground">One-time</p>
                <p className="font-display text-5xl text-gradient-gold mt-2">$499</p>
                <p className="font-condensed uppercase text-sm tracking-wider mt-1">Setup Fee</p>
              </div>
              <div className="bg-gradient-gold-bright text-background rounded-xl p-6 text-center shadow-gold">
                <p className="font-condensed text-xs uppercase tracking-widest opacity-80">Recurring</p>
                <p className="font-display text-5xl mt-2">$199</p>
                <p className="font-condensed uppercase text-sm tracking-wider mt-1">Per Month</p>
              </div>
            </div>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {stationFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="mt-8 bg-gradient-gold-bright text-background font-condensed uppercase tracking-wider shadow-gold-strong">
              <Link to="/start-your-station">Start My Station Today <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ADVERTISE */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial-gold opacity-50" />
        <div className="container-custom relative">
          <SectionHeading
            eyebrow="Advertise With Us"
            title="Get Your Brand In Front of Thousands"
            subtitle="Promote your business, event, product, or service on Good To Go Radio. Affordable advertising packages that help brands gain visibility and connect with engaged listeners."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12">
            {adOptions.map((o, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/60 hover:-translate-y-1 transition-all duration-500 hover:shadow-gold">
                <div className="mx-auto h-14 w-14 rounded-full bg-gradient-gold-bright grid place-items-center mb-4 shadow-gold">
                  <o.icon className="h-6 w-6 text-background" />
                </div>
                <h3 className="font-display text-xl tracking-wide mb-2">{o.title}</h3>
                <p className="text-xs text-muted-foreground">{o.text}</p>
              </div>
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-primary/30">
            <img src={advertise} alt="Audio mixing console" className="w-full h-64 object-cover opacity-30" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40 grid place-items-center text-center px-6">
              <div>
                <h3 className="font-display text-3xl md:text-4xl mb-4">Ready to be heard?</h3>
                <Button asChild size="lg" className="bg-gradient-gold-bright text-background font-condensed uppercase tracking-wider shadow-gold-strong">
                  <Link to="/advertise">Advertise Today <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-charcoal-deep border-y border-border">
        <div className="container-custom grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="font-display text-4xl md:text-5xl lg:text-6xl text-gradient-gold">{s.value}</p>
              <p className="font-condensed text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Index;
