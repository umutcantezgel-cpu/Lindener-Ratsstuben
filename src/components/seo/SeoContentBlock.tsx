'use client';

import React from 'react';
import { useTranslation } from '@/lib/i18n/use-translation';
import { motion } from 'framer-motion';

export function SeoContentBlock({ locale, pageKey }: { locale: string, pageKey: string }) {
    const { t } = useTranslation('seo');
    const content = t(pageKey) as string;
    
    if (content === pageKey || !content) {
        return null;
    }
    
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
                    className="max-w-4xl mx-auto"
                >
                    {/* Glassmorphic Container */}
                    <div className="relative p-8 md:p-12 lg:p-16 rounded-3xl bg-surface/40 backdrop-blur-xl border border-border/40 shadow-2xl hover:shadow-primary/5 transition-shadow duration-700">
                        
                        {/* Decorative Accent Line */}
                        <div className="absolute top-12 left-0 w-1 h-24 bg-gradient-to-b from-primary to-accent rounded-r-full" />
                        
                        <div 
                            className="
                                /* Typography Base */
                                text-text-secondary
                                
                                /* H2 Styling - Massive Editorial Headline */
                                [&>h2]:font-display [&>h2]:text-3xl [&>h2]:md:text-5xl [&>h2]:font-bold [&>h2]:text-text-main [&>h2]:tracking-tight [&>h2]:mb-8 [&>h2]:leading-tight
                                [&>h2]:bg-clip-text [&>h2]:text-transparent [&>h2]:bg-gradient-to-r [&>h2]:from-text-main [&>h2]:to-text-secondary
                                
                                /* H3 Styling - Elegant Subheading */
                                [&>h3]:font-display [&>h3]:text-2xl [&>h3]:md:text-3xl [&>h3]:text-primary [&>h3]:mt-16 [&>h3]:mb-6 [&>h3]:font-semibold [&>h3]:tracking-wide
                                
                                /* Paragraph Styling - Rich Reading Experience */
                                [&>p]:text-lg [&>p]:md:text-xl [&>p]:leading-relaxed [&>p]:mb-8 [&>p]:font-light
                                
                                /* First Paragraph Lead Styling */
                                [&>p:first-of-type]:text-xl [&>p:first-of-type]:md:text-2xl [&>p:first-of-type]:leading-relaxed [&>p:first-of-type]:text-text-main [&>p:first-of-type]:font-normal
                                
                                /* Strong text accentuation */
                                [&>strong]:font-semibold [&>strong]:text-text-main [&>strong]:border-b [&>strong]:border-primary/20
                                
                                /* Final paragraph cleanup */
                                [&>p:last-child]:mb-0
                            "
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
