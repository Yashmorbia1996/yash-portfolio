interface ProjectCardProps {
  title: string;
  problem: string;
  action: string;
  result: string;
  slug: string;
}

export function ProjectCard({ title, problem, action, result, slug }: ProjectCardProps) {
  return (
    <article className="theme-panel theme-panel-hover group rounded-xl">
      <a href={`/projects/${slug}`} className="block">
        <div className="aspect-video rounded-t-xl border-b border-border bg-surface-elevated" />
      </a>

      <div className="p-6">
        <p className="theme-eyebrow font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
          Case Study
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-text-primary">
          <a href={`/projects/${slug}`} className="transition-colors duration-200 group-hover:text-primary-accent">
            {title}
          </a>
        </h3>

        <div className="mt-6 space-y-4 text-sm leading-relaxed text-text-secondary">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">Problem</p>
            <p className="mt-1">{problem}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">Action</p>
            <p className="mt-1">{action}</p>
          </div>
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">Result</p>
            <p className="mt-1">{result}</p>
          </div>
        </div>

        <div className="mt-6">
          <a
            href={`/projects/${slug}`}
            className="text-sm text-primary-accent transition-colors duration-200 hover:opacity-80"
          >
            Read case study →
          </a>
        </div>
      </div>
    </article>
  );
}
