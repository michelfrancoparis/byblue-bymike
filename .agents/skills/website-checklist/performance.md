# Performance

Measured on the deployed URL or a local production build — never a dev server.
Mobile is the gate; desktop is context.

## Measured

- **[B] Lighthouse Performance (mobile) ≥ 90** — Verify: the mobile run from §2.
  · Impact: the site feels slow on the phones most visitors use. · Fix: the
  failing audits in the report are the work list; start with the diagnostics
  Lighthouse ranks by estimated savings.
- **[B] LCP ≤ 2.5s** — Verify: Lighthouse names the LCP element per route.
  · Impact: the visitor stares at an empty screen. · Fix: prioritize that
  element, shrink it, and remove whatever blocks the response before it.
  https://web.dev/articles/optimize-lcp
- **[B] CLS ≤ 0.1** — Verify: Lighthouse "Avoid large layout shifts" lists the
  shifting nodes. · Impact: content jumps under the visitor's finger while they
  read or tap. · Fix: reserve space for every media, embed, ad, and late-loaded
  font. https://web.dev/articles/optimize-cls
- **[B] INP ≤ 200ms** — Verify: Lighthouse INP audit, or the interaction trace in
  chrome-devtools. · Impact: taps and clicks feel dead. · Fix: break up long
  tasks and get expensive work off the click handler.
  https://web.dev/articles/optimize-inp
- **[B] Initial JS ≤ 300KB compressed** — Verify: the build output's route sizes,
  or the sum of script transfer sizes in the network panel on first load.
  · Impact: phones spend seconds parsing code before the page responds. · Fix:
  dynamic-import what is not needed for first paint; drop or replace the heaviest
  dependency.
- **[S] No long task over 200ms on load** — Verify: performance trace, main
  thread. · Impact: the page is visible but frozen. · Fix: defer, chunk, or move
  the work off the critical path.

## Assets

- **[B] Every image and video is compressed and web-formatted** — Verify: list
  files over ~300KB in `assets/` and `public/`; check formats. · Impact: a single
  raw export can outweigh the entire rest of the page. · Fix: webp/avif for
  images (png only for transparency), `ffmpeg` for video.
- **[B] Media and embeds carry explicit dimensions** — Verify: every `img`,
  `video`, `iframe`, and canvas has width/height or a CSS aspect-ratio. · Impact:
  the layout jumps as each one loads — this is most CLS. · Fix: set both
  dimensions, or an `aspect-ratio` box.
- **[B] The LCP image loads eagerly, at high priority** — Verify: the LCP element
  from Lighthouse; check it for lazy loading. · Impact: the first thing the
  visitor sees is queued behind everything else. · Fix: `loading="eager"` +
  `fetchPriority="high"` (Next: `next/image`; `priority` is deprecated in 16).
  Preload only when the browser cannot discover the image in the markup, and never
  when it varies per viewport.
- **[S] Below-the-fold images lazy-load** — Verify: `loading` on images outside
  the first screen. · Impact: bandwidth spent on what nobody scrolled to. · Fix:
  `loading="lazy"`.
- **[S] Images are served at the size they render** — Verify: Lighthouse
  "Properly size images"; compare intrinsic to displayed size. · Impact: mobile
  downloads desktop pixels. · Fix: responsive `sizes`/`srcset`, or a separate
  mobile asset when one file cannot cover both.
- **[S] Video is not costing the first paint** — Verify: every `video` has a
  `poster`; check `preload` and autoplay. · Impact: a hero video eats the
  bandwidth the page needs to render, and mobile may block it anyway. · Fix:
  `poster` always, `preload="metadata"`, and a fallback that stands alone.
- **[S] Static assets are cached immutably** — Verify: response headers on
  hashed build assets (`cache-control`). · Impact: repeat visitors re-download
  what never changed. · Fix: framework defaults handle it; a custom
  server/proxy needs `max-age=31536000, immutable` on hashed files.
- **[P] Large or numerous media sit behind a CDN** — Verify: the origin serving
  images and video. · Impact: heavy files travel from one region to every
  visitor. · Fix: Cloudinary, Cloudflare R2, or the host's image service.

## Fonts

- **[S] Fonts are woff2, loaded through the framework, `display: swap`** —
  Verify: font files and their loading path. · Impact: text is invisible or
  reflows mid-read. · Fix: `next/font` (or self-hosted woff2 + `font-display`);
  variable fonts over multiple weights.
- **[S] No render-blocking third-party font CSS** — Verify: network waterfall for
  a stylesheet from an external font host in the critical path. · Impact: the
  page waits on someone else's server to draw text. · Fix: self-host, or route it
  through the framework's font loader.

## JavaScript & third parties

- **[S] Third-party scripts stay off the critical path** — Verify: every external
  script tag and its loading strategy. · Impact: an analytics or chat widget
  delays the page it is measuring. · Fix: load after hydration or on interaction
  (`next/script` with `lazyOnload`, `@next/third-parties` for Google).
- **[S] Preconnect only to critical external origins, and only a handful** —
  Verify: the resource hints against the origins used in the first seconds.
  · Impact: too many hints compete with the requests that matter. · Fix: keep the
  critical ones, drop the rest (Next: `ReactDOM.preconnect`,
  `ReactDOM.prefetchDNS` for the merely likely).
- **[S] Nothing render-blocking in `<head>`** — Verify: Lighthouse
  "Eliminate render-blocking resources". · Impact: paint waits on files the first
  screen does not need. · Fix: defer the script, or split the stylesheet.
- **[P] Bundle inspected for duplicate and oversized dependencies** — Verify:
  a bundle analyzer run. · Impact: two copies of the same library ship to every
  visitor. · Fix: dedupe versions, replace the heavy dependency, or import only
  the used entry point.

## Rendering & build

- **[S] Pages render on the server; interactivity sits at the leaves** — Verify:
  where `'use client'` appears — pages and layouts should be server. · Impact:
  the whole tree ships to the browser and hydrates before anything responds.
  · Fix: push `'use client'` down to the interactive component.
- **[S] The production build is clean** — Verify: `pnpm build` output — warnings,
  type errors, unexpected route sizes. · Impact: warnings at build time are the
  bugs users find at runtime. · Fix: resolve each one; a warning that stays is a
  decision, and it goes in the report.
- **[S] Caching and rendering mode per route are deliberate** — Verify: the
  build's route table (static / ISR / dynamic) against what each page actually
  needs. · Impact: a page that could be static rebuilds on every visit, or a page
  that must be fresh serves stale content. · Fix: remove the accidental
  `force-dynamic` / uncached fetch, or add the revalidate the page needs.
- **[P] Likely next routes are prefetched** — Verify: link components vs raw
  anchors for internal navigation. · Impact: in-site navigation feels like a
  reload. · Fix: use the framework's link component.
- **[P] Unused CSS trimmed** — Verify: Lighthouse "Reduce unused CSS", coverage
  panel. · Impact: bytes and parse time for rules nothing matches. · Fix: delete
  dead global CSS; utility frameworks already tree-shake.
