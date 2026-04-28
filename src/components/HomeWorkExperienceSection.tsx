import { type MouseEvent, useCallback, useEffect, useRef } from "react";
import { WorkExperienceTimeline, type WorkTimelineEntry } from "@/components/WorkExperienceTimeline";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

interface HomeWorkExperienceSectionProps {
  entries: WorkTimelineEntry[];
}

export function HomeWorkExperienceSection({ entries }: HomeWorkExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const spring = useRef({
    o1: { x: 0.32, y: 0.42 },
    o2: { x: 0.68, y: 0.48 },
    o3: { x: 0.5, y: 0.62 },
    tx: 0.5,
    ty: 0.5,
    live: false,
    rainbow: { x: 0, y: 0 },
    mesh: { x: 0, y: 0 },
  });

  useEffect(() => {
    const K = [0.017, 0.032, 0.048] as const;
    const HOME = [
      { x: 0.32, y: 0.42 },
      { x: 0.68, y: 0.48 },
      { x: 0.5, y: 0.62 },
    ] as const;
    const K_RAINBOW = 0.038;
    const K_MESH = 0.048;
    const RAINBOW_PARALLAX = 20;
    const MESH_PARALLAX = 14;

    const sect = document.getElementById("home-work-experience") as HTMLElement | null;
    const els = Array.from(sect?.querySelectorAll<HTMLElement>(".we-thermal-orb") ?? []);
    if (!sect || els.length < 3) return;

    const rainbowEl = sect.querySelector<HTMLElement>(".we-rainbow-bloom");
    const meshEl = sect.querySelector<HTMLElement>(".we-workflow-mesh");

    const reduceMotion = () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;

    function tick() {
      const s = spring.current;
      const w = sect!.offsetWidth;
      const h = sect!.offsetHeight;
      const reduced = reduceMotion();
      const track = s.live && !reduced;
      const orbs = [s.o1, s.o2, s.o3];
      orbs.forEach((o, i) => {
        const tx = track ? s.tx : HOME[i].x;
        const ty = track ? s.ty : HOME[i].y;
        o.x += (tx - o.x) * K[i];
        o.y += (ty - o.y) * K[i];
        els[i].style.transform = `translate(calc(${o.x * w}px - 50%), calc(${o.y * h}px - 50%))`;
      });

      if (rainbowEl) {
        const tgx = track ? (s.tx - 0.5) * RAINBOW_PARALLAX : 0;
        const tgy = track ? (s.ty - 0.5) * RAINBOW_PARALLAX : 0;
        s.rainbow.x += (tgx - s.rainbow.x) * K_RAINBOW;
        s.rainbow.y += (tgy - s.rainbow.y) * K_RAINBOW;
        rainbowEl.style.transform = `translate3d(${s.rainbow.x}px, ${s.rainbow.y}px, 0) rotate(-8deg)`;
      }

      if (meshEl) {
        const mgx = track ? (s.tx - 0.5) * MESH_PARALLAX : 0;
        const mgy = track ? (s.ty - 0.5) * MESH_PARALLAX : 0;
        s.mesh.x += (mgx - s.mesh.x) * K_MESH;
        s.mesh.y += (mgy - s.mesh.y) * K_MESH;
        meshEl.style.transform = `translate3d(${s.mesh.x}px, ${s.mesh.y}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const s = spring.current;
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    s.tx = (e.clientX - rect.left) / rect.width;
    s.ty = (e.clientY - rect.top) / rect.height;
    s.live = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    spring.current.live = false;
  }, []);

  return (
    <section
      id="home-work-experience"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Work Experience"
      data-surface="gray"
      className={cn(
        "relative overflow-hidden scroll-reveal bg-[#f5f5f7] py-24 pt-12 dark:bg-[#1C1C1E] md:py-32 md:pt-16",
      )}
    >
      <div className="we-bg-base" aria-hidden="true" />
      <div className="we-rainbow-bloom" aria-hidden="true" />
      <div className="we-workflow-mesh" aria-hidden="true" />
      <div className="we-thermal-orb we-thermal-orb-1" aria-hidden="true" />
      <div className="we-thermal-orb we-thermal-orb-2" aria-hidden="true" />
      <div className="we-thermal-orb we-thermal-orb-3" aria-hidden="true" />
      <canvas className="we-mesh-canvas" aria-hidden="true" suppressHydrationWarning />
      <div className="site-container relative z-[1]">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title="Work Experience"
            sub="A closer look at the roles where design, production, and regulated hardware execution came together."
          />
          <WorkExperienceTimeline entries={entries} variant="home" />
        </div>
      </div>
    </section>
  );
}
