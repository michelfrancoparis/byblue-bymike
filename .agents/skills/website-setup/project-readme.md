# Project README

The README is the project's front door: what a teammate reads before their first `pnpm dev`. Setup writes it over the starter's stock file. It also runs alone — the user asks to "update the readme" — in which case skip the session and pull every answer from the project itself: `package.json` (stack + versions), AGENTS.md, DESIGN.md, `.env.example`, the app tree.

Same section order every time; a section appears only when it applies:

1. **Header** — centered `<div align="center">`: an emoji image that fits the project (`https://em-content.zobj.net/source/apple/419/<name>_<codepoint>.png`, 80×80 — fetch the URL first, a guessed slug 404s; pick another emoji if it does), `<h1>` site name, one-line description — the same line as AGENTS.md's one-liner; write it once (from the session or one short question) and use it in both.
2. **Stack** — linked list, versions as in `package.json`: Next.js + React, TypeScript, Tailwind CSS, GSAP, plus what setup added (React Three Fiber, …).
3. **Pre-requisites** — only when there's more than Node + pnpm: version constraints, access to external services ("request from team").
4. **Getting started** — numbered: `pnpm install` → `pnpm dev` → open http://localhost:3000. A simple project folds pre-requisites into one line here.
5. **Environment variables** — none needed: say exactly that ("Plain `pnpm dev` needs no environment variables"), plus the pull recipe — `pnpm dlx vercel link` once, `pnpm dlx vercel env pull` for values ("Ask the team for Vercel access."). Vars exist: a table (variable / required / purpose), server-only secrets flagged "never `NEXT_PUBLIC_`".
6. **Locales** — several languages only: which, the main one, URL strategy, where routing lives (`proxy.ts`).
7. **Conventions** — a few project-specific bullets (pnpm only, kebab-case, `cn()`, `px-global` / `grid-default`), then point to AGENTS.md and the website-guidelines skill for full rules — never restate them.

Skeleton:

````markdown
<div align="center">
  <img
    src="https://em-content.zobj.net/source/apple/419/rocket_1f680.png"
    alt=""
    width="80"
    height="80"
  />
  <h1>Site Name</h1>
  <p>One line: what this is, who it's for.</p>
</div>

## Stack

- [Next.js v16](https://nextjs.org/docs) + [React v19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP](https://gsap.com/docs/v3/)

## Getting started

Needs Node >= v20 and `pnpm`.

1. Run `pnpm install`.
2. Run `pnpm dev`.
3. Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Plain `pnpm dev` needs no environment variables. Every variable is documented
in [`.env.example`](.env.example); real values go in `.env.local` (gitignored)
and in Vercel — never committed.

If you have access to the Vercel project, don't hand-copy values — pull them:

```bash
pnpm dlx vercel link # once: connect this folder to the Vercel project
pnpm dlx vercel env pull # writes .env.local with the current values
```

## Conventions

- **Package manager:** `pnpm` only.

See [AGENTS.md](AGENTS.md) for full rules.
````
