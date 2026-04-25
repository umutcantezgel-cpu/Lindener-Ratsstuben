"use client"

import React, { createContext, useContext } from "react"
import { m as motion, Variants, HTMLMotionProps } from "framer-motion"
import { useReducedMotion } from "@/lib/hooks/useReducedMotion"

type AnimationType = "fadeInUp" | "fadeInDown" | "fadeIn" | "slideInLeft" | "slideInRight" | "scaleIn"

interface AnimateInProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  children: React.ReactNode
  type?: AnimationType
  delay?: number
  duration?: number
  once?: boolean
  threshold?: number
}

// Stagger Context to allow staggered children
const StaggerContext = createContext<boolean>(false)

const variantsMap: Record<AnimationType, Variants> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
}

export function AnimateIn({
  children,
  type = "fadeInUp",
  delay = 0,
  duration = 0.8, // liquid standard duration (800ms)
  once = true,
  threshold = 0.15,
  className,
  ...props
}: AnimateInProps) {
  const prefersReducedMotion = useReducedMotion()
  const isStaggered = useContext(StaggerContext)

  // If user prefers reduced motion, render without animation wrappers
  // or jump to visible state immediately
  const baseVariants = variantsMap[type]
  const reducedMotionVariants: Variants = {
    hidden: { opacity: 1, x: 0, y: 0, scale: 1 },
    visible: { opacity: 1, x: 0, y: 0, scale: 1 },
  }

  const variants = prefersReducedMotion ? reducedMotionVariants : baseVariants

  // Inheriting variants works well with stagger context
  const motionProps = isStaggered
    ? { variants }
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once, amount: threshold, margin: "-50px" },
        transition: { duration, delay, ease: [0.21, 0.47, 0.32, 0.98] },
        variants,
      }

  return (
    <motion.div style={{ willChange: "transform, opacity" }}
      className={className}
      {...motionProps}
      {...(isStaggered && !prefersReducedMotion
        ? { transition: { duration, ease: [0.21, 0.47, 0.32, 0.98] } }
        : {})}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  staggerChildren?: number
  delayChildren?: number
  once?: boolean
  threshold?: number
}

export function StaggerContainer({
  children,
  staggerChildren = 0.1,
  delayChildren = 0,
  once = true,
  threshold = 0.15,
  className,
  ...props
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion()

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerChildren,
        delayChildren: prefersReducedMotion ? 0 : delayChildren,
      },
    },
  }

  return (
    <StaggerContext.Provider value={true}>
      <motion.div style={{ willChange: "transform, opacity" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold, margin: "-50px" }}
        variants={variants}
        className={className}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      >
        {children}
      </motion.div>
    </StaggerContext.Provider>
  )
}
