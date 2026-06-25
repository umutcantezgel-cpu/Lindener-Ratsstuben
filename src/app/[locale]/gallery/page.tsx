import { Metadata } from 'next';
import PageClient from './PageClient';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { companyData } from '@/data/company';

import { getAlternates } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'pages');
  const tMeta = await getTranslations(locale as LocaleType, 'meta');
  const titleText = tMeta('gallery.title', 'Galerie');
  const description = t('gallery.description', 'Werfen Sie einen Blick auf unser gemütliches Ambiente und unsere frisch zubereiteten Gerichte in Linden.');
  const fullTitle = `${titleText} | ${companyData.companyName}`;

  return {
    title: titleText,
    description,
    alternates: getAlternates(locale, 'gallery'),
    openGraph: {
      title: fullTitle,
      description,
      url: `/${locale}/gallery`,
    }
  };
}

export default function Page() {
  return <PageClient />;
}
