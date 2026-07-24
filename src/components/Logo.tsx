import { Mic } from "lucide-react";
import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
}

const Logo = ({ size = "md", asLink = true }: LogoProps) => {
  const sizes = {
    sm: {
      wrap: "gap-2.5",
      emblem: "h-11 w-11",
      ring: "border-[2px]",
      mic: "h-5 w-5",
      top: "text-[2rem]",
      bottom: "text-[1.45rem]",
      trackTop: "tracking-[0.02em]",
      trackBottom: "tracking-[0.34em]",
    },
    md: {
      wrap: "gap-3",
      emblem: "h-14 w-14",
      ring: "border-[2.5px]",
      mic: "h-6 w-6",
      top: "text-[2.5rem]",
      bottom: "text-[1.8rem]",
      trackTop: "tracking-[0.02em]",
      trackBottom: "tracking-[0.34em]",
    },
    lg: {
      wrap: "gap-4",
      emblem: "h-20 w-20",
      ring: "border-[3px]",
      mic: "h-9 w-9",
      top: "text-[3.6rem]",
      bottom: "text-[2.5rem]",
      trackTop: "tracking-[0.02em]",
      trackBottom: "tracking-[0.34em]",
    },
  } as const;

  const s = sizes[size];

  const inner = (
    <div className={`inline-flex items-center ${s.wrap}`}>
      <div className={`relative ${s.emblem} rounded-full ${s.ring} border-primary/90 bg-black shadow-gold overflow-hidden`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,110,0.35),transparent_60%)]" />
        <div className="absolute inset-0 grid place-items-center">
          <Mic className={`${s.mic} text-primary`} strokeWidth={2.2} />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-primary/80 rounded-full" style={{ height: "26%" }} />
        <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[58%] h-[2px] bg-primary/80 rounded-full" />
        <div className="absolute inset-0 rounded-full border border-primary/25 scale-[0.78]" />
      </div>

      <div className="leading-[0.85] select-none">
        <div className={`font-display ${s.top} ${s.trackTop} text-foreground`}>GOOD TO GO</div>
        <div className={`font-display ${s.bottom} ${s.trackBottom} text-primary mt-1`}>RADIO</div>
      </div>
    </div>
  );

  return asLink ? (
    <Link to="/" className="inline-block" aria-label="Good To Go Radio home">
      {inner}
    </Link>
  ) : (
    inner
  );
};

export default Logo;
