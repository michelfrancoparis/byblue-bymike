# SEO

Indexability first: a perfect page nobody can index is worth nothing. Then
metadata, then structure, then the link preview.

## Indexability

- **[B] Lighthouse SEO = 100** — Verify: the mobile run from §2. · Impact: the
  audits here are binary and cheap — a score under 100 is unfixed homework.
  · Fix: each failing audit names its own fix.
- **[B] No staging leftovers blocking crawlers** — Verify: `robots.txt` for
  `Disallow: /`, and every audited route's HTML for `noindex` (meta and
  `x-robots-tag` header). · Impact: the site is invisible on Google — the single
  most common launch failure. · Fix: remove the block; if it is env-conditional,
  confirm the production value.
- **[B] `robots.txt` exists on the production origin and points at the sitemap** —
  Verify: fetch `https://<domain>/robots.txt`. · Impact: crawlers guess what they
  are allowed to read. · Fix: `app/robots.ts` (Next) with `sitemap:` set to the
  absolute production URL.
- **[B] `sitemap.xml` exists and lists only canonical, indexable, absolute URLs** —
  Verify: fetch it; spot-check that entries return 200 and are not `noindex`.
  · Impact: crawlers waste budget on redirects and dead ends. · Fix:
  `app/sitemap.ts` (Next), generated from the same source as the routes.
- **[B] Every audited route has a unique title, a unique description, and a
  self-referencing canonical** — Verify: view source per route. · Impact: Google
  rewrites the snippet, or treats two pages as one. · Fix: `metadata` per page,
  `generateMetadata` for dynamic routes, `metadataBase` + `alternates.canonical`
  in the root layout.
- **[S] One URL per page** — Verify: the same content at `/path` and `/path/`, at
  `/Path`, and on both www and apex. · Impact: signals split across duplicate
  URLs. · Fix: pick one form, 301 the others (host redirect in §launch).
- **[S] Every internal link is a real `<a href>`** — Verify: search for
  `onClick`-driven navigation on `div`/`span`. · Impact: crawlers cannot follow
  it, so the page is orphaned. · Fix: the framework's link component.
- **[S] No broken internal links** — Verify: crawl the audited routes, or check
  the network panel for 404s. · Impact: dead ends for visitors and crawlers.
  · Fix: repair or redirect each.
- **[S] Changed URLs are redirected, not deleted** — Verify: for a redesign, the
  old site's indexed URLs against the new routes. · Impact: every ranking the old
  URL earned is thrown away. · Fix: 301 map in the host or framework config.
- **[S] Filter, search, and pagination URLs do not open infinite crawl space** —
  Verify: query-string routes for indexability. · Impact: crawl budget burned on
  permutations. · Fix: canonical to the clean URL, or `noindex` the parameterized
  variants.

## Metadata

- **[S] Titles and descriptions read like search results** — Verify: title ~60
  characters, description ~155, both unique and specific. · Impact: truncated or
  duplicated snippets lose the click. · Fix: rewrite per page; the root layout
  owns the title template.
- **[S] `lang` on `<html>` matches the content** — Verify: view source. · Impact:
  wrong language signals and wrong screen-reader voice. · Fix: set it in the root
  layout (per locale when the site is multilingual).
- **[S] Favicon, apple-touch-icon, and web manifest are the project's, not the
  starter's** — Verify: fetch each; look at them. · Impact: a default icon in every
  tab and bookmark. · Fix: replace the files in the framework's icon convention.
- **[P] `robots` directives are deliberate per page** — Verify: pages that should
  stay out of search (thank-you, internal previews). · Impact: private pages
  surface in results. · Fix: `noindex` on those routes only.

## Structure

- **[S] Exactly one `h1` per page, headings nested in order** — Verify: the
  heading outline per route. · Impact: search engines and screen readers both
  lose the page's shape. · Fix: one `h1`, then `h2`/`h3` without skipping levels
  for style — size is CSS.
- **[S] Content is text, not baked into images** — Verify: headings and copy that
  are actually image assets. · Impact: unindexable, untranslatable,
  unsearchable. · Fix: real text, styled.
- **[S] URLs are readable and stable** — Verify: the route list — kebab-case,
  meaningful, no raw ids or dates unless they belong. · Impact: unreadable links
  get fewer clicks and shares. · Fix: slugs from the content's title.

## Social preview

- **[B] A real OG image and OG tags render in a link preview** — Verify: paste the
  URL into a preview tester or a chat client. · Impact: the site shared on
  WhatsApp, Slack, or LinkedIn shows a blank box — the client will notice this
  first. · Fix: `openGraph` in `metadata` with an absolute image URL (`metadataBase`
  makes it absolute), image at 1200×630.
- **[S] Twitter/X card is set** — Verify: `twitter:card` in the HTML. · Impact: a
  small unstyled preview instead of the large one. · Fix:
  `twitter: { card: 'summary_large_image' }`.
- **[P] Key pages have their own OG image** — Verify: whether every route shares
  the sitewide image. · Impact: every shared link looks identical. · Fix:
  per-route `openGraph.images`, or generated images (`ImageResponse` in Next).

## Measurement

- **[S] Analytics runs in production and only in production** — Verify: the
  tracking snippet, its env guard, and one live event. · Impact: launch happens
  with no data, or dev traffic pollutes it. · Fix: `@next/third-parties/google`
  with the ID from an env var, production-gated. Consent obligations: §launch.
- **[S] The domain is verified in Search Console and the sitemap submitted** —
  Verify: ask — this is account state, not code. · Impact: nobody sees indexing
  problems until traffic is missing. · Fix: hand the user the Search Console URL
  and the sitemap URL to submit.
