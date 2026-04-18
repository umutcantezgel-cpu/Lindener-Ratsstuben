"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

export function GlobalMotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
