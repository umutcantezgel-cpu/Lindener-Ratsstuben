"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useVisitorSegment } from '@/hooks/useVisitorSegment';

export function PriceCalculator() {
  const [complexity, setComplexity] = useState<'einfach' | 'mittel' | 'komplex'>('mittel');
  const [duration, setDuration] = useState<number>(3);
  const segment = useVisitorSegment();

  // Simple pricing logic based on inputs
  const calculatePrice = () => {
    const base = complexity === 'einfach' ? 2000 : complexity === 'mittel' ? 4500 : 8000;
    const durationFact = duration * 500;
    return `ca. ${(base + durationFact).toLocaleString('de-DE')} EUR`;
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-8 max-w-2xl mx-auto text-text-primary shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-center text-text-primary">Projekt-Investitions Rechner</h3>
      
      <div className="space-y-6">
        <div>
          <span className="block text-sm font-medium text-text-secondary mb-2">Komplexität</span>
          <div className="flex gap-2">
            {(['einfach', 'mittel', 'komplex'] as const).map(c => (
              <button
                key={c}
                onClick={() => setComplexity(c)}
                className={`flex-1 py-2 rounded-md capitalize transition ${complexity === c ? 'bg-primary text-surface' : 'bg-bg-secondary text-text-secondary hover:bg-border'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div>
           <label htmlFor="duration-slider" className="block text-sm font-medium text-text-secondary mb-2">Gewünschte Dauer ({duration} Monate)</label>
           <input 
             id="duration-slider"
             type="range" 
             min="1" max="12" 
             value={duration} 
             onChange={(e) => setDuration(parseInt(e.target.value))}
             className="w-full accent-primary"
           />
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-text-secondary mb-2">Ihre ungefähre Investition:</p>
          <div className="text-4xl font-bold text-primary mb-6">{calculatePrice()}</div>
          
          {segment === 'service-interested' && (
             <p className="text-xs text-text-tertiary mb-4">*Dieser Preis basiert auf Standard-Spezifikationen für UI/UX und Frontend Entwicklung.</p>
          )}

          <Link href={`/contact?intent=calculator&estimate=${calculatePrice()}`} className="inline-block px-8 py-3 bg-primary text-surface font-semibold rounded-full hover:bg-primary-hover transition">
            Individuelles Angebot anfordern
          </Link>
        </div>
      </div>
    </div>
  );
}
