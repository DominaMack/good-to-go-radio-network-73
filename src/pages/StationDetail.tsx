import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink, Facebook, Globe, Instagram, Mic, Play, Radio, ShieldAlert, Youtube } from "lucide-react";
import { useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import StationCard from "@/components/StationCard";
import { Button } from "@/components/ui/button";
import { findStationBySlug, isStationPublic, publicStations } from "@/data/stations";
import NotFound from "./NotFound";

const StationDetail = () => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const station = slug ? findStationBySlug(slug) : undefined;
  const playerRef = useRef<HTMLAudioElement | null>(null);

  if (!station) return <NotFound />;

  const relatedStations = publicStations
    .filter((candidate) => candidate.slug !== station.slug)
    .slice(0, 3);

  const unavailable = !isStationPublic(station);
  const shouldAutoplay = searchParams.get("play") === "1";
  const socialLinks = [
    station.socialLinks?.website
      ? { key: "website", label: "Website", href: station.socialLinks.website, icon: Globe }
      : null,
    station.socialLinks?.facebook
      ? { key: "facebook", label: "Facebook", href: station.socialLinks.facebook, icon: Facebook }
      : null,
    station.socialLinks?.instagram
      ? { key: "instagram", label: "Instagram", href: station.socialLinks.instagram, icon: Instagram }
      : null,
    station.socialLinks?.youtube
      ? { key: "youtube", label: "YouTube", href: station.socialLinks.youtube, icon: Youtube }
      : null,
    station.socialLinks?.tiktok
      ? { key: "tiktok", label: "TikTok", href: station.socialLinks.tiktok, icon: ExternalLink }
      : null,
    station.socialLinks?.vimeo
      ? { key: "vimeo", label: "Vimeo", href: station.socialLinks.vimeo, icon: ExternalLink }
      : null,
    station.socialLinks?.odysee
      ? { key: "odysee", label: "Odysee", href: station.socialLinks.odysee, icon: ExternalLink }
      : null,
  ].filter(Boolean) as Array<{ key: string; label: string; href: string; icon: typeof Globe }>;

  useEffect(() => {
    if (!shouldAutoplay || unavailable || !playerRef.current) return;

    playerRef.current.play().catch(() => {
      // Some browsers may still require another direct interaction.
    });
  }, [shouldAutoplay, unavailable, station.slug]);

  const handleListenOnSite = () => {
    setSearchParams({ play: "1" });
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    playerRef.current?.play().catch(() => {
      // Some browsers may still require another direct interaction.
    });
  };

  return (
    <Layout>
      <section className="relative overflow-hidden border-b border-border bg-charcoal-deep">
        <div className="absolute inset-0">
          <img
            src={station.coverImage}
            alt={`${station.name} station artwork`}
            className="h-full w-full object-cover opacity-30"
            style={{ objectPosition: station.coverPosition ?? "center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/80" />
        </div>

        <div className="container-custom relative py-16 md:py-24">
          <Link to="/stations" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to stations
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_380px] items-start">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-condensed text-xs uppercase tracking-[0.3em] text-primary">
                  {station.tier} slot
                </span>
                <span className="rounded-full border border-border bg-background/50 px-3 py-1 font-condensed text-xs uppercase tracking-[0.3em] text-foreground/80">
                  {station.genre ?? station.tagline}
                </span>
                {unavailable && (
                  <span className="rounded-full border border-destructive/40 bg-destructive/10 px-3 py-1 font-condensed text-xs uppercase tracking-[0.3em] text-destructive">
                    Currently unavailable
                  </span>
                )}
              </div>

              <h1 className="mt-6 font-display text-5xl md:text-7xl leading-none">{station.name}</h1>
              <p className="mt-4 font-condensed text-sm uppercase tracking-[0.32em] text-primary">
                Hosted by {station.hostName ?? "Good To Go Radio"}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {station.description}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                {station.streamUrl && !unavailable ? (
                  <Button
                    size="lg"
                    onClick={handleListenOnSite}
                    className="bg-gradient-gold-bright text-background font-condensed uppercase tracking-wider shadow-gold-strong"
                  >
                    <Play className="mr-2 h-5 w-5 fill-current" /> Listen Live
                  </Button>
                ) : (
                  <Button size="lg" disabled className="font-condensed uppercase tracking-wider">
                    <ShieldAlert className="mr-2 h-5 w-5" /> Station Unavailable
                  </Button>
                )}

                <Button asChild size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-condensed uppercase tracking-wider">
                  <Link to="/start-your-station">
                    <Mic className="mr-2 h-5 w-5" /> Start Your Station
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/25 bg-card/80 p-6 shadow-gold backdrop-blur-sm">
              <div className="aspect-square overflow-hidden rounded-xl border border-primary/20">
                <img
                  src={station.coverImage}
                  alt={`${station.name} cover`}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: station.coverPosition ?? "center" }}
                />
              </div>
              <div className="mt-6 space-y-4">
                {station.streamUrl && !unavailable && (
                  <div className="rounded-xl border border-primary/25 bg-background/60 p-4">
                    <p className="font-condensed text-xs uppercase tracking-[0.32em] text-primary">Now Playing On Site</p>
                    <audio
                      ref={playerRef}
                      className="mt-4 w-full"
                      controls
                      preload="none"
                      src={station.streamUrl}
                    >
                      Your browser does not support the audio player.
                    </audio>
                  </div>
                )}
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Radio className="h-4 w-4 text-primary" />
                  <span>{station.genre ?? station.tagline}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mic className="h-4 w-4 text-primary" />
                  <span>{station.hostName ?? "Host to be announced"}</span>
                </div>
                {socialLinks.length > 0 && (
                  <div className="rounded-xl border border-border bg-background/50 p-4">
                    <p className="font-condensed text-xs uppercase tracking-[0.32em] text-primary">Connect With This Station</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {socialLinks.map((social) => {
                        const Icon = social.icon;
                        return (
                          <a
                            key={social.key}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-3 py-2 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
                          >
                            <Icon className="h-4 w-4" />
                            <span>{social.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-custom">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="font-condensed text-xs uppercase tracking-[0.3em] text-primary">More From The Network</p>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">Explore Other Stations</h2>
            </div>
            <Button asChild variant="outline" className="hidden md:inline-flex border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground font-condensed uppercase tracking-wider">
              <Link to="/stations">
                View All Stations <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedStations.map((related) => (
              <StationCard key={related.slug} station={related} variant="detailed" />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default StationDetail;
