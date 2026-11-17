---
name: website-guidelines
title: Website Guidelines
description: Conventions for projects built on the ++hellohello website starter (Next.js) — structure, naming, styles, motion, assets, fonts, performance, state, data fetching, forms, SEO, env vars, WebGL, analytics. Use when writing or changing any code in this project.
scope: project
formerly: next-base-guidelines
---

# Website Guidelines

House conventions for every project built on the ++hellohello website starter (Next.js). Read the sections your change touches before writing code, and check the result against them before finishing.

## Project start

`styles/globals.css` ships starter defaults to calibrate per project — colors, fluid font-size scale, `grid-default`, page gutter. The website-setup skill owns that session: in a fresh project (DESIGN.md missing or still carrying placeholders), run it before building anything — install if missing: `++ sync website-setup`. The sections below hold the mechanics it applies.

## Structure — where things go

```
app/                 routes (App Router)
components/          shared components · ui/ = shadcn + custom UI · icons/ = SVG components
hooks/               reusable hooks
lib/                 utils.ts (cn) · constants.ts · types.ts (shared types) · store.ts (zustand) · fonts.ts (next/font instances)
assets/              fonts/ (woff2) · images/ (imported)
public/              URL-served files only: videos, 3D models, textures
styles/globals.css   theme tokens (colors, page gutter) · utilities (container, grid-default) · fluid base font-size
```

Not every file ships with the starter (`types.ts`, `store.ts`) — the tree is where each one goes the moment the project needs it, not elsewhere.

## General

- pnpm for everything — install, add, run.
- Named exports. Exception: files Next.js requires as default exports (App Router reserved files).
- kebab-case for files and folders. Standard markdown files (README.md, AGENTS.md) keep their conventional names.
- Zero layout shift (CLS): give media and embeds explicit dimensions.
- No FOUC: everything styled at first paint — fonts (see Fonts), GSAP-animated elements (see Motion), and any late-applied styles.

## Server & Client Components

- Server Components by default. `'use client'` only at interactive leaves (event handlers, hooks, browser APIs) — keep pages and layouts server.
- Fetch data in Server Components (CMS queries, APIs). Client-side fetching only for genuinely live data.

## Styles

