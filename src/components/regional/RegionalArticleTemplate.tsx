import React from 'react';
import { RegionalArticle } from '@/types/regional-content';
import { getCompanyData } from '@/data/company';
import { RegionalJourneyTracker } from './RegionalJourneyTracker';
import { AdaptiveRegionalCTA } from './AdaptiveRegionalCTA';

interface RegionalArticleTemplateProps {
  article: RegionalArticle;
  locale: string;
}

export function RegionalArticleTemplate({ article, locale }: RegionalArticleTemplateProps) {
  const company = getCompanyData();

  return (
    <article className="bg-surface min-h-screen pt-24 pb-20">
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.metaTitle,
            "description": article.metaDescription,
            "author": { "@type": "Organization", "name": company.companyName },
            "publisher": { "@type": "Organization", "name": company.companyName },
            "datePublished": article.publishDate,
            "dateModified": article.lastUpdated,
            "about": {
              "@type": "Place",
              "name": article.location || article.title
            },
            "mentions": {
              "@type": "Restaurant",
              "name": company.companyName,
              "address": {
                "streetAddress": company.address.street,
                "postalCode": company.address.zip,
                "addressLocality": company.address.city
              },
              "servesCuisine": company.tagline
            }
          })
        }}
      />

      <RegionalJourneyTracker 
        category={article.category} 
        regionalFocus={article.location || article.title} 
      />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-primary border border-border px-3 py-1 rounded-full">
              Ratgeber • {article.category}
            </span>
            {article.distanceFromRestaurant && (
              <span className="text-xs font-bold uppercase tracking-widest text-accent border border-border px-3 py-1 rounded-full">
                {article.distanceFromRestaurant} von {company.address.city}
              </span>
            )}
          </div>
          
          <h1 className="font-display text-4xl md:text-5xl lg:text-5xl text-text-primary mb-6 leading-tight">
            {article.title}
          </h1>
          
          {article.heroSubtitle && (
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-light">
              {article.heroSubtitle}
            </p>
          )}
        </header>

        {/* Content Body */}
        <div className="prose prose-lg prose-headings:font-display prose-headings:text-text-primary prose-a:text-primary prose-a:font-semibold max-w-none mb-16">
          {/* Typically we'd use a markdown renderer here like ReactMarkdown. For simplicity we use dangerouslySetInnerHTML if pre-rendered, or handle it via a parser component */}
          {/* Using a placeholder for MDX renderer to inject parsed HTML */}
          <div dangerouslySetInnerHTML={{ __html: parseMarkdown(article.content) }} />
        </div>

        <AdaptiveRegionalCTA 
          locale={locale}
          street={company.address.street}
          zip={company.address.zip}
          city={company.address.city}
          driveTime={article.driveTime}
          openingHours={`${company.openingHours.regulaer?.mittags} & ${company.openingHours.regulaer?.abends}`}
        />

      </div>
    </article>
  );
}

// Simple fallback parser for raw markdown if needed
function parseMarkdown(content: string) {
  // In a robust implementation, use marked or react-markdown
  return content
    .replace(/^## (.*$)/gim, '<h2 class="text-3xl mt-12 mb-6 border-b border-border pb-2">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-2xl mt-8 mb-4">$1</h3>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\n\n/gim, '</p><p class="mb-4 leading-relaxed">')
    .replace(/^\* (.*$)/gim, '<li class="ml-4 list-disc mb-2">$1</li>')
    // Wrap initial paragraph
    .replace(/^([^<].*)$/m, '<p class="mb-4 leading-relaxed">$1</p>');
}
