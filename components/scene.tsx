'use client'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useSyncExternalStore } from 'react'

const subscribe = () => () => {}

export function Scene() {
  // Controls listen on <body> because the DOM above the canvas swallows
  // pointer events. Resolved on the client only (null during SSR), so the
  // controls mount once the target exists.
  const controlsTarget = useSyncExternalStore(
    subscribe,
    () => document.body,
    () => null,
  )

  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <Canvas camera={{ position: [3, 3, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#a4d3f6" />
        </mesh>
        {controlsTarget && (
          <OrbitControls domElement={controlsTarget} enableZoom={false} />
        )}
      </Canvas>
    </div>
  )
}
