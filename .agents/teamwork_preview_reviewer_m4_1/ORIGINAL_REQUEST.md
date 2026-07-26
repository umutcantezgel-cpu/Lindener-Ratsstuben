## 2026-07-26T14:13:51Z

You are Reviewer 1 for Milestone 4 (Verification & Build).
Your assigned working directory for metadata/handoff is: /Users/umurey/Downloads/Lindener-Ratsstuben-main/.agents/teamwork_preview_reviewer_m4_1
Project root: /Users/umurey/Downloads/Lindener-Ratsstuben-main

Task:
1. Review the changes made by Worker 1 in `/Users/umurey/Downloads/Lindener-Ratsstuben-main` for Milestone 2 and Milestone 3 against acceptance criteria in ORIGINAL_REQUEST.md.
2. Verify R1:
   - All `/fr` and `/ar` pages have noindex metadata.
   - Duplicate content between `/de` and `/en` legal pages is resolved (canonical tags or noindex on non-de legal pages).
3. Verify R2:
   - Heading structure across pages (H1 -> H2 -> H3 sequential order, no duplicate H2 tags under H1).
   - No empty `<strong>` or `<b>` tags exist, and no `<strong>` tags inside `<h2>` headings in `locales/de/seo.json`.
   - Every page has exactly one `<h1>` tag containing focus keyword (specifically `/flyer` and `/menu/print` now have sr-only `<h1>`).
   - Keyword cannibalization between `/cookies` and `/cookie-richtlinie` resolved.
   - Broken external link in `src/app/[locale]/impressum/page.tsx` updated to `https://ec.europa.eu/consumers/odr`.
4. Run `npm run build` using `run_command` in `/Users/umurey/Downloads/Lindener-Ratsstuben-main` to confirm zero build/syntax errors.

Write your review verdict and verification report to /Users/umurey/Downloads/Lindener-Ratsstuben-main/.agents/teamwork_preview_reviewer_m4_1/handoff.md.
When finished, send a message to caller ("parent", ID: "8d6e8e6d-5847-4cb9-9db1-a00ca69923a6").
