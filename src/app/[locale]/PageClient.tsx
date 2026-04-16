"use client";
import React from 'react';
import Image from '@/components/ui/ImagePlaceholder';

import Link from 'next/link';
import { ArrowRight, Clock, Phone, Mail, Leaf, Star, ChefHat, MapPin } from 'lucide-react';
import { companyData } from '@/data/company';
import { getTestimonialsBySegment } from '@/data/testimonials';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { AnimatedCounter } from '@/components/interactive/AnimatedCounter';
import { AnimateIn } from '@/components/animations/animate-in';
import { StaggerContainer } from '@/components/animations/stagger-container';
import { ClientLogoMarquee } from '@/components/ui/ClientLogoMarquee';
import { CtaBand } from '@/components/layout/CtaBand';
import { useTranslation } from '@/lib/i18n/use-translation';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';

export interface HomeProps {
    mainMenuPdfUrl?: string;
}

export const Home = ({ mainMenuPdfUrl }: HomeProps) => {
    const { t } = useTranslation('home');
    const { hero, heroVariant } = useAdaptiveMessaging();

    const highlights = [
        { name: 'Butter Chicken', price: '€13.90', desc: 'Gegrilltes Tandoori-Hähnchen in cremiger Tomaten-Butter-Sauce', image: 'https://placehold.co/600x400' },
        { name: 'Lamb Biryani', price: '€15.50', desc: 'Basmati-Reis mit zartem Lammfleisch, Safran und Gewürzen', image: 'https://placehold.co/600x400' },
        { name: 'Tandoori Mix', price: '€24.90', desc: 'Große Platte mit verschiedenen Tandoori-Spezialitäten', image: 'https://placehold.co/600x400' },
        { name: 'Palak Paneer', price: '€11.90', desc: 'Hausgemachter Käse in würzigem Spinat', image: 'https://placehold.co/600x400' },
    ];

    return (
        <article itemProp="mainContentOfPage" itemScope itemType="https://schema.org/AboutPage">
            

            {/* Hero Section */}
            <section aria-labelledby="hero-title" className="relative h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                    >
                        <source src="" type="video/mp4" />
                        {/* LCP-Element: Hero Image (Fallback for video) */}
                        <Image 
                            src={hero.imageUrl}
                            alt="Hero Background" 
                            fill 
                            priority={true}
                            sizes="100vw"
                            className="object-cover" 
                        />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
                </div>

                <StaggerContainer as="div" stagger="normal" className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
                    <div className="overflow-hidden mb-2">
                        <h1 id="hero-title" className="text-hero font-display font-bold leading-tight tracking-tight text-balance">
                            {heroVariant === 'general' ? t('hero.headline_1') : hero.headline}<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover">{heroVariant === 'general' ? t('hero.headline_2') : ''}</span>
                        </h1>
                    </div>

                    <div className="overflow-hidden mb-10">
                        <p className="text-xl md:text-2xl font-light tracking-wide text-gray-200 max-w-2xl mx-auto text-pretty">
                            {heroVariant === 'general' ? t('hero.description') : hero.subheadline}
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-6">
                        <Link 
                            href="/reservation"
                            className="interaction-bounce px-8 py-4 bg-accent text-neutral-950 font-bold rounded-lg hover:bg-accent-hover shadow-warm inline-block uppercase tracking-wider"
                        >
                            {heroVariant === 'general' ? t('hero.cta_reservation') as string : hero.cta1}
                        </Link>

                        <a
                            href={mainMenuPdfUrl || companyData.menuLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group interaction-bounce px-8 py-4 bg-transparent border border-white/30 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white/10 shadow-warm inline-block"
                        >
                            {t('hero.cta_menu') as string}
                        </a>
                    </div>
                </StaggerContainer>

            </section>

            {/* Welcome / Philosophy Section */}
            <section aria-labelledby="philosophy-title" className="py-24 md:py-32 lg:py-48 bg-bg-primary">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <AnimateIn direction="up">
                            <div className="space-y-8">
                                <span className="text-accent-text font-bold uppercase tracking-wider text-sm" aria-hidden="true">{t('philosophy.label') as string}</span>
                                <h2 id="philosophy-title" className="text-4xl md:text-5xl font-display font-bold text-text-primary leading-tight text-balance">
                                    {t('philosophy.title') as string}
                                </h2>
                                <p className="text-text-secondary text-lg leading-relaxed max-w-prose">
                                    {(t('philosophy.description') as string).replace('{name}', companyData.companyName) || `Bei ${companyData.companyName} glauben wir, dass jedes Gericht eine Geschichte erzählt.`}
                                </p>
                                <div className="grid grid-cols-2 gap-8 pt-4">
                                    <section className="flex flex-col gap-2">
                                        <ChefHat className="w-8 h-8 text-primary" aria-hidden="true" />
                                        <h3 className="font-bold text-text-primary">{t('philosophy.master_chefs') as string}</h3>
                                        <p className="text-sm text-text-secondary">{t('philosophy.master_chefs_desc') as string}</p>
                                    </section>
                                    <section className="flex flex-col gap-2">
                                        <Leaf className="w-8 h-8 text-status-success" aria-hidden="true" />
                                        <h3 className="font-bold text-text-primary">{t('philosophy.fresh_ingredients') as string}</h3>
                                        <p className="text-sm text-text-secondary">{t('philosophy.fresh_ingredients_desc') as string}</p>
                                    </section>
                                </div>
                                <div className="pt-6">
                                    <Link href="/about" className="text-primary font-bold hover:text-primary-hover flex items-center gap-2 group transition-colors inline-flex">
                                        {t('philosophy.learn_more') || 'Mehr über die Ratsstuben erfahren'} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </AnimateIn>
                        <AnimateIn direction="left" delay={200}>
                            <div className="relative">
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-warm transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-liquid">
                                    <Image
                                        src="/images/placeholder.svg"
                                        alt="Chef cooking"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-10 -left-10 bg-bg-secondary p-6 rounded-xl shadow-sm max-w-xs hidden md:block">
                                    <p className="font-hand text-2xl text-text-primary mb-2">&quot;{t('philosophy.quote') as string}&quot;</p>
                                    <p className="text-sm font-bold text-accent-text">- {t('philosophy.quote_author') as string}</p>
                                </div>
                            </div>
                        </AnimateIn>
                    </div>
                </div>
            </section>

            {/* Client Logos / Zertifizierungen */}
            <ClientLogoMarquee />

            {/* Highlights Grid */}
            <section aria-labelledby="highlights-title" className="py-24 md:py-32 lg:py-48 bg-bg-secondary">
                <div className="container mx-auto px-4 max-w-7xl">
                    <AnimateIn className="text-center mb-20">
                        <span className="text-accent-text font-bold uppercase tracking-wider text-sm" aria-hidden="true">{t('highlights.label') as string}</span>
                        <h2 id="highlights-title" className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-3 text-balance">{t('highlights.title') as string}</h2>
                    </AnimateIn>

                    <StaggerContainer as="div" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" itemScope itemType="https://schema.org/ItemList">
                        {highlights.slice(0, 4).map((dish, index) => (
                            <div
                                key={index}
                                itemProp="itemListElement"
                                itemScope
                                itemType="https://schema.org/MenuItem"
                                className="group card-lift bg-bg-secondary rounded-2xl overflow-hidden shadow-warm"
                            >
                                <meta itemProp="position" content={(index + 1).toString()} />
                                <div className="relative h-72 overflow-hidden">
                                    <Image
                                        src={dish.image}
                                        alt={dish.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-liquid"
                                    />
                                    <div itemProp="offers" itemScope itemType="https://schema.org/Offer" className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm">
                                        <span itemProp="price" content={dish.price.replace('€', '').trim()}>{dish.price}</span>
                                        <meta itemProp="priceCurrency" content="EUR" />
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 itemProp="name" className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">{dish.name}</h3>
                                    <p itemProp="description" className="text-text-secondary text-sm mb-6 line-clamp-2">{dish.desc}</p>
                                    <a
                                        href={mainMenuPdfUrl || companyData.menuLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-accent-text font-semibold text-sm uppercase tracking-wide flex items-center gap-2 group-hover:gap-3 transition-all duration-500 ease-liquid inline-block mt-2"
                                    >
                                        {t('highlights.details') as string} <ArrowRight className="w-4 h-4 inline" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </StaggerContainer>

                    <AnimateIn className="text-center mt-16" delay={300}>
                        <a
                            href={mainMenuPdfUrl || companyData.menuLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="interaction-bounce inline-block px-10 py-4 border border-text-primary text-text-primary font-bold rounded-lg hover:bg-text-primary hover:text-white uppercase tracking-wider"
                        >
                            {t('highlights.view_menu') as string}
                        </a>
                    </AnimateIn>
                </div>
            </section>

            {/* Stats Section with Animated Counters */}
            <section aria-labelledby="stats-title" className="py-24 md:py-32 lg:py-40 bg-bg-beige border-y border-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                <div className="container mx-auto px-4 relative z-10">
                    <h2 id="stats-title" className="sr-only">{t('stats.title') as string}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-gray-200/50">
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
            <section aria-labelledby="testimonials-title" className="py-24 md:py-32 lg:py-48 bg-bg-primary">
                <div className="container mx-auto px-4 max-w-7xl">
                    <AnimateIn className="text-center mb-20">
                        <span className="text-accent-text font-bold uppercase tracking-wider text-sm" aria-hidden="true">{t('testimonials.label') as string}</span>
                        <h2 id="testimonials-title" className="text-4xl md:text-5xl font-display font-bold text-text-primary mt-3 text-balance">{t('testimonials.title') as string}</h2>
                        <div className="flex justify-center items-center gap-2 mt-4">
                            <span className="font-bold text-lg text-text-primary">4.8</span>
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i === 4 ? 'fill-current opacity-50' : 'fill-current'}`} />)}
                            </div>
                            <span className="text-sm text-text-tertiary ms-2">{t('testimonials.from_reviews') as string}</span>
                        </div>
                    </AnimateIn>

                    <StaggerContainer as="div" className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {getTestimonialsBySegment(heroVariant || 'general').map((t) => (
                            <div key={t.id}>
                                <TestimonialCard testimonial={t} />
                            </div>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Info & Location (Premium Layout) */}
            <section aria-labelledby="info-location-title" className="py-24 md:py-32 lg:py-48 bg-surface text-text-primary relative overflow-hidden">
                <h2 id="info-location-title" className="sr-only">{t('info.visit_title') as string}</h2>
                <div className="container mx-auto px-4 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Hours */}
                        <AnimateIn className="lg:col-span-1 bg-bg-secondary p-10 rounded-2xl border border-border">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                                <Clock className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-display font-bold mb-6 text-text-primary">{t('info.hours_title') as string}</h3>
                            <ul className="space-y-4 text-text-secondary">
                                <li className="flex justify-between border-b border-border pb-3">
                                    <span>{companyData.openingHours.ruhetag.tag}</span>
                                    <span className="font-mono text-text-primary">{companyData.openingHours.monday}</span>
                                </li>
                                <li className="border-b border-border pb-3">
                                    <div className="flex justify-between mb-1">
                                        <span>{companyData.openingHours.regulaer.tage}</span>
                                        <span className="font-mono text-text-primary text-sm">{t('info.lunch_dinner') as string}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-tertiary">{t('info.lunch') as string}</span>
                                        <span className="font-mono text-text-primary">{companyData.openingHours.regulaer.mittags}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-tertiary">{t('info.dinner') as string}</span>
                                        <span className="font-mono text-text-primary">{companyData.openingHours.regulaer.abends}</span>
                                    </div>
                                </li>
                            </ul>
                        </AnimateIn>

                        {/* Contact & Map */}
                        <AnimateIn delay={150} className="lg:col-span-2 space-y-8">
                            <address className="flex flex-col md:flex-row gap-8 not-italic">
                                <div className="flex-1 bg-bg-secondary p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-xs transition-all">
                                    <MapPin className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
                                    <h3 className="font-bold text-lg mb-2">{t('info.address_title') as string}</h3>
                                    <p className="text-text-secondary">{companyData.address.street}<br />{companyData.address.zip} {companyData.address.city}</p>
                                </div>
                                <div className="flex-1 bg-bg-secondary p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-xs transition-all">
                                    <Phone className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
                                    <h3 className="font-bold text-lg mb-2">{t('info.phone_title') as string}</h3>
                                    <p className="text-text-secondary"><a href={`tel:${companyData.phone}`} className="hover:text-primary transition-colors">{companyData.displayPhone}</a></p>
                                </div>
                                <div className="flex-1 bg-bg-secondary p-8 rounded-2xl border border-border hover:border-primary/50 hover:shadow-xs transition-all">
                                    <Mail className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
                                    <h3 className="font-bold text-lg mb-2">{t('info.email_title') as string}</h3>
                                    <p className="text-text-secondary"><a href={`mailto:${companyData.email}`} className="hover:text-primary transition-colors">{companyData.email}</a></p>
                                </div>
                            </address>

                            <div className="h-[400px] bg-neutral-200 rounded-2xl overflow-hidden border border-black/10 shadow-soft relative group">
                                <iframe
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(companyData.address.street + ", " + companyData.address.zip + " " + companyData.address.city)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(100%)' }}
                                    allowFullScreen={true}
                                    loading="lazy"
                                    title="Standortkarte"
                                    className="group-hover:filter-none transition-all duration-700 ease-liquid"
                                ></iframe>
                                <div className="absolute bottom-6 right-6">
                                    <Link
                                        href="/contact"
                                        className="interaction-bounce px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover shadow-sm inline-block"
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
