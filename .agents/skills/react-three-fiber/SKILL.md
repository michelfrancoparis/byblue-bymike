---
name: react-three-fiber
description: React Three Fiber, Drei, and shader best practices. Use when writing or reviewing React Three Fiber / Three.js code — a <Canvas> scene, useFrame animation, drei helpers, GLSL or shaderMaterial — or when a 3D scene is slow, janky, or leaking memory.
scope: project
---

# React Three Fiber

You are writing React, but the frame loop is not React. Every rule below descends from one law: **React builds the scene; the frame loop mutates it.** Anything that runs every frame — the **hot path** — must never set state, allocate objects, or recompile materials. Written for developers who know React but not GPUs: the costs are invisible in code and very visible on the user's laptop.

Deep dives: [shaders.md](shaders.md) for GLSL gotchas; [performance.md](performance.md) for profiling and tuning.

## The hot path — per-frame work never touches React

- **Mutate refs, never setState.** setState inside `useFrame`, fast intervals, or pointer-move handlers routes 60fps updates through the React reconciler and tanks the frame rate.

  ```jsx
  // Re-renders the component tree every frame — never
  useFrame(() => setX((x) => x + 0.1));

  // Mutates the object directly — free
  useFrame((_, delta) => (ref.current.position.x += delta));
  ```

- **Scale by `delta`.** `+= 0.01` runs 2.4× faster on a 144Hz monitor than on 60Hz. `+= delta * speed` is identical everywhere.
- **Damp toward goals.** Smooth "move to the target" motion is a damp in the hot path, not animated React state — and unlike a fixed `lerp(…, 0.1)`, damp is frame-rate independent:

  ```jsx
  useFrame((_, delta) => {
    ref.current.position.x = THREE.MathUtils.damp(
      ref.current.position.x,
      targetX,
      4,
      delta,
    );
  });
  ```

- **Allocate nothing per frame.** `new THREE.Vector3()` inside `useFrame` means garbage-collector stutter. Create scratch objects once, reuse with `.set()`:

  ```jsx
  const vec = new THREE.Vector3(); // module scope or useMemo — created once
  useFrame(({ pointer }) =>
    ref.current.lookAt(vec.set(pointer.x, pointer.y, 1)),
  );
  ```

- **Read stores imperatively in the hot path.** Inside `useFrame`, `useStore.getState().x` — a reactive binding re-renders the component sixty times a second.
- **Defer heavy updates.** Wrap expensive-but-not-urgent state changes (regenerating geometry, swapping levels) in `startTransition` so the frame loop keeps priority.

## Share everything — one geometry, one material, many meshes

Every unique material is a shader compile; every unique geometry is a GPU upload. Sharing is the cheapest optimization that exists.

- **Define once, reference everywhere.** Geometry and material at module scope or in `useMemo`; hand the same instance to every mesh.

  ```jsx
  const geom = new THREE.IcosahedronGeometry(1, 2);
  const mat = new THREE.MeshStandardMaterial({ color: "hotpink" });
  items.map((pos, i) => (
    <mesh key={i} geometry={geom} material={mat} position={pos} />
  ));
  ```

- **Treat `args` as immutable.** `args` are constructor arguments — changing them throws the old object away and builds a new one. Animate with `scale`, `position`, or a shader, never by re-rendering new `args`.
- **Load through hooks, never raw loaders.** `useGLTF`, `useTexture`, `useLoader` cache by URL — ten components asking for one file share one copy. `new TextureLoader().load()` in an effect defeats the cache and leaks.
- **Toggle `visible`, never unmount.** `{show && <Model />}` destroys buffers and recompiles shaders on every toggle. `<Model visible={show} />` is free.
- **Guard shared resources with `dispose={null}`.** R3F auto-disposes on unmount; a cached model unmounted by one consumer disappears for all of them unless you opt out.
- **Run models through `gltfjsx`.** It turns a GLB into a reusable JSX graph with shared geometry — and `useGLTF.preload(url)` at module scope removes the load stall.

## Drei first — don't hand-roll what's already solved

