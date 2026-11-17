---
name: website-checklist
title: Website Checklist
description: Pre-production checklist for a website — performance, SEO, AEO, accessibility, deploy, privacy. Use when asked to check whether a site is ready to publish, to run a pre-launch or pre-production review, or to audit a site's performance, SEO, accessibility, or Lighthouse scores.
scope: project
---

# Website Checklist

One question: **is anything missing before this goes to production?**

This is a **check**, not a tutorial. Verify each item, report what fails, hand the
fix to whoever owns it. The how-to lives elsewhere — the project's own guidelines
skill for house conventions, web.dev and the framework docs for everything else.
Each item carries one line of fix, not a lesson.

Runs on request only. Bare = all five areas. With an area argument
(`performance`, `seo`, `aeo`, `accessibility`, `launch`) = that file alone,
same process.

The five areas, each with its full tiered list:

- [performance.md](performance.md) — Core Web Vitals, assets, bundle, build
- [seo.md](seo.md) — indexability, metadata, structure, social/OG preview
- [aeo.md](aeo.md) — AI crawlers, structured data, extractable content
- [accessibility.md](accessibility.md) — keyboard, contrast, semantics, forms
- [launch.md](launch.md) — domain, headers, security, privacy, i18n, console

Tiers: **[B] blocker** — it does not ship · **[S] should** — it ships, the fix
gets scheduled · **[P] polish**.

## 1. Scope

Two things to settle before measuring anything:

- **Where to measure.** The deployed URL is the target — production or a preview.
  With no deploy, build locally for production (`pnpm build && pnpm start`).
  A dev server produces fiction: unminified, uncached, HMR on top. Say which one
  you used in the report.
- **Which routes.** Auditing forty product pages teaches nothing that one
  teaches. List the route templates you found (home, listing, detail, form,
  article…), propose one URL per template, and have the user confirm before you
  measure. Repo-level checks (robots, sitemap, metadata, headers, build) run once
  for the whole site regardless.

**Done when:** the target and the confirmed route list are written down.

## 2. Measure

Lighthouse, twice per route: mobile first (it is the gate), then desktop. Take
the first runner that works:

1. chrome-devtools MCP — `lighthouse_audit`. Also gives console and network for
   §launch.
2. `npx lighthouse <url> --form-factor=mobile --screenEmulation.mobile` and a
   `--preset=desktop` run.
3. Hand the user a ready-made PageSpeed Insights link
   (`https://pagespeed.web.dev/analysis?url=<url>`) and read the numbers they
   bring back.

With no runner and no numbers, every measured item is **unverified** — it is
never a pass. Same rule for the console and network checks in `launch.md` when no
browser is available.

**Thresholds.** Anything worse is a blocker:

| Lighthouse (mobile) | Core Web Vitals | Weight             |
| ------------------- | --------------- | ------------------ |
| Performance ≥ 90    | LCP ≤ 2.5s      | initial JS ≤ 300KB |
| Accessibility ≥ 95  | CLS ≤ 0.1       | gzip / brotli      |
| Best Practices ≥ 95 | INP ≤ 200ms     |                    |
| SEO = 100           |                 |                    |

100 across the board is the aspiration; the table is the gate. SEO is held at
100 because every one of its audits is binary and cheap to fix.

**Done when:** mobile and desktop scores plus the three Core Web Vitals exist for
every confirmed route, or are marked unverified with the reason.

## 3. Gate

Sweep the blockers below before opening any area file — it answers "does this
ship?" in one pass. Every line is the title of a full item in the file named
above it; open that file for how to verify it.

### performance.md

- Lighthouse Performance (mobile) ≥ 90
- LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms
- LCP image loads eagerly and at high priority
- Initial JS ≤ 300KB compressed
- Every image and video is compressed and web-formatted
- Media and embeds carry explicit dimensions

### seo.md

