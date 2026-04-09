import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  id?: string;
}

export function Section({ children, className, label, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-24 md:py-32 scroll-reveal", className)}>
      <div className="site-container">
        {label && (
          <p className="theme-eyebrow mb-8 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-accent" />
            {label}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
