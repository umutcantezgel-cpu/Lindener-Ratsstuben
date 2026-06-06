'use client';

import React, { useRef, useState, useEffect } from 'react';

type StaggerMode = 'fast' | 'normal' | 'slow';

interface StaggerContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  stagger?: StaggerMode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const getStaggerValue = (mode: StaggerMode): number => {
  switch (mode) {
    case 'fast': return 80;
    case 'normal': return 120;
    case 'slow': return 200;
    default: return 120;
  }
};

export function StaggerContainer({
  children,
  stagger = 'normal',
  delay = 0,
  className,
  ...props
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion after mount to avoid hydration mismatch
    const isReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches || false;
    setPrefersReducedMotion(isReduced);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-10% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const staggerMs = prefersReducedMotion ? 0 : getStaggerValue(stagger);
  const maxStaggeredChildren = 8;
  const childArray = React.Children.toArray(children);

  return (
    <div ref={ref} className={className} {...props}>
      {childArray.map((child, index) => {
        const isStaggered = index < maxStaggeredChildren;
        const childDelay = isStaggered ? delay + (index * staggerMs) : delay;

        const style: React.CSSProperties = prefersReducedMotion
          ? {}
          : isVisible
            ? {
                opacity: 1,
                transform: 'translateY(0)',
                filter: 'blur(0px)',
                transition: `opacity 800ms cubic-bezier(0.21, 0.47, 0.32, 0.98) ${childDelay}ms, transform 800ms cubic-bezier(0.21, 0.47, 0.32, 0.98) ${childDelay}ms, filter 800ms cubic-bezier(0.21, 0.47, 0.32, 0.98) ${childDelay}ms`,
              }
            : {
                opacity: 0,
                transform: 'translateY(30px)',
                filter: 'blur(12px)',
              };

        return (
          <div key={index} style={{ display: 'contents', ...style }}>
            {child}
          </div>
        );
      })}
    </div>
  );
}

