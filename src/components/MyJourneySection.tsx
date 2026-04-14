import { useState } from "react";
import { Mail, Minus, Plus } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";

type JourneyMilestone = {
  id: string;
  stage: string;
  title: string;
  phase: string;
  summary: string;
  detail: string;
  featured?: boolean;
  featuredLabel?: string;
};

const pastPresentMilestones: JourneyMilestone[] = [
  {
    id: "moved-to-us",
    stage: "2019",
    title: "Moved to the U.S.",
    phase: "A leap into uncertainty",
    summary: "Left home and family to begin a new chapter in engineering and education.",
    detail:
      "I moved to the U.S. in 2019 to pursue graduate school and build a future in engineering. It was a major personal shift and the beginning of everything that followed.",
  },
  {
    id: "masters",
    stage: "2019-2021",
    title: "Pursuing my Master's",
    phase: "Learning and adapting",
    summary: "Built technical depth while adjusting to a new environment and life in the U.S.",
    detail:
      "Graduate school was not just about coursework. It was also about adapting, building confidence, making new friends, and growing through a completely new environment.",
  },
  {
    id: "first-internship",
    stage: "2021",
    title: "First real validation",
    phase: "Turning theory into contribution",
    summary: "Turned classroom learning into real engineering contribution.",
    detail:
      "My first internship gave me a real sense of what engineering work looked like in practice and helped confirm that I wanted to build my career in product development and manufacturing.",
  },
  {
    id: "finished-masters",
    stage: "2021",
    title: "Finishing my Master's",
    phase: "A proud milestone",
    summary: "Completed an important personal and professional goal.",
    detail:
      "Finishing my master's represented much more than a degree. It marked the end of one major chapter and the start of a more serious professional path.",
  },
] as const;

const futureMilestones: JourneyMilestone[] = [
  {
    id: "startup",
    stage: "2022-Present",
    title: "Medical device startup",
    phase: "A defining step",
    summary: "Took on broad ownership across product development, manufacturing, and execution.",
    detail:
      "Joining a medical device startup pushed me into the kind of work that shaped me the most. I took on responsibilities across engineering, fixtures, process development, suppliers, production, and quality execution in a fast-moving environment.",
  },
  {
    id: "larger-orgs",
    stage: "Next Step",
    title: "Into larger organizations",
    phase: "Scaling impact",
    summary: "Ready to contribute in larger, more complex hardware organizations.",
    detail:
      "My next goal is to bring what I have learned in startup execution into a larger organization where I can work on more complex systems, stronger cross-functional structure, and broader engineering scale. I am especially drawn to teams where design decisions carry real consequences in manufacturing and the field, and where rigorous engineering judgment is valued early.",
    featured: true,
  },
  {
    id: "mba",
    stage: "Longer Term",
    title: "Preparing for an MBA",
    phase: "Expanding the toolkit",
    summary: "Interested in building stronger business and strategic leadership skills over time.",
    detail:
      "Long term, I want to complement my engineering background with stronger business, strategic, and leadership capability, and an MBA is one path I am seriously considering.",
  },
  {
    id: "beyond-execution",
    stage: "Future Perspective",
    title: "Growing beyond engineering execution",
    phase: "Broadening perspective",
    summary: "Interested in product, strategy, growth, and leadership beyond pure execution.",
    detail:
      "Over time, I want to better understand not just how products are engineered and built, but how they are positioned, scaled, and led across the business.",
  },
  {
    id: "founder",
    stage: "Long-Term Vision",
    title: "Building something of my own",
    phase: "Long-term vision",
    summary: "My ultimate goal is to build and lead something of my own.",
    detail:
      "The long-term ambition is to combine engineering depth, operational discipline, and business thinking into building something meaningful as a founder and leader.",
  },
] as const;

