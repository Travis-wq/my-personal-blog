import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "small" | "large";
}

export function Container({
  className,
  size = "default",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        {
          "max-w-4xl": size === "small",
          "max-w-6xl": size === "default",
          "max-w-7xl": size === "large",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
