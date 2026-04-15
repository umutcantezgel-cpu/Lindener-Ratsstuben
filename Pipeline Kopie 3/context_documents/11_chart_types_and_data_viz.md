# 11 - Chart Types and Data Visualization Constraints (Lindener Ratsstuben Localized)

*This document synthesizes the rigorous data visualization standards. For the Lindener Ratsstuben project, Data Visualization is almost entirely out of scope for the public-facing application boundary.*

## SSOT Implementation Directives

### 1. Public-Facing Boundary (Out of Scope)
The public Gastronomy UI does **not** rely on D3.js, Recharts, or Chart.js. 
- **Rule**: Do not inject charts or heavy graphical libraries into the Next.js client bundle.
- Any display of statistics (e.g., "15 Jahre Tradition" or "4.9 Sterne") must be rendered natively using static typography and layout spacing defined in `index.css`.

### 2. Internal Dashboard / Admin (Conditional Rules)
If a future expansion phase requires an internal restaurant dashboard (e.g., for tracking reservations or foot traffic), the following strict constraints apply:

- **Bar Chart (Booking Density)**: Compare discrete categories (Days of the week). Single color per metric (`#8C1A27`). Value labels strictly visible on each bar.
- **Line Chart (Revenue Trend)**: Historical data. Primary `#0080FF` (isolated from brand colors for admin clarity).
- **A11y Constraint**: All charts MUST be accompanied by a `<table aria-hidden="false">` containing the raw node logic, as chefs or managers may rely on screen readers or printed daily reports.

## Accessibility Master Rules
Any chart built internally by the system MUST degrade gracefully.
1. **Never rely on color alone.** If the chart gets printed in greyscale on receipt paper, it must still be readable.
2. **Interactive Control.** Real-time animations MUST observe OS `reduced-motion` CSS queries.
