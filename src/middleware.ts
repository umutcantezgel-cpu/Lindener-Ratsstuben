import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userAgent } from 'next/server';
import { DEFAULT_LOCALE, isValidLocale } from '@/lib/locales';

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // --- Markdown Mirror Interceptor ---
  const isMarkdownExtension = pathname.endsWith('.md');
  const acceptsMarkdown = request.headers.get('accept')?.includes('text/markdown');

  // Prevent rewriting the actual api/markdown route (prevent infinite loop in edge cases)
  const isInternalRequest = request.headers.get('x-internal-markdown-request') === 'true';
  if (!pathname.startsWith('/api/') && !isInternalRequest && (isMarkdownExtension || acceptsMarkdown)) {
      if (isMarkdownExtension && !acceptsMarkdown) {
          // Strict Fallback: Regular browsers requesting .md get redirected to canonical HTML (301)
          let htmlPath = pathname.replace(/\.md$/, '');
          if (htmlPath.endsWith('/index')) htmlPath = htmlPath.replace(/\/index$/, '');
          return NextResponse.redirect(new URL(htmlPath || '/', request.url), 301);
      }
      
      // Rewrite to dynamic DOM-conversion engine
      let targetPath = isMarkdownExtension ? pathname.replace(/\.md$/, '') : pathname;
      if (targetPath.endsWith('/index')) targetPath = targetPath.replace(/\/index$/, '');
      const newUrl = new URL(`/api/markdown?path=${encodeURIComponent(targetPath || '/')}`, request.url);
      const response = NextResponse.rewrite(newUrl);
      
      // Set Vary header for CDN/Cache safety
      response.headers.set('Vary', 'Accept');
      return response;
  }

  // --- Locale Detection & Routing ---
  const pathnameSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathnameSegments[0];

  const pathnameHasLocale = isValidLocale(firstSegment || '');

  // If no locale in pathname, redirect to the relevant locale
  if (!pathnameHasLocale && pathname !== '/robots.txt' && pathname !== '/sitemap.xml') {
    const detectedLocale = getLocale(request);
    const newUrl = new URL(`/${detectedLocale}${pathname}${request.nextUrl.search}`, request.url);
    return NextResponse.redirect(newUrl);
  }

  // --- Visitor Tracking & Segmentation Logic ---
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
        '/((?!api|_next/static|_next/image|favicon.ico|images/|icons/|locales/|robots.txt|sitemap.xml|llms.txt).*)',
    ],
};
