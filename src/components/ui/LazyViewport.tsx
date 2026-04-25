'use client';

import React, { useRef, useState, useEffect } from 'react';

interface LazyViewportProps {
    children: React.ReactNode;
    minHeight?: string;
    margin?: string;
}

/**
 * LazyViewport defers rendering of its children until they are about to enter the viewport.
 * Uses native IntersectionObserver — zero dependencies on framer-motion.
 * When used with next/dynamic, this completely removes the component's JS from the initial 
 * payload and main-thread execution, drastically reducing Total Blocking Time (TBT).
 */
export const LazyViewport: React.FC<LazyViewportProps> = ({ 
    children, 
    minHeight = '300px',
    margin = '200px'
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: margin }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [margin]);

    return (
        <div ref={ref} style={{ minHeight: isInView ? 'auto' : minHeight }} className="w-full">
            {isInView ? children : null}
        </div>
    );
};
