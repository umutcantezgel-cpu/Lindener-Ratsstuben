import React from 'react';
import { headers } from 'next/headers';
import type { VisitorSegment } from '@/hooks/useVisitorSegment';

// Using a basic Link for now if needed, or an anchor
import Link from 'next/link';

const segmentContent: Record<VisitorSegment, { text: string; action: string }> = {
  'new-visitor': { text: "Kostenlose Anfrage stellen", action: "/contact" },
  'returning-explorer': { text: "Jetzt kontaktieren", action: "/contact" },
  'service-interested': { text: "Service anfragen", action: "/contact?intent=service" },
  'high-intent': { text: "Termin buchen (kostenlos)", action: "/reservation" },
  'converted': { text: "Nächstes Projekt planen", action: "/contact?intent=returning" },
  'blog-reader': { text: "Ähnliche Projekte sehen", action: "/gallery" },
};

export function PersonalizedCta() {
  const headersList = headers();
  const segmentHeader = headersList.get('x-visitor-segment') as VisitorSegment || 'new-visitor';
  
  const content = segmentContent[segmentHeader] || segmentContent['new-visitor'];

  return (
    <div className="mt-8 flex justify-center">
      <Link 
        href={content.action}
        className="px-8 py-4 rounded-full bg-primary text-surface font-semibold hover:bg-primary-hover transition"
      >
        {content.text}
      </Link>
    </div>
  );
}
