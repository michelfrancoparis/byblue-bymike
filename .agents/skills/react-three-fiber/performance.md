# Performance — measure, then spend budgets deliberately

Diagnosis and tuning reference. Rule zero: **measure before optimizing** — every technique here has a cost, and applying one blind trades real simplicity for imagined speed. The budget numbers live in [SKILL.md](SKILL.md); this file is how to hit them.

## Measure

- **`r3f-perf`** — drop `<Perf />` inside the Canvas: live FPS, draw calls, triangles, shaders, memory.
- **`gl.info`** (`useThree((s) => s.gl.info)`) — calls/triangles/geometries/textures should stay **flat** over time. A climbing count is a leak: something is created per frame or never disposed.
- **CPU-bound or GPU-bound? One line:** set `scene.overrideMaterial = new THREE.MeshBasicMaterial()`. FPS jumps → GPU-bound (fragment cost: lights, resolution, materials). No change → CPU-bound (draw calls, JS in the hot path, physics).
- **Spector.js** — captures one frame as the full list of draw calls and texture binds; the truth about what the GPU actually did.

## On-demand rendering

For scenes that change only on interaction (configurators, viewers, data vis):

```jsx
<Canvas frameloop="demand">
```

- Anything that changes the picture must call `invalidate()` (from `useThree`); multiple calls coalesce into one render. drei controls invalidate for you; only vanilla controls need `controls.addEventListener('change', invalidate)`.
- `invalidate()` is async — before starting an imperative animation, call it once ahead so the first frame doesn't visually jump.
- Pause entirely when hidden: flip `frameloop` to `"never"` on `visibilitychange`.

## Adaptive quality — regress + PerformanceMonitor

Quality should fall while the user interacts and recover when they stop.

- **Movement regression.** `<OrbitControls regress />` (any drei control) calls `performance.regress()` on movement, dropping `performance.current` toward `min` (set `<Canvas performance={{ min: 0.5 }}>`) and auto-restoring after ~200ms of calm. Wire `useThree((s) => s.performance.regress)` manually only for custom interactions. Respond by scaling resolution:

  ```jsx
  const current = useThree((s) => s.performance.current);
  const setDpr = useThree((s) => s.setDpr);
  useEffect(
    () => setDpr(Math.min(window.devicePixelRatio, 2) * current),
    [current],
  );
  ```

- **`<PerformanceMonitor>`** (drei) watches sustained FPS: `onDecline` lower DPR / disable post-processing, `onIncline` restore. If quality oscillates, `flipflops={3}` + `onFallback` settles to a stable low baseline.

## Instancing — the biggest single win

Hundreds of meshes sharing geometry + material collapse into **one draw call**: drei `<Instances>` / `<Instance>` declaratively, or `<instancedMesh>` + `setMatrixAt` imperatively.

- Vary appearance with instance colors/attributes, not per-instance materials.
- Instances that move beyond the original bounding sphere pop out of view at screen edges — set `frustumCulled={false}` on the instancedMesh or recompute its bounding sphere.
- Many _different_ geometries under one material: `BufferGeometryUtils.mergeGeometries` for static sets, `BatchedMesh` when they move independently — either way, one draw call.

## Raycasting

- Pointer events hit-test on every pointer move. drei `meshBounds` swaps per-triangle tests for a bounding sphere — right for chunky objects; wrap the scene in drei `<Bvh>` (three-mesh-bvh) for exact hits on heavy meshes — 60fps raycasts on 80k+ triangles.
- Keep handlers off meshes that don't need them — a handler on a group forces tests on everything under it.

## Level of detail

Distant objects don't need full vertex counts — drei `<Detailed>` swaps meshes by camera distance:

```jsx
<Detailed distances={[0, 15, 40]}>
  <HighPoly /> <MediumPoly /> <LowPoly />
</Detailed>
```

Cheaper still for far objects: update them every 2nd–3rd frame, or swap to billboard sprites.

## Shadows — tune or fake

- Shadow map sizes: 512–1024 mobile, 1024–2048 desktop. Memory grows with the square.
- **Tighten the shadow camera** to the scene bounds (`shadow-camera-left/right/top/bottom` on the light) — defaults waste most of the map's resolution. Visualize with drei `useHelper`.
- **Striped or speckled self-shadowing (acne)** — nudge `shadow-bias` (≈ `-0.0001`) or `shadow-normalBias` (≈ `0.02`). Shadows floating off their objects mean you went too far.
- **Static scene → freeze shadows:** `gl.shadowMap.autoUpdate = false`, set `needsUpdate = true` only when something moves.
- Point lights render shadows six times (cube faces) — use spot/directional shadows, or fake it: drei `<ContactShadows>` or a gradient-textured plane.
- Fully static lighting? Bake it into lightmaps — free at runtime.

## Flicker and artifacts

- **Z-fighting** (coplanar surfaces shimmer) — offset one surface by ~0.001, or use `polygonOffset` on the material.
- **Distant flicker** — keep the camera's `near`/`far` as tight as the scene allows; depth precision is spent across the range you declare.
- **Jitter far from origin** — keep the scene near `(0,0,0)`; float precision degrades with distance from it.

## Post-processing

- Use `@react-three/postprocessing` (pmndrs), not Three's stock EffectComposer — it merges compatible effects into fewer fullscreen passes.
- With any post-processing, set `gl={{ antialias: false }}` (MSAA is wasted) and add SMAA as the final effect. **Without** post-processing, keep the default MSAA — it's cheap.
- Bloom: set a luminance threshold (~0.9) so only bright pixels bloom, and keep `multisampling: 0` unless needed.
- Make the whole composer toggleable — it's the first thing `onDecline` should switch off.

## Leaks and disposal

- R3F disposes declaratively-mounted objects on unmount. Anything created with `new` yourself must be disposed in the effect cleanup: `geometry.dispose()`, `material.dispose()`, `texture.dispose()`.
- Symptom: `gl.info.memory` climbs as the app runs, then the tab crashes on mobile. Cause is almost always per-frame creation or undisposed manual objects.
- Spawning/despawning many objects (bullets, particles)? Pool and reuse instead of add/remove.

## Heavy work off the frame

- Physics: simple colliders (box, sphere), never auto-generated trimesh; lowering the timestep is a last-resort fallback that changes behavior.
- ≥50k animated particles → move the animation into a vertex shader; the GPU handles millions.

## One-line wins

- `gl={{ powerPreference: 'high-performance' }}` — nudges dual-GPU laptops onto the discrete GPU.
- `matrixAutoUpdate={false}` on static objects (call `updateMatrix()` once after placing) — skips per-frame matrix math across large static scenes.
