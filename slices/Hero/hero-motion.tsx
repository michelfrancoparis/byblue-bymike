'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useState, type ComponentProps } from 'react'
import { MOTION } from '@/lib/motion'
import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/** Testing: play the preloader on every load. Set to false → once per session. */
const PRELOADER_EVERY_LOAD = true
const PRELOADER_SEEN_KEY = 'byblue:preloader-seen'

type Box = { x: number; y: number; width: number; height: number }

/** Element's box in stage coordinates. Offsets ignore transforms, so slots can
 *  be measured while their layers are mid-animation. */
function boxIn(el: HTMLElement, root: HTMLElement): Box {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== root) {
    x += node.offsetLeft
    y += node.offsetTop
    node = node.offsetParent as HTMLElement | null
  }
  return { x, y, width: el.offsetWidth, height: el.offsetHeight }
}

/** Function-based tween values, re-measured on every ScrollTrigger refresh. */
function boxVars(get: () => Box, round = false) {
  return {
    x: () => get().x,
    y: () => get().y,
    width: () => get().width,
    height: () => get().height,
    ...(round ? { borderRadius: () => get().width / 2 } : {}),
  }
}

/**
 * Drives the homepage hero (see slices/Hero): a time-based preloader, then one
 * pinned, scroll-scrubbed timeline. Timeline units are screen heights, so 1
 * unit of timeline = 1 screen of scrolling and the "scroll up" moves stay 1:1.
 */
