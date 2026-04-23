import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post } from "@/types";
import { calculateReadingTime } from "@/lib/utils";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getAllPosts(): Post[] {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "",
        excerpt: data.excerpt || "",
        content,
        date: data.date || "",
        readingTime: calculateReadingTime(content),
        category: data.category || "未分类",
        tags: data.tags || [],
        coverImage: data.coverImage || "",
        published: data.published !== false,
      } as Post;
    });

  // 过滤已发布并按日期排序
  return allPosts
    .filter((post) => post.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      const mdPath = path.join(postsDirectory, `${slug}.md`);
      if (!fs.existsSync(mdPath)) {
        return null;
      }
    }

    const fileContents = fs.readFileSync(
      fs.existsSync(fullPath) ? fullPath : path.join(postsDirectory, `${slug}.md`),
      "utf8"
    );
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      content,
      date: data.date || "",
      readingTime: calculateReadingTime(content),
      category: data.category || "未分类",
      tags: data.tags || [],
      coverImage: data.coverImage || "",
      published: data.published !== false,
    } as Post;
  } catch {
    return null;
  }
}

export function getAdjacentPosts(slug: string): {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
} {
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);

  return {
    prev:
      currentIndex < allPosts.length - 1
        ? {
            slug: allPosts[currentIndex + 1].slug,
            title: allPosts[currentIndex + 1].title,
          }
        : null,
    next:
      currentIndex > 0
        ? {
            slug: allPosts[currentIndex - 1].slug,
            title: allPosts[currentIndex - 1].title,
          }
        : null,
  };
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

export function filterPosts(
  posts: Post[],
  options: {
    category?: string;
    tag?: string;
    search?: string;
  }
): Post[] {
  return posts.filter((post) => {
    // 分类筛选
    if (options.category && post.category !== options.category) {
      return false;
    }

    // 标签筛选
    if (options.tag && !post.tags.includes(options.tag)) {
      return false;
    }

    // 搜索
    if (options.search) {
      const searchLower = options.search.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(searchLower);
      const matchExcerpt = post.excerpt.toLowerCase().includes(searchLower);
      const matchContent = post.content.toLowerCase().includes(searchLower);
      if (!matchTitle && !matchExcerpt && !matchContent) {
        return false;
      }
    }

    return true;
  });
}
