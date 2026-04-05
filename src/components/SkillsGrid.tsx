import { siteConfig } from "@/config/site";

export function SkillsGrid() {
  const { skills } = siteConfig;

  return (
    <div>
      <h3 className="font-semibold text-xs uppercase tracking-widest text-slate-500 mb-5">
        Skills &amp; Tools
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full text-sm px-3 py-1 border border-slate-700/60 text-slate-300 bg-transparent"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}
