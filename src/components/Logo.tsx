import { Radio } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
}

const Logo = ({ size = "md", asLink = true }: LogoProps) => {
  const sizes = {
    sm: { icon: "h-6 w-6", text: "text-xl", sub: "text-[9px]" },
    md: { icon: "h-8 w-8", text: "text-2xl", sub: "text-[10px]" },
    lg: { icon: "h-12 w-12", text: "text-4xl md:text-5xl", sub: "text-xs md:text-sm" },
  };
  const s = sizes[size];

  const inner = (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full" />
        <div className="relative bg-gradient-gold-bright p-2 rounded-lg shadow-gold">
          <Radio className={`${s.icon} text-background`} strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-display ${s.text} text-foreground tracking-wide`}>
          GOOD <span className="text-gradient-gold">TO GO</span> RADIO
        </span>
        <span className={`${s.sub} font-condensed tracking-[0.3em] text-muted-foreground mt-1`}>
          ON AIR · WORLDWIDE
        </span>
      </div>
    </div>
  );

  return asLink ? <Link to="/" className="inline-block">{inner}</Link> : inner;
};

export default Logo;
