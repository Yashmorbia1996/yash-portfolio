"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCardCoverSlideshow } from "./ProjectCardCoverSlideshow";

export interface StudyLink {
  label: string;
  meta: string;
  slug: string;
}

export interface CarouselProject {
  title: string;
  slug: string;
  tags: string[];
  /** When problem, action, and result are all set, show the case-study preview layout. Otherwise show summary (e.g. “More projects” on detail pages). */
  context?: string;
  problem?: string;
  action?: string;
  result?: string;
  summary?: string;
  studyLinks?: StudyLink[];
  cover?: string;
  coverSlides?: string[];
  /** Per-card eyebrow label — overrides the component-level eyebrow prop */
  eyebrow?: string;
}

const COVER_FALLBACK = "/images/projects/project-2.svg";

/** Horizontal offset between stacked cards (px); keep modest on narrow widths */
const GAP = 16;

/** Accumulated wheel delta (px-equivalent) before one slide change; one native wheel event moves at most one slide */
const WHEEL_ACC_THRESHOLD = 44;

function pixelWheelDelta(e: WheelEvent, viewportH: number, viewportW: number): number {
  let dy = e.deltaY;
  let dx = e.deltaX;
  if (e.deltaMode === 1) {
    dy *= 16;
    dx *= 16;
  } else if (e.deltaMode === 2) {
    dy *= viewportH;
    dx *= viewportW;
  }
  return dy + dx;
}

