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
    <div className="station-card group">
      <div className={`relative aspect-square bg-gradient-to-br ${station.gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_50%)]" />
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <span className="font-condensed text-[10px] uppercase tracking-[0.25em] text-background/80 bg-background/20 backdrop-blur-sm px-2 py-1 rounded-full border border-background/20">
              ● Live
            </span>
            <span className="font-display text-background/40 text-5xl leading-none">{station.initials}</span>
          </div>

          <div>
            <p className="font-condensed text-xs uppercase tracking-widest text-background/70">{station.tagline}</p>
            <h3 className="font-display text-2xl text-background leading-tight mt-1">{station.name}</h3>
          </div>
        </div>

        <button
          onClick={handlePlay}
          aria-label={`Play ${station.name}`}
          className="absolute inset-0 grid place-items-center bg-background/0 group-hover:bg-background/40 transition-all duration-500"
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
