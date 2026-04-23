"use client";

import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Trophy, Target, Zap, ArrowRight } from "lucide-react";

const ctfStats = [
  {
    icon: Trophy,
    label: "参与场次",
    value: "15+",
    description: "CTF 竞赛",
  },
  {
    icon: Target,
    label: "解题数量",
    value: "80+",
    description: "各类挑战",
  },
  {
    icon: Zap,
    label: "主攻方向",
    value: "Web",
    description: "安全方向",
  },
];

export function CTFSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Content */}
          <AnimatedSection>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-sm">
                <Trophy className="h-4 w-4" />
                CTF 竞赛
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                在实战中提升能力
              </h2>
              <p className="text-lg text-muted-foreground">
                CTF（Capture The Flag）是网络安全领域重要的练习方式。通过
                Web、Crypto、Reverse、Pwn 等方向的挑战，我不断提升自己的
                漏洞分析和利用能力。
              </p>
              <p className="text-muted-foreground">
                我的主攻方向是 Web 安全，擅长 SQL 注入、XSS、SSRF、
                文件包含等常见漏洞的挖掘与利用。同时也在学习逆向和
                二进制安全的基础知识。
              </p>
              <div className="flex gap-3">
                <Link href="/blog?category=CTF">
                  <Button className="group">
                    查看 CTF 记录
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline">相关项目</Button>
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Stats */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-6">
            {ctfStats.map((stat, index) => (
              <AnimatedSection key={stat.label} delay={index * 0.1}>
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-muted">
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
