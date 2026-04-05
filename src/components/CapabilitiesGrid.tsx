import { Cog, Users, Globe2, ClipboardCheck } from "lucide-react";
import { Section } from "@/components/layout/Section";

const capabilities = [
  {
    icon: Cog,
    title: "Mechanical Engineering",
    description:
      "End-to-end mechanical design for FDA-cleared electromechanical devices — from concept through DFM, tolerance analysis, and production validation.",
  },
  {
    icon: Users,
    title: "Production Leadership",
    description:
      "Scaled manufacturing lines from 500 to 1,500+ units/week while driving cross-functional teams through NPI, line balancing, and yield improvement programs.",
  },
  {
    icon: Globe2,
    title: "Supply Chain Strategy",
    description:
      "Dual-sourcing, supplier qualification, and cost-down roadmaps across global contract manufacturers — reducing lead times and protecting margin.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality & Regulatory",
    description:
      "8 FDA and ISO 13485 audits with zero findings. Deep expertise in DHF documentation, CAPA, risk management (ISO 14971), and change control.",
  },
];

export function CapabilitiesGrid() {
  return (
    <Section label="Capabilities" id="capabilities">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-[-0.03em] text-foreground">
          Four hats I wear well
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {capabilities.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group rounded-2xl bg-card border border-border p-8 transition-all duration-200 ease-out hover:scale-[1.015] hover:border-primary-accent/50 hover:shadow-card-hover"
          >
            <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-accent/10 text-primary-accent">
              <Icon className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 tracking-[-0.01em]">
              {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
