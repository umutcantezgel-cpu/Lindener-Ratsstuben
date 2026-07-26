# Handoff Report: Milestone 1 — Task 2 & Task 3 Technical SEO & Heading Analysis

## 1. Observation

Direct observations from codebase inspection across `/Users/umurey/Downloads/Lindener-Ratsstuben-main`:

### Task 1: Heading Hierarchy Issues Across 17 Pages

1. **`src/app/[locale]/page.tsx` & `src/app/[locale]/PageClient.tsx`**
   - Line 35 (`src/app/[locale]/page.tsx`): `<h1 className="sr-only">{tMeta('home.title', 'Restaurant Lindener Ratsstuben')}</h1>`
   - Line 59 (`src/app/[locale]/PageClient.tsx`): `<h2 className="text-2xl md:text-3xl font-display font-medium text-text-primary/80 text-center tracking-tight">{tMeta('home.title') as string}</h2>` (renders duplicate H2 of H1 text)
   - `locales/de/seo.json:2` ("home" key): Contains `<h2>Willkommen in den Lindener Ratsstuben: Ihre erste Adresse für Internationale Küche Linden</h2>` followed by `<p>` paragraphs with no `<h3>` subheadings.

2. **`src/app/[locale]/about/page.tsx` & `src/app/[locale]/about/AboutClient.tsx`**
   - Line 43 (`src/app/[locale]/about/page.tsx`): `<h1 className="sr-only">{tMeta('about.title', 'Über Uns')}</h1>`
   - Line 32 (`src/app/[locale]/about/AboutClient.tsx`): `<h2 className="text-5xl font-display font-bold text-text-main mb-6">{t('about.headline') as string}</h2>` (renders headline tag as H2 directly under H1, conflicting with structural section H2 tags at lines 53, 80, 104).

3. **`src/app/[locale]/agb/page.tsx` & `src/components/legal/LegalPageLayout.tsx`**
   - Line 35 (`LegalPageLayout.tsx`): `<h1 className="sr-only">{title}</h1>`
   - Line 44 (`LegalPageLayout.tsx`): `<h2 className="text-3xl md:text-5xl font-display font-medium text-text-primary tracking-tight" itemProp="name">{title}</h2>` (duplicate title H2 under H1)
   - Lines 26, 37, 56, 81, 92, 106, 114, 125, 139, 144 (`agb/page.tsx`): Render 10 `<h2>` legal section headings without any `<h3>` subheadings.
   - `locales/de/seo.json:11` ("agb" key): `<h2>` without `<h3>` subheadings.

4. **`src/app/[locale]/barrierefreiheit/page.tsx`**
   - Line 35: `<h1 className="sr-only">{title}</h1>`
   - Line 38: `<h2 className="text-3xl md:text-4xl ...">{title}</h2>` (duplicate title H2)
   - Lines 52, 66, 79, 98, 111, 125, 147: Render 7 `<h2>` section headings with no `<h3>` subheadings.

5. **`src/app/[locale]/contact/page.tsx` & `src/app/[locale]/contact/PageClient.tsx`**
   - Line 36 (`contact/page.tsx`): `<h1 className="sr-only">{tMeta('contact.title', 'Kontakt')}</h1>`
   - Line 34 (`contact/PageClient.tsx`): `<h2 className="text-3xl md:text-4xl ...">{t('contact.title') as string}</h2>` (duplicate title H2)
   - `locales/de/seo.json:7` ("contact" key): `<h2>` without `<h3>` subheadings.

6. **`src/app/[locale]/cookie-richtlinie/page.tsx`**
   - Line 34: `<h1 className="sr-only">{title}</h1>`
   - Line 37: `<h2 className="text-3xl md:text-4xl ...">{title}</h2>` (duplicate title H2)
   - Lines 51, 66, 109, 148, 159: Render `<h2>` headings without `<h3>` subheadings.

7. **`src/app/[locale]/cookies/page.tsx`**
   - Line 35 (`LegalPageLayout.tsx`): `<h1 className="sr-only">{title}</h1>`
   - Line 44 (`LegalPageLayout.tsx`): `<h2 ...>{title}</h2>` (duplicate title H2)
   - `locales/de/seo.json:12` ("cookies" key): `<h2>` without `<h3>` subheadings.

