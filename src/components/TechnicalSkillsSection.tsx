import { Box, ClipboardCheck, DraftingCompass, Factory, ShieldCheck, Users } from "lucide-react";
import { Section } from "@/components/layout/Section";

const capabilityCards = [
  {
    icon: DraftingCompass,
    title: "Mechanical Engineering",
    bullets: [
      "Concept-to-production mechanical ownership",
      "Durability, cost, and manufacturability-driven iteration",
      "Worst-Case (WCS) tolerance stack-up analysis",
      "ASME Y14.5 GD&T standards",
    ],
  },
  {
    icon: Box,
    title: "Design Control & CAD",
    bullets: [
      "SolidWorks (CSWP) assemblies, surfacing, and 2D drawings",
      "Controlled drawing release and design documentation",
      "DHF/DMR support across the product lifecycle",
    ],
  },
  {
    icon: Factory,
    title: "Manufacturing Operations",
    bullets: [
      "Plastics, elastomers, and textiles in regulated product builds",
      "Rapid prototyping, DFM/DFA, process development, and Six Sigma-informed improvement",
      "Production scaling from 500 to 1,500 UPW",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Quality & Compliance",
    bullets: [
      "ISO 13485 and ISO 9001 design control support",
      "MDSAP and internal audit readiness",
      "CAPA, change control, and regulatory de-risking",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Systems Validation",
    bullets: [
      "Requirements-based verification and fit/function validation",
      "EVT/DVT/PVT planning and execution",
      "RCA/CAPA follow-through and effectiveness verification",
    ],
  },
  {
    icon: Users,
    title: "Technical Leadership",
    bullets: [
      "Strategic operations, labor planning, and scaling models",
      "Global supply chain coordination and inventory systems",
      "Led 10 production technicians and standardized SOPs",
      "Cross-functional execution across Engineering, Quality, and Supply Chain",
    ],
  },
] as const;

export function CapabilitiesPanel() {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:auto-rows-fr">
      {capabilityCards.map(({ icon: Icon, title, bullets }) => (
        <article
          key={title}
          className="theme-panel theme-panel-hover flex h-full min-h-[15rem] flex-col rounded-xl p-8"
        >
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-surface-elevated text-text-secondary">
            <Icon className="h-8 w-8" strokeWidth={1.5} />
          </div>
          <h3 className="mb-5 text-xl font-semibold tracking-[-0.02em] text-text-primary">{title}</h3>
          <ul className="flex grow flex-col space-y-3 text-sm leading-relaxed text-text-muted">
            {bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2.5">
                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-accent/70" aria-hidden />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function TechnicalSkillsSection() {
  return (
    <Section id="capabilities" surface="white">
      <div className="mb-12 max-w-4xl space-y-4">
        <p className="theme-section-title text-5xl font-semibold md:text-6xl">
          Capabilities
        </p>
        <p className="text-base leading-relaxed text-text-secondary">
          The engineering, manufacturing, and leadership capabilities I bring to the team.
        </p>
      </div>

      <CapabilitiesPanel />
    </Section>
  );
}
