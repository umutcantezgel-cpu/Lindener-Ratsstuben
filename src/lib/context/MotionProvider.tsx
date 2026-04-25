"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import { ReactNode } from "react";

const loadFeatures = () => import("framer-motion").then(res => res.domAnimation);

export function GlobalMotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
