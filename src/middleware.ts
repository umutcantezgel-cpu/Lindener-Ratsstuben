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
// MAINTENANCE PAGE (INLINE HTML)
// Served directly from middleware — zero route dependencies.
// ═══════════════════════════════════════════════════════════════
const MAINTENANCE_HTML = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="robots" content="noindex,nofollow"/>
  <title>Wartungsarbeiten | Lindener Ratsstuben</title>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500&display=swap" rel="stylesheet"/>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Cormorant Garamond',Georgia,serif;background:#1a1814;color:#f5f0e8;min-height:100vh;display:flex;align-items:center;justify-content:center;-webkit-font-smoothing:antialiased}
    .w{position:relative;width:100%;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem 1rem}
    .bg{position:fixed;inset:0;opacity:.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");pointer-events:none;z-index:0}
    .gl{width:min(500px,80%);height:1px;background:linear-gradient(90deg,transparent,#C5A880,transparent);opacity:.5}
    .c{position:relative;z-index:1;max-width:560px;width:100%;padding:3.5rem 2.5rem;text-align:center}
    .bp{font-family:'Inter',sans-serif;font-size:.65rem;font-weight:500;letter-spacing:4px;text-transform:uppercase;color:#C5A880;display:block;margin-bottom:.5rem}
    .bn{font-family:'Cinzel',serif;font-size:2rem;font-weight:700;color:#f5f0e8;letter-spacing:2px;line-height:1.2;margin:0}
    .bt{font-family:'Cormorant Garamond',serif;font-size:1rem;font-style:italic;color:#a09888;display:block;margin-top:.4rem;letter-spacing:1px}
    .d{display:flex;align-items:center;justify-content:center;gap:12px;margin:1.5rem 0}
    .dl{flex:1;max-width:100px;height:1px;background:linear-gradient(90deg,transparent,#C5A880,transparent)}
    .dd{color:#C5A880;font-size:.7rem}
    .mt{font-family:'Cinzel',serif;font-size:1.15rem;font-weight:600;color:#C5A880;letter-spacing:1px;margin-bottom:1rem}
    .mx{font-size:1.05rem;line-height:1.7;color:#c5bfb4;margin-bottom:1.5rem}
    .cl{font-family:'Inter',sans-serif;font-size:.75rem;font-weight:500;letter-spacing:1px;text-transform:uppercase;color:#8a8274;margin-bottom:1rem}
    .cp{display:inline-flex;align-items:center;gap:10px;font-family:'Cinzel',serif;font-size:1.4rem;font-weight:600;color:#f5f0e8;text-decoration:none;letter-spacing:1.5px;padding:.6rem 1.5rem;border:1px solid rgba(197,168,128,.3);border-radius:4px;transition:all .3s ease}
    .cp:hover{border-color:#C5A880;background:rgba(197,168,128,.08);color:#C5A880}
    .cp svg{color:#C5A880}
    .hl{font-family:'Inter',sans-serif;font-size:.65rem;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#C5A880;margin:1.5rem 0 .8rem}
    .hg{display:grid;grid-template-columns:auto 1fr;gap:.3rem 1.5rem;max-width:360px;margin:0 auto;font-size:.95rem}
    .dy{text-align:right;color:#c5bfb4;font-weight:600}
    .tm{text-align:left;color:#a09888}
    .cd{color:#6a6358;font-style:italic}
    .ad{font-family:'Inter',sans-serif;font-size:.75rem;color:#6a6358;letter-spacing:1px;margin-top:1.5rem}
    @media(max-width:480px){.bn{font-size:1.5rem}.mt{font-size:1rem}.mx{font-size:.95rem}.cp{font-size:1.1rem;padding:.5rem 1rem}.c{padding:2.5rem 1.5rem}}
  </style>
</head>
<body>
  <div class="w">
    <div class="bg"></div>
    <div class="gl"></div>
    <main class="c">
      <div style="margin-bottom:1.5rem">
        <span class="bp">Restaurant</span>
        <h1 class="bn">Lindener Ratsstuben</h1>
        <span class="bt">Deutsch · Italienische Küche</span>
      </div>
      <div class="d"><span class="dl"></span><span class="dd">◆</span><span class="dl"></span></div>
      <h2 class="mt">Wir überarbeiten unsere Webseite</h2>
      <p class="mx">Unsere digitale Speisekarte und Webseite werden gerade für Sie erneuert.<br/>Bitte haben Sie noch etwas Geduld – wir sind bald wieder online.</p>
      <p class="cl">Für Reservierungen und Bestellungen erreichen Sie uns unter:</p>
      <div style="margin-bottom:1.5rem">
        <a href="tel:+49640364556" class="cp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          06403 - 64556
        </a>
      </div>
      <p class="hl">Öffnungszeiten</p>
      <div class="hg">
        <span class="dy">Di – Sa</span><span class="tm">12:00 – 14:30 &amp; 17:30 – 22:30</span>
        <span class="dy">Sonntag</span><span class="tm">12:00 – 14:30 &amp; 17:30 – 21:00</span>
        <span class="dy cd">Montag</span><span class="tm cd">Ruhetag</span>
      </div>
      <p class="ad">Konrad-Adenauer-Straße 26 · 35440 Linden</p>
    </main>
    <div class="gl"></div>
  </div>
</body>
</html>`;

// ═══════════════════════════════════════════════════════════════
// MIDDLEWARE ENTRY POINT
// ═══════════════════════════════════════════════════════════════
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ───────────────────────────────────────────────────────────
  // GUARD 0: MAINTENANCE MODE
  // Returns inline HTML directly (no route dependency).
  // Bypass via ?bypass=<secret> sets a 7-day cookie.
  // ───────────────────────────────────────────────────────────
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';

  if (isMaintenanceMode) {
    const bypassSecret = process.env.MAINTENANCE_BYPASS_SECRET || 'lindener2026';
    const bypassParam = request.nextUrl.searchParams.get('bypass');
    const bypassCookie = request.cookies.get('maintenance_bypass')?.value;

    // If visitor provides the correct bypass param, set a cookie and let them through
    if (bypassParam === bypassSecret) {
      const url = request.nextUrl.clone();
      url.searchParams.delete('bypass');
      const response = NextResponse.redirect(url);
      response.cookies.set('maintenance_bypass', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return response;
    }

    // If visitor has the bypass cookie, let them through normally
    if (bypassCookie === 'true') {
      // Fall through to normal middleware logic
    } else {
      // Serve maintenance page inline (HTTP 503)
      return new NextResponse(MAINTENANCE_HTML, {
        status: 503,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Retry-After': '3600',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      });
    }
  }
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
