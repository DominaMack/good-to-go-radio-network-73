import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { Target, Eye, Heart } from "lucide-react";

const About = () => (
  <Layout>
    <PageHeader
      eyebrow="Who We Are"
      title="About Good To Go Radio"
      subtitle="An online radio and media network built to help creators, artists, entrepreneurs, churches, podcasters, and brands be heard."
    />

    <section className="py-20 bg-background">
      <div className="container-custom max-w-4xl">
        <p className="text-lg text-muted-foreground leading-relaxed text-center">
          Good To Go Radio is more than just radio. We are a platform for creators, artists, entrepreneurs, and communities to be heard. From music to ministry, podcasts to promotion, we provide the infrastructure and audience for voices that deserve to break through.
        </p>
      </div>
    </section>

    <section className="py-20 bg-charcoal grain">
      <div className="container-custom grid md:grid-cols-3 gap-6">
        {[
          { icon: Target, title: "Our Mission", text: "To provide an affordable and accessible online radio platform for creators, businesses, and organizations ready to grow their audience and share their message with the world." },
          { icon: Eye, title: "Our Vision", text: "To become a trusted media platform where listeners discover new voices, artists gain exposure, businesses promote their brands, and station owners create profitable digital media opportunities." },
          { icon: Heart, title: "Our Promise", text: "Premium broadcast quality, fair pricing, and unwavering support for every voice on our network — from day one to year ten." },
        ].map((b, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-8 hover:border-primary/60 transition-colors">
            <div className="h-14 w-14 rounded-xl bg-gradient-gold-bright grid place-items-center mb-5 shadow-gold">
              <b.icon className="h-6 w-6 text-background" />
            </div>
            <h3 className="font-display text-2xl tracking-wide mb-3">{b.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{b.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container-custom">
        <SectionHeading eyebrow="By The Numbers" title="A Network On The Move" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: "10+", l: "Stations" },
            { v: "50K+", l: "Monthly Listeners" },
            { v: "100+", l: "Countries" },
            { v: "24/7", l: "On Air" },
          ].map((s, i) => (
            <div key={i} className="text-center bg-charcoal border border-border rounded-2xl p-8">
              <p className="font-display text-5xl text-gradient-gold">{s.v}</p>
              <p className="font-condensed uppercase tracking-wider text-sm mt-2 text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
