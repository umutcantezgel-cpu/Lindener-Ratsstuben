import React, { ReactNode } from 'react';
import { PageTransition } from '@/components/effects/PageTransition';
import { Scale } from 'lucide-react';

interface LegalPageLayoutProps {
    title: string;
    lastUpdated: string;
    children: ReactNode;
}

export const LegalPageLayout = ({ title, lastUpdated, children }: LegalPageLayoutProps) => {
    return (
        <PageTransition>
            <article className="pt-32 pb-20 min-h-screen bg-bg-primary" itemScope itemType="https://schema.org/WebPage">
                <main className="container mx-auto px-4 max-w-4xl" itemProp="mainContentOfPage">
                    
                    <header className="mb-12 md:mb-16 border-b border-border pb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                                <Scale className="w-5 h-5" aria-hidden="true" />
                            </span>
                            <h1 className="text-3xl md:text-5xl font-display font-medium text-text-primary tracking-tight" itemProp="name">
                                {title}
                            </h1>
                        </div>
                        <p className="text-sm font-medium text-text-muted uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> Stand: {lastUpdated}
                        </p>
                    </header>

                    <div 
                        className="prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:font-medium prose-a:text-accent prose-a:no-underline hover:prose-a:underline max-w-none text-text-secondary leading-relaxed"
                        itemProp="text"
                    >
                        {children}
                    </div>

                </main>
            </article>
        </PageTransition>
    );
};
