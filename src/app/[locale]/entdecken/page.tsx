import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getAllRegionalArticles } from '@/utils/markdown-regional';

export const metadata: Metadata = {
  title: 'Mittelhessen Entdecken - Ausflugsziele & Freizeit | Lindener Ratsstuben',
  description: 'Ihr Ratgeber für Mittelhessen: Die schönsten Sehenswürdigkeiten, Radtouren, Ausflugsziele und Geheimtipps in Gießen, Wetzlar und Umgebung.',
};

interface PageProps {
  params: {
    locale: string;
  };
}

export default function EntdeckenPage({ params }: PageProps) {
  const articles = getAllRegionalArticles();
  
  // Group by category
  const groupedArticles = articles.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {} as Record<string, typeof articles>);

  return (
    <div className="bg-[#fcfbf9] min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <header className="mb-16 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-[#2d1810] mb-6">
            Mittelhessen Entdecken
          </h1>
          <p className="text-xl text-[#2d1810]/70 max-w-2xl mx-auto font-light">
            Vom Rothaarsteig bis ins Lahntal: Entdecken Sie die faszinierendsten Ausflugsziele, 
            versteckten Orte und Freizeitaktivitäten rund um Linden, Gießen und Wetzlar.
          </p>
        </header>

        {Object.entries(groupedArticles).map(([category, items]) => (
          <section key={category} className="mb-16">
            <h2 className="font-display text-3xl text-[#5E0F18] mb-8 capitalize border-b border-[#5E0F18]/10 pb-4">
              {category}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(article => (
                <Link 
                  key={article.slug} 
                  href={`/${params.locale}/${category}/${article.slug}`}
                  className="group bg-surface border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-warm transition-all hover:-translate-y-1 block"
                >
                  <div className="text-xs font-bold uppercase tracking-widest text-[#C48810] mb-3">
                    {article.location || 'Mittelhessen'}
                  </div>
                  <h3 className="font-display text-xl text-[#2d1810] mb-3 group-hover:text-[#5E0F18] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-text-secondary line-clamp-3">
                    {article.metaDescription}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}

      </div>
    </div>
  );
}
