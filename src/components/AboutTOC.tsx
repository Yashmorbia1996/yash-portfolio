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
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">
          On this page
        </p>
        <nav className="flex flex-col border-l border-slate-800">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-sm py-1.5 pl-4 transition-colors border-l-2 -ml-px ${
                activeId === id
                  ? "text-cyan-400 font-medium border-cyan-400"
                  : "text-slate-500 hover:text-slate-300 border-transparent"
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
