import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  summary: string;
  tags: string[];
  slug: string;
  cover?: string;
  liveUrl?: string;
}

export function ProjectCard({ title, summary, tags, slug, cover, liveUrl }: ProjectCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300">
      {cover && (
        <a href={`/projects/${slug}`} className="block overflow-hidden aspect-video bg-muted">
          <img
            src={cover}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </a>
      )}
      <CardHeader className="flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-lg font-semibold leading-snug">
          <a
            href={`/projects/${slug}`}
            className="hover:underline underline-offset-2 transition-colors"
          >
            {title}
          </a>
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed mt-2">
          {summary}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center gap-2 pt-0">
        <Button variant="outline" size="sm" asChild>
          <a href={`/projects/${slug}`}>Read case study</a>
        </Button>
        {liveUrl && (
          <Button variant="ghost" size="sm" asChild>
            <a href={liveUrl} target="_blank" rel="noopener noreferrer">
              Live <ArrowUpRight className="h-3 w-3 ml-1" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
