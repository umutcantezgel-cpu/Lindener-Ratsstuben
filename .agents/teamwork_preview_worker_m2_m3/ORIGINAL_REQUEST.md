## 2026-07-26T07:09:58Z
<USER_REQUEST>
You are Worker 1 executing Milestone 2 and Milestone 3.
Your assigned working directory for metadata/handoff is: /Users/umurey/Downloads/Lindener-Ratsstuben-main/.agents/teamwork_preview_worker_m2_m3
Project root: /Users/umurey/Downloads/Lindener-Ratsstuben-main

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

STRICT EXECUTION CONSTRAINT (CRITICAL):
NO SCRIPTS FOR CODE CHANGES. You are STRICTLY FORBIDDEN from writing or executing any scripts (e.g. Python, Node.js, bash, sed, awk) to modify, generate, or overwrite source code, configurations, or project files. All code modifications MUST be performed directly and manually using native file editing tools (replace_file_content, multi_replace_file_content, write_to_file).

Tasks to execute:

1. R1: Resolve Legal Page Duplicate Content & Noindex Metadata:
   - For `src/app/[locale]/agb/page.tsx`, `src/app/[locale]/impressum/page.tsx`, `src/app/[locale]/datenschutz/page.tsx`, `src/app/[locale]/cookies/page.tsx`, and `src/app/[locale]/widerruf/page.tsx`:
     Update metadata generation in `generateMetadata()`:
     Set `robots: locale === 'de' ? 'index, follow' : 'noindex, follow'` (so that non-German versions, including `/en`, `/fr`, `/ar`, return `noindex, follow`).
     Set canonical in `alternates` for non-German legal pages to point to `/de/<pageKey>` (e.g. `/de/agb`, `/de/impressum`, `/de/datenschutz`, `/de/cookies`, `/de/widerruf`) or use `getAlternates('de', '<pageKey>')`.

2. R2: Fix Heading Hierarchy Issues:
   - `src/components/legal/LegalPageLayout.tsx`: Change line 44 `<h2 className="text-3xl md:text-5xl font-display font-medium text-text-primary tracking-tight" itemProp="name">{title}</h2>` to `<p className="text-3xl md:text-5xl font-display font-medium text-text-primary tracking-tight" itemProp="name">{title}</p>`.
   - `src/app/[locale]/PageClient.tsx`: Change line 59 duplicate `<h2 className="...">` rendering `tMeta('home.title')` to `<p className="...">`.
   - `src/app/[locale]/about/AboutClient.tsx`: Change line 32 duplicate `<h2 className="...">` rendering `t('about.headline')` to `<p className="...">`.
   - `src/app/[locale]/contact/PageClient.tsx`: Change line 34 duplicate `<h2 className="...">` rendering `t('contact.title')` to `<p className="...">`.
   - `src/app/[locale]/gallery/PageClient.tsx`: Change line 55 duplicate `<h2 className="...">` rendering `t('gallery.title')` to `<p className="...">`.
   - `src/app/[locale]/menu/PageClient.tsx`: Change line 51 duplicate `<h2 className="...">` rendering `t('menu.title')` to `<p className="...">`.
   - `src/components/kegelbahn/KegelHero.tsx`: Change line 25 duplicate `<h2 className="...">` rendering `t('kegelbahn.hero.title')` to `<p className="...">`.
   - `src/app/[locale]/reservation/ReservationInteractive.tsx`: Change line 191 duplicate `<h2 className="...">` rendering `t('reservation.title')` to `<p className="...">`.
   - `src/app/[locale]/datenschutz/page.tsx`: Change `<h4>` tags on lines 32, 36, 40, 44 to `<h3 className="text-xl font-bold text-text-main mt-6 mb-3">`.
   - `locales/de/seo.json`: Remove `<strong>` tags inside `<h2>` headings for `"about"` (key `"about"`, line 3) and `"reservation"` (key `"reservation"`, line 6).

3. R2: Fix Missing H1 Issues:
   - `src/app/[locale]/flyer/page.tsx`: Insert `<h1 className="sr-only">Flyer & Speisekarte | Lindener Ratsstuben</h1>` at the top of the return JSX inside `<div className="flyer-root">`.
   - `src/app/[locale]/menu/print/page.tsx`: Insert `<h1 className="sr-only">Speisekarte Druckversion | Lindener Ratsstuben</h1>` at the top of the return JSX inside `<div className="print-root">`.

4. R2: Fix Keyword Cannibalization:
   - `src/app/[locale]/cookie-richtlinie/page.tsx` & `locales/de/meta.json`: Change `cookie_richtlinie.title` to `"Erklärung zu Speichertechnologien & Cookies | Lindener Ratsstuben"` and description to `"Erklärung und Übersicht zu den verwendeten technischen Speichertechnologien und Browser-Cookies in den Lindener Ratsstuben."`.

5. R2: Fix Broken External Link:
   - `src/app/[locale]/impressum/page.tsx`: Replace line 63 URL `https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=DE` with `https://ec.europa.eu/consumers/odr`.

6. Build Verification:
   - Run `npm run build` using `run_command` in `/Users/umurey/Downloads/Lindener-Ratsstuben-main` to verify zero TypeScript or syntax errors.

Write a complete report of all edits made and build command output in `/Users/umurey/Downloads/Lindener-Ratsstuben-main/.agents/teamwork_preview_worker_m2_m3/handoff.md`.
When finished, send a message to the caller ("parent", ID: "8d6e8e6d-5847-4cb9-9db1-a00ca69923a6").
</USER_REQUEST>
