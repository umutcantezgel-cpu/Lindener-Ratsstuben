'use client';
import React, { useEffect, useRef } from 'react';

interface HeroCinematicsProps {
    imageUrl?: string;
    mobileImageUrl?: string;
    blurDataURL?: string;
}

export const HeroCinematics: React.FC<HeroCinematicsProps> = ({ imageUrl }) => {
    const parallaxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = parallaxRef.current;
        if (!el) return;

        const handleScroll = () => {
            if (window.scrollY < window.innerHeight) {
                el.style.transform = `translateY(${window.scrollY * 0.2}px)`;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const criticalStyles = `
        .animate-cinematic-scale {
            transform: scale(1.05);
            opacity: 0.6;
            animation: cinematicScale 2s cubic-bezier(0.21, 0.47, 0.32, 0.98) forwards;
            will-change: transform, opacity;
        }
        @keyframes cinematicScale {
            to { transform: scale(1); opacity: 0.6; }
        }
    `;

    return (
        <div 
            className="absolute inset-0 z-0 bg-neutral-950 overflow-hidden"
            aria-hidden="true"
        >
            <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
            {/* Cinematic Background Image Layer with Parallax */}
            {imageUrl && (
                <div 
                    ref={parallaxRef}
                    className="absolute -inset-[10%] z-0 origin-center animate-cinematic-scale"
                    style={{ willChange: 'transform' }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {/* Direct <img> tag bypasses the AdaptiveImage JS hydration wall.
                        The browser discovers this image immediately via the <link rel="preload"> in <head>,
                        instead of waiting for useDevice() context to resolve. */}
                    <img 
                        src={imageUrl} 
                        alt=""
                        fetchPriority="high"
                        decoding="async"
                        sizes="100vw"
                        style={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                </div>
            )}
            
            {/* Deep Vignette Overlay for uncompromising text contrast */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(10,10,10,0.8)_100%)] z-10 pointer-events-none" />
            
            {/* Bottom-to-top gradient to blend seamlessly into the next section */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/10 z-10 pointer-events-none" />

            {/* Top-to-bottom subtle gradient for the header area */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-transparent to-transparent z-10 pointer-events-none" />
            
            {/* High-end Film Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] z-20 pointer-events-none mix-blend-overlay" />
        </div>
    );
};

