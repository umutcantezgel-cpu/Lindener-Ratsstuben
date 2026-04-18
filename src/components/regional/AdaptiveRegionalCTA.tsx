"use client";

import React from 'react';
import Link from 'next/link';
import { useAdaptiveMessaging } from '@/hooks/useAdaptiveMessaging';

interface AdaptiveRegionalCTAProps {
  locale: string;
  street: string;
  zip: string;
  city: string;
  driveTime?: string;
  openingHours?: string;
}

export function AdaptiveRegionalCTA({
  locale,
  street,
  zip,
  city,
  driveTime,
  openingHours
}: AdaptiveRegionalCTAProps) {
  const { cta } = useAdaptiveMessaging();

  return (
    <div className="mt-16 pt-12 border-t border-[#d4a843]/30">
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d1810] text-[#fcfbf9] rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
        {/* Subtle overlay accent */}
        <div className="absolute top-0 end-0 w-64 h-64 bg-[#C48810]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2" />
        
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="font-display text-3xl mb-4 text-[#fcfbf9]">{cta.headline}</h3>
            <p className="text-[#fcfbf9]/80 mb-6 font-light leading-relaxed">
              {cta.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={`/${locale}/reservation`}
                className="inline-flex justify-center items-center px-6 py-3 bg-[#d4a843] text-[#1a1a2e] font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-[#C48810] transition-colors"
              >
                {cta.buttonText}
              </Link>
              <Link 
                href={`/${locale}/menu`}
                className="inline-flex justify-center items-center px-6 py-3 border border-[#fcfbf9]/20 text-[#fcfbf9] font-bold uppercase tracking-wider text-sm rounded-sm hover:bg-[#fcfbf9]/10 transition-colors"
              >
                Speisekarte ansehen
              </Link>
            </div>
          </div>
          
          <div className="space-y-4 text-sm text-[#fcfbf9]/70 border-s border-[#fcfbf9]/10 ps-6 h-fit">
            <div className="flex gap-2">
              <span className="text-[#d4a843]">📍</span>
              <span>{street}, {zip} {city}</span>
            </div>
            {driveTime && (
              <div className="flex gap-2">
                <span className="text-[#d4a843]">🚗</span>
                <span>Nur {driveTime} Fahrtweg</span>
              </div>
            )}
            {openingHours && (
              <div className="flex gap-2">
                <span className="text-[#d4a843]">🕒</span>
                <span>{openingHours}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
