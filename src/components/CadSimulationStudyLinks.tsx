"use client";

import { useState } from "react";
import { ProjectCaseStudyIframeModal } from "./ProjectCaseStudyIframeModal";

export type CadStudyLink = {
  label: string;
  meta: string;
  slug: string;
};

export function CadSimulationStudyLinks({
  links,
  linkEyebrow = "Simulation case study",
  sectionLabel = "Studies",
}: {
  links: readonly CadStudyLink[];
  /** Shown in the modal header above the study title */
  linkEyebrow?: string;
  /** Small caps label above the list (e.g. "Studies" on CAD cards, "Related studies" in carousel) */
  sectionLabel?: string;
}) {
  const [open, setOpen] = useState<{ slug: string; label: string } | null>(null);

  return (
    <>
      <div className="mt-3 space-y-1.5 sm:mt-4">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted sm:text-[11px]">
          {sectionLabel}
        </p>
        {links.map((s) =>
          s.slug ? (
            <button
              key={s.slug}
              type="button"
              title="Open case study"
              onClick={() => setOpen({ slug: s.slug, label: s.label })}
              className="pointer-events-auto group/study flex w-full cursor-pointer select-none items-center justify-between rounded-lg border border-border/90 bg-surface-elevated px-3 py-2.5 text-left shadow-sm ring-0 ring-transparent transition duration-200 hover:-translate-y-px hover:border-primary-accent/45 hover:bg-background hover:shadow-md hover:ring-1 hover:ring-primary-accent/25 active:translate-y-0 active:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] dark:hover:ring-primary-accent/35"
            >
              <div className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden pr-2">
                <p className="whitespace-nowrap text-[11px] font-medium text-text-primary group-hover/study:text-primary-accent sm:text-[12px]">
                  {s.label}
                </p>
                {s.meta ? (
                  <p className="mt-0.5 whitespace-nowrap text-[10px] text-text-muted">{s.meta}</p>
                ) : null}
              </div>
              <span
                className="ml-3 shrink-0 text-[11px] text-primary-accent transition-transform duration-200 group-hover/study:translate-x-0.5"
                aria-hidden="true"
              >
                →
              </span>
            </button>
          ) : (
            <div
              key={s.label}
              className="flex items-center justify-between rounded-lg border border-dashed border-border px-3 py-2 opacity-50"
            >
              <div className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden pr-2">
                <p className="whitespace-nowrap text-[11px] font-medium text-text-primary sm:text-[12px]">
                  {s.label}
                </p>
                {s.meta ? (
                  <p className="mt-0.5 whitespace-nowrap text-[10px] text-text-muted">{s.meta}</p>
                ) : null}
              </div>
            </div>
          ),
        )}
      </div>

      {open ? (
        <ProjectCaseStudyIframeModal
          slug={open.slug}
          title={open.label}
          eyebrow={linkEyebrow}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </>
  );
}
