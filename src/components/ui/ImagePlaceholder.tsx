import React from 'react';
import { clsx } from 'clsx';
import { ImageIcon } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ImagePlaceholder({ className, ...props }: Record<string, any>) {
  return (
    <div 
      className={clsx(
        "bg-onyx-muted/30 border border-onyx-light flex items-center justify-center", 
        className,
        // Since many Next.js images use layout="fill", absolute is needed sometimes, but className usually carries it.
        // We'll rely on className for layout.
        props.fill ? "absolute inset-0" : "w-full h-full min-h-[100px]"
      )}
    >
      <ImageIcon className="w-8 h-8 text-onyx-light" />
    </div>
  );
}
