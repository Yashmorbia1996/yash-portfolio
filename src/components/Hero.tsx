import { Mail, ArrowRight, Phone, LinkedinIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "$4M -> $15M", label: "Revenue supported" },
  { value: "500 -> 1,500", label: "Units per week" },
  { value: "23% -> 3%", label: "Field return rate" },
  { value: "8 audits", label: "0 major findings" },
];

export function Hero() {
  const { social, roleShort, name, location, phone } = siteConfig;

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="hero-animate hero-animate-1 mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary-accent" />
              {roleShort}
              <span className="text-muted-foreground/60">·</span>
              {location}
            </p>

            <p className="hero-animate hero-animate-2 mb-3 font-mono text-xs uppercase tracking-[0.16em] text-primary-accent">
              {name}
            </p>

            <h1 className="hero-animate hero-animate-3 font-heading text-4xl font-normal leading-tight tracking-[-0.04em] text-foreground md:text-5xl lg:text-6xl">
              Mechanical engineer for hardware that has to work in the field.
            </h1>

            <div className="hero-animate hero-animate-4 mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-body-text">
              <p>
                I spent four years as the mechanical lead on an FDA-cleared Class IV laser device — owning the design, the fixtures, the production ramp, and the quality systems, often at the same time.
              </p>
              <p>
                The product shipped, scaled to 1,500 units a week, and came back at a 3% return rate. That&apos;s the standard I hold myself to.
              </p>
            </div>

            <div className="hero-animate hero-animate-4 mt-8 flex flex-wrap items-center gap-3">
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
              <Button variant="ghost" size="lg" asChild>
                <a href="/about">Go Deeper</a>
              </Button>
            </div>

            <div className="hero-animate hero-animate-4 mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {social.email && (
                <a
                  href={`mailto:${social.email}`}
                  className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-foreground"
                >
                  <Mail className="h-4 w-4" />
                  {social.email}
                </a>
              )}
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {phone}
              </span>
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-foreground"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          <div className="hero-animate hero-animate-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-primary-accent/25 bg-card/60 p-5 shadow-sm sm:col-span-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary-accent">
                Why Teams Call Me
              </p>
              <p className="mt-3 text-sm leading-relaxed text-body-text">
                I&apos;m a mechanical engineer first. But at a small company building a regulated device, the work doesn&apos;t stop at the design — someone has to make sure it can be built, tested, sourced, and audited. I&apos;ve consistently been that person, without losing the thread on the engineering itself.
              </p>
            </div>
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card/50 p-5 shadow-sm transition-all duration-300 hover:border-primary-accent/30 hover:shadow-md"
              >
                <p className="text-xl font-semibold leading-tight text-foreground md:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
