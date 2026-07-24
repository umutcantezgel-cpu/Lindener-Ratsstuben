import React from 'react';
import { Metadata } from 'next';
import AboutClient from './AboutClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';

import { JsonLd } from '@/components/seo/JsonLd';
import { createAboutPageSchema } from '@/lib/seo/schema-generators';
import { getAlternates } from '@/lib/seo/metadata';
import { SeoContentBlock } from '@/components/seo/SeoContentBlock';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations(locale as LocaleType, 'meta');
  const titleText = tMeta('about.title', 'Über Uns | Lindener Ratsstuben');
  const description = tMeta('about.description', 'Erfahren Sie mehr über die Geschichte und Philosophie der Lindener Ratsstuben. Tradition trifft auf moderne italienische Küchenkunst.');

  return {
    title: titleText,
    description,
    alternates: getAlternates(locale, 'about'),
    openGraph: {
      title: titleText,
      description,
      url: `/${locale}/about`,
    }
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'pages');
    const tMeta = await getTranslations(locale as LocaleType, 'meta');
    let faqData = null;
    try {
        faqData = (await import(`../../../../locales/${locale}/faq.json`)).default;
    } catch {
        faqData = (await import(`../../../../locales/de/faq.json`)).default;
    }

    return (
      <>
        <h1 className="sr-only">{tMeta('about.title', 'Über Uns').split(' |')[0]}</h1>
        <JsonLd data={createAboutPageSchema(t)} />
        <AboutClient faqData={faqData} />
        <SeoContentBlock locale={locale} pageKey="about" />
      </>
    );
}
