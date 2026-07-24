import { Play } from "lucide-react";
import type { Station } from "@/data/stations";
import { toast } from "sonner";
import { useState } from "react";

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
    <article className="station-card group">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-primary/40">
        <img
          src={station.coverImage}
          alt={`${station.name} cover art`}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/25 transition-colors duration-500" />

        <button
          onClick={handlePlay}
          aria-label={`Play ${station.name}`}
          className="absolute inset-0 grid place-items-center"
        >
          <span
            className={`h-14 w-14 rounded-full border border-primary/80 bg-background/85 text-primary grid place-items-center scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 shadow-gold-strong ${playing ? "animate-pulse-gold" : ""}`}
          >
            <Play className="h-6 w-6 fill-current ml-0.5" />
          </span>
        </button>
      </div>

      <div className="p-4 space-y-2">
        <p className="font-condensed text-xs uppercase tracking-[0.24em] text-primary/80">{station.tagline}</p>
        <h3 className="font-display text-2xl leading-tight">{station.name}</h3>
        {station.host && <p className="text-sm text-muted-foreground">Hosted by {station.host}</p>}

        {variant === "detailed" && (
          <>
            <p className="text-sm text-muted-foreground line-clamp-2">{station.description}</p>
            <button
              onClick={handlePlay}
              className="w-full py-2 rounded-md border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-condensed uppercase tracking-wider text-sm flex items-center justify-center gap-2"
            >
              <Play className="h-3 w-3 fill-current" /> Listen Now
            </button>
          </>
        )}
      </div>
    </article>
  );
};

export default StationCard;
