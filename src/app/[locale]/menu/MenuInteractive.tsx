"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { getParam, setParam } from '@/lib/utils/url-params';
import { allergenLegend, zusatzstoffLegend, legal_disclaimers, categoryFootnotes } from '@/data/menu';
import { Info, AlertTriangle, ChevronDown, Filter, X } from 'lucide-react';
import { clsx } from 'clsx';
import { StaggerContainer } from '@/components/animations/stagger-container';
import { AdaptiveImage } from '@/components/ui/AdaptiveImage';
import { formatCurrency } from '@/lib/i18n/formatters/number';
import { AllergenBadgeList } from '@/components/cards/AllergenBadge';
import { MenuItem } from './PageClient';

const categoryImageMap: Record<string, string> = {
    'dessert': '/images/category_dessert.webp',
    'pasta': '/images/category_pasta.webp',
    'hausgemachte-pasta': '/images/category_pasta.webp',
    'pasta-al-forno': '/images/category_pasta.webp',
    'pizza': '/images/category_pizza.webp',
    'familienpizza': '/images/category_pizza.webp',
    'rotweine': '/images/category_wein.webp',
    'weissweine': '/images/category_wein.webp',
    'aperitif': '/images/category_aperitif.webp',
};

const dishImageMap: Record<string, string> = {
    '1': '/images/category_aperitif.webp',
    '2': '/images/category_aperitif.webp',
    '3': '/images/category_aperitif.webp',
    '4': '/images/category_aperitif.webp',
    '5': '/images/category_aperitif.webp',
    '6': '/images/category_aperitif.webp',
    '7': '/images/category_aperitif.webp',
    '8': '/images/category_aperitif.webp',
    '9': '/images/category_aperitif.webp',
    '10': '/images/menu/suppen/10-tagessuppe.webp',
    '11': '/images/menu/suppen/11-tomatencremesuppe.webp',
    '20': '/images/menu/vorspeisen/20-klassische-bruschetta.webp',
    '21': '/images/menu/vorspeisen/21-parmaschinken-mit-melone.webp',
    '22': '/images/menu/vorspeisen/22-burrata.webp',
    '23': '/images/menu/vorspeisen/23-kalbfleisch-mit-thunfischsauce.webp',
    '24': '/images/menu/vorspeisen/24-rindercarpaccio.webp',
    '25': '/images/menu/vorspeisen/25-gemischte-vorspeisen.webp',
    '30': '/images/menu/salate/30-gemischter-salat.webp',
    '31': '/images/menu/salate/31-italienischer-salat.webp',
    '32': '/images/menu/salate/32-italienischer-salat-klein.webp',
    '33': '/images/menu/salate/33-meeresfruechtesalat.webp',
    '34': '/images/menu/salate/34-haehnchensalat.webp',
    '35': '/images/menu/salate/35-lachs-und-garnelensalat.webp',
    '36': '/images/menu/salate/36-chef-salat.webp',
    '40': '/images/menu/pasta/40-spaghetti-bolognese.webp',
    '41': '/images/menu/pasta/41-spaghetti-carbonara.webp',
    '42': '/images/menu/pasta/42-rigatoni-apulien.webp',
    '43': '/images/menu/pasta/43-rigatoni-ratsstube.webp',
    '44': '/images/menu/pasta/44-bandnudeln-mit-gemuese.webp',
    '45': '/images/menu/pasta/45-bandnudeln-mit-lachs.webp',
    '46': '/images/menu/pasta/46-linguine-meeresfruechte.webp',
    '47': '/images/menu/pasta/47-linguine-edelfisch.webp',
    '48': '/images/menu/pasta/48-nudel-kombination.webp',
    '49': '/images/menu/pasta/49-rigatoni-mit-gemuese.webp',
    '50': '/images/menu/pasta/50-tortellini-in-sahnesauce.webp',
    '51': '/images/menu/pasta/51-tortellacci-butter-und-salbei.webp',
    '52': '/images/menu/pasta/52-tortellacci-lachs-und-garnelen.webp',
    '53': '/images/menu/pasta/53-gnocchi-mit-garnelen.webp',
    '54': '/images/menu/pasta/54-gnocchi-mit-basilikumpesto-und-burrata.webp',
    '62': '/images/menu/pasta/62-tortellini-mit-schinken-und-sahne.webp',
    '70': '/images/menu/schnitzel/70-schnitzel-wiener-art.webp',
    '71': '/images/menu/schnitzel/71-rahm-schnitzel.webp',
    '72': '/images/menu/schnitzel/72-jaeger-schnitzel.webp',
    '73': '/images/menu/schnitzel/73-pfeffer-schnitzel.webp',
    '74': '/images/menu/schnitzel/74-bauern-schnitzel.webp',
    '75': '/images/menu/schnitzel/75-schlemmer-schnitzel.webp',
    '76': '/images/menu/schnitzel/76-lindener-rucksack.webp',
    '80': '/images/menu/fleisch-fisch/80-gegrilltes-haehnchenbrustfilet.webp',
    '81': '/images/menu/fleisch-fisch/81-haehnchenbrustfilet-in-gruener-pfeffersauce.webp',
    '82': '/images/menu/fleisch-fisch/82-schweinefilet-in-weisswein-zitronensauce.webp',
    '83': '/images/menu/fleisch-fisch/83-schweinefilet-in-gruener-pfeffersauce.webp',
    '84': '/images/menu/fleisch-fisch/84-gegrilltes-rumpsteak.webp',
    '85': '/images/menu/fleisch-fisch/85-rumpsteak-in-gruener-pfeffersauce.webp',
    '86': '/images/menu/fleisch-fisch/86-doradenfilet.webp',
    '87': '/images/menu/fleisch-fisch/87-gegrilltes-lachsfilet.webp',
    '88': '/images/menu/fleisch-fisch/88-gegrillter-tintenfisch.webp',
    '90': '/images/menu/pizzen/90-pizza-margherita.webp',
    '91': '/images/menu/pizzen/91-pizza-salami-und-champignons.webp',
    '92': '/images/menu/pizzen/92-pizza-regina.webp',
    '93': '/images/menu/pizzen/93-pizza-toscana.webp',
    '94': '/images/menu/pizzen/94-pizza-ratsstuben.webp',
    '95': '/images/menu/pizzen/95-pizza-hawaii.webp',
    '96': '/images/menu/pizzen/96-pizza-diavolo.webp',
    '97': '/images/menu/pizzen/97-pizza-parmaschinken-und-rucola.webp',
    '98': '/images/menu/pizzen/98-pizza-amore-mio.webp',
    '99': '/images/menu/pizzen/99-pizza-thunfisch.webp',
    '100': '/images/menu/pizzen/100-pizza-burrata-und-rucola.webp',
    '101': '/images/menu/pizzen/101-pizza-meeresfruechte.webp',
    '102': '/images/menu/pizzen/102-pizza-lachs-und-garnelen.webp',
    '103': '/images/menu/pizzen/103-pizza-deluxe.webp',
    '105': '/images/menu/pizzen/105-pizza-vegetarisch.webp',
    '106': '/images/menu/pizzen/106-pizzabrot.webp',
    '110': '/images/menu/pizzen/110-familienpizza-margherita.webp',
    '111': '/images/menu/pizzen/111-familienpizza-regina.webp',
    '112': '/images/menu/pizzen/112-familienpizza-toskana.webp',
    '113': '/images/menu/pizzen/113-familienpizza-thunfisch.webp',
    '114': '/images/menu/pizzen/114-familienpizza-parmaschinken-und-rucola.webp',
    '115': '/images/menu/pizzen/115-familienpizza-vegetarisch.webp',
    '120': '/images/menu/kindergerichte/120-chicken-nuggets.webp',
    '121': '/images/menu/kindergerichte/121-rigatoni-mit-butter.webp',
    '122': '/images/menu/kindergerichte/122-spaghetti-bolognese.webp',
    '123': '/images/menu/kindergerichte/123-kleine-schnitzel-wiener-art.webp',
    '130': '/images/menu/dessert/130-tiramisu.webp',
    '131': '/images/menu/dessert/131-panna-cotta.webp',
    '132': '/images/menu/dessert/132-schokoladen-trueffeleis.webp',
    '133': '/images/menu/dessert/133-sizilianische-eisspezialitaet.webp',
    '134': '/images/menu/dessert/134-bourbon-vanilleeis.webp',
};

