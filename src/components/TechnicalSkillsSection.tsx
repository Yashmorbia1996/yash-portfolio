import { DraftingCompass, Boxes, ClipboardCheck, FlaskConical, ShieldCheck, Workflow } from "lucide-react";
import { Section } from "@/components/layout/Section";

const skillGroups = [
  {
    icon: DraftingCompass,
    title: "Mechanical Product Development",
    summary:
      "Owned concept-to-production development for a handheld FDA-cleared laser device. Worked across mechanical design, DFM feedback, tolerance-driven iteration, and build readiness from EVT through PVT.",
    highlights: ["Concept-to-production", "DFM / DFA", "Durability / cost tradeoffs"],
  },
  {
    icon: Boxes,
    title: "CAD & Drawings",
    summary:
      "SolidWorks (CSWP) for assemblies, surfacing, and 2D drawings with GD&T. Ran tolerance stack-up analysis on critical fit interfaces and released production drawings under document control.",
    highlights: ["SolidWorks CSWP", "Assemblies & surfacing", "GD&T", "Tolerance stack-up"],
  },
  {
    icon: FlaskConical,
    title: "Materials & Manufacturing",
    summary:
      "Worked primarily with plastics, elastomers, and textiles on a consumer medical device. Selected materials for durability, processability, and regulatory compliance, and developed repeatable manufacturing processes from rapid prototype through production release.",
    highlights: ["Plastics / elastomers / textiles", "Rapid prototyping", "DFM / DFA", "Process development"],
  },
  {
    icon: ClipboardCheck,
    title: "Validation & Verification",
    summary:
      "Planned and executed requirements-based verification across EVT, DVT, and PVT build stages. Documented results, led root cause investigations on failures, drove corrective actions, and confirmed effectiveness before sign-off.",
    highlights: ["EVT / DVT / PVT", "Requirements-based verification", "Fit / function validation", "RCA / CAPA follow-through"],
  },
  {
    icon: ShieldCheck,
    title: "Quality Systems",
    summary:
      "Supported ISO 13485 design controls across the full product lifecycle. Maintained DHF and DMR documentation, managed CAPAs and change control, and participated in both MDSAP and internal audits.",
    highlights: ["ISO 13485 / ISO 9001", "DHF / DMR", "CAPA / change control", "MDSAP & internal audits"],
  },
  {
    icon: Workflow,
    title: "Leadership & Operations",
    summary:
      "Led a 10-person production team through a 3× output ramp. Owned production forecasting, capacity planning, inventory tracking, and supply chain coordination — built in spreadsheets without an ERP, maintained through two MDSAP audit cycles.",
    highlights: [
      "Forecasting -> production models",
      "Global supply chain operations",
      "Team leadership — 10 technicians",
      "SOPs / capacity models",
    ],
  },
] as const;

export function TechnicalSkillsSection() {
  return (
    <Section label="Technical Skills" id="technical-skills">
      <div className="mb-10 max-w-3xl space-y-3">
        <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-[-0.03em] text-foreground">
          What I know how to do
        </h2>
        <p className="text-sm leading-relaxed text-body-text">
          Six areas built through direct execution on one FDA-cleared product — from early concept through full production ramp.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map(({ icon: Icon, title, summary, highlights }) => (
          <article
            key={title}
            className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm transition-all duration-300 hover:border-primary-accent/35 hover:shadow-card-hover"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-accent/10 text-primary-accent">
              <Icon className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <h3 className="mb-3 text-xl font-semibold tracking-[-0.01em] text-foreground">
              {title}
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-body-text">{summary}</p>
            <div className="flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium tracking-tight text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
