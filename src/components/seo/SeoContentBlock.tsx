'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n/use-translation';
import { motion } from 'framer-motion';

const parseContent = (html: string) => {
    const sections: { title: string; level: number; content: string }[] = [];
    const regex = /<(h[23])>(.*?)<\/\1>([\s\S]*?)(?=<h[23]>|$)/gi;
    
    let match;
    while ((match = regex.exec(html)) !== null) {
        sections.push({
            level: match[1].toLowerCase() === 'h2' ? 2 : 3,
            title: match[2],
            content: match[3].trim()
        });
    }
    
    if (sections.length === 0) {
        return { fallback: html };
    }
    
    return { sections };
};

export function SeoContentBlock({ locale, pageKey }: { locale: string, pageKey: string }) {
    const { t } = useTranslation('seo');
    const content = t(pageKey) as string;
    
    if (content === pageKey || !content) {
        return null;
    }
    
    const parsed = parseContent(content);
    
    return (
        <section className="relative w-full py-24 lg:py-32 bg-bg-primary overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-6xl mx-auto"
                >
                    {parsed.fallback ? (
                        /* Fallback if no h2/h3 tags are found */
                        <div className="relative p-8 md:p-12 lg:p-16 rounded-3xl bg-surface/40 backdrop-blur-xl border border-border/40 shadow-2xl">
                            <div className="absolute top-12 left-0 w-1 h-24 bg-gradient-to-b from-primary to-accent rounded-r-full" />
                            <div 
                                className="text-text-secondary [&>p]:text-lg [&>p]:md:text-xl [&>p]:leading-relaxed [&>p]:mb-8 [&>p]:font-light"
                                dangerouslySetInnerHTML={{ __html: parsed.fallback }}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-16 md:gap-24">
                            {/* H2 Introduction Sections */}
                            {parsed.sections?.filter(s => s.level === 2).map((section, idx) => (
                                <div key={`h2-${idx}`} className="relative p-8 md:p-12 lg:p-16 rounded-3xl bg-surface/60 backdrop-blur-2xl border border-border/40 shadow-2xl">
                                    <div className="absolute top-12 left-0 w-1 h-24 bg-gradient-to-b from-primary to-accent rounded-r-full" />
                                    <h2 className="font-display text-3xl md:text-5xl font-bold text-text-primary tracking-tight mb-8 leading-tight">
                                        {section.title}
                                    </h2>
                                    <div 
                                        className="text-xl md:text-2xl leading-relaxed text-text-secondary font-light [&>p]:mb-6 last:[&>p]:mb-0 [&>strong]:font-semibold [&>strong]:text-text-primary [&>strong]:border-b [&>strong]:border-primary/20" 
                                        dangerouslySetInnerHTML={{ __html: section.content }} 
                                    />
                                </div>
                            ))}

                            {/* H3 Feature Grid (Bento Style) */}
                            {parsed.sections && parsed.sections.filter(s => s.level === 3).length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    {parsed.sections.filter(s => s.level === 3).map((section, idx) => (
                                        <motion.div 
                                            key={`h3-${idx}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                                            className="p-8 md:p-10 rounded-3xl bg-surface/40 backdrop-blur-lg border border-border/50 hover:shadow-xl hover:border-accent/40 transition-all duration-500 group"
                                        >
                                            <h3 className="font-display text-2xl md:text-3xl text-primary font-semibold tracking-wide mb-6 group-hover:text-primary-hover transition-colors">
                                                {section.title}
                                            </h3>
                                            <div 
                                                className="text-lg leading-relaxed text-text-secondary font-light [&>p]:mb-4 last:[&>p]:mb-0" 
                                                dangerouslySetInnerHTML={{ __html: section.content }} 
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

