import React from 'react';
import { AdaptiveImage as Image } from '@/components/ui/AdaptiveImage';
import Link from 'next/link';
import { ArrowRight, Clock, Phone, Mail, Leaf, Star, ChefHat, MapPin } from 'lucide-react';
import { getCompanyData } from '@/data/company';
import dynamic from 'next/dynamic';
import { AnimateIn } from '@/components/animations/animate-in';
import { StaggerContainer } from '@/components/animations/stagger-container';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';

// Dynamic Imports for below-the-fold & heavy interactive components
const AnimatedCounter = dynamic(() => import('@/components/interactive/AnimatedCounter').then(mod => mod.AnimatedCounter));
const ServiceMarquee = dynamic(() => import('@/components/ui/ServiceMarquee').then(mod => mod.ServiceMarquee));
const CtaBand = dynamic(() => import('@/components/layout/CtaBand').then(mod => mod.CtaBand));
import { TranslationKey } from '@/lib/i18n/types';
import { HeroRoot } from '@/components/hero/HeroRoot';
import { ClientTestimonials } from '@/components/interactive/ClientTestimonials';
import { MapFacade } from '@/components/ui/MapFacade';

export interface HomeProps {
    locale: string;
}

export const Home = async ({ locale }: HomeProps) => {
    const t = await getTranslations(locale as LocaleType, 'home');
    const tCommon = await getTranslations(locale as LocaleType, 'common');
    const companyData = getCompanyData();

    const formatTime = (timeRange: { start: string, end: string }) => {
        const parseTime = (tStr: string) => {
            const [h, m] = tStr.split(':');
            const d = new Date();
            d.setHours(parseInt(h, 10), parseInt(m, 10), 0, 0);
            return d;
        };
        const timeFmt = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' });
        const startFmt = timeFmt.format(parseTime(timeRange.start));
        const endFmt = timeFmt.format(parseTime(timeRange.end));
        return tCommon('opening_hours.time_range', { start: startFmt, end: endFmt }) as string;
    };

    const highlights = [
        { name: 'Gegrilltes Rumpsteak', price: '€29.90', desc: 'Argentinisches Rumpsteak vom Lava-Grill | Kräuterbutter | Marktgemüse', image: '/images/editorial/rumpsteak.webp' },
        { name: 'Pizza Ratsstuben', price: '€14.50', desc: 'Salami | Peperoniwurst | Vorderschinken | Ei | Champignons | Zwiebeln', image: '/images/editorial/pizza.webp' },
        { name: 'Tortellacci mit Butter und Salbei', price: '€17.90', desc: 'Hausgemacht | Ricotta | Spinat | Kirschtomaten | Grana Padano', image: '/images/editorial/pasta.webp' },
        { name: 'Lachs- und Garnelensalat', price: '€17.90', desc: 'Frisches Lachsfilet | Garnelen | Balsamico-Kräuter-Vinaigrette', image: '/images/editorial/scampi.webp' },
    ];

    return (
        <article itemProp="mainContentOfPage" itemScope itemType="https://schema.org/AboutPage">
            

            {/* Modular Epic Cinematic Hero Section - 10x Redesign */}
            <HeroRoot />

            {/* Welcome / Philosophy Section */}
            <section aria-labelledby="philosophy-title" className="py-24 md:py-32 lg:py-48 bg-onyx-deep">
                <div className="container mx-auto px-4 max-w-7xl bg-onyx-deep">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center bg-onyx-deep">
                        <AnimateIn direction="up">
                            <div className="space-y-8 bg-onyx-deep">
                                <span className="text-accent font-bold uppercase tracking-wider text-sm" aria-hidden="true">{t('philosophy.label') as string}</span>
                                <h2 id="philosophy-title" className="text-4xl md:text-5xl font-display font-bold text-stone-600 leading-tight text-balance">
                                    {t('philosophy.title') as string}
                                </h2>
                                <p className="text-stone-700 text-lg leading-relaxed max-w-prose">
                                    {(t('philosophy.description') as string).replace('{name}', companyData.companyName) || `Bei ${companyData.companyName} glauben wir, dass jedes Gericht eine Geschichte erzählt.`}
                                </p>
                                <div className="grid grid-cols-2 gap-8 pt-4">
                                    <section className="flex flex-col gap-2">
                                        <ChefHat className="w-8 h-8 text-accent-text" aria-hidden="true" />
                                        <h3 className="font-bold text-stone-600">{t('philosophy.master_chefs') as string}</h3>
                                        <p className="text-sm text-stone-700">{t('philosophy.master_chefs_desc') as string}</p>
                                    </section>
                                    <section className="flex flex-col gap-2">
                                        <Leaf className="w-8 h-8 text-accent-text" aria-hidden="true" />
                                        <h3 className="font-bold text-stone-600">{t('philosophy.fresh_ingredients') as string}</h3>
                                        <p className="text-sm text-stone-700">{t('philosophy.fresh_ingredients_desc') as string}</p>
                                    </section>
                                </div>
                                <div className="pt-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                    <Link 
                                        href="/menu" 
                                        className="interaction-bounce px-8 py-4 bg-accent text-onyx-deep font-bold rounded-lg shadow-[0_0_20px_rgba(var(--color-accent),0.3)] hover:shadow-[0_0_30px_rgba(var(--color-accent),0.5)] transition-all flex items-center gap-2"
                                    >
                                        {t('hero.cta_menu') as string} <ArrowRight className="w-5 h-5" />
                                    </Link>
                                    <Link href="/about" className="text-accent-text font-bold hover:text-white flex items-center gap-2 group transition-colors inline-flex">
                                        {t('philosophy.learn_more') || 'Mehr über die Ratsstuben erfahren'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </AnimateIn>
                        <AnimateIn direction="left" delay={200}>
                            <div className="relative">
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-warm transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-liquid">
                                    <Image
                                        src="/images/editorial/kitchen_heritage.webp"
                                        alt="Chef cooking"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-10 -start-10 bg-onyx-light/90 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-warm max-w-xs hidden md:block">
                                    <p className="font-hand text-2xl text-white mb-2">&quot;{t('philosophy.quote') as string}&quot;</p>
                                    <p className="text-sm font-bold text-accent-text">- {t('philosophy.quote_author') as string}</p>
                                </div>
                            </div>
                        </AnimateIn>
                    </div>
                </div>
            </section>

            {/* Services */}
            <ServiceMarquee />

            {/* Highlights Grid */}
            <section aria-labelledby="highlights-title" className="py-24 md:py-32 lg:py-48 bg-onyx-light">
                <div className="container mx-auto px-4 max-w-7xl">
                    <AnimateIn className="text-center mb-20">
                        <span className="text-accent font-bold uppercase tracking-wider text-sm" aria-hidden="true">{t('highlights.label') as string}</span>
                        <h2 id="highlights-title" className="text-4xl md:text-5xl font-display font-bold text-white mt-3 text-balance">{t('highlights.title') as string}</h2>
                    </AnimateIn>

                    <StaggerContainer as="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" itemScope itemType="https://schema.org/ItemList">
                        {highlights.slice(0, 4).map((dish, index) => (
                            <div
                                key={index}
                                itemProp="itemListElement"
                                itemScope
                                itemType="https://schema.org/MenuItem"
                                className="group card-lift bg-onyx-muted/50 border border-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-warm"
                            >
                                <meta itemProp="position" content={(index + 1).toString()} />
                                <div className="relative h-72 overflow-hidden">
                                    <Image
                                        src={dish.image}
                                        alt={dish.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-liquid"
                                    />
                                    <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="absolute top-4 end-4 bg-onyx-deep/90 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-sm font-bold text-white shadow-sm">
                                        <span itemProp="price" content={dish.price.replace('€', '').trim()}>{dish.price}</span>
                                        <meta itemProp="priceCurrency" content="EUR" />
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 itemProp="name" className="text-xl font-bold text-white mb-2 group-hover:text-accent-text transition-colors">{dish.name}</h3>
                                    <p itemProp="description" className="text-stone-300 text-sm mb-6 line-clamp-2">{dish.desc}</p>
                                    <Link
                                        href="/menu"
                                        className="text-accent-text font-semibold text-sm uppercase tracking-wide flex items-center gap-2 group-hover:gap-3 transition-all duration-500 ease-liquid inline-block mt-2"
                                    >
                                        {t('highlights.details') as string} <ArrowRight className="w-4 h-4 inline" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </StaggerContainer>

                    <AnimateIn className="text-center mt-16" delay={300}>
                        <Link
                            href="/menu"
                            className="interaction-bounce inline-block px-10 py-4 border border-white/20 text-white font-bold rounded-lg hover:bg-white hover:text-onyx-deep uppercase tracking-wider transition-colors"
                        >
                            {t('highlights.view_menu') as string}
                        </Link>
                    </AnimateIn>
                </div>
            </section>

            {/* Stats Section with Animated Counters */}
            <section aria-labelledby="stats-title" className="py-24 md:py-32 lg:py-40 bg-onyx-deep border-y border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                <div className="container mx-auto px-4 relative z-10">
                    <h2 id="stats-title" className="sr-only">{t('stats.title') as string}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10 text-white">
                        <div className="flex flex-col items-center justify-center p-4">
                            <AnimatedCounter target={25} label={t('counter.years') as string} suffix="+" />
                        </div>
                        <div className="flex flex-col items-center justify-center p-4">
                            <AnimatedCounter target={48} label={t('counter.dishes') as string} suffix="+" />
                        </div>
                        <div className="flex flex-col items-center justify-center p-4">
                            <AnimatedCounter target={100} label={t('counter.vegetarian') as string} suffix="%" />
                        </div>
                        <div className="flex flex-col items-center justify-center p-4">
                            <AnimatedCounter target={4} label={t('counter.google_stars') as string} suffix=".8" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Conversion CTA Band */}
            <CtaBand 
                headline={t('cta.headline') as string} 
                subheadline={t('cta.subheadline') as string} 
            />

            {/* Testimonials Section */}
            <section aria-labelledby="testimonials-title" className="py-24 md:py-32 lg:py-48 bg-onyx-deep">
                <div className="container mx-auto px-4 max-w-7xl">
                    <AnimateIn className="text-center mb-20">
                        <span className="text-accent font-bold uppercase tracking-wider text-sm" aria-hidden="true">{t('testimonials.label') as string}</span>
                        <h2 id="testimonials-title" className="text-4xl md:text-5xl font-display font-bold text-stone-600 mt-3 text-balance">{t('testimonials.title') as string}</h2>
                        <div className="flex justify-center items-center gap-2 mt-4">
                            <span className="font-bold text-lg text-stone-600">4.8</span>
                            <div className="flex text-accent-text">
                                {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i === 4 ? 'fill-current opacity-50' : 'fill-current'}`} />)}
                            </div>
                            <span className="text-sm text-stone-700 ms-2">{t('testimonials.from_reviews') as string}</span>
                        </div>
                    </AnimateIn>

                    <ClientTestimonials />
                </div>
            </section>

            {/* Info & Location (Premium Layout) */}
            <section aria-labelledby="info-location-title" className="py-24 md:py-32 lg:py-48 bg-onyx-deep text-white relative overflow-hidden">
                <h2 id="info-location-title" className="sr-only">{t('info.visit_title') as string}</h2>
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Hours */}
                        <AnimateIn className="lg:col-span-1 bg-onyx-light/80 backdrop-blur-md p-10 rounded-2xl border border-white/10">
                            <div className="w-12 h-12 bg-accent-text/10 rounded-full flex items-center justify-center mb-6 text-accent-text">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-display font-bold mb-6 text-white">{t('info.hours_title') as string}</h3>
                            <ul className="space-y-4 text-stone-100">
                                <li className="flex justify-between border-b border-white/10 pb-3">
                                    <span>{tCommon(companyData.openingHours.ruhetag.tagKey as TranslationKey)}</span>
                                    <span className="font-mono text-white">{tCommon('footer.closed') as string}</span>
                                </li>
                                <li className="border-b border-white/10 pb-3">
                                    <div className="flex justify-between mb-1">
                                        <span>{tCommon(companyData.openingHours.regulaer.tageKey as TranslationKey)}</span>
                                        <span className="font-mono text-white text-sm">{t('info.lunch_dinner') as string}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-200">{t('info.lunch') as string}</span>
                                        <span className="font-mono text-white">{formatTime(companyData.openingHours.regulaer.mittags)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-stone-200">{t('info.dinner') as string}</span>
                                        <span className="font-mono text-white">{formatTime(companyData.openingHours.regulaer.abends)}</span>
                                    </div>
                                </li>
                            </ul>
                        </AnimateIn>

                        {/* Contact & Map */}
                        <AnimateIn delay={150} className="lg:col-span-2 space-y-8">
                            <address className="flex flex-col md:flex-row gap-8 not-italic">
                                <div className="flex-1 bg-onyx-light/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-accent-text/50 hover:shadow-glow transition-all">
                                    <MapPin className="w-8 h-8 text-accent-text mb-4" aria-hidden="true" />
                                    <h3 className="font-bold text-lg mb-2 text-white">{t('info.address_title') as string}</h3>
                                    <p className="text-stone-100">{companyData.address.street}<br />{companyData.address.zip} {companyData.address.city}</p>
                                </div>
                                <div className="flex-1 bg-onyx-light/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-accent-text/50 hover:shadow-glow transition-all">
                                    <Phone className="w-8 h-8 text-accent-text mb-4" aria-hidden="true" />
                                    <h3 className="font-bold text-lg mb-2 text-white">{t('info.phone_title') as string}</h3>
                                    <p className="text-stone-100"><a href={`tel:${companyData.phone}`} className="hover:text-accent-text transition-colors">{companyData.displayPhone}</a></p>
                                </div>
                                <div className="flex-1 bg-onyx-light/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:border-accent-text/50 hover:shadow-glow transition-all">
                                    <Mail className="w-8 h-8 text-accent-text mb-4" aria-hidden="true" />
                                    <h3 className="font-bold text-lg mb-2 text-white">{t('info.email_title') as string}</h3>
                                    <p className="text-stone-100"><a href={`mailto:${companyData.email}`} className="hover:text-accent-text transition-colors">{companyData.email}</a></p>
                                </div>
                            </address>

                            <div className="h-[400px] bg-neutral-200 rounded-2xl overflow-hidden border border-black/10 shadow-soft relative group">
                                <MapFacade 
                                    address={`${companyData.address.street}, ${companyData.address.zip} ${companyData.address.city}`}
                                    mapQuery={`${companyData.address.street}, ${companyData.address.zip} ${companyData.address.city}`}
                                />
                                <div className="absolute bottom-6 end-6">
                                    <Link
                                        href="/contact"
                                        className="interaction-bounce px-6 py-3 bg-accent-text text-onyx-deep font-bold rounded-lg hover:bg-white shadow-sm inline-block transition-colors"
                                    >
                                        {t('info.plan_route') as string}
                                    </Link>
                                </div>
                            </div>
                        </AnimateIn>
                    </div>
                </div>
            </section>
        </article>
    );
};


export default Home;
