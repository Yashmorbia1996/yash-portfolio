interface ProjectCardProps {
  title: string;
  summary: string;
  tags: readonly string[];
  slug: string;
  cover?: string;
  liveUrl?: string;
  repoUrl?: string;
  date?: Date;
  duration?: string;
}

export function ProjectCard({ title, summary, tags, slug, cover, liveUrl, repoUrl, date, duration }: ProjectCardProps) {
  return (
    <article className="group relative rounded-3xl bg-card border border-border hover:border-primary-accent/40 hover:-translate-y-1 transition-all duration-300">
      <a href={`/projects/${slug}`} className="block rounded-t-3xl overflow-hidden">
        <div className="aspect-video bg-muted/50 overflow-hidden">
          {cover ? (
            <img
              src={cover}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <circle cx="9" cy="9" r="2"/>
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
              </svg>
            </div>
          )}
        </div>
      </a>

      <div className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 group-hover:text-primary-accent transition-colors">
          <a href={`/projects/${slug}`}>{title}</a>
        </h2>
        {(date || duration) && (
          <p className="text-xs text-muted-foreground mb-3">
            {date?.getFullYear()}{duration ? ` • ${duration}` : ''}
          </p>
        )}
        <p className="text-muted-foreground leading-relaxed mb-6">
          {summary}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full text-xs px-2.5 py-0.5 border border-border text-muted-foreground bg-transparent"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <a
            href={`/projects/${slug}`}
            className="text-sm text-muted-foreground hover:text-primary-accent transition-colors duration-200"
          >
            Read case study →
          </a>
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6"/>
                <path d="M10 14 21 3"/>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              </svg>
              Live site
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
