# AEO — answer engines

ChatGPT, Claude, Perplexity, and AI Overviews cite pages they can **fetch**,
**parse**, and **quote**. Three questions, in that order: can the crawler get in,
is the content in the HTML, and is the fact quotable on its own.

Agency default: **AI crawlers are allowed.** Change it only when the client asks,
and record that they asked.

## Access

- **[B] AI crawlers are allowed** — Verify: `robots.txt` for `GPTBot`,
  `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`, `Google-Extended`,
  `Applebot-Extended`. · Impact: the brand cannot be cited by the assistants
  people now ask instead of searching. · Fix: remove the disallow, or state in the
  report that the client asked to block them.
- **[B] Nothing at the edge blocks them either** — Verify: the host's bot
  settings (Cloudflare "Block AI bots", WAF rules, Vercel bot protection), and
  `curl -A GPTBot -sI <url>` for a 403. · Impact: a permissive `robots.txt` in
  front of a firewall that blocks anyway — invisible in code review. · Fix: allow
  the crawlers in the host's dashboard.
- **[P] `llms.txt` published** — Verify: fetch `/llms.txt`. · Impact: a curated map
  of the site for models, when they read it. · Fix: a markdown index of the key
  pages at the root. Recommended, not required — adoption is still thin.

## Parseability

- **[B] The main content is in the server HTML** — Verify:
  `curl -s <url> | grep` for a distinctive sentence, or view-source with
  JavaScript disabled. · Impact: crawlers that do not execute JS see an empty
  page. · Fix: render the content server-side; client-side fetching is for
  genuinely live data only.
- **[B] Valid JSON-LD: `Organization` sitewide, plus the type each page is** —
  Verify: paste the URL into Google's Rich Results Test or
  https://validator.schema.org. · Impact: the brand's identity, and each page's
  meaning, are left to guesswork. · Fix: a `<script type="application/ld+json">`
  in the root layout for `Organization`, and per page the type it actually is
  (`Article`, `Product`, `Service`, `LocalBusiness`, `Event`).
- **[S] Structured data matches what the page shows** — Verify: compare the JSON-LD
  fields to the rendered content. · Impact: mismatched markup is treated as
  spam and discounted. · Fix: generate the JSON-LD from the same data the page
  renders.
- **[S] Semantic HTML carries the structure** — Verify: whether sections, lists,
  and tables are `section`/`ul`/`table` or nested `div`s. · Impact: extraction
  guesses where one idea ends and the next begins. · Fix: the element that means
  what the content is.
- **[S] Content is not gated behind interaction** — Verify: accordions, tabs, and
  "load more" — is the text in the HTML before the click? · Impact: the answer
  exists but no crawler reaches it. · Fix: render it in the markup and hide it
  with CSS.

## Quotability

- **[S] Each key page answers its question in the first paragraph** — Verify: read
  the top of the page — is there a self-contained answer, or a brand slogan?
  · Impact: assistants quote the passage that answers; a slogan is unquotable.
  · Fix: one direct paragraph up top, then the detail.
- **[S] Canonical facts exist as text on a stable URL** — Verify: services,
  pricing, locations, hours, contact — findable as text, not only in a PDF, an
  image, or a form. · Impact: the model invents the answer it cannot find. · Fix:
  put each fact in prose on the page that owns it.
- **[S] The entity is unambiguous** — Verify: one consistent legal/brand name
  across pages, plus `sameAs` links to the real social profiles in the
  `Organization` markup. · Impact: the brand is merged with a similarly named one.
  · Fix: one spelling, `sameAs`, and an about page that states who this is.
- **[S] Published and updated dates are present and honest** — Verify: articles and
  posts for `datePublished`/`dateModified` plus a visible date. · Impact: stale
  content is cited as current, or fresh content is judged old. · Fix: real dates
  from the CMS, in the markup and on the page.
- **[P] `FAQPage` markup where a real FAQ exists** — Verify: FAQ sections without
  it. · Impact: a ready-made answer left unlabeled. · Fix: `FAQPage` JSON-LD with
  the questions as written on the page.
- **[P] `BreadcrumbList` markup on nested pages** — Verify: deep routes. · Impact:
  the page's place in the site is inferred. · Fix: breadcrumb JSON-LD matching the
  visible trail.
