import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPostCard } from "@/components/BlogPostCard";
import { Section } from "@/components/layout/Section";

interface BlogPost {
  id: string;
  data: {
    title: string;
    summary: string;
    date: Date;
    tags: string[];
    featured: boolean;
  };
}

interface LatestPostsProps {
  posts: BlogPost[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  const latest = [...posts]
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <Section label="Writing">
      <div className="flex items-end justify-between mb-10">
        <h2 className="font-heading text-3xl md:text-4xl font-normal tracking-[-0.03em]">
          Latest posts
        </h2>
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
          <a href="/blog">
            All posts <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {latest.map((post) => (
          <BlogPostCard
            key={post.id}
            title={post.data.title}
            summary={post.data.summary}
            date={post.data.date}
            tags={post.data.tags}
            slug={post.id}
            featured={post.data.featured}
          />
        ))}
      </div>
      <div className="mt-8 sm:hidden">
        <Button variant="outline" asChild>
          <a href="/blog">
            All posts <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
    </Section>
  );
}
