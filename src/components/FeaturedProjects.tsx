import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/layout/Section";

interface Project {
  id: string;
  data: {
    title: string;
    summary: string;
    tags: string[];
    cover: string;
    featured: boolean;
    liveUrl?: string;
  };
}

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featured = projects.filter((p) => p.data.featured).slice(0, 3);

  if (featured.length === 0) return null;

  return (
    <Section label="Case Studies">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl space-y-3">
          <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-[-0.03em]">
            Flagship work
          </h2>
          <p className="text-sm leading-relaxed text-body-text">
            Three projects from the same program — each one a different type of problem, the same standard for what done looks like.
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
          <a href="/projects">
            All case studies <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.data.title}
            summary={project.data.summary}
            tags={project.data.tags}
            slug={project.id}
            cover={project.data.cover}
            liveUrl={project.data.liveUrl}
          />
        ))}
      </div>
      <div className="mt-8 sm:hidden">
        <Button variant="outline" asChild>
          <a href="/projects">
            All case studies <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
    </Section>
  );
}
