import { useState } from "react";
import { Menu } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ThemeProvider } from "@/components/ThemeProvider";

interface HeaderProps {
  currentPath?: string;
}

function HeaderInner({ currentPath = "/" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const { name, nav } = siteConfig;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="site-container flex h-16 items-center justify-between">
        {/* Logo / Name */}
        <a
          href="/"
          className="font-heading text-lg font-normal tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          {name}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {nav.map((link) => {
            const isActive = currentPath === link.href || currentPath.startsWith(link.href + "/");
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </a>
            );
          })}
          <ThemeToggle />
        </nav>

        {/* Mobile nav */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="font-heading font-normal">{name}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-6" aria-label="Mobile navigation">
                {nav.map((link) => {
                  const isActive = currentPath === link.href || currentPath.startsWith(link.href + "/");
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`px-3 py-2 text-base rounded-md transition-colors ${
                        isActive
                          ? "text-foreground font-medium bg-accent"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function Header(props: HeaderProps) {
  return (
    <ThemeProvider>
      <HeaderInner {...props} />
    </ThemeProvider>
  );
}
