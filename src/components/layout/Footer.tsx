import { LinkedinIcon, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  const { name, phone, social } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-[#f5f5f7] py-12 dark:bg-[#1C1C1E]">
      <div className="site-container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-text-muted">
          &copy; {year} {name}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-text-muted sm:justify-end">
          {phone && (
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{phone}</span>
            </span>
          )}
          {social.linkedin && (
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-text-primary"
            >
              <LinkedinIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          )}
          {social.email && (
            <a
              href={`mailto:${social.email}`}
              className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-text-primary"
            >
              <Mail className="h-4 w-4" />
              <span>{social.email}</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
