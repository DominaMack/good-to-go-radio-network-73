<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
=======
import { Mic } from "lucide-react";
>>>>>>> theirs
=======
import { Mic } from "lucide-react";
>>>>>>> theirs
=======
import { Mic } from "lucide-react";
>>>>>>> theirs
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
}

const Logo = ({ size = "md", asLink = true }: LogoProps) => {
  const sizes = {
    sm: {
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
      mobileSquareClass: "h-11 w-11",
      mobileHorizontalClass: "h-10 w-auto max-w-[180px]",
      desktopHorizontalClass: "md:h-10 md:w-auto md:max-w-[240px]",
    },
    md: {
      mobileSquareClass: "h-14 w-14",
      mobileHorizontalClass: "h-11 w-auto max-w-[220px]",
      desktopHorizontalClass: "md:h-14 md:w-auto md:max-w-[320px]",
    },
    lg: {
      mobileSquareClass: "h-20 w-20",
      mobileHorizontalClass: "h-16 w-auto max-w-[280px]",
      desktopHorizontalClass: "md:h-24 md:w-auto md:max-w-[520px] lg:h-28",
    },
  };
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
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

<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  const s = sizes[size];
  const showSquareOnMobile = size === "sm";

  const inner = (
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    <div className="flex items-center">
      <img
        src="/branding/goodtogoradio-logo-square.png"
        alt="Good To Go Radio logo"
        className={cn(
          "object-contain drop-shadow-[0_0_18px_rgba(244,182,36,0.18)]",
          showSquareOnMobile ? "block md:hidden" : "hidden",
          s.mobileSquareClass
        )}
        loading="eager"
        decoding="async"
      />
      <img
        src="/branding/goodtogoradio-logo-horizontal.png"
        alt="Good To Go Radio logo"
        className={cn(
          "object-contain drop-shadow-[0_0_18px_rgba(244,182,36,0.16)]",
          showSquareOnMobile ? "hidden md:block" : "block",
          showSquareOnMobile ? s.desktopHorizontalClass : s.mobileHorizontalClass,
          !showSquareOnMobile && s.desktopHorizontalClass
        )}
        loading="eager"
        decoding="async"
      />
    </div>
  );

  return asLink ? <Link to="/" aria-label="Good To Go Radio home" className="inline-block">{inner}</Link> : inner;
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
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
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
};

export default Logo;
