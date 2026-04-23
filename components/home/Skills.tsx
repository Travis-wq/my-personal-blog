"use client";

import { skills, skillCategories } from "@/data/skills";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";

export function Skills() {
  return (
    <section className="border-y border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
              技能栈
            </h2>
            <p className="text-muted-foreground">
              持续学习和精进的技术能力
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, categoryIndex) => {
            const categorySkills = skills.filter(
              (s) => s.category === category.key
            );

            return (
              <AnimatedSection key={category.key} delay={categoryIndex * 0.1}>
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="mb-4 text-lg font-semibold">{category.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorySkills.map((skill) => (
                      <Badge key={skill.name} variant="secondary">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
