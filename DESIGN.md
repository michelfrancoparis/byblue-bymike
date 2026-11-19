# DESIGN.md

byblue-bymike design system. Tokens live in `styles/globals.css` — reach for tokens, not raw values. The website-setup session fills this in; keep it current as the design evolves.

Source: Figma `Handoff | Internal` (file `rOyIXULtmvJiCbcEt4YtPW`) — Colors `8:1798`, Typography `486:11249`, Grids `964:10477`.

## Color

Semantic tokens only — raw hex lives in `globals.css`, components use tokens. The set stays small: add a role only when the design repeats it.

| Role             | Token                                        | Value                       |
| ---------------- | -------------------------------------------- | --------------------------- |
| Background       | `bg-background` / `--background`             | `#f3edde` Off-White         |
| Foreground       | `text-foreground` / `--foreground`           | `#161b6d` Blue (Deep Ocean) |
| Foreground hover | `bg-foreground-hover` / `--foreground-hover` | `#1f2490` Deep Ocean hover  |
| Accent           | `bg-primary` / `--primary`                   | `#a4d3f6` Light Blue        |
| Accent muted     | `bg-primary-muted` / `--primary-muted`       | `#bfd5de` Light Blue Muted  |
| Secondary text   | `text-muted` / `--muted`                     | `#5e638f` Blue Muted        |
| Card surface     | `bg-card` / `--card`                         | `#ffffff` White             |
| Label pill       | `bg-lime` / `--lime`                         | `#e8ff7d` Electric Lime     |

Section color variants (blue, light blue, off-white, white backgrounds — see Figma "Color semantics") are per-section styling, not themes.

Dark mode: none — single theme.

## Typography

Via `next/font`, instances in `lib/fonts.ts`.

| Role      | Family                                                  | Class                 | Weight |
| --------- | ------------------------------------------------------- | --------------------- | ------ |
| Body / UI | General Sans — **Inter placeholder** until files arrive | `font-sans` (default) | 500    |
| Headings  | Haffer XH (`assets/fonts/HafferXH-Medium.woff2`)        | `font-display`        | 500    |

Figma type styles (desktop, px): Display 120/0.9 · H1 68/1 · H2 48/1 · H3 32/1.2 · H4 28/1.2 · H5 24/1.2 (Haffer XH) · H6 20/1.2 · Body L 24 · Body M 16/1.3 · Body S 14/1.3 · Caption 12/1.3 (General Sans). Tight negative tracking throughout. Type tokens in `globals.css` (`@theme`): `text-display`, `text-h1`, `text-h2`, `text-h4`, `text-h5`, `text-shoulder` (Haffer) · `text-lead`, `text-h6`, `text-body`, `text-body-sm`, `text-caption` (General Sans) — each bundles size, line-height, tracking. `-sm` variants are provisional mobile sizes (no mobile frames yet).

Fluid type scale: standard — 16px flat to 1440px, then 16→22px by 2560px. Mechanics: website-guidelines → Fluid type scale.

## Layout

- Grid: `grid-default` — 4 columns / 6px gap on mobile, 12 columns / 8px gap from `md`.
- Page gutter: `--spacing-global` — 8px at all sizes.
- `container` = full width inside the gutter; internal layouts via `grid-default`.
- Design frames are 1440px wide.

## Icons

One set, consistent stroke width. SVG components in `components/icons/` — copy the `arrow.tsx` pattern.
