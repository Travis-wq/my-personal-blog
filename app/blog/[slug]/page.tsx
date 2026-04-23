import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { getAllPosts, getPostBySlug, getAdjacentPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { PostNavigation } from "@/components/blog/PostNavigation";
import { Badge } from "@/components/ui/Badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: siteConfig.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [siteConfig.author],
      tags: post.tags,
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(params.slug);

  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          返回博客列表
        </Link>

        <div className="grid gap-12 lg:grid-cols-[1fr_240px]">
          {/* Main Content */}
          <article>
            {/* Header */}
            <header className="mb-10">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Badge variant="default">{post.category}</Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="js-post-content prose prose-lg max-w-none dark:prose-invert prose-pre:bg-muted prose-pre:border prose-pre:border-border [&_h2]:scroll-mt-24 [&_h3]:scroll-mt-24">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeSlug]}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Navigation */}
            <PostNavigation prev={prev} next={next} />
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <TableOfContents content={post.content} />
          </aside>
        </div>
      </div>
    </div>
  );
}
