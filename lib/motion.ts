/**
 * Site-wide motion for GSAP, matching the CSS defaults in globals.css
 * (--ease-quart, --default-transition-duration): ease-in-out quart, 0.4s.
 * GSAP's power3 is the quart curve.
 */
export const MOTION = {
  duration: 0.4,
  ease: 'power3.inOut',
} as const
