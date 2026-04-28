import { type MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Award, ChevronRight, Handshake, LinkedinIcon, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const homepageSections = [
  { label: "Introduction", href: "#introduction" },
  { label: "Work Experience", href: "#home-work-experience" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "My Journey & What's Next", href: "#my-journey" },
] as const;

const heroProofPoints = [
  "Scaled weekly output from 500 to 1,500 units through fixture strategy, process refinement, and manufacturing execution.",
  "Improved yield stability and reduced field returns through thermal management, structured root-cause analysis, and repeatable build control.",
  "Developed 20+ production and test fixtures to control critical tolerances and reduce operator variability.",
  "Improved first-pass yield from 85% to 95% through GD&T-informed design decisions, repeatable build control and process refinement.",
  "Led cross-functional execution across engineering, suppliers, production, and ISO 13485-aligned quality systems.",
] as const;

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
  const { social, phone, avatar, location, role } = siteConfig;
  const [activeSection, setActiveSection] = useState<(typeof homepageSections)[number]["href"]>(
    homepageSections[0].href,
  );
  const sectionRef = useRef<HTMLElement>(null);

  // Mutable spring state, no re-renders; mimics damped thermal / fluid lag vs cursor
  const spring = useRef({
    o1: { x: 0.28, y: 0.45 },
    o2: { x: 0.72, y: 0.38 },
    o3: { x: 0.50, y: 0.65 },
    tx: 0.50, ty: 0.50,
    live: false,
    /* Subtle grid parallax (px); eases toward cursor offset from center */
    grid: { x: 0, y: 0 },
  });

  // RAF loop, query `.hero-thermal-orb` and `.hero-interactive-grid` after mount
  useEffect(() => {
    /* Per-orb gain: lower = heavier thermal mass, slower drift toward cursor */
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

  useEffect(() => {
    const sections = homepageSections
      .map((item) => {
        const id = item.href.replace("#", "");
        return document.getElementById(id);
      })
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        setActiveSection(`#${visibleEntries[0].target.id}` as (typeof homepageSections)[number]["href"]);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, href: (typeof homepageSections)[number]["href"]) => {
    const id = href.replace("#", "");
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();

    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const desktop = window.innerWidth >= 1024;
    const sectionOffset = href === "#introduction" ? (desktop ? -24 : -16) : desktop ? 56 : 40;
    const scrollTop = Math.max(targetTop + sectionOffset, 0);

    window.scrollTo({
      top: scrollTop,
      behavior: "smooth",
    });

    window.history.replaceState(null, "", href);
  };

  return (
    <section
      id="introduction"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-white pt-20 pb-24 dark:bg-black md:pt-28 md:pb-32"
    >
      <div className="hero-bg-base" aria-hidden="true" />
      <div className="hero-interactive-grid" aria-hidden="true" />
      <div className="hero-thermal-orb hero-thermal-orb-1" aria-hidden="true" />
      <div className="hero-thermal-orb hero-thermal-orb-2" aria-hidden="true" />
      <div className="hero-thermal-orb hero-thermal-orb-3" aria-hidden="true" />
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-14">
          <aside className="hero-animate hero-animate-2">
            <div className="lg:sticky lg:top-28">
              <div className="theme-panel rounded-[1.5rem] p-5 md:p-6">
                <img
                  src={avatar}
                  alt={siteConfig.name}
                  width={1200}
                  height={1168}
                  className="mx-auto h-auto w-full max-w-[18.5rem] rounded-[1.75rem] border border-border object-contain"
                  loading="eager"
                  decoding="async"
                />
                <div className="mt-7 space-y-2.5">
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-text-primary">
                    {siteConfig.name}
                  </h2>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {role}
                  </p>
                </div>

                <div className="mt-6 space-y-3.5 text-sm text-text-secondary">
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
                      <LinkedinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-accent" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>

                <div className="mt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                    Currently open to roles in
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text-secondary">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-accent" aria-hidden />
                      <span>Mechanical Engineering</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-accent" aria-hidden />
                      <span>Manufacturing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary-accent" aria-hidden />
                      <span>Product Development</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 border-t border-border/80 pt-6">
                  <p className="theme-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em] text-text-muted">
                    On this page
                  </p>
                  <nav className="mt-4 flex flex-col gap-1">
                    {homepageSections.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={(event) => handleSectionClick(event, item.href)}
                        aria-current={activeSection === item.href ? "location" : undefined}
                        className={[
                          "inline-flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition-colors duration-200",
                          activeSection === item.href
                            ? "bg-card-hover text-text-primary"
                            : "text-text-muted hover:bg-card-hover/70 hover:text-text-primary",
                        ].join(" ")}
                      >
                        <ChevronRight
                          className={[
                            "h-3.5 w-3.5 transition-colors duration-200",
                            activeSection === item.href ? "text-primary-accent" : "text-text-muted",
                          ].join(" ")}
                        />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </aside>

          <div className="hero-animate hero-animate-3">
            <p className="theme-eyebrow mb-3 font-mono text-xs uppercase tracking-[0.16em]">
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

              <ul className="mt-7 space-y-4 text-left text-[0.98rem] leading-[1.75] text-text-secondary md:text-base">
                {heroProofPoints.map((point) => (
                  <li key={point} className="flex gap-3.5">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-accent" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <a href="/projects">
                    Engineering projects
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg">
                  <a href="/certificates">
                    Certificates
                    <Award className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg">
                  <a href="/cross-functional-ownership">
                    Cross-functional ownership
                    <Handshake className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="hero-animate hero-animate-4 mt-10">
                <p className="mb-4 text-left text-sm leading-[1.7] text-text-muted md:text-[0.95rem]">
                  Process improvements supported by GD&T, root-cause analysis, and Six Sigma-style discipline.
                </p>

                <div className="grid grid-cols-1 gap-[1.35rem] md:grid-cols-2 xl:grid-cols-3">
                  {impactMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="theme-panel theme-panel-hover grid h-full grid-rows-[3.5rem_1.35rem_5.9rem] justify-items-center rounded-[1.4rem] p-[1.3rem] text-center md:grid-rows-[3.9rem_1.45rem_6.4rem] md:p-[1.45rem]"
                    >
                      <div className="flex h-full w-full items-center justify-center">
                        <p className="w-full whitespace-nowrap text-center font-mono text-[1.48rem] font-normal leading-none tracking-[-0.03em] text-text-primary md:text-[1.72rem]">
                          {metric.value}
                        </p>
                      </div>
                      <div className="flex h-full w-full items-center justify-center">
                        <p className="w-full text-center font-mono text-[11px] uppercase leading-none tracking-[0.18em] text-text-muted">
                          {metric.label}
                        </p>
                      </div>
                      <div className="flex h-full w-full items-start justify-center pt-3">
                        <p className="max-w-[19ch] text-center text-[0.9rem] leading-[1.6] text-text-secondary">
                          {metric.detail}
                        </p>
                      </div>
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
