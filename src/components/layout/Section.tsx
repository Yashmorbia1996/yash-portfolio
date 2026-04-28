import { cn } from "@/lib/utils";

type SectionSurface = "white" | "gray";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  id?: string;
  /** Alternating homepage rhythm: pure white/black vs Apple gray / elevated dark gray */
  surface?: SectionSurface;
}

const surfaceClass: Record<SectionSurface, string> = {
  white: "bg-white dark:bg-black",
  gray: "bg-[#f5f5f7] dark:bg-[#1C1C1E]",
};

export function Section({ children, className, label, id, surface }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      data-surface={surface}
      className={cn("py-24 md:py-32 scroll-reveal", surface ? surfaceClass[surface] : undefined, className)}
    >
      <div className="site-container">
        {label && (
          <p className="theme-eyebrow mb-8 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-accent" />
            {label}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
