import { Briefcase, Home, Award } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const iconMap = { Briefcase, Home, Award } as const;
type IconKey = keyof typeof iconMap;

interface HeaderProps {
  currentPath?: string;
}

export function Header({ currentPath = "/" }: HeaderProps) {
  const { nav, name } = siteConfig;

  return (
    <ThemeProvider>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/25 bg-background/35 backdrop-blur-xl supports-[backdrop-filter]:bg-background/25">
        <div className="site-container flex items-center justify-between gap-3 py-3 sm:gap-4 sm:py-3.5">
          <a
            href="/"
            className="shrink-0 text-base font-semibold tracking-[-0.02em] text-text-primary transition-opacity hover:opacity-90 sm:text-[1.05rem]"
          >
            {name}
          </a>

          <nav
            className="flex flex-wrap items-center justify-end gap-1 sm:gap-1.5"
            aria-label="Main navigation"
          >
            {nav.map((link) => {
              const isActive =
                currentPath === link.href ||
                (link.href !== "/" && currentPath.startsWith(link.href + "/"));
              const Icon = iconMap[link.icon as IconKey];
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3 ${
                    isActive
                      ? "bg-button-secondary text-primary-accent"
                      : "text-text-muted hover:bg-card-hover hover:text-text-primary"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />}
                  <span>{link.label}</span>
                </a>
              );
            })}
            <div className="ml-0.5 flex items-center border-l border-border/60 pl-1 sm:ml-1 sm:pl-1.5">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>
    </ThemeProvider>
  );
}
