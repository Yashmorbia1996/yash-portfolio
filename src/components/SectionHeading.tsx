interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  className?: string;
}

export function SectionHeading({ eyebrow, title, sub, className }: SectionHeadingProps) {
  return (
    <div className={["mb-10 max-w-3xl space-y-3", className].filter(Boolean).join(" ")}>
      {eyebrow && (
        <p className="theme-eyebrow flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-accent" aria-hidden />
          {eyebrow}
        </p>
      )}
      <h2 className="theme-section-title">{title}</h2>
      {sub && <p className="text-base leading-relaxed text-text-secondary">{sub}</p>}
    </div>
  );
}