8. **`src/app/[locale]/datenschutz/page.tsx`**
   - Line 35 (`LegalPageLayout.tsx`): `<h1 className="sr-only">{title}</h1>`
   - Line 44 (`LegalPageLayout.tsx`): `<h2 ...>{title}</h2>` (duplicate title H2)
   - Lines 32, 36, 40, 44 (`datenschutz/page.tsx`): `<h4>` elements placed directly under `<h3>Datenerfassung auf dieser Website</h3>` (lines 32-44), causing an invalid heading skip.
   - `locales/de/seo.json:10` ("datenschutz" key): `<h2>` without `<h3>` subheadings.

9. **`src/app/[locale]/flyer/page.tsx`**
   - Lines 106-453: Root `<div className="flyer-root">` contains panels with `<h2>` and `<h3>` tags but has NO `<h1>` tag at all.

10. **`src/app/[locale]/gallery/page.tsx` & `src/app/[locale]/gallery/PageClient.tsx`**
    - Line 41 (`gallery/page.tsx`): `<h1 className="sr-only">{tMeta('gallery.title', 'Galerie')}</h1>`
    - Line 55 (`gallery/PageClient.tsx`): `<h2 className="text-3xl md:text-4xl ...">{t('gallery.title') as string}</h2>` (duplicate title H2)
    - `locales/de/seo.json:5` ("gallery" key): `<h2>` without `<h3>` subheadings.

11. **`src/app/[locale]/impressum/page.tsx`**
    - Line 35 (`LegalPageLayout.tsx`): `<h1 className="sr-only">{title}</h1>`
    - Line 44 (`LegalPageLayout.tsx`): `<h2 ...>{title}</h2>` (duplicate title H2)
    - Lines 26, 36, 52, 69 (`impressum/page.tsx`): `<h2>` section headings without `<h3>` subheadings.
    - `locales/de/seo.json:9` ("impressum" key): `<h2>` without `<h3>` subheadings.

12. **`src/app/[locale]/kegelbahn/page.tsx` & `src/components/kegelbahn/KegelHero.tsx`**
    - Line 37 (`kegelbahn/page.tsx`): `<h1 className="sr-only">{tMeta('kegelbahn.hero.title', 'Kegelbahn')}</h1>`
    - Line 25 (`KegelHero.tsx`): `<h2 className="text-4xl md:text-6xl ...">{t('kegelbahn.hero.title') as string}</h2>` (duplicate title H2)
    - `locales/de/seo.json:8` ("kegelbahn" key): `<h2>` without `<h3>` subheadings.

13. **`src/app/[locale]/menu/page.tsx` & `src/app/[locale]/menu/PageClient.tsx`**
    - Line 183 (`menu/page.tsx`): `<h1 className="sr-only">{tMeta('menu.title', 'Speisekarte')}</h1>`
    - Line 51 (`menu/PageClient.tsx`): `<h2 className="text-5xl ...">{t('menu.title') as string}</h2>` (duplicate title H2)
    - `locales/de/seo.json:4` ("menu" key): `<h2>` without `<h3>` subheadings.

14. **`src/app/[locale]/menu/print/page.tsx`**
    - Lines 23-205: Root `<div className="print-root">` renders printable menu pages using `DishCategory` (`<h2>`) but has NO `<h1>` tag at all.

15. **`src/app/[locale]/menu/print/seasonal/page.tsx`**
    - Lines 35-151: Root `<div className="print-root">` renders seasonal print layout using `<h2>` elements but has NO `<h1>` tag at all.

16. **`src/app/[locale]/reservation/page.tsx` & `src/app/[locale]/reservation/ReservationInteractive.tsx`**
    - Line 39 (`reservation/page.tsx`): `<h1 className="sr-only">{tMeta('reservation.title', 'Tisch reservieren & Eventlocation | Lindener Ratsstuben')}</h1>`
    - Line 191 (`ReservationInteractive.tsx`): `<h2 className="text-4xl md:text-5xl ...">{t('reservation.title', 'Tisch reservieren')}</h2>` (duplicate title H2)
    - `locales/de/seo.json:6` ("reservation" key): `<h2>` and `<h3>` tags in JSON block.

