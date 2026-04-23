import { PostEditor } from "@/components/admin/PostEditor";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export const metadata = {
  title: "文章生成器",
  description: "生成博客文章 Markdown 文件内容",
};

export default function AdminPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-medium text-muted-foreground">
              管理员工具
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              文章 Markdown 生成器
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              填写文章信息后生成 Markdown 内容，再粘贴到 GitHub 仓库的
              content/posts 目录中提交发布。
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <PostEditor />
        </AnimatedSection>
      </div>
    </div>
  );
}
