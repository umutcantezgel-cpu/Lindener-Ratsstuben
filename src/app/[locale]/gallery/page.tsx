import { Metadata } from 'next';
import PageClient from './PageClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { companyData } from '@/data/company';
import { getAlternates } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { SeoContentBlock } from '@/components/seo/SeoContentBlock';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations(locale as LocaleType, 'meta');
  const titleText = tMeta('gallery.title', 'Galerie | Lindener Ratsstuben');
  const description = tMeta('gallery.description', 'Werfen Sie einen Blick auf unser gemütliches Ambiente und unsere frisch zubereiteten Gerichte in Linden.');

  return {
    title: titleText,
    description,
    alternates: getAlternates(locale, 'gallery'),
    openGraph: {
      title: titleText,
      description,
      url: `/${locale}/gallery`,
    }
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const tMeta = await getTranslations(locale as LocaleType, 'meta');
  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Galerie — ${companyData.companyName}`,
    description: 'Werfen Sie einen Blick auf unser gemütliches Ambiente und unsere frisch zubereiteten Gerichte in Linden.',
    url: `https://lindener-ratsstuben.de/gallery`,
  };

  return (
    <>
      <h1 className="sr-only">{tMeta('gallery.title', 'Galerie')}</h1>
      <span className="sr-only">{tMeta('gallery.title', 'Galerie')}</span>
      <JsonLd data={gallerySchema} />
      <PageClient />
      <SeoContentBlock locale={locale} pageKey="gallery" />
    </>
  );
}
