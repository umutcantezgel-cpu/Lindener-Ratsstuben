'use client';
import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { AdaptiveImage } from '@/components/ui/AdaptiveImage';

interface HeroCinematicsProps {
    scrollYProgress: MotionValue<number>;
    imageUrl?: string;
    mobileImageUrl?: string;
    blurDataURL?: string;
}

export const HeroCinematics: React.FC<HeroCinematicsProps> = ({ scrollYProgress, imageUrl, mobileImageUrl, blurDataURL }) => {
    // Hardware-accelerated Opacity fade when scrolling down
    const opacityTransform = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
    const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    return (
        <motion.div 
            style={{ willChange: "transform, opacity", opacity: opacityTransform }} 
            className="absolute inset-0 z-0 bg-neutral-950 overflow-hidden"
            aria-hidden="true"
        >
            {/* Cinematic Background Image Layer with Parallax */}
            {imageUrl && (
                <motion.div 
                    initial={{ scale: 1.1, filter: 'blur(10px)', opacity: 0 }}
                    animate={{ scale: 1, filter: 'blur(0px)', opacity: 0.6 }}
                    transition={{ duration: 2, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="absolute -inset-[10%] z-0 origin-center"
                    style={{ y: yTransform, willChange: 'transform, opacity, filter' }}
                >
                    <AdaptiveImage 
                        src={imageUrl} 
                        mobileSrc={mobileImageUrl}
                        alt="Background" 
                        fill 
                        sizes="100vw"
                        priority={true} 
                        fetchPriority="high"
                        className="object-cover object-center"
                        placeholder={blurDataURL ? "blur" : "empty"}
                        blurDataURL={blurDataURL}
                    />
                </motion.div>
            )}
            
            {/* Deep Vignette Overlay for uncompromising text contrast */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(10,10,10,0.8)_100%)] z-10 pointer-events-none" />
            
            {/* Bottom-to-top gradient to blend seamlessly into the next section */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/10 z-10 pointer-events-none" />

            {/* Top-to-bottom subtle gradient for the header area */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-transparent to-transparent z-10 pointer-events-none" />
            
            {/* High-end Film Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] z-20 pointer-events-none mix-blend-overlay" />
        </motion.div>
    );
};
