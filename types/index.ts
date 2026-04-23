export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: string;
  category: string;
  tags: string[];
  coverImage?: string;
  published: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  level?: number;
  category: "security" | "programming" | "system" | "other";
}

export interface TimelineItem {
  date: string;
  title: string;
  description: string;
  type: "milestone" | "learning" | "project" | "work";
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  author: string;
  email: string;
  github: string;
  url: string;
  locale: string;
}
