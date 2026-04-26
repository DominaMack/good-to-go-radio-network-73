import { Mic } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
}

const Logo = ({ size = "md", asLink = true }: LogoProps) => {
  const sizes = {
    sm: { emblem: "h-10 w-10", icon: "h-5 w-5", top: "text-sm", bottom: "text-[11px]", gap: "gap-2.5" },
    md: { emblem: "h-12 w-12", icon: "h-6 w-6", top: "text-base", bottom: "text-sm", gap: "gap-3" },
    lg: { emblem: "h-16 w-16", icon: "h-8 w-8", top: "text-2xl md:text-3xl", bottom: "text-lg md:text-xl", gap: "gap-4" },
  };
  const s = sizes[size];

  const inner = (
    <div className={cn("flex items-center", s.gap)}>
      <div className="relative shrink-0">
        <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
        <div className={cn("relative grid place-items-center rounded-full border border-primary/60 bg-background shadow-gold", s.emblem)}>
          <span className="absolute inset-[4px] rounded-full border border-primary/35" />
          <span className="absolute left-1/2 top-[18%] h-[8%] w-px -translate-x-1/2 bg-primary/70" />
          <span className="absolute left-1/2 bottom-[18%] h-[14%] w-px -translate-x-1/2 bg-primary/70" />
          <Mic className={cn(s.icon, "text-primary")} strokeWidth={2.2} />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className={cn("font-condensed uppercase tracking-[0.28em] text-foreground", s.top)}>
          Good To Go
        </span>
        <span className={cn("font-display uppercase tracking-[0.22em] text-gradient-gold", s.bottom, size === "sm" ? "mt-0.5" : "mt-1")}>
          Radio
        </span>
      </div>
    </div>
  );

  return asLink ? <Link to="/" className="inline-block">{inner}</Link> : inner;
};

export default Logo;
