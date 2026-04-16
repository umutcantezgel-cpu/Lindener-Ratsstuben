import React from 'react';
import { Metadata } from 'next';
import AboutClient from './AboutClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { companyData } from '@/data/company';
import { JsonLd } from '@/components/seo/JsonLd';
import { createAboutPageSchema } from '@/lib/seo/schema-generators';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'pages');
  const titleText = t('about.title', 'Über Uns');
  const description = t('about.subtitle', 'Erfahren Sie mehr über die Geschichte und Philosophie der Lindener Ratsstuben. Tradition trifft auf moderne italienische Küchenkunst.');
  const fullTitle = `${titleText} | ${companyData.companyName}`;

  return {
    title: titleText,
    description,
    alternates: {
      canonical: "/about",
    },
    openGraph: {
      title: fullTitle,
      description,
      url: "/about",
    }
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    let faqData = null;
    try {
        faqData = (await import(`../../../../locales/${locale}/faq.json`)).default;
    } catch {
        faqData = (await import(`../../../../locales/de/faq.json`)).default;
    }

    return (
      <>
        <JsonLd data={createAboutPageSchema()} />
        <AboutClient faqData={faqData} />
      </>
    );
}