const FALLBACK_IMAGE = '/images/placeholder.svg';

interface MenuInteractiveProps {
    categories: { id: string; name: string; label: string; description?: string; headerText?: string }[];
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
    const [showFilter, setShowFilter] = useState(false);
    const [excludedAllergens, setExcludedAllergens] = useState<string[]>([]);

    const setActiveCategory = useCallback((categoryId: string) => {
        setParam('category', categoryId, router, pathname, searchParams);
    }, [router, pathname, searchParams]);

    const filteredItems = useMemo(() => {
        return menuItems.filter(item => {
            if (item.category !== activeCategory) return false;
            if (excludedAllergens.length > 0 && item.allergens) {
                if (item.allergens.some(a => excludedAllergens.includes(a))) {
                    return false;
                }
            }
            return true;
        });
    }, [activeCategory, menuItems, excludedAllergens]);

    const currentCategoryObj = categories.find(c => c.id === activeCategory);
    const currentNote = currentCategoryObj?.description || categoryFootnotes[activeCategory] || undefined;
    const locale = pathname.split('/')[1] || 'de';

    return (
        <>
            {/* Category Navigation */}
            <div className="sticky top-[72px] lg:top-[88px] z-[90] -mx-4 px-4 py-4 sm:mx-0 sm:px-0 sm:py-0 sm:relative sm:top-0 sm:z-10 mb-12 bg-onyx-deep/95 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border-b border-white/10 sm:border-none shadow-md sm:shadow-none transition-all duration-300">
                <nav aria-label={translations.categoriesLabel} className="overflow-x-auto pb-2 sm:pb-4 scrollbar-hide relative z-10">
                    <ul className="flex gap-3 md:justify-center min-w-max m-0 p-0 list-none">
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
                <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-onyx-deep to-transparent pointer-events-none md:hidden z-20" aria-hidden="true" />
            </div>

            {/* Category Note / Footnote */}
            {currentNote && (
                <div className={clsx(
                    "mb-8 text-center bg-bg-primary/80 px-6 py-3 rounded-xl max-w-3xl mx-auto border border-border whitespace-pre-wrap",
                    currentNote.includes('Extrabelege') ? "text-base md:text-lg text-text-primary font-medium" : "text-sm text-text-secondary"
                )}>
                    <Info className="w-4 h-4 inline-block me-2 -mt-0.5" aria-hidden="true" />
                    {currentNote.split(/(\*\*.*?\*\*)/).map((part, j) => 
                        part.startsWith('**') && part.endsWith('**') ? 
                        <strong key={j}>{part.slice(2, -2)}</strong> : part
                    )}
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

            {/* Allergen Filter */}
            <div className="mb-8 max-w-4xl mx-auto">
                <button 
                    onClick={() => setShowFilter(!showFilter)}
                    aria-expanded={showFilter}
                    className="flex items-center gap-2 text-sm font-bold text-text-secondary hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg px-2 py-1"
                >
                    <Filter className="w-4 h-4" aria-hidden="true" /> Allergiefilter
                    {excludedAllergens.length > 0 && (
                        <span className="bg-primary text-surface text-xs px-1.5 py-0.5 rounded-full ml-1">
                            {excludedAllergens.length} aktiv
                        </span>
                    )}
                </button>
                {showFilter && (
                    <div className="mt-4 p-5 bg-surface border border-border rounded-xl shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
                        <p className="text-sm text-text-secondary mb-3">Tippen Sie auf Allergene, die Sie <strong>ausschließen</strong> möchten:</p>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(allergenLegend).map(([code, name]) => {
                                const isExcluded = excludedAllergens.includes(code);
                                return (
                                    <button
                                        key={code}
                                        onClick={() => {
                                            if (isExcluded) {
                                                setExcludedAllergens(prev => prev.filter(c => c !== code));
                                            } else {
                                                setExcludedAllergens(prev => [...prev, code]);
                                            }
                                        }}
                                        className={clsx(
                                            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border",
                                            isExcluded 
                                                ? "bg-red-500/10 border-red-500/50 text-red-500 shadow-sm" 
                                                : "bg-bg-secondary border-border text-text-secondary hover:border-text-tertiary hover:bg-bg-tertiary"
                                        )}
                                        title={name}
                                        aria-pressed={isExcluded}
                                    >
                                        <span className="font-mono">{code}</span>
                                        <span className="hidden sm:inline font-normal opacity-80">{name}</span>
                                        {isExcluded && <X className="w-3 h-3 ml-0.5" />}
                                    </button>
                                );
                            })}
                        </div>
                        {excludedAllergens.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-border flex justify-end">
                                <button
                                    onClick={() => setExcludedAllergens([])}
                                    className="px-4 py-2 rounded-lg text-sm font-bold text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
                                >
                                    Filter zurücksetzen
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Menu Grid */}
            <h2 className="sr-only">{translations.dishesHeading}</h2>
            <StaggerContainer as="ul" role="list" key={activeCategory} className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-6 m-0 p-0 list-none">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, idx) => {
                        const itemId = item.id || `menu-item-${item.nr}-${idx}`;
                        const titleId = `title-${itemId}`;
                        const descId = `desc-${itemId}`;
                        return (
                            <li key={itemId} className="list-none">
                                <article itemScope itemType="https://schema.org/MenuItem" aria-labelledby={titleId} aria-describedby={item.description ? descId : undefined} className="p-4 sm:p-6 bg-surface rounded-2xl border border-border/50 hover:border-accent/40 shadow-sm hover:shadow-md transition-all relative group flex gap-4 sm:gap-6">
                                    <div className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-xl overflow-hidden relative border border-border/50 bg-bg-secondary" aria-hidden="true">
                                        <AdaptiveImage
                                            src={dishImageMap[item.nr] || FALLBACK_IMAGE}
                                            alt={item.name}
                                            fill
                                            itemProp="image"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 640px) 5rem, (max-width: 768px) 6rem, 7rem"
                                        />
                                    </div>
                                    <div className="flex-grow min-w-0 flex flex-col justify-center">
                                        <div className="flex justify-between items-start sm:items-baseline mb-2 gap-3 flex-col sm:flex-row">
                                            <h3 id={titleId} itemProp="name" className="text-lg sm:text-xl font-display font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">
                                                {item.nr && <span className="text-text-tertiary font-mono text-sm sm:text-base me-2" aria-hidden="true">{item.nr}.</span>}
                                                {item.name}
                                            </h3>
                                            <div className="flex-grow border-b-2 border-dotted border-border/40 relative -top-1.5 hidden sm:block" aria-hidden="true" />
                                            <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="text-lg sm:text-xl font-display font-bold text-text-primary whitespace-nowrap self-start sm:self-auto">
                                                {item.price !== null ? (
                                                    <>
                                                        <span itemProp="price" content={item.price.toString()}>{formatCurrency(item.price, locale)}</span>
                                                        <meta itemProp="priceCurrency" content="EUR" />
                                                        <link itemProp="availability" href="https://schema.org/InStock" />
                                                    </>
                                                ) : (
                                                    <span className="text-text-tertiary text-base italic">{translations.priceOnRequest}</span>
                                                )}
                                            </div>
                                        </div>

                                        {item.description && (
                                            <p id={descId} itemProp="description" className="text-text-secondary font-body text-sm sm:text-base leading-relaxed max-w-xl">
                                                {item.description}
                                            </p>
                                        )}
                                        
                                        {/* Allergens Display */}
                                        {item.allergens && item.allergens.length > 0 && (
                                            <div className="mt-3">
                                                <AllergenBadgeList codes={item.allergens} size="sm" />
                                            </div>
                                        )}
                                    </div>
                                </article>
                            </li>
                        );
                    })
                ) : (
                    <li className="col-span-full text-center py-32 bg-bg-secondary rounded-2xl border border-dashed border-border">
                        <Info className="w-12 h-12 text-text-tertiary mx-auto mb-4" aria-hidden="true" />
                        <p className="text-text-secondary text-lg font-medium">{translations.noResults}</p>
                    </li>
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
