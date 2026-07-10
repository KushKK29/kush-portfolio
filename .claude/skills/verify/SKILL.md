---
name: verify
description: Build, launch, and drive this portfolio app to verify changes end-to-end
---

# Verifying the portfolio app

Vite + React SPA in `kush-portfolio/` (note: repo root is the parent dir).

## Build & launch

```bash
cd kush-portfolio
npm run build            # production build; three.js lands in a lazy Scene3D chunk
npm run preview          # serves dist at http://localhost:4173 with SPA fallback
# dev alternative: npm run dev (http://localhost:5173, includes /api/chat middleware)
```

## Flows worth driving (Playwright)

- `/` desktop ≥768px → 3D nav hub (Canvas, six panels). Nav buttons and canvas
  panel clicks both set focus → camera fly + section overlay. Esc closes.
- "Switch to classic view" toggle (bottom-left) → scroll layout. Persists in
  localStorage key `navMode`.
- `/` at mobile width (<768px) or prefers-reduced-motion → classic layout, no toggle.
- `/work/<slug>` deep links (articleship, humantic-ai, geeksforgeeks,
  stock-analyser) → case-study page; bad slug → "Case study not found."
- Case studies auto-load from `src/content/caseStudies/*.js` via import.meta.glob.

## Gotchas

- Headless Chromium can lose the WebGL context after several reloads
  ("THREE.WebGLRenderer: Context Lost" in console) — the app then falls back to
  classic view by design. Reload or toggle back to 3D.
- Playwright MCP writes screenshots to the repo-root `.playwright-mcp/` dir and
  CWD-relative paths land in the repo parent — clean up after.
- `npm run lint` has pre-existing failures repo-wide; don't treat as regression.
