"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "搜索文章...",
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={`relative flex items-center transition-all duration-200 ${
        isFocused ? "ring-2 ring-foreground ring-offset-2 ring-offset-background" : ""
      }`}
    >
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-border bg-background py-2 pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 rounded-sm p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
