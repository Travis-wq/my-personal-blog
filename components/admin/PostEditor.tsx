"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Check, Clipboard, FileText, Info, RotateCcw } from "lucide-react";

const today = new Date().toISOString().slice(0, 10);

const initialForm = {
  title: "",
  slug: "",
  date: today,
  excerpt: "",
  category: "学习笔记",
  tags: "",
  body: "## 前言\n\n这里写文章开头。\n\n## 正文\n\n这里写正文内容。\n\n## 总结\n\n这里写总结。",
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeFrontmatterValue(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function normalizeTags(value: string) {
  return value
    .split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function PostEditor() {
  const [form, setForm] = useState(initialForm);
  const [copied, setCopied] = useState<"filename" | "content" | null>(null);

  const safeSlug = useMemo(() => {
    return slugify(form.slug || form.title) || "new-post";
  }, [form.slug, form.title]);

  const filename = `${safeSlug}.md`;

  const markdown = useMemo(() => {
    const tags = normalizeTags(form.tags);
    const tagsText = `[${tags.map((tag) => `"${escapeFrontmatterValue(tag)}"`).join(", ")}]`;

    return `---\ntitle: "${escapeFrontmatterValue(form.title || "未命名文章")}"\ndate: "${form.date || today}"\nexcerpt: "${escapeFrontmatterValue(form.excerpt)}"\ncategory: "${escapeFrontmatterValue(form.category || "未分类")}"\ntags: ${tagsText}\npublished: true\n---\n\n${form.body.trim()}\n`;
  }, [form]);

  const updateField = (
    field: keyof typeof initialForm,
    value: string
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    setCopied(null);
  };

  const copyText = async (kind: "filename" | "content", value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(kind);
    window.setTimeout(() => setCopied(null), 1800);
  };

  const reset = () => {
    setForm(initialForm);
    setCopied(null);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <Card>
        <CardHeader>
          <CardTitle>填写文章信息</CardTitle>
          <CardDescription>
            这个页面只负责生成 Markdown，不会直接保存到仓库。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
            <div className="mb-2 flex items-center gap-2 font-medium text-foreground">
              <Info className="h-4 w-4" />
              使用方法
            </div>
            生成后复制文件名和内容，在 GitHub 仓库中新建
            content/posts/文件名，粘贴内容并提交即可自动部署。
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="title" className="text-sm font-medium">
                标题
              </label>
              <input
                id="title"
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                placeholder="例如：Linux 学习笔记：文件权限入门"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">
                链接名
              </label>
              <input
                id="slug"
                value={form.slug}
                onChange={(event) => updateField("slug", event.target.value)}
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                placeholder="linux-file-permissions"
              />
              <p className="text-xs text-muted-foreground">
                建议只用英文、数字和短横线。
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                日期
              </label>
              <input
                id="date"
                type="date"
                value={form.date}
                onChange={(event) => updateField("date", event.target.value)}
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors focus:border-foreground"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                分类
              </label>
              <input
                id="category"
                value={form.category}
                onChange={(event) =>
                  updateField("category", event.target.value)
                }
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                placeholder="学习笔记"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium">
                标签
              </label>
              <input
                id="tags"
                value={form.tags}
                onChange={(event) => updateField("tags", event.target.value)}
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
                placeholder="Linux, 运维, 学习"
              />
              <p className="text-xs text-muted-foreground">
                多个标签用逗号分隔。
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="excerpt" className="text-sm font-medium">
              摘要
            </label>
            <textarea
              id="excerpt"
              value={form.excerpt}
              onChange={(event) => updateField("excerpt", event.target.value)}
              rows={3}
              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
              placeholder="一句话概括这篇文章。"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="body" className="text-sm font-medium">
              正文
            </label>
            <textarea
              id="body"
              value={form.body}
              onChange={(event) => updateField("body", event.target.value)}
              rows={16}
              className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              onClick={() => copyText("content", markdown)}
              disabled={!form.title.trim()}
            >
              {copied === "content" ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Clipboard className="mr-2 h-4 w-4" />
              )}
              复制文章内容
            </Button>
            <Button type="button" variant="outline" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              清空重填
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>生成结果</CardTitle>
            <CardDescription>复制到 GitHub 新文件中即可发布。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="text-sm font-medium">推荐文件名</label>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => copyText("filename", filename)}
                >
                  {copied === "filename" ? "已复制" : "复制"}
                </Button>
              </div>
              <div className="rounded-md border border-border bg-muted px-3 py-2 font-mono text-sm">
                {filename}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4" />
                文章内容预览
              </div>
              <pre className="max-h-[560px] overflow-auto rounded-md border border-border bg-muted p-4 text-xs leading-6">
                <code>{markdown}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
