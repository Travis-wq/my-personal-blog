import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function ProjectsPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">项目作品</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              我在学习过程中完成的一些项目，每一个都记录着我的成长
            </p>
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.1}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>

        {/* More Coming */}
        <AnimatedSection delay={0.4}>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              更多项目正在开发中，敬请期待...
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