17. **`src/app/[locale]/widerruf/page.tsx`**
    - Line 35 (`LegalPageLayout.tsx`): `<h1 className="sr-only">{title}</h1>`
    - Line 44 (`LegalPageLayout.tsx`): `<h2 ...>{title}</h2>` (duplicate title H2)
    - `locales/de/seo.json:13` ("widerruf" key): `<h2>` without `<h3>` subheadings.

---

### Task 2: H1 Issues (2 Pages)

1. **Page 1: `src/app/[locale]/flyer/page.tsx`**
   - Line 106: `export default function Flyer8Page() { return ( <div className="flyer-root"> ...`
   - Observation: No `<h1>` tag exists on the page. Heading hierarchy starts directly at `<h2>` and `<h3>`.

2. **Page 2: `src/app/[locale]/menu/print/page.tsx`**
   - Line 23: `export default function PrintMenuPage() { return ( <div className="print-root"> ...`
   - Observation: No `<h1>` tag exists on the page. Printable menu starts with client cover `<h2>`.

---

### Task 3: Keyword Cannibalization (1 Page)

1. **Page: `src/app/[locale]/cookie-richtlinie/page.tsx` vs `src/app/[locale]/cookies/page.tsx`**
   - `src/app/[locale]/cookie-richtlinie/page.tsx:14-15`:
     ```typescript
     title: t('cookie_richtlinie.title', 'Cookie-Richtlinie | Lindener Ratsstuben'),
     description: t('cookie_richtlinie.description'),
     ```
   - `locales/de/meta.json:28-29`:
     ```json
     "cookie_richtlinie.title": "Cookie Richtlinie | Alle Details | Lindener Ratsstuben",
     "cookie_richtlinie.description": "Detaillierte Cookie Richtlinie der Lindener Ratsstuben. Informationen zu Cookies, Tracking und Ihren Einstellungsmöglichkeiten."
     ```
   - `src/app/[locale]/cookies/page.tsx:12-13`:
     ```typescript
     title: t('cookies.title', 'Cookies | Lindener Ratsstuben'),
     description: t('cookies.description'),
     ```
   - `locales/de/meta.json:24-25`:
     ```json
     "cookies.title": "Cookie Richtlinie | Transparenz | Lindener Ratsstuben",
     "cookies.description": "Cookie Richtlinie der Lindener Ratsstuben. Erfahren Sie, welche Cookies wir verwenden und wie Sie Ihre Einstellungen anpassen."
     ```
   - `src/components/layout/Footer.tsx:157`:
     ```tsx
     <LocaleLink href="/cookies" className="...">{(t('footer.cookies') || t('footer.cookie_policy') || 'Cookie-Richtlinie') as string}</LocaleLink>
     ```
   - Observation: Both `/cookies` and `/cookie-richtlinie` target the exact same keyword ("Cookie Richtlinie / Cookie Policy") with near-identical titles and meta descriptions, causing keyword cannibalization between two duplicate legal pages.

---

## 2. Logic Chain

1. **Heading Hierarchy Reasoning**:
   - Web crawlers (Googlebot, Bingbot) and screen readers evaluate heading tags strictly from H1 -> H2 -> H3 -> H4 in sequential order.
   - When a page contains an `<h1 className="sr-only">Title</h1>` followed immediately by an `<h2 className="...">Title</h2>` with identical text, search engines interpret the second header as redundant duplicate title text rather than a structural section divider.
   - On 10 pages (`home`, `menu`, `gallery`, `contact`, `kegelbahn`, `impressum`, `datenschutz`, `agb`, `widerruf`, `cookies`), `SeoContentBlock` renders HTML stored in `locales/*/seo.json`. In `locales/de/seo.json`, 10 of 12 keys contain `<h2>` headings but lack `<h3>` sub-headings, breaking the complete H1 -> H2 -> H3 hierarchy contract.
   - On `datenschutz/page.tsx`, `<h4>` tags are used directly under `<h3>Datenerfassung...</h3>`, skipping level 3 or causing incorrect sub-nesting.
   - On `/flyer`, `/menu/print`, and `/menu/print/seasonal`, no `<h1>` exists, so heading parsing starts at `<h2>` or `<h3>`.

