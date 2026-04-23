import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "secondary";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-primary text-primary-foreground": variant === "default",
          "border border-border bg-transparent": variant === "outline",
          "bg-secondary text-secondary-foreground": variant === "secondary",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
