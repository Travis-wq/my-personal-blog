"use client";

import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selected: string | null;
  onSelect: (tag: string | null) => void;
}

export function TagFilter({ tags, selected, onSelect }: TagFilterProps) {
  if (tags.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">标签</p>
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onSelect("")}
          className={cn(
            "rounded-md px-2 py-1 text-xs font-medium transition-colors",
            selected === ""
              ? "bg-foreground text-background"
              : "border border-border bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          全部
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onSelect(tag)}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-medium transition-colors",
              selected === tag
                ? "bg-foreground text-background"
                : "border border-border bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
