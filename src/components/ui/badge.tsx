import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "error";
  size?: "sm" | "md" | "lg";
}

function Badge({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        {
          "bg-blue-100 text-blue-800": variant === "default",
          "bg-green-100 text-green-800": variant === "success",
          "bg-yellow-100 text-yellow-800": variant === "warning",
          "bg-red-100 text-red-800": variant === "error",
          "text-xs px-2 py-0.5": size === "sm",
          "text-sm px-2.5 py-0.75": size === "md",
          "text-base px-3 py-1": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge };
