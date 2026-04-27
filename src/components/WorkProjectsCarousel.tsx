"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { LivBenchPocImage, isLivBenchPocSlideUrl } from "./LivBenchPocImage";
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
  /** If any of problem/action/result are empty, the carousel derives copy from `summary` so Situation/Action/Result still render. */
  context?: string;
  problem?: string;
  action?: string;
  result?: string;
  summary?: string;
  studyLinks?: StudyLink[];
  cover?: string;
  coverSlides?: string[];
  /** Per-card eyebrow label, overrides the component-level eyebrow prop */
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

const FRAME_CLASS: Record<"work" | "cad", string> = {
  work:
    "rounded-2xl border border-border bg-white p-4 pt-5 shadow-sm md:p-6 dark:border-border dark:bg-black dark:shadow-none",
  cad: "rounded-2xl border border-border bg-[#f5f5f7] p-4 pt-5 md:p-6 dark:bg-[#1C1C1E]",
};

const FRAME_FADE_FROM: Record<"work" | "cad", string> = {
  work: "from-white dark:from-black",
  cad: "from-[#f5f5f7] dark:from-[#1C1C1E]",
};

/**
 * Always supply three parts for the case-study block: use explicit P/A/R when all set,
 * otherwise fall back to splitting `summary` or short placeholders (see project page fallback).
 */
function getCaseStudyBlocks(p: CarouselProject): { problem: string; action: string; result: string } {
  const pr = p.problem?.trim() ?? "";
  const ac = p.action?.trim() ?? "";
  const re = p.result?.trim() ?? "";
  if (pr && ac && re) {
    return { problem: pr, action: ac, result: re };
  }
  const sum = p.summary?.trim() ?? "";
  if (sum) {
    const paras = sum.split(/\n\n+/).map((s) => s.trim()).filter(Boolean);
    if (paras.length >= 3) {
      return {
        problem: pr || paras[0] || "-",
        action: ac || paras[1] || "-",
        result: re || paras[2] || "-",
      };
    }
    if (paras.length === 2) {
      return {
        problem: pr || paras[0] || "-",
        action: ac || paras[1] || "-",
        result: re || "Details, figures, and post-processing are in the full case study post.",
      };
    }
    return {
      problem: pr || paras[0] || "-",
      action: ac || "Methodology, boundary conditions, and run setup are described in the case study post.",
      result: re || "Key metrics, plots, and conclusions are documented in the case study post.",
    };
  }
  return { problem: pr || "-", action: ac || "-", result: re || "-" };
}

function hasExplicitCaseStudyPills(p: CarouselProject): boolean {
  return Boolean(p.problem?.trim() && p.action?.trim() && p.result?.trim());
}