Check [drei](https://github.com/pmndrs/drei) before writing it yourself: `Environment` (image-based lighting), `Text` (SDF — never `TextGeometry` for UI), `Center` / `Bounds` (framing), `Float` (idle motion), `ContactShadows` (faked, cheap), `Instances` (draw-call collapse), `Detailed` (LOD), `PerformanceMonitor` (adaptive quality), `Bvh` / `meshBounds` (fast raycasts), `useHelper` (debug visualization).

## Budgets — the numbers that decide the frame rate

Frame rate is a handful of budgets, most spent quadratically. Know where you stand before adding anything.

- **Draw calls: aim under ~100** (mobile-safe; past ~500 every device struggles). Each mesh is one draw call. Hundreds of copies of one thing → drei `<Instances>` (all of them in a single call). Many distinct static meshes → merge geometries at load.
- **Lights: three or fewer.** Every dynamic light multiplies fragment cost. Prefer an `<Environment>` map for ambient realism — near-free. Never give a point light shadows: it renders the shadow map six times.
- **Pixels: clamp `dpr={[1, 2]}`.** Devices report pixel ratios up to 5, and rendered pixels grow with the square. Cap it; nobody can tell.
- **Raycasts: pointer events hit-test on every pointer move.** Keep handlers off meshes that don't need them; acceleration in [performance.md](performance.md).
- **Shadows are a budget of their own.** Small maps, tight shadow camera, frozen when static, faked when possible — tuning values in [performance.md](performance.md).
- **Cheapest material that achieves the look.** Cost order: `basic < lambert < phong < standard`. Matte surface? Lambert, not standard.
- **Transparency is the slow path.** Blending forces sorting and overdraw. Use `alphaTest` cutouts where a hard edge works.

## Assets — small on the wire, small in VRAM

- **`.glb` + compression, always.** Run models through `gltf-transform` (or `gltfjsx -T`): Draco/meshopt cuts geometry ~90%.
- **KTX2 for big textures.** JPG/PNG decompress to full size in VRAM; KTX2 stays compressed on the GPU (~10× less memory). Keep dimensions power-of-two and as small as survives squinting — file size lies, a 4K JPG and 4K PNG cost identical VRAM.
- **Color maps are sRGB; data maps stay linear.** Washed-out or oddly lit textures mean a wrong color space. GLTF sets it for you; manual loads don't: set `texture.colorSpace = THREE.SRGBColorSpace` on color/emissive maps only — normal, roughness, metalness, AO must stay linear. Colors that must match CSS/brand exactly → `<Canvas flat>` turns off tone mapping.
- **Suspense with a cheap stand-in.** Nest a low-poly fallback so something renders while the real asset loads:

  ```jsx
  <Suspense fallback={<Model url="/low.glb" />}>
    <Model url="/high.glb" />
  </Suspense>
  ```

## Scale to the device — quality is a dial, not a constant

- **Static scene? Stop rendering.** `<Canvas frameloop="demand">` renders only when `invalidate()` is called — a product viewer burns zero battery between interactions.
- **Degrade under load, recover after.** drei `<PerformanceMonitor>` and movement regression lower DPR while the camera moves or FPS dips, then restore. Wiring in [performance.md](performance.md).

## Shaders — the one rule that isn't in the GLSL

The bug that eats beginners: a shader that compiles but never animates. Cause: the uniforms object was recreated on a React re-render, so the material now holds a stale copy. **Memoize uniforms once; mutate `.value` in the hot path:**

```jsx
const uniforms = useMemo(() => ({ u_time: { value: 0 } }), []);
useFrame(
  ({ clock }) =>
    (ref.current.material.uniforms.u_time.value = clock.elapsedTime),
);
```

The rest — GLSL perf rules, noise, debugging, keeping the built-in lighting — in [shaders.md](shaders.md).

## Measure before optimizing

Never guess: `r3f-perf` for live draw calls / triangles / memory, and `gl.info` counts must stay flat over time — a climb is a leak. Full toolkit, including the one-line CPU-vs-GPU-bound test: [performance.md](performance.md).

## Reviewing a scene — pass order

1. **Hot path** — read every `useFrame` and pointer handler: setState? allocation? whole-store subscription? This is where scenes die; don't move on until every callback is accounted for.
2. **Sharing** — count unique materials and geometries against meshes on screen; hunt conditional mounts, raw loaders, missing `dispose={null}`.
3. **Budgets** — get real numbers from `r3f-perf` and compare against the budgets above.
4. **Assets** — uncompressed GLBs, PNG where KTX2 belongs, wrong color spaces, missing `preload`.
