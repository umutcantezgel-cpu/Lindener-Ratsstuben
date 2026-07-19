import React, { ReactNode } from 'react';
import { PageTransition } from '@/components/effects/PageTransition';
import { Scale, Info } from 'lucide-react';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { SeoContentBlock } from '@/components/seo/SeoContentBlock';

interface LegalPageLayoutProps {
    title: string;
    lastUpdated: string;
    locale?: string;
    pageKey: string;
    children: ReactNode;
}

export const LegalPageLayout = async ({ title, lastUpdated, locale, pageKey, children }: LegalPageLayoutProps) => {
    const currentLocale = (locale || 'de') as LocaleType;
    const isNonGerman = currentLocale !== 'de';
    
    let bindingNoticeP1 = '';
    let bindingNoticeP2 = '';
    let bindingNoticeP3 = '';
    let lastUpdatedLabel = 'Stand';
    
    if (isNonGerman) {
        const tLegal = await getTranslations(currentLocale, 'legal');
        bindingNoticeP1 = tLegal('legal.binding_notice_p1');
        bindingNoticeP2 = tLegal('legal.binding_notice_p2');
        bindingNoticeP3 = tLegal('legal.binding_notice_p3');
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
                    {isNonGerman && (bindingNoticeP1 || bindingNoticeP2 || bindingNoticeP3) && (
                        <div className="mb-8 p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl flex items-start gap-4">
                            <Info className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-1" aria-hidden="true" />
                            <div className="space-y-4">
                                {bindingNoticeP1 && <p className="text-sm text-amber-800 dark:text-amber-200 font-medium leading-relaxed">{bindingNoticeP1}</p>}
                                {bindingNoticeP2 && <p className="text-sm text-amber-800 dark:text-amber-200 font-medium leading-relaxed">{bindingNoticeP2}</p>}
                                {bindingNoticeP3 && <p className="text-sm text-amber-800 dark:text-amber-200 font-medium leading-relaxed">{bindingNoticeP3}</p>}
                            </div>
                        </div>
                    )}

                    <div 
                        className="prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:font-medium prose-a:text-accent prose-a:no-underline hover:prose-a:underline max-w-none text-text-secondary leading-relaxed"
                        itemProp="text"
                    >
                        {children}
                    </div>

                    <SeoContentBlock locale={currentLocale} pageKey={pageKey} />
                </main>
            </article>
        </PageTransition>
    );
};
