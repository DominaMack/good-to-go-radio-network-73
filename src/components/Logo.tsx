import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
}

const Logo = ({ size = "md", asLink = true }: LogoProps) => {
  const sizes = {
    sm: {
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
  const s = sizes[size];
  const showSquareOnMobile = size === "sm";

  const inner = (
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
};

export default Logo;
