import { Mail, Phone, LinkedinIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/layout/Section";

export function NextSection() {
  const { social, phone } = siteConfig;

  return (
    <Section id="contact" surface="white">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="theme-section-title mb-4 text-5xl font-semibold md:text-6xl">
          What I want next
        </h2>
        <p className="mb-10 max-w-2xl mx-auto text-base leading-relaxed text-text-secondary">
          I&apos;m looking for a Senior Mechanical Engineer or Product Development role where the hardware is complex enough that design decisions carry real consequences in manufacturing and the field.
        </p>
        <p className="mb-10 max-w-2xl mx-auto text-base leading-relaxed text-text-secondary">
          I work best on teams that care about getting the details right, including tolerance stack, thermal margins, and build repeatability, and where engineering judgment is trusted early in the process, not just at the review stage.
        </p>

        <a
          href={social.email ? `mailto:${social.email}` : "#"}
          className="mb-8 inline-flex items-center gap-2 rounded-xl bg-button-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity duration-200 hover:opacity-95"
        >
          Let's Build Something Great
        </a>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {social.email && (
            <a
              href={`mailto:${social.email}`}
              className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              <Mail className="h-4 w-4" />
              {social.email}
            </a>
          )}
          {phone && (
            <span className="inline-flex items-center gap-2 text-sm text-text-muted">
              <Phone className="h-4 w-4" />
              {phone}
            </span>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-200 hover:text-text-primary"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
