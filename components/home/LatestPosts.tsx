import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/blog/PostCard";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">
                最新文章
              </h2>
              <p className="text-muted-foreground">
                分享我的学习笔记、技术思考和实践经验
              </p>
            </div>
            <Link href="/blog" className="hidden sm:block">
              <Button variant="ghost" className="group">
                查看全部
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <AnimatedSection key={post.slug} delay={index * 0.1}>
              <PostCard post={post} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-8 text-center sm:hidden">
          <Link href="/blog">
            <Button variant="outline" className="group w-full">
              查看全部文章
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
