import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userAgent } from 'next/server';
import { DEFAULT_LOCALE, isValidLocale } from '@/lib/locales';

// ═══════════════════════════════════════════════════════════════
// BROWSER USER-AGENT HEURISTIC
// Used to distinguish real browsers from AI/CLI crawlers when
// a .md URL is requested without an Accept: text/markdown header.
// ═══════════════════════════════════════════════════════════════
const BROWSER_UA_PATTERNS = [
  /Chrome\//i, /Firefox\//i, /Safari\//i, /Edg\//i,
  /Opera\//i, /OPR\//i, /Vivaldi\//i, /Brave\//i,
  /MSIE/i, /Trident\//i,
];

function isBrowserUserAgent(uaString: string | null): boolean {
  if (!uaString) return false;
  return BROWSER_UA_PATTERNS.some((pattern) => pattern.test(uaString));
}

// ═══════════════════════════════════════════════════════════════
// LOCALE DETECTION
// ═══════════════════════════════════════════════════════════════
function getLocale(request: NextRequest): string {
  // 1. Explicit locale from cookie
  const cookieLocale = request.cookies.get('X-Preferred-Locale')?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Accept-Language header
  const acceptLang = request.headers.get('accept-language');
  if (acceptLang) {
    const langs = acceptLang.split(',').map((l) => l.split(';')[0].trim());
    for (const lang of langs) {
      const baseLang = lang.split('-')[0].toLowerCase();
      if (isValidLocale(baseLang)) {
        return baseLang;
      }
    }
  }

  // 3. Fallback
  return DEFAULT_LOCALE;
}

// ═══════════════════════════════════════════════════════════════
// MIDDLEWARE ENTRY POINT
// ═══════════════════════════════════════════════════════════════
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ───────────────────────────────────────────────────────────
  // GUARD 1: MARKDOWN MIRROR INTERCEPTOR (FIRST PRIORITY)
  // Must run BEFORE locale detection to catch bare paths
  // like /about.md before they get redirected to /de/about.md
  // ───────────────────────────────────────────────────────────
  const isMarkdownExtension = pathname.endsWith('.md');
  const acceptHeader = request.headers.get('accept') || '';
  const acceptsMarkdown = acceptHeader.includes('text/markdown');
  const isInternalRequest = request.headers.get('x-internal-markdown-request') === 'true';
  const uaString = request.headers.get('user-agent');

  if (!isInternalRequest && (isMarkdownExtension || acceptsMarkdown)) {
    // ── STRICT FALLBACK: Browser requesting .md → 301 to canonical HTML ──
    // A request has .md extension BUT does not send Accept: text/markdown.
    // If the User-Agent looks like a real browser, redirect to HTML.
    if (isMarkdownExtension && !acceptsMarkdown) {
      // Even without Accept header, non-browser clients (curl, bots) may
      // intentionally request .md — only redirect known browsers.
      if (isBrowserUserAgent(uaString) || (!uaString && !acceptsMarkdown)) {
        let htmlPath = pathname.replace(/\.md$/, '');
        if (htmlPath.endsWith('/index')) htmlPath = htmlPath.replace(/\/index$/, '');
        const redirectResponse = NextResponse.redirect(new URL(htmlPath || '/', request.url), 301);
        redirectResponse.headers.set('Vary', 'Accept');
        return redirectResponse;
      }
    }

    // ── REWRITE: Route to dynamic DOM-conversion engine ──
    let targetPath = isMarkdownExtension ? pathname.replace(/\.md$/, '') : pathname;
    if (targetPath.endsWith('/index')) targetPath = targetPath.replace(/\/index$/, '');
    const newUrl = new URL(`/api/markdown`, request.url);
    newUrl.searchParams.set('path', targetPath || '/');
    const response = NextResponse.rewrite(newUrl, {
      request: {
        headers: new Headers({
          ...Object.fromEntries(request.headers.entries()),
          'x-markdown-target-path': targetPath || '/',
        }),
      },
    });

    // CDN/Cache safety: different content for same URL based on Accept header
    response.headers.set('Vary', 'Accept');
    return response;
  }

  // ───────────────────────────────────────────────────────────
  // GUARD 2: LOCALE DETECTION & ROUTING
  // ───────────────────────────────────────────────────────────
  const pathnameSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathnameSegments[0];

  const pathnameHasLocale = isValidLocale(firstSegment || '');

  // If no locale in pathname, redirect to the relevant locale
  if (!pathnameHasLocale && pathname !== '/robots.txt' && pathname !== '/sitemap.xml') {
    const detectedLocale = getLocale(request);
    const newUrl = new URL(`/${detectedLocale}${pathname}${request.nextUrl.search}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // ───────────────────────────────────────────────────────────
  // GUARD 3: VISITOR TRACKING & SEGMENTATION LOGIC
  // ───────────────────────────────────────────────────────────
  const { device } = userAgent(request);
  const isMobile = device.type === 'mobile';
  const isTablet = device.type === 'tablet';
  let deviceType = 'desktop';

  if (isMobile) {
      deviceType = 'mobile';
  } else if (isTablet) {
      deviceType = 'tablet';
  }

  const cookies = request.cookies;
  const conversionStatus = cookies.get('conversion_status')?.value;
  const entryType = cookies.get('entry_type')?.value;
  const visitorType = cookies.get('visitor_type')?.value || 'new';
  const visitedPagesStr = cookies.get('visited_pages')?.value || '0';
  let visitedPages = parseInt(visitedPagesStr, 10);
  
  if (request.headers.get('accept')?.includes('text/html')) {
      visitedPages += 1;
  }

  let currentVisitorType = visitorType;
  if (visitedPages > 1 && visitorType === 'new') {
      currentVisitorType = 'returning';
  }

  let segment = 'new-visitor';
  if (conversionStatus === 'contacted') {
      segment = 'converted';
  } else if (entryType === 'conversion_funnel') {
      segment = 'high-intent';
  } else if (entryType === 'service_click') {
      segment = 'service-interested';
  } else if (currentVisitorType === 'returning' && visitedPages >= 3) {
      segment = 'returning-explorer';
  } else if (entryType === 'blog' && visitedPages >= 5) {
      segment = 'blog-reader';
  }

  // Clone headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-device-type', deviceType);
  requestHeaders.set('x-visitor-segment', segment);
  
  // Set the locale header
  const locale = pathnameHasLocale ? firstSegment : DEFAULT_LOCALE;
  requestHeaders.set('x-locale', locale);

  const response = NextResponse.next({
      request: {
          headers: requestHeaders,
      },
  });

  // Write cookies
  response.cookies.set('device_type', deviceType, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
  });
  response.cookies.set('visitor_type', currentVisitorType, { maxAge: 60 * 60 * 24 * 365, path: '/' });
  response.cookies.set('visited_pages', visitedPages.toString(), { maxAge: 60 * 60 * 24 * 30, path: '/' });
  response.cookies.set('visitor_segment', segment, { httpOnly: false, path: '/' });

  // --- SWR Caching for Locale JSON files (Performance I18N-07) ---
  if (pathname.includes('/locales/') && pathname.endsWith('.json')) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=604800, stale-while-revalidate=86400'
    );
  }

  return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images/|icons/|locales/|robots.txt|sitemap.xml|llms.txt|sanity).*)',
    ],
};
