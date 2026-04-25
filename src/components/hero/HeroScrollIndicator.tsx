'use client';
import React from 'react';
import { m as motion, MotionValue } from "framer-motion";

interface HeroScrollIndicatorProps {
    opacityTransform: MotionValue<number>;
}

export const HeroScrollIndicator: React.FC<HeroScrollIndicatorProps> = ({ opacityTransform }) => {

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute bottom-6 lg:bottom-10 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex flex-col items-center z-30 pointer-events-none"
            style={{ opacity: opacityTransform }}
        >
            <div className="w-[1px] h-16 bg-gradient-to-b from-onyx/20 to-transparent relative overflow-hidden">
                <motion.div 
                    className="absolute top-0 start-0 w-[1px] h-6 bg-onyx/60"
                    animate={{ y: [-24, 64] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                />
            </div>
        </motion.div>
    );
};
