import React from 'react';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';

export async function SeoContentBlock({ locale, pageKey }: { locale: string, pageKey: string }) {
    const t = await getTranslations(locale as LocaleType, 'seo');
    const content = t(pageKey);
    
    if (content === pageKey) {
        return null;
    }
    
    return (
        <section className="container mx-auto px-6 py-12 mt-12 border-t border-border/30">
            <div 
                className="prose dark:prose-invert max-w-none text-text-muted text-sm"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </section>
    );
}
