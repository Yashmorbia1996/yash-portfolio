import { Briefcase, FileText, User, Home } from "lucide-react";
import { siteConfig } from "@/config/site";

const iconMap = { Briefcase, FileText, User, Home } as const;
type IconKey = keyof typeof iconMap;

interface HeaderProps {
  currentPath?: string;
}

export function Header({ currentPath = "/" }: HeaderProps) {
  const { nav } = siteConfig;

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <nav
        className="flex items-center gap-1 bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-full px-2 py-1.5"
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
                  ? "text-cyan-400 bg-white/10"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
              <span>{link.label}</span>
            </a>
          );
        })}
      </nav>
    </header>
  );
}
