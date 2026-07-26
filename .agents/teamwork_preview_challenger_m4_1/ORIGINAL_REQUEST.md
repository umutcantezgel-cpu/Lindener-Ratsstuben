## 2026-07-26T14:13:52Z
You are Challenger 1 for Milestone 4 (Verification & Build).
Your assigned working directory for metadata/handoff is: /Users/umurey/Downloads/Lindener-Ratsstuben-main/.agents/teamwork_preview_challenger_m4_1
Project root: /Users/umurey/Downloads/Lindener-Ratsstuben-main

Task:
1. Empirically verify the application build and SEO contracts.
2. Execute `npm run build` using `run_command` in project root.
3. Inspect static build outputs or code files to verify:
   - Metadata for `/fr` and `/ar` pages contains `robots: { index: false }` or `noindex`.
   - Legal pages (`agb`, `impressum`, `datenschutz`, `cookies`, `widerruf`) emit `robots: noindex` for non-German locales and canonical URLs pointing to `/de/...`.
   - Heading structure across all public routes follows H1 -> H2 -> H3 without skipping or duplicate H2 titles.
   - `/flyer` and `/menu/print` each contain exactly one `<h1>`.
   - No empty `<strong>` tags exist.
   - Broken link in `impressum/page.tsx` points to live EU ODR URL `https://ec.europa.eu/consumers/odr`.

Write your empirical verification report to /Users/umurey/Downloads/Lindener-Ratsstuben-main/.agents/teamwork_preview_challenger_m4_1/handoff.md.
When finished, send a message to caller ("parent", ID: "8d6e8e6d-5847-4cb9-9db1-a00ca69923a6").