export function WorkProjectsCarousel({
  projects,
  eyebrow = "Work Project",
  ctaLabel = "Read case study",
}: {
  projects: CarouselProject[];
  eyebrow?: string;
  ctaLabel?: string;
}) {
  const N = projects.length;
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const accRef  = useRef(0);
  const activeRef = useRef(0);
  activeRef.current = active;

  const goTo = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, N - 1));
    activeRef.current = clamped;
    setActive(clamped);
  }, [N]);

  const getLenis = () =>
    (window as unknown as Record<string, { stop?: () => void; start?: () => void }>).__lenis;

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    /** Wheel → change slide when pointer path is inside a project card; otherwise Lenis / native scroll the page. */
    const onWheel = (e: WheelEvent) => {
      const onCard = e.composedPath().some(
        (n) => n instanceof Element && n.closest("[data-carousel-card]"),
      );
      if (!onCard) return;

      e.preventDefault();

      const vh = root.clientHeight || window.innerHeight;
      const vw = root.clientWidth || window.innerWidth;
      const d = pixelWheelDelta(e, vh, vw);

      // Opposite-direction scroll cancels buildup so reversing feels immediate
      if (accRef.current !== 0 && Math.sign(d) !== Math.sign(accRef.current)) {
        accRef.current = 0;
      }
      accRef.current += d;

      const a = activeRef.current;

      // At most one slide per wheel event — large deltas (one mouse notch) must not skip to the end
      if (accRef.current >= WHEEL_ACC_THRESHOLD && a < N - 1) {
        goTo(a + 1);
        accRef.current = 0;
      } else if (accRef.current <= -WHEEL_ACC_THRESHOLD && a > 0) {
        goTo(a - 1);
        accRef.current = 0;
      }
    };

    root.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      getLenis()?.start?.();
      root.removeEventListener("wheel", onWheel);
    };
  }, [goTo, N]);

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-x-hidden pb-14"
    >
      <div className="isolate mx-auto grid min-h-0 w-full max-w-sm justify-items-center px-3 pt-5 sm:max-w-md sm:px-4 [grid-template-areas:'stack']">
        {projects.map((p, i) => {
          const offset   = i - active;
          const isActive = offset === 0;
          const isHidden = Math.abs(offset) > 1;

          const slideList = p.coverSlides?.filter(Boolean) ?? [];
          const showSlides = slideList.length > 1;
          const coverSrc = p.cover || COVER_FALLBACK;
          const singleSrc = slideList.length === 1 ? slideList[0] : coverSrc;
          const hasCaseStudy = Boolean(p.problem && p.action && p.result);
          const summaryExcerpt =
            p.summary?.split(/\n\n+/)[0]?.trim() ?? p.summary?.trim() ?? "";

          return (
            <div
              key={p.slug}
              onClick={() => !isActive && goTo(i)}
              className="[grid-area:stack] flex h-full min-h-0 w-full max-w-[min(24rem,calc(100vw-1.5rem))] flex-col justify-self-center self-stretch transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] sm:max-w-[min(28rem,calc(100vw-2rem))]"
              style={{
                transform: `translateX(calc(${offset} * (100% + ${GAP}px)))`,
                opacity:    isHidden ? 0 : isActive ? 1 : 0.4,
                filter:     isActive ? "none" : "blur(3px)",
                pointerEvents: isHidden ? "none" : "auto",
                cursor:     isActive ? "default" : "pointer",
                zIndex:     isActive ? 10 : 1,
              }}
            >
              <a
                href={`/projects/${p.slug}`}
                onClick={(e) => {
                  if (!isActive) e.preventDefault();
                }}
                className="theme-panel group flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl"
                data-carousel-card
                data-lenis-prevent-wheel
                onMouseEnter={() => {
                  accRef.current = 0;
                  getLenis()?.stop?.();
                }}
                onMouseLeave={() => {
                  accRef.current = 0;
                  getLenis()?.start?.();
                }}
              >
                {/* Image — aspect-video (same as ProjectCard) */}
                <div className="aspect-video w-full shrink-0 overflow-hidden rounded-t-2xl border-b border-border bg-surface-elevated">
                  {showSlides ? (
                    <ProjectCardCoverSlideshow images={slideList} title={p.title} />
                  ) : singleSrc ? (
                    <img
                      src={singleSrc}
                      alt={p.title}
                      className="h-full w-full object-contain object-center"
                    />
                  ) : null}
                </div>

                {/* Body fills remaining height so every slide matches the tallest card in the stack */}
                <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
                  <div className="shrink-0">
                    <p className="theme-eyebrow font-mono text-[10px] font-semibold uppercase tracking-[0.16em] sm:text-[11px]">
                      {p.eyebrow ?? eyebrow}
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold tracking-[-0.03em] text-text-primary transition-colors duration-200 group-hover:text-primary-accent sm:mt-2 sm:text-xl">
                      {p.title}
                    </h3>
                    {p.context && (
                      <p className="mt-1.5 text-xs leading-relaxed text-text-muted sm:mt-2 sm:text-sm">{p.context}</p>
                    )}
                  </div>

                  {hasCaseStudy ? (
                    <div className="mt-4 flex min-h-0 flex-1 flex-col gap-3 text-xs leading-relaxed text-text-secondary sm:mt-5 sm:gap-4 sm:text-sm">
                      <div>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">Situation / Problem</p>
                        <p className="mt-1">{p.problem}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">Action</p>
                        <p className="mt-1">{p.action}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">Result</p>
                        <p className="mt-1">{p.result}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 flex min-h-0 flex-1 flex-col text-xs leading-relaxed text-text-secondary sm:mt-5 sm:text-sm">
                      {summaryExcerpt ? (
                        <p className="leading-relaxed">{summaryExcerpt}</p>
                      ) : null}
                      {p.studyLinks && p.studyLinks.length > 0 && (
                        <div className="mt-3 space-y-1.5 sm:mt-4">
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted sm:text-[11px]">Studies</p>
                          {p.studyLinks.map((s) => (
                            <div
                              key={s.slug || s.label}
                              className={`flex items-center justify-between rounded-lg border px-3 py-2 ${s.slug ? "border-border bg-surface-elevated" : "border-dashed border-border opacity-50"}`}
                            >
                              <div className="min-w-0">
                                <p className="text-[11px] font-medium text-text-primary sm:text-[12px]">{s.label}</p>
                                {s.meta && <p className="mt-0.5 text-[10px] text-text-muted">{s.meta}</p>}
                              </div>
                              {s.slug && <span className="ml-3 shrink-0 text-[11px] text-primary-accent">→</span>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {p.tags?.length > 0 && (
                    <div className="mt-4 shrink-0 border-t border-border pt-4 sm:mt-5 sm:pt-5">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted mb-1.5 sm:text-[11px] sm:mb-2">
                        {hasCaseStudy ? "Skills learned / applied" : "Tags"}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {p.tags.map(tag => (
                          <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-text-muted sm:px-2.5 sm:py-1 sm:text-[11px] sm:tracking-[0.12em]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-4 shrink-0 pt-0.5 sm:mt-5 sm:pt-1">
                    <span className="text-xs text-primary-accent sm:text-sm">{ctaLabel} →</span>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

      {/* Prev arrow */}
      {active > 0 && (
        <button
          onClick={() => goTo(active - 1)}
          className="absolute left-6 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-text-muted backdrop-blur-sm transition-colors hover:text-text-primary"
          aria-label="Previous project"
        >←</button>
      )}

      {/* Next arrow */}
      {active < N - 1 && (
        <button
          onClick={() => goTo(active + 1)}
          className="absolute right-6 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-text-muted backdrop-blur-sm transition-colors hover:text-text-primary"
          aria-label="Next project"
        >→</button>
      )}

      {/* Dot indicators */}
      <div className="absolute bottom-1 left-0 right-0 z-20 flex justify-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-primary-accent" : "w-1.5 bg-border hover:bg-text-muted"
            }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
