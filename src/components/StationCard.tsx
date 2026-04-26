import { Play } from "lucide-react";
import type { Station } from "@/data/stations";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Props {
  station: Station;
  variant?: "compact" | "detailed";
}

const StationCard = ({ station, variant = "compact" }: Props) => {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(true);
    toast.success(`Now Playing: ${station.name}`, {
      description: "Stream connecting... (preview)",
    });
    setTimeout(() => setPlaying(false), 1500);
  };

  return (
    <div className="station-card group">
      <div className="relative aspect-square overflow-hidden bg-card">
        <img
          src={station.coverImage}
          alt={`${station.name} cover art`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: station.coverPosition ?? "center" }}
          loading="lazy"
        />
        <div className={cn("absolute inset-0 bg-gradient-to-t", station.gradient, "opacity-35")} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.2)_0%,rgba(5,5,5,0.45)_35%,rgba(5,5,5,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,214,102,0.28),transparent_45%)]" />

        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <span className="font-condensed text-[10px] uppercase tracking-[0.25em] text-background/85 bg-background/10 backdrop-blur-sm px-2 py-1 rounded-full border border-background/15">
              ● Live
            </span>
            <span className="rounded-full border border-primary/40 bg-background/55 px-3 py-1 font-condensed text-[10px] uppercase tracking-[0.35em] text-primary shadow-gold">
              {station.initials}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="font-condensed text-[11px] uppercase tracking-[0.32em] text-primary/90">{station.tagline}</p>
              <h3 className="mt-2 font-display text-2xl leading-[0.95] text-background drop-shadow-lg">{station.name}</h3>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-primary via-primary/40 to-transparent" />
          </div>
        </div>

        <button
          onClick={handlePlay}
          aria-label={`Play ${station.name}`}
          className="absolute inset-0 grid place-items-center bg-background/0 group-hover:bg-background/30 transition-all duration-500"
        >
          <span className={`h-16 w-16 rounded-full bg-primary text-primary-foreground grid place-items-center scale-0 group-hover:scale-100 transition-transform duration-500 shadow-gold-strong ${playing ? 'animate-pulse-gold' : ''}`}>
            <Play className="h-7 w-7 fill-current ml-1" />
          </span>
        </button>
      </div>

      {variant === "detailed" && (
        <div className="p-5 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{station.description}</p>
          <button
            onClick={handlePlay}
            className="w-full py-2 rounded-md border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-condensed uppercase tracking-wider text-sm flex items-center justify-center gap-2"
          >
            <Play className="h-3 w-3 fill-current" /> Listen Now
          </button>
        </div>
      )}
    </div>
  );
};

export default StationCard;
