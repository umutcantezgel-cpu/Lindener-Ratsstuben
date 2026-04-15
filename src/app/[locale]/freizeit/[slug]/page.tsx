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

// Generate static metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getRegionalArticle('freizeit', params.slug);
  
  if (!article) {
    return {
      title: 'Nicht gefunden | Lindener Ratsstuben'
    };
  }

  return {
    title: `${article.metaTitle} | Lindener Ratsstuben`,
    description: article.metaDescription,
    alternates: {
      canonical: `https://lindener-ratsstuben.de/${params.locale}/freizeit/${params.slug}`
    }
  };
}

// Generate static params for all markdown files in category
export async function generateStaticParams() {
  const slugs = getRegionalSlugsByCategory('freizeit');
  
  // Since we have multiple locales, we need to generate paths for all allowed locales
  const { ALLOWED_LOCALES } = await import('@/lib/locales');
  
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of ALLOWED_LOCALES) {
    for (const slug of slugs) {
      params.push({
        locale,
        slug,
      });
    }
  }
  
  return params;
}

export default function FreizeitPage({ params }: PageProps) {
  const article = getRegionalArticle('freizeit', params.slug);

  if (!article) {
    notFound();
  }

  return <RegionalArticleTemplate article={article} locale={params.locale} />;
}
