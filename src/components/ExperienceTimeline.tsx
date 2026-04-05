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
    <div className="space-y-10">
      {sorted.map((entry) => {
        const { company, role, startDate, endDate, current, description, achievements } = entry.data;
        const period = current ? `${startDate} — Present` : `${startDate} — ${endDate}`;

        return (
          <div key={entry.id} className="scroll-reveal">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
              <div>
                <h3 className="font-semibold text-slate-100">{role}</h3>
                <p className="text-sm text-slate-500">{company}</p>
              </div>
              <time className="text-xs text-slate-500 shrink-0 sm:text-right mt-0.5">
                {period}
              </time>
            </div>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">{description}</p>
            <ul className="space-y-2">
              {achievements.map((achievement, i) => (
                <li key={i} className="text-sm flex gap-2.5">
                  <span className="text-cyan-500 mt-1 shrink-0">·</span>
                  <span className="text-slate-300">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
