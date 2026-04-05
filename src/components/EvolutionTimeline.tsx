import { cn } from "@/lib/utils";

export interface TimelineStep {
  number: number;
  phase: string;
  decision: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
}

interface EvolutionTimelineProps {
  steps?: TimelineStep[];
  className?: string;
}

const defaultSteps: TimelineStep[] = [
  {
    number: 1,
    phase: "Concept",
    decision: "Define form factor from user needs and regulatory constraints",
    description:
      "Initial requirements were gathered from clinical stakeholders and regulatory precedents. Early sketches explored three form factors before a handheld ergonomic profile was selected based on IEC 62366 usability criteria and manufacturing feasibility.",
    imageAlt: "Concept sketches and initial CAD layout",
  },
  {
    number: 2,
    phase: "First Design",
    decision: "Prototype with COTS components to validate thermal and structural assumptions",
    description:
      "Alpha build used commercial off-the-shelf hardware to validate thermal dissipation models and cable routing. FEA on the enclosure shell revealed a stress concentration at the hinge — redesigned with a 1.5 mm fillet and updated material to PC/ABS blend.",
    imageAlt: "Alpha prototype and FEA stress analysis render",
  },
  {
    number: 3,
    phase: "Production Optimized",
    decision: "DFM review consolidates fasteners and cuts assembly time by 40%",
    description:
      "Final design consolidated 14 fasteners into 6 snap-fit interfaces, reduced BOM cost by 18%, and passed IEC 60601-1 mechanical strength and IP54 ingress protection testing. Line cycle time dropped from 4.2 to 2.5 minutes per unit.",
    imageAlt: "Production-ready CAD model and test fixture",
  },
];

function ImagePlaceholder({ src, alt }: { src?: string; alt?: string }) {
  if (src) {
    return (
      <img src={src} alt={alt ?? ""} className="w-full h-full object-cover" />
    );
  }
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
      {alt && (
        <p className="text-xs text-center px-6 mt-1 leading-snug">{alt}</p>
      )}
    </>
  );
}

export function EvolutionTimeline({
  steps = defaultSteps,
  className,
}: EvolutionTimelineProps) {
  return (
    <div className={cn("py-10", className)}>
      <h2 className="font-heading text-2xl md:text-3xl font-normal tracking-[-0.02em] text-foreground mb-2">
        Design Evolution
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-10">
        From initial concept to production-optimized system.
      </p>

      <ol className="space-y-0">
        {steps.map((step, index) => (
          <li key={step.number} className="relative">
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-start">

              {/* ── Left column: spine + text ── */}
              <div className="flex gap-4">
                {/* Spine: badge + connecting line */}
                <div className="flex flex-col items-center flex-shrink-0 w-8">
                  <div
                    className="relative z-10 w-8 h-8 rounded-full bg-background border-2 border-primary-accent flex items-center justify-center flex-shrink-0"
                    style={{ boxShadow: "0 0 14px rgba(94, 106, 210, 0.35)" }}
                  >
                    <span className="text-xs font-bold text-primary-accent">
                      {step.number}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 w-px bg-border mt-1.5 mb-0 min-h-[3rem]" />
                  )}
                </div>

                {/* Text block */}
                <div className={cn("pt-1", index < steps.length - 1 ? "pb-14" : "pb-2")}>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-primary-accent mb-2">
                    {step.phase}
                  </p>
                  <h3 className="text-base font-semibold text-foreground mb-2 leading-snug tracking-[-0.01em]">
                    Design Decision
                  </h3>
                  <p className="text-sm font-medium text-foreground/75 mb-3 italic leading-relaxed">
                    "{step.decision}"
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* ── Right column: image ── */}
              <div className={cn("pt-1", index < steps.length - 1 ? "pb-14" : "pb-2")}>
                <div className="rounded-xl border border-border bg-muted/30 aspect-video flex flex-col items-center justify-center gap-1.5 text-muted-foreground/40 overflow-hidden shadow-inner">
                  <ImagePlaceholder src={step.imageSrc} alt={step.imageAlt} />
                </div>
              </div>

            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
