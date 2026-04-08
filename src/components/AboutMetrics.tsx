import { aboutMetrics } from "@/data/aboutContent";

export function AboutMetrics() {
  return (
    <div className="grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-3">
      {aboutMetrics.map((m) => (
        <div
          key={m.label}
          className="rounded-2xl border border-solid border-border bg-card/50 p-4 shadow-sm transition-shadow duration-300 hover:border-primary-accent/30 hover:shadow-md"
        >
          <p className="mb-1 text-base font-semibold tracking-tight text-foreground">{m.label}</p>
          <p className="text-xs leading-relaxed text-body-text/90">{m.description}</p>
        </div>
      ))}
    </div>
  );
}
