import { siteConfig } from "@/config/site";
import { Section } from "@/components/layout/Section";
import { aboutTitle, aboutBioParagraphs, aboutNameNote } from "@/data/aboutContent";
import { AboutMetrics } from "@/components/AboutMetrics";

export function AboutSection() {
  const { name, role, avatar, location } = siteConfig;

  return (
    <Section label="About">
      <div className="grid gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start">
        <div className="flex shrink-0 flex-col gap-3">
          <img
            src={avatar}
            alt={name}
            width={160}
            height={160}
            className="h-32 w-32 rounded-full border border-solid border-border object-cover shadow-card md:h-40 md:w-40"
          />
          <p className="text-xs text-muted-foreground">{location}</p>
        </div>
        <div className="min-w-0 max-w-4xl space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">{name}</p>
            <p className="text-sm leading-relaxed text-body-text">{aboutNameNote}</p>
          </div>
          <p className="text-sm text-muted-foreground">{role}</p>
          <h2 className="font-heading text-2xl font-normal tracking-[-0.03em] text-primary-accent md:text-3xl">
            {aboutTitle}
          </h2>
          <div className="max-w-3xl space-y-3 text-sm leading-relaxed text-body-text">
            {aboutBioParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="pt-2">
            <AboutMetrics />
          </div>
        </div>
      </div>
    </Section>
  );
}
