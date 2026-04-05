import { siteConfig } from "@/config/site";
import { Section } from "@/components/layout/Section";

export function AboutSection() {
  const { name, role, bio, avatar } = siteConfig;

  return (
    <Section label="About">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="shrink-0">
          <img
            src={avatar}
            alt={name}
            width={160}
            height={160}
            className="rounded-full w-32 h-32 md:w-40 md:h-40 object-cover border border-border shadow-card"
          />
        </div>
        <div className="max-w-xl">
          <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-[-0.03em] mb-3">
            {name}
          </h2>
          <p className="text-sm font-medium text-muted-foreground mb-4">{role}</p>
          <p className="text-base text-muted-foreground leading-relaxed">{bio}</p>
        </div>
      </div>
    </Section>
  );
}
