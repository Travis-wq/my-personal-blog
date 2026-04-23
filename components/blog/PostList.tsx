"use client";

import { useState, useMemo } from "react";
import { Post } from "@/types";
import { PostCard } from "@/components/blog/PostCard";
import { SearchBar } from "@/components/blog/SearchBar";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { TagFilter } from "@/components/blog/TagFilter";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FileText } from "lucide-react";

interface BlogClientProps {
  posts: Post[];
  categories: string[];
  tags: string[];
}

export function BlogClient({ posts, categories, tags }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (selectedCategory && post.category !== selectedCategory) {
        return false;
      }
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false;
      }
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(searchLower);
        const matchExcerpt = post.excerpt.toLowerCase().includes(searchLower);
        const matchContent = post.content.toLowerCase().includes(searchLower);
        if (!matchTitle && !matchExcerpt && !matchContent) {
          return false;
        }
      }
      return true;
    });
  }, [posts, selectedCategory, selectedTag, searchQuery]);

  return (
    <>
      {/* Filters */}
      <AnimatedSection delay={0.1}>
        <div className="mb-8 space-y-6">
          {/* Search */}
          <div className="mx-auto max-w-md">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          {/* Category Filter */}
          <div>
            <p className="mb-2 text-sm text-muted-foreground">分类筛选</p>
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onSelect={(cat) => {
                setSelectedCategory(cat);
                setSelectedTag(null);
              }}
            />
          </div>

          {/* Tag Filter */}
          {tags.length > 0 && (
            <div>
              <p className="mb-2 text-sm text-muted-foreground">标签筛选</p>
              <TagFilter
                tags={tags}
                selected={selectedTag}
                onSelect={(tag) => {
                  setSelectedTag(tag);
                  setSelectedCategory(null);
                }}
              />
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Results */}
      <AnimatedSection delay={0.2}>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            共 {filteredPosts.length} 篇文章
          </p>
          {(selectedCategory || selectedTag || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedTag(null);
                setSearchQuery("");
              }}
              className="text-sm text-primary hover:underline"
            >
              清除筛选
            </button>
          )}
        </div>
      </AnimatedSection>

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <AnimatedSection key={post.slug} delay={index * 0.05}>
              <PostCard post={post} />
            </AnimatedSection>
          ))}
        </div>
      ) : (
        <AnimatedSection>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-medium">没有找到相关文章</h3>
            <p className="text-muted-foreground">
              尝试调整搜索条件或筛选选项
            </p>
          </div>
        </AnimatedSection>
      )}
    </>
  );
}
