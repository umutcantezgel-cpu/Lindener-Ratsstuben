"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { getParam, setParam } from '@/lib/utils/url-params';
import { allergenLegend, zusatzstoffLegend, allergenHinweis } from '@/data/menu';
import { Filter, Leaf, Flame, Info, AlertTriangle, ChevronDown, Download } from 'lucide-react';
import { clsx } from 'clsx';
import { StaggerContainer } from '@/components/animations/stagger-container';
import { useTranslation } from '@/lib/i18n/use-translation';

export interface MenuItem {
    id: string;
    nr: string;
    name: string;
    description: string;
    price: number;
    category: string;
    categorySlug?: string;
    allergens: string[];
    zusatzstoffe: string[];
    tags: string[];
    spiceLevel: number;
    isBestseller: boolean;
    isVegetarian: boolean;
    isVegan: boolean;
    imageUrl?: string;
}

export interface PageClientProps {
    categories: { id: string; name: string; label: string; description?: string }[];
    menuItems: MenuItem[];
}

export const Menu = ({ categories, menuItems }: PageClientProps) => {
    const { t } = useTranslation('pages');
    const { t: tCommon } = useTranslation('common');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Use URL params instead of purely local state for single source of truth
    const urlCategory = getParam('category', searchParams);
    const activeCategory = urlCategory || 'suppen';
    
    // We can also sync filters in URL later, but for now we keep arrays in state or join as comma-separated string 
    const urlFilters = getParam('filters', searchParams);
    const activeFilters = useMemo(() => urlFilters ? urlFilters.split(',') : [], [urlFilters]);

    const [showLegend, setShowLegend] = useState(false);

    const filters = [
        { id: 'vegetarian', label: t('menu.vegetarian') as string, icon: Leaf },
        { id: 'spicy', label: t('menu.spicy') as string, icon: Flame },
        { id: 'bestseller', label: t('menu.bestseller') as string, icon: null },
    ];

    const setActiveCategory = useCallback((categoryId: string) => {
        setParam('category', categoryId, router, pathname, searchParams);
    }, [router, pathname, searchParams]);

    const toggleFilter = useCallback((filterId: string) => {
        const currentFilters = activeFilters;
        const newFilters = currentFilters.includes(filterId)
            ? currentFilters.filter(f => f !== filterId)
            : [...currentFilters, filterId];
            
        setParam('filters', newFilters.length > 0 ? newFilters.join(',') : null, router, pathname, searchParams);
    }, [activeFilters, router, pathname, searchParams]);

    const filteredItems = useMemo(() => {
        let items = menuItems.filter(item => item.category === activeCategory);

        if (activeFilters.length > 0) {
            items = items.filter(item => {
                if (activeFilters.includes('spicy') && item.spiceLevel === 0) return false;
                const otherFilters = activeFilters.filter(f => f !== 'spicy');
                if (otherFilters.length === 0) return true;
                return otherFilters.every(filter => item.tags.includes(filter));
            });
        }
        return items;
    }, [activeCategory, activeFilters, menuItems]);

    const currentCategoryObj = categories.find(c => c.id === activeCategory);
    const currentNote = currentCategoryObj?.description;

    return (
        <>
            
            <article className="pt-32 pb-20 min-h-screen bg-bg-secondary" itemProp="mainContentOfPage">
                <div className="container mx-auto px-4">
                    <header className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="text-accent font-bold uppercase tracking-wider text-sm" aria-hidden="true">{t('menu.subtitle') as string}</span>
                        <h1 className="text-5xl font-display font-bold text-text-primary mt-2 mb-6">{t('menu.title') as string}</h1>
                        <p className="text-text-secondary max-w-2xl mx-auto text-lg leading-relaxed mb-6">
                            {t('menu.description') as string}
                        </p>
                        <a href={`/${pathname.split('/')[1] || 'de'}/menu/print`} target="_blank" rel="noopener noreferrer" className="interaction-bounce px-8 py-3 bg-surface border-2 border-accent text-accent font-bold rounded-lg hover:bg-accent hover:text-neutral-950 transition-colors shadow-sm inline-flex items-center gap-2 uppercase tracking-wide">
                            <Download className="w-5 h-5" />
                            {t('menu.download_pdf') || 'Speisekarte als PDF / Drucken'}
                        </a>
                    </header>

                    {/* Category Navigation */}
                    <nav aria-label={t('menu.categories_label') as string} className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
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

                    {/* Category Note */}
                    {currentNote && (
                        <div className="mb-8 text-center text-text-secondary text-sm bg-bg-primary/80 px-6 py-3 rounded-xl max-w-3xl mx-auto border border-border">
                            <Info className="w-4 h-4 inline-block me-2 -mt-0.5" aria-hidden="true" />
                            {currentNote}
                        </div>
                    )}

                    {/* Filters */}
                    <section aria-labelledby="filter-heading" className="mb-12 flex flex-wrap gap-3 justify-center items-center bg-bg-secondary p-4 rounded-2xl shadow-sm max-w-4xl mx-auto">
                        <h2 id="filter-heading" className="sr-only">{t('menu.filter') as string}</h2>
                        <div className="flex items-center gap-2 text-text-secondary me-4" aria-hidden="true">
                            <Filter className="w-4 h-4" />
                            <span className="text-sm font-bold uppercase tracking-wide">{t('menu.filter') as string}</span>
                        </div>
                        <ul className="flex flex-wrap gap-3 m-0 p-0 list-none">
                            {filters.map(filter => (
                                <li key={filter.id}>
                                    <button
                                        onClick={() => toggleFilter(filter.id)}
                                        aria-pressed={activeFilters.includes(filter.id)}
                                        className={clsx(
                                            "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 border focus:outline-none focus-visible:ring-4 focus-visible:ring-primary",
                                            activeFilters.includes(filter.id)
                                                ? "bg-accent/10 border-accent text-accent-dark"
                                                : "bg-transparent border-border text-text-secondary hover:border-accent hover:text-accent"
                                        )}
                                    >
                                        {filter.icon && <filter.icon className="w-4 h-4" aria-hidden="true" />}
                                        {filter.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Menu Grid */}
                    <h2 className="sr-only">{t('menu.dishes_heading') as string}</h2>
                    <StaggerContainer as="ul" key={activeCategory + activeFilters.join()} className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 m-0 p-0 list-none">
                        {filteredItems.length > 0 ? (
                            filteredItems.map(item => (
                                <li key={item.id} className="py-6 border-b border-border/60 last:border-0 relative group">
                                    <div className="flex justify-between items-baseline mb-2 gap-4">
                                        <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-primary transition-colors">
                                            <span className="text-text-tertiary font-mono text-sm me-2">{item.nr}.</span>
                                            {item.name}
                                        </h3>
                                        <div className="flex-grow border-b-2 border-dotted border-border/40 relative -top-1.5 hidden md:block" aria-hidden="true" />
                                        <span className="text-xl font-display font-bold text-text-primary whitespace-nowrap">
                                            € {item.price.toFixed(2)}
                                        </span>
                                    </div>

                                    <p className="text-text-secondary font-body text-base lg:text-lg mb-3 max-w-2xl">
                                        {item.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-3 mt-2">
                                        {item.tags.includes('bestseller') && (
                                            <span className="text-xs font-bold uppercase tracking-wider text-primary">★ Bestseller</span>
                                        )}
                                        {item.tags.includes('chef-recommendation') && (
                                            <span className="text-xs font-bold uppercase tracking-wider text-accent-hover">✦ {tCommon('menu.recommendation') as string}</span>
                                        )}
                                        {item.tags.includes('vegetarian') && (
                                            <span className="inline-flex items-center gap-1 text-success text-xs font-bold uppercase tracking-wider">
                                                <Leaf className="w-3 h-3" /> Veg
                                            </span>
                                        )}
                                        {item.tags.includes('spicy') && (
                                            <span className="inline-flex items-center gap-1 text-warning text-xs font-bold uppercase tracking-wider">
                                                <Flame className="w-3 h-3" /> {tCommon('menu.spicy') as string}
                                            </span>
                                        )}
                                        {item.allergens.length > 0 && (
                                            <span className="text-text-tertiary text-xs font-mono" title={`Allergene: ${item.allergens.join(', ')}`}>
                                                [{item.allergens.join(', ')}]
                                            </span>
                                        )}
                                        {item.zusatzstoffe && item.zusatzstoffe.length > 0 && (
                                            <span className="text-text-tertiary text-xs font-mono" title={`Zusatzstoffe: ${item.zusatzstoffe.join(', ')}`}>
                                                ({item.zusatzstoffe.join(', ')})
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="col-span-full text-center py-32 bg-bg-secondary rounded-2xl border border-dashed border-border">
                                <Info className="w-12 h-12 text-text-tertiary mx-auto mb-4" aria-hidden="true" />
                                <p className="text-text-secondary text-lg font-medium">{t('menu.no_results') as string}</p>
                                <button
                                    onClick={() => setParam('filters', null, router, pathname, searchParams)}
                                    className="mt-6 px-6 py-2 bg-surface border border-border text-text-primary font-bold rounded-lg hover:bg-border/50 transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary"
                                >
                                    {tCommon('menu.reset_filters') as string}
                                </button>
                            </li>
                        )}
                    </StaggerContainer>

                    {/* Allergen & Additive Legend */}
                    <div className="mt-16 max-w-4xl mx-auto">
                        <h2 className="sr-only">{t('menu.legend_heading') as string}</h2>
                        <button
                            onClick={() => setShowLegend(!showLegend)}
                            className="w-full flex items-center justify-between bg-bg-secondary p-5 rounded-2xl shadow-sm border border-border hover:bg-surface transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-primary"
                        >
                            <span className="flex items-center gap-2 text-text-primary font-bold">
                                <AlertTriangle className="w-5 h-5 text-orange-500" aria-hidden="true" />
                                {t('menu.legend_title') as string}
                            </span>
                            <ChevronDown className={clsx("w-5 h-5 text-text-tertiary transition-transform", showLegend && "rotate-180")} />
                        </button>

                        {showLegend && (
                            <div className="mt-4 bg-bg-secondary p-8 rounded-2xl shadow-sm border border-border animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Allergens */}
                                    <div>
                                        <h3 className="text-lg font-bold text-text-primary mb-4">{t('menu.allergens_heading') as string}</h3>
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
                                        <h3 className="text-lg font-bold text-text-primary mb-4">{t('menu.additives_heading') as string}</h3>
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
                                <p className="mt-6 text-xs text-text-secondary border-t border-border pt-4">
                                    {allergenHinweis}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Booking CTA */}
                    <div className="mt-20 text-center">
                        <p className="text-text-secondary text-lg mb-6">{t('menu.reservation_prompt') || 'Appetit bekommen? Sichern Sie sich jetzt Ihren Tisch.'}</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href={`/${pathname.split('/')[1] || 'de'}/reservation`} className="interaction-bounce px-10 py-4 bg-accent text-neutral-950 font-bold rounded-lg hover:bg-accent-hover shadow-warm flex items-center justify-center gap-2 uppercase tracking-wider w-full sm:w-auto">
                                {t('menu.reservation_cta') || 'Jetzt Tisch reservieren'}
                            </a>
                            <a href={`/${pathname.split('/')[1] || 'de'}/menu/print`} target="_blank" rel="noopener noreferrer" className="interaction-bounce px-10 py-4 bg-surface border-2 border-accent text-accent font-bold rounded-lg hover:bg-accent hover:text-neutral-950 transition-colors flex items-center justify-center gap-2 uppercase tracking-wider w-full sm:w-auto">
                                <Download className="w-5 h-5" />
                                {t('menu.download_pdf') || 'Drucken / Als PDF'}
                            </a>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
};

export default Menu;
