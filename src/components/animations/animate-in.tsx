'use client';

import React, { useRef, useState, useEffect } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface AnimateInProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  durationMode?: 'instant' | 'fast' | 'normal' | 'slow' | 'dramatic' | 'cinematic';
  once?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const formatDuration = (mode: AnimateInProps['durationMode']): number => {
  switch (mode) {
    case 'instant': return 200;
    case 'fast': return 400;
    case 'normal': return 600;
    case 'slow': return 800;
    case 'dramatic': return 1000;
    case 'cinematic': return 1400;
    default: return 1000; // dramatic default for viscous scroll-reveal
  }
};

const getTransform = (direction: Direction): string => {
  switch (direction) {
    case 'up': return 'translateY(60px)';
    case 'down': return 'translateY(-60px)';
    case 'left': return 'translateX(60px)';
    case 'right': return 'translateX(-60px)';
    case 'none': return 'none';
  }
};

export function AnimateIn({
  children,
  direction = 'up',
  delay = 0,
  durationMode = 'dramatic',
  once = true,
  className,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Check for prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches 
    : false;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reduced motion, show immediately
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        }
      },
      { rootMargin: '-5% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, prefersReducedMotion]);

  const durationMs = prefersReducedMotion ? 10 : formatDuration(durationMode);
  const delayMs = prefersReducedMotion ? 0 : delay;
  const transform = getTransform(direction);

  const style: React.CSSProperties = prefersReducedMotion
    ? {}
    : isVisible
      ? {
          opacity: 1,
          transform: 'translateY(0) translateX(0)',
          filter: 'blur(0px)',
          transition: `opacity ${durationMs}ms cubic-bezier(0.21, 0.47, 0.32, 0.98) ${delayMs}ms, transform ${durationMs}ms cubic-bezier(0.21, 0.47, 0.32, 0.98) ${delayMs}ms, filter ${durationMs}ms cubic-bezier(0.21, 0.47, 0.32, 0.98) ${delayMs}ms`,
        }
      : {
          opacity: 0,
          transform,
          filter: 'blur(6px)',
        };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

