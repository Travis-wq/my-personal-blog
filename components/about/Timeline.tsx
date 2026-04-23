"use client";

import { TimelineItem } from "@/types";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { cn } from "@/lib/utils";
import { Milestone, BookOpen, FolderGit2, Briefcase } from "lucide-react";

interface TimelineProps {
  items: TimelineItem[];
}

const typeIcons = {
  milestone: Milestone,
  learning: BookOpen,
  project: FolderGit2,
  work: Briefcase,
};

const typeLabels = {
  milestone: "里程碑",
  learning: "学习",
  project: "项目",
  work: "工作",
};

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => {
        const Icon = typeIcons[item.type];

        return (
          <AnimatedSection key={`${item.date}-${item.title}`} delay={index * 0.05}>
            <div className="relative flex gap-4">
              {/* Timeline line */}
              {index !== items.length - 1 && (
                <div className="absolute left-[19px] top-10 h-[calc(100%+24px)] w-[2px] bg-border" />
              )}

              {/* Icon */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.date}
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {typeLabels[item.type]}
                  </span>
                </div>
                <h4 className="text-base font-semibold mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </AnimatedSection>
        );
      })}
    </div>
  );
}
