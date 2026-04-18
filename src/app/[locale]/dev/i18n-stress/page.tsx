'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ALLOWED_LOCALES } from '@/lib/locales';
import { isRTL } from '@/lib/i18n/rtl';

export default function I18nStressTestPage() {
  const { t } = useTranslation(['common', 'menu', 'faq']);
  const [selectedLocale, setSelectedLocale] = useState('de');

  const testKeys = [
    'common:cookie.description',
    'common:button.reserve_table',
    'common:error.not_found_description',
    'menu:menu.title',
    'faq:faq.0.answer'
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary">i18n Stress & UI Validation Test</h1>
      
      <div className="mb-8 p-6 bg-white shadow-sm border border-neutral-200 rounded-2xl">
        <label htmlFor="locale-select" className="block text-sm font-medium mb-2">Select Target Locale for Comparison</label>
        <select 
          id="locale-select"
          value={selectedLocale}
          onChange={(e) => setSelectedLocale(e.target.value)}
          className="w-full p-3 border border-neutral-300 rounded-xl bg-neutral-50"
        >
          {ALLOWED_LOCALES.map(l => (
            <option key={l} value={l}>{l} {isRTL(l) ? '(RTL)' : ''}</option>
          ))}
        </select>
      </div>

      <div className="space-y-12">
        {testKeys.map(key => (
          <div key={key} className="border border-neutral-200 rounded-3xl overflow-hidden bg-white">
            <div className="bg-neutral-100 p-4 border-b border-neutral-200">
              <code className="text-sm font-mono text-secondary">{key}</code>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Baseline (de) */}
              <div className="p-6 border-b md:border-b-0 md:border-r border-neutral-200">
                <span className="inline-block px-3 py-1 bg-neutral-200 text-xs font-semibold rounded-full mb-4">de (Baseline)</span>
                <p className="text-base text-neutral-800 leading-relaxed break-words" dir="ltr">
                  {t(key, { lng: 'de', defaultValue: 'Missing' })}
                </p>
                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <button className="w-full py-3 px-4 bg-primary text-white rounded-xl font-medium">
                    {t(key, { lng: 'de', defaultValue: 'Missing' })}
                  </button>
                </div>
              </div>

              {/* Target Locale */}
              <div className={`p-6 ${isRTL(selectedLocale) ? 'bg-secondary/5' : ''}`}>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-4">
                  {selectedLocale} {isRTL(selectedLocale) ? '(RTL)' : ''}
                </span>
                <p 
                  className="text-base text-neutral-800 leading-relaxed break-words" 
                  dir={isRTL(selectedLocale) ? 'rtl' : 'ltr'}
                >
                  {t(key, { lng: selectedLocale, defaultValue: 'Missing' })}
                </p>
                <div className="mt-6 pt-4 border-t border-neutral-100">
                  <button 
                    dir={isRTL(selectedLocale) ? 'rtl' : 'ltr'}
                    className="w-full py-3 px-4 bg-secondary text-white rounded-xl font-medium"
                  >
                    {t(key, { lng: selectedLocale, defaultValue: 'Missing' })}
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
