"use client";

import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Check for prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches 
    : false;

  useEffect(() => {
    // Trigger the transition on next frame after mount
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const style: React.CSSProperties = prefersReducedMotion
    ? {}
    : {
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(25px)',
        filter: mounted ? 'blur(0px)' : 'blur(10px)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      };

  return (
    <div style={style}>
      {children}
    </div>
  );
}

