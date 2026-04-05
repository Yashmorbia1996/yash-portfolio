import { Mail, Linkedin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/layout/Section";

export function NextSection() {
  const { social } = siteConfig;

  return (
    <Section label="What I want next" id="contact">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-foreground mb-4">
          What I want next
        </h2>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-10 max-w-lg mx-auto">
          Seeking a Principal or Staff Mechanical Engineer role at a company building regulated hardware — medical devices, industrial automation, or precision instrumentation. I thrive where the tolerance stack matters and the regulatory bar is high.
        </p>

        {/* Primary CTA */}
        <a
          href={social.email ? `mailto:${social.email}` : "#"}
          className="inline-flex items-center gap-2 bg-primary-accent text-white rounded-xl px-8 py-4 text-base font-semibold hover:opacity-90 transition-opacity duration-200 mb-8"
        >
          Let's Build Something Great
        </a>

        {/* Secondary contact links */}
        <div className="flex items-center justify-center gap-6">
          {social.email && (
            <a
              href={`mailto:${social.email}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
              {social.email}
            </a>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
