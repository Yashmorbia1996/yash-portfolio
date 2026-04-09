import { useState, useEffect } from "react";

const sections = [
  { id: "intro", label: "Introduction" },
  { id: "experience", label: "Work Experience" },
  { id: "skills", label: "Technical Skills" },
];

export function AboutTOC() {
  const [activeId, setActiveId] = useState<string>("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden xl:block w-48 shrink-0">
      <div className="sticky top-28">
        <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-text-muted">
          On this page
        </p>
        <nav className="flex flex-col border-l border-border">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-sm py-1.5 pl-4 transition-colors border-l-2 -ml-px ${
                activeId === id
                  ? "font-medium text-primary-accent border-primary-accent"
                  : "border-transparent text-text-muted hover:text-text-primary"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
