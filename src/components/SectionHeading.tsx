import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

const SectionHeading = ({ eyebrow, title, subtitle, align = "center", className }: Props) => (
  <div className={cn(
    "max-w-3xl mb-12",
    align === "center" && "mx-auto text-center",
    className
  )}>
    {eyebrow && (
      <div className={cn("flex items-center gap-3 mb-4", align === "center" && "justify-center")}>
        <span className="h-px w-8 bg-primary" />
        <span className="font-condensed text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</span>
        <span className="h-px w-8 bg-primary" />
      </div>
    )}
    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{subtitle}</p>
    )}
  </div>
);

export default SectionHeading;
