import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  asLink?: boolean;
}

const Logo = ({ size = "md", asLink = true }: LogoProps) => {
  const sizes = {
    sm: { horizontalClass: "h-10 w-auto", squareClass: "h-11 w-11" },
    md: { horizontalClass: "h-14 w-auto", squareClass: "h-14 w-14" },
    lg: { horizontalClass: "h-24 md:h-28 w-auto", squareClass: "h-20 w-20 md:h-24 md:w-24" },
  };
  const s = sizes[size];

  const inner = (
    <div className="flex items-center">
      <img
        src="/branding/goodtogoradio-logo-square.png"
        alt="Good To Go Radio logo"
        className={cn("block md:hidden object-contain", s.squareClass)}
        loading="eager"
        decoding="async"
      />
      <img
        src="/branding/goodtogoradio-logo-horizontal.png"
        alt="Good To Go Radio logo"
        className={cn("hidden md:block object-contain", s.horizontalClass)}
        loading="eager"
        decoding="async"
      />
    </div>
  );

  return asLink ? <Link to="/" aria-label="Good To Go Radio home" className="inline-block">{inner}</Link> : inner;
};

export default Logo;
