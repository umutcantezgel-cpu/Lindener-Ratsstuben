"use client";

import React from 'react';
import { AdaptiveImage as Image } from '@/components/ui/AdaptiveImage';
import { LocaleLink } from '@/components/ui/LocaleLink';
import { PageTransition } from '@/components/effects/PageTransition';
import { Flame, Heart, Leaf } from 'lucide-react';
import { companyData } from '@/data/company';
import { useTranslation } from '@/lib/i18n/use-translation';

import { SnippetAnswer } from '@/components/seo/SnippetAnswer';

interface AboutClientProps {
    faqData: Record<string, string> | null;
}

const AboutClient = ({ faqData }: AboutClientProps) => {
    const { t } = useTranslation('pages');

    const philosophyItems = [
        { icon: Leaf, title: t('about.quality_title') as string, text: t('about.quality_text') as string },
        { icon: Heart, title: t('about.hospitality_title') as string, text: t('about.hospitality_text') as string },
        { icon: Flame, title: t('about.tradition_title') as string, text: t('about.tradition_text') as string }
    ];

    return (
        <PageTransition>
            <article className="pt-24 pb-20 min-h-screen bg-bg-beige" itemProp="mainContentOfPage">
                {/* Hero / Intro */}
                <header className="container mx-auto px-4 mb-20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-5xl font-display font-bold text-text-main mb-6">{t('about.headline') as string}</h2>
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
                                    src="/images/editorial/kitchen_ambiance.webp"
                                    alt="Restaurant Interior"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
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
                                <div className="pt-8">
                                    <LocaleLink href="/reservation" className="interaction-bounce px-8 py-3 bg-accent text-neutral-950 font-bold rounded-lg hover:bg-accent-hover shadow-warm inline-flex items-center gap-2 uppercase tracking-wider">
                                        {t('reservation.title') || 'Tisch reservieren'}
                                    </LocaleLink>
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



                {/* FAQ Section (AI Optimized) */}
                {faqData && (
                    <section aria-labelledby="faq-title" className="py-20 bg-bg-secondary mt-20">
                        <div className="container mx-auto px-4 max-w-4xl">
                            <div className="text-center mb-16">
                                <h2 id="faq-title" className="text-3xl md:text-4xl font-display font-bold text-surface bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest mb-4 shadow-warm inline-block">
                                    {faqData.title}
                                </h2>
                            </div>
                            <div className="space-y-8">
                                {Object.keys(faqData)
                                    .filter(key => key.startsWith('items.') && key.endsWith('.question'))
                                    .map((key, index) => {
                                        const baseKey = key.replace('.question', '');
                                        const question = faqData[key];
                                        const shortAnswer = faqData[`${baseKey}.shortAnswer`];
                                        if (!question || !shortAnswer) return null;
                                        return (
                                            <SnippetAnswer
                                                key={index}
                                                question={question}
                                                shortAnswer={shortAnswer}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </section>
                )}
            </article>
        </PageTransition>
    );
};

export default AboutClient;
