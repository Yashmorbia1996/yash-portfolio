import { type MouseEvent, useCallback, useEffect, useRef } from "react";
import { ArrowRight, Award, Handshake, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const impactMetrics = [
  {
    value: "$4M to $15M",
    label: "Revenue Scale",
    detail: "Supported through production architecture and yield stabilization.",
  },
  {
    value: "500 to 1,500",
    label: "Weekly Output",
    detail: "Increased through fixture strategy and workflow redesign.",
  },
  {
    value: "85% → 95%",
    label: "First-Pass Yield",
    detail: "Maintained through tighter process control and repeatable builds.",
  },
  {
    value: "<3%",
    label: "Field Returns",
    detail: "Reduced through thermal correction and reliability validation.",
  },
  {
    value: "8 Audits",
    label: "Audit Record",
    detail: "Zero major findings across internal and MDSAP reviews.",
  },
  {
    value: "20+ Fixtures",
    label: "Production Tooling",
    detail: "Released to support repeatable assembly and production test.",
  },
] as const;

export function Hero() {
  const { social, phone, avatar, location } = siteConfig;
  const sectionRef = useRef<HTMLElement>(null);

  const spring = useRef({
    o1: { x: 0.28, y: 0.45 },
    o2: { x: 0.72, y: 0.38 },
    o3: { x: 0.50, y: 0.65 },
    tx: 0.50, ty: 0.50,
    live: false,
    grid: { x: 0, y: 0 },
  });

  useEffect(() => {
    const K = [0.016, 0.032, 0.048] as const;
    const HOME = [{ x: 0.28, y: 0.45 }, { x: 0.72, y: 0.38 }, { x: 0.50, y: 0.65 }] as const;
    const K_GRID = 0.042;
    const GRID_PARALLAX_X = 26;
    const GRID_PARALLAX_Y = 20;

    const sect = document.getElementById("introduction") as HTMLElement | null;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".hero-thermal-orb"));
    if (!sect || els.length < 3) return;

    const gridEl = sect.querySelector<HTMLElement>(".hero-interactive-grid");

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

      if (gridEl) {
        const targetGx = track ? (s.tx - 0.5) * GRID_PARALLAX_X : 0;
        const targetGy = track ? (s.ty - 0.5) * GRID_PARALLAX_Y : 0;
        s.grid.x += (targetGx - s.grid.x) * K_GRID;
        s.grid.y += (targetGy - s.grid.y) * K_GRID;
        gridEl.style.transform = `translate3d(${s.grid.x}px, ${s.grid.y}px, 0)`;
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
      id="introduction"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Introduction"
      data-surface="white"
      className="relative overflow-hidden bg-white pt-20 pb-24 dark:bg-black md:pt-28 md:pb-32"
    >
      <div className="hero-bg-base" aria-hidden="true" />
      <div className="hero-interactive-grid" aria-hidden="true" />
      <div className="hero-thermal-orb hero-thermal-orb-1" aria-hidden="true" />
      <div className="hero-thermal-orb hero-thermal-orb-2" aria-hidden="true" />
      <div className="hero-thermal-orb hero-thermal-orb-3" aria-hidden="true" />
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-14">
          <aside className="hero-animate hero-animate-2">
            <div className="lg:sticky lg:top-28">
              <div className="theme-panel rounded-[var(--radius-lg)] p-5 md:p-6">
                <img
                  src={avatar}
                  alt={siteConfig.name}
                  width={1200}
                  height={1168}
                  className="mx-auto h-auto w-full max-w-[18.5rem] rounded-[calc(var(--radius-lg)-0.25rem)] border border-border object-contain"
                  loading="eager"
                  decoding="async"
                />
                <div className="mt-7 space-y-1.5">
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-text-primary">
                    {siteConfig.name}
                  </h2>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    Senior Mechanical Engineer<br />
                    <span className="text-text-muted">Mechanical · Manufacturing · Product Dev</span>
                  </p>
                </div>
                <div className="mt-6 border-t border-border/80 pt-5 space-y-3 text-sm text-text-secondary">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-accent" />
                    <span>{location}</span>
                  </p>
                  {social.email && (
                    <a
                      href={`mailto:${social.email}`}
                      className="flex items-start gap-2 transition-colors duration-200 hover:text-text-primary"
                    >
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary-accent" />
                      <span className="break-all">{social.email}</span>
                    </a>
                  )}
                  {phone && (
                    <p className="flex items-start gap-2">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-accent" />
                      <span>{phone}</span>
                    </p>
                  )}
                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 transition-colors duration-200 hover:text-text-primary"
                    >
                      <Linkedin className="mt-0.5 h-4 w-4 shrink-0 text-primary-accent" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </aside>

          <div className="hero-animate hero-animate-3">
            <p className="theme-eyebrow mb-3">
              Hi! My name is,
            </p>

            <h1 className="text-5xl font-semibold tracking-[-0.04em] text-text-primary md:text-6xl">
              Yash Morbia 
            </h1>

            <div className="mt-4 max-w-[46rem]">
              <p className="text-left text-base leading-[1.75] text-text-secondary md:text-[1.05rem]">
                Thanks for visiting my portfolio. Whether you're a recruiter, fellow engineer, collaborator, or simply curious, I hope you enjoy exploring my work.
              </p>

              <p className="mt-6 text-left text-[1.02rem] leading-[1.78] text-text-primary md:text-[1.12rem]">
                I work at the intersection of mechanical engineering, production scale-up, and technical execution, with 4+ years supporting FDA-cleared electromechanical devices. My work spans tolerance-driven design, GD&T, DFM/DFA, fixture development, verification, and production readiness, helping teams carry rigor from early prototype builds into stable manufacturing through disciplined cross-functional execution.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" variant="default">
                  <a href="/projects">
                    Engineering projects
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="/cross-functional-ownership">
                    Cross-functional ownership
                    <Handshake className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="ghost">
                  <a href="/certificates">
                    Certificates
                    <Award className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="hero-animate hero-animate-4 mt-10">
                <p className="mb-4 text-left text-sm leading-[1.7] text-text-muted md:text-[0.95rem]">
                  Process improvements supported by GD&T, root-cause analysis, and Six Sigma-style discipline.
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {impactMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="theme-panel theme-panel-hover flex flex-col items-center rounded-[var(--radius-md)] p-5 text-center"
                    >
                      <p className="w-full whitespace-nowrap text-center font-mono text-[1.48rem] font-normal leading-none tracking-[-0.03em] text-text-primary md:text-[1.72rem]">
                        {metric.value}
                      </p>
                      <p className="mt-2 w-full text-center font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-text-muted">
                        {metric.label}
                      </p>
                      <p className="mt-3 max-w-[19ch] text-center text-[0.9rem] leading-[1.6] text-text-secondary">
                        {metric.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
