import waveform from "@/assets/waveform.jpg";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

const PageHeader = ({ eyebrow, title, subtitle }: Props) => (
  <section className="relative bg-charcoal border-b border-border overflow-hidden">
    <div
      className="absolute inset-0 opacity-30 bg-cover bg-center"
      style={{ backgroundImage: `url(${waveform})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
    <div className="container-custom relative py-20 md:py-28 text-center">
      {eyebrow && (
        <div className="flex items-center gap-3 mb-4 justify-center">
          <span className="h-px w-8 bg-primary" />
          <span className="font-condensed text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</span>
          <span className="h-px w-8 bg-primary" />
        </div>
      )}
      <h1 className="font-display text-5xl md:text-7xl leading-none">
        {title.split(" ").map((w, i, arr) => (
          <span key={i} className={i === arr.length - 1 ? "text-gradient-gold" : ""}>{w}{i < arr.length - 1 ? " " : ""}</span>
        ))}
      </h1>
      {subtitle && (
        <p className="mt-6 max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed">{subtitle}</p>
      )}
    </div>
  </section>
);

export default PageHeader;
