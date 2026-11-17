# Theme switcher — next-themes + class strategy

A visitor-facing switcher: every color token gets a value per theme, and the whole site flips. The starter ships a `prefers-color-scheme` media query (system-only, no switch); this replaces it.

Two shapes, same mechanism — read the shared steps, then the one the session chose.

1. `pnpm add next-themes`
2. `styles/globals.css` — every color token gets a value in each theme block. Delete the `prefers-color-scheme` media query; the class is the only source of truth.
3. `components/theme-provider.tsx` — `'use client'` wrapper around next-themes' `ThemeProvider`. In the root layout: wrap the body content with it and add `suppressHydrationWarning` to `<html>` (next-themes sets the class pre-hydration; without it React logs a mismatch).
4. Switcher in the header — a small client component on `useTheme()`; render its label/icon only after mount so the server never guesses the theme.
5. `themeColor` — the static `viewport` export keys on the OS scheme, not on the class toggle, so it goes wrong exactly when the switch is used. Update the meta from the switcher instead: a small effect on `resolvedTheme` sets `<meta name="theme-color">` to that theme's background.

## Light + dark

- `globals.css`: after the tailwind import, `@custom-variant dark (&:where(.dark, .dark *));`. Move the dark values from the media query into `.dark { … }`.
- Provider: `<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>`.

Verify: switching is instant; reload in each theme shows no flash; a first visit follows the system.

## Custom themes

Named themes the designer defined (`sand`, `forest`, `night`…) — any number, not necessarily a light/dark pair.

- Get the themes first: the user names them and their colors in plain words, or points at the Figma modes ([figma.md](./figma.md) reads them). Confirm the list in the decision sheet before writing any CSS — a theme added later means touching every token block.
- `globals.css`: `:root` holds the default theme; each other theme is a `.theme-<name> { … }` block overriding the same token set. Same tokens in every block, no exceptions — a token missing from one theme silently inherits the default and breaks only in that theme.
- Provider: `<ThemeProvider attribute="class" themes={['sand', 'forest', 'night']} defaultTheme="sand" disableTransitionOnChange>`, and next-themes writes the raw value as the class — so name the blocks exactly as the theme values (`.sand`, not `.theme-sand`) or pass `value={{ sand: 'theme-sand', … }}`.
- `enableSystem` only if two of the themes really are the light and dark answer; otherwise leave it off, the OS has no opinion on `forest`.
- Switcher: a list, not a toggle — the themes come from the same array, so keep it in one exported constant next to the provider.
- A `dark:` variant still needs `@custom-variant dark (&:where(.night, .night *));` pointed at whichever theme is the dark one. If none is, don't use `dark:` classes at all.

Verify: each theme reloads without a flash and with no token falling back to the default; the switcher lists every theme.
