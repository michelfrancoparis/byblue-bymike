# Deriving setup from Figma

Goal: the user confirms a proposal instead of answering questions the design already answers.

## Read the file

Ask for the link. Use the Figma MCP tools — `get_variable_defs` for tokens, `get_metadata` to find the key frames, `get_screenshot` / `get_design_context` on the main desktop frame.

No Figma MCP connected → offer to set it up together, right now: you run the commands, the user only approves and signs in. The official route is Figma's remote MCP at `https://mcp.figma.com/mcp` — in Claude Code: `claude mcp add --transport http figma https://mcp.figma.com/mcp`, then the user authenticates via `/mcp` (browser sign-in); other agents point their MCP config at the same endpoint. If the command has drifted, check Figma's current MCP docs instead of guessing. Verify with a small read on their link before continuing. Only if they'd rather skip it: continue manually — the user reads values off the design and you ask.

Extract, in order of trust:

- **Colors** — variables/styles first; else sample the main frames.
- **Typography** — families + the weights actually used.
- **Structure** — the frame's layout grid (columns, gap, margins), and the frame width itself (1440-based? note it — the rem math assumes it, see website-guidelines → Styles).
- **Themes** — modes/variants of the same screens; their names are the theme names. Dark sections within one design don't count.
- **Site name** — the file name is a suggestion, never an answer; confirm it.

## Curate, don't copy

The starter's token set is deliberately small (`background`, `foreground`, `primary`, plus what the project truly repeats). Figma files carry bookkeeping — grey/100…900 ramps, aliases, one-off tints. Import the design's _decisions_, not its bookkeeping:

- Map values to semantic roles (background, foreground, primary, muted, border, card…). A token earns its place when a role repeats across the design.
- Collapse near-duplicates (#111 vs #0f0f0f → one token).
- A value used once belongs in that one component later, not in the theme today.
- Font sizes stay out of setup — they're Tailwind classes per component. Setup fixes family + weights, and fluid-scale anchors only when the design demands non-default ones.

The test: every token is nameable by role. If its best name is `grey-300`, it's not a setup token.

## Propose, then confirm

Present the findings as a decision sheet (format: SKILL.md → Confirm) — one axis per line, plain color words + hex, one line of reasoning where it helps, standards marked as kept. Confirm, then return to the interview for what Figma couldn't answer (usually languages and 3D).
