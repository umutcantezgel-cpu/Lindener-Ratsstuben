import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-[1px]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-surface shadow-sm focus-visible:ring-primary hover:bg-primary-hover hover:shadow-lg hover:-translate-y-[2px]",
        secondary:
          "border border-border bg-transparent text-text-primary shadow-sm focus-visible:ring-primary/50 hover:bg-bg-secondary hover:border-border-hover hover:shadow-md hover:-translate-y-[2px]",
        ghost:
          "bg-transparent text-primary focus-visible:ring-primary hover:bg-primary/5 active:scale-95",
        destructive:
          "bg-status-error text-surface shadow-sm focus-visible:ring-status-error hover:bg-status-error/90 hover:shadow-lg hover:-translate-y-[2px]",
      },
      size: {
        sm: "h-12 px-4 text-sm font-semibold",
        md: "h-12 px-6 text-base font-bold",
        lg: "h-14 px-8 text-base font-bold",
        xl: "h-16 px-10 text-lg font-bold",
        icon: "h-12 w-12 p-3 font-bold",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || isLoading;
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="me-2 inline-flex items-center">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ms-2 inline-flex items-center">{rightIcon}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
