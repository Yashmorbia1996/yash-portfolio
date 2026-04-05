import { Github, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "$4M → $15M", label: "Revenue Supported" },
  { value: "500 → 1500", label: "Units / Week" },
  { value: "23% → 3%", label: "Return Rate" },
  { value: "8 Audits, 0 Findings", label: "Regulatory Record" },
];

export function Hero() {
  const { name, social } = siteConfig;

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="site-container">
        {/* Hero text */}
        <div className="max-w-2xl">
          <p className="hero-animate hero-animate-1 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-4 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-accent" />
            Senior Mechanical Engineer
          </p>

          <h1 className="hero-animate hero-animate-2 font-heading text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-[-0.03em] text-foreground mb-6">
            Building Production-Ready Systems That Scale.
          </h1>

          <p className="hero-animate hero-animate-3 text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
            Senior Mechanical Engineer specializing in FDA-cleared electromechanical systems, precision packaging, and thermal management.
          </p>

          <div className="hero-animate hero-animate-4 flex flex-wrap items-center gap-3">
            <Button asChild>
              <a href="/projects">
                View Case Studies
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/about">About me</a>
            </Button>
          </div>

          <div className="hero-animate hero-animate-4 flex items-center gap-1 mt-8">
            {social.github && (
              <Button variant="ghost" size="icon" asChild>
                <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            )}
            {social.linkedin && (
              <Button variant="ghost" size="icon" asChild>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            )}
            {social.twitter && (
              <Button variant="ghost" size="icon" asChild>
                <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
            )}
            {social.email && (
              <Button variant="ghost" size="icon" asChild>
                <a href={`mailto:${social.email}`} aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Impact Metrics Bar */}
        <div className="hero-animate hero-animate-4 mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="backdrop-blur-sm bg-card/60 border border-border rounded-xl px-5 py-4"
            >
              <p className="text-xl md:text-2xl font-semibold text-primary-accent leading-tight">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-1.5 leading-snug">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
