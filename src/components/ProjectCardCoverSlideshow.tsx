"use client";

import { useEffect, useState } from "react";

const INTERVAL_MS = 5000;

export function ProjectCardCoverSlideshow({
  images,
  title,
  cover = false,
}: {
  images: string[];
  title: string;
  cover?: boolean;
}) {
  const slides = images.filter(Boolean);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  if (slides.length === 0) return null;

  if (slides.length === 1) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-surface-elevated">
        <img
          src={slides[0]}
          alt=""
          className={cover ? "h-full w-full object-cover" : "max-h-full max-w-full object-contain object-center"}
        />
      </div>
    );
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-t-xl bg-surface-elevated"
      aria-roledescription="carousel"
    >
      {slides.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out ${
            i === index ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={src}
            alt={i === index ? `${title} preview` : ""}
            className={cover ? "h-full w-full object-cover" : "max-h-full max-w-full object-contain object-center"}
          />
        </div>
      ))}
    </div>
  );
}
