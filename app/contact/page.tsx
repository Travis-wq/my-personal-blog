import { siteConfig } from "@/data/site";
import { ContactForm } from "@/components/contact/ContactForm";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Card, CardContent } from "@/components/ui/Card";
import { Github, Mail } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    description: "查看我的开源项目和代码",
    url: siteConfig.github,
    icon: Github,
  },
  {
    name: "邮箱",
    description: siteConfig.email,
    url: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
];

export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">联系我</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              欢迎交流技术问题、合作机会，或者只是想打个招呼
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
          {/* Left: Contact Info */}
          <div>
            <AnimatedSection>
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">联系方式</h2>
                <p className="text-muted-foreground">
                  无论是技术交流、项目合作，还是对博客内容的建议和反馈，
                  都可以通过以下方式联系我。我会尽快回复。
                </p>
              </div>
            </AnimatedSection>

            {/* Social Links */}
            <div className="grid gap-4 sm:grid-cols-2">
              {socialLinks.map((link, index) => (
                <AnimatedSection key={link.name} delay={index * 0.1}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 rounded-lg border border-border bg-card p-6 transition-all hover:border-foreground/50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-foreground group-hover:text-background">
                      <link.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{link.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  </a>
                </AnimatedSection>
              ))}
            </div>

            {/* Note */}
            <AnimatedSection delay={0.3}>
              <div className="mt-8 rounded-lg border border-border bg-muted/30 p-6">
                <h3 className="mb-2 font-semibold">关于合作</h3>
                <p className="text-sm text-muted-foreground">
                  目前我正在寻找安全相关的实习或工作机会。如果你有合适的职位推荐，
                  或者想讨论技术合作，欢迎随时联系。
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Contact Form */}
          <AnimatedSection delay={0.2}>
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-6 text-xl font-bold">发送消息</h2>
                <ContactForm />
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
