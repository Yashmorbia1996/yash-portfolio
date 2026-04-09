import { Briefcase, FileText, User, Home } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const iconMap = { Briefcase, FileText, User, Home } as const;
type IconKey = keyof typeof iconMap;

interface HeaderProps {
  currentPath?: string;
}

export function Header({ currentPath = "/" }: HeaderProps) {
  const { nav } = siteConfig;

  return (
    <ThemeProvider>
      <header className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
        <nav
          className="flex items-center gap-1 rounded-full border border-border bg-nav-background px-2 py-1.5 shadow-[var(--shadow-soft)] backdrop-blur-xl"
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
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-button-secondary text-primary-accent"
                    : "text-text-muted hover:bg-card-hover hover:text-text-primary"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
                <span>{link.label}</span>
              </a>
            );
          })}
          <div className="ml-1 border-l border-border pl-1">
            <ThemeToggle />
          </div>
        </nav>
      </header>
    </ThemeProvider>
  );
}