2. **H1 Presence Reasoning**:
   - Technical SEO standards require every indexable page to have exactly one `<h1>` tag containing its focus keyword.
   - Inspection of all 17 public route files confirmed that `/flyer` and `/menu/print` lack `<h1>` elements entirely. Adding hidden `<h1 className="sr-only">...</h1>` tags containing the respective focus keywords fixes the missing H1 issue across both target pages.

3. **Keyword Cannibalization Reasoning**:
   - Keyword cannibalization occurs when two pages on the same domain compete for identical keywords in search indexes.
   - Route `/cookies` and route `/cookie-richtlinie` both render Cookie Policy pages and use meta titles containing "Cookie Richtlinie | ... | Lindener Ratsstuben" and descriptions containing "Cookie Richtlinie der Lindener Ratsstuben...".
   - `/cookies` is the official page linked from `Footer.tsx`. Adjusting metadata and canonical/noindex signals on `/cookie-richtlinie` eliminates keyword conflict and consolidates search equity onto `/cookies`.

---

## 3. Caveats

- **No Source Edits Performed**: This is a read-only investigation. No source code in `src/` or `locales/` was modified.
- **Admin Pages Excluded**: `/admin/mittagskarte` and `/admin/saisonal` are internal admin routes protected behind auth/management and were excluded from public indexable SEO analysis.
- **Multi-language Scope**: Metadata changes for Task 3 must be mirrored in all 20 translation files under `locales/*/meta.json` during Implementation.

---

## 4. Conclusion & Concrete Proposed Replacement Code

### Task 1 Proposed Replacements (Heading Hierarchy Across 17 Pages)

1. **`src/components/legal/LegalPageLayout.tsx` (Fixes duplicate H2 on AGB, Impressum, Datenschutz, Cookies, Widerruf, Barrierefreiheit)**
   - **File**: `/Users/umurey/Downloads/Lindener-Ratsstuben-main/src/components/legal/LegalPageLayout.tsx`
   - **Line 44**:
     ```tsx
     // CURRENT:
     <h2 className="text-3xl md:text-5xl font-display font-medium text-text-primary tracking-tight" itemProp="name">
         {title}
     </h2>

     // PROPOSED REPLACEMENT:
     <p className="text-3xl md:text-5xl font-display font-medium text-text-primary tracking-tight" itemProp="name">
         {title}
     </p>
     ```

2. **`src/app/[locale]/PageClient.tsx` (Fixes duplicate H2 on Home)**
   - **File**: `/Users/umurey/Downloads/Lindener-Ratsstuben-main/src/app/[locale]/PageClient.tsx`
   - **Line 59**:
     ```tsx
     // CURRENT:
     <h2 className="text-2xl md:text-3xl font-display font-medium text-text-primary/80 text-center tracking-tight">{tMeta('home.title') as string}</h2>

     // PROPOSED REPLACEMENT:
     <p className="text-2xl md:text-3xl font-display font-medium text-text-primary/80 text-center tracking-tight">{tMeta('home.title') as string}</p>
     ```

3. **`src/app/[locale]/about/AboutClient.tsx` (Fixes headline H2 on About)**
   - **File**: `/Users/umurey/Downloads/Lindener-Ratsstuben-main/src/app/[locale]/about/AboutClient.tsx`
   - **Line 32**:
     ```tsx
     // CURRENT:
     <h2 className="text-5xl font-display font-bold text-text-main mb-6">{t('about.headline') as string}</h2>

     // PROPOSED REPLACEMENT:
     <p className="text-5xl font-display font-bold text-text-main mb-6">{t('about.headline') as string}</p>
     ```

4. **`src/app/[locale]/contact/PageClient.tsx` (Fixes duplicate H2 on Contact)**
   - **File**: `/Users/umurey/Downloads/Lindener-Ratsstuben-main/src/app/[locale]/contact/PageClient.tsx`
   - **Line 34**:
     ```tsx
     // CURRENT:
     <h2 className="text-3xl md:text-4xl font-display font-bold text-white bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest mb-4 shadow-warm inline-block w-full max-w-3xl">{t('contact.title') as string}</h2>

     // PROPOSED REPLACEMENT:
     <p className="text-3xl md:text-4xl font-display font-bold text-white bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest mb-4 shadow-warm inline-block w-full max-w-3xl">{t('contact.title') as string}</p>
     ```

