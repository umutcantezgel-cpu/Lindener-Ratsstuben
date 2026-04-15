import React from 'react';
import Link from 'next/link';
import { contentRelations } from '@/data/content-relations';
import { headers } from 'next/headers';
import type { VisitorSegment } from '@/hooks/useVisitorSegment';

export function RelatedContent({ currentId, limit = 3 }: { currentId: string; limit?: number }) {
  const relations = contentRelations[currentId];
  
  if (!relations || relations.related.length === 0) {
    return (
      <div className="mt-12 text-center">
        <Link href="/services" className="text-primary hover:text-primary-hover underline underline-offset-4">
          Mehr Services entdecken
        </Link>
      </div>
    );
  }

  // NextJS server side rendering checks segment to alter copy
  const headersList = headers();
  const segmentHeader = headersList.get('x-visitor-segment') as VisitorSegment || 'new-visitor';
  const headingText = segmentHeader === 'high-intent' 
    ? "Verpassen Sie nicht unsere ergänzenden Wachstums-Booster:" 
    : "Das könnte Sie auch interessieren:";

  // Sort related elements based on relatedScore
  const sortedRelated = [...relations.related].sort((a, b) => {
    const scoreA = relations.relatedScore[a] || 0;
    const scoreB = relations.relatedScore[b] || 0;
    return scoreB - scoreA;
  }).slice(0, limit);

  return (
    <div className="mt-16 border-t border-border pt-12">
      <h3 className="text-2xl font-semibold text-text-primary mb-8 text-center">{headingText}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sortedRelated.map(id => (
          <Link key={id} href={`/services/${id}`} className="block group">
            <div className="bg-bg-secondary border border-border rounded-xl p-6 hover:border-primary transition-colors h-full">
              <h4 className="text-lg font-medium text-text-primary group-hover:text-primary">{id.replace('-', ' ').toUpperCase()}</h4>
              <p className="text-sm text-text-secondary mt-2">Jetzt entdecken →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
