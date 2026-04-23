import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Calendar, Clock } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Cover Image */}
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-4xl font-bold text-muted-foreground/30">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        <CardContent className="flex flex-col p-5">
          {/* Category & Tags */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge variant="default" className="text-xs">
              {post.category}
            </Badge>
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-primary">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.date)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
