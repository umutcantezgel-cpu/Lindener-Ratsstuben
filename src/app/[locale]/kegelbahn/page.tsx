import React from 'react';
import { Metadata } from 'next';
import KegelClient from './KegelClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';

import { JsonLd } from '@/components/seo/JsonLd';
import { createKegelbahnPageSchema } from '@/lib/seo/schema-generators';
import { getAlternates } from '@/lib/seo/metadata';
import { SeoContentBlock } from '@/components/seo/SeoContentBlock';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations(locale as LocaleType, 'meta');
  const titleText = tMeta('kegelbahn.hero.title', 'Kegelbahn | Lindener Ratsstuben');
  const description = tMeta('kegelbahn.hero.description', 'Reservieren Sie unsere hauseigene Kegelbahn für unvergessliche Abende mit Freunden, Familie oder Kollegen.');

  return {
    title: titleText,
    description,
    alternates: getAlternates(locale, 'kegelbahn'),
    openGraph: {
      title: titleText,
      description,
      url: `/${locale}/kegelbahn`,
    }
  };
}

export default async function KegelbahnPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'pages');
    const tMeta = await getTranslations(locale as LocaleType, 'meta');

    return (
      <>
        <h1 className="sr-only">{tMeta('kegelbahn.hero.title', 'Kegelbahn').split(' |')[0]}</h1>
        <JsonLd data={createKegelbahnPageSchema(t)} />
        <KegelClient locale={locale} />
        <SeoContentBlock locale={locale} pageKey="kegelbahn" />
      </>
    );
}
