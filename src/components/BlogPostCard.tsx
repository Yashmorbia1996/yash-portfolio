import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogPostCardProps {
  title: string;
  summary: string;
  date: Date;
  tags: string[];
  slug: string;
  featured?: boolean;
}

export function BlogPostCard({ title, summary, date, tags, slug, featured }: BlogPostCardProps) {
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className={`group flex flex-col shadow-card hover:shadow-card-hover transition-shadow duration-300 ${featured ? "md:flex-row" : ""}`}>
      <div className="flex-1">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <time className="text-xs text-muted-foreground" dateTime={date.toISOString()}>
              {formattedDate}
            </time>
            {featured && (
              <Badge variant="secondary" className="text-xs">Featured</Badge>
            )}
          </div>
          <CardTitle className="text-lg font-semibold leading-snug">
            <a
              href={`/blog/${slug}`}
              className="hover:underline underline-offset-2 transition-colors"
            >
              {title}
            </a>
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed mt-2">
            {summary}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
