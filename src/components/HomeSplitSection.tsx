import { WorkExperienceTimeline, type WorkTimelineEntry } from "@/components/WorkExperienceTimeline";
import { CapabilitiesPanel } from "@/components/TechnicalSkillsSection";
import { Section } from "@/components/layout/Section";

interface HomeSplitSectionProps {
  entries: WorkTimelineEntry[];
}

export function HomeSplitSection({ entries }: HomeSplitSectionProps) {
  return (
    <Section id="experience-capabilities" className="bg-transparent">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="min-w-0 lg:col-span-7">
          <div className="mb-10 max-w-2xl space-y-3">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-600">
              Work Experience
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl dark:text-white">
              Built through real product ownership
            </h2>
            <p className="text-base leading-relaxed text-[#86868b] dark:text-[#A1A1A6]">
              A closer look at the roles where design, production, and regulated hardware execution came together.
            </p>
          </div>
          <WorkExperienceTimeline entries={entries} />
        </div>

        <div className="min-w-0 lg:col-span-5">
          <div className="mb-6 max-w-lg space-y-2.5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-600">
              Capabilities
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-gray-900 md:text-[2rem]">
              Capabilities Bento Box
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              Six capability areas shaped by hands-on work across product development, manufacturing execution, and regulated hardware scale-up.
            </p>
          </div>
          <CapabilitiesPanel />
        </div>
      </div>
    </Section>
  );
}
