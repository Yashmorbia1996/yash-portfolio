interface WorkEntry {
  id: string;
  data: {
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    achievements: string[];
    order: number;
  };
}

interface ExperienceTimelineProps {
  entries: WorkEntry[];
}

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  const sorted = [...entries].sort((a, b) => a.data.order - b.data.order);

  return (
    <div className="space-y-8">
      {sorted.map((entry, index) => {
        const { company, role, startDate, endDate, current, description, achievements } = entry.data;
        const period = current ? `${startDate} — Present` : `${startDate} — ${endDate}`;

        return (
          <div key={entry.id} className="relative pl-8 scroll-reveal">
            {/* Timeline line */}
            {index < sorted.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-0 w-px bg-border" />
            )}
            {/* Timeline dot */}
            <div className="absolute left-0 top-1.5 w-[22px] h-[22px] rounded-full border-2 border-primary bg-background flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>

            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{role}</h3>
                  <p className="text-sm text-muted-foreground">{company}</p>
                </div>
                <time className="text-xs text-muted-foreground shrink-0 sm:text-right">
                  {period}
                </time>
              </div>
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{description}</p>
              <ul className="space-y-1.5">
                {achievements.map((achievement, i) => (
                  <li key={i} className="text-sm text-foreground flex gap-2">
                    <span className="text-muted-foreground mt-1 shrink-0">—</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
