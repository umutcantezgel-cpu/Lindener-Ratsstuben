'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, Check, Search } from 'lucide-react';
import { clsx } from 'clsx';
import { ALLOWED_LOCALES, LOCALE_DISPLAY_NAMES, isRTL, type LocaleType } from '@/lib/locales';

// Flag emojis for each locale
const LOCALE_FLAGS: Record<string, string> = {
  de: '🇩🇪', en: '🇬🇧', it: '🇮🇹', tr: '🇹🇷', fr: '🇫🇷', es: '🇪🇸', pt: '🇵🇹', ru: '🇷🇺',
  nl: '🇳🇱', pl: '🇵🇱', ja: '🇯🇵', zh: '🇨🇳', ko: '🇰🇷', ar: '🇸🇦', hi: '🇮🇳', uk: '🇺🇦',
  cs: '🇨🇿', sv: '🇸🇪', da: '🇩🇰', fi: '🇫🇮', no: '🇳🇴', el: '🇬🇷', hu: '🇭🇺', ro: '🇷🇴', hr: '🇭🇷'
};

// Native language names
const LOCALE_NATIVE_NAMES: Record<string, string> = {
  de: 'Deutsch', en: 'English', it: 'Italiano', tr: 'Türkçe', fr: 'Français', es: 'Español',
  pt: 'Português', ru: 'Русский', nl: 'Nederlands', pl: 'Polski', ja: '日本語', zh: '中文',
  ko: '한국어', ar: 'العربية', hi: 'हिन्दी', uk: 'Українська', cs: 'Čeština', sv: 'Svenska',
  da: 'Dansk', fi: 'Suomi', no: 'Norsk', el: 'Ελληνικά', hu: 'Magyar', ro: 'Română', hr: 'Hrvatski'
};

/**
 * Premium Language Switcher — Dropdown with flags, native names, and search.
 * Supports header and footer variants with distinct styling.
 */
export const LanguageSwitcher: React.FC<{ variant?: 'header' | 'footer' | 'mobile' }> = ({ variant = 'header' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Extract current locale from pathname
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = (segments[0] && ALLOWED_LOCALES.includes(segments[0] as LocaleType))
    ? segments[0] as LocaleType
    : 'de';

  const pathWithoutLocale = '/' + segments.slice(1).join('/');

  // Filter locales by search
  const filteredLocales = ALLOWED_LOCALES.filter(locale => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      locale.includes(q) ||
      LOCALE_DISPLAY_NAMES[locale]?.toLowerCase().includes(q) ||
      LOCALE_NATIVE_NAMES[locale]?.toLowerCase().includes(q)
    );
  });

  const switchLocale = (newLocale: LocaleType) => {
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    document.cookie = `X-Preferred-Locale=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    document.documentElement.dir = isRTL(newLocale) ? 'rtl' : 'ltr';
    document.documentElement.lang = newLocale;
    setIsOpen(false);
    setSearchQuery('');
    router.push(newPath);
  };

  // Focus search on open
  useEffect(() => {
    if (isOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsOpen(false); setSearchQuery(''); }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const isFooter = variant === 'footer';
  const isMobile = variant === 'mobile';

  return (
    <div ref={dropdownRef} className="relative inline-block">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-2 rounded-xl transition-all font-medium group',
          isFooter
            ? 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary px-3 py-2 text-sm'
            : isMobile
              ? 'text-text-secondary hover:text-primary w-full px-4 py-3 text-base justify-between bg-bg-secondary rounded-xl'
              : 'text-text-secondary hover:text-primary hover:bg-primary/5 px-3 py-2 text-sm'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Change language"
      >
        <span className="flex items-center gap-2">
          <span className="text-lg leading-none">{LOCALE_FLAGS[currentLocale]}</span>
          {isMobile ? (
            <span>{LOCALE_NATIVE_NAMES[currentLocale]}</span>
          ) : (
            <span className="uppercase font-semibold">{currentLocale}</span>
          )}
        </span>
        <ChevronDown className={clsx('w-4 h-4 transition-transform duration-200', isOpen && 'rotate-180')} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={clsx(
            'absolute z-50 mt-2 rounded-2xl shadow-2xl border backdrop-blur-xl overflow-hidden',
            isFooter
              ? 'bottom-full mb-2 bg-surface/98 border-border w-72 right-0'
              : isMobile
                ? 'left-0 right-0 bg-surface border-border w-full'
                : 'top-full bg-surface/98 border-border w-80 right-0',
          )}
          role="listbox"
          aria-label="Available languages"
        >
          {/* Search */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full ps-9 pe-3 py-2.5 text-sm rounded-xl outline-none transition-colors bg-bg-secondary text-text-primary placeholder-text-tertiary focus:ring-2 focus:ring-primary/30 focus:bg-surface"
              />
            </div>
          </div>

          {/* Language List */}
          <div className="max-h-80 overflow-y-auto py-1 scrollbar-thin">
            {filteredLocales.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-text-tertiary">
                No results
              </div>
            ) : (
              filteredLocales.map((locale) => (
                <button
                  key={locale}
                  role="option"
                  aria-selected={locale === currentLocale}
                  onClick={() => switchLocale(locale)}
                  className={clsx(
                    'w-full text-start px-4 py-3 text-sm flex items-center gap-3 transition-colors group/item',
                    locale === currentLocale
                      ? 'bg-primary/8 text-primary'
                      : 'text-text-secondary hover:bg-bg-secondary hover:text-primary'
                  )}
                >
                  {/* Flag */}
                  <span className="text-xl leading-none w-7 text-center flex-shrink-0">
                    {LOCALE_FLAGS[locale]}
                  </span>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{LOCALE_NATIVE_NAMES[locale]}</div>
                    <div className="text-xs truncate text-text-tertiary">
                      {LOCALE_DISPLAY_NAMES[locale]}
                    </div>
                  </div>

                  {/* Active check + ISO code */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-mono uppercase text-border">
                      {locale}
                    </span>
                    {locale === currentLocale && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
