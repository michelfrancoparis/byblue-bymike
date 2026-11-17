# Shaders with React Three Fiber

Gotchas and conventions for custom GLSL via `shaderMaterial`. GLSL itself is assumed — this file is the R3F-specific and hard-won part.

## Uniforms — React's channel in

- **Memoize the uniforms object; mutate `.value`** — the frozen-shader bug, spelled out in [SKILL.md](SKILL.md).
- **Declare every uniform up front.** The set is fixed when the shader compiles — you can't bolt new ones onto a live material.
- **Update only what changed.** Setting an unchanged uniform every frame is wasted work.
- **Naming:** `u_` prefix for uniforms, `v_` (or `vUv`) for varyings — the reader instantly knows where a value comes from.
- Keep GLSL in `.glsl` files (`?raw` import or glslify), not inline template strings.

## Perf rules the compiler won't teach you

- **Branchless: `mix()` / `step()` / `smoothstep()` over `if`.** GPUs run pixels in lockstep; every pixel pays for both sides of a branch.
- **No dynamic loop bounds** — the compiler must be able to unroll.
- **`mediump` precision on mobile** — roughly twice as fast as `highp` there.
- **Keep varyings under ~3 on mobile** — vertex-to-fragment interpolation isn't free.
- **Identical shader source compiles to one shared program** — feed differences in through uniforms instead of generating per-mesh source.

## Looks

- **Noise, not random.** `random()`-style hashes read as static; organic motion is Perlin/Simplex (the `glsl-noise` package) driven by `u_time`. Layer two frequencies for richer movement.
- **Displacement needs vertices.** A displaced low-segment plane renders visible stepping — use dense geometry (`icosahedronGeometry` detail ~20, planes with 64+ segments) under vertex displacement.

## Debugging — there is no console.log

- **Print with color:** `gl_FragColor = vec4(vec3(value), 1.0);` — black is 0, white is 1, the gradient is your data.
- **Blank or black mesh = compile error.** The message and line number are in the browser console.
- **Bisect.** Comment out half the shader, re-check, repeat.

## Keep the lighting — composed materials

Reimplementing lights, shadows, and tone mapping in raw GLSL is a trap for non-experts. Graft custom GLSL onto `MeshStandardMaterial` with `three-custom-shader-material` (or `material.onBeforeCompile`) and keep all of it for free. Reserve drei's `shaderMaterial` helper for genuinely unlit effects.
