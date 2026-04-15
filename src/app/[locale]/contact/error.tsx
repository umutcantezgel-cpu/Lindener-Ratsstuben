'use client';

import React, { useEffect } from 'react';
import { RefreshCw, Phone } from 'lucide-react';
import { Container } from '@/components/layout/Container';

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Contact error:', error);
  }, [error]);

  return (
    <Container className="py-24 text-center">
      <h2 className="text-3xl font-display font-bold text-text-main mb-6">
        Fehler im Kontaktbereich
      </h2>
      <p className="text-lg text-text-secondary mb-10 max-w-2xl mx-auto">
        Das Kontaktformular oder die zugehörigen Daten konnten nicht geladen werden.
        Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt telefonisch.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          <RefreshCw className="w-5 h-5" />
          Erneut versuchen
        </button>
        <a
          href="tel:+4964032345"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-secondary text-text-primary rounded-xl font-medium hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          <Phone className="w-5 h-5" />
          06403 2345
        </a>
      </div>
    </Container>
  );
}
