# Original User Request

## Initial Request — 2026-07-26T14:02:11Z

# Teamwork Project Prompt

Working directory: /Users/umurey/Downloads/Lindener-Ratsstuben-main
Integrity mode: development

## Requirements

### R1. Resolve Duplicate Content (217 errors)
- The site currently renders German legal text on `/en`, `/fr`, and `/ar` legal pages (AGB, Impressum, Datenschutz, Cookies, Widerruf).
- **Rule**: Only `/de` and `/en` pages are allowed to be indexed. Set a `noindex` tag on all `/fr` and `/ar` pages to remove them from search indexes.
- **Rule**: For the `/en` legal pages (which share text with `/de`), resolve the duplicate content either by adding `canonical` tags pointing to the `/de` versions, or by translating the JSON files so the content is unique.

### R2. Fix Remaining Technical & Meta SEO Issues
- Resolve the 17 pages with heading structure issues (ensure H1 -> H2 -> H3 sequential order).
- Fix the 6 pages with `<strong>` or `<b>` tag issues (e.g., empty strong tags, or strong tags wrapping headings).
- Fix the 2 pages with H1 issues (missing, empty, or duplicate H1s).
- Fix the 1 page with Keyword Cannibalization (ensure each page has a uniquely targeted `<title>` and `meta description`).
- Fix the 1 page with a broken external link.

### R3. Strict Execution Constraints (CRITICAL)
- **NO SCRIPTS FOR CODE CHANGES**: You are STRICTLY FORBIDDEN from writing or executing any scripts (e.g., Python, Node.js, bash, sed, awk) to modify, generate, or overwrite source code, configurations, or project files. 
- You MUST use native manual file editing tools for all changes.

## Acceptance Criteria

### Technical SEO
- [ ] All `/fr` and `/ar` pages have `<meta name="robots" content="noindex">` (or equivalent Next.js metadata).
- [ ] The duplicate content between `/de` and `/en` legal pages is resolved (via translation or canonical tags).
- [ ] No empty `<strong>` tags exist in the codebase.
- [ ] Every page has exactly one `<h1>` tag containing its focus keyword.
- [ ] `npm run build` succeeds without errors, verifying that the manual edits did not break syntax.
