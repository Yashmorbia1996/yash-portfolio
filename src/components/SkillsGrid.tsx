import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/badge";

export function SkillsGrid() {
  const { skills } = siteConfig;

  return (
    <div>
      <h3 className="font-semibold text-sm uppercase tracking-[0.08em] text-muted-foreground mb-4">
        Skills &amp; Tools
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-sm px-3 py-1">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
