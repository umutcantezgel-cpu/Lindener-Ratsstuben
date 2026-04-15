'use client';

import React, { useEffect } from 'react';
import { RefreshCw, Image as ImageIcon } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import Link from 'next/link';

export default function GalleryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Gallery error:', error);
  }, [error]);

  return (
    <Container className="py-24 text-center">
      <h2 className="text-3xl font-display font-bold text-text-main mb-6">
        Die Galerie konnte nicht geladen werden
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
        Unsere Bilder sind derzeit nicht abrufbar. 
        Bitte versuchen Sie es erneut oder stöbern Sie in der Zwischenzeit auf unseren anderen Seiten.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          <RefreshCw className="w-5 h-5" />
          Erneut versuchen
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-secondary text-text-primary rounded-xl font-medium hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          <ImageIcon className="w-5 h-5" />
          Zurück zur Startseite
        </Link>
      </div>
    </Container>
  );
}
