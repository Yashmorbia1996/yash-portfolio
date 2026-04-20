import { WorkExperienceTimeline, type WorkTimelineEntry } from "@/components/WorkExperienceTimeline";
import { Section } from "@/components/layout/Section";

interface HomeWorkExperienceSectionProps {
  entries: WorkTimelineEntry[];
}

export function HomeWorkExperienceSection({ entries }: HomeWorkExperienceSectionProps) {
  return (
    <Section id="home-work-experience" className="bg-transparent pt-12 md:pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-4xl space-y-4">
          <p className="theme-section-title text-5xl font-semibold md:text-6xl">
            Work Experience
          </p>
          <p className="text-base leading-relaxed text-text-secondary">
            A closer look at the roles where design, production, and regulated hardware execution came together.
          </p>
        </div>

        <WorkExperienceTimeline entries={entries} variant="home" />
      </div>
    </Section>
  );
}
