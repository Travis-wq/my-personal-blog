import { getAllPosts, getAllCategories, getAllTags } from "@/lib/posts";
import { BlogClient } from "@/components/blog/PostList";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">技术博客</h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              记录我的学习历程、技术思考和安全实践
            </p>
          </div>
        </AnimatedSection>

        <BlogClient posts={posts} categories={categories} tags={tags} />
      </div>
    </div>
  );
}
