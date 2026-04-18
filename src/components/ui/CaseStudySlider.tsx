"use client";

import React, { useState, useRef, useEffect } from 'react';

// For production, these would be actual Next/Image urls or props
type CaseStudySliderProps = {
  imgBefore: string;
  imgAfter: string;
  labelBefore?: string;
  labelAfter?: string;
};

export function CaseStudySlider({ 
  imgBefore, 
  imgAfter, 
  labelBefore = "Vorher", 
  labelAfter = "Nachher" 
}: CaseStudySliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const position = ((clientX - left) / width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => isDragging && handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => isDragging && handleMove(e.touches[0].clientX);

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden cursor-ew-resize bg-bg-secondary focus:outline-none focus:ring-4 focus:ring-primary"
      role="slider"
      aria-valuenow={sliderPosition}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onMouseDown={(e) => {
        setIsDragging(true);
        handleMove(e.clientX);
      }}
      onTouchStart={(e) => {
        setIsDragging(true);
        handleMove(e.touches[0].clientX);
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') setSliderPosition(p => Math.min(p + 5, 100));
        if (e.key === 'ArrowLeft') setSliderPosition(p => Math.max(p - 5, 0));
      }}
    >
      {/* Fallback colors mimicking images since we don't have actual static assets yet */}
      <div 
        className="absolute inset-0 bg-border bg-cover bg-center flex items-end p-4"
        style={{ backgroundImage: imgAfter ? `url(${imgAfter})` : undefined }}
      >
        {!imgAfter && <p className="text-text-tertiary opacity-50 m-auto">After Image Placeholder</p>}
        <span className="bg-text-primary/60 text-surface text-xs px-2 py-1 rounded backdrop-blur-sm z-10">{labelAfter}</span>
      </div>

      <div 
        className="absolute inset-0 bg-bg-secondary bg-cover bg-center flex items-end p-4 border-e-2 border-surface pointer-events-none"
        style={{ 
          width: `${sliderPosition}%`,
          backgroundImage: imgBefore ? `url(${imgBefore})` : undefined 
        }}
      >
        {!imgBefore && <p className="text-text-tertiary opacity-50 m-auto min-w-[200px]">Before Image Placeholder</p>}
        <span className="bg-text-primary/60 text-surface text-xs px-2 py-1 rounded backdrop-blur-sm z-10">{labelBefore}</span>
      </div>

      <div 
        className="absolute top-0 bottom-0 w-1 bg-surface pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="w-8 h-8 bg-surface rounded-full flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-primary">
            <polyline points="15 18 9 12 15 6"></polyline>
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}
