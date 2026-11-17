# Accessibility

Target: **WCAG 2.2 AA**. Lighthouse is the floor, not the ceiling — automated
tools catch roughly a third of real barriers, so the keyboard and contrast checks
below are done by hand even at a score of 100.

## Automated

- **[B] Lighthouse Accessibility ≥ 95** — Verify: the mobile run from §2.
  · Impact: the failures listed are the ones a machine can already see. · Fix: each
  audit names the element and the rule.
- **[P] axe DevTools pass on the audited routes** — Verify: the axe extension or
  `@axe-core/cli`. · Impact: catches rules Lighthouse does not ship. · Fix: per
  the rule's own guidance.

## Keyboard

- **[B] Every interactive element is reachable by keyboard, with a visible focus
  style** — Verify: Tab through each audited route without touching the mouse.
  · Impact: anyone who cannot use a mouse cannot use the site — and this is the
  barrier custom-styled sites create most often. · Fix: real `button`/`a`
  elements, and a `:focus-visible` style with AA contrast against its background.
- **[S] Focus order follows the visual order, with no traps** — Verify: keep
  tabbing — does focus jump around or get stuck? · Impact: the page becomes a maze.
  · Fix: fix the DOM order rather than patching with `tabindex`.
- **[S] Overlays manage focus** — Verify: open a modal, drawer, or menu — focus
  moves in, stays inside, Escape closes it, focus returns to the trigger.
  · Impact: a screen-reader or keyboard user is left navigating a page they cannot
  see behind the overlay. · Fix: an accessible primitive handles all four
  (shadcn/Radix, or a focus-trap library).
- **[S] A skip link jumps past the navigation** — Verify: Tab once from the top of
  the page. · Impact: every visit starts by tabbing through the whole menu. · Fix:
  a first-in-DOM link to `#main`, visible on focus.
- **[S] Interactive elements are the right element** — Verify: search for `onClick`
  on `div`/`span`. · Impact: not focusable, not announced, no Enter/Space. · Fix:
  `button` for actions, `a href` for navigation.

## Visual

- **[B] Text meets AA contrast** — Verify: Lighthouse contrast audit, plus a manual
  check on text over images, gradients, and video, which automation misses.
  · Impact: unreadable copy for anyone with reduced vision, and in daylight for
  everyone. · Fix: 4.5:1 for body text, 3:1 for text ≥ 24px and for UI borders;
  add a scrim under text over media.
- **[S] Information is never carried by color alone** — Verify: form errors,
  status badges, chart legends, links inside paragraphs. · Impact: invisible to
  colorblind users. · Fix: pair the color with text, an icon, or an underline.
- **[S] The page survives 200% zoom and a larger browser font** — Verify: zoom to
  200%, then set the browser's base font-size to 20px. · Impact: text clips or
  overlaps for people who enlarge type. · Fix: rem/em for sizes and media
  queries; avoid fixed-height text containers.
- **[S] `prefers-reduced-motion` is honored** — Verify: enable Reduce Motion in the
  OS and reload — parallax, autoplay, and scroll animation should calm down.
  · Impact: motion-sensitive visitors get nausea or migraine from the site.
  · Fix: the media query around the animation, with a static end state.
- **[S] Touch targets are at least 44×44px** — Verify: measure the smallest
  buttons and icon links on mobile. · Impact: mis-taps on every phone. · Fix:
  padding, not a bigger icon.

## Content & forms

- **[B] Meaningful images have a real `alt`; decorative ones have `alt=""`** —
  Verify: every `img` on the audited routes. · Impact: screen-reader users hear
  a filename, or hear decoration read aloud. · Fix: describe the content and its
  purpose; empty `alt` for pure decoration.
- **[B] Every form control has a label** — Verify: each input, select, and textarea
  for a `label` (a placeholder is not a label). · Impact: the field is unnamed the
  moment typing starts, for everyone. · Fix: `<label for>` or a visually hidden
  label plus `aria-label` on the control.
- **[S] Icon-only controls have accessible names** — Verify: hamburger, close,
  play, social icons. · Impact: announced as "button", with no clue what it does.
  · Fix: `aria-label`, and `aria-hidden` on the decorative SVG.
- **[S] Errors and success are announced, not just shown** — Verify: submit a form
  with bad input — is the message tied to the field and read out? · Impact: a
  screen-reader user does not know the submit failed. · Fix: `aria-describedby` to
  the message, `aria-invalid` on the field, a live region for the summary.
- **[S] Landmarks structure the page, with one `main`** — Verify: `header`, `nav`,
  `main`, `footer` present and used once each as intended. · Impact: no way to jump
  between regions with a screen reader. · Fix: the semantic elements instead of
  `div`s.
- **[S] Media does not exclude** — Verify: spoken video for captions, and any
  audio that autoplays. · Impact: deaf visitors lose the content; autoplay audio
  drives everyone away. · Fix: captions or a transcript; autoplay stays muted.
- **[P] One end-to-end flow tested with a screen reader** — Verify: VoiceOver
  (⌘F5) through the primary conversion flow. · Impact: reveals the gaps no
  automated rule expresses. · Fix: per what the run exposes.
