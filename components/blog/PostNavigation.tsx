import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PostNavigationProps {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  return (
    <div className="grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/blog/${prev.slug}`}
          className="group flex flex-col rounded-lg border border-border bg-muted/30 p-4 transition-colors hover:bg-muted"
        >
          <span className="mb-1 flex items-center text-xs text-muted-foreground">
            <ChevronLeft className="mr-1 h-3 w-3" />
            上一篇
          </span>
          <span className="font-medium transition-colors group-hover:text-foreground">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/blog/${next.slug}`}
          className="group flex flex-col items-end rounded-lg border border-border bg-muted/30 p-4 text-right transition-colors hover:bg-muted"
        >
          <span className="mb-1 flex items-center text-xs text-muted-foreground">
            下一篇
            <ChevronRight className="ml-1 h-3 w-3" />
          </span>
          <span className="font-medium transition-colors group-hover:text-foreground">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
