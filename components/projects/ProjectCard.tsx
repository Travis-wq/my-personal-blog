import { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="flex h-full flex-col p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted/80"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ExternalLink className="h-4 w-4" />
              演示
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
