import React from 'react';
import { Metadata } from 'next';
import KegelClient from './KegelClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { companyData } from '@/data/company';
import { JsonLd } from '@/components/seo/JsonLd';
import { createKegelbahnPageSchema } from '@/lib/seo/schema-generators';
import { getAlternates } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'pages');
  const titleText = t('kegelbahn.hero.title');
  const description = t('kegelbahn.hero.subtitle');
  const fullTitle = `${titleText} | ${companyData.companyName}`;

  return {
    title: titleText,
    description,
    alternates: getAlternates(locale, 'kegelbahn'),
    openGraph: {
      title: fullTitle,
      description,
      url: `/${locale}/kegelbahn`,
    }
  };
}

export default async function KegelbahnPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'pages');

    return (
      <>
        <JsonLd data={createKegelbahnPageSchema(t)} />
        <KegelClient locale={locale} />
      </>
    );
}