5. **`src/app/[locale]/gallery/PageClient.tsx` (Fixes duplicate H2 on Gallery)**
   - **File**: `/Users/umurey/Downloads/Lindener-Ratsstuben-main/src/app/[locale]/gallery/PageClient.tsx`
   - **Line 55**:
     ```tsx
     // CURRENT:
     <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest mb-4 shadow-warm inline-block w-full max-w-3xl">{t('gallery.title') as string}</h2>

     // PROPOSED REPLACEMENT:
     <p className="text-3xl md:text-4xl font-display font-bold text-text-primary bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest mb-4 shadow-warm inline-block w-full max-w-3xl">{t('gallery.title') as string}</p>
     ```

6. **`src/app/[locale]/menu/PageClient.tsx` (Fixes duplicate H2 on Menu)**
   - **File**: `/Users/umurey/Downloads/Lindener-Ratsstuben-main/src/app/[locale]/menu/PageClient.tsx`
   - **Line 51**:
     ```tsx
     // CURRENT:
     <h2 className="text-5xl font-display font-bold text-text-primary mt-2 mb-6">{t('menu.title') as string}</h2>

     // PROPOSED REPLACEMENT:
     <p className="text-5xl font-display font-bold text-text-primary mt-2 mb-6">{t('menu.title') as string}</p>
     ```

7. **`src/components/kegelbahn/KegelHero.tsx` (Fixes duplicate H2 on Kegelbahn)**
   - **File**: `/Users/umurey/Downloads/Lindener-Ratsstuben-main/src/components/kegelbahn/KegelHero.tsx`
   - **Line 25**:
     ```tsx
     // CURRENT:
     <h2 className="text-4xl md:text-6xl font-display text-text-primary mb-6 uppercase tracking-[0.05em] leading-tight">
         {t('kegelbahn.hero.title') as string}
     </h2>

     // PROPOSED REPLACEMENT:
     <p className="text-4xl md:text-6xl font-display text-text-primary mb-6 uppercase tracking-[0.05em] leading-tight">
         {t('kegelbahn.hero.title') as string}
     </p>
     ```

8. **`src/app/[locale]/reservation/ReservationInteractive.tsx` (Fixes duplicate H2 on Reservation)**
   - **File**: `/Users/umurey/Downloads/Lindener-Ratsstuben-main/src/app/[locale]/reservation/ReservationInteractive.tsx`
   - **Line 191**:
     ```tsx
     // CURRENT:
     <h2 className="text-4xl md:text-5xl font-display font-medium text-text-primary mb-4 tracking-tight">
         {t('reservation.title', 'Tisch reservieren')}
     </h2>

     // PROPOSED REPLACEMENT:
     <p className="text-4xl md:text-5xl font-display font-medium text-text-primary mb-4 tracking-tight">
         {t('reservation.title', 'Tisch reservieren')}
     </p>
     ```

9. **`src/app/[locale]/datenschutz/page.tsx` (Fixes H4 level skips)**
   - **File**: `/Users/umurey/Downloads/Lindener-Ratsstuben-main/src/app/[locale]/datenschutz/page.tsx`
   - **Lines 32, 36, 40, 44**:
     ```tsx
     // CURRENT:
     <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
     ...
     <h4>Wie erfassen wir Ihre Daten?</h4>
     ...
     <h4>Wofür nutzen wir Ihre Daten?</h4>
     ...
     <h4>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>

     // PROPOSED REPLACEMENT:
     <h3 className="text-xl font-bold text-text-main mt-6 mb-3">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
     ...
     <h3 className="text-xl font-bold text-text-main mt-6 mb-3">Wie erfassen wir Ihre Daten?</h3>
     ...
     <h3 className="text-xl font-bold text-text-main mt-6 mb-3">Wofür nutzen wir Ihre Daten?</h3>
     ...
     <h3 className="text-xl font-bold text-text-main mt-6 mb-3">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
     ```

10. **`locales/de/seo.json` (Fixes missing H3 subheadings in SEO content blocks)**
    - **File**: `/Users/umurey/Downloads/Lindener-Ratsstuben-main/locales/de/seo.json`
    - Update `home`, `menu`, `gallery`, `contact`, `kegelbahn`, `impressum`, `datenschutz`, `agb`, `widerruf`, `cookies` keys to include structured `<h3>` sub-headings under their `<h2>` blocks to maintain H1 -> H2 -> H3 hierarchy.

