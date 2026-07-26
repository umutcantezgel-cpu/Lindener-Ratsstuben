# Project Plan: Lindener-Ratsstuben Technical & Meta SEO Optimization

## Architecture
- Next.js web application with multi-language routing (`/de`, `/en`, `/fr`, `/ar`) and i18n/JSON translations.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Exploration & Diagnostics | Audit codebase to map routing, identify /fr & /ar routes, legal pages, 17 heading structure issues, 6 strong/b tag issues, 2 H1 issues, 1 keyword cannibalization issue, 1 broken external link. | None | DONE |
| 2 | R1 Duplicate Content & Noindex | Add noindex metadata to all /fr and /ar pages. Resolve duplicate content between /de and /en legal pages (AGB, Impressum, Datenschutz, Cookies, Widerruf) via canonical tags or translation. | M1 | DONE |
| 3 | R2 Technical & Meta SEO Fixes | Fix heading structure issues (17 pages), <strong>/<b> issues (6 pages), H1 issues (2 pages), keyword cannibalization (1 page), broken external link (1 page). | M1 | DONE |
| 4 | Verification & Build | Run build verification (`npm run build`), Reviewer, Challenger, and Forensic Audit verification. | M2, M3 | IN_PROGRESS |

## Interface & Quality Contracts
- No script execution for modifying/generating code.
- Native file tools only (`replace_file_content`, `multi_replace_file_content`, `write_to_file`).
- `npm run build` must succeed with zero errors.
- Every page has exactly one `<h1>` containing focus keywords.
- All `/fr` and `/ar` pages have `<meta name="robots" content="noindex">`.
