import { Metadata } from 'next';
import PageClient from './PageClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { companyData } from '@/data/company';
import { JsonLd } from '@/components/seo/JsonLd';
import { createContactPageSchema, createContactFaqSchema } from '@/lib/seo/schema-generators';
import { getAlternates } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'pages');
  const titleText = t('contact.title', 'Kontakt');
  const description = t('contact.description', 'Kontaktieren Sie uns. Wir freuen uns auf Ihre Nachricht, Reservierungen oder Feedback.');
  const fullTitle = `${titleText} | ${companyData.companyName}`;

  return {
    title: titleText,
    description,
    alternates: getAlternates(locale, 'contact'),
    openGraph: {
      title: fullTitle,
      description,
      url: `/${locale}/contact`,
    }
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'pages');

  return (
    <>
      <JsonLd data={createContactPageSchema(t)} />
      <JsonLd data={createContactFaqSchema()} />
      <PageClient />
    </>
  );
}
