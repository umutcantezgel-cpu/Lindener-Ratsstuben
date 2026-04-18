import React from 'react';
import { Download } from 'lucide-react';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { MenuInteractive } from './MenuInteractive';

export interface MenuItem {
    id: string;
    nr: string;
    name: string;
    description: string;
    price: number | null; // null = {{PREIS FEHLT}}
    category: string;
}

export interface PageClientProps {
    categories: { id: string; name: string; label: string; description?: string }[];
    menuItems: MenuItem[];
    locale: string;
}

export const Menu = async ({ categories, menuItems, locale }: PageClientProps) => {
    // Fetch translations on the server
    const t = await getTranslations(locale as LocaleType, 'pages');

    const interactiveTranslations = {
        categoriesLabel: t('menu.categories_label') as string,
        subtitle: t('menu.subtitle') as string,
        dishesHeading: t('menu.dishes_heading') as string,
        priceOnRequest: t('menu.price_on_request', 'Preis auf Anfrage') as string,
        noResults: t('menu.no_results') as string,
        legendHeading: t('menu.legend_heading') as string,
        legendTitle: (t('menu.legend_title') as string) || 'Allergene & Zusatzstoffe',
        allergensHeading: t('menu.allergens_heading') as string,
        additivesHeading: t('menu.additives_heading') as string,
    };

    return (
        <article className="pt-32 pb-20 min-h-screen bg-bg-secondary" itemProp="mainContentOfPage">
            <div className="container mx-auto px-4">
                <header className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="text-accent-text font-bold uppercase tracking-wider text-sm" aria-hidden="true">{t('menu.subtitle') as string}</span>
                    <h1 className="text-5xl font-display font-bold text-text-primary mt-2 mb-6">{t('menu.title') as string}</h1>
                    <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed mb-6">
                        {t('menu.description') as string}
                    </p>
                    <a href={`/${locale}/menu/print`} target="_blank" rel="noopener noreferrer" className="interaction-bounce px-8 py-3 bg-surface border-2 border-accent text-accent-text font-bold rounded-lg hover:bg-accent hover:text-neutral-950 transition-colors shadow-sm inline-flex items-center gap-2 uppercase tracking-wide">
                        <Download className="w-5 h-5" />
                        {t('menu.download_pdf', 'Speisekarte als PDF / Drucken')}
                    </a>
                </header>

                <MenuInteractive 
                    categories={categories} 
                    menuItems={menuItems} 
                    translations={interactiveTranslations} 
                />

                {/* Booking CTA */}
                <div className="mt-20 text-center">
                    <p className="text-text-secondary text-lg mb-6">{t('menu.reservation_prompt', 'Appetit bekommen? Sichern Sie sich jetzt Ihren Tisch.')}</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href={`/${locale}/reservation`} className="interaction-bounce px-10 py-4 bg-accent text-neutral-950 font-bold rounded-lg hover:bg-accent-hover shadow-warm flex items-center justify-center gap-2 uppercase tracking-wider w-full sm:w-auto">
                            {t('menu.reservation_cta', 'Jetzt Tisch reservieren')}
                        </a>
                        <a href={`/${locale}/menu/print`} target="_blank" rel="noopener noreferrer" className="interaction-bounce px-10 py-4 bg-surface border-2 border-accent text-accent-text font-bold rounded-lg hover:bg-accent hover:text-neutral-950 transition-colors flex items-center justify-center gap-2 uppercase tracking-wider w-full sm:w-auto">
                            <Download className="w-5 h-5" />
                            {t('menu.download_pdf', 'Drucken / Als PDF')}
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default Menu;
