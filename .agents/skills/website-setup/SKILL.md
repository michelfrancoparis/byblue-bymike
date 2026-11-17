---
name: website-setup
title: Website Setup
description: 'Interactive setup session for a new website on the ++hellohello website starter (Next.js). Use on the first task in a fresh project, and whenever the user wants to start a website or set up colors, typography, grid, dark mode or theme switcher, languages, 3D, or a Figma reference. Asks plain-words questions one at a time, then implements the answers. Also owns the project README ("update the readme").'
scope: project
---

# Website Setup

One-time session that turns the fresh starter into _this_ project: interview the user, implement the answers on the boilerplate, record the decisions. It ends with the dev server running and the user looking at their own colors and type.

## Who you're talking to

Often non-technical — a designer or project owner, not a developer. Reply in the language they write in. Short questions, plain words, concrete options. Say "page margins" and "how text scales on big screens" — the words a designer uses, never CSS variables or rem.

## Ground rules

- One question at a time. Prefer the AskUserQuestion tool; without it, ask in chat the same way.
- Recommend only where the agency has a standard — structure, URL style, the starter defaults. The theme switcher, languages, and 3D are the designer's call on this project: ask them neutrally, no recommended option.
- When in doubt, the standard wins — the starter defaults exist for exactly that. Standards stay visible: say what's being kept, never keep it silently.
- This skill decides _what_; website-guidelines knows _how_ (fluid scale math, grid, gutter, fonts). Follow it for every edit.
- Partial runs: asked only for the README ("update the readme"), skip the session — [project-readme.md](./project-readme.md) alone, answers from the project files.
- Next-starter only: no `next` in `package.json` → say this skill doesn't apply here and stop.
- Fresh-project guard: placeholders in DESIGN.md are a hint, not proof — `++ sync` can seed a placeholder DESIGN.md into a mature project, and a legacy project may have none at all. Judge from the project itself (starter-default `globals.css` and `SITE_NAME`, stock README, little git history) whether setup really never ran; on anything already customized, confirm with the user before changing it.

## The session

### 1. Figma first

"Do you have a Figma design for this site?"

- **Yes** → read [figma.md](./figma.md): derive everything the file can answer, propose, confirm. Then step 2 covers only what's still open.
- **No** → step 2 covers everything.

### 2. Interview

One at a time, skipping whatever Figma already settled:

1. **Site name** — browser tab + metadata.
2. **Typography** — a Google Font name, or font files (woff2 → `assets/fonts/`).
3. **Colors** — background, text, one accent minimum. Hex codes or a reference to match.
4. **Theme switcher** — "a button to switch the site's theme?" No · yes, light + dark · yes, custom themes. Custom → which ones? Plain words or the Figma modes. Any yes → [themes.md](./themes.md) at implementation.
5. **Structure** — read the live values from `styles/globals.css` (`grid-default`, `--spacing-global`, the fluid-scale comment) and present them once, in designer terms — e.g. "12-column grid, page margins of 16px (24px on tablet up), text scales gently from 16px to 22px on very wide screens, content sits full-width inside the margins". Keep the standard (recommended) or adjust? Per-axis questions only if adjusting.
6. **Languages** — one or several? Several → the sub-interview in [i18n.md](./i18n.md). One → just set `lang`.
7. **3D / shaders** — planned anywhere on the site? Yes → [webgl.md](./webgl.md) at implementation.

### 3. Confirm

Recap every decision as a **decision sheet** — the format for anything the user approves (the Figma proposal uses it too). One bullet per axis, values visible, standards marked as kept — a designer scans it; a paragraph hides the values. It goes in the chat message as plain markdown (a code fence would show raw `**` instead of bold):

- **Colors** — background cream `#FAF5EC` · text brown `#3B2F2A` · accent orange `#E8630A`
- **Typography** — Fraunces (Google Font) · body 400 · headings 600
- **Structure** — standard kept: 12-column grid, 16px margins (24px tablet up), text 16→22px on wide screens
- **Theme switcher** — yes: light + dark (or the named themes) · no: single theme
- **Languages** — es (main, no prefix) + en
- **3D** — none

Send the sheet as a message — this project's values, the user's language — then ask: set it up, or adjust something first? Adjusting reopens just that axis, then the sheet again.

### 4. Implement

Follow website-guidelines for every edit:

- **Colors** → `styles/globals.css`, `:root` + `@theme inline`. Small token set — curate, don't copy (figma.md). Also `themeColor` in the root layout → the real background color.
- **Fonts** → `lib/fonts.ts` + root layout.
- **Site name** → `SITE_NAME` in `lib/constants.ts`.
- **Language** → `lang` on `<html>`.
- **Structure adjustments** → `globals.css`, only the axes they changed.
- **Theme switcher** — yes → [themes.md](./themes.md) · no → delete the `prefers-color-scheme` block.
- **Several languages** → [i18n.md](./i18n.md).
- **3D** — yes → [webgl.md](./webgl.md).

### 5. Record

One decision, one home — future sessions read these instead of re-asking:

- **DESIGN.md** — how it looks: palette, fonts, type scale, grid/gutter, theme switcher. Replace every placeholder the session decided; keep sections the session didn't touch intact.
- **AGENTS.md → Stack decisions** — how it's built: languages + URL strategy, 3D. Fill the one-line description too (the same line the README header uses), and delete the "run website-setup" line — setup is done.
- **README.md** — the project's front door: structure in [project-readme.md](./project-readme.md). The starter's stock file is replaced without asking; a README with real project content gets a confirm first.

DESIGN.md and AGENTS.md are sync-safe: `++ sync` never overwrites an edited seed. If the project predates the templates and DESIGN.md is missing, create it with the same structure and fill it; an older DESIGN.md with a different shape keeps its sections — add the missing ones.

### 6. Show it

`pnpm dev`, then send the user to http://localhost:3000: their colors, their fonts, their site. Ask if it looks right — corrections are cheapest now.

**Done when** every interview answer is implemented and recorded, DESIGN.md's decided sections carry no placeholders, and the user has seen the running site and confirmed it.
