'use client';
import React, { useRef } from 'react';
import { m as motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from '@/lib/i18n/use-translation';
import { MousePointerClick, ShieldCheck, Trophy } from 'lucide-react';

export const KegelbahnHero: React.FC = () => {
    useTranslation('common');
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section 
            ref={containerRef}
            className="relative h-[85vh] xl:h-[90vh] flex items-center justify-center overflow-hidden bg-onyx text-surface pt-20"
        >
            {/* Cinematic Background */}
            <motion.div 
                style={{ y, opacity }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-onyx/90 via-onyx/70 to-onyx z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent z-10 opacity-70" />
                {/* Fallback pattern if no image */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://transparenttextures.com/patterns/stardust.png')] mix-blend-overlay" />
            </motion.div>

            <div className="container relative z-10 mx-auto px-6 max-w-6xl flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="space-y-6"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary uppercase tracking-widest text-sm font-semibold backdrop-blur-sm">
                        Legendäre Atmosphäre
                    </span>
                    
                    <h1 className="text-[clamp(3rem,8vw,6rem)] font-display font-extralight tracking-tight leading-[1.05]">
                        Unsere <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary via-muted-gold-light to-primary drop-shadow-[0_0_15px_rgba(var(--color-primary),0.3)]">Kegelbahn</span>
                    </h1>
                    
                    <p className="text-lg md:text-2xl font-light text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Drei hochmoderne Profi-Bahnen gepaart mit drei exklusiven Essbereichen. Das ultimative Erlebnis für Teams, Familien und Firmenfeiern.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                    className="mt-12 flex flex-wrap justify-center gap-6"
                >
                    <div className="flex items-center gap-3 backdrop-blur-md bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                        <Trophy className="w-6 h-6 text-primary" />
                        <span className="font-medium">3 Profi-Bahnen</span>
                    </div>
                    <div className="flex items-center gap-3 backdrop-blur-md bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                        <ShieldCheck className="w-6 h-6 text-primary" />
                        <span className="font-medium">3 Essbereiche</span>
                    </div>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                    className="mt-16"
                >
                    <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-surface font-medium text-lg rounded-full overflow-hidden shadow-[0_8px_30px_rgba(var(--color-primary),0.4)] hover:shadow-[0_8px_40px_rgba(var(--color-primary),0.6)] transition-all hover:-translate-y-1">
                        <MousePointerClick className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Jetzt Bahn Reservieren</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-700 ease-out" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
