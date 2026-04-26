import { ArrowRight, Play } from "lucide-react";
import type { Station } from "@/data/stations";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface Props {
  station: Station;
  variant?: "compact" | "detailed";
}

const StationCard = ({ station, variant = "compact" }: Props) => {
  const [playing, setPlaying] = useState(false);
  const isLongName = station.name.length > 22;

  const handlePlay = () => {
    setPlaying(true);
    if (station.streamUrl) {
      window.open(station.streamUrl, "_blank", "noopener,noreferrer");
      toast.success(`Opening ${station.name}`, {
        description: "Launching the live stream in a new tab.",
      });
    } else {
      toast.success(`Now Playing: ${station.name}`, {
        description: "Stream connecting... (preview)",
      });
    }
    setTimeout(() => setPlaying(false), 1500);
  };

  return (
    <div className="station-card group">
      <div className="relative aspect-square overflow-hidden bg-[#050505]">
        <Link
          to={`/stations/${station.slug}`}
          aria-label={`View ${station.name}`}
          className="absolute inset-0 z-10"
        />
        <img
          src={station.coverImage}
          alt={`${station.name} cover art`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ objectPosition: station.coverPosition ?? "center" }}
          loading="lazy"
        />
        <div className={cn("absolute inset-0 bg-gradient-to-br", station.gradient, "opacity-20 mix-blend-screen")} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.46)_0%,rgba(0,0,0,0.34)_26%,rgba(0,0,0,0.72)_60%,rgba(0,0,0,0.96)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,200,70,0.28),transparent_34%)]" />
        <div className="absolute inset-[8px] rounded-[0.9rem] border border-primary/40 bg-transparent shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35)]" />

        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="font-condensed text-[10px] uppercase tracking-[0.25em] text-white bg-black/45 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10 shadow-md">
              ● Live
            </span>
            <span className="rounded-full border border-primary/50 bg-black/55 px-3 py-1 font-condensed text-[10px] uppercase tracking-[0.35em] text-primary shadow-gold">
              {station.initials}
            </span>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-primary/35 bg-black/58 px-4 py-3 backdrop-blur-[2px] shadow-[0_12px_28px_rgba(0,0,0,0.38)]">
              <p className="font-condensed text-[10px] uppercase tracking-[0.34em] text-primary">{station.tagline}</p>
              <h3
                className={cn(
                  "mt-2 font-display uppercase text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.9)]",
                  variant === "compact"
                    ? isLongName
                      ? "text-[1.3rem] leading-[0.98]"
                      : "text-[1.7rem] leading-[0.92]"
                    : isLongName
                      ? "text-xl leading-tight"
                      : "text-2xl leading-[0.95]"
                )}
              >
                {station.name}
              </h3>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-primary via-primary/40 to-transparent" />
          </div>
        </div>

        <button
          onClick={handlePlay}
          aria-label={`Play ${station.name}`}
          className="absolute inset-0 z-20 grid place-items-center bg-background/0 group-hover:bg-background/30 transition-all duration-500"
        >
          <span className={`h-16 w-16 rounded-full bg-primary text-primary-foreground grid place-items-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-gold-strong ${playing ? 'animate-pulse-gold' : ''}`}>
            <Play className="h-7 w-7 fill-current ml-1" />
          </span>
        </button>
      </div>

      {variant === "detailed" && (
        <div className="p-5 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{station.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to={`/stations/${station.slug}`}
              className="w-full py-2 rounded-md border border-border text-foreground hover:border-primary/50 hover:text-primary transition-colors font-condensed uppercase tracking-wider text-sm flex items-center justify-center gap-2"
            >
              <ArrowRight className="h-3 w-3" /> View Station
            </Link>
            <button
              onClick={handlePlay}
              className="w-full py-2 rounded-md border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-condensed uppercase tracking-wider text-sm flex items-center justify-center gap-2"
            >
              <Play className="h-3 w-3 fill-current" /> Listen Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationCard;
