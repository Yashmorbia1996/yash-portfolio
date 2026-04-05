import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  id?: string;
}

export function Section({ children, className, label, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-16 md:py-24 scroll-reveal", className)}>
      <div className="site-container">
        {label && (
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-8 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-accent" />
            {label}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
