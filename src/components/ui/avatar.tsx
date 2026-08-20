import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
}

function Avatar({ className, src, alt, fallback, size = "md", ...props }: AvatarProps) {
  const [error, setError] = React.useState(false)

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium overflow-hidden shrink-0",
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {src && !error ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span aria-hidden="true">
          {fallback
            ? fallback
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)
            : "?"}
        </span>
      )}
    </div>
  )
}

export { Avatar }
export type { AvatarProps }