---

### Task 2 Proposed Replacements (H1 Issues on 2 Pages)

1. **`src/app/[locale]/flyer/page.tsx`**
   - **File**: `/Users/umurey/Downloads/Lindener-Ratsstuben-main/src/app/[locale]/flyer/page.tsx`
   - **Lines 107-109**:
     ```tsx
     // CURRENT:
     export default function Flyer8Page() {
       return (
         <div className="flyer-root">

     // PROPOSED REPLACEMENT:
     export default function Flyer8Page() {
       return (
         <div className="flyer-root">
           <h1 className="sr-only">Flyer & Speisekarte | Lindener Ratsstuben</h1>
     ```

2. **`src/app/[locale]/menu/print/page.tsx`**
   - **File**: `/Users/umurey/Downloads/Lindener-Ratsstuben-main/src/app/[locale]/menu/print/page.tsx`
   - **Lines 23-25**:
     ```tsx
     // CURRENT:
     export default function PrintMenuPage() {
       return (
         <div className="print-root">

     // PROPOSED REPLACEMENT:
     export default function PrintMenuPage() {
       return (
         <div className="print-root">
           <h1 className="sr-only">Speisekarte Druckversion | Lindener Ratsstuben</h1>
     ```

---

### Task 3 Proposed Replacements (Keyword Cannibalization on 1 Page)

1. **`src/app/[locale]/cookie-richtlinie/page.tsx` & `locales/de/meta.json`**
   - **File**: `/Users/umurey/Downloads/Lindener-Ratsstuben-main/src/app/[locale]/cookie-richtlinie/page.tsx`
   - **Lines 14-21**:
     ```typescript
     // CURRENT:
     title: t('cookie_richtlinie.title', 'Cookie-Richtlinie | Lindener Ratsstuben'),
     description: t('cookie_richtlinie.description'),
     alternates: getAlternates(locale, 'cookie-richtlinie'),
     robots: {
       index: false,
       follow: true,
     }

     // PROPOSED REPLACEMENT:
     title: t('cookie_richtlinie.title', 'Erklärung zu Speichertechnologien & Cookies | Lindener Ratsstuben'),
     description: t('cookie_richtlinie.description'),
     alternates: getAlternates(locale, 'cookie-richtlinie'),
     robots: {
       index: false,
       follow: true,
     }
     ```
   - **File**: `/Users/umurey/Downloads/Lindener-Ratsstuben-main/locales/de/meta.json`
   - **Lines 28-29**:
     ```json
     // CURRENT:
     "cookie_richtlinie.title": "Cookie Richtlinie | Alle Details | Lindener Ratsstuben",
     "cookie_richtlinie.description": "Detaillierte Cookie Richtlinie der Lindener Ratsstuben. Informationen zu Cookies, Tracking und Ihren Einstellungsmöglichkeiten."

     // PROPOSED REPLACEMENT:
     "cookie_richtlinie.title": "Erklärung zu Speichertechnologien & Cookies | Lindener Ratsstuben",
     "cookie_richtlinie.description": "Erklärung und Übersicht zu den verwendeten technischen Speichertechnologien und Browser-Cookies in den Lindener Ratsstuben."
     ```

---

## 5. Verification Method

To verify these observations and proposed fixes independently:

1. **Heading Hierarchy Verification**:
   - Inspect each page DOM or run a DOM heading tree check:
     ```bash
     # Check H1, H2, H3 tags in page components
     grep -rn "<h[1-6]" src/app/[locale] src/components
     ```
   - Verify that every page has exactly one `<h1>` at top level followed by `<h2>` section headings and `<h3>` sub-headings.

2. **H1 Presence Verification**:
   - Verify that `/flyer` and `/menu/print` render `<h1 className="sr-only">` tags containing focus keywords.

3. **Keyword Cannibalization Verification**:
   - Inspect metadata output for `/cookies` vs `/cookie-richtlinie`:
     ```bash
     grep -A 2 -B 2 "cookie" locales/de/meta.json
     ```
   - Ensure `/cookies` remains the primary indexable Cookie Policy page while `/cookie-richtlinie` has distinct title/description and noindex metadata.

4. **Build Verification**:
   - Execute `npm run build` after applying native edits in Milestone 3 to verify zero TS/React errors.
