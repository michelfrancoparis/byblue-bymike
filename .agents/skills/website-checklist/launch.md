# Launch

Everything that lives outside the page: the host, the domain, the headers, the
runtime, and the legal surface. Two sections are conditional — see §4 of
[SKILL.md](SKILL.md) for when i18n and privacy apply.

- **[B] Lighthouse Best Practices ≥ 95** — Verify: the mobile run from §2.
  · Impact: this score is where mixed content, deprecated APIs, and console errors
  surface. · Fix: each failing audit names it.

## Domain & hosting

- **[B] One canonical host, on HTTPS** — Verify: request the site on
  `http://`, on `www.`, and on the apex — each should land on the same final URL
  over HTTPS. · Impact: four addresses for one site splits SEO signals and breaks
  absolute links. · Fix: the custom domain in the host, with the redirect from the
  other forms.
- **[B] Every production env var is set in the host** — Verify: `.env.example`
  against the host's production environment, one by one. · Impact: the build is
  green and the site is broken — the classic launch-day failure. · Fix: set the
  missing values in the host, then redeploy (a var added after a build is not in
  it).
- **[B] A real 404 page exists** — Verify: request a nonsense path. · Impact:
  visitors hit a framework error screen and leave. · Fix: `app/not-found.tsx`
  (Next), with a link back into the site.
- **[S] The 404 returns status 404** — Verify: `curl -sI <url>/does-not-exist`.
  · Impact: a page that looks like a 404 but answers 200 gets indexed as content.
  · Fix: let the framework's not-found path handle it instead of rendering a
  "not found" component on a 200 route.
- **[S] Previews and staging are not indexable** — Verify: a preview deployment's
  `robots.txt` and `noindex` header. · Impact: preview URLs compete with
  production in search. · Fix: gate indexability on the deployment environment.
- **[S] The build reproduces from a clean clone** — Verify: the lockfile is
  committed and CI builds green from scratch. · Impact: it builds on one laptop
  and nowhere else. · Fix: commit the lockfile; move whatever only exists locally
  into the repo or the env.
- **[P] Errors in production are visible somewhere** — Verify: ask whether anyone
  would find out if the site started throwing. · Impact: silent breakage between
  visits. · Fix: the host's log drain, or an error tracker — a recommendation, not
  a setup task.

## Runtime

- **[B] Zero console errors and zero failed requests on the audited routes** —
  Verify: load each route with the console and network panels open; interact once
  (open the menu, submit a form). · Impact: an error in the console is a broken
  feature the team has stopped seeing. · Fix: resolve each; a warning that stays
  is a decision that goes in the report. Without a browser, this is **unverified**.
- **[S] No hydration mismatch warnings** — Verify: the console on first load of a
  server-rendered route. · Impact: content flashes or swaps after paint, and
  interactivity arrives late. · Fix: the usual causes are dates, randomness, and
  browser-only values rendered on the server.
- **[S] No mixed content** — Verify: the console for `http://` requests on an
  HTTPS page. · Impact: browsers block the asset and warn the visitor. · Fix:
  HTTPS URLs everywhere, protocol included.
- **[S] Failures degrade visibly** — Verify: an error boundary around risky
  subtrees, and a form submitted with the network throttled to offline. · Impact:
  a blank screen, or a form that swallows the submit in silence. · Fix: an error
  state per boundary, and explicit success/error states on every form.
- **[S] Debug leftovers are gone** — Verify: `console.log`, commented-out blocks,
  lorem ipsum, placeholder images, TODO copy, test data on the audited routes.
  · Impact: the client finds them before you do. · Fix: delete them.

## Security

- **[B] `basic-security-audit` runs clean** — Verify: invoke that skill; it owns
  secrets, private data in the repo, and dangerous defaults. · Impact: the
  catastrophic launch failures live there, not here. · Fix: per its report. Those
  checks stay in one place — this file adds only the web surface below.
- **[B] HSTS is on and source maps are not public** — Verify:
  `curl -sI <url> | grep -i strict-transport`, then request a `.map` file from the
  production build. · Impact: downgrade attacks stay possible, and readable source
  hands over the app's internals. · Fix: `Strict-Transport-Security` in the host's
  headers; disable production source maps or restrict them.