export function WorkProjectsCarousel({
  projects,
  eyebrow = "Work Project",
  ctaLabel = "Read case study",
  frame = "none",
}: {
  projects: CarouselProject[];
  eyebrow?: string;
  ctaLabel?: string;
  /** Inset panel: `work` = white frame on gray band; `cad` = gray frame on white band */
  frame?: "none" | "work" | "cad";
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

    /** Wheel → change slide only while the pointer target is inside this carousel region; page scrolls normally outside. */
    const onWheel = (e: WheelEvent) => {
      const t = e.target;
      if (!(t instanceof Node) || !root.contains(t)) return;

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

      // At most one slide per wheel event, large deltas (one mouse notch) must not skip to the end
      if (accRef.current >= WHEEL_ACC_THRESHOLD && a < N - 1) {
        goTo(a + 1);
        accRef.current = 0;
      } else if (accRef.current <= -WHEEL_ACC_THRESHOLD && a > 0) {
        goTo(a - 1);
        accRef.current = 0;
      }
    };

    root.addEventListener("wheel", onWheel, { passive: false, capture: true });

    return () => {
      getLenis()?.start?.();
      root.removeEventListener("wheel", onWheel, true);
    };
  }, [goTo, N]);

  const fadeFrom = frame === "none" ? "from-background" : FRAME_FADE_FROM[frame];
  const frameClass = frame === "none" ? "" : FRAME_CLASS[frame];

  return (
    <div
      ref={containerRef}
      data-lenis-prevent-wheel
      className={["relative select-none overflow-x-hidden pb-14", frameClass].filter(Boolean).join(" ")}
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
          const caseBlocks = getCaseStudyBlocks(p);
          const useSkillsLabel = hasExplicitCaseStudyPills(p);

          return (
            <div
              key={p.slug}
              className="[grid-area:stack] relative flex h-full min-h-0 w-full max-w-[min(24rem,calc(100vw-1.5rem))] flex-col justify-self-center self-stretch transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] sm:max-w-[min(28rem,calc(100vw-2rem))]"
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
                  if (!isActive) {
                    e.preventDefault();
                    goTo(i);
                  }
                }}
                className="absolute inset-0 z-0 rounded-2xl"
                aria-label={`View project: ${p.title}`}
                data-carousel-card
              >
                <span className="sr-only">View project: {p.title}</span>
              </a>
              <div className="theme-panel group relative z-10 flex h-full min-h-0 w-full flex-col overflow-hidden rounded-2xl pointer-events-none">
                {/* Image, aspect-video (same as ProjectCard) */}
                <div className="aspect-video w-full shrink-0 overflow-hidden rounded-t-2xl border-b border-border bg-surface-elevated">
                  {showSlides ? (
                    <ProjectCardCoverSlideshow images={slideList} title={p.title} />
                  ) : singleSrc ? (
                    isLivBenchPocSlideUrl(singleSrc) ? (
                      <div className="flex h-full w-full items-center justify-center">
                        <LivBenchPocImage compact />
                      </div>
                    ) : (
                      <img
                        src={singleSrc}
                        alt={p.title}
                        className="h-full w-full object-contain object-center"
                      />
                    )
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

                  <div className="mt-4 flex min-h-0 flex-1 flex-col gap-3 text-xs leading-relaxed text-text-secondary sm:mt-5 sm:gap-4 sm:text-sm">
                    <div>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">Situation / Problem</p>
                      <p className="mt-1">{caseBlocks.problem}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">Action</p>
                      <p className="mt-1">{caseBlocks.action}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">Result</p>
                      <p className="mt-1">{caseBlocks.result}</p>
                    </div>
                  </div>
                  {p.studyLinks && p.studyLinks.length > 0 && (
                    <div className="mt-3 space-y-1.5 sm:mt-4">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted sm:text-[11px]">Related studies</p>
                      {p.studyLinks.map((s) =>
                        s.slug ? (
                          <a
                            key={s.slug}
                            href={`/projects/${s.slug}`}
                            className="pointer-events-auto flex items-center justify-between rounded-lg border border-border bg-surface-elevated px-3 py-2 transition-colors hover:border-border-strong"
                          >
                            <div className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden pr-2">
                              <p className="whitespace-nowrap text-[11px] font-medium text-text-primary sm:text-[12px]">
                                {s.label}
                              </p>
                              {s.meta && (
                                <p className="mt-0.5 whitespace-nowrap text-[10px] text-text-muted">{s.meta}</p>
                              )}
                            </div>
                            <span className="ml-3 shrink-0 text-[11px] text-primary-accent">→</span>
                          </a>
                        ) : (
                          <div
                            key={s.label}
                            className="flex items-center justify-between rounded-lg border border-dashed border-border px-3 py-2 opacity-50"
                          >
                            <div className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden pr-2">
                              <p className="whitespace-nowrap text-[11px] font-medium text-text-primary sm:text-[12px]">
                                {s.label}
                              </p>
                              {s.meta && (
                                <p className="mt-0.5 whitespace-nowrap text-[10px] text-text-muted">{s.meta}</p>
                              )}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  {p.tags?.length > 0 && (
                    <div className="mt-4 shrink-0 border-t border-border pt-4 sm:mt-5 sm:pt-5">
                      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted mb-1.5 sm:text-[11px] sm:mb-2">
                        {useSkillsLabel ? "Skills learned / applied" : "Tags"}
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
              </div>
            </div>
          );
        })}
      </div>

      {/* Edge fades */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r ${fadeFrom} to-transparent sm:w-24`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l ${fadeFrom} to-transparent sm:w-24`}
      />

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
