import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/layout/Section";

const caseStudies = [
  {
    slug: "thermal-redesign-journey",
    title: "Thermal Redesign Journey",
    problem: "23% field return rate from overheating.",
    action: "Optimized grill geometry via SolidWorks Flow Simulation and deployed an all-metal heatsink.",
    result: "16°C chip temp reduction; returns dropped to 3%.",
  },
  {
    slug: "liv-optical-test-rig",
    title: "LIV Optical Test Rig",
    problem: "Manual laser testing caused high variability.",
    action: "Designed 39-part assembly with kinematic mounting and GD&T package.",
    result: "3x improvement in batch-test throughput.",
  },
  {
    slug: "press-test-fixture",
    title: "Press Test Fixture",
    problem: "Manual alignment introduced yield loss.",
    action: "Redesigned across three generations to integrate alignment into fixture geometry.",
    result: "Sustained 95% yield at 1,500 units/week.",
  },
] as const;

export function FeaturedProjects() {

  return (
    <Section id="case-studies">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-4xl space-y-4">
          <p className="theme-section-title text-5xl font-semibold md:text-6xl">
            Case Studies
          </p>
          <p className="text-base leading-relaxed text-text-secondary">
            Three flagship projects framed the way engineering teams actually talk about impact.
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
          <a href="/projects">
            All case studies <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-5">
        {caseStudies.map((project) => (
          <div key={project.slug} className="col-span-12 md:col-span-6 xl:col-span-4">
            <ProjectCard
              title={project.title}
              problem={project.problem}
              action={project.action}
              result={project.result}
              slug={project.slug}
            />
          </div>
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
