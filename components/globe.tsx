'use client'

import { Html, OrbitControls, useTexture } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { cn } from '@/lib/utils'

export type GlobeLocation = {
  name: string
  lat: number
  lon: number
  side: 'left' | 'right'
}

// Tuned to match the live byblue.nu globe.
const RADIUS = 1
const SEGMENTS = 72
const INITIAL_ROTATION_X = 0.5 // tilt north so Europe sits in view
// Mobile (Figma): closer to the equator so South America and Africa show whole.
const INITIAL_ROTATION_X_MOBILE = 0.2
const INITIAL_ROTATION_Y = -0.95 // Atlantic facing the camera
const CAMERA_Z = 1.65
const CAMERA_Z_MOBILE = 3.2
const MOBILE_MAX_WIDTH = 600
const CLOUD_SPEED = 0.01 // radians per second
// Extra margin past the visible horizon, so labels fade before touching the edge.
const LABEL_HORIZON_MARGIN = 0.04

const TEXTURES = ['/textures/earth-day.jpg', '/textures/earth-clouds.jpg']

function latLonToVector(lat: number, lon: number, radius: number) {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const lambda = THREE.MathUtils.degToRad(lon + 180)
  return new THREE.Vector3(
    -radius * Math.cos(lambda) * Math.sin(phi),
    radius * Math.cos(phi),
    radius * Math.sin(lambda) * Math.sin(phi),
  )
}

/** Interactive 3D globe (drag to rotate) with a labelled dot per location. */
export function Globe({ locations }: { locations: GlobeLocation[] }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 52, near: 0.01, far: 100, position: [0, 0, CAMERA_Z] }}
    >
      <CameraLights />
      <ambientLight intensity={0.6} />
      <ResponsiveCamera />
      <Suspense fallback={null}>
        <Earth locations={locations} />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        rotateSpeed={0.5}
      />
    </Canvas>
  )
}

// Light offsets in camera space: key light up-right in front, cool fill behind.
const KEY_LIGHT_OFFSET = new THREE.Vector3(1, 0.8, 3)
const FILL_LIGHT_OFFSET = new THREE.Vector3(-3, 0, -1)

/**
 * Lights that follow the camera, so dragging the globe always shows a lit
 * face (OrbitControls moves the camera, not the globe).
 */
function CameraLights() {
  const keyRef = useRef<THREE.DirectionalLight>(null)
  const fillRef = useRef<THREE.DirectionalLight>(null)

  useFrame(({ camera }) => {
    keyRef.current?.position
      .copy(KEY_LIGHT_OFFSET)
      .applyQuaternion(camera.quaternion)
    fillRef.current?.position
      .copy(FILL_LIGHT_OFFSET)
      .applyQuaternion(camera.quaternion)
  })

  return (
    <>
      <directionalLight ref={keyRef} color="#fff8f0" intensity={3.4} />
      <directionalLight ref={fillRef} color="#3355aa" intensity={0.45} />
    </>
  )
}

function ResponsiveCamera() {
  const camera = useThree((state) => state.camera)
  const width = useThree((state) => state.size.width)

  useEffect(() => {
    camera.position.setLength(
      width <= MOBILE_MAX_WIDTH ? CAMERA_Z_MOBILE : CAMERA_Z,
    )
  }, [camera, width])

  return null
}

const scratchWorld = new THREE.Vector3()
const scratchCamera = new THREE.Vector3()

function Earth({ locations }: { locations: GlobeLocation[] }) {
  const isMobile = useThree((state) => state.size.width) <= MOBILE_MAX_WIDTH
  const [dayMap, cloudMap] = useTexture(TEXTURES, ([day]) => {
    day.colorSpace = THREE.SRGBColorSpace // colour map; clouds stay linear
  })

  const groupRef = useRef<THREE.Group>(null)
  const cloudsRef = useRef<THREE.Mesh>(null)
  const labelRefs = useRef<(HTMLDivElement | null)[]>([])

  const markers = useMemo(
    () =>
      locations.map((location) => ({
        ...location,
        position: latLonToVector(location.lat, location.lon, RADIUS),
      })),
    [locations],
  )

  useFrame(({ camera }, delta) => {
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * CLOUD_SPEED

    const group = groupRef.current
    if (!group) return
    // A point on the sphere is in view only in front of the horizon the camera
    // sees: n · camDir > R / cameraDistance (not just > 0 — the camera is close).
    const horizon = RADIUS / camera.position.length() + LABEL_HORIZON_MARGIN
    scratchCamera.copy(camera.position).normalize()

    markers.forEach((marker, index) => {
      const label = labelRefs.current[index]
      if (!label) return
      scratchWorld.copy(marker.position)
      group.localToWorld(scratchWorld).normalize()
      const visible = scratchWorld.dot(scratchCamera) > horizon
      label.style.opacity = visible ? '1' : '0'
    })
  })

  return (
    <group
      ref={groupRef}
      rotation={[
        isMobile ? INITIAL_ROTATION_X_MOBILE : INITIAL_ROTATION_X,
        INITIAL_ROTATION_Y,
        0,
      ]}
    >
      <mesh>
        <sphereGeometry args={[RADIUS, SEGMENTS, SEGMENTS]} />
        <meshPhongMaterial map={dayMap} shininess={8} specular="#0a1a33" />
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[RADIUS * 1.007, SEGMENTS, SEGMENTS]} />
        <meshPhongMaterial
          map={cloudMap}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[RADIUS * 1.018, 64, 64]} />
        <meshPhongMaterial
          color="#2255cc"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </mesh>

      {markers.map((marker, index) => (
        <Html
          key={marker.name}
          position={marker.position}
          zIndexRange={[10, 0]}
        >
          <div
            ref={(element) => {
              labelRefs.current[index] = element
            }}
            className={cn(
              'absolute top-0 flex -translate-y-1/2 items-center gap-1.5 transition-opacity md:gap-3',
              marker.side === 'right'
                ? 'left-0 -translate-x-2 md:-translate-x-2.5'
                : 'right-0 translate-x-2 flex-row-reverse md:translate-x-2.5',
            )}
          >
            <span className="bg-card size-4 shrink-0 rounded-full md:size-5" />
            <span className="bg-card text-foreground text-caption md:text-body-sm rounded-full px-2 py-1.5 leading-none whitespace-nowrap md:px-3.5 md:py-3">
              {marker.name}
            </span>
          </div>
        </Html>
      ))}
    </group>
  )
}
