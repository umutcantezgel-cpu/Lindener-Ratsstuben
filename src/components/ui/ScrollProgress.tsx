"use client";
import React, { useEffect, useRef } from 'react';

export const ScrollProgress: React.FC = () => {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = barRef.current;
        if (!el) return;

        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
            el.style.transform = `scaleX(${progress})`;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // initial
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            ref={barRef}
            className="fixed top-0 inset-x-0 h-1 bg-primary-600 origin-left rtl:origin-right z-[100]"
            style={{ transform: 'scaleX(0)', willChange: 'transform', transition: 'transform 0.1s linear' }}
            aria-hidden="true"
        />
    );
};

