import { skills } from "@/data/skills";
import { timelineItems } from "@/data/timeline";
import { siteConfig } from "@/data/site";
import { Timeline } from "@/components/about/Timeline";
import { SkillBar } from "@/components/about/SkillBar";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { Terminal, Shield, Code, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">关于我</h1>
            <p className="text-lg text-muted-foreground">
              一名正在路上的网络安全学习者
            </p>
          </div>
        </AnimatedSection>

        {/* Introduction */}
        <AnimatedSection>
          <div className="mb-16 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted">
                <Terminal className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold">自我介绍</h2>
            </div>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>
                你好，我是 <strong>{siteConfig.name}</strong>，一名专注于网络安全领域的学习者。
                我热衷于探索技术的边界，特别是 Web 安全、渗透测试和系统安全。
              </p>
              <p>
                我相信安全不仅是技术问题，更是一种思维方式。通过持续的学习和实践，
                我希望能够成长为一名合格的安全工程师，为保护数字世界贡献自己的力量。
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Why Security */}
        <AnimatedSection>
          <div className="mb-16 space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold">为什么选择网络安全</h2>
            </div>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>
                最初接触编程时，我偶然了解到 SQL 注入和 XSS 这些概念，
                惊讶于原来代码中的一个小疏忽就可能导致严重的安全问题。
                这种攻防博弈的魅力深深吸引了我。
              </p>
              <p>
                随着学习的深入，我意识到网络安全是一个需要持续学习的领域。
                攻击技术在演进，防御方案也在升级，这种动态的平衡让我保持热情。
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Skills */}
        <AnimatedSection>
          <div className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted">
                <Code className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold">技能栈</h2>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  安全技能
                </h3>
                <div className="space-y-4">
                  {skills
                    .filter((s) => s.category === "security")
                    .map((skill, index) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level || 0}
                        delay={index * 0.1}
                      />
                    ))}
                </div>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  开发技能
                </h3>
                <div className="space-y-4">
                  {skills
                    .filter((s) =>
                      ["programming", "system", "other"].includes(s.category)
                    )
                    .slice(0, 6)
                    .map((skill, index) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level || 0}
                        delay={index * 0.1}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Timeline */}
        <AnimatedSection>
          <div className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-muted">
                <Target className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold">学习历程</h2>
            </div>
            <Timeline items={timelineItems} />
          </div>
        </AnimatedSection>

        {/* Future Goals */}
        <AnimatedSection>
          <div className="rounded-lg border border-border bg-muted/30 p-8">
            <h2 className="mb-4 text-2xl font-bold">未来目标</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-0.5">短期</Badge>
                <p className="text-muted-foreground">
                  深入学习 Web 渗透测试，掌握更多漏洞类型的挖掘和利用方法
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-0.5">中期</Badge>
                <p className="text-muted-foreground">
                  学习代码审计和内网渗透，成为综合能力更强的安全工程师
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-0.5">长期</Badge>
                <p className="text-muted-foreground">
                  在漏洞挖掘、安全研究或企业安全方向建立自己的专业优势
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