function JourneyGroup({
  heading,
  description,
  items,
  openId,
  onToggle,
  tone = "default",
}: {
  heading: string;
  description: string;
  items: readonly JourneyMilestone[];
  openId: string | null;
  onToggle: (id: string) => void;
  tone?: "default" | "quiet";
}) {
  return (
    <div>
      <div className="mb-5">
        <p className="theme-eyebrow font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
          {heading}
        </p>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-muted">{description}</p>
      </div>

      <div className="relative">
        <div
          className="pointer-events-none absolute bottom-4 left-[0.6rem] top-4 w-px bg-gradient-to-b from-primary-accent/15 via-primary-accent/40 to-primary-accent/15"
          aria-hidden
        />

        <div className="space-y-5">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const isFeatured = !!item.featured;
            const cardClassName = isFeatured
              ? "theme-panel w-full rounded-[1.25rem] p-5 text-left transition-colors duration-200 md:p-6"
              : tone === "quiet"
                ? "theme-panel w-full rounded-[1.25rem] border-border/80 p-5 text-left shadow-[var(--shadow-soft)] transition-colors duration-200 hover:border-border-strong hover:bg-card-hover/50 md:p-6"
                : "theme-panel theme-panel-hover w-full rounded-[1.25rem] p-5 text-left md:p-6";
            const featuredCardStyle = isFeatured
              ? {
                  borderColor: "color-mix(in srgb, #b59666 45%, var(--color-border))",
                  backgroundColor: "color-mix(in srgb, #b59666 6%, var(--color-card-background))",
                  boxShadow:
                    "0 10px 26px color-mix(in srgb, #b59666 14%, transparent), 0 1px 2px color-mix(in srgb, var(--color-foreground) 6%, transparent)",
                }
              : undefined;
            const markerClassName = isFeatured
              ? "absolute left-0 top-5 inline-flex h-6 w-6 items-center justify-center rounded-full border bg-background"
              : "absolute left-0 top-6 inline-flex h-5 w-5 items-center justify-center rounded-full border border-primary-accent/25 bg-background";
            const featuredMarkerStyle = isFeatured
              ? {
                  borderColor: "color-mix(in srgb, #b59666 52%, var(--color-border))",
                  boxShadow: "0 0 0 4px color-mix(in srgb, #b59666 12%, transparent)",
                }
              : undefined;
            const featuredDotStyle = isFeatured
              ? { backgroundColor: "color-mix(in srgb, #b59666 70%, var(--color-primary-accent) 30%)" }
              : undefined;

            return (
              <article key={item.id} className="relative pl-8">
                <span className={markerClassName} style={featuredMarkerStyle} aria-hidden>
                  <span className="h-1.5 w-1.5 rounded-full bg-primary-accent/80" style={featuredDotStyle} />
                </span>

                <button
                  type="button"
                  onClick={() => onToggle(item.id)}
                  aria-expanded={isOpen}
                  className={cardClassName}
                  style={featuredCardStyle}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-accent">
                          {item.stage}
                        </p>
                      </div>
                      <h3 className="mt-2 text-[1.15rem] font-semibold tracking-[-0.02em] text-text-primary md:text-[1.25rem]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-text-muted">{item.phase}</p>
                      <p className="mt-3 max-w-[40rem] text-sm leading-relaxed text-text-secondary md:text-[0.96rem]">
                        {item.summary}
                      </p>
                    </div>

                    <span
                      className={[
                        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-surface-elevated text-primary-accent",
                        isFeatured ? "border-primary-accent/30 shadow-[var(--shadow-soft)]" : "border-border",
                      ].join(" ")}
                    >
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </div>

                  <div
                    className="grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-300 ease-out"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                      marginTop: isOpen ? "1rem" : "0",
                    }}
                  >
                    <div className="min-h-0">
                      <p className="border-t border-border/80 pt-4 text-sm leading-relaxed text-text-secondary md:text-[0.96rem]">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MyJourneySection() {
  const { social } = siteConfig;
  const [openMilestone, setOpenMilestone] = useState<string | null>(null);

  const toggleMilestone = (id: string) => {
    setOpenMilestone((current) => (current === id ? null : id));
  };

  return (
    <Section id="my-journey">
      <div className="mb-12 max-w-4xl space-y-4">
        <h2 className="theme-section-title text-5xl font-semibold md:text-6xl">
          My Journey &amp; What&apos;s Next
        </h2>
        <p className="max-w-3xl text-base leading-relaxed text-text-secondary">
          The path that shaped how I work today, and the direction I want to grow next.
        </p>
      </div>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] xl:gap-12">
        <JourneyGroup
          heading="Past"
          description="The earlier milestones that shaped my foundation, perspective, and engineering direction."
          items={pastPresentMilestones}
          openId={openMilestone}
          onToggle={toggleMilestone}
          tone="quiet"
        />

        <JourneyGroup
          heading="Present / Future"
          description="Where I am now, what I am actively pursuing next, and the longer-term direction I am building toward."
          items={futureMilestones}
          openId={openMilestone}
          onToggle={toggleMilestone}
        />
      </div>

      <div className="mt-12 grid gap-10 border-t border-border pt-20 lg:grid-cols-12 lg:gap-12 lg:pt-24">
        <div className="lg:col-span-5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            Looking ahead
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-text-primary md:text-3xl">
            What I&apos;m Looking For
          </h3>
          <p className="mt-4 text-base leading-[1.75] text-text-secondary md:text-[1.05rem]">
            I&apos;m looking for a senior mechanical engineering or product development role where the hardware is complex, the systems are real, and engineering decisions carry visible consequences in manufacturing and the field.
          </p>
          <p className="mt-4 text-base leading-[1.75] text-text-secondary md:text-[1.05rem]">
            The strongest fit is a team that values rigor, cross-functional execution, and the details that make products repeatable at scale, from tolerance stack and thermal margins to build discipline and production readiness.
          </p>
        </div>
        <div className="lg:col-span-7">
          <article className="theme-panel rounded-2xl border border-border bg-card p-6 shadow-[0_1px_0_0_rgba(0,0,0,0.04)] md:p-7 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
            <h4 className="text-lg font-semibold tracking-[-0.03em] text-text-primary md:text-xl">Next step</h4>
            <p className="mt-3 text-base leading-[1.75] text-text-secondary md:text-[1.05rem]">
              If this profile fits a role you are hiring for, I would welcome a conversation.
            </p>
            {social.email ? (
              <div className="mt-6 flex justify-center">
                <Button asChild size="lg">
                  <a href={`mailto:${social.email}`}>
                    <Mail className="h-4 w-4" aria-hidden />
                    Get in touch
                  </a>
                </Button>
              </div>
            ) : null}
          </article>
        </div>
      </div>
    </Section>
  );
}
