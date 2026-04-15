'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';
import { ErrorLogger } from '@/lib/monitoring/error-logger';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    ErrorLogger.capture(error, { category: 'client', level: 'fatal' });
  }, [error]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-bg-beige flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-6xl font-display font-bold text-primary mb-4" aria-hidden="true">Oops</p>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-main mb-6">
            Etwas ist schiefgegangen
          </h1>
          <p className="text-lg text-text-secondary mb-10 leading-relaxed">
            Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut
            oder kehren Sie zur Startseite zurück.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              <RefreshCw className="w-5 h-5" aria-hidden="true" />
              Erneut versuchen
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-secondary text-text-primary rounded-xl font-medium hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              <Home className="w-5 h-5" aria-hidden="true" />
              Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
