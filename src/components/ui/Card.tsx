import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "group rounded-md border border-border bg-surface text-text-primary shadow-sm transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-1 hover:border-border-hover hover:shadow-warm",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & { aspectRatio?: "video" | "square" | "auto" }
>(({ className, aspectRatio = "video", alt = "", ...props }, ref) => (
  <div className={cn("overflow-hidden rounded-t-md", {
    "aspect-video": aspectRatio === "video",
    "aspect-square": aspectRatio === "square",
    "aspect-auto": aspectRatio === "auto",
  })}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      ref={ref}
      alt={alt}
      className={cn(
        "h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105",
        className
      )}
      {...props}
    />
  </div>
))
CardImage.displayName = "CardImage"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6 lg:p-8", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h3>
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-base text-text-secondary", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0 lg:p-8 lg:pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0 lg:p-8 lg:pt-0", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardImage, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
