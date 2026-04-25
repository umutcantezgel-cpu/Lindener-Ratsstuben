'use client';
import React from 'react';

export const HeroScrollIndicator: React.FC = () => {
    const criticalStyles = `
        .animate-scroll-indicator {
            opacity: 0;
            transform: translateY(-20px) translateX(-50%);
            animation: indicatorFadeIn 1.5s cubic-bezier(0.21, 0.47, 0.32, 0.98) 2.0s forwards;
            will-change: transform, opacity;
        }
        @keyframes indicatorFadeIn {
            to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        .animate-scroll-line {
            animation: scrollLine 2.5s linear infinite;
        }
        @keyframes scrollLine {
            0% { transform: translateY(-24px); }
            100% { transform: translateY(64px); }
        }
    `;

    return (
        <div className="absolute bottom-6 lg:bottom-10 start-1/2 rtl:translate-x-1/2 flex flex-col items-center z-30 pointer-events-none animate-scroll-indicator">
            <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
            <div className="w-[1px] h-16 bg-gradient-to-b from-onyx/20 to-transparent relative overflow-hidden">
                <div className="absolute top-0 start-0 w-[1px] h-6 bg-onyx/60 animate-scroll-line" />
            </div>
        </div>
    );
};
