"use client";

import { motion } from "framer-motion";

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-bg-primary w-full flex flex-col">
      <div className="w-full h-screen max-h-[80vh] bg-onyx-deep relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>
      <div className="container mx-auto px-4 py-24 space-y-12">
        <div className="space-y-4 max-w-2xl mx-auto text-center">
          <SkeletonBox className="h-10 w-3/4 mx-auto" />
          <SkeletonBox className="h-6 w-1/2 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SkeletonBox className="h-64" />
          <SkeletonBox className="h-64" />
          <SkeletonBox className="h-64" />
        </div>
      </div>
    </div>
  );
}

function SkeletonBox({ className }: { className?: string }) {
  return (
    <div className={`bg-onyx-light/30 rounded-lg overflow-hidden relative ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      />
    </div>
  );
}
