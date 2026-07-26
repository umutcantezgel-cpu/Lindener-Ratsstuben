# Handoff Report — Explorer 1 (Milestone 1)

## 1. Observation

### A. Routing Architecture & Layout Files
- **App Router Structure**: Next.js 14+ App Router located in `src/app/[locale]/`.
- **Locale Registry (`src/lib/locales.ts`)**:
  - `ALLOWED_LOCALES` (lines 1-5) & `ACTIVE_LOCALES` (lines 9-13): Array of 25 supported locales: `['de', 'en', 'it', 'tr', 'fr', 'es', 'pt', 'ru', 'nl', 'pl', 'ja', 'zh', 'ko', 'ar', 'hi', 'uk', 'cs', 'sv', 'da', 'fi', 'no', 'el', 'hu', 'ro', 'hr']`.
  - `DEFAULT_LOCALE` (line 15): `'de'`.
  - `RTL_LOCALES` (line 47): `['ar']`.
- **Middleware Routing (`src/middleware.ts`)**:
  - Checks if the requested path starts with a valid locale (`pathnameHasLocale`, lines 109-112).
  - If a locale is missing and path is not `/robots.txt` or `/sitemap.xml`, redirects to `/{detectedLocale}/{pathname}` (lines 115-119).
  - Excludes static assets and internal paths via `config.matcher` (lines 201-205).
- **Root Layout (`src/app/[locale]/layout.tsx`)**:
  - `generateStaticParams()` (lines 58-60) generates static params for all 25 locales.
  - Baseline `generateMetadata()` (lines 62-100) configures default title, description, alternates, and root `robots` rule:
    ```ts
    robots: {
      index: ['de', 'en'].includes(locale),
      follow: ['de', 'en'].includes(locale),
      googleBot: {
        index: ['de', 'en'].includes(locale),
        follow: ['de', 'en'].includes(locale),
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
    ```
- **Sub-layouts**:
  - `src/app/[locale]/admin/mittagskarte/layout.tsx` (lines 3-9): `robots: { index: false, follow: false }`.
  - `src/app/[locale]/flyer/layout.tsx` (lines 3-9): `robots: { index: false, follow: false }`.
  - `src/app/sanity/layout.tsx`: `robots: { index: false, follow: false }`.

### B. i18n System
- **Dictionary Files**: Managed in `locales/[locale]/[namespace].json` (e.g. `meta.json`, `pages.json`, `legal.json`, `common.json`, `navigation.json`).
- **Translation Utility**: `getTranslations(locale, namespace)` in `src/lib/i18n/get-translations.ts`.
- **Provider & Links**: `I18nProvider` (`src/lib/i18n/I18nProvider.tsx`) injects dictionary into Client components; `LocaleLink` (`src/components/ui/LocaleLink.tsx`) automatically prepends `/{locale}` to internal paths.

### C. Page Routes & Metadata Mapping for `/fr` and `/ar`
Every page route under `src/app/[locale]/` dynamically matches all locales, including `/fr` and `/ar`:
1. `/` (Home) -> `src/app/[locale]/page.tsx`
2. `/about` -> `src/app/[locale]/about/page.tsx`
3. `/contact` -> `src/app/[locale]/contact/page.tsx`
4. `/gallery` -> `src/app/[locale]/gallery/page.tsx`
5. `/kegelbahn` -> `src/app/[locale]/kegelbahn/page.tsx`
6. `/menu` -> `src/app/[locale]/menu/page.tsx`
7. `/reservation` -> `src/app/[locale]/reservation/page.tsx`
8. `/agb` -> `src/app/[locale]/agb/page.tsx`
9. `/impressum` -> `src/app/[locale]/impressum/page.tsx`
10. `/datenschutz` -> `src/app/[locale]/datenschutz/page.tsx`
11. `/cookies` -> `src/app/[locale]/cookies/page.tsx`
12. `/widerruf` -> `src/app/[locale]/widerruf/page.tsx`
13. `/cookie-richtlinie` -> `src/app/[locale]/cookie-richtlinie/page.tsx`
14. `/barrierefreiheit` -> `src/app/[locale]/barrierefreiheit/page.tsx`
15. `/flyer` -> `src/app/[locale]/flyer/page.tsx`
16. `/admin/mittagskarte` -> `src/app/[locale]/admin/mittagskarte/page.tsx`
17. `/admin/saisonal` -> `src/app/[locale]/admin/saisonal/page.tsx`
18. `/menu/print` -> `src/app/[locale]/menu/print/page.tsx`
19. `/menu/print/seasonal` -> `src/app/[locale]/menu/print/seasonal/page.tsx`

