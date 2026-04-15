"use client";

import React, { useEffect, useState, useRef } from 'react';

type DynamicCounterProps = {
  endValue: number;
  label: string;
  format?: 'number' | 'percentage';
};

export function DynamicCounter({ endValue, label, format = 'number' }: DynamicCounterProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCount(endValue);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        animateValue(0, endValue, 1200);
      }
    }, { threshold: 0.5 });

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [endValue, hasAnimated]);

  const animateValue = (start: number, end: number, duration: number) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutQuart 
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * (end - start) + start));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center p-6 bg-bg-secondary rounded-lg shadow-sm border border-border">
      <div className="text-4xl font-bold text-text-primary mb-2">
        {count}{format === 'percentage' && '%'}
      </div>
      <div className="text-sm font-medium text-text-secondary text-center uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