- **[S] Baseline security headers are set** — Verify: `curl -sI <url>` for
  `Content-Security-Policy`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy`, and `frame-ancestors` (or `X-Frame-Options`). · Impact:
  injected scripts, MIME sniffing, and clickjacking all stay available. · Fix:
  headers in the framework or host config; a CSP deliberately omitted is a
  decision to record, not a silent gap.
- **[S] No known critical vulnerabilities in dependencies** — Verify:
  `pnpm audit --prod`. · Impact: a published exploit shipping in the bundle. · Fix:
  update the package; when no fix exists, record it with its exposure.
- **[S] External links cannot reach back** — Verify: `target="_blank"` without
  `rel="noopener"`. · Impact: the opened page can manipulate yours. · Fix: add
  `rel="noopener noreferrer"`.

## Privacy — when tracking is present

Applies when GTM, GA, Meta Pixel, Hotjar, or any similar script is loaded. **Ask
the user which jurisdiction the site targets** — it cannot be detected, and it
decides the tier below.

- **[B/S] Non-essential scripts wait for consent** — Verify: load the site in a
  clean browser profile and watch the network before clicking anything — do
  tracking requests fire? · Impact: for an EU-facing site this is an unlawful
  launch (**blocker**); elsewhere it is a risk to record (**should**). · Fix: a
  consent banner that gates the scripts, with reject as easy as accept.
- **[S] Third-party embeds do not load before consent** — Verify: YouTube, Vimeo,
  maps, and fonts on a first visit. · Impact: each embed sets its own cookies in
  the visitor's browser. · Fix: click-to-load placeholders, or the
  no-cookie variants.
- **[S] Privacy policy and cookie policy are linked and current** — Verify: the
  footer links resolve, and the policy names the tools actually installed.
  · Impact: a policy that contradicts the site is worse than none. · Fix: the
  client's legal text, listing the real tools.
- **[S] Form submissions have a known destination** — Verify: where contact-form
  data lands, and who can read it. · Impact: personal data in an inbox or a
  spreadsheet nobody owns. · Fix: document the destination in the project's README
  or `AGENTS.md`.

## i18n — when the site has more than one locale

- **[S] `hreflang` is reciprocal, with `x-default`** — Verify: the tags on each
  locale's version of one page — every locale lists all the others, and points
  back. · Impact: search engines serve the wrong language, or treat the versions
  as duplicates. · Fix: `alternates.languages` in `metadata`, generated from the
  locale list.
- **[S] The locale is in the URL** — Verify: whether switching language changes the
  URL. · Impact: a cookie-only locale gives one URL several contents; crawlers see
  one. · Fix: a `[locale]` route segment.
- **[S] `lang` matches the locale being rendered** — Verify: view source per
  locale. · Impact: wrong screen-reader pronunciation and wrong translation
  signals. · Fix: set it from the active locale in the root layout.
- **[S] No untranslated strings leak** — Verify: walk each locale's audited routes
  for source-language text or raw translation keys. · Impact: half-translated pages
  read as broken. · Fix: complete the message files; make a missing key fail the
  build rather than render.
- **[S] Dates, numbers, and currency are localized** — Verify: any formatted value
  per locale. · Impact: `3/4/2026` means two different days to two visitors. · Fix:
  `Intl` with the active locale.
- **[P] Locale detection does not hard-redirect crawlers** — Verify: request the
  root with a foreign `Accept-Language`, and as a bot user-agent. · Impact: only
  one locale ever gets indexed. · Fix: offer the switch; keep every locale
  reachable at its own URL.

## House conventions

- **[S] The project's guidelines skill is satisfied** — Verify: when the project
  has one installed (`website-guidelines` on the Website starter), read the
  sections touching the areas you audited and check conformance. · Impact:
  the project drifts from the agency's conventions, and the next person pays.
  · Fix: per that skill — it is the single source of truth for house rules, so
  nothing from it is restated here. No guidelines skill installed: skip, no
  failure.
