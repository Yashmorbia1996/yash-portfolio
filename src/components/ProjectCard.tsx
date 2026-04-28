"use client";

import { LivBenchPocImage, isLivBenchPocSlideUrl } from "./LivBenchPocImage";
import { ProjectCardCoverSlideshow } from "./ProjectCardCoverSlideshow";

interface ProjectCardProps {
  title: string;
  slug: string;
  href?: string;
  cover?: string;
  /** When 2+ URLs, cover cycles every 5s with a crossfade (see ProjectCardCoverSlideshow). */
  coverSlides?: string[];
  context?: string;
  summary?: string;
  tags?: string[];
  problem?: string;
  action?: string;
  result?: string;
  eyebrow?: string;
  ctaLabel?: string;
  showSkills?: boolean;
}

export function ProjectCard({
  title,
  slug,
  href,
  cover,
  coverSlides,
  context,
  summary,
  tags,
  problem,
  action,
  result,
  eyebrow,
  ctaLabel,
  showSkills = false,
}: ProjectCardProps) {
  const summaryExcerpt =
    summary?.split(/\n\n+/)[0]?.trim() ?? summary;
  const linkHref = href ?? `/projects/${slug}`;
  const hasCaseStudyPreview = Boolean(problem && action && result);
  const cardEyebrow = eyebrow ?? (hasCaseStudyPreview ? "Case Study" : "Project");
  const cardCta = ctaLabel ?? (hasCaseStudyPreview ? "Read case study" : "Read more");

  const slideList = coverSlides?.filter(Boolean) ?? [];
  const showSlideshow = slideList.length > 1;
  const singleCoverSrc = slideList.length === 1 ? slideList[0] : cover;

  return (
    <article className="theme-panel theme-panel-hover group flex h-full flex-col overflow-hidden rounded-[var(--radius-md)]">
      <a href={linkHref} className="block">
        <div className="aspect-video rounded-t-[var(--radius-md)] border-b border-border bg-surface-elevated">
          {showSlideshow ? (
            <ProjectCardCoverSlideshow images={slideList} title={title} />
          ) : singleCoverSrc ? (
            isLivBenchPocSlideUrl(singleCoverSrc) ? (
              <div className="flex h-full w-full items-center justify-center">
                <LivBenchPocImage compact />
              </div>
            ) : (
              <img src={singleCoverSrc} alt={title} className="h-full w-full object-cover" />
            )
          ) : null}
        </div>
      </a>

      <div className="flex flex-1 flex-col p-6">
        <p className="theme-eyebrow">
          {cardEyebrow}
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-text-primary">
          <a href={linkHref} className="transition-colors duration-200 group-hover:text-primary-accent">
            {title}
          </a>
        </h3>
        {context ? (
          <p className="mt-2 text-[15px] leading-relaxed text-text-muted">
            {context}
          </p>
        ) : null}

        {hasCaseStudyPreview ? (
          <div className="mt-6 flex-1 space-y-4 text-sm leading-relaxed text-text-secondary">
            <div>
              <p className="theme-eyebrow text-text-muted">
                Situation / Problem
              </p>
              <p className="mt-1">{problem}</p>
            </div>
            <div>
              <p className="theme-eyebrow text-text-muted">Action</p>
              <p className="mt-1">{action}</p>
            </div>
            <div>
              <p className="theme-eyebrow text-text-muted">Result</p>
              <p className="mt-1">{result}</p>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex-1">
            {summaryExcerpt ? (
              <p className="text-base leading-relaxed text-text-secondary">{summaryExcerpt}</p>
            ) : null}
            {showSkills && tags?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                <p className="w-full font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
                  Skills learned / applied
                </p>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        )}

        {hasCaseStudyPreview && showSkills && tags?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            <p className="w-full font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">
              Skills learned / applied
            </p>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-6 pt-2">
          <a
            href={linkHref}
            className="text-sm text-primary-accent transition-colors duration-200 hover:opacity-80"
          >
            {cardCta} →
          </a>
        </div>
      </div>
    </article>
  );
}
