import { Mail, Phone, LinkedinIcon } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/layout/Section";

export function NextSection() {
  const { social, phone } = siteConfig;

  return (
    <Section label="What I want next" id="contact">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-normal tracking-[-0.03em] text-foreground mb-4">
          What I want next
        </h2>
        <p className="text-base text-body-text leading-relaxed mb-10 max-w-2xl mx-auto">
          I&apos;m looking for a Senior Mechanical Engineer or Product Development role where the hardware is complex enough that design decisions carry real consequences in manufacturing and the field.
        </p>
        <p className="text-base text-body-text leading-relaxed mb-10 max-w-2xl mx-auto">
          I work best on teams that care about getting the details right — tolerance stack, thermal margins, build repeatability — and where engineering judgment is trusted early in the process, not just at the review stage.
        </p>

        <a
          href={social.email ? `mailto:${social.email}` : "#"}
          className="inline-flex items-center gap-2 bg-primary-accent text-white rounded-xl px-8 py-4 text-base font-semibold hover:opacity-90 transition-opacity duration-200 mb-8"
        >
          Let's Build Something Great
        </a>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {social.email && (
            <a
              href={`mailto:${social.email}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
              {social.email}
            </a>
          )}
          {phone && (
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              {phone}
            </span>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
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
