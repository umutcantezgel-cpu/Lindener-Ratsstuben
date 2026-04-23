'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { breadcrumbLabelMap } from '@/lib/data/navigation';
import { useTranslation } from '@/lib/i18n/use-translation';

interface BreadcrumbProps {
  /** Hide home link at the beginning */
  hideHome?: boolean;
  /** Additional CSS classes */
  className?: string;
}

interface BreadcrumbSegment {
  label: string;
  href: string;
  isLast: boolean;
}

/**
 * Dynamic breadcrumb navigation with JSON-LD BreadcrumbList schema.
 * Automatically derives segments from the current pathname.
 * Hidden on the homepage (/ route).
 *
 * WCAG AAA: Semantic <nav> with aria-label, <ol> structure,
 * aria-current="page" on last segment.
 */
export function Breadcrumb({ hideHome = false, className }: BreadcrumbProps) {
  const pathname = usePathname();
  const { t } = useTranslation('common');
  const { t: tNav } = useTranslation('navigation');

  // Don't render on homepage
  if (pathname === '/') return null;

  // Build breadcrumb segments from pathname
  const pathSegments = pathname.split('/').filter(Boolean);
  const segments: BreadcrumbSegment[] = [];

  // Home segment
  if (!hideHome) {
    segments.push({ label: tNav('nav.home') as string || 'Startseite', href: '/', isLast: false });
  }

  // Dynamic segments from path
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    const label =
      breadcrumbLabelMap[segment] ||
      segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());

    segments.push({ label, href: currentPath, isLast });
  });

  // Mark the actual last segment
  if (segments.length > 0) {
    segments.forEach((s, i) => {
      s.isLast = i === segments.length - 1;
    });
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: segments.map((segment, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: segment.label,
      item: segment.isLast
        ? undefined
        : `https://lindener-ratsstuben.de${segment.href}`,
    })),
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visual Breadcrumb */}
      <nav
        aria-label={t('aria.breadcrumb') as string}
        className={cn('text-sm text-text-secondary', className)}
      >
        <ol className="flex items-center flex-wrap gap-1.5 m-0 p-0 list-none">
          {segments.map((segment, index) => (
            <li key={segment.href} className="flex items-center gap-1.5">
              {/* Separator */}
              {index > 0 && (
                <ChevronRight
                  className="w-3.5 h-3.5 text-text-tertiary flex-shrink-0"
                  aria-hidden="true"
                />
              )}

              {/* Segment */}
              {segment.isLast ? (
                <span
                  className="font-medium text-text-primary"
                  aria-current="page"
                >
                  {segment.label}
                </span>
              ) : (
                <Link
                  href={segment.href}
                  className="hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  {index === 0 && !hideHome && (
                    <Home className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                  {segment.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
