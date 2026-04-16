'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

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
    case 'fast': return 0.08;
    case 'normal': return 0.12;
    case 'slow': return 0.20;
    default: return 0.12;
  }
};

export function StaggerContainer({
  children,
  stagger = 'normal',
  delay = 0,
  className,
  as = 'div',
  ...props
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion[as as keyof typeof motion] as React.ElementType;

  const staggerSecs = shouldReduceMotion ? 0 : getStaggerValue(stagger);
  const delaySecs = shouldReduceMotion ? 0 : delay / 1000;

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerSecs,
        delayChildren: delaySecs,
      }
    }
  };

  // Convert children to motion variants
  // We expect children to be motion elements or AnimateIn if they want to participate in the stagger.
  // Actually, AnimateIn uses whileInView which doesn't directly consume stagger from variants automatically if it defines its own initial/whileInView instead of variants.
  // So a better approach for simple Stagger is to clone the children and add individual delays, OR enforce standard variants.
  // Let's use a standard wrapper approach for the children.
  
  const childArray = React.Children.toArray(children);
  const maxStaggeredChildren = 8;

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
      variants={containerVariants}
      {...props}
    >
      {childArray.map((child, index) => {
        // Only stagger the first 8 items
        const isStaggered = index < maxStaggeredChildren;

        const childVariants = {
          hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30, filter: shouldReduceMotion ? 'none' : 'blur(12px)' },
          show: { 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)',
            transition: {
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // liquid easing
            } 
          }
        };

        return (
          <motion.div key={index} variants={isStaggered ? childVariants : {
            hidden: { opacity: 1, y: 0 },
            show: { opacity: 1, y: 0 }
          }}>
            {child}
          </motion.div>
        );
      })}
    </MotionComponent>
  );
}