export function HeroMotion({
  className,
  children,
  ...props
}: ComponentProps<'div'>) {
  const stageRef = useRef<HTMLElement>(null)
  // Above the fixed header while the preloader plays.
  const [preloading, setPreloading] = useState(true)

  useGSAP(
    () => {
      const stage = stageRef.current!
      const q = gsap.utils.selector(stage)
      const one = (selector: string) => q(selector)[0] as HTMLElement
      const slot = (name: string) => one(`[data-slot="${name}"]`)

      const media = one('[data-media]')
      const heroLayer = one('[data-hero-layer]')
      const rowLayer = one('[data-row-layer]')
      const cluster = one('[data-cluster]')
      const circles = {
        left: one('[data-circle="left"]'),
        right: one('[data-circle="right"]'),
      }
      const header = document.querySelector('header')

      const box = (el: HTMLElement) => () => boxIn(el, stage)
      const screen = () => heroLayer.offsetHeight
      const rem = () =>
        parseFloat(getComputedStyle(document.documentElement).fontSize)

      /* ---------------- Preloader ---------------- */

      const skip =
        (!PRELOADER_EVERY_LOAD &&
          sessionStorage.getItem(PRELOADER_SEEN_KEY) !== null) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      history.scrollRestoration = 'manual'
      window.scrollTo(0, 0)
      document.documentElement.style.overflow = 'hidden'

      const r = rem()
      const dots = q('[data-dot]')
      // Logo mark (Figma KF-1): two dots on the left (43px left, 49.5px up /
      // down of screen center) and the hero dot 43px right of it. The three
      // form an equilateral triangle; the wheel spins around ITS center
      // (centroid), so all three sit at the same distance and close in evenly.
      // Spinning around the screen center instead put the hero dot closer
      // than the other two, which left a two-lobed "8" just before merging.
      const points = [
        { el: dots[0], x: -2.6875 * r, y: -3.09375 * r },
        { el: dots[1], x: -2.6875 * r, y: 3.09375 * r },
        { el: media, x: 2.6875 * r, y: 0 },
      ]
      const hub = {
        x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
        y: points.reduce((sum, p) => sum + p.y, 0) / points.length,
      }
      const wheel = points.map((p) => ({
        el: p.el,
        radius: Math.hypot(p.x - hub.x, p.y - hub.y),
        angle: Math.atan2(p.y - hub.y, p.x - hub.x),
      }))

      // `turn` spins the wheel; `pull` draws it in (1 → logo, 0 → one circle
      // at screen center). The hub glides to the center as they close in.
      const roll = { turn: 0, pull: 1 }
      const placeWheel = () => {
        wheel.forEach(({ el, radius, angle }) => {
          const a = angle + roll.turn * Math.PI * 2
          const x = (hub.x + Math.cos(a) * radius) * roll.pull
          const y = (hub.y + Math.sin(a) * radius) * roll.pull
          if (el === media)
            gsap.set(media, { '--clip-x': `${x}px`, '--clip-y': `${y}px` })
          else gsap.set(el, { x, y })
        })
      }

      gsap.set(media, { '--clip-r': `${0.78125 * r}px` })
      placeWheel()
      if (header) gsap.set(header, { autoAlpha: 0 })

      const preloader = gsap
        .timeline({
          defaults: { ease: MOTION.ease, duration: 0.5 },
          delay: 0.1,
          onComplete: () => {
            document.documentElement.style.overflow = ''
            sessionStorage.setItem(PRELOADER_SEEN_KEY, '1')
            ScrollTrigger.refresh()
          },
        })
        // Three dots fade in where they sit (hidden in the markup, so nothing
        // shows before the script has placed them)…
        .fromTo(
          ['[data-dot]', media],
          { autoAlpha: 0 },
          { autoAlpha: 1, immediateRender: true },
        )
        // …grow into three circles…
        .to('[data-dot]', { scale: 1 })
        .to(media, { '--clip-r': `${3.125 * r}px` }, '<')
        // …roll like a little wheel while closing in, landing as one circle…
        .to(roll, { turn: 1.25, duration: 1.2, onUpdate: placeWheel })
        .to(roll, { pull: 0, duration: 1.2, onUpdate: placeWheel }, '<')
        .set('[data-dot]', { autoAlpha: 0 }, '-=0.15')
        // …and as they land (last ~1px of travel, invisible) the blueberries
        // fade in and the circle opens up to full screen.
        .to('[data-media-cover]', { autoAlpha: 0, duration: 0.35 }, '<')
        .to(
          media,
          {
            '--clip-r': () => `${Math.hypot(stage.offsetWidth, screen())}px`,
            duration: 0.9,
          },
          '<0.1',
        )
        .to('[data-media-image]', { scale: 1, duration: 0.9 }, '<')
        .set(media, { clipPath: 'none' })
        .set('[data-preloader]', { autoAlpha: 0 })
        .call(() => setPreloading(false))
        .fromTo(
          '[data-hero-copy-in]',
          { autoAlpha: 0, y: 2 * r },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          '-=0.3',
        )

      if (header) {
        preloader.fromTo(
          header,
          { autoAlpha: 0, y: -2 * r },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          '<',
        )
      }

      if (skip) preloader.progress(1)

      /* ---------------- Scroll ---------------- */

      const mm = gsap.matchMedia()

      mm.add(
        { isDesktop: '(min-width: 48em)', isMobile: '(max-width: 47.99em)' },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean }

          const full = () => ({
            x: 0,
            y: 0,
            width: stage.offsetWidth,
            height: screen(),
          })
          const inset = box(slot('inset'))
          const insetRadius = () =>
            parseFloat(getComputedStyle(slot('inset')).borderTopLeftRadius)
          const travel = () => {
            const b = inset()
            return { ...b, y: b.y - 0.6 * screen() }
          }

          // Mobile has an extra step (Figma): a smaller cluster centered on
          // screen, then it grows into place as the text appears.
          const shrunk = (get: () => Box) => () => {
            const c = boxIn(cluster, stage)
            const b = get()
            const s = 0.72
            return {
              x: stage.offsetWidth / 2 + (b.x - c.x - c.width / 2) * s,
              y: screen() * 0.55 + (b.y - c.y - c.height / 2) * s,
              width: b.width * s,
              height: b.height * s,
            }
          }

          // immediateRender off for the rect tweens that chain on the same
          // element (each applies its start only when reached); every tween
          // that alone owns a property renders its start state up front, so a
          // refresh can't leave it stuck at its end state.
          const tl = gsap.timeline({
            defaults: { ease: MOTION.ease, immediateRender: false },
          })

          // 1 · First scroll: headline out, intro in, image gets framed.
          tl.fromTo(
            media,
            { ...boxVars(full), borderRadius: 0 },
            { ...boxVars(inset), borderRadius: insetRadius, duration: 1 },
            0,
          )
            .fromTo(
              '[data-hero-copy]',
              { autoAlpha: 1, y: 0 },
              {
                autoAlpha: 0,
                y: () => -3 * rem(),
                duration: 0.5,
                immediateRender: true,
              },
              0,
            )
            .fromTo(
              '[data-intro]',
              { autoAlpha: 0, y: () => 3 * rem() },
              { autoAlpha: 1, y: 0, duration: 0.5, immediateRender: true },
              0.4,
            )

          // 2 · Everything scrolls up; near the top the image drops into the
          //     center of the row, the side circles pop in just before it lands.
          tl.fromTo(
            heroLayer,
            { y: 0 },
            {
              y: () => -screen(),
              ease: 'none',
              duration: 1,
              immediateRender: true,
            },
            1.1,
          )
            .fromTo(
              rowLayer,
              { y: () => screen() },
              { y: 0, ease: 'none', duration: 1, immediateRender: true },
              1.1,
            )
            .fromTo(
              media,
              boxVars(inset),
              { ...boxVars(travel), ease: 'none', duration: 0.6 },
              1.1,
            )
            .fromTo(
              media,
              { ...boxVars(travel), borderRadius: insetRadius },
              { ...boxVars(box(slot('row-center')), true), duration: 0.6 },
              1.7,
            )
          ;(['left', 'right'] as const).forEach((side, i) => {
            tl.fromTo(
              circles[side],
              { ...boxVars(box(slot(`row-${side}`))), scale: 0, autoAlpha: 0 },
              { scale: 1, autoAlpha: 1, duration: 0.5, immediateRender: true },
              1.75 + i * 0.1,
            )
          })

          // 3 · Hold (2.3 → 2.7), then 4 · regroup into the cluster while the
          //     title scrolls away; labels last.
          const at = 2.7
          const target = (name: string) =>
            isMobile ? shrunk(box(slot(name))) : box(slot(name))

          tl.fromTo(
            '[data-title]',
            { y: 0 },
            {
              y: () => -screen(),
              ease: 'none',
              duration: 0.8,
              immediateRender: true,
            },
            at,
          )
            .fromTo(
              media,
              boxVars(box(slot('row-center')), true),
              { ...boxVars(target('cluster-center'), true), duration: 0.8 },
              at,
            )
            .fromTo(
              circles.left,
              boxVars(box(slot('row-left'))),
              { ...boxVars(target('cluster-left')), duration: 0.8 },
              at,
            )
            .fromTo(
              circles.right,
              boxVars(box(slot('row-right'))),
              { ...boxVars(target('cluster-right')), duration: 0.8 },
              at + 0.05,
            )
            .fromTo(
              '[data-label]',
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.3, immediateRender: true },
              at + 0.7,
            )

          // 5 · Mobile grows the cluster into place; text fades in either way.
          let textAt = at + 0.8
          if (isMobile) {
            const grow = at + 1.3
            tl.fromTo(
              media,
              boxVars(target('cluster-center'), true),
              { ...boxVars(box(slot('cluster-center')), true), duration: 0.6 },
              grow,
            )
              .fromTo(
                circles.left,
                boxVars(target('cluster-left')),
                { ...boxVars(box(slot('cluster-left'))), duration: 0.6 },
                grow,
              )
              .fromTo(
                circles.right,
                boxVars(target('cluster-right')),
                { ...boxVars(box(slot('cluster-right'))), duration: 0.6 },
                grow,
              )
            textAt = grow + 0.4
          }
          tl.fromTo(
            '[data-system-text]',
            { autoAlpha: 0, y: () => 2 * rem() },
            { autoAlpha: 1, y: 0, duration: 0.4, immediateRender: true },
            textAt,
          )

          ScrollTrigger.create({
            trigger: stage,
            start: 'top top',
            end: () => `+=${tl.duration() * screen()}`,
            pin: true,
            scrub: 0.5,
            animation: tl,
            invalidateOnRefresh: true,
          })
        },
        stage,
      )

      return () => {
        document.documentElement.style.overflow = ''
      }
    },
    { scope: stageRef },
  )

  return (
    // Plain wrapper: GSAP's pin wraps the stage in its own spacer node, which
    // must not sit directly between React-managed siblings.
    <div {...props}>
      <section
        ref={stageRef}
        className={cn('relative min-h-svh', preloading && 'z-60', className)}
      >
        {children}
        <noscript>
          <style>
            {
              '[data-preloader],[data-media-cover]{display:none}[data-media]{clip-path:none;visibility:visible}[data-hero-copy-in]{visibility:visible}'
            }
          </style>
        </noscript>
      </section>
    </div>
  )
}
