"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll<HTMLElement>(".js-post-content h2[id], .js-post-content h3[id]")
    );

    const items = headingElements
      .map((element) => ({
        id: element.id,
        text: element.textContent?.trim() ?? "",
        level: Number(element.tagName.slice(1)),
      }))
      .filter((item) => item.id && item.text);

    setHeadings(items);
    setActiveId(items[0]?.id ?? "");
  }, [content]);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -80% 0%" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h4 className="mb-3 text-sm font-semibold">目录</h4>
      <ul className="space-y-1 border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={cn(
                "block border-l-2 py-1 pl-3 text-sm transition-colors hover:text-foreground",
                heading.level === 3 ? "ml-3" : "",
                activeId === heading.id
                  ? "border-foreground font-medium text-foreground"
                  : "border-transparent text-muted-foreground"
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
