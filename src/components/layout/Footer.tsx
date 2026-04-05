import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export function Footer() {
  const { name, social } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <div className="site-container flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {year} {name}. All rights reserved.
        </p>
        <div className="flex items-center gap-1">
          {social.github && (
            <Button variant="ghost" size="icon" asChild>
              <a href={social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {social.linkedin && (
            <Button variant="ghost" size="icon" asChild>
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          )}
          {social.twitter && (
            <Button variant="ghost" size="icon" asChild>
              <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
          )}
          {social.email && (
            <Button variant="ghost" size="icon" asChild>
              <a href={`mailto:${social.email}`} aria-label="Email">
                <Mail className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
}
