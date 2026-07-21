'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';

/**
 * Locale-aware Link wrapper.
 * Automatically prepends the current locale prefix to relative paths,
 * preventing middleware 301 redirects (e.g. /menu → /de/menu).
 *
 * - Absolute URLs (https://...) are passed through unchanged.
 * - Paths that already start with a valid 2-letter locale prefix are unchanged.
 * - Hash-only links (#section) are passed through.
 * - The root path "/" maps to "/{locale}".
 */
type LocaleLinkProps = ComponentProps<typeof Link>;

export function LocaleLink({ href, ...rest }: LocaleLinkProps) {
    const pathname = usePathname();

    // Extract current locale from pathname (e.g., /de/menu → "de")
    const localeMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
    const locale = localeMatch ? localeMatch[1] : 'de';

    const resolvedHref = prefixLocale(String(href), locale);

    return <Link href={resolvedHref} {...rest} />;
}

function prefixLocale(href: string, locale: string): string {
    // Don't touch absolute URLs, hash links, or already-localized paths
    if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
    ) {
        return href;
    }

    // Already has a locale prefix like /de/... or /en/...
    if (/^\/[a-z]{2}(\/|$)/.test(href)) {
        return href;
    }

    // Root path
    if (href === '/') {
        return `/${locale}`;
    }

    // Normal path like /menu → /de/menu
    return `/${locale}${href}`;
}
