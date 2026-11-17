# 3D / shaders — react-three-fiber

"Yes to 3D" at setup means preparing the ground — real scenes come later.

1. `pnpm add three @react-three/fiber @react-three/drei` · `pnpm add -D @types/three`
2. `components/scene.tsx` — the placeholder has two gotchas the naive version gets wrong, so match this file (kept in the starter's formatter style — the prettier-ignore is deliberate; oxfmt honors it):

   <!-- prettier-ignore -->
   ```tsx
   'use client'

   import { OrbitControls } from '@react-three/drei'
   import { Canvas } from '@react-three/fiber'
   import { useEffect, useState } from 'react'

   export function Scene() {
     // Controls listen on <body> because the DOM above the canvas swallows
     // pointer events. State (not a ref) so the controls mount on the client
     // once the target exists; `document` is only read inside the effect.
     const [controlsTarget, setControlsTarget] = useState<HTMLElement | null>(null)
     useEffect(() => setControlsTarget(document.body), [])

     return (
       <div className="fixed inset-0 -z-10" aria-hidden>
         <Canvas camera={{ position: [3, 3, 3] }}>
           <ambientLight intensity={0.5} />
           <directionalLight position={[5, 5, 5]} intensity={1} />
           <mesh>
             <boxGeometry args={[1, 1, 1]} />
             <meshStandardMaterial color="#ff7b00" />
           </mesh>
           {controlsTarget && (
           <OrbitControls domElement={controlsTarget} enableZoom={false} />
         )}
         </Canvas>
       </div>
     )
   }
   ```

   Why it looks like this: fixed full-viewport lives on an own wrapper div — r3f wraps the canvas in a div with inline `position: relative; width/height: 100%`, so positioning classes on `<Canvas>` are overridden and the height collapses. And with the page's content stacked above, the canvas never receives pointer events — `OrbitControls domElement={body}` is what keeps the cube draggable from anywhere while the DOM stays interactive. Background stays transparent (no color set); the material color comes from the project's accent. Render it from the home page. Deliberately plain: a placeholder proving the pipeline, not a demo.

   Two costs come with body-level controls, accepted for a placeholder: OrbitControls sets `touch-action: none` on its target and claims right-click — harmless while home is a single screen, but re-scope or replace the placeholder before the page needs touch scrolling. `enableZoom={false}` is what keeps the wheel scrolling the page instead of zooming the cube.

3. Install the project skill that guides the real scenes later (performance, shaders): `++ sync react-three-fiber`
4. Record in AGENTS.md → Stack decisions.

Verify: home renders the canvas with no console errors; `pnpm build` passes.