- Tailwind for all styling. Merge conditional classes with `cn` from `lib/utils.ts`.
- Theme values only — no arbitrary values (`w-[347px]`). New tokens follow the existing `globals.css` pattern: CSS variable in `:root`, mapped in `@theme inline`.
- Global CSS is a last resort; when unavoidable it goes in `styles/globals.css`.
- `rem` for font sizes and dimensions (Tailwind's default). The document base font-size is fluid — defined in `globals.css` — so rem scales with viewport. At viewports ≤ 1440px (the Figma base) 1rem = 16px: px in the design map 1:1 to Tailwind's base-16 rem scale.

### Fluid type scale

The agency default, defined on `html` in `globals.css`: 16px flat up to 1440px (Figma parity), 16→19px from 1440 to 1920, 19→22px from 1920 to 2560, capped beyond. Since every rem-based value rides on the root, the whole layout zooms proportionally on large screens — intended, keeps the composition faithful to the design.

Adjust anchors per project when the design calls for it; keep the structure. Each segment scales linearly from (vpMin, sizeMin) to (vpMax, sizeMax) — compute in px:

- slope = (sizeMax − sizeMin) ÷ (vpMax − vpMin) → × 100 = the `vw` term
- intercept = sizeMin − slope × vpMin → ÷ 16 = the `rem` term
- `font-size: clamp(sizeMin÷16 rem, <rem term> + <vw term>, sizeMax÷16 rem)`, inside `@media (min-width: vpMin÷16 em)`

Example (1440→1920px, 16→19px): slope = 3/480 = 0.00625 → `0.625vw`; intercept = 16 − 0.00625 × 1440 = 7px → `0.4375rem`. Verify both ends: 0.4375×16 + 0.00625×1440 = 16 ✓ · at 1920 = 19 ✓. Convenience calculator: https://utopia.fyi/type/calculator/

Everything stays em/rem — media queries in `em` (1em = 16px in media queries: 90em = 1440px), sizes in `rem` — so a user's browser font-size preference scales curve and breakpoints together. Converting either to px desyncs them and creates size jumps at the breakpoints for those users.

### Grid, container & gutter

- Layouts follow the design grid — match the Figma.
- `grid-default` IS the project's design grid: configured once at project start (column count, gap, responsive behavior) so every grid on the site goes through it — one utility instead of ad-hoc `grid-cols-*`/`gap-*` prevents inconsistencies.
- `container` utility for page-level layout, `grid-default` for internal elements.
- The page gutter is defined once: `--spacing-global` in `:root` (`globals.css`); the self-referencing `@theme inline` entry only registers it on the spacing scale, the value lives in `:root`. Steps stay in Tailwind vocabulary — values via `--spacing()`, breakpoints via `@variant md { … }`; add or change steps there, never in the utilities that consume it.
- Because `global` is a spacing token, every spacing utility accepts it. The common ones:
  - `px-global` — full-bleed section (edge-to-edge background) whose content aligns to the gutter. `container` already includes it.
  - `pl-global` / `pr-global` — edge-anchored asymmetric layouts; carousels that start aligned but bleed off one side.
  - `-mx-global` — break a container child out to full-bleed.
  - `scroll-px-global` — scroll-snap carousels whose snap points align to the gutter.
- `cn` resolves conflicts for all of these — `lib/utils.ts` registers `global` in the `cn` package's spacing scale (`createCn` from `cn/config`). If a project adds another spacing token, register it the same way.

## Motion

- CSS animations when they're the simpler tool.
- Complex animation: GSAP with the `useGSAP` hook (automatic cleanup + context). The GSAP skills cover plugins, scroll, etc. — install if missing: `npx skills add https://github.com/greensock/gsap-skills`.
- One `requestAnimationFrame` per app: centralize `gsap.ticker` in a `hooks/use-ticker.ts` hook.
- No FOUC on entrance animations: hide the element in CSS (`visibility: hidden`), reveal with `autoAlpha`; undo the hiding in `<noscript>` for no-JS. See https://gsap.com/resources/fouc/.

## Hooks

Before writing a hook, check https://github.com/hellohello/hooks for an existing one and copy it into `hooks/`.

## Global state

If the task needs global state: zustand (install on first use). Create the store in `lib/store.ts` and export it from there.

## Forms

- Stack: react-hook-form + zod + server actions — shadcn's pattern (install on first use).
- Take the shortest path the form allows: a simple form can be a server action + zod alone, without react-hook-form.
- Every form ships validation, success, and error states — no silent submits.

## Fonts

- Always load through next/font, with `display: 'swap'`. Instances live in `lib/fonts.ts` as named exports — the starter ships an example there to replace with the project's fonts.
- Apply via the instance's `.className` on `<html>` in the root layout (see the starter example).
- Prefer variable fonts; specify `weight` only when the font isn't variable.
- Local fonts: `assets/fonts/`, woff2 format only.
- Google fonts: next/font — no local files needed.

## Assets

### Images

- Serve appropriately sized files; add mobile/desktop variants when one size can't cover both.
- Render with next/image.
- Store in `assets/images/` and import — imports fail the build when a reference is missing.
- Formats: webp/avif; png when transparency is needed.
- Critical images (LCP element / above-the-fold hero): never lazy-load — mark with `fetchPriority="high"` or `loading="eager"`. Use `preload` only when the image must start loading from the `<head>` before the browser discovers it, and never when the LCP image varies per viewport. `priority` is deprecated in Next 16.

### Videos

- Files go in `public/`. When count or size grows, host on a CDN (Cloudinary, Cloudflare R2) — that's the recommendation, setup is out of scope. Long-form content watched with audio: embed YouTube/Vimeo.
- Compress and adapt for web with `ffmpeg`.
- Always set a `poster`.
- Mobile devices may block autoplay — the poster/fallback must stand on its own.

## Resource hints

- Critical assets served from an external origin (image/video CDN): `ReactDOM.preconnect('https://<origin>')` in the root layout. Only origins the page uses in the first seconds, and keep the list to a handful — each preconnect has a cost.
- Origins that are likely but not critical: `ReactDOM.prefetchDNS()` (cheaper).
- Never handwritten `<link rel="preconnect">` / `<link rel="dns-prefetch">` tags — in the App Router these hints go through the `ReactDOM` methods.

## WebGL

- If the task needs WebGL: three.js via react-three-fiber (install on first use); drei and the Poimandres ecosystem for helpers and components.
- Use the react-three-fiber skill for performance work on scenes.

## UI components

If the task needs UI primitives: shadcn/ui (install on first use). `components/ui/` holds shadcn and custom UI components.

## Icons

SVGs as React components in `components/icons/`, every icon with the same structure — copy `components/icons/arrow.tsx`: `currentColor` instead of hardcoded colors, props spread so callers can pass className and other props.

## CMS

If the project needs a CMS: Prismic. Setup is out of this skill's and boilerplate's scope — follow Prismic's own documentation.

## SEO & Metadata

- Every page exports `metadata` — `generateMetadata` for dynamic routes. The root layout owns the title template and `metadataBase`.
- Per project, before launch: OG image, `app/sitemap.ts`, `app/robots.ts`.

## Env vars

- Every var is listed in `.env.example` (committed) with a comment. Real values live in `.env.local` and Vercel.
- `NEXT_PUBLIC_` prefix only for values the browser needs; everything else stays server-only.

## Analytics & GTM

- `@next/third-parties/google` in the root layout, production only.
- GTM ID from an env var (set in Vercel), never hardcoded.
