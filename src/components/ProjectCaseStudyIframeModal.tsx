"use client";

import { useEffect, useId } from "react";
import { createPortal } from "react-dom";

export function ProjectCaseStudyIframeModal({
  slug,
  title,
  eyebrow = "Case study",
  onClose,
}: {
  slug: string;
  title: string;
  eyebrow?: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const pathBase = import.meta.env?.BASE_URL ?? "/";
  const caseUrl = pathBase.endsWith("/")
    ? `${pathBase}projects/${slug}/`
    : `${pathBase}/projects/${slug}/`;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={onClose}
        role="presentation"
      />
      <div
        className="relative z-10 flex max-h-[min(100dvh,100vh)] w-full max-w-[min(100vw-1rem,90rem)] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:border dark:border-white/10 dark:bg-[#1C1C1E]"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 sm:right-5 sm:top-4"
          aria-label="Close"
        >
          <span className="text-base leading-none text-text-primary" aria-hidden>
            ×
          </span>
        </button>

        <div className="shrink-0 border-b border-border/60 px-4 pb-3 pt-4 pr-12 sm:px-7 sm:pt-5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-primary-accent sm:text-[11px]">
            {eyebrow}
          </p>
          <h2
            id={titleId}
            className="mt-1 text-lg font-semibold leading-tight tracking-[-0.02em] text-text-primary sm:text-xl md:text-2xl"
          >
            {title}
          </h2>
        </div>

        <iframe
          key={slug}
          title={title}
          src={caseUrl}
          className="h-[min(calc(100dvh-6.5rem),56rem)] w-full min-h-[18rem] border-0 bg-background sm:min-h-[24rem] md:h-[min(calc(100dvh-5.5rem),60rem)]"
        />
        <div className="shrink-0 border-t border-border/60 bg-surface-elevated/40 px-4 py-2.5 sm:px-7 sm:py-3">
          <a
            href={caseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-primary-accent transition-opacity hover:opacity-80 sm:text-sm"
          >
            Open in new tab →
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
