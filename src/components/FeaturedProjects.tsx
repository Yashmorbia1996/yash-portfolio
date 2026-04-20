import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/layout/Section";

const pressTestFixtureCoverSlides = [
  "/images/Working%20concept_CAD2.png",
  "/images/Working%20concept_actual.png",
  "/images/Concept%202_Pneumatic%20systems_press.png",
  "/images/Concept%203_pneumatic%20with%20optimized%20parts.png",
] as const;

const caseStudies = [
  {
    slug: "thermal-redesign-journey",
    title: "Thermal Redesign Journey",
    problem: "Field returns from overheating climbed to a commercially unsustainable rate; needed a real thermal-path fix.",
    action:
      "Grill/airflow iteration in Flow Simulation plus validation, then semiconductor and heatsink stack upgrade.",
    result: "16°C chip reduction; field returns to under 3%; both phases to production.",
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
            Selected Work Projects
          </p>
          <p className="text-base leading-relaxed text-text-secondary">
            A quick look at the projects that best reflect my work in product development, manufacturing, and execution.
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
          <a href="/projects">
            View all projects <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
      <p className="mb-6 max-w-4xl text-sm leading-relaxed text-text-muted">
        Disclosure: Project details are limited to non-proprietary information. Images shown are public, recreated, or selected to avoid confidential content.
      </p>
      <div className="grid grid-cols-12 gap-5">
        {caseStudies.map((project) => (
          <div key={project.slug} className="col-span-12 md:col-span-6 xl:col-span-4">
            <ProjectCard
              title={project.title}
              problem={project.problem}
              action={project.action}
              result={project.result}
              slug={project.slug}
              href={`/projects/${project.slug}`}
              cover={
                project.slug === "press-test-fixture"
                  ? "/images/Working%20concept_CAD2.png"
                  : undefined
              }
              coverSlides={
                project.slug === "press-test-fixture" ? [...pressTestFixtureCoverSlides] : undefined
              }
            />
          </div>
        ))}
      </div>
      <div className="mt-8 sm:hidden">
        <Button variant="outline" asChild>
          <a href="/projects">
            View all projects <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
    </Section>
  );
}
