import { ArrowRight, ChevronRight, LinkedinIcon, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

const homepageSections = [
  { label: "Introduction", href: "#introduction" },
  { label: "Work Experience", href: "#home-work-experience" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "What I Want Next", href: "#contact" },
] as const;

const heroProofPoints = [
  "Scaled weekly production from 500 to 1,500 units through fixture strategy, process refinement, and manufacturing execution.",
  "Improved yield stability and reduced field returns through thermal redesign, verification discipline, and repeatable build control.",
  "Led cross-functional execution across engineering, suppliers, production, and ISO 13485 aligned quality systems.",
] as const;

const impactMetrics = [
  {
    value: "$4M to $15M",
    label: "Revenue Scale",
    detail: "Supported with production architecture and yield stabilization.",
  },
  {
    value: "500 to 1,500",
    label: "Weekly Output",
    detail: "Improved through fixture strategy and workflow redesign.",
  },
  {
    value: "85% -> 95%",
    label: "Yield Stability",
    detail: "Maintained with tighter process control and repeatable builds.",
  },
  {
    value: "23% -> 3%",
    label: "Field Returns",
    detail: "Reduced through thermal correction and reliability validation.",
  },
  {
    value: "8 Audits",
    label: "Audit Record",
    detail: "Completed with zero major findings across internal and MDSAP reviews.",
  },
  {
    value: "20+",
    label: "Fixtures Released",
    detail: "Built to drive repeatable assembly and production test execution.",
  },
] as const;

export function Hero() {
  const { social, phone, avatar, location, role } = siteConfig;

  return (
    <section id="introduction" className="pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-14">
          <aside className="hero-animate hero-animate-2">
            <div className="lg:sticky lg:top-28">
              <div className="theme-panel rounded-[1.5rem] p-5 md:p-6">
                <img
                  src={avatar}
                  alt={siteConfig.name}
                  width={768}
                  height={1024}
                  className="mx-auto h-auto w-full max-w-[18rem] rounded-[1.75rem] border border-border object-contain"
                  loading="eager"
                  decoding="async"
                />
                <div className="mt-5">
                  <h2 className="text-xl font-semibold tracking-[-0.03em] text-text-primary">
                    {siteConfig.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {role}
                  </p>
                </div>

                <div className="mt-5 space-y-3 text-sm text-text-secondary">
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

                <p className="mt-5 inline-flex rounded-full border border-primary-accent/20 bg-button-secondary px-3 py-1.5 text-xs font-medium text-primary-accent">
                  Open to senior mechanical and product development roles
                </p>

                <div className="mt-8 border-t border-border pt-5">
                  <p className="theme-eyebrow text-[11px] font-semibold uppercase tracking-[0.16em]">
                    On this page
                  </p>
                  <nav className="mt-4 flex flex-col gap-1.5">
                    {homepageSections.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-text-muted transition-colors duration-200 hover:bg-card-hover hover:text-text-primary"
                      >
                        <ChevronRight className="h-3.5 w-3.5 text-primary-accent" />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </aside>

          <div className="hero-animate hero-animate-3">
            <p className="theme-eyebrow mb-4 font-mono text-xs uppercase tracking-[0.16em]">
              Hi! My name is,
            </p>

            <h1 className="text-5xl font-semibold tracking-[-0.04em] text-text-primary md:text-6xl">
              Yash Morbia
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
              Thank you for visiting my website. Whether you're a recruiter, fellow engineer, collaborator, or simply curious, I hope you enjoy exploring my work.
            </p>

            <p className="mt-6 max-w-4xl text-2xl font-semibold leading-tight tracking-[-0.03em] text-text-primary md:text-[2rem]">
              Senior Mechanical Engineer focused on product development, manufacturing scale-up, and reliable execution for regulated hardware.
            </p>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
              Over the past 4+ years, I have helped bring FDA-cleared electromechanical devices from early prototype builds into production ramp. My work spans tolerance-driven design, DFM/DFA, fixture and equipment development, requirements-based verification, and the cross-functional execution needed to move hardware into stable manufacturing.
            </p>

            <ul className="mt-8 max-w-3xl space-y-4 text-base leading-relaxed text-text-secondary">
              {heroProofPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-accent" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <a href="/projects">
                  View Case Studies
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`mailto:${social.email}`}>
                  Get in Touch
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="hero-animate hero-animate-4 theme-panel mt-14 rounded-[1.75rem] p-5 md:mt-16 md:p-6">
          <div className="mb-5">
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-text-primary">
              Measured Outcomes
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {impactMetrics.map((metric) => (
              <div
                key={metric.label}
                className="theme-panel theme-panel-hover rounded-[1.15rem] p-4"
              >
                <p className="font-mono text-[1.25rem] font-semibold leading-tight tracking-[-0.03em] text-text-primary md:text-[1.5rem]">
                  {metric.value}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  {metric.label}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-text-secondary">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
