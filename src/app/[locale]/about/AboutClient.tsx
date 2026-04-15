"use client";

import React from 'react';
import Image from '@/components/ui/ImagePlaceholder';
import { PageTransition } from '@/components/effects/PageTransition';
import { Flame, Heart, Leaf } from 'lucide-react';
import { companyData } from '@/data/company';
import { useTranslation } from '@/lib/i18n/use-translation';

const AboutClient = () => {
    const { t } = useTranslation('pages');

    const philosophyItems = [
        { icon: Leaf, title: t('about.quality_title') as string, text: t('about.quality_text') as string },
        { icon: Heart, title: t('about.hospitality_title') as string, text: t('about.hospitality_text') as string },
        { icon: Flame, title: t('about.tradition_title') as string, text: t('about.tradition_text') as string }
    ];

    return (
        <PageTransition>
            <div className="pt-24 pb-20 min-h-screen bg-bg-beige">
                {/* Hero / Intro */}
                <header className="container mx-auto px-4 mb-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl font-display font-bold text-text-main mb-6">{t('about.headline') as string}</h1>
                        <p className="text-xl text-text-secondary leading-relaxed">
                            {t('about.subtitle') as string}
                        </p>
                    </div>
                </header>

                {/* Story Section */}
                <section aria-labelledby="story-title" className="mb-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-sm">
                                <Image
                                    src="/images/placeholder.svg"
                                    alt="Restaurant Interior"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-6">
                                <h2 id="story-title" className="text-3xl font-display font-bold text-text-main">{t('about.story_title') as string}</h2>
                                <p className="text-text-secondary leading-relaxed">
                                    {(t('about.story_p1') as string).replace('{name}', companyData.companyName)}
                                </p>
                                <p className="text-text-secondary leading-relaxed">
                                    {t('about.story_p2') as string}
                                </p>
                                <div className="pt-4">
                                    <div className="flex items-center gap-4 text-primary font-display font-bold text-xl">
                                        <Flame className="w-6 h-6" />
                                        <span>{t('about.tagline') as string}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Philosophy Section */}
                <section aria-labelledby="philosophy-title" className="py-20 bg-bg-secondary mb-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 id="philosophy-title" className="text-3xl md:text-4xl font-display font-bold text-surface bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest mb-8 shadow-warm inline-block w-full">{t('about.philosophy_title') as string}</h2>
                            <p className="text-text-secondary">{t('about.philosophy_subtitle') as string}</p>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 m-0 p-0 list-none">
                            {philosophyItems.map((item, index) => (
                                <li key={index} className="text-center p-8 bg-bg-beige rounded-xl hover:shadow-sm transition-shadow">
                                    <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center text-primary" aria-hidden="true">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-text-main mb-4">{item.title}</h3>
                                    <p className="text-text-secondary">{item.text}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Team Section */}
                <section aria-labelledby="team-title">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 id="team-title" className="text-3xl md:text-4xl font-display font-bold text-surface bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest mb-4 shadow-warm inline-block">{t('about.team_title') as string}</h2>
                            <p className="text-text-secondary">{t('about.team_subtitle') as string}</p>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 m-0 p-0 list-none">
                            {[
                                { name: 'Rahul Sharma', role: t('about.role_chef') as string, image: '/images/placeholder.svg' },
                                { name: 'Amina Khan', role: t('about.role_manager') as string, image: '/images/placeholder.svg' },
                                { name: 'Vikram Singh', role: t('about.role_souschef') as string, image: '/images/placeholder.svg' }
                            ].map((member, index) => (
                                <li key={index} className="group relative overflow-hidden rounded-xl shadow-sm aspect-[3/4]">
                                    <Image
                                        src={member.image}
                                        alt={`Portrait von ${member.name}, ${member.role}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-text-primary/80 via-text-primary/20 to-transparent flex flex-col justify-end p-6 text-surface translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <h3 className="text-2xl font-display font-bold mb-1">{member.name}</h3>
                                        <p className="text-accent font-medium">{member.role}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default AboutClient;
