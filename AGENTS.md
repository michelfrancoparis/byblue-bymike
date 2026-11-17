Work style: telegraph; noun-phrases ok; drop grammar; min tokens.

# byblue-bymike

ByBlue marketing site (Next.js + Prismic CMS) — internal test build to explore Prismic's agentic workflow; the live site is untouched.

Design system: [DESIGN.md](./DESIGN.md). House conventions: the website-guidelines skill.

Never commit unless asked. Never commit secrets — `.env*` stays gitignored; commit only `.env.example`.

You are usually talking to a designer, PM, or other non-engineer: plain words by default, technical depth on request.

## Stack decisions

Set by website-setup; update when they change.

- Languages: en only (site will later be en + es)
- 3D/WebGL: react-three-fiber — interactive globe on /farming
- CMS: Prismic, repo `68ttdszl`

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
