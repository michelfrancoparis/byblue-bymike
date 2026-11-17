<div align="center">
  <img
    src="https://em-content.zobj.net/source/apple/419/blueberries_1fad0.png"
    alt=""
    width="80"
    height="80"
  />
  <h1>ByBlue</h1>
  <p>ByBlue marketing site (Next.js + Prismic CMS) — internal test build to explore Prismic's agentic workflow; the live site is untouched.</p>
</div>

## Stack

- [Next.js v16](https://nextjs.org/docs) + [React v19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP](https://gsap.com/docs/v3/)
- [React Three Fiber](https://r3f.docs.pmnd.rs/) + [Drei](https://drei.docs.pmnd.rs/) — 3D globe

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
pnpm dlx vercel link         # once: connect this folder to the Vercel project
pnpm dlx vercel env pull     # writes .env.local with the current values
```

## Conventions

- **Package manager:** `pnpm` only.
- **Layout:** `container` / `px-global` for page gutter, `grid-default` for the design grid.
- **Fonts:** headings `font-display` (Haffer XH), body `font-sans`. Design tokens in [DESIGN.md](DESIGN.md).

See [AGENTS.md](AGENTS.md) for full rules.
