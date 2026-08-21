# Physiogen — Physiotherapy Clinic Website (PRD / Working Notes)

## Overview
Next.js 15 (App Router) + React 19 + TypeScript + Tailwind v4 marketing site for
"Physiogen" sports physiotherapy clinic (Lahore, PK). Static/marketing site — NO backend, NO DB.
Lives directly in /app (not the standard React+FastAPI layout).

## Runtime / Environment notes
- Platform supervisor 'frontend' program runs `yarn start` in /app/frontend on port 3000.
- This repo is a Next.js app at /app root, so a thin runner was added at /app/frontend/package.json
  that does `cd /app && next dev -p 3000 -H 0.0.0.0`. /frontend/ is gitignored (environment-only).
- Backend supervisor program is FATAL (no /app/backend) — expected, unused.

## Work log
### 2026-06 — Code review + fixes
- Removed dead `next/head` usage on homepage (ignored in App Router); JSON-LD now rendered in body.
- Performance: throttled scroll/mousemove with requestAnimationFrame; cursor gradient updated via ref
  (no re-render); listeners attach once; removed dead state (mousePosition/lastScrollY).
- Fixed case-study preview data to match the real DB (CS000001 ACL, CS000002 Cerebral Palsy).
- SEO: added metadataBase, app/robots.ts (/robots.txt), app/sitemap.ts (/sitemap.xml).

### 2026-06 — Bug: "preview not loading" + "error on mobile"
- Preview not loading: no process on port 3000 -> added /app/frontend runner (RUNNING).
- Mobile hydration error (emitPendingHydrationWarnings -> PhysiogenFit): root cause = layout metadata
  had formatDetection ENABLED, so iOS Safari auto-linked phone/email/address/date into <a> tags after
  SSR -> hydration mismatch (mobile only).
  Fix (src/app/layout.tsx): removed the formatDetection metadata block; added single
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">;
  added suppressHydrationWarning to <html> and <body>.
  VERIFIED by testing agent: 0 hydration errors on desktop + iOS mobile viewports; routes 200.

## Known/Backlog
- Placeholder therapist names in case studies (Dr. Sarah Johnson / Dr. Michael Chen) — not real team.
- Nav items duplicated 3x in page.tsx instead of reusing lib/site-data.ts NAV_ITEMS.
- Preload hints for some woff2/SVG assets fire "preloaded but not used" console warnings (noise).
- "Special Promotion" modal auto-opens on load and covers hero on first paint (UX).
- Few data-testid attributes — add for robust regression tests.

### 2026-06 — Bug: GitHub Pages build failing (Jekyll)
- GitHub Pages was auto-building the repo with the Jekyll builder (actions/jekyll-build-pages),
  crashing on assets/css/style.scss because there was no docs/ folder — Jekyll is wrong for a Next.js app.
- Fix: migrate to static export + a proper GitHub Actions Pages deploy.
  * next.config.ts: output:'export', images.unoptimized:true.
  * src/app/clinical-case-studies/[id]/page.tsx: generateStaticParams(CS000001,CS000002) + dynamicParams=false.
  * src/app/sitemap.ts + robots.ts: export const dynamic='force-static'.
  * .github/workflows/nextjs.yml: build static export (./out) and deploy via configure-pages/deploy-pages.
  * public/.nojekyll added.
- `next build` static export succeeds -> ./out (index.html, clinical-case-studies[/CS000001|CS000002].html,
  robots.txt, sitemap.xml, .nojekyll). Dev preview still runs on :3000.
- VERIFIED by testing agent (iteration_2): 100% frontend, 0 hydration errors, nav works.
- ACTION REQUIRED BY USER (repo settings): GitHub → Settings → Pages → Source = "GitHub Actions"
  (so the new workflow runs instead of the default Jekyll build). If using a custom domain
  (physiogen.fit) keep the CNAME/Pages custom domain; basePath stays empty. For the project URL
  <user>.github.io/physiogendark, configure-pages injects the basePath automatically.

## Backlog (added)
- Make case-study list cards real <Link> anchors (crawlability / works without JS on static export).
