'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

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
    case 'instant': return 0.2;
    case 'fast': return 0.4;
    case 'normal': return 0.6;
    case 'slow': return 0.8;
    case 'dramatic': return 1.0;
    case 'cinematic': return 1.4;
    default: return 1.0; // dramatic default for viscous scroll-reveal
  }
};

export function AnimateIn({
  children,
  direction = 'up',
  delay = 0,
  durationMode = 'dramatic',
  once = true,
  className,
  as = 'div'
}: AnimateInProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion[as as keyof typeof motion] as React.ElementType;

  let initialY = 0;
  let initialX = 0;

  if (!shouldReduceMotion && direction !== 'none') {
    if (direction === 'up') initialY = 60; // Increased amplitude for viscous float
    if (direction === 'down') initialY = -60;
    if (direction === 'left') initialX = 60;
    if (direction === 'right') initialX = -60;
  }

  const durationStr = formatDuration(durationMode);
  const delaySecs = delay / 1000;

  return (
    <MotionComponent
      className={className}
      initial={{ 
        opacity: shouldReduceMotion ? 1 : 0.01, // Prevent harsh fade, rely on motion
        y: initialY, 
        x: initialX,
        filter: shouldReduceMotion ? 'none' : 'blur(4px)' // Subtler blur
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
        filter: 'blur(0px)'
      }}
      viewport={{ once, margin: '-5% 0px' }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : durationStr,
        delay: shouldReduceMotion ? 0 : delaySecs,
        ease: [0.25, 1, 0.5, 1] as [number, number, number, number], // viscous liquid easing
      }}
    >
      {children}
    </MotionComponent>
  );
}
