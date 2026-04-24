import React, { ReactNode } from 'react';
import { PageTransition } from '@/components/effects/PageTransition';
import { Scale, Info } from 'lucide-react';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';

interface LegalPageLayoutProps {
    title: string;
    lastUpdated: string;
    locale?: string;
    children: ReactNode;
}

export const LegalPageLayout = async ({ title, lastUpdated, locale, children }: LegalPageLayoutProps) => {
    const currentLocale = (locale || 'de') as LocaleType;
    const isNonGerman = currentLocale !== 'de';
    
    let bindingNotice = '';
    let lastUpdatedLabel = 'Stand';
    
    if (isNonGerman) {
        const tLegal = await getTranslations(currentLocale, 'legal');
        bindingNotice = tLegal('legal.binding_notice');
        lastUpdatedLabel = tLegal('legal.last_updated');
    }

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
                            <span className="w-2 h-2 rounded-full bg-green-500"></span> {isNonGerman ? lastUpdatedLabel : 'Stand'}: {lastUpdated}
                        </p>
                    </header>

                    {/* Binding notice for non-German locales */}
                    {isNonGerman && bindingNotice && (
                        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl flex items-start gap-3">
                            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                                {bindingNotice}
                            </p>
                        </div>
                    )}

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
