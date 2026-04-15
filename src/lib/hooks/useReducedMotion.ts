"use client"

import { useState, useEffect } from "react"

export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if window is defined (to avoid SSR issues)
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      
      // Set initial value
      setPrefersReducedMotion(mediaQuery.matches)
      
      // Create event listener
      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches)
      }
      
      // Add event listener (use addEventListener for modern browsers)
      mediaQuery.addEventListener("change", handleChange)
      
      // Cleanup
      return () => {
        mediaQuery.removeEventListener("change", handleChange)
      }
    }
  }, [])

  return prefersReducedMotion
}
