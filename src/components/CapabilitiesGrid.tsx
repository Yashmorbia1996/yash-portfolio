import { Cog, Users, Globe2, ClipboardCheck } from "lucide-react";
import { Section } from "@/components/layout/Section";

const capabilities = [
  {
    icon: Cog,
    eyebrow: "Primary identity",
    title: "Mechanical & Manufacturing Engineering",
    summary:
      "I design hardware for the full lifecycle, not just for the CAD review. Every design decision I make accounts for how the part will be made, how it will be tested, and how it will behave after a year in the field.",
    points: [
      "Designed and iterated on an FDA-cleared handheld laser device from early concept through production release",
      "Developed 20+ production and test fixtures to control critical tolerances and reduce operator variability",
      "Led thermal redesign across two phases, grill geometry and internal heatsink, that brought field return rates to under 3%",
    ],
    metric: "<3% field returns",
    featured: true,
  },
  {
    icon: Users,
    eyebrow: "Force multiplier",
    title: "Production Leadership",
    summary:
      "Production is an engineering problem. I approached it the same way I approached design, with time studies, structured iteration, and documented processes that could hold up under an audit.",
    points: [
      "Led and mentored a 10-person production team for 4+ years",
      "Redesigned workflow and fixture strategy to triple weekly output without adding proportional headcount",
      "Developed all SOPs under ISO 13485 document control for training and audit readiness",
    ],
    metric: "500 → 1,500 units/week",
  },
  {
    icon: Globe2,
    eyebrow: "Force multiplier",
    title: "Supply Chain & Vendor Systems",
    summary:
      "I managed suppliers the way I managed engineering problems, with data, contingency planning, and a bias toward preventing issues before they hit the line.",
    points: [
      "Sourced and qualified 15+ suppliers across the US and Asia",
      "Built second-source strategies for high-risk components to eliminate single points of supply failure",
      "Negotiated a 17% reduction in component costs through competitive bidding and volume consolidation",
    ],
    metric: "17% supplier cost reduction",
  },
  {
    icon: ClipboardCheck,
    eyebrow: "Force multiplier",
    title: "Quality & Regulatory Execution",
    summary:
      "I treat CAPAs, audits, and design controls as engineering work, not paperwork. The documentation is only useful if the underlying problem is actually solved.",
    points: [
      "Supported 3 MDSAP and 5 internal ISO 13485 audits with zero major findings across all eight",
      "Managed 15+ CAPAs from root cause through verified closure across design, process, and supplier quality",
      "Maintained DHF and DMR documentation through multiple design changes and production transitions",
    ],
    metric: "8 audits, 0 major findings",
    featured: true,
  },
];

export function CapabilitiesGrid() {
  return (
    <Section label="Capabilities" id="capabilities">
      <div className="mb-10 max-w-3xl space-y-3">
        <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-[-0.03em] text-foreground">
          How I operate
        </h2>
        <p className="text-base leading-relaxed text-body-text">
          Mechanical engineering is the core. The other three are areas I took real ownership of because the product required it, not to broaden my resume, but because no one else was doing it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {capabilities.map(({ icon: Icon, eyebrow, title, summary, points, metric, featured }) => (
          <div
            key={title}
            className={[
              "group rounded-2xl border border-border bg-card/60 p-6 transition-all duration-300 ease-out hover:border-primary-accent/40 hover:shadow-card-hover",
              featured ? "md:col-span-2" : "",
            ].join(" ")}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary-accent/10 text-primary-accent">
                <Icon className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <span className="rounded-full border border-primary-accent/25 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-primary-accent">
                {eyebrow}
              </span>
            </div>
            <h3 className="mb-3 text-xl font-semibold tracking-[-0.01em] text-foreground">
              {title}
            </h3>
            <p className="mb-5 max-w-2xl text-base leading-relaxed text-body-text">
              {summary}
            </p>
            <ul className="space-y-2">
              {points.map((point) => (
                <li key={point} className="flex gap-2.5 text-[15px] text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 inline-flex rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold tracking-tight text-foreground">
              {metric}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
