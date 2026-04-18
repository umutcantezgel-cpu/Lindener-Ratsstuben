import { getAlternates } from '@/lib/seo/metadata';
import { notFound } from 'next/navigation';
import { getRegionalArticle, getRegionalSlugsByCategory } from '@/utils/markdown-regional';
import { RegionalArticleTemplate } from '@/components/regional/RegionalArticleTemplate';
import { Metadata } from 'next';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getRegionalArticle('business', params.slug);
  
  if (!article) {
    return {
      title: 'Nicht gefunden | Lindener Ratsstuben'
    };
  }

  return {
    title: `${article.metaTitle} | Lindener Ratsstuben`,
    description: article.metaDescription,
    alternates: getAlternates(params.locale, `business/${params.slug}`),
  };
}

export async function generateStaticParams() {
  const slugs = getRegionalSlugsByCategory('business');
  const { ALLOWED_LOCALES } = await import('@/lib/locales');
  
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ALLOWED_LOCALES) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export default function BusinessPage({ params }: PageProps) {
  const article = getRegionalArticle('business', params.slug);

  if (!article) {
    notFound();
  }

  return <RegionalArticleTemplate article={article} locale={params.locale} />;
}
