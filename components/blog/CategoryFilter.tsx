"use client";

import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("")}
        className={cn(
          "rounded-full px-3 py-1 text-sm font-medium transition-colors",
          selected === ""
            ? "bg-foreground text-background"
            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
        )}
      >
        全部
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium transition-colors",
            selected === category
              ? "bg-foreground text-background"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
