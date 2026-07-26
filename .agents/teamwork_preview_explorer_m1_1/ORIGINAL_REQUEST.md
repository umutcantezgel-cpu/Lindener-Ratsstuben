## 2026-07-26T14:03:08Z

# User Task Request for Explorer 1 (Milestone 1)

Task:
1. Map the routing architecture, layout files, and i18n system of the application.
2. Find all page routes, specifically focusing on `/fr` and `/ar` routes. Determine how metadata (robots, canonical, title, description) is defined across routes (e.g. Next.js metadata objects, layout.tsx, page.tsx, or head components).
3. Determine how to configure `<meta name="robots" content="noindex">` (or `robots: { index: false }` in Next.js metadata) for ALL `/fr` and `/ar` pages.
4. Inspect all legal pages (AGB, Impressum, Datenschutz, Cookies, Widerruf) for `/de`, `/en`, `/fr`, `/ar`. Check how legal page text is loaded (e.g., from i18n JSON translation files or hardcoded components). Identify why `/en` renders German text or shares duplicate text with `/de`, and propose the precise fix (e.g., setting canonical tags pointing to `/de` or providing translated text / canonical URLs).

Write your findings and actionable implementation plan in /Users/umurey/Downloads/Lindener-Ratsstuben-main/.agents/teamwork_preview_explorer_m1_1/handoff.md.
