"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { getParam, setParam } from '@/lib/utils/url-params';
import { allergenLegend, zusatzstoffLegend, legal_disclaimers, categoryFootnotes } from '@/data/menu';
import { Info, AlertTriangle, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { StaggerContainer } from '@/components/animations/stagger-container';
import { AdaptiveImage } from '@/components/ui/AdaptiveImage';
import { formatCurrency } from '@/lib/i18n/formatters/number';
import { MenuItem } from './PageClient'; // We will export this from the server component or move it

const categoryImageMap: Record<string, string> = {
    'dessert': '/images/category_dolci.png',
    'pasta': '/images/category_pasta.png',
    'hausgemachte-pasta': '/images/category_pasta.png',
    'pasta-al-forno': '/images/category_pasta.png',
    'pizza': '/images/category_pizza.png',
    'familienpizza': '/images/category_pizza.png',
    'rotweine': '/images/category_vino.png',
    'weissweine': '/images/category_vino.png',
};

const dishImageMap: Record<string, string> = {
    '10': '/images/menu/suppen/10-tagessuppe.png',
    '11': '/images/menu/suppen/11-tomatencremesuppe.png',
    '20': '/images/menu/vorspeisen/20-bruschetta-classico.png',
    '21': '/images/menu/vorspeisen/21-prosciutto-melone.png',
    '22': '/images/menu/vorspeisen/22-la-burrata.png',
    '23': '/images/menu/vorspeisen/23-vitello-tonnato.png',
    '24': '/images/menu/vorspeisen/24-carpaccio-manzo.png',
    '25': '/images/menu/vorspeisen/25-antipasti-misti.png',
    '30': '/images/menu/salate/30-insalata-mista.png',
    '31': '/images/menu/salate/31-insalata-italia.png',
    '32': '/images/menu/salate/32-insalata-italia-klein.png',
    '33': '/images/menu/salate/33-insalata-frutti-di-mare.png',
    '34': '/images/menu/salate/34-insalata-pollo.png',
    '35': '/images/menu/salate/35-insalata-salmone-gamberoni.png',
    '36': '/images/menu/salate/36-insalata-don-capo.png',
    '40': '/images/menu/pasta/40-spaghetti-bolognese.png',
    '41': '/images/menu/pasta/41-spaghetti-carbonara.png',
    '42': '/images/menu/pasta/42-rigatoni-puglia.png',
    '43': '/images/menu/pasta/43-rigatoni-ratsstube.png',
    '44': '/images/menu/pasta/44-tagliatelle-verdure.png',
    '45': '/images/menu/pasta/45-tagliatelle-salmone.png',
    '46': '/images/menu/pasta/46-linguine-frutti-di-mare.png',
    '47': '/images/menu/pasta/47-linguine-pesce-misto.png',
    '48': '/images/menu/pasta/48-pasta-combinazione.png',
    '49': '/images/menu/pasta/49-rigatoni-al-ragu-e-verdure.png',
    '50': '/images/menu/pasta/50-tortellini-alla-panna.png',
    '51': '/images/menu/pasta/51-tortelacci-burro-e-salvia.png',
    '52': '/images/menu/pasta/52-tortellacci-salmone-e-gamberoni.png',
    '53': '/images/menu/pasta/53-gnocchi-con-gamberoni.png',
    '54': '/images/menu/pasta/54-gnocchi-pesto-burrata.png',
    '62': '/images/menu/pasta/62-tortellini-prosciutto-e-panna.png',
    '70': '/images/menu/schnitzel/70-schnitzel-wiener-art.png',
    '71': '/images/menu/schnitzel/71-rahm-schnitzel.png',
    '72': '/images/menu/schnitzel/72-jaeger-schnitzel.png',
    '73': '/images/menu/schnitzel/73-pfeffer-schnitzel.png',
    '74': '/images/menu/schnitzel/74-bauern-schnitzel.png',
    '75': '/images/menu/schnitzel/75-schlemmer-schnitzel.png',
    '76': '/images/menu/schnitzel/76-lindener-rucksack.png',
    '80': '/images/menu/fleisch-fisch/80-petto-di-pollo-alla-griglia.png',
    '81': '/images/menu/fleisch-fisch/81-petto-di-pollo-al-pepe-verde.png',
    '82': '/images/menu/fleisch-fisch/82-filetto-di-maiale-al-vino-bianco.png',
    '83': '/images/menu/fleisch-fisch/83-filetto-di-maiale-al-pepe-verde.png',
    '84': '/images/menu/fleisch-fisch/84-bistecca-alla-griglia.png',
    '85': '/images/menu/fleisch-fisch/85-bistecca-al-pepe-verde.png',
    '86': '/images/menu/fleisch-fisch/86-orata-con-burro-al-limone-e-aglio.png',
    '87': '/images/menu/fleisch-fisch/87-salmone-alla-griglia-salsa-all-arancia-e-senape.png',
    '88': '/images/menu/fleisch-fisch/88-seppia-alla-griglia.png',
    '90': '/images/menu/pizzen/90-pizza-margarita.png',
    '91': '/images/menu/pizzen/91-pizza-salame-e-funghi.png',
    '92': '/images/menu/pizzen/92-pizza-regina.png',
    '93': '/images/menu/pizzen/93-pizza-toscana.png',
    '94': '/images/menu/pizzen/94-pizza-ratsstuben.png',
    '95': '/images/menu/pizzen/95-pizza-hawaii.png',
    '96': '/images/menu/pizzen/96-pizza-diavolo.png',
    '97': '/images/menu/pizzen/97-pizza-parma-e-rucola.png',
    '98': '/images/menu/pizzen/98-pizza-amore-mio-talia.png',
    '99': '/images/menu/pizzen/99-pizza-tonno.png',
    '100': '/images/menu/pizzen/100-pizza-burrata-e-rucola.png',
    '101': '/images/menu/pizzen/101-pizza-frutti-di-mare.png',
    '102': '/images/menu/pizzen/102-pizza-salmone-e-gamberoni.png',
    '103': '/images/menu/pizzen/103-pizza-deluxe.png',
    '105': '/images/menu/pizzen/105-pizza-vegetale.png',
    '106': '/images/menu/pizzen/106-pizzapane.png',
    '110': '/images/menu/pizzen/110-familienpizza-margherita.png',
    '111': '/images/menu/pizzen/111-familienpizza-regina.png',
    '112': '/images/menu/pizzen/112-familienpizza-toskana.png',
    '113': '/images/menu/pizzen/113-familienpizza-tonno.png',
    '114': '/images/menu/pizzen/114-familienpizza-parma-e-rucola.png',
    '115': '/images/menu/pizzen/115-familienpizza-vegetaria.png',
    '120': '/images/menu/kindergerichte/120-chicken-nuggets.png',
    '121': '/images/menu/kindergerichte/121-rigatoni-burro.png',
    '122': '/images/menu/kindergerichte/122-spaghetti-alla-bolognese.png',
    '123': '/images/menu/kindergerichte/123-kleine-schnitzel-wiener-art.png',
    '130': '/images/menu/dessert/130-tiramisu.png',
    '131': '/images/menu/dessert/131-panna-cotta.png',
    '132': '/images/menu/dessert/132-tartufo-nero.png',
    '133': '/images/menu/dessert/133-cassata-siciliana.png',
};

const FALLBACK_IMAGE = '/images/placeholder.svg';

interface MenuInteractiveProps {
    categories: { id: string; name: string; label: string; description?: string }[];
    menuItems: MenuItem[];
    translations: {
        categoriesLabel: string;
        subtitle: string;
        dishesHeading: string;
        priceOnRequest: string;
        noResults: string;
        legendHeading: string;
        legendTitle: string;
        allergensHeading: string;
        additivesHeading: string;
    };
}

export const MenuInteractive = ({ categories, menuItems, translations }: MenuInteractiveProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const urlCategory = getParam('category', searchParams);
    const activeCategory = urlCategory || 'suppen';

    const [showLegend, setShowLegend] = useState(false);

    const setActiveCategory = useCallback((categoryId: string) => {
        setParam('category', categoryId, router, pathname, searchParams);
    }, [router, pathname, searchParams]);

    const filteredItems = useMemo(() => {
        return menuItems.filter(item => item.category === activeCategory);
    }, [activeCategory, menuItems]);

    const currentCategoryObj = categories.find(c => c.id === activeCategory);
    const currentNote = currentCategoryObj?.description || categoryFootnotes[activeCategory] || undefined;
    const locale = pathname.split('/')[1] || 'de';

    return (
        <>
            {/* Category Navigation */}
            <div className="relative mb-12">
                <nav aria-label={translations.categoriesLabel} className="overflow-x-auto pb-4 scrollbar-hide relative z-10">
                    <ul className="flex gap-3 md:justify-center min-w-max px-4 m-0 p-0 list-none">
                        {categories.map(category => (
                            <li key={category.id}>
                                <button
                                    onClick={() => setActiveCategory(category.id)}
                                    aria-current={activeCategory === category.id ? "page" : undefined}
                                    className={clsx(
                                        "px-6 py-3 rounded-lg font-bold transition-all whitespace-nowrap border-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary",
                                        activeCategory === category.id
                                            ? "bg-primary border-primary text-surface shadow-sm transform scale-105"
                                            : "bg-bg-secondary border-transparent text-text-secondary hover:border-border hover:bg-surface"
                                    )}
                                >
                                    {category.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                {/* Visual scroll indicator for mobile */}
                <div className="absolute top-0 right-0 bottom-4 w-12 bg-gradient-to-l from-bg-primary to-transparent pointer-events-none md:hidden z-20" aria-hidden="true" />
            </div>

            {/* Category Note / Footnote */}
            {currentNote && (
                <div className="mb-8 text-center text-text-secondary text-sm bg-bg-primary/80 px-6 py-3 rounded-xl max-w-3xl mx-auto border border-border">
                    <Info className="w-4 h-4 inline-block me-2 -mt-0.5" aria-hidden="true" />
                    {currentNote}
                </div>
            )}

            {/* Category Header Image */}
            {categoryImageMap[activeCategory] && (
                <div className="mb-12 relative w-full h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-sm border border-border">
                    <AdaptiveImage 
                        src={categoryImageMap[activeCategory]}
                        alt={`${currentCategoryObj?.label || 'Kategorie'} Bild`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                        priority={true}
                        fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/90 via-bg-secondary/40 to-transparent flex flex-col justify-end p-6 md:p-10">
                        <span className="text-accent-text font-bold uppercase tracking-wider text-sm mb-2 drop-shadow-sm">{translations.subtitle}</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary drop-shadow-md">
                            {currentCategoryObj?.label}
                        </h2>
                    </div>
                </div>
            )}

            {/* Menu Grid */}
            <h2 className="sr-only">{translations.dishesHeading}</h2>
            <StaggerContainer as="ul" key={activeCategory} className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-6 m-0 p-0 list-none">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, idx) => (
                        <div key={item.id || `${item.nr}-${idx}`} className="p-4 sm:p-6 bg-surface rounded-2xl border border-border/50 hover:border-accent/40 shadow-sm hover:shadow-md transition-all relative group flex gap-4 sm:gap-6">
                            <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden relative border border-border/50 bg-bg-secondary">
                                <AdaptiveImage
                                    src={dishImageMap[item.nr] || FALLBACK_IMAGE}
                                    alt={item.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 640px) 5rem, (max-width: 768px) 6rem, 7rem"
                                />
                            </div>
                            <div className="flex-grow min-w-0 flex flex-col justify-center">
                                <div className="flex justify-between items-start sm:items-baseline mb-2 gap-3 flex-col sm:flex-row">
                                    <h3 className="text-lg sm:text-xl font-display font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">
                                        {item.nr && <span className="text-text-tertiary font-mono text-sm sm:text-base me-2">{item.nr}.</span>}
                                        {item.name}
                                    </h3>
                                    <div className="flex-grow border-b-2 border-dotted border-border/40 relative -top-1.5 hidden sm:block" aria-hidden="true" />
                                    <span className="text-lg sm:text-xl font-display font-bold text-text-primary whitespace-nowrap self-start sm:self-auto">
                                        {item.price !== null ? formatCurrency(item.price, locale) : (
                                            <span className="text-text-tertiary text-base italic">{translations.priceOnRequest}</span>
                                        )}
                                    </span>
                                </div>

                                {item.description && (
                                    <p className="text-text-secondary font-body text-sm sm:text-base leading-relaxed max-w-xl">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-32 bg-bg-secondary rounded-2xl border border-dashed border-border">
                        <Info className="w-12 h-12 text-text-tertiary mx-auto mb-4" aria-hidden="true" />
                        <p className="text-text-secondary text-lg font-medium">{translations.noResults}</p>
                    </div>
                )}
            </StaggerContainer>

            {/* Allergen & Additive Legend */}
            <div className="mt-16 max-w-4xl mx-auto">
                <h2 className="sr-only">{translations.legendHeading}</h2>
                <button
                    onClick={() => setShowLegend(!showLegend)}
                    aria-expanded={showLegend}
                    aria-label={translations.legendTitle}
                    className="w-full flex items-center justify-between bg-bg-secondary p-5 rounded-2xl shadow-sm border border-border hover:bg-surface transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary"
                >
                    <span className="flex items-center gap-2 text-text-primary font-bold">
                        <AlertTriangle className="w-5 h-5 text-orange-500" aria-hidden="true" />
                        {translations.legendTitle}
                    </span>
                    <ChevronDown className={clsx("w-5 h-5 text-text-tertiary transition-transform", showLegend && "rotate-180")} />
                </button>

                {showLegend && (
                    <div className="mt-4 bg-bg-secondary p-8 rounded-2xl shadow-sm border border-border animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Allergens */}
                            <div>
                                <h3 className="text-lg font-bold text-text-primary mb-4">{translations.allergensHeading}</h3>
                                <dl className="space-y-2">
                                    {Object.entries(allergenLegend).map(([code, desc]) => (
                                        <div key={code} className="flex gap-3">
                                            <dt className="font-mono font-bold text-orange-600 w-6 shrink-0">{code}</dt>
                                            <dd className="text-text-secondary text-sm">{desc}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                            {/* Additives */}
                            <div>
                                <h3 className="text-lg font-bold text-text-primary mb-4">{translations.additivesHeading}</h3>
                                <dl className="space-y-2">
                                    {Object.entries(zusatzstoffLegend).map(([code, desc]) => (
                                        <div key={code} className="flex gap-3">
                                            <dt className="font-mono font-bold text-text-secondary w-6 shrink-0">{code}</dt>
                                            <dd className="text-text-secondary text-sm">{desc}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <div className="mt-6 text-xs text-text-secondary border-t border-border pt-4 space-y-2">
                            <p><strong>Allergene:</strong> {legal_disclaimers.allergens}</p>
                            <p><strong>Kreuzkontamination:</strong> {legal_disclaimers.cross_contamination}</p>
                            <p><strong>Zusatzstoffe:</strong> {legal_disclaimers.additives}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