### D. Legal Pages Inspection (AGB, Impressum, Datenschutz, Cookies, Widerruf)
- **Text Loading Mechanism**: All 5 legal pages (`agb/page.tsx`, `impressum/page.tsx`, `datenschutz/page.tsx`, `cookies/page.tsx`, `widerruf/page.tsx`) have their body content **100% hardcoded in German in JSX**. They do not pull body text from JSON translation files.
- **Current `robots` Configuration in Legal Pages**:
  - `agb/page.tsx` (line 15): `robots: ['de', 'en'].includes(locale) ? 'index, follow' : 'noindex, follow'`
  - `impressum/page.tsx` (line 15): `robots: ['de', 'en'].includes(locale) ? 'index, follow' : 'noindex, follow'`
  - `datenschutz/page.tsx` (line 15): `robots: ['de', 'en'].includes(locale) ? 'index, follow' : 'noindex, follow'`
  - `cookies/page.tsx` (line 15): `robots: ['de', 'en'].includes(locale) ? 'index, follow' : 'noindex, follow'`
  - `widerruf/page.tsx` (line 15): `robots: ['de', 'en'].includes(locale) ? 'index, follow' : 'noindex, follow'`
- **Current Alternates & Canonical Helper (`src/lib/seo/metadata.ts`)**:
  - `getAlternates(locale, path)` sets `canonical: /${locale}/${cleanPath}`.
- **Cause of Duplicate Content (217 errors)**:
  For `/en/agb`, `/en/impressum`, `/en/datenschutz`, `/en/cookies`, `/en/widerruf`:
  1. `locale` is `'en'`.
  2. `robots` resolves to `'index, follow'`.
  3. `canonical` resolves to `/en/agb` (self-referencing).
  4. The page body renders 100% German text (identical to `/de/agb`).
  5. Search engine crawlers index `/en/agb` as a duplicate of `/de/agb` with unique self-referencing canonicals, causing 217 duplicate content errors.

---

## 2. Logic Chain

1. **Routing & Locales**: Dynamic `[locale]` folder handles 25 locales. Middleware enforces locale prefixing, falling back to `/de` if unprovided.
2. **Metadata Cascade**: Baseline `robots` rule in `src/app/[locale]/layout.tsx` sets `index: false` for any locale not in `['de', 'en']`. Therefore, standard routes for `/fr` and `/ar` automatically inherit `noindex, nofollow` from `layout.tsx`.
3. **Legal Page Override**: The 5 legal pages explicitly export `robots: ['de', 'en'].includes(locale) ? 'index, follow' : 'noindex, follow'` in `generateMetadata`. For `/fr` and `/ar`, this evaluates to `'noindex, follow'`.
4. **Duplicate Content Mechanism**: For `/en` legal pages, `['de', 'en'].includes('en')` evaluates to `true`, marking `/en` legal pages as `index, follow` with canonical pointing to `/en/...`. But the content is 100% German. Search engines detect duplicate German text on `/en` vs `/de`.
5. **Legal Notice Intent**: `locales/en/legal.json` confirms German legal text is mandatory for legal certainty under German jurisdiction. English legal pages are not translated.
6. **Actionable Fix for M2**:
   - For `/fr` and `/ar` (and all non-de/en routes): Ensure `robots: { index: false }` (`noindex`) is emitted consistently across root layout and all page-level metadata overrides.
   - For `/en` legal pages (AGB, Impressum, Datenschutz, Cookies, Widerruf): Resolve duplicate content by either:
     a. Setting `canonical` for non-German legal pages to point directly to the German version (`/de/agb`, `/de/impressum`, etc.), OR
     b. Setting `robots: { index: locale === 'de', follow: true }` so only `/de` legal pages are indexed in search engines.

---

## 3. Caveats

- **Sanity CMS Integration**: The menu page (`src/app/[locale]/menu/page.tsx`) queries Sanity CMS for categories/dishes, but falls back gracefully to local SSOT menu data if Sanity is unavailable.
- **Dynamic Regional Articles**: `sitemap.ts` includes logic for markdown regional articles (`/ausflug`, `/freizeit`, `/region`, `/business`), which are dynamic content routes built at build-time if markdown files exist.
- No other caveats identified.

---

## 4. Conclusion

1. **Routing, Layout & i18n Architecture Mapped**: Next.js App Router dynamic `[locale]` handles 25 locales with `de` default. Root layout baseline metadata enforces indexing ONLY for `['de', 'en']`.
2. **`/fr` and `/ar` Noindex Status**: Baseline layout sets `index: false` for `/fr` and `/ar`. Legal pages explicitly return `'noindex, follow'` for non-de/en locales.
3. **Duplicate Content Root Cause & Fix**: `/en` legal pages share 100% German text with `/de` while being set to `index, follow` with self-referencing `/en` canonicals. The fix for M2 is to update `agb`, `impressum`, `datenschutz`, `cookies`, `widerruf` metadata so that non-German legal pages set `canonical` pointing to `/de` (or set `index: false` for non-`de` legal pages).

---

## 5. Verification Method

1. **Build Verification**:
   Run `npm run build` from project root to ensure zero build errors or TypeScript issues.
2. **Metadata Inspection**:
   Inspect generated HTML metadata for `/fr`, `/ar`, and `/en` legal routes:
   - Check `<meta name="robots" content="noindex...">` on `/fr` and `/ar` pages.
   - Check `<link rel="canonical" href="...">` on `/en/agb`, `/en/impressum`, `/en/datenschutz`, `/en/cookies`, `/en/widerruf`.