- Lighthouse SEO = 100
- No `noindex` and no `robots.txt` disallow left over from staging
- Every route: unique title, description, and self-referencing canonical
- `robots.txt` and `sitemap.xml` exist, on the production origin, sitemap linked
- OG tags plus a real OG image render in a link preview

### aeo.md

- Main content is present in the server HTML
- AI crawlers are allowed (unless the client asked otherwise), at the host too
- Valid JSON-LD: `Organization` sitewide plus the type each page is

### accessibility.md

- Lighthouse Accessibility ≥ 95
- Every interactive element is keyboard-reachable with a visible focus style
- Text meets WCAG AA contrast
- Every meaningful image has an `alt`; decorative ones have `alt=""`
- Every form control has a label

### launch.md

- Lighthouse Best Practices ≥ 95
- One canonical host: custom domain, HTTPS, www ↔ apex redirect
- Every production env var is set in the host
- Zero console errors and zero failed requests on the audited routes
- `basic-security-audit` runs clean
- HSTS present, source maps not public
- A real 404 page
- Tracking without consent, on a site aimed at the EU

**Done when:** every line above has a verdict. Report the failures immediately —
a blocked launch is news the user needs before you spend an hour on polish. Then
continue; the run does not stop at the gate.

## 4. Full pass

Area by area, top to bottom, all tiers. Each item states how to verify it — run
that, do not judge from memory.

**Conditional areas**, detected rather than asked:

- **i18n** runs when the site has more than one locale — i18n config, a `[locale]`
  segment, or `hreflang` in the HTML. One locale, skip it silently.
- **Privacy** runs when a tracking script is present — GTM, GA, Meta Pixel,
  Hotjar, or similar. Tracking with no consent mechanism is a blocker when the
  site targets the EU and a should otherwise; the jurisdiction is the one thing
  you ask the user, because it cannot be detected.
- **House conventions** are the project guidelines skill's job, not this file's.
  When the project has one installed (`website-guidelines` on the Website
  starter), read the sections that touch the area you are auditing and verify
  conformance. No guidelines skill, skip it — those criteria live in one place and
  this is not it.

**Done when:** every check in all five files has a verdict — pass, fail, or
unverified with a reason.

## 5. Report

By exception. The failures are the report; a wall of "OK" buries the three lines
that matter.

- **Verdict per area** — one line each: `Performance — 3 blockers, 5 should`.
- **Every failure**, blockers first: what fails, where (file:line or URL), the
  impact in one plain sentence, the one-line fix.
- **Unverified** — listed with the reason, never folded into the passes.
- **Ships or not** — say it outright. Zero blockers, or the list of what stands
  in the way.

Write it in the user's language, for the person reading it — usually a designer
or PM: the impact line leads, in plain words ("Google cannot index this page",
not "missing canonical"). The technical check and fix follow for whoever applies
them — a dev or an agent; go deeper only when asked.

The report lives in the chat. When the user wants it outside the conversation,
offer, in this order: an Artifact page (a link to share), a GitHub issue, a Linear
issue, a markdown file.

## 6. Fix

Never commit on the branch the user is on. That branch is their work in progress;
a checklist that disturbs it costs more than it saved.

- **Simple, mechanical fixes** — a missing `alt`, a canonical, a compressed image:
  offer to apply them. On yes, branch off (`hh/checklist-<date>`), commit there,
  and with a git remote open a PR (`gh pr create`). No remote (a project before
  `++ graduate`): the local branch is the deliverable — say so, and that
  `++ graduate` is what turns it into a PR.
- **Everything else** — a re-architecture, a design decision, a client call:
  `gh issue create` per item with the impact and the fix line. No remote: a
  **Pending** section in the report, one line per item, ready to paste.
- **Re-verify what you touched**, nothing more. Re-run Lighthouse only if a
  performance blocker was among the fixes.

**Done when:** every failure is either fixed on the branch or filed, and the PR
description (or the report) says what turned green and what is still open.